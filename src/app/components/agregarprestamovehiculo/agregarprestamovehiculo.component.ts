import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Detalleprestamovehiculo } from '../../models/detalleprestamovehiculo';
import Swal from 'sweetalert2';
import { detalleprestamovehiculoService } from '../../services/detallePresVehiculo.service';

@Component({
  selector: 'app-agregarprestamovehiculo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarprestamovehiculo.component.html',
  styleUrl: './agregarprestamovehiculo.component.css'
})
export class AgregarprestamovehiculoComponent {

  public Detalleprestamovehiculo: Detalleprestamovehiculo;

  constructor(private router: Router,private detallePresService:detalleprestamovehiculoService) {
    this.Detalleprestamovehiculo = new Detalleprestamovehiculo(0, 0, "", "", "", 0, new Date);
  
  }

  StorePrestamoVehiculo(createPrestamoVehiculoForm: any) {
    console.log('Agregando prestamo oooooooooooo ->' + this.Detalleprestamovehiculo.prestamo);
    console.log('Agregando prestamo vehiculo ->' + this.Detalleprestamovehiculo.kmFinal);
    console.log('Agregando prestamo vehiculo ->' + this.Detalleprestamovehiculo.kmInicial);
    console.log('Agregando prestamo vehiculo ->' + this.Detalleprestamovehiculo.observaciones);
    console.log('Agregando prestamo vehiculo ->' + this.Detalleprestamovehiculo.vehiculoPrestado);
  
    this.detallePresService.create(this.Detalleprestamovehiculo).subscribe({
      next: (response: any) => {
        console.log("Response recibido:", response);  // Verifica el contenido de la respuesta
        if (response.status === 201) { 
          this.showAlertSuccess('Prestamo Vehiculo Agregado correctamente', 'success');
          console.log("Se ha agregado con éxito");
          createPrestamoVehiculoForm.reset();
        } else {
          this.showErrorAlert(response.status);
        }
      },
      error: (err: any) => {
        console.error("Error en store detalle prestamo vehiculo", err);
        this.showErrorAlert(err);
      }
    });
  }
  


  showAlertSuccess(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: 'Exito',
      timer:2000,
      text: message ,
      confirmButtonText: 'Aceptar',
      didClose : ()=>{
        window.location.href = 'Agregar-Prestamo-Vehiculo'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = 'Agregar-Prestamo-Vehiculo';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el prestamo dispositivo!.';
    if (error === 500) {
      errorMessage = 'Error del servidor: Datos Repetidos!';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
