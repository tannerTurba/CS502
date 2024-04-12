import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  usernameFeedback: string = '';
  pwdFeedback: string = '';
  generalFeedback: string = '';

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let checksPassed: boolean = true

    if (username?.length == 0) {
      this.usernameFeedback = "Enter an username address";
      checksPassed = false;
    }
    else if (!username?.includes('@')) {
      this.usernameFeedback = "username must contain '@' character";
      checksPassed = false;
    }
    else {
      this.usernameFeedback = "";
    }

    if (password!.length == 0) {
      this.pwdFeedback = "Enter a password";
      checksPassed = false;
    }
    else {
      this.pwdFeedback = "";
    }
    
    if (checksPassed) {
      this.data.login(username!, password!).subscribe((res) => {
        if (typeof res === "string") {
          this.generalFeedback = res;
        }
        else {
          let userData:User = res;
          sessionStorage.setItem('uid', res._id);
          this.router.navigateByUrl(`users/${userData._id}/games`);
        }
      });
    }
  }
}
