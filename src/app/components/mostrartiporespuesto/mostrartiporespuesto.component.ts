import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tiporepuesto } from '../../models/tiporepuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoRepuestoService } from '../../services/tipoRepuesto.service';
import Swal from 'sweetalert2'; 


@Component({
  selector: 'app-mostrartiporespuesto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrartiporespuesto.component.html',
  styleUrl: './mostrartiporespuesto.component.css'
})
export class MostrartiporespuestoComponent {

  public tipoRepuesto:Tiporepuesto[]=[];
  public ids: number[] = [];
  public editableTipoRepuesto: Partial<Tiporepuesto> = {};
  public editingTipoRepuestoId: number | null = null;

  constructor(private router: Router,private tipoRepuestoService:TipoRepuestoService) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Tipo-Repuesto']);
  }


  filteredTipoRepuesto: Tiporepuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredTipoRepuesto.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.tipoRepuestoService.getAllTipoRepuesto().subscribe({
      next: (response: any) => {
        console.log(response); // Muestra toda la respuesta
        // Iterar sobre los datos y mostrar solo los ids
        response.data.forEach((tipoRepuesto: any) => {
          console.log(tipoRepuesto.id); // Muestra solo el id de cada tipo de repuesto
        });
        this.tipoRepuesto = response.data;
        this.filteredTipoRepuesto = this.tipoRepuesto;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  saveTipoRepuesto(TipoRepuestoId: number) {
    console.log(this.editableTipoRepuesto);
    if (this.editableTipoRepuesto.idTipoRepuesto !== undefined) {
      this.tipoRepuestoService.updateTipoRepuesto(this.editableTipoRepuesto as Tiporepuesto).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.tipoRepuesto.findIndex(Departamento => Departamento.idTipoRepuesto === TipoRepuestoId);
            if (index !== -1) {
              this.tipoRepuesto[index] = this.editableTipoRepuesto as Tiporepuesto;
            }
            this.editingTipoRepuestoId = null;
            this.editableTipoRepuesto = {};
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

  editTipoRepuesto() {
    if (this.ids.length === 1) {
      const TipoRepuestoID = this.ids[0];
      this.editingTipoRepuestoId = TipoRepuestoID;
      const tipoRepuesto = this.tipoRepuesto.find(t => t.idTipoRepuesto === TipoRepuestoID);
      if (tipoRepuesto) {
        this.editableTipoRepuesto= { ...tipoRepuesto };
      }
    }
  }

  cancelEdit() {
    this.editingTipoRepuestoId = null;
    this.editableTipoRepuesto = {};
  }

  isEditing(tipoRepuestoID: number): boolean {
    return this.editingTipoRepuestoId === tipoRepuestoID;
  }

  updateSelectedTipoRepuesto(tipoRepuestoID: number) {
    if (this.ids.includes(tipoRepuestoID)) {
      this.ids = this.ids.filter(id => id !== tipoRepuestoID);
    } else {
      this.ids.push(tipoRepuestoID);
    }
  }

  getPaginatedTipoRepuesto() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredTipoRepuesto.slice(start, end);
  }


  deleteTipoDispositivo() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Tipo de repuestos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.tipoRepuestoService.deleteTipoRepuesto(id).subscribe({
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
      this.filteredTipoRepuesto = this.tipoRepuesto.filter(Tiporepuesto => {
        const idString = Tiporepuesto.idTipoRepuesto.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               Tiporepuesto.nombre.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredTipoRepuesto = this.tipoRepuesto;
    }
    this.currentPage = 1; // Reset to first page after search
  }


  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'tipo Repuesto eliminados!',
      text: 'Los tipos de repuesto han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar los tipos de repuestos.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el tipo de repuesto. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el tipo de repuesto.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el tipo de repuesto. Intente nuevamente más tarde.';
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
      title: 'Tipo de repuesto!',
      text: 'Los tipos de repuestos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }



}
