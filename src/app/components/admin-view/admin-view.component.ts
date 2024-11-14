import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent {

  navigateToAddPrestamo(): void {
    this.router.navigate(['/Mostrar-Prestamo']);
  }

  navigateToAddDetalleMantenimientoVehiculos(): void {
    this.router.navigate(['/Mostrar-Detalle-Mantenimiento-Vehiculos']);
  }

  navigateToAddRepuestosUsados(): void {
    this.router.navigate(['/Mostrar-Repuestos-Usados']);
  }
  
  navigateToAddDepapartamento(): void {
    this.router.navigate(['/Mostrar-Departamento']);
  }

  navigateToAddMantenimiento(): void {
    this.router.navigate(['/Mostrar-Mantenimiento']);
  }
  navigateToAddTipoMantenimiento(): void {
    this.router.navigate(['/Mostrar-Tipo-Mantenimiento']);
  }
  navigateToAddEmpleado(): void {
    this.router.navigate(['/Mostrar-Empleado']);
  }
  navigateToAddVehiculo(): void {
    this.router.navigate(['/Mostrar-Vehiculo']);
  }
  navigateToAddPrestamoVehiculo(): void {
    this.router.navigate(['/Mostrar-Prestamo-Vehiculo']);
  }
  navigateToAddRepuesto(): void {
    this.router.navigate(['/Mostrar-Repuesto']);
  }
  navigateToAddTipoRepuesto(): void {
    this.router.navigate(['/Mostrar-Tipo-Repuesto']);
  }
  navigateToAddDispositivos(): void {
    this.router.navigate(['/Mostrar-Dispositivo']);
  }
  navigateToAddPrestamoDispositivo(): void {
    this.router.navigate(['/Mostrar-Prestamo-Dispositivo']);
  }
  navigateToAddMarcaRepuestos(): void {
    this.router.navigate(['/Mostrar-Marca-Repuesto']);
  }
  navigateToAddModeloRepuesto(): void {
    this.router.navigate(['/Mostrar-Modelo-Repuesto']);
  }
  navigateToAddTipoDispositivo(): void {
    this.router.navigate(['/Mostrar-Tipo-Dispositivo']);
  }

constructor(private router: Router) {}



}


