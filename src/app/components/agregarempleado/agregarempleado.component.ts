import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Departamento } from '../../models/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarempleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregarempleado.component.html',
  styleUrl: './agregarempleado.component.css'
})
export class AgregarempleadoComponent {
  public empleado:Empleado;
  public Departamentos: Departamento[] = [];


  constructor(private router: Router, private departamentoService: DepartamentoService
    ,private empleadoService: EmpleadoService) {
    this.empleado = new Empleado(0, "","","",0,0,new Date()); 
  }
  
  ngOnInit(): void {
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.Departamentos = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    }
  );
}

StoreEmpleado(form: any) {
  if(form.valid){
    console.log("Agregando empleado -> " + this.empleado.nombre);
    this.empleadoService.create(this.empleado).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          console.log("Se ha agregado con exito");
          form.reset();
          this.showSuccessAlert();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.showErrorAlert(err);
      }
    });
  }
  
}

private showSuccessAlert() {
  Swal.fire({
    title: 'Empleado agregado! :3',
    text: 'El empleado ha sido agregado correctamente. :3',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

private showErrorAlert(error: any) {
  let errorMessage = 'Hubo un problema al agregar el empleado. >:3';
  if (error.status === 500) {
    errorMessage = 'Error del servidor: Datos Repetidos >:3';
  }
  Swal.fire({
    title: 'Error',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'Aceptar'
  });
}

}