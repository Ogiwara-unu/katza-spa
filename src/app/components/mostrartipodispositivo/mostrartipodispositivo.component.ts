import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tipodispositivo } from '../../models/tipodispositivo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mostrartipodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrartipodispositivo.component.html',
  styleUrl: './mostrartipodispositivo.component.css'
})
export class MostrartipodispositivoComponent {

  public tipoDispositivo: Tipodispositivo[] = [];

  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/Agregar-Tipo-Dispositivo']);
  }


  filteredTipoDispositivo: Tipodispositivo[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredTipoDispositivo.length) {
      this.currentPage++;
    }
  }

  search(): void {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredTipoDispositivo = this.tipoDispositivo.filter(Tipodispositivo => {
        const idString = Tipodispositivo.idTipoDispositivo.toString().toLowerCase();
        return idString.includes(searchTermLower) ||
               Tipodispositivo.nombre.toLowerCase().includes(searchTermLower);
      });
    } else {
      this.filteredTipoDispositivo = this.tipoDispositivo;
    }
    this.currentPage = 1; // Reset to first page after search
  }


}
