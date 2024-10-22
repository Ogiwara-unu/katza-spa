import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Marcarepuesto } from '../../models/marcarepuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrarmarcarepuestos',
  standalone: true,
  imports: [],
  templateUrl: './mostrarmarcarepuestos.component.html',
  styleUrl: './mostrarmarcarepuestos.component.css'
})
export class MostrarmarcarepuestosComponent {
  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Marca-Repuesto']);
  }

  filteredMarcaRepuesto: Marcarepuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

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


}
