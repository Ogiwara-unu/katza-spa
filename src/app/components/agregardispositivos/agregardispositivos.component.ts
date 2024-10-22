import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Dispositivos } from '../../models/dispositivos';

@Component({
  selector: 'app-agregardispositivos',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregardispositivos.component.html',
  styleUrl: './agregardispositivos.component.css'
})
export class AgregardispositivosComponent {

  public dispositivo: Dispositivos;

  constructor(private router: Router,) {
    this.dispositivo = new Dispositivos (0,0,"",0,"");  
  }

  StoreDispositivo(createDispositivoForm: any) {
   
  }

}
