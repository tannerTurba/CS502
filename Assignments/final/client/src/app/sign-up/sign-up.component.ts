import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassord: ''
  });
  firstNameFeedback: string = '';
  lastNameFeedback: string = '';
  usernameFeedback: string = '';
  pwdFeedback: string = '';
  confirmPasswordFeedback: string = '';
  generalFeedback: string = '';

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    let username = this.signupForm.value.username;
    let password = this.signupForm.value.password;
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
