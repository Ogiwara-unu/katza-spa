import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Modelorepuesto } from '../../models/modelorepuesto';

@Component({
  selector: 'app-agregarmodelorepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarmodelorepuesto.component.html',
  styleUrl: './agregarmodelorepuesto.component.css'
})
export class AgregarmodelorepuestoComponent {

  public modeloRepuesto: Modelorepuesto;

  constructor(private router: Router,) {
    this.modeloRepuesto = new Modelorepuesto (0,"",0);  
  }

  StoreModeloRepuesto(createModeloRepuestoForm: any) {
   
  }

}
