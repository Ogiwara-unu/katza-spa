import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Repuesto } from '../../models/repuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrarrepuesto',
  standalone: true,
  imports: [],
  templateUrl: './mostrarrepuesto.component.html',
  styleUrl: './mostrarrepuesto.component.css'
})
export class MostrarrepuestoComponent {

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
  

  

}
