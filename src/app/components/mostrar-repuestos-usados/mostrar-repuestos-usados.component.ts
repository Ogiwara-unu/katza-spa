import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Repuestousados } from '../../models/repuestousados';
import { Repuesto } from '../../models/repuesto';
import { Mantenimiento } from '../../models/mantenimiento';
import { Router } from '@angular/router';
import { RepuestoUsadosService } from '../../services/repuestoUsado.service';
import { RepuestoService } from '../../services/repuesto.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-repuestos-usados',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrar-repuestos-usados.component.html',
  styleUrl: './mostrar-repuestos-usados.component.css'
})
export class MostrarRepuestosUsadosComponent {

  public repuestosUsados: Repuestousados[] = [];
  public repuestos: Repuesto[]=[];
  public mantenimientos: Mantenimiento[]=[];
  public ids: number[] = [];
  public editableRepuestosUsados: Partial<Repuestousados> = {};
  public editingRepuestosUsadosId: number | null = null;

  filteredRepuestosUsados: Repuestousados[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router:Router,private repuestosUService:RepuestoUsadosService,
    private repuestoService:RepuestoService,private mantenimientoService:MantenimientoService){}

    navigateToAdd(): void {
      this.router.navigate(['/Agregar-Repuestos-Usados']);
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    nextPage(): void {
      if (this.currentPage * this.itemsPerPage < this.filteredRepuestosUsados.length) {
        this.currentPage++;
      }
    }
  
    ngOnInit(): void {
      this.repuestosUService.getAllRepuestoUsado().subscribe({
        next: (response: any) => {
          console.log(response);
          this.repuestosUsados = response.data;
          this.filteredRepuestosUsados = this.repuestosUsados; 
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  
      this.repuestoService.getAllRepuesto().subscribe({
        next: (response: any) => {
          console.log(response);
          this.repuestos = response.data;
        },
        error: (err: any) => {
          console.error(err);
        }
      });

      this.mantenimientoService.getAllMantenimientos().subscribe({
        next: (response: any) => {
          console.log(response);
          this.mantenimientos = response.data;
        },
        error: (err: any) => {
          console.error(err);
        }
      });

    }

    saveRepuestoUsado(repuestoUsadoID: number) {
      console.log(this.editableRepuestosUsados);
      if (this.editableRepuestosUsados.idRepuestosUsados !== undefined) {
        this.repuestosUService.updateRepuestoUsado(this.editableRepuestosUsados as Repuestousados).subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.status === 200) {
              const index = this.repuestosUsados.findIndex(Departamento => Departamento.idRepuestosUsados === repuestoUsadoID);
              if (index !== -1) {
                this.repuestosUsados[index] = this.editableRepuestosUsados as Repuestousados;
              }
              this.editingRepuestosUsadosId = null;
              this.editableRepuestosUsados = {};
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

    editRepuestoUsado() {
      if (this.ids.length === 1) {
        const repuestoUsadoID = this.ids[0];
        this.editingRepuestosUsadosId = repuestoUsadoID;
        const repuestoUsado = this.repuestosUsados.find(t => t.idRepuestosUsados === repuestoUsadoID);
        if (repuestoUsado) {
          this.editableRepuestosUsados = { ...repuestoUsado };
        }
      }
    }
  
    cancelEdit() {
      this.editingRepuestosUsadosId = null;
      this.editableRepuestosUsados = {};
    }
  
    isEditing(repuestoUsadoID: number): boolean {
      return this.editingRepuestosUsadosId === repuestoUsadoID;
    }

    updateSelectedRepuestoUsado(repuestoUsadoID: number) {
      if (this.ids.includes(repuestoUsadoID)) {
        this.ids = this.ids.filter(id => id !== repuestoUsadoID);
      } else {
        this.ids.push(repuestoUsadoID);
      }
    }
  
    getPaginatedRepuestoUsado() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.filteredRepuestosUsados.slice(start, end);
    }
  
    deleteRepuestoUsado() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Repuestos Usados seleccionados para eliminar:", this.ids);
          let completedRequests = 0;
  
          this.ids.forEach(id => {
            this.repuestosUService.deleteRepuestoUsado(id).subscribe({
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
        this.filteredRepuestosUsados = this.repuestosUsados.filter(RepuestosUsados => {
          const idString = RepuestosUsados.repuesto.toString().toLowerCase();
          return idString.includes(searchTermLower);
        });
      } else {
        this.filteredRepuestosUsados = this.repuestosUsados;
      }
      this.currentPage = 1; // Reset to first page after search
    }



    showSuccessAlertDelete(): void {
      Swal.fire({
        title: 'Repuestos Usados eliminados!',
        text: 'Los repuestos usados han sido eliminados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }
  
    private showErrorAlertDelete(error: any) {
      let errorMessage = 'Hubo un problema al eliminar el repuesto usado.';
      if (error.status === 500) {
        errorMessage = 'Error del servidor: No se pudo eliminar el repuesto usado. Intente nuevamente más tarde.';
      }
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  
    private showErrorAlertEdit(error: any) {
      let errorMessage = 'Hubo un problema al editar el repuesto usado.';
      if (error.status === 500) {
        errorMessage = 'Error del servidor: No se pudo editar el repuesto usado. Intente nuevamente más tarde.';
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
        text: 'Los repuestos usados han sido editados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }
  
}
