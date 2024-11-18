import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { TipoMantenimiento } from '../../models/tipoMantenimiento';
import { TipomantenimientoService } from '../../services/tipomantenimiento.service';
import { DetalleManVehiculo } from '../../models/detalleManVehiculo';
import { DetalleMantenimientoService } from '../../services/detalle-mantenimiento.service';
import Swal from 'sweetalert2';
import { Repuesto } from '../../models/repuesto';
import { RepuestoService } from '../../services/repuesto.service';
import { RepuestoUsadosService } from '../../services/repuestoUsado.service';
import { Repuestousados } from '../../models/repuestousados';

@Component({
  selector: 'app-agregarmante',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregarmante.component.html',
  styleUrl: './agregarmante.component.css'
})
export class AgregarmanteComponent implements OnInit {
  public mantenimiento:Mantenimiento;
  public detalleMantenimiento:DetalleManVehiculo;
  public repuestoUsado : Repuestousados;
  public empleados: Empleado[] = [];
  public vehiculos: Vehiculo [] = [];
  public repuestos : Repuesto [] = [];
  public tipomantenimientos: TipoMantenimiento [] = [];

  constructor(private router: Router,private empleadoService: EmpleadoService,
     private mantenimientoService:MantenimientoService, private vehiculoService:VehiculoService,
    private tipoMantenimientoService:TipomantenimientoService, 
    private _detalleMantenimientoService:DetalleMantenimientoService,
  private repuestosSrv:RepuestoService,private repuestosUsaSrv:RepuestoUsadosService) {

    this.mantenimiento = new Mantenimiento(0,0,0,0,new Date,""); 
    this.detalleMantenimiento=new DetalleManVehiculo(0,0,"");
    this.repuestoUsado = new Repuestousados(0,0,0,0);
  }

  ngOnInit(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (response: any) => {
        console.log(response);
        this.empleados = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.vehiculoService.getAllVehiculo().subscribe({
      next: (response: any) => {
        console.log(response);
        this.vehiculos = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.tipoMantenimientoService.getAllTipoMantenimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tipomantenimientos = response.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.repuestosSrv.getAllRepuesto().subscribe({
      next:(response : any) =>{
        console.log(response);
        this.repuestos = response.data;
      },
      error:(err : any) => {
        console.error(err);
      }
    });
  }


  StoreMantenimiento(form: any) {
    if (form.valid) {
      this.mantenimientoService.create(this.mantenimiento).subscribe({
        next: (response: any) => {
          if (response.status === 201) {
            // Obtener el ID generado del mantenimiento
            const idMantenimientoGenerado = response.mantenimiento.idMantenimiento;
            this.detalleMantenimiento.mantenimiento = idMantenimientoGenerado;
            this._detalleMantenimientoService.create(this.detalleMantenimiento).subscribe({
              next: (detalleResponse: any) => {
                console.log(detalleResponse);
                if(detalleResponse.status === 201){
                  this.repuestoUsado.mantenimiento = idMantenimientoGenerado;
                  console.log(this.repuestoUsado);
                  this.repuestosUsaSrv.create(this.repuestoUsado).subscribe({
                    next:(repuestoResponse : any) => {
                      console.log(repuestoResponse);
                       this.showSuccessAlert();
                        form.reset();
                    },
                    error : (repuestoError : any) => {
                      console.error(repuestoError);
                      this.showErrorAlert(repuestoError);
                    }
                  });
                }
              },
              error: (detalleError: any) => {
                console.error(detalleError);
                this.showErrorAlert(detalleError);
              }
            });
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
      title: 'Mantenimiento agregado.',
      text: 'El mantenimiento ha sido agregado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  private showErrorAlert(error: any) {
    let errorMessage = 'Hubo un problema al agregar el mantenimiento.';
    if (error.status === 500) {
      errorMessage = 'Hubo un problema al agregar el mantenimiento y/o hay un dato incorrecto.';
    }
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }  

}
