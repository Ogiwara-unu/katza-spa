import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Detalleprestamodispositivo } from '../../models/detalleprestamodispositivo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrarprestamodispositivo',
  standalone: true,
  imports: [],
  templateUrl: './mostrarprestamodispositivo.component.html',
  styleUrl: './mostrarprestamodispositivo.component.css'
})
export class MostrarprestamodispositivoComponent {
  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Prestamo-Dispositivo']);
  }

  filteredPrestamoDispositivo: Detalleprestamodispositivo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPrestamoDispositivo.length) {
      this.currentPage++;
    }
  }

}
