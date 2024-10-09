import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './add-user-login.component.html',
  styleUrl: './add-user-login.component.css',
  providers: [UserService]
})
export class AddUserLoginComponent {
  public status: number;
  public user: User;

  constructor(
    private router: Router,
    private _userService: UserService,
    private _router:Router
  ) 

  {
    this.status = -1;
    this.user = new User(0, "", "", "");
  } 

  

  onSubmit(form: any) {

    this._userService.create(this.user).subscribe({
      next:(response: any) => {
        console.log(response)
        if (response.status != 201) {
          this.showAlert('Ha ocurrido un error al crear usuario', 'error'); 
        }else{
          this.status = 0;
          this.showAlertSuccess('Se ha creado usuario correctamente', 'success')
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
      window.location.href = ''; 
    } 
  }).then((result) => {
    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
      window.location.href = '';
    }
  });
}


}
