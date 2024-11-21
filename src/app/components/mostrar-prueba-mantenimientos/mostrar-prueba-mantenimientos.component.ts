import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { TipomantenimientoService } from '../../services/tipomantenimiento.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DetalleManVehiculo } from '../../models/detalleManVehiculo';
import { DetalleMantenimientoService } from '../../services/detalle-mantenimiento.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-mostrar-prueba-mantenimientos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrar-prueba-mantenimientos.component.html',
  styleUrl: './mostrar-prueba-mantenimientos.component.css'
})
export class MostrarPruebaMantenimientosComponent {
  public mantenimientos: Mantenimiento [] = [];
  public tipoMantenimiento: any [] = [];
  public detallesMantenimientos: any [] = [];
  public vehiculos: any [] = [];
  public empleados: any [] = [];
  public editableDetalleMantenimiento: Partial<DetalleManVehiculo> = {};
  public ids: number[] = [];
  public editableMantenimiento: Partial<Mantenimiento> = {};
  public editingMantenimientoId: number | null = null;

  filteredMantenimientos: Mantenimiento[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private mantenimientoSrv:MantenimientoService,
    private tipoManteSrv:TipomantenimientoService,
    private vehiculosSrv:VehiculoService,private router:Router,
    private _detalleMantenimientoService: DetalleMantenimientoService,
    private empleadoSrv:EmpleadoService ){}

    ngOnInit(): void {
      this.mantenimientoSrv.getAllMantenimientos().subscribe({
        next: (response: any) => {
          this.mantenimientos = response.data;
          this.filteredMantenimientos = response.data;
          this.loadTipoMantenimiento();
          this.loadVehiculos();
          this.loadEmpleados();
          this.loadDetalles();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }

    loadTipoMantenimiento(): void {
      this.tipoManteSrv.getAllTipoMantenimientos().subscribe(
        (response: any) => {
          console.log('Tipos de mantenimiento:', response.data);  // Muestra los datos recibidos
          this.tipoMantenimiento = response.data;
          this.filteredMantenimientos.forEach(mantenimiento => {
            console.log('Tipo de mantenimiento en mantenimiento:', mantenimiento.tipoMantenimiento);  // Muestra el ID de tipoMantenimiento
            console.log('Mantenimientos:', this.mantenimientos);
            const tipoMantenimiento = this.tipoMantenimiento.find(tipo => tipo.idTipoMantenimiento === Number(mantenimiento.tipoMantenimiento));
            if (tipoMantenimiento) {
              mantenimiento.nombreTipoMantenimiento = tipoMantenimiento.nombre;
              console.log(`Mantenimiento ${mantenimiento.idMantenimiento} asignado con nombre tipo: ${mantenimiento.nombreTipoMantenimiento}`);
            } else {
              console.log(`No se encontró tipo de mantenimiento para ID: ${mantenimiento.tipoMantenimiento}`);
            }
          });
        },
        error => {
          console.log('Error fetching tipo mantenimiento:', error);
        }
      );
    }

    loadVehiculos(): void {
      this.vehiculosSrv.getAllVehiculo().subscribe(
        (response: any) => {
          console.log('Tipos de vehiculos:', response.data);  // Muestra los datos recibidos
          this.vehiculos = response.data;
          this.filteredMantenimientos.forEach(mantenimiento => {
            console.log('Vehiculoso en mantenimiento:', mantenimiento.idVehiculo);  
            const vehiculos = this.vehiculos.find(vh => vh.placaVehiculo === Number(mantenimiento.idVehiculo));
            if (vehiculos) {
              mantenimiento.nombreVehiculo = vehiculos.placa;
              console.log(`Mantenimiento ${mantenimiento.idMantenimiento} asignado con nombre vehiculo: ${mantenimiento.nombreVehiculo}`);
            } else {
              console.log(`No se encontró vehiculo para ID: ${mantenimiento.idVehiculo}`);
            }
          });
        },
        error => {
          console.log('Error fetching vehiculo mantenimiento:', error);
        }
      );
    }

    loadEmpleados(): void {
      this.empleadoSrv.getAllEmpleados().subscribe(
        (response: any) => {
          this.empleados = response.data;
          this.filteredMantenimientos.forEach(mantenimiento => {
            const empleados = this.empleados.find(emp => emp.idEmpleado === Number(mantenimiento.empleadoEncargado));
            if (empleados) {
              mantenimiento.nombreEmpleado = empleados.cedula;
            } else {
              console.log(`No se encontró vehiculo para ID: ${mantenimiento.empleadoEncargado}`);
            }
          });
        },
        error => {
          console.log('Error fetching empleados mantenimiento:', error);
        }
      );
    }

    loadDetalles(): void {
      this._detalleMantenimientoService.getAllDetalleMantenimientos().subscribe(
        (response: any) => {
          this.detallesMantenimientos = response.data;
          console.log('DETALLES', this.detallesMantenimientos);
    
          this.filteredMantenimientos.forEach(mantenimiento => {
            // Asegúrate de que el tipo de `mantenimiento.idMantenimiento` es el mismo que `dt.mantenimiento`
            const detallesMan = this.detallesMantenimientos.find(dt => dt.mantenimiento === String(mantenimiento.idMantenimiento));
            if (detallesMan) {
              mantenimiento.detalleMantenimiento = detallesMan.observaciones;
              mantenimiento.idDetalleMantenimiento = detallesMan.idDetalleMantenimiento;
              console.log(`Mantenimiento ${mantenimiento.idDetalleMantenimiento} asignado con id detalle: ${detallesMan.idDetalleMantenimiento}`);
            } else {
              console.log(`No se encontró detalle para ID: ${mantenimiento.idMantenimiento}`);
            }
          });
        },
        error => {
          console.log('Error fetching detalles mantenimiento:', error);
        }
      );
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
  
    updateSelectedMantenimiento(mantenimientoID: number) {
      if (this.ids.includes(mantenimientoID)) {
        this.ids = this.ids.filter(id => id !== mantenimientoID);
      } else {
        this.ids.push(mantenimientoID);
      }
    }
  
    getPaginatedMantenimiento() {
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
            this.mantenimientoSrv.deleteMantenimiento(id).subscribe({
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
          const idDetalle = this.editableMantenimiento.idDetalleMantenimiento
          const detalleMantenimiento = this.detallesMantenimientos.find(detalle => detalle.mantenimiento === String(idDetalle));
          if (detalleMantenimiento) {
            this.editableDetalleMantenimiento.idDetalleMantenimiento = detalleMantenimiento.idDetalleMantenimiento;
            this.editableDetalleMantenimiento.mantenimiento = detalleMantenimiento.mantenimiento;
            this.editableDetalleMantenimiento.observaciones = detalleMantenimiento.observaciones;
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
        this.mantenimientoSrv.updateMantenimiento(this.editableMantenimiento as Mantenimiento).subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.status === 200) {
              // Actualizar el detalle de mantenimiento si ha sido editado
              if (this.editableMantenimiento && this.editableDetalleMantenimiento !== undefined) { // Asegurar que idDetalleMantenimiento esté definido
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
