import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tipodispositivo } from '../../models/tipodispositivo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 
import { TipoDispositivoService } from '../../services/tipoDespositivo.service';


@Component({
  selector: 'app-mostrartipodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrartipodispositivo.component.html',
  styleUrl: './mostrartipodispositivo.component.css'
})
export class MostrartipodispositivoComponent implements OnInit {

  public tipoDispositivo: Tipodispositivo[] = [];
  public ids: number[] = [];
  public editableTipoDispositivo: Partial<Tipodispositivo> = {};
  public editingTipoDispositivoId: number | null = null;

  filteredTipoDispositivo: Tipodispositivo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router: Router,private tipoDispositivoService:TipoDispositivoService) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Tipo-Dispositivo']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredTipoDispositivo.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.tipoDispositivoService.getAllTipoDispositivo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tipoDispositivo = response.data;
        this.filteredTipoDispositivo = this.tipoDispositivo; // Inicializa filteredDepartamentos con todos los departamentos al principio
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  saveTipoDispositivo(TipoDispositivoId: number) {
    console.log(this.editableTipoDispositivo);
    if (this.editableTipoDispositivo.idTipoDispositivo !== undefined) {
      this.tipoDispositivoService.updateTipoDispositivo(this.editableTipoDispositivo as Tipodispositivo).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.tipoDispositivo.findIndex(Departamento => Departamento.idTipoDispositivo === TipoDispositivoId);
            if (index !== -1) {
              this.tipoDispositivo[index] = this.editableTipoDispositivo as Tipodispositivo;
            }
            this.editingTipoDispositivoId = null;
            this.editableTipoDispositivo = {};
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

  editTipoDispositivo() {
    if (this.ids.length === 1) {
      const TipoDispositivoId = this.ids[0];
      this.editingTipoDispositivoId = TipoDispositivoId;
      const tipoDispositivo = this.tipoDispositivo.find(t => t.idTipoDispositivo === TipoDispositivoId);
      if (tipoDispositivo) {
        this.editableTipoDispositivo = { ...tipoDispositivo };
      }
    }
  }

  cancelEdit() {
    this.editingTipoDispositivoId = null;
    this.editableTipoDispositivo = {};
  }

  isEditing(TipoDispositivoId: number): boolean {
    return this.editingTipoDispositivoId === TipoDispositivoId;
  }

  updateSelectedTipoDispositivo(tipoDispositivoId: number) {
    if (this.ids.includes(tipoDispositivoId)) {
      this.ids = this.ids.filter(id => id !== tipoDispositivoId);
    } else {
      this.ids.push(tipoDispositivoId);
    }
  }

  getPaginatedTipoDispositivo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredTipoDispositivo.slice(start, end);
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
        console.log("Tipo de Dispositivos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.tipoDispositivoService.deleteTipoDispositivo(id).subscribe({
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
      this.filteredTipoDispositivo = this.tipoDispositivo.filter(Tipodispositivo => {
        const idString = Tipodispositivo.idTipoDispositivo.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               Tipodispositivo.nombre.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredTipoDispositivo = this.tipoDispositivo;
    }
    this.currentPage = 1; // Reset to first page after search
  }

  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'tipo dispositivo eliminados!',
      text: 'Los tipos dispositivos han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el tipo de dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el tipo dispositivo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el tipo dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el tipo de dispositivo. Intente nuevamente más tarde.';
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
      title: 'tipo Dispositivo!',
      text: 'Los tipos dispositivos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }



}
