import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marcarepuesto } from '../../models/marcarepuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 
import { MarcaRepuestoService } from '../../services/marcaRepuesto.service';


@Component({
  selector: 'app-mostrarmarcarepuestos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrarmarcarepuestos.component.html',
  styleUrl: './mostrarmarcarepuestos.component.css'
})
export class MostrarmarcarepuestosComponent implements OnInit {

  public marcaRepuestos: Marcarepuesto[] = [];
  public ids: number[] = [];
  public editableMarcaRepuesto: Partial<Marcarepuesto> = {};
  public editingMarcaRepuestoId: number | null = null;

  filteredMarcaRepuesto: Marcarepuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  constructor(private router: Router,private marcaRepuestoService:MarcaRepuestoService) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Marca-Repuesto']);
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredMarcaRepuesto.length) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    this.marcaRepuestoService.getAllTipoMarcaRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.marcaRepuestos = response.data;
        this.filteredMarcaRepuesto = this.marcaRepuestos; // Inicializa filteredDepartamentos con todos los departamentos al principio
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  saveMarcaRepuesto(marcaRepuestoId: number) {
    console.log(this.editableMarcaRepuesto);
    if (this.editableMarcaRepuesto.idMarcaRepuesto !== undefined) {
      this.marcaRepuestoService.updateMarcaRepuesto(this.editableMarcaRepuesto as Marcarepuesto).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200) {
            const index = this.marcaRepuestos.findIndex(Departamento => Departamento.idMarcaRepuesto === marcaRepuestoId);
            if (index !== -1) {
              this.marcaRepuestos[index] = this.editableMarcaRepuesto as Marcarepuesto;
            }
            this.editingMarcaRepuestoId = null;
            this.editableMarcaRepuesto = {};
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


  editMarcaRepuesto() {
    if (this.ids.length === 1) {
      const marcaRepuestoID = this.ids[0];
      this.editingMarcaRepuestoId = marcaRepuestoID;
      const marcaRepuesto = this.marcaRepuestos.find(t => t.idMarcaRepuesto === marcaRepuestoID);
      if (marcaRepuesto) {
        this.editableMarcaRepuesto = { ...marcaRepuesto };
      }
    }
  }

  cancelEdit() {
    this.editingMarcaRepuestoId = null;
    this.editableMarcaRepuesto = {};
  }

  isEditing(marcaRepuestoId: number): boolean {
    return this.editingMarcaRepuestoId === marcaRepuestoId;
  }

  updateSelectedMarcaRepuesto(marcaRepuestoID: number) {
    if (this.ids.includes(marcaRepuestoID)) {
      this.ids = this.ids.filter(id => id !== marcaRepuestoID);
    } else {
      this.ids.push(marcaRepuestoID);
    }
  }

  getPaginatedMarcaRepuesto() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredMarcaRepuesto.slice(start, end);
  }

  deleteMarcaRepuesto() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Marcas seleccionadas para eliminar:", this.ids);
        let completedRequests = 0;

        this.ids.forEach(id => {
          this.marcaRepuestoService.deleteMarcaRepuesto(id).subscribe({
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
      this.filteredMarcaRepuesto = this.marcaRepuestos.filter(marcaRepuesto => {
        const idString = marcaRepuesto.idMarcaRepuesto.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               marcaRepuesto.nombre.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredMarcaRepuesto = this.marcaRepuestos;
    }
    this.currentPage = 1; // Reset to first page after search
  }



  showSuccessAlertDelete(): void {
    Swal.fire({
      title: 'Marca Repuestos eliminados!',
      text: 'Las marcas han sido eliminadas correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  private showErrorAlertDelete(error: any) {
    let errorMessage = 'Hubo un problema al eliminar la marca.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo eliminar la marca. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlertEdit(error: any) {
    let errorMessage = 'Hubo un problema al editar la marca.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo editar la marca. Intente nuevamente más tarde.';
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
      title: 'Marca repuesto!',
      text: 'La marca ha sido editada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

}
