import { Component } from '@angular/core';
import { Tipodispositivo } from '../../models/tipodispositivo';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-agregartipodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './agregartipodispositivo.component.html',
  styleUrl: './agregartipodispositivo.component.css'
})
export class AgregartipodispositivoComponent {


  public tipoDispositivo: Tipodispositivo;

  constructor(private router: Router,) {
    this.tipoDispositivo = new Tipodispositivo (0,"",); 
  }

  StoreTipoDispositivo(createTipoDispositivoForm: any) {
   
  }


}
