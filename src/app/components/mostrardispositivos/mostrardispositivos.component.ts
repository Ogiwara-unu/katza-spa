import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivos } from '../../models/dispositivos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrardispositivos',
  standalone: true,
  imports: [],
  templateUrl: './mostrardispositivos.component.html',
  styleUrl: './mostrardispositivos.component.css'
})
export class MostrardispositivosComponent {
  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Dispositivo']);
  }

  filteredDispositivos: Dispositivos[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredDispositivos.length) {
      this.currentPage++;
    }
  }

}
