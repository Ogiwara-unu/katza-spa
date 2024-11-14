import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivos } from '../../models/dispositivos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DispositivoService } from '../../services/dispositivo.service';
import Swal from 'sweetalert2';
import { Tipodispositivo } from '../../models/tipodispositivo';
import { TipoDispositivoService } from '../../services/tipoDespositivo.service';

@Component({
  selector: 'app-mostrardispositivos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrardispositivos.component.html',
  styleUrl: './mostrardispositivos.component.css'
})
export class MostrardispositivosComponent {

  public dispositivo: Dispositivos[] = [];
  public tipoDispositivo: Tipodispositivo[]=[];
  public ids: number[] = [];
  public editableDispositivo: Partial<Dispositivos> = {};
  public editingDispositivoId: number | null = null;

  filteredDispositivos: Dispositivos[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router: Router,private dispositivosService:DispositivoService,
    private tipoDispositivoService:TipoDispositivoService
  ) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Dispositivo']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredDispositivos.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.dispositivosService.getAllDispositivos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dispositivo = response.data;
        this.filteredDispositivos = this.dispositivo; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.tipoDispositivoService.getAllTipoDispositivo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tipoDispositivo = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  saveDispositivo(dispositivoID: number) {
    console.log(this.editableDispositivo);
    if (this.editableDispositivo.idDispositivos !== undefined) {
      this.dispositivosService.updateDispositivos(this.editableDispositivo as Dispositivos).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.dispositivo.findIndex(Departamento => Departamento.idDispositivos === dispositivoID);
            if (index !== -1) {
              this.dispositivo[index] = this.editableDispositivo as Dispositivos;
            }
            this.editingDispositivoId = null;
            this.editableDispositivo = {};
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

  editDispositivo() {
    if (this.ids.length === 1) {
      const dispositivoID = this.ids[0];
      this.editingDispositivoId = dispositivoID;
      const dispositivo = this.dispositivo.find(t => t.idDispositivos === dispositivoID);
      if (dispositivo) {
        this.editableDispositivo = { ...dispositivo };
      }
    }
  }

  cancelEdit() {
    this.editingDispositivoId = null;
    this.editableDispositivo = {};
  }

  isEditing(dispositivoID: number): boolean {
    return this.editingDispositivoId === dispositivoID;
  }

  updateSelectedDispositivo(dispositivoID: number) {
    if (this.ids.includes(dispositivoID)) {
      this.ids = this.ids.filter(id => id !== dispositivoID);
    } else {
      this.ids.push(dispositivoID);
    }
  }

  getPaginatedDispositivo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredDispositivos.slice(start, end);
  }

  deleteDispositivo() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Dispositivos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.dispositivosService.deleteDispositivos(id).subscribe({
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
      this.filteredDispositivos = this.dispositivo.filter(Dispositivo => {
        const idString = Dispositivo.marca.toString().toLowerCase();
        const tipoDispositivoName = this.getTipoDispositivoName(Dispositivo.tipoDispositivo).toLowerCase();
        return idString.includes(searchTermLower) ||
               tipoDispositivoName.includes(searchTermLower);
      });
    } else {
      this.filteredDispositivos = this.dispositivo;
    }
    this.currentPage = 1; // Reset to first page after search
  }

  getTipoDispositivoName(tipoDispositivoID: number): string {
    const tipoDispositivo = this.tipoDispositivo.find(t => t.idTipoDispositivo === tipoDispositivoID);
    return tipoDispositivo ? tipoDispositivo.nombre : '';
  }
  
  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Dispositivos eliminados!',
      text: 'Los dispositivos han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el dispositivo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el dispositivo. Intente nuevamente más tarde.';
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
      title: 'Repuesto!',
      text: 'Los dispositivos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

}
