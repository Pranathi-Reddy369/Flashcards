import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/app.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    joined: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.user.firstName.trim() || !this.user.lastName.trim() || !this.user.email.trim() || !this.user.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (!this.user.gender) {
      this.errorMessage = 'Please select your gender.';
      return;
    }

    this.user.joined = new Date().toISOString();

    const newUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
      gender: this.user.gender,
      joined: this.user.joined
    };

    this.userService.register(newUser).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: err => {
        this.errorMessage = err?.error?.message || 'Registration failed. Try again.';
        console.error(err);
      }
    });
  }
}
