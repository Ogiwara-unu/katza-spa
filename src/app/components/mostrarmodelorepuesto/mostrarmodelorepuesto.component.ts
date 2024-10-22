import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modelorepuesto } from '../../models/modelorepuesto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrarmodelorepuesto',
  standalone: true,
  imports: [],
  templateUrl: './mostrarmodelorepuesto.component.html',
  styleUrl: './mostrarmodelorepuesto.component.css'
})
export class MostrarmodelorepuestoComponent {
  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Modelo-Repuesto']);
  }


  filteredModeloRepuesto: Modelorepuesto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

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


}
