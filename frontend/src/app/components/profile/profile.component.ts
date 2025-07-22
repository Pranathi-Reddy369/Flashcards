import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/app.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user?: User;
  editing = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getCurrentUser().subscribe({
      next: (data: User | null) => {
        if (data) {
          this.user = data;
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        console.error('Failed to load user data:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  enableEdit() {
    this.editing = true;
  }

  saveChanges() {
    if (!this.user || !this.user._id) return;

    this.userService.updateUser(this.user._id, this.user).subscribe({
      next: () => {
        this.editing = false;
        console.log('User updated successfully');
      },
      error: err => {
        console.error('Failed to update user:', err);
      }
    });
  }

  deleteAccount() {
    if (!this.user || !this.user._id) return;

    if (confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteUser(this.user._id).subscribe({
        next: () => {
          console.log('User deleted');
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Failed to delete user:', err);
        }
      });
    }
  }

  getProfileImage(): string {
    if (!this.user || !this.user.gender) return 'assets/default-user.png';

    switch (this.user.gender.toLowerCase()) {
      case 'male':
        return 'https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740';
      case 'female':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-NK-Q7ElIuxotNPZSuRC8fZfw2Fu_n2mLg&s';
      default:
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmwDi01Iw-QjSwBeTh2Xi7sHwSo_8F_R2jnw&s';
    }
  }
}
