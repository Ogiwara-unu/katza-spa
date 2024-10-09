import { CommonModule } from '@angular/common';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrarvehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrarvehiculo.component.html',
  styleUrls: ['./mostrarvehiculo.component.css']
})

export class MostrarvehiculoComponent implements OnInit {
 
  
  public Vehiculos: Vehiculo[] = [];
  public ids: number[] = [];
  public editableVehiculo: Partial<Vehiculo> = {};
  public editingVehiculoId: number | null = null;

  filteredVehiculo: Vehiculo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  ngOnInit(): void {
    this.vehiculoService.getAllVehiculo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.Vehiculos = response.data;
        this.filteredVehiculo = this.Vehiculos; // Inicializa filteredDepartamentos con todos los departamentos al principio
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredVehiculo = this.Vehiculos.filter(Vehiculo => {
        const idString = Vehiculo.placaVehiculo.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
        Vehiculo.modelo.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredVehiculo = this.Vehiculos;
    }
    this.currentPage = 1; // Reset to first page after search
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredVehiculo.length) {
      this.currentPage++;
    }
  }

  updateSelectedVehiculo(VehiculoId: number) {
    if (this.ids.includes(VehiculoId)) {
      this.ids = this.ids.filter(id => id !== VehiculoId);
    } else {
      this.ids.push(VehiculoId);
    }
  }

  getPaginatedVehiculos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredVehiculo.slice(start, end);
  }

  deleteVehiculoa() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Vehículos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.vehiculoService.deleteVehiculo(id).subscribe({
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


  editVehiculo() {
    if (this.ids.length === 1) {
      const VehiculoId = this.ids[0];
      this.editingVehiculoId = VehiculoId;
      const vehiculo = this.Vehiculos.find(vehiculo => vehiculo.placaVehiculo === VehiculoId);
      if (vehiculo) {
        this.editableVehiculo = { ...vehiculo };
      }
    }
  }

  saveVehiculo(VehiculoId: number) {
    console.log(this.editableVehiculo);
    if (this.editableVehiculo.placaVehiculo !== undefined) {
      this.vehiculoService.updateVehiculo(this.editableVehiculo as Vehiculo).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.Vehiculos.findIndex( vehiculo => vehiculo.placaVehiculo === VehiculoId);
            if (index !== -1) {
              this.Vehiculos[index] = this.editableVehiculo as Vehiculo;
            }
            this.editingVehiculoId = null;
            this.editableVehiculo = {};
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
    this.editingVehiculoId = null;
    this.editableVehiculo = {};
  }

  isEditing(VehiculoId: number): boolean {
    return this.editingVehiculoId === VehiculoId;
  }

  private showSuccessAlertEdit() {
    Swal.fire({
      title: 'Vehiculo editado!',
      text: 'El Vehiculo ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el Vehiculo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el Vehiculo. Intente nuevamente más tarde.';
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
      title: 'Vehiculos eliminados!',
      text: 'Los Vehiculos han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar los Vehiculos.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar los Vehiculos. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Vehiculo']);
  }


}





