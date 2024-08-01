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
  { path: 'Mostrar-Tipo-Mantenimiento',component:MostrartipomantenimientoComponent }
  

];