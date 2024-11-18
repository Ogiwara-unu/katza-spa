import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Dispositivos } from '../../models/dispositivos';
import { DispositivoService } from '../../services/dispositivo.service';
import Swal from 'sweetalert2';
import { Tipodispositivo } from '../../models/tipodispositivo';
import { TipoDispositivoService } from '../../services/tipoDespositivo.service';

@Component({
  selector: 'app-agregardispositivos',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregardispositivos.component.html',
  styleUrl: './agregardispositivos.component.css'
})
export class AgregardispositivosComponent {

  public dispositivo: Dispositivos;
  public tipoDispositivo:Tipodispositivo [] = [];

  constructor(private router: Router,private dispositivoService:DispositivoService,
    private tipoDispositivoSrv:TipoDispositivoService
  ) {
    this.dispositivo = new Dispositivos (0,0,"",0,"");  
  }

  StoreDispositivo(createDispositivoForm: any) {
    console.log("Agregando dispositivo ->" + this.dispositivo);
    this.dispositivoService.create(this.dispositivo).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          console.log("Se ha agregado con exito");
          this.showAlertSuccess('Dispositivo Agregado correctamente', 'success');
          createDispositivoForm.reset();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.showErrorAlert(err);
      }
    });
  }

  ngOnInit(): void {
    this.tipoDispositivoSrv.getAllTipoDispositivo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tipoDispositivo = response.data;
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
        window.location.href = '/Mostrar-Dispositivo'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Dispositivo';
      }
    });
  }

  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el dispositivo.';
    if (error.status === 500) {
      errorMessage = 'Error del servidor: No se pudo agregar el dispositivo. Intente nuevamente más tarde.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

}
