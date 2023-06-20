import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  loginFailed: boolean = false;
  mailerrorMessage:string='';
  passerrorMessage:string='';
  errorMessage:string='';
  
  constructor(private authService: AuthService) {}

  login(): void {
    this.loginFailed = false; // Reset the login failed flag
    if (!this.email) {
      this.mailerrorMessage = 'Please enter your email.';
      return;
    }

    if (!this.password) {
      this.passerrorMessage = 'Please enter your password.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.success) {
          // Redirect or perform any necessary actions upon successful login
          console.log('Login successful');
        } else {
          // Login failed
          this.loginFailed = true;
          this.errorMessage = response.error; // Set the error message based on the response
        }
      },
      () => {
        // Error occurred
        this.loginFailed = true;
        this.errorMessage = 'Server error';
      }
    );
  }




}
