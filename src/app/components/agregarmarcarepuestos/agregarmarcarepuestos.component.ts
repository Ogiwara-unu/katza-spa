import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Marcarepuesto } from '../../models/marcarepuesto';
import { MarcaRepuestoService } from '../../services/marcaRepuesto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregarmarcarepuestos',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarmarcarepuestos.component.html',
  styleUrl: './agregarmarcarepuestos.component.css'
})
export class AgregarmarcarepuestosComponent {

  public marcaRespuesto: Marcarepuesto;

  constructor(private router: Router,private marcaRepuestosService:MarcaRepuestoService) {
    this.marcaRespuesto = new Marcarepuesto (0,"");  
  }

  StoreMarcaRepuesto(createMarcaRepuestoForm: any) {
    console.log('Agregando Marca Repuesto ->' + this.marcaRespuesto.idMarcaRepuesto);
    this.marcaRepuestosService.create(this.marcaRespuesto).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          this.showAlertSuccess('Marca Repuesto agregado correctamente', 'success')
          console.log("Se ha agregado con éxito");
          createMarcaRepuestoForm.reset();
        }
      },
      error: (err: any) => {
        console.error("Error en store marca repuesto error",err);
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
        window.location.href = '/Mostrar-Marca-Repuesto'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Marca-Repuesto';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el departamento!';
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
