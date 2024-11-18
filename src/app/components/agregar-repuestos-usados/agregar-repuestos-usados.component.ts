import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Repuestousados } from '../../models/repuestousados';
import { Repuesto } from '../../models/repuesto';
import { Mantenimiento } from '../../models/mantenimiento';
import { RepuestoUsadosService } from '../../services/repuestoUsado.service';
import { RepuestoService } from '../../services/repuesto.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-repuestos-usados',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregar-repuestos-usados.component.html',
  styleUrl: './agregar-repuestos-usados.component.css'
})
export class AgregarRepuestosUsadosComponent {
  public repuestoUsado:Repuestousados;
  public repuesto:Repuesto [] = [];
  public mantenimiento:Mantenimiento [] = [];

  constructor(private repuestoUsrv:RepuestoUsadosService,private repuestoSrv:RepuestoService,
    private mantenimientoSrv:MantenimientoService
  ){
    this.repuestoUsado = new Repuestousados(0,0,0,0);
  }

  StoreRepuestoUsado(createRepuestoUsadoForm: any) {
    console.log('Agregando repuesto usado ->'+this.repuestoUsado);
    this.repuestoUsrv.create(this.repuestoUsado).subscribe({
     next:(response:any)=>{
       if(response.status===201){
         this.showAlertSuccess('Repuesto Usado agregado', 'success')
         console.log("Se ha agregado con exito");
         createRepuestoUsadoForm.reset();
       }
     },
     error: (err: any) =>{
       console.error("error al guardar",err);
       this.showErrorAlert(err);
     }
    });
   }

  ngOnInit(): void {
    this.mantenimientoSrv.getAllMantenimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.mantenimiento = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.repuestoSrv.getAllRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.repuesto = response.data;
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
        window.location.href = '/Mostrar-Repuestos-Usados'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Repuestos-Usados';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el repuesto usado y/o hay un dato incorrecto.';
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
