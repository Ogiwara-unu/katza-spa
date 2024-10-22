import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Detalleprestamovehiculo } from '../../models/detalleprestamovehiculo';
@Component({
  selector: 'app-agregarprestamovehiculo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarprestamovehiculo.component.html',
  styleUrl: './agregarprestamovehiculo.component.css'
})
export class AgregarprestamovehiculoComponent {

  public Detalleprestamovehiculo: Detalleprestamovehiculo;

  constructor(private router: Router,) {
    this.Detalleprestamovehiculo = new Detalleprestamovehiculo (0,0,"","","",new Date, new Date);  
  }

  StorePrestamoVehiculo(createPrestamoVehiculoForm: any) {
   
  }

}
