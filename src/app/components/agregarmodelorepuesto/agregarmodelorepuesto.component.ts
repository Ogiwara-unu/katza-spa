import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Modelorepuesto } from '../../models/modelorepuesto';
import { ModeloRepuestoService } from '../../services/modeloRepuesto.service';
import { Marcarepuesto } from '../../models/marcarepuesto';
import Swal from 'sweetalert2';
import { MarcaRepuestoService } from '../../services/marcaRepuesto.service';

@Component({
  selector: 'app-agregarmodelorepuesto',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './agregarmodelorepuesto.component.html',
  styleUrl: './agregarmodelorepuesto.component.css'
})
export class AgregarmodelorepuestoComponent implements OnInit {

  public modeloRepuesto: Modelorepuesto;
  public marcaRepuestos: Marcarepuesto [] = [];
 

  constructor(private router: Router,private marcaRepuestoService:MarcaRepuestoService,private modeloRepuestoService:ModeloRepuestoService) {
    this.modeloRepuesto = new Modelorepuesto (0,"",0);  
  }

  StoreModeloRepuesto(createModeloRepuestoForm: any) {
   console.log('Agregando modelo repuesto ->'+this.modeloRepuesto.idModeloRepuesto);
   this.modeloRepuestoService.create(this.modeloRepuesto).subscribe({
    next:(response:any)=>{
      if(response.status===201){
        this.showAlertSuccess('Modelo repuesto agregado', 'success')
        console.log("Se ha agregado con exito");
        createModeloRepuestoForm.reset();
      }
    },
    error: (err: any) =>{
      console.error("error al guardar",err);
      this.showErrorAlert(err);
    }
   });
  }

  ngOnInit(): void {
    this.marcaRepuestoService.getAllTipoMarcaRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.marcaRepuestos = response.data;
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
        window.location.href = '/Mostrar-Modelo-Repuesto'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Modelo-Repuesto';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el modelo!.';
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
