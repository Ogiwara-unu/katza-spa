import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Detalleprestamodispositivo } from '../../models/detalleprestamodispositivo';

@Component({
  selector: 'app-agregarprestamodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarprestamodispositivo.component.html',
  styleUrl: './agregarprestamodispositivo.component.css'
})
export class AgregarprestamodispositivoComponent {

  public detalePrestamoDispositivos: Detalleprestamodispositivo;

  constructor(private router: Router,) {
    this.detalePrestamoDispositivos = new Detalleprestamodispositivo (0,"",0,0,new Date,);  
  }

  StorePrestamoDispositivo(createPrestamoVehiculoForm: any) {
   
  }

}
