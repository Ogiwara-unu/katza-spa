import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tiporepuesto } from '../../models/tiporepuesto';
import { TipoRepuestoService } from '../../services/tipoRepuesto.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregartiporepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregartiporepuesto.component.html',
  styleUrl: './agregartiporepuesto.component.css'
})
export class AgregartiporepuestoComponent {

  public tipoRepuesto: Tiporepuesto;

  constructor(private router: Router,private tipoRepuestoService: TipoRepuestoService) {
    this.tipoRepuesto = new Tiporepuesto (0,"",); 
  }

  StoreTipoRepuesto(createTipoRepuestoForm: any) {
    console.log('Agregando tipo Repuesto ->' + this.tipoRepuesto.idTipoRepuesto);
    this.tipoRepuestoService.create(this.tipoRepuesto).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          this.showAlertSuccess('Tipo repuesto Agregado correctamente', 'success')
          console.log("Se ha agregado con exito");
          createTipoRepuestoForm.reset();
        }
      },
      error: (err: any) => {
        console.error("entro en store tipo repuesto error",err);
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
        window.location.href = '/Mostrar-Tipo-Repuesto'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Tipo-Repuesto';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el departamento!.';
    if (error.status === 500) {
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
