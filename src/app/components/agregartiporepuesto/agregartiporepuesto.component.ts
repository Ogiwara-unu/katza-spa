import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tiporepuesto } from '../../models/tiporepuesto';

@Component({
  selector: 'app-agregartiporepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregartiporepuesto.component.html',
  styleUrl: './agregartiporepuesto.component.css'
})
export class AgregartiporepuestoComponent {

  public tipoRepuesto: Tiporepuesto;

  constructor(private router: Router,) {
    this.tipoRepuesto = new Tiporepuesto (0,"",); 
  }

  StoreTipoRepuesto(createTipoRepuestoForm: any) {
   
  }


}
