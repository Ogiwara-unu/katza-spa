import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgregardepaComponent } from './components/agregardepa/agregardepa.component';
import { MostrardepartamentoComponent } from './components/mostrardepartamento/mostrardepartamento.component';
import { MostrarvehiculoComponent } from './components/mostrarvehiculo/mostrarvehiculo.component';
import { AgregarvehiComponent } from './components/agregarvehi/agregarvehi.component';
import { MostrarempleadoComponent } from './components/mostrarempleado/mostrarempleado.component';
import { AgregarempleadoComponent } from './components/agregarempleado/agregarempleado.component';
import { MostrarmantenimientoComponent } from './components/mostrarmantenimiento/mostrarmantenimiento.component';
import { AgregarmanteComponent } from './components/agregarmante/agregarmante.component';
import { TipomantenimientoComponent } from './components/tipomantenimiento/tipomantenimiento.component';
import { MostrartipomantenimientoComponent } from './components/mostrartipomantenimiento/mostrartipomantenimiento.component';
import { LoginComponent } from './components/login/login.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AddUserLoginComponent } from './components/add-user-login/add-user-login.component';
import { BackupRestoreComponent } from './components/backup-restore/backup-restore.component';
import { RestoreComponent } from './components/restore/restore.component';
import { AgregarprestamovehiculoComponent } from './components/agregarprestamovehiculo/agregarprestamovehiculo.component';
import { MostrarprestamovehiculoComponent } from './components/mostrarprestamovehiculo/mostrarprestamovehiculo.component';
import { AgregarrepuestoComponent } from './components/agregarrepuesto/agregarrepuesto.component';
import { MostrarrepuestoComponent } from './components/mostrarrepuesto/mostrarrepuesto.component';
import { AgregartipodispositivoComponent } from './components/agregartipodispositivo/agregartipodispositivo.component';
import { MostrartipodispositivoComponent } from './components/mostrartipodispositivo/mostrartipodispositivo.component';
import { AgregartiporepuestoComponent } from './components/agregartiporepuesto/agregartiporepuesto.component';
import { MostrartiporespuestoComponent } from './components/mostrartiporespuesto/mostrartiporespuesto.component';
import { AgregarprestamodispositivoComponent } from './components/agregarprestamodispositivo/agregarprestamodispositivo.component';
import { MostrarprestamodispositivoComponent } from './components/mostrarprestamodispositivo/mostrarprestamodispositivo.component';
import { AgregarmodelorepuestoComponent } from './components/agregarmodelorepuesto/agregarmodelorepuesto.component';
import { MostrarmodelorepuestoComponent } from './components/mostrarmodelorepuesto/mostrarmodelorepuesto.component';
import { AgregarmarcarepuestosComponent } from './components/agregarmarcarepuestos/agregarmarcarepuestos.component';
import { MostrarmarcarepuestosComponent } from './components/mostrarmarcarepuestos/mostrarmarcarepuestos.component';
import { AgregardispositivosComponent } from './components/agregardispositivos/agregardispositivos.component';
import { MostrardispositivosComponent } from './components/mostrardispositivos/mostrardispositivos.component';
import { AgregarPrestamoComponent } from './components/agregar-prestamo/agregar-prestamo.component';
import { MostrarPrestamoComponent } from './components/mostrar-prestamo/mostrar-prestamo.component';
import { AgregarDetalleManVehiculoComponent } from './components/agregar-detalle-man-vehiculo/agregar-detalle-man-vehiculo.component';
import { MostrarDetalleManVehiculoComponent } from './components/mostrar-detalle-man-vehiculo/mostrar-detalle-man-vehiculo.component';
import { AgregarRepuestosUsadosComponent } from './components/agregar-repuestos-usados/agregar-repuestos-usados.component';
import { MostrarRepuestosUsadosComponent } from './components/mostrar-repuestos-usados/mostrar-repuestos-usados.component';


export const routes: Routes = [

 

  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Agregar-Departamento', component: AgregardepaComponent },
  { path: 'Mostrar-Departamento', component: MostrardepartamentoComponent },
  { path: 'Agregar-Empleado', component: AgregarempleadoComponent },
  { path: 'Mostrar-Empleado', component: MostrarempleadoComponent },
  { path: 'Agregar-Vehiculo', component: AgregarvehiComponent },
  { path: 'Mostrar-Vehiculo', component: MostrarvehiculoComponent },
  { path: 'Agregar-Mantenimiento', component: AgregarmanteComponent },
  { path: 'Mostrar-Mantenimiento', component: MostrarmantenimientoComponent },
  { path: 'Agregar-Tipo-Mantenimeinto',component:TipomantenimientoComponent },
  { path: 'Mostrar-Tipo-Mantenimiento',component:MostrartipomantenimientoComponent },
  { path: 'Administracion',component:AdminViewComponent },
  { path: 'Add-UserLogin',component:AddUserLoginComponent },
  { path: 'backUp-restore',component:BackupRestoreComponent },
  { path: 'restore',component:RestoreComponent },
  {path:'Mostrar-Prestamo-Vehiculo',component:MostrarprestamovehiculoComponent},
  {path:'Agregar-Prestamo-Vehiculo',component:AgregarprestamovehiculoComponent},
  {path:'Mostrar-Repuesto',component:MostrarrepuestoComponent},
  {path:'Agregar-Repuesto',component:AgregarrepuestoComponent},
  {path:'Mostrar-Tipo-Repuesto',component:MostrartiporespuestoComponent},
  {path:'Agregar-Tipo-Repuesto',component:AgregartiporepuestoComponent},
  {path:'Mostrar-Dispositivo',component:MostrardispositivosComponent},
  {path:'Agregar-Dispositivo',component:AgregardispositivosComponent},
  {path:'Mostrar-Prestamo-Dispositivo',component:MostrarprestamodispositivoComponent},
  {path:'Agregar-Prestamo-Dispositivo',component:AgregarprestamodispositivoComponent},
  {path:'Mostrar-Marca-Repuesto',component:MostrarmarcarepuestosComponent},
  {path:'Agregar-Marca-Repuesto',component:AgregarmarcarepuestosComponent},
  {path:'Mostrar-Modelo-Repuesto',component:MostrarmodelorepuestoComponent},
  {path:'Agregar-Modelo-Repuesto',component:AgregarmodelorepuestoComponent},
  {path:'Mostrar-Tipo-Dispositivo',component:MostrartipodispositivoComponent},
  {path:'Agregar-Tipo-Dispositivo',component:AgregartipodispositivoComponent},
  {path:'Agregar-Dispositivo',component:AgregardispositivosComponent},
  {path:'Mostrar-Dispositivo',component:MostrardispositivosComponent},
  {path:'Agregar-Prestamo',component:AgregarPrestamoComponent},
  {path:'Mostrar-Prestamo',component:MostrarPrestamoComponent},
  {path:'Agregar-Detalle-Mantenimiento-Vehiculos',component:AgregarDetalleManVehiculoComponent},
  {path:'Mostrar-Detalle-Mantenimiento-Vehiculos',component:MostrarDetalleManVehiculoComponent},
  {path:'Agregar-Repuestos-Usados',component:AgregarRepuestosUsadosComponent},
  {path:'Mostrar-Repuestos-Usados',component:MostrarRepuestosUsadosComponent},

  
];
