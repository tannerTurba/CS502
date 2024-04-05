import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });
  emailFeedback: string = '';
  pwdFeedback: string = '';
  generalFeedback: string = '';

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let checksPassed: boolean = true

    if (email?.length == 0) {
      this.emailFeedback = "Enter an email address";
      checksPassed = false;
    }
    else if (!email?.includes('@')) {
      this.emailFeedback = "Email must contain '@' character";
      checksPassed = false;
    }
    else {
      this.emailFeedback = "";
    }

    if (password!.length == 0) {
      this.pwdFeedback = "Enter a password";
      checksPassed = false;
    }
    else {
      this.pwdFeedback = "";
    }
    
    if (checksPassed) {
      this.data.login(email!, password!).subscribe((res) => {
        if (typeof res === "string") {
          this.generalFeedback = res;
        }
        else {
          let userData:User = res;
          this.authService.currentUser = res;
          this.router.navigateByUrl(`users/${userData._id}/games`);
        }
      });
    }
  }
}
