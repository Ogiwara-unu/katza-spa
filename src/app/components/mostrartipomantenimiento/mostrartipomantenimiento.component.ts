import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoMantenimiento } from '../../models/tipoMantenimiento';
import { TipomantenimientoService } from '../../services/tipomantenimiento.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrartipomantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrartipomantenimiento.component.html',
  styleUrl: './mostrartipomantenimiento.component.css'
})

export class MostrartipomantenimientoComponent  implements OnInit  {

  public TipoMantenimientos:TipoMantenimiento[]=[];
  public ids: number[] = [];
  public editableTipoMantenimeinto: Partial<TipoMantenimiento> = {};
  public editingTipoMantenimeintoId: number | null = null;


  filteredTipoMantenimiento: TipoMantenimiento[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor (private tipomantenimeintoService:TipomantenimientoService, private router: Router){}


  ngOnInit(): void {
    this.tipomantenimeintoService.getAllTipoMantenimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.TipoMantenimientos = response.data;
        this.filteredTipoMantenimiento = this.TipoMantenimientos; // Inicializa filteredDepartamentos con todos los departamentos al principio
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  

  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredTipoMantenimiento = this.TipoMantenimientos.filter(TipoMantenimiento => {
        const idString = TipoMantenimiento.idTipoMantenimiento.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               TipoMantenimiento.nombre.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredTipoMantenimiento = this.TipoMantenimientos;
    }
    this.currentPage = 1; // Reset to first page after search
  }
  
  

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredTipoMantenimiento.length) {
      this.currentPage++;
    }
  }

  
  updateSelectedTipoMantenimeinto(TippoMantenimeintoId: number) {
    if (this.ids.includes(TippoMantenimeintoId)) {
      this.ids = this.ids.filter(id => id !== TippoMantenimeintoId);
    } else {
      this.ids.push(TippoMantenimeintoId);
    }
  }

  getPaginatedTipoMantenimeinto() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredTipoMantenimiento.slice(start, end);
  }

  

  deleteTipoMantenimiento() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Tipo de mantenimeinto seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.tipomantenimeintoService.deleteTipoMantenimiento(id).subscribe({
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

  editTipoMantenimiento() {
    if (this.ids.length === 1) {
      const TipoMantenimientoId = this.ids[0];
      this.editingTipoMantenimeintoId = TipoMantenimientoId;
      const tipomantenimiento = this.TipoMantenimientos.find(t => t.idTipoMantenimiento === TipoMantenimientoId);
      if (tipomantenimiento) {
        this.editableTipoMantenimeinto = { ...tipomantenimiento };
      }
    }
  }

  saveTipoMantenimeinto(TipoMantenimientoId: number) {
    console.log(this.editableTipoMantenimeinto);
    if (this.editableTipoMantenimeinto.idTipoMantenimiento !== undefined) {
      this.tipomantenimeintoService.updateTipoMantenimiento(this.editableTipoMantenimeinto as TipoMantenimiento).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.TipoMantenimientos.findIndex(Departamento => Departamento.idTipoMantenimiento === TipoMantenimientoId);
            if (index !== -1) {
              this.TipoMantenimientos[index] = this.editableTipoMantenimeinto as TipoMantenimiento;
            }
            this.editingTipoMantenimeintoId = null;
            this.editableTipoMantenimeinto = {};
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
    this.editingTipoMantenimeintoId = null;
    this.editableTipoMantenimeinto = {};
  }

  isEditing(TipoMantenimeintoId: number): boolean {
    return this.editingTipoMantenimeintoId === TipoMantenimeintoId;
  }

  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'tipo Mantenimiento eliminados!',
      text: 'Los tipos de mantenimiento han sido eliminados correctamente.',
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
      title: 'tipo Mantenimiento!',
      text: 'El tipos de mantenimiento ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el tipo de mantenimiento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el tipo de mantenimiento. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


  

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el tipo mantenimiento.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el tipo de mantenimiento. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }



  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Tipo-Mantenimeinto']);
  }

}
