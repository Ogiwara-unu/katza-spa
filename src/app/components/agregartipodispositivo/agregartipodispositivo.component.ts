import { Component } from '@angular/core';
import { Tipodispositivo } from '../../models/tipodispositivo';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TipoDispositivoService } from '../../services/tipoDespositivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregartipodispositivo',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregartipodispositivo.component.html',
  styleUrl: './agregartipodispositivo.component.css'
})
export class AgregartipodispositivoComponent {


  public tipoDispositivo: Tipodispositivo;

  constructor(private router: Router,private tipoDispositivoService: TipoDispositivoService) {
    this.tipoDispositivo = new Tipodispositivo (0,"",); 
  }

  StoreTipoDispositivo(createTipoDispositivoForm: any) {
    console.log('Agregando Tipo dispositivo ->' + this.tipoDispositivo.idTipoDispositivo);
    this.tipoDispositivoService.create(this.tipoDispositivo).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          this.showAlertSuccess('Tipo Dispositivo Agregado correctamente', 'success')
          console.log("Se ha agregado con exito");
          createTipoDispositivoForm.reset();
        }
      },
      error: (err: any) => {
        console.error("entro en store departaamento error",err);
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
        window.location.href = '/Mostrar-Tipo-Dispositivo'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Tipo-Dispositivo';
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
