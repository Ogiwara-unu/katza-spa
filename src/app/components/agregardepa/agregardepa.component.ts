import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Departamento } from '../../models/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregardepa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregardepa.component.html',
  styleUrl: './agregardepa.component.css'
})

export class AgregardepaComponent {

public departamento:Departamento;

constructor(private router: Router, private departamentoService: DepartamentoService) {
  this.departamento = new Departamento(0,"",""); 
}



StoreDepartamento(createDepartamento: any) {
  console.log('Agregando departamento ->' + this.departamento.idDepartamento);
  this.departamentoService.create(this.departamento).subscribe({
    next: (response: any) => {
      if (response.status === 201) {
        this.showAlertSuccess('Departamento agregado correctamente', 'success')
        console.log("Se ha agregado con éxito");
        createDepartamento.reset();
      }
    },
    error: (err: any) => {
      console.error("Error en agregar departamento error",err);
      this.showErrorAlert(err);
    }
  });
}

private showSuccessAlert() {
  Swal.fire({
    title: 'Departamento agregado!',
    text: 'El departamento ha sido agregado correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    
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
      window.location.href = '/Mostrar-Departamento'; 
    } 
  }).then((result) => {
    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
      window.location.href = '/Mostrar-Departamento';
    }
  });
}

private showErrorAlert(error: any) {
  let errorMessage = 'Hubo un problema al agregar el departamento.';
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