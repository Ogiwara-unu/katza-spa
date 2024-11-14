import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Detalleprestamodispositivo } from '../../models/detalleprestamodispositivo';
import { DetallePrestamoDispositivoService } from '../../services/detallePresDispositivo.service';
import Swal from 'sweetalert2';
import { Prestamo } from '../../models/prestamo';
import { Dispositivos } from '../../models/dispositivos';
import { PrestamoService } from '../../services/prestamo.service';
import { DispositivoService } from '../../services/dispositivo.service';

@Component({
  selector: 'app-agregarprestamodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarprestamodispositivo.component.html',
  styleUrl: './agregarprestamodispositivo.component.css'
})
export class AgregarprestamodispositivoComponent {

  public detallePrestamoDispositivo: Detalleprestamodispositivo;
  public prestamos:Prestamo [] = [];
  public dispositivos:Dispositivos [] = [];

  constructor(private router: Router,private detallePrestDispositivoService:DetallePrestamoDispositivoService,
    private prestamoSrv:PrestamoService,private dispositivoSrv:DispositivoService
  ) {
    this.detallePrestamoDispositivo = new Detalleprestamodispositivo (0,"",0,0,new Date,);  
  }

  StorePrestamoDispositivo(createPrestamoDispositivoForm: any) {
    console.log('Agregando prestamo dispositivo con el dispositivo ->' + this.detallePrestamoDispositivo.idDetallePrestamoDispositivo)
    this.detallePrestDispositivoService.create(this.detallePrestamoDispositivo).subscribe({
      next: (response: any) => {
        console.log("Response recibido:", response); 
        if (response.status === 201) { 
          this.showAlertSuccess('Prestamo dispositivo Agregado correctamente', 'success');
          console.log("Se ha agregado con éxito");
          createPrestamoDispositivoForm.reset();
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

  ngOnInit(): void {
    this.prestamoSrv.getAllPrestamo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.prestamos = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.dispositivoSrv.getAllDispositivos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dispositivos = response.data;
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
        window.location.href = '/Mostrar-Prestamo-Dispositivo'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Prestamo-Dispositivo';
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
