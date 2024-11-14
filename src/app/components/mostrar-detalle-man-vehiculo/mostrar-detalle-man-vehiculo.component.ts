import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetalleManVehiculo } from '../../models/detalleManVehiculo';
import { Mantenimiento } from '../../models/mantenimiento';
import { Router } from '@angular/router';
import { DetalleMantenimientoService } from '../../services/detalle-mantenimiento.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-detalle-man-vehiculo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrar-detalle-man-vehiculo.component.html',
  styleUrl: './mostrar-detalle-man-vehiculo.component.css'
})
export class MostrarDetalleManVehiculoComponent {

  public detalleManVehiculo: DetalleManVehiculo[] = [];
  public mantenimiento: Mantenimiento[]=[];
  public ids: number[] = [];
  public editableDetalleMantenimientoVehiculo: Partial<DetalleManVehiculo> = {};
  public editingDetalleMantenimientoVehiculoId:number | null = null;

  filteredDetalleMantenimientoVehiculo: DetalleManVehiculo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router:Router,private detalleMVService:DetalleMantenimientoService,
    private mantenimientoService:MantenimientoService
  ){}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Detalle-Mantenimiento-Vehiculos']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredDetalleMantenimientoVehiculo.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.detalleMVService.getAllDetalleMantenimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.detalleManVehiculo = response.data;
        this.filteredDetalleMantenimientoVehiculo = this.detalleManVehiculo; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.mantenimientoService.getAllMantenimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.mantenimiento = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

  }

  saveDetalleMantenimientoVehiculo(detalleManVID: number) {
    console.log(this.editableDetalleMantenimientoVehiculo);
    if (this.editableDetalleMantenimientoVehiculo.idDetalleMantenimiento !== undefined) {
      this.detalleMVService.updateDetalleMantenimiento(this.editableDetalleMantenimientoVehiculo as DetalleManVehiculo).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.detalleManVehiculo.findIndex(Departamento => Departamento.idDetalleMantenimiento === detalleManVID);
            if (index !== -1) {
              this.detalleManVehiculo[index] = this.editableDetalleMantenimientoVehiculo as DetalleManVehiculo;
            }
            this.editingDetalleMantenimientoVehiculoId = null;
            this.editableDetalleMantenimientoVehiculo = {};
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

  editDetalleManVehiculo() {
    if (this.ids.length === 1) {
      const detalleManVID = this.ids[0];
      this.editingDetalleMantenimientoVehiculoId = detalleManVID;
      const detallemantenimientovehiculo = this.detalleManVehiculo.find(t => t.idDetalleMantenimiento === detalleManVID);
      if (detallemantenimientovehiculo) {
        this.editableDetalleMantenimientoVehiculo = { ...detallemantenimientovehiculo };
      }
    }
  }

  cancelEdit() {
    this.editingDetalleMantenimientoVehiculoId = null;
    this.editableDetalleMantenimientoVehiculo = {};
  }

  isEditing(detalleManVID: number): boolean {
    return this.editingDetalleMantenimientoVehiculoId === detalleManVID;
  }

  updateSelectedDetalleManVehiculo(detalleManVID: number) {
    if (this.ids.includes(detalleManVID)) {
      this.ids = this.ids.filter(id => id !== detalleManVID);
    } else {
      this.ids.push(detalleManVID);
    }
  }

  getPaginatedDetalleManVehiculo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredDetalleMantenimientoVehiculo.slice(start, end);
  }

  deleteDetalleManVehiculo() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Detalle Mantenimiento seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.detalleMVService.deleteDetalleMantenimiento(id).subscribe({
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
      this.filteredDetalleMantenimientoVehiculo = this.detalleManVehiculo.filter(DetalleMantenimiento => {
        const idString = DetalleMantenimiento.mantenimiento.toString().toLowerCase();
        return idString.includes(searchTermLower);
      });
    } else {
      this.filteredDetalleMantenimientoVehiculo = this.detalleManVehiculo;
    }
    this.currentPage = 1; // Reset to first page after search
  }

  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Detalle mantenimiento eliminado!',
      text: 'El detalle mantenimiento ha sido eliminado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el detalle mantenimiento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el detalle mantenimiento. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el detalle mantenimiento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el detalle mantenimiento. Intente nuevamente más tarde.';
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
      title: 'Detalle Mantenimiento!',
      text: 'El detalle mantenimiento ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }


}
