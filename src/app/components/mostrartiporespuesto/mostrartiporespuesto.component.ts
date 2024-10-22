import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tiporepuesto } from '../../models/tiporepuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrartiporespuesto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrartiporespuesto.component.html',
  styleUrl: './mostrartiporespuesto.component.css'
})
export class MostrartiporespuestoComponent {

  public tipoRepuesto:Tiporepuesto[]=[];

  constructor(private router: Router) {}

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

}
