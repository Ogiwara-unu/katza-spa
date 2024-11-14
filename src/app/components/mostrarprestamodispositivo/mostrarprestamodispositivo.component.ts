import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detalleprestamodispositivo } from '../../models/detalleprestamodispositivo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetallePrestamoDispositivoService } from '../../services/detallePresDispositivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrarprestamodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrarprestamodispositivo.component.html',
  styleUrl: './mostrarprestamodispositivo.component.css'
})
export class MostrarprestamodispositivoComponent {

  public detallesPrestamoDispositivos:Detalleprestamodispositivo[] = [];
  public ids: number[] = [];
  public editableDetallePrestamoDispositivo: Partial<Detalleprestamodispositivo> = {};
  public editingDetallePresDispositivoId: number | null = null;

  filteredPrestamoDispositivo: Detalleprestamodispositivo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5


  constructor(private router: Router,private detallePrestDispositivoService:DetallePrestamoDispositivoService) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Prestamo-Dispositivo']);
  }

  ngOnInit(): void {
    this.detallePrestDispositivoService.getAllDetallePrestDispositivo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.detallesPrestamoDispositivos = response.data;
        this.filteredPrestamoDispositivo = this.detallesPrestamoDispositivos; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredPrestamoDispositivo = this.detallesPrestamoDispositivos.filter(detallePrest => {
        const idString = detallePrest.idDetallePrestamoDispositivo.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               detallePrest.fechaDevolucion.toDateString().toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredPrestamoDispositivo = this.detallesPrestamoDispositivos;
    }
    this.currentPage = 1; // Reset to first page after search
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPrestamoDispositivo.length) {
      this.currentPage++;
    }
  }

  deleteDetallePrestDispositivo() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Prestamo dispositivos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.detallePrestDispositivoService.deleteDetallePresrDispositivo(id).subscribe({
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

  editDetallePrest() {
    if (this.ids.length === 1) {
      const detallePrestID = this.ids[0];
      this.editingDetallePresDispositivoId = detallePrestID;
      const detallePrestamo = this.detallesPrestamoDispositivos.find(t => t.idDetallePrestamoDispositivo === detallePrestID);
      if (detallePrestamo) {
        this.editableDetallePrestamoDispositivo = { ...detallePrestamo };
      }
    }
  }

  saveDetallePrestamoDispositivo(detallePrestDispositivoID: number) {
    console.log(this.editableDetallePrestamoDispositivo);
    if (this.editableDetallePrestamoDispositivo.idDetallePrestamoDispositivo !== undefined) {
      this.detallePrestDispositivoService.updateDetallePrestDispositivo(this.editableDetallePrestamoDispositivo as Detalleprestamodispositivo).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.detallesPrestamoDispositivos.findIndex(Departamento => Departamento.idDetallePrestamoDispositivo === detallePrestDispositivoID);
            if (index !== -1) {
              this.detallesPrestamoDispositivos[index] = this.editableDetallePrestamoDispositivo as Detalleprestamodispositivo;
            }
            this.editingDetallePresDispositivoId = null;
            this.editableDetallePrestamoDispositivo = {};
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
    this.editingDetallePresDispositivoId = null;
    this.editableDetallePrestamoDispositivo = {};
  }

  isEditing(detallePrestID: number):boolean {
    return this.editingDetallePresDispositivoId === detallePrestID;
  }



  updateSelectedPrestamoDispositivo(detallePrestID: number) {
    if (this.ids.includes(detallePrestID)) {
      this.ids = this.ids.filter(id => id !== detallePrestID);
    } else {
      this.ids.push(detallePrestID);
    }
  }

  getPaginatedDetallePrestDispositivo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredPrestamoDispositivo.slice(start, end);
  }


  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Prestamo dispositivos eliminados!',
      text: 'Los prestamos dispositivos han sido eliminados correctamente.',
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
      title: 'Prestamo dispositivo!',
      text: 'Los prestamos dispositivos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el prestamo dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el prestamo dispositivo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


  

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el prestamo dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el prestamo dispositivo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  
}
