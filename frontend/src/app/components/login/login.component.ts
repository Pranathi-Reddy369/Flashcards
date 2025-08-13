import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

constructor(private userService: UserService, private router : Router){}

onLogin() {
  this.userService.login(this.loginData).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home']);
    },
    error: e => {
      alert(e.error.message || 'Login failed');
    
    }
  });
}

}
