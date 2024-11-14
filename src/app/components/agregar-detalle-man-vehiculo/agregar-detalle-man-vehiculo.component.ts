import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetalleManVehiculo } from '../../models/detalleManVehiculo';
import { Mantenimiento } from '../../models/mantenimiento';
import { Router, RouterLink } from '@angular/router';
import { DetalleMantenimientoService } from '../../services/detalle-mantenimiento.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-detalle-man-vehiculo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregar-detalle-man-vehiculo.component.html',
  styleUrl: './agregar-detalle-man-vehiculo.component.css'
})
export class AgregarDetalleManVehiculoComponent implements OnInit {

  public detalleMV:DetalleManVehiculo;
  public mantenimiento:Mantenimiento [] = [];

  constructor(private router:Router,private detalleMVService:DetalleMantenimientoService,
    private mantenimientoService:MantenimientoService
  ){
    this.detalleMV = new DetalleManVehiculo (0,0,"")
  }

  StoreDetalleMantenimiento(createDetalleMantenimientoForm: any) {
    console.log('Agregando detalle mantenimiento ->'+this.detalleMV);
    this.detalleMVService.create(this.detalleMV).subscribe({
     next:(response:any)=>{
       if(response.status===201){
         this.showAlertSuccess('Detalle Mantenimiento agregado', 'success')
         console.log("Se ha agregado con exito");
         createDetalleMantenimientoForm.reset();
       }
     },
     error: (err: any) =>{
       console.error("error al guardar",err);
       this.showErrorAlert(err);
     }
    });
   }
 

  ngOnInit(): void {
    this.mantenimientoService.getAllMantenimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.mantenimiento = response.data;
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
        window.location.href = '/Mostrar-Detalle-Mantenimiento-Vehiculos'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Detalle-Mantenimiento-Vehiculos';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el Detalle!.';
    if (error.status === 206) {
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
