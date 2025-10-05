import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBookOpen,
  faEye,
  faEyeSlash,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/UserService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  faBookOpen = faBookOpen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faArrowRight = faArrowRight;

  showPassword = false;
  username = '';
  password = '';
  isLoading = false;

  constructor(private router: Router, private userService: UserService) {}

  handleSubmit(form: any) {
    console.log(this.username, this.password);
    if (form.valid) {
      this.userService
        .login({ username: this.username, password: this.password })
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            this.userService.loadUserProfile();
            this.router.navigate(['/']);
            this.isLoading = false;
          },
          error: (err) => {
            console.error(err);
            alert('Đăng nhập không thành công, vui lòng thử lại!');
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
