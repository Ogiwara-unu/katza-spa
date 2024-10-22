import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Repuesto } from '../../models/repuesto';

@Component({
  selector: 'app-agregarrepuesto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregarrepuesto.component.html',
  styleUrl: './agregarrepuesto.component.css'
})
export class AgregarrepuestoComponent {

  public repuesto: Repuesto;

  constructor(private router: Router,) {
    this.repuesto = new Repuesto (0,0,0,0); 
  }

  StoreRepuesto(createRepuestoForm: any) {
   
  }


}
