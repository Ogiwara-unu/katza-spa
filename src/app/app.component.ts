import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'katza-spa';
  isCategoryHovered: boolean = false;
  showNavbar: boolean = true;
  excludedRoutes: string[] = ['/'];

  categories = [
    { id: 3, name: 'Mantenimiento', subItems: ['Agregar-Mantenimiento', 'Mostrar-Mantenimiento'] },
    { id: 4, name: 'Vehiculo', subItems: ['Agregar-Vehiculo', 'Mostrar-Vehiculo'] },
    { id: 1, name: 'Departamento', subItems: ['Agregar-Departamento', 'Mostrar-Departamento'] },
    { id: 2, name: 'Empleado', subItems: ['Agregar-Empleado', 'Mostrar-Empleado'] },
    { id: 5, name: 'Tipo-Mantenimeinto', subItems: ['Agregar-Tipo-Mantenimeinto', 'Mostrar-Tipo-Mantenimiento'] },
  ];

  selectedCategory: { id: number; name: string; subItems: string[] } | null = null;
  subItems: string[] = [];
  selectedSubItem: string | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !this.isExcludedRoute(event.url);
      }
    });
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some(route => route === url);
  }
}