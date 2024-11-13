import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { Router } from '@angular/router';
import { TipoMantenimiento } from '../../models/tipoMantenimiento';
import { TipomantenimientoService } from '../../services/tipomantenimiento.service';
import { DetalleManVehiculo } from '../../models/detalleManVehiculo';
import { DetalleMantenimientoService } from '../../services/detalle-mantenimiento.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-mostrarmantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrarmantenimiento.component.html',
  styleUrls: ['./mostrarmantenimiento.component.css']
})
export class MostrarmantenimientoComponent implements OnInit {
  public mantenimientos: Mantenimiento[] = [];
  public ids: number[] = [];
  public editableMantenimiento: Partial<Mantenimiento> = {};
  public editableDetalleMantenimiento: Partial<DetalleManVehiculo> = {};
  public editingMantenimientoId: number | null = null;
  public tipoMantenimientos: TipoMantenimiento[] = [];
  public detalleMantenimientos: DetalleManVehiculo[] = [];

  filteredMantenimientos: Mantenimiento[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private mantenimientoService: MantenimientoService,
    private tipoMantenimientoService: TipomantenimientoService,
    private router: Router,
    private _detalleMantenimientoService: DetalleMantenimientoService
  ) {}

  ngOnInit(): void {
    this.loadMantenimientos();
    this.loadTipoMantenimiento();
    this.loadDetalleMantenimiento();
  }

  loadMantenimientos(): void {
    this.mantenimientoService.getAllMantenimientos().subscribe({
      next: (response: any) => {
        console.log('Mantenimientos cargados:', response.data); // Debug log
        this.mantenimientos = response.data;
        this.filteredMantenimientos = response.data;
        this.assignTipoMantenimientoNames();
      },
      error: (err: any) => {
        console.error('Error al cargar mantenimientos:', err);
      }
    });
  }

  loadTipoMantenimiento(): void {
    this.tipoMantenimientoService.getAllTipoMantenimientos().subscribe({
      next: (response: any) => {
        console.log('Mantenimientos cargados:', response.data); // Debug log
        this.tipoMantenimientos = response.data;
        this.assignTipoMantenimientoNames();
      },
      error: (err: any) => {
        console.error('Error al cargar los mantenimientos:', err);
      }
    });
  }

  loadDetalleMantenimiento(): void {
    this._detalleMantenimientoService.getAllDetalleMantenimientos().subscribe({
      next: (response: any) => {
        console.log('Detalles de mantenimientos cargados:', response.data);
        this.detalleMantenimientos = response.data;
        this.assignDetalleMantenimiento();
      },
      error: (err: any) => {
        console.error('Error al cargar los mantenimientos:', err);
      }
    });
  }

  assignDetalleMantenimiento(): void {
    if (this.mantenimientos.length > 0 && this.detalleMantenimientos.length > 0) {
      this.filteredMantenimientos.forEach(mantenimiento => {
        const detalleMantenimientoU = this.detalleMantenimientos.find(detalle => detalle.mantenimiento === mantenimiento.idMantenimiento);
        if (detalleMantenimientoU) {
          mantenimiento.detalleMantenimiento = detalleMantenimientoU.observaciones;
        }
      });
    }
  }

  assignTipoMantenimientoNames(): void {
    if (this.mantenimientos.length > 0 && this.tipoMantenimientos.length > 0) {
      this.filteredMantenimientos.forEach(mantenimiento => {
        const tipoMantenimientoU = this.tipoMantenimientos.find(tipo => tipo.idTipoMantenimiento === mantenimiento.tipoMantenimiento);
        console.log('Tipos Mantenimientos existentes: '+ this.tipoMantenimientos);
        console.log('Tipo mantenimiento encontrado: '+tipoMantenimientoU);
        if (tipoMantenimientoU) {
          mantenimiento.nombreTipoMantenimiento = tipoMantenimientoU.nombre;
        }
      });
    }
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredMantenimientos = this.mantenimientos.filter(mantenimiento =>
        mantenimiento.tipoMantenimiento.toString().includes(this.searchTerm) ||
        mantenimiento.empleadoEncargado.toString().includes(this.searchTerm) ||
        mantenimiento.fechaMantenimiento.toString().includes(this.searchTerm) ||
        mantenimiento.duracionMantenimiento.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredMantenimientos = this.mantenimientos;
    }
    this.currentPage = 1; // Resetear a la primera página después de la búsqueda
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredMantenimientos.length) {
      this.currentPage++;
    }
  }

  updateSelectedMantenimiento(mantenimientoID: number): void {
    if (this.ids.includes(mantenimientoID)) {
      this.ids = this.ids.filter(id => id !== mantenimientoID);
    } else {
      this.ids.push(mantenimientoID);
    }
    console.log('IDs seleccionados:', this.ids); // Debug log
  }

  getPaginatedMantenimientos(): Mantenimiento[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredMantenimientos.slice(start, end);
  }

  deleteMantenimientos(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Mantenimientos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.mantenimientoService.deleteMantenimiento(id).subscribe({
            next: (response: any) => {
              if (response.status === 200) {
                completedRequests++;
                if (completedRequests === this.ids.length) {
                  this.showSuccessAlertDelete();
                }
              }
            },
            error: (err: any) => {
              console.error('Error al eliminar mantenimiento:', err);
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

  editMantenimiento(): void {
    if (this.ids.length === 1) {
      const mantenimientoID = this.ids[0];
      this.editingMantenimientoId = mantenimientoID;
      const mantenimiento = this.mantenimientos.find(m => m.idMantenimiento === mantenimientoID);
      if (mantenimiento) {
        this.editableMantenimiento = { ...mantenimiento };
        console.log('Editando mantenimiento:', this.editableMantenimiento); // Debug log

        // Encuentra el detalle de mantenimiento correspondiente
        const detalleMantenimiento = this.detalleMantenimientos.find(detalle => detalle.mantenimiento === mantenimientoID);
        if (detalleMantenimiento) {
          this.editableDetalleMantenimiento = { ...detalleMantenimiento };
          console.log('Detalle de mantenimiento encontrado:', this.editableDetalleMantenimiento); // Debug log
        } else {
          console.log('No se encontró detalle de mantenimiento para este mantenimiento.');
        }
      }
    }
  }

  saveMantenimiento(mantenimientoID: number): void {
    console.log('Guardando mantenimiento:', this.editableMantenimiento); // Debug log
    if (this.editableMantenimiento.idMantenimiento !== undefined) {
      this.mantenimientoService.updateMantenimiento(this.editableMantenimiento as Mantenimiento).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            // Actualizar el detalle de mantenimiento si ha sido editado
            if (this.editableDetalleMantenimiento && this.editableDetalleMantenimiento.idDetalleMantenimiento !== undefined) { // Asegurar que idDetalleMantenimiento esté definido
              this._detalleMantenimientoService.updateDetalleMantenimiento(this.editableDetalleMantenimiento as DetalleManVehiculo).subscribe({
                next: (detalleResponse: any) => {
                  console.log(detalleResponse);
                  this.showSuccessAlertEdit();
                },
                error: (detalleError: any) => {
                  console.error('Error al actualizar detalle de mantenimiento:', detalleError);
                }
              });
            }
  
            // Actualizar el mantenimiento en la lista
            const index = this.mantenimientos.findIndex(m => m.idMantenimiento === mantenimientoID);
            if (index !== -1) {
              this.mantenimientos[index] = this.editableMantenimiento as Mantenimiento;
              console.log('Mantenimiento guardado:', this.editableMantenimiento); // Debug log
            }
            this.editingMantenimientoId = null;
            this.editableMantenimiento = {};
            this.editableDetalleMantenimiento = {}; // Restablecer el detalle de mantenimiento editado
          }
        },
        error: (err: any) => {
          console.error('Error al guardar mantenimiento:', err);
          this.showErrorAlertEdit(err);
        }
      });
    }
  }
  

  cancelEdit(): void {
    console.log('Cancelando edición'); // Debug log
    this.editingMantenimientoId = null;
    this.editableMantenimiento = {};
    this.editableDetalleMantenimiento = {}; // Restablecer el detalle de mantenimiento editado
  }

  isEditing(mantenimientoID: number): boolean {
    return this.editingMantenimientoId === mantenimientoID;
  }

  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Mantenimientos eliminados!',
      text: 'Los mantenimientos han sido eliminados correctamente.',
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
      title: 'Mantenimiento editado!',
      text: 'El mantenimiento ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar los mantenimientos.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar los mantenimientos. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el mantenimiento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el mantenimiento. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Mantenimiento']);
  }

}

