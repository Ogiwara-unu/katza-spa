import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Repuesto } from '../../models/repuesto';
import Swal from 'sweetalert2';
import { RepuestoService } from '../../services/repuesto.service';
import { ModeloRepuestoService } from '../../services/modeloRepuesto.service';
import { TipoRepuestoService } from '../../services/tipoRepuesto.service';
import { Modelorepuesto } from '../../models/modelorepuesto';
import { Tiporepuesto } from '../../models/tiporepuesto';


@Component({
  selector: 'app-agregarrepuesto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregarrepuesto.component.html',
  styleUrl: './agregarrepuesto.component.css'
})
export class AgregarrepuestoComponent implements OnInit {

  public repuesto: Repuesto;
  public modeloRepuestos: Modelorepuesto [] = [];
  public tipoRepuestos: Tiporepuesto [] = [];

  constructor(private router: Router,private repuestoService:RepuestoService,
    private modeloRepuestoService:ModeloRepuestoService,private tipoRepuestoService:TipoRepuestoService
  ) {
    this.repuesto = new Repuesto (0,0,1,0); 
  }

  StoreRepuesto(createRepuestoForm: any) {
    console.log('Repuesto:', this.repuesto); 
    console.log('Agregando repuesto ->'+this.repuesto.idRepuesto);
    this.repuestoService.create(this.repuesto).subscribe({
     next:(response:any)=>{
       if(response.status===201){
         this.showAlertSuccess('Repuesto agregado', 'success')
         console.log("Se ha agregado con exito");
         createRepuestoForm.reset();
       }
     },
     error: (err: any) =>{
       console.error("Error al guardar",err);
       this.showErrorAlert(err);
     }
    });
  }

  ngOnInit(): void {
    this.modeloRepuestoService.getAllTipoModeloRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.modeloRepuestos = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.tipoRepuestoService.getAllTipoRepuesto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tipoRepuestos = response.data;
        console.log("Tipo Repuestos:", this.tipoRepuestos); // Verifica que los datos se carguen
      },
      error: (err: any) => {
        console.error(err);
      }
    });

  }


  showAlertSuccess(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: 'Éxito',
      timer:2000,
      text: message ,
      confirmButtonText: 'Aceptar',
      didClose : ()=>{
        window.location.href = '/Mostrar-Repuesto'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/Mostrar-Repuesto';
      }
    });
  }
  
  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el Repuesto!.';
    if (error.status === 500) {
      errorMessage = 'Hubo un problema al agregar el repuesto y/o hay un dato incorrecto.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


}
