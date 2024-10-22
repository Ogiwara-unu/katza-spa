import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Detalleprestamovehiculo } from '../../models/detalleprestamovehiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrarprestamovehiculo',
  standalone: true,
  imports: [],
  templateUrl: './mostrarprestamovehiculo.component.html',
  styleUrl: './mostrarprestamovehiculo.component.css'
})
export class MostrarprestamovehiculoComponent {

  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Prestamo-Vehiculo']);
  }

  filteredPrestamoVehiculo: Detalleprestamovehiculo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPrestamoVehiculo.length) {
      this.currentPage++;
    }
  }


}
