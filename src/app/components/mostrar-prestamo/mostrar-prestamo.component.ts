import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prestamo } from '../../models/prestamo';
import { Empleado } from '../../models/empleado';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PrestamoService } from '../../services/prestamo.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-mostrar-prestamo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrar-prestamo.component.html',
  styleUrl: './mostrar-prestamo.component.css'
})
export class MostrarPrestamoComponent {

  public prestamo:Prestamo[] = [];
  public empleado:Empleado[] = [];
  public ids: number[] = [];
  public editablePrestamo: Partial<Prestamo> = {};
  public editingPrestamoId: number | null = null;

  filteredPrestamo: Prestamo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router:Router,private prestamoService:PrestamoService,
    private empleadoService:EmpleadoService
  ){}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Prestamo']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPrestamo.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.prestamoService.getAllPrestamo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.prestamo = response.data;
        this.filteredPrestamo = this.prestamo; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.empleadoService.getAllEmpleados().subscribe({
      next: (response: any) => {
        console.log(response);
        this.empleado = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  savePrestamo(prestamoID: number) {
    console.log(this.editablePrestamo);
    if (this.editablePrestamo.idPrestamo !== undefined) {
      this.prestamoService.updatePrestamo(this.editablePrestamo as Prestamo).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.prestamo.findIndex(Departamento => Departamento.idPrestamo === prestamoID);
            if (index !== -1) {
              this.prestamo[index] = this.editablePrestamo as Prestamo;
            }
            this.editingPrestamoId = null;
            this.editablePrestamo = {};
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

  editPrestamo() {
    if (this.ids.length === 1) {
      const prestamoID = this.ids[0];
      this.editingPrestamoId = prestamoID;
      const prestamo = this.prestamo.find(t => t.idPrestamo === prestamoID);
      if (prestamo) {
        this.editablePrestamo = { ...prestamo };
      }
    }
  }

  cancelEdit() {
    this.editingPrestamoId = null;
    this.editablePrestamo = {};
  }

  isEditing(prestamoID: number): boolean {
    return this.editingPrestamoId === prestamoID;
  }

  updateSelectedPrestamo(prestamoID: number) {
    if (this.ids.includes(prestamoID)) {
      this.ids = this.ids.filter(id => id !== prestamoID);
    } else {
      this.ids.push(prestamoID);
    }
  }

  getPaginatedPrestamo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredPrestamo.slice(start, end);
  }

  deletePrestamo() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Prestamos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.prestamoService.deletePrestamo(id).subscribe({
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

  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredPrestamo = this.prestamo.filter(Prestamo => {
        const idString = Prestamo.estadoPrestamo.toString().toLowerCase();
        const empleadoName = this.getTipoEmpleadoName(Prestamo.empleadoReceptor).toLowerCase();
        return idString.includes(searchTermLower) ||
        empleadoName.includes(searchTermLower);
      });
    } else {
      this.filteredPrestamo = this.prestamo;
    }
    this.currentPage = 1; // Reset to first page after search
  }


  getTipoEmpleadoName(empleadoID: number): string {
    const empleado = this.empleado.find(t => t.idEmpleado === empleadoID);
    return empleado ? empleado.nombre : '';
  }


  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Prestamos eliminados!',
      text: 'Los prestamos han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el prestamo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el prestamo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el prestamo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el prestamo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showSuccessAlertEdit() {
    Swal.fire({
      title: 'Prestamo!',
      text: 'Los prestamos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

}
