import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Departamento } from '../../models/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrardepartamento',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './mostrardepartamento.component.html',
  styleUrls: ['./mostrardepartamento.component.css']
})

export class MostrardepartamentoComponent implements OnInit {
  public Departamentos: Departamento[] = [];
  public ids: number[] = [];
  public editableDepartament: Partial<Departamento> = {};
  public editingDepartamentoId: number | null = null;

  filteredDepartamentos: Departamento[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private departamentoService: DepartamentoService, private _router:Router,
    private _routes:ActivatedRoute) {}

  ngOnInit(): void {
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.Departamentos = response.data;
        this.filteredDepartamentos = this.Departamentos; // Inicializa filteredDepartamentos con todos los departamentos al principio
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredDepartamentos = this.Departamentos.filter(Departamento =>
        Departamento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        Departamento.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredDepartamentos = this.Departamentos;
    }
    this.currentPage = 1; // Reset to first page after search
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredDepartamentos.length) {
      this.currentPage++;
    }
  }

  updateSelectedDepartamento(DepartamentoId: number) {
    if (this.ids.includes(DepartamentoId)) {
      this.ids = this.ids.filter(id => id !== DepartamentoId);
    } else {
      this.ids.push(DepartamentoId);
    }
  }

  getPaginatedDepartamentos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredDepartamentos.slice(start, end);
  }

  deleteDepartamentos() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Departamentos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.departamentoService.deleteDepartamento(id).subscribe({
            next: (response: any) => {
              if (response.status === 200) {
                console.log(response);
                completedRequests++;
                if (completedRequests === this.ids.length) {
                  this.showSuccessAlertDelete();
                }
              }
            },
            error: (err: any) => {
              console.error(err);
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

  editDepartamento() {
    if (this.ids.length === 1) {
      const DepartamentoId = this.ids[0];
      this.editingDepartamentoId = DepartamentoId;
      const departamento = this.Departamentos.find(Departamento => Departamento.idDepartamento === DepartamentoId);
      if (departamento) {
        this.editableDepartament = { ...departamento };
      }
    }
  }

  navigateToAdd(): void {
    this._router.navigate(['/Agregar-Departamento']);
  }
  
  saveDepartamento(DepartamentoId: number) {
    console.log(this.editableDepartament);
    if (this.editableDepartament.idDepartamento !== undefined) {
      this.departamentoService.updateDepartamento(this.editableDepartament as Departamento).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.Departamentos.findIndex(Departamento => Departamento.idDepartamento === DepartamentoId);
            if (index !== -1) {
              this.Departamentos[index] = this.editableDepartament as Departamento;
            }
            this.editingDepartamentoId = null;
            this.editableDepartament = {};
            this.showSuccessAlertEdit();
          }
        },
        error: (err: any) => {
          console.error(err);
          this.showErrorAlertEdit(err);
        }
      });
    }
  }

  cancelEdit() {
    this.editingDepartamentoId = null;
    this.editableDepartament = {};
  }

  isEditing(DepartamentoId: number): boolean {
    return this.editingDepartamentoId === DepartamentoId;
  }

  private showSuccessAlertDelete() {
    Swal.fire({
      title: 'Departamentos eliminados!',
      text: 'El departamento ha sido eliminado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showSuccessAlertEdit() {
    Swal.fire({
      title: 'Departamento editado!',
      text: 'El departamento ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el departamento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el departamento. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el departamento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el departamento. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
