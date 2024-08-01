import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarvehi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregarvehi.component.html',
  styleUrl: './agregarvehi.component.css'
})
export class AgregarvehiComponent {
  public vehiculo:Vehiculo;

  constructor(private router: Router, private vehiculoService: VehiculoService) {
    this.vehiculo = new Vehiculo (0,"",""); 
  }


  StoreVehiculo(createVehiculoForm: any) {
    console.log("Agregando vehiculo ->" + this.vehiculo.placaVehiculo);
    this.vehiculoService.create(this.vehiculo).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          console.log("Se ha agregado con exito");
          this.showSuccessAlert();
          createVehiculoForm.reset();
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
      title: '¡Vehículo agregado! :3',
      text: 'El vehículo ha sido agregado correctamente :3 .',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el vehículo. >:3';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo agregar el vehículo. Intente nuevamente más tarde. >:3';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }



}