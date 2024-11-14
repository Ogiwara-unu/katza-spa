import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detalleprestamovehiculo } from '../../models/detalleprestamovehiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { detalleprestamovehiculoService } from '../../services/detallePresVehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrarprestamovehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrarprestamovehiculo.component.html',
  styleUrl: './mostrarprestamovehiculo.component.css'
})
export class MostrarprestamovehiculoComponent {

  public detallesPrestamoVehiculos:Detalleprestamovehiculo[] = [];
  public ids: number[] = [];
  public editableDetallePrestamoVehiculos: Partial<Detalleprestamovehiculo> = {};
  public editingDetallePresVehiculoId: number | null = null;

  filteredPrestamoVehiculo: Detalleprestamovehiculo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router: Router,private detallePrestamoVehiculoService:detalleprestamovehiculoService) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Prestamo-Vehiculo']);
  }

  ngOnInit(): void {
    this.detallePrestamoVehiculoService.getAllDetallePresVehiculo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.detallesPrestamoVehiculos = response.data;
        this.filteredPrestamoVehiculo = this.detallesPrestamoVehiculos; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredPrestamoVehiculo = this.detallesPrestamoVehiculos.filter(detallePrest => {
        const idString = detallePrest.idDetallePrestamo.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               detallePrest.observaciones.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredPrestamoVehiculo = this.detallesPrestamoVehiculos;
    }
    this.currentPage = 1; // Reset to first page after search
  }
  


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPrestamoVehiculo.length) {
      this.currentPage++;
    }
  }

  updateSelectedPrestamoVehiculo(detallePrestID: number) {
    if (this.ids.includes(detallePrestID)) {
      this.ids = this.ids.filter(id => id !== detallePrestID);
    } else {
      this.ids.push(detallePrestID);
    }
  }

  getPaginatedDetallePrestVehiculo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredPrestamoVehiculo.slice(start, end);
  }

  deleteDetallePrestVehiculo() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Prestamo vehiculos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.detallePrestamoVehiculoService.deleteDetallePresVehiculo(id).subscribe({
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
      this.editingDetallePresVehiculoId = detallePrestID;
      const detallePrestamo = this.detallesPrestamoVehiculos.find(t => t.idDetallePrestamo === detallePrestID);
      if (detallePrestamo) {
        this.editableDetallePrestamoVehiculos = { ...detallePrestamo };
      }
    }
  }


  saveDetallePrestamoVehiculo(detallePrestVehiculoID: number) {
    console.log(this.editableDetallePrestamoVehiculos);
    if (this.editableDetallePrestamoVehiculos.idDetallePrestamo !== undefined) {
      this.detallePrestamoVehiculoService.updateDetallePresVehiculo(this.editableDetallePrestamoVehiculos as Detalleprestamovehiculo).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.detallesPrestamoVehiculos.findIndex(Departamento => Departamento.idDetallePrestamo === detallePrestVehiculoID);
            if (index !== -1) {
              this.detallesPrestamoVehiculos[index] = this.editableDetallePrestamoVehiculos as Detalleprestamovehiculo;
            }
            this.editingDetallePresVehiculoId = null;
            this.editableDetallePrestamoVehiculos = {};
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
    this.editingDetallePresVehiculoId = null;
    this.editableDetallePrestamoVehiculos = {};
  }

  isEditing(detallePrestID: number): boolean {
    return this.editingDetallePresVehiculoId === detallePrestID;
  }


  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Prestamo vehiculos eliminados!',
      text: 'Los prestamos vehiculos han sido eliminados correctamente.',
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
      title: 'Prestamo Vehiculo!',
      text: 'Los prestamos vehiculos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el prestamo vehiculo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el prestamo vehiculo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


  

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el prestamo vehiculo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el prestamo vehiculo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


}
