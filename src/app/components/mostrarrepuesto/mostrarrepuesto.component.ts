import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Repuesto } from '../../models/repuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tiporepuesto } from '../../models/tiporepuesto';


@Component({
  selector: 'app-mostrarrepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrarrepuesto.component.html',
  styleUrl: './mostrarrepuesto.component.css'
})
export class MostrarrepuestoComponent {

  public repuesto: Repuesto[] = [];
  public tipoRepuesto: Tiporepuesto[]=[];

  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Repuesto']);
  }


  filteredRepuesto: Repuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

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
  
  // Función para obtener el nombre del tipo de repuesto
  getTipoRepuestoName(idTiporepuesto: number): string {
    const tipoRepuesto = this.tipoRepuesto.find(t => t.idTipoRepuesto === idTiporepuesto);
    return tipoRepuesto ? tipoRepuesto.nombre : '';
  }
  
   

  

}

