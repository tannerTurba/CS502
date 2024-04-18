import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

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
    confirmPassword: ''
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
    let firstName = this.signupForm.value.firstName;
    let lastName = this.signupForm.value.lastName;
    let username = this.signupForm.value.username;
    let password = this.signupForm.value.password;
    let confirmPassword = this.signupForm.value.confirmPassword;
    let checksPassed: boolean = true

    if (firstName?.length == 0) {
      this.firstNameFeedback = "Enter a first name";
      checksPassed = false;
    }
    else {
      this.firstNameFeedback = "";
    }

    if (lastName?.length == 0) {
      this.lastNameFeedback = "Enter a last name";
      checksPassed = false;
    }
    else {
      this.lastNameFeedback = "";
    }

    if (username?.length == 0) {
      this.usernameFeedback = "Enter an username";
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

    if (confirmPassword!.length == 0) {
      this.confirmPasswordFeedback = "Renter your password";
      checksPassed = false;
    }
    else {
      this.confirmPasswordFeedback = "";
    }

    if (password !== confirmPassword) {
      this.generalFeedback = 'Password and confirm password does not match';
      checksPassed = false;
    }
    
    if (checksPassed) {
      this.data.signup(username!, password!, firstName!, lastName!).subscribe((res) => {
        if (typeof res === "string") {
          this.generalFeedback = res;
        }
        else {
          let userData:User = res;
          sessionStorage.setItem('uid', res._id);
          this.router.navigateByUrl(`users/${userData._id}/my-ingredients`);
        }
      });
    }
  }
}
