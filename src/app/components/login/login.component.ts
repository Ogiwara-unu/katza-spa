import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers: [UserService]
})
export class LoginComponent {

  public status: number;
  public user: User;

  constructor(
    private router: Router,
    private _userService: UserService
  ) 

  {
    this.status = -1;
    this.user = new User(0, "", "", "");
  } 

  navigateToSingUp(){
    this. router.navigate(['/Add-UserLogin']);
  }

  onSubmit(form: any) {

      this._userService.login(this.user).subscribe({
        next: (response: any) => {
          console.log(response)
          if (response.status != 401) {
            sessionStorage.setItem("token", response);
            this.showAlertSuccess('Se ha Iniciado sesión correctamente', 'success')
          }else{
            this.status = 0;
            this.showAlert('Usuario y/o contraseña incorrecta', 'error'); // USO SWEETALERT2
          }

        },
        error: (err: any) => {
          this.status = 1;
          this.showAlert('ERROR, error desde el servidor. Contacte a un admin', 'error');
        }
      });


  }

  showAlert(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: 'Oops...',
      text: message
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
        window.location.href = '/home'; 
      } 
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/home';
      }
    });
  }

}