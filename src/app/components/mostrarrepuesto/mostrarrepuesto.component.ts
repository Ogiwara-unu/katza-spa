import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Repuesto } from '../../models/repuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tiporepuesto } from '../../models/tiporepuesto';
import { RepuestoService } from '../../services/repuesto.service';
import { TipoRepuestoService } from '../../services/tipoRepuesto.service';
import Swal from 'sweetalert2'; 
import { Modelorepuesto } from '../../models/modelorepuesto';


@Component({
  selector: 'app-mostrarrepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrarrepuesto.component.html',
  styleUrl: './mostrarrepuesto.component.css'
})
export class MostrarrepuestoComponent implements OnInit {

  public repuesto: Repuesto[] = [];
  public tipoRepuesto: Tiporepuesto[]=[];
  public modeloR: Modelorepuesto[]=[];
  public ids: number[] = [];
  public editableRepuesto: Partial<Repuesto> = {};
  public editingRepuestoId: number | null = null;

  filteredRepuesto: Repuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router: Router,private repuestoService:RepuestoService,
    private tipoRepuestoService:TipoRepuestoService
  ) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Repuesto']);
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredRepuesto.length) {
      this.currentPage++;
    }
  }


  ngOnInit(): void {
    this.repuestoService.getAllRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.repuesto = response.data;
        this.filteredRepuesto = this.repuesto; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.tipoRepuestoService.getAllTipoRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tipoRepuesto = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }


  

  saveRepuesto(repuestoId: number) {
    console.log(this.editableRepuesto);
    if (this.editableRepuesto.idRepuesto !== undefined) {
      this.repuestoService.updateRepuesto(this.editableRepuesto as Repuesto).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.repuesto.findIndex(Departamento => Departamento.idRepuesto === repuestoId);
            if (index !== -1) {
              this.repuesto[index] = this.editableRepuesto as Repuesto;
            }
            this.editingRepuestoId = null;
            this.editableRepuesto = {};
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

  editRepuesto() {
    if (this.ids.length === 1) {
      const repuestoId = this.ids[0];
      this.editingRepuestoId = repuestoId;
      const repuesto = this.repuesto.find(t => t.idRepuesto === repuestoId);
      if (repuesto) {
        this.editableRepuesto = { ...repuesto };
      }
    }
  }

  cancelEdit() {
    this.editingRepuestoId = null;
    this.editableRepuesto = {};
  }

  isEditing(repuestoID: number): boolean {
    return this.editingRepuestoId === repuestoID;
  }

  updateSelectedTipoDispositivo(repuestoID: number) {
    if (this.ids.includes(repuestoID)) {
      this.ids = this.ids.filter(id => id !== repuestoID);
    } else {
      this.ids.push(repuestoID);
    }
  }

  getPaginatedRepuesto() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredRepuesto.slice(start, end);
  }

  deleteRepuesto() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Repuestos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.repuestoService.deleteRepuesto(id).subscribe({
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
      this.filteredRepuesto = this.repuesto.filter(Repuesto => {
        const idString = Repuesto.idRepuesto.toString().toLowerCase();
        const tipoRepuestoName = this.getTipoRepuestoName(Repuesto.tipoRepuesto).toLowerCase();
        return idString.includes(searchTermLower) ||
               tipoRepuestoName.includes(searchTermLower);
      });
    } else {
      this.filteredRepuesto = this.repuesto;
    }
    this.currentPage = 1; // Reset to first page after search
  }
  
  getTipoRepuestoName(idTiporepuesto: number): string {
    const tipoRepuesto = this.tipoRepuesto.find(t => t.idTipoRepuesto === idTiporepuesto);
    return tipoRepuesto ? tipoRepuesto.nombre : '';
  }

  getModeloRepuestoName(idModeloRepuesto: number): string {
    const modeloRepuesto = this.modeloR.find(m => m.idModeloRepuesto === idModeloRepuesto);
    return modeloRepuesto ? modeloRepuesto.modelo : '';
  }
  

  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Repuestos eliminados!',
      text: 'Los repuestos han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el repuesto.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el repuesto. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el repuestos.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el repuesto. Intente nuevamente más tarde.';
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
      text: 'Los repuestos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

   

  

}

