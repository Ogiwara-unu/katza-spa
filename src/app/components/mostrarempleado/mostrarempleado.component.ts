import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { DepartamentoService } from '../../services/departamento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrarempleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrarempleado.component.html',
  styleUrls: ['./mostrarempleado.component.css']
})
export class MostrarempleadoComponent implements OnInit {
  public Empleados: Empleado[] = [];
  public departments: any[] = [];
  public ids: number[] = [];
  public editableEmpleado: Partial<Empleado> = {};
  public editingEmpleadoId: number | null = null;

  filteredEmpleados: Empleado[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (response: any) => {
        this.Empleados = response.data;
        this.filteredEmpleados = response.data;
        this.loadDepartamentos();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadDepartamentos(): void {
    this.departamentoService.getAllDepartamentos().subscribe(
      (response: any) => {
        this.departments = response.data;
        this.filteredEmpleados.forEach(empleado => {
          const departamento = this.departments.find(dep => dep.idDepartamento === empleado.departamento);
          if (departamento) {
            empleado.nombre_departamento = departamento.nombre;
          }
        });
      },
      error => {
        console.log('Error fetching departamento:', error);
      }
    );
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredEmpleados = this.Empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        empleado.apellidos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        empleado.correo.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmpleados = this.Empleados;
    }
    this.currentPage = 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredEmpleados.length) {
      this.currentPage++;
    }
  }

  updateSelectedEmpleado(empleadoID: number) {
    if (this.ids.includes(empleadoID)) {
      this.ids = this.ids.filter(id => id !== empleadoID);
    } else {
      this.ids.push(empleadoID);
    }
  }

  getPaginatedEmpleados() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredEmpleados.slice(start, end);
  }

  deleteEmpleados() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.empleadoService.deleteEmpleado(id).subscribe({
            next: (response: any) => {
              if (response.status === 200) {
                completedRequests++;
                if (completedRequests === this.ids.length) {
                  this.showSuccessAlertDelete();
                }
              }
            },
            error: (err: any) => {
              completedRequests++;
              if (completedRequests === this.ids.length) {
                this.showErrorAlertDelete(err);
              }
            }
          });
        });
      }
    });
  }

  editEmpleado() {
    if (this.ids.length === 1) {
      const empleadoID = this.ids[0];
      this.editingEmpleadoId = empleadoID;
      const empleado = this.Empleados.find(e => e.idEmpleado === empleadoID);
      if (empleado) {
        this.editableEmpleado = { ...empleado };
      }
    }
  }

  saveEmpleado(empleadoID: number) {
    if (this.editableEmpleado.idEmpleado !== undefined) {
      this.empleadoService.updateEmpleado(this.editableEmpleado as Empleado).subscribe({
        
        next: (response: any) => {
          console.log(response);
          console.log(this.editableEmpleado);
          if (response.status === 200) {
           
            const index = this.Empleados.findIndex(e => e.idEmpleado === empleadoID);
            if (index !== -1) {
              this.Empleados[index] = this.editableEmpleado as Empleado;
              this.filteredEmpleados = [...this.Empleados]; // Update filtered list as well
            }
            this.editingEmpleadoId = null;
            this.editableEmpleado = {};
            this.showSuccessAlertEdit();
          }
        },
        error: (err: any) => {
          this.showErrorAlertEdit(err);
        }
      });
    }
  }

  cancelEdit() {
    this.editingEmpleadoId = null;
    this.editableEmpleado = {};
  }

  isEditing(empleadoID: number): boolean {
    return this.editingEmpleadoId === empleadoID;
  }

  private showSuccessAlertEdit() {
    Swal.fire({
      title: 'Empleado editado!',
      text: 'El empleado ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el empleado.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el empleado. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showSuccessAlertDelete() {
    Swal.fire({
      title: 'Empleados eliminados!',
      text: 'Los empleados han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar los empleados.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar los empleados. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}