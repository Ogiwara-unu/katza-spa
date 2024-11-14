import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Detalleprestamovehiculo } from '../../models/detalleprestamovehiculo';
import Swal from 'sweetalert2';
import { detalleprestamovehiculoService } from '../../services/detallePresVehiculo.service';
import { Prestamo } from '../../models/prestamo';
import { Vehiculo } from '../../models/vehiculo';
import { PrestamoService } from '../../services/prestamo.service';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-agregarprestamovehiculo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarprestamovehiculo.component.html',
  styleUrl: './agregarprestamovehiculo.component.css'
})
export class AgregarprestamovehiculoComponent {

  public Detalleprestamovehiculo: Detalleprestamovehiculo;
  public prestamo:Prestamo [] = [];
  public vehiculos:Vehiculo [] = [];

  constructor(private router: Router,private detallePresService:detalleprestamovehiculoService,
    private prestamoSrv:PrestamoService,private vehiculoSrv:VehiculoService
  ) {
    this.Detalleprestamovehiculo = new Detalleprestamovehiculo(0, 0, "", "", "", 0, new Date);
  
  }

  StorePrestamoVehiculo(createPrestamoVehiculoForm: any) {
    console.log('Agregando prestamo ->' + this.Detalleprestamovehiculo);
    this.detallePresService.create(this.Detalleprestamovehiculo).subscribe({
      next: (response: any) => {
        console.log("Response recibido:", response);  // Verifica el contenido de la respuesta
        if (response.status === 201) { 
          this.showAlertSuccess('Prestamo Vehículo Agregado correctamente', 'success');
          console.log("Se ha agregado con éxito");
          createPrestamoVehiculoForm.reset();
        } else {
          this.showErrorAlert(response.status);
        }
      },
      error: (err: any) => {
        console.error("Error en store detalle prestamo vehículo", err);
        this.showErrorAlert(err);
      }
    });
  }

  ngOnInit(): void {
    this.prestamoSrv.getAllPrestamo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.prestamo = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.vehiculoSrv.getAllVehiculo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.vehiculos = response.data;
      },
      error: (err: any) => {
        console.error(err);
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
        window.location.href = 'Mostrar-Prestamo-Vehiculo'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = 'Mostrar-Prestamo-Vehiculo';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el prestamo vehiculo!.';
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
