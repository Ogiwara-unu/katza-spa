import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoMantenimiento } from '../../models/tipoMantenimiento';
import { TipomantenimientoService } from '../../services/tipomantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipomantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tipomantenimiento.component.html',
  styleUrl: './tipomantenimiento.component.css'
})

export class TipomantenimientoComponent {

  public tipoMantenimeinto:TipoMantenimiento;

constructor(private router: Router, private tipomantenimientoService: TipomantenimientoService) {
  this.tipoMantenimeinto = new TipoMantenimiento(0,""); 
}


StoreTipoMantenimeinto(tipoMantenimeinto: any) {
  console.log("Agregando tipo de mantenimiento ->" + this.tipoMantenimeinto.idTipoMantenimiento);
  this.tipomantenimientoService.create(this.tipoMantenimeinto).subscribe({
    next: (response: any) => {
      if (response.status === 201) {
        console.log("Se ha agregado con éxito");
        this.showSuccessAlert();
        tipoMantenimeinto.reset();
      }
    },
    error: (err: any) => {
      console.error(err);
      this.showErrorAlert(err);
    }
  });
}

private showSuccessAlert() {
  Swal.fire({
    title: 'Nuevo tipo de mantenimiento agregado!',
    text: 'El tipo mantenimiento  ha sido agregado correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

private showErrorAlert(error: any) {
  let errorMessage = 'Hubo un problema al agregar el tipo mantenimiento.';
  if (error.status === 500) {
    errorMessage = 'Error del servidor: Datos Repetidos.';
  }
  Swal.fire({
    title: 'Error',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'Aceptar'
  });
}



}