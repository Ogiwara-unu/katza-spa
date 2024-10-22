import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Marcarepuesto } from '../../models/marcarepuesto';
@Component({
  selector: 'app-agregarmarcarepuestos',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarmarcarepuestos.component.html',
  styleUrl: './agregarmarcarepuestos.component.css'
})
export class AgregarmarcarepuestosComponent {

  public marcaRespuesto: Marcarepuesto;

  constructor(private router: Router,) {
    this.marcaRespuesto = new Marcarepuesto (0,"");  
  }

  StoreMarcaRepuesto(createMarcaRepuestoForm: any) {
   
  }

}
