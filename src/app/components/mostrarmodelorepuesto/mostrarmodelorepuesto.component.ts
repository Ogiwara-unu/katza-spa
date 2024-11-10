import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modelorepuesto } from '../../models/modelorepuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 
import { ModeloRepuestoService } from '../../services/modeloRepuesto.service';


@Component({
  selector: 'app-mostrarmodelorepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrarmodelorepuesto.component.html',
  styleUrl: './mostrarmodelorepuesto.component.css'
})
export class MostrarmodelorepuestoComponent implements OnInit {

  public modeloRepuesto: Modelorepuesto[] = [];
  public ids: number[] = [];
  public editableModeloRepuesto: Partial<Modelorepuesto> = {};
  public editingModeloRepuestoId: number | null = null;

  filteredModeloRepuesto: Modelorepuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router: Router,private modeloRepuestoService:ModeloRepuestoService) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Modelo-Repuesto']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredModeloRepuesto.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.modeloRepuestoService.getAllTipoModeloRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.modeloRepuesto = response.data;
        this.filteredModeloRepuesto = this.modeloRepuesto; 
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  saveModeloRepuesto(modeloRepuestoID: number) {
    console.log(this.editableModeloRepuesto);
    if (this.editableModeloRepuesto.idModeloRepuesto !== undefined) {
      this.modeloRepuestoService.updateModeloRepuesto(this.editableModeloRepuesto as Modelorepuesto).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.modeloRepuesto.findIndex(Departamento => Departamento.idModeloRepuesto === modeloRepuestoID);
            if (index !== -1) {
              this.modeloRepuesto[index] = this.editableModeloRepuesto as Modelorepuesto;
            }
            this.editingModeloRepuestoId = null;
            this.editableModeloRepuesto = {};
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


  editModeloRepuesto() {
    if (this.ids.length === 1) {
      const ModeloRepuestoID = this.ids[0];
      this.editingModeloRepuestoId = ModeloRepuestoID;
      const modeloRepuesto = this.modeloRepuesto.find(t => t.idModeloRepuesto === ModeloRepuestoID);
      if (modeloRepuesto) {
        this.editableModeloRepuesto = { ...modeloRepuesto };
      }
    }
  }

  cancelEdit() {
    this.editingModeloRepuestoId = null;
    this.editableModeloRepuesto = {};
  }

  isEditing(modeloRepuestoID: number): boolean {
    return this.editingModeloRepuestoId === modeloRepuestoID;
  }

  updateSelectedModeloRepuesto(modeloRepuestoID: number) {
    if (this.ids.includes(modeloRepuestoID)) {
      this.ids = this.ids.filter(id => id !== modeloRepuestoID);
    } else {
      this.ids.push(modeloRepuestoID);
    }
  }

  getPaginatedModeloRepuesto() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredModeloRepuesto.slice(start, end);
  }

  deleteModeloRepuesto() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Modelo repuestos seleccionados para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.modeloRepuestoService.deleteModeloRepuesto(id).subscribe({
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


  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Modelo repuestos eliminados!',
      text: 'Los modelos repuestos han sido eliminados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar el modelo Repuesto.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar el modelo repuesto. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar el modelo repuesto.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar el modelo repuesto. Intente nuevamente más tarde.';
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
      title: 'Modelo repuesto!',
      text: 'Modelos repuestos han sido editados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }



}
