import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'katza-spa';
  isCategoryHovered: boolean = false;
  showNavbar: boolean = true;
  excludedRoutes: string[] = ['/'];
  public identity: any;
  private tokenCheckInterval: any;
  private tokenCheckSubscription: Subscription | null = null;
  public status: number;

  categories = [
    { id: 3, name: 'Mantenimiento', subItems: ['Agregar-Mantenimiento', 'Mostrar-Mantenimiento'] },
    { id: 4, name: 'Vehiculo', subItems: ['Agregar-Vehiculo', 'Mostrar-Vehiculo'] },
    { id: 1, name: 'Departamento', subItems: ['Agregar-Departamento', 'Mostrar-Departamento'] },
    { id: 2, name: 'Empleado', subItems: ['Agregar-Empleado', 'Mostrar-Empleado'] },
    { id: 5, name: 'Tipo-Mantenimeinto', subItems: ['Agregar-Tipo-Mantenimeinto', 'Mostrar-Tipo-Mantenimiento'] },
    { id: 5, name: 'Prueba', subItems: ['Administracion', 'Administracion'] },
  ];

  selectedCategory: { id: number; name: string; subItems: string[] } | null = null;
  subItems: string[] = [];
  selectedSubItem: string | null = null;

  constructor(private router: Router,private _userService: UserService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !this.isExcludedRoute(event.url);
      }
    });
    this.status = -1;
    this.startTokenCheck();
  }

  ngOnInit() {
    this.loadIdentity();
  }

  ngOnDestroy() {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }

  loadIdentity() {
    const identity = sessionStorage.getItem('identity');
    console.log(identity);
    if (identity) {
      try {
        this.identity = JSON.parse(identity);
      } catch (error) {
        console.error("Invalid JSON in sessionStorage for key 'identity':", error);
        this.identity = null;
      }
    }
  }

  startTokenCheck() {
    this.tokenCheckInterval = setInterval(() => {
      this.tokenCheckSubscription = this._userService.getIdentityFromAPI().subscribe({
        next: response => {
          console.log('Usuario loggeado:', response.name);
        },
        error: error => {
          console.log('Token inválido o expirado:', error);
          this.handleInvalidToken();
        }
      });
    }, 1000);
  }

  handleInvalidToken() {
    sessionStorage.removeItem('identity');
    this.identity = null;
  }

  logout() {
    sessionStorage.removeItem('identity');
    this.identity = null;
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some(route => route === url);
  }
}