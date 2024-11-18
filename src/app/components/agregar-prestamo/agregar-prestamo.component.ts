import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Prestamo } from '../../models/prestamo';
import { Empleado } from '../../models/empleado';
import { PrestamoService } from '../../services/prestamo.service';
import { EmpleadoService } from '../../services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-prestamo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregar-prestamo.component.html',
  styleUrl: './agregar-prestamo.component.css'
})
export class AgregarPrestamoComponent {
  public prestamo:Prestamo;
  public empleados:Empleado [] = [];

  constructor(private prestamoSrv:PrestamoService,private empleadosSrv:EmpleadoService){
    this.prestamo = new Prestamo (0,0,0,"",new Date,new Date);
  }

  StorePrestamo(createPrestamoForm: any) {
    console.log('Agregando prestamo ->'+this.prestamo);
    this.prestamoSrv.create(this.prestamo).subscribe({
     next:(response:any)=>{
       if(response.status===201){
         this.showAlertSuccess('Prestamo agregado', 'success')
         console.log("Se ha agregado con exito");
         createPrestamoForm.reset();
       }
     },
     error: (err: any) =>{
       console.error("error al guardar",err);
       this.showErrorAlert(err);
     }
    });
   }


  ngOnInit(): void {
    this.empleadosSrv.getAllEmpleados().subscribe({
      next: (response: any) => {
        console.log(response);
        this.empleados = response.data;
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
        window.location.href = '/Mostrar-Prestamo'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Prestamo';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el repuesto y/o hay un dato incorrecto.';
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
