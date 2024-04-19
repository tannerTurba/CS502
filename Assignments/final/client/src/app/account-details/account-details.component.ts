import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  userInfo: User = {
    _id: 'string',
    username: 'string',
    password: 'string',
    firstName: 'string',
    lastName: 'string',
    role: 'string',
    status: 'string',
    householdId: 'string'
  };
  signupForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  pwdFeedback: string = '';
  confirmPasswordFeedback: string = '';
  generalFeedback: string = '';

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.data.getUserInfo(this.uid).subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
  }

  onSubmit(): void {
    let firstName = this.signupForm.value.firstName;
    let lastName = this.signupForm.value.lastName;
    let password = this.signupForm.value.password;
    let confirmPassword = this.signupForm.value.confirmPassword;
    let checksPassed: boolean = true

    if (firstName === null) {
      firstName = '';
    }
    if (lastName === null) {
      lastName = '';
    }
    if(password === null) {
      password = '';
    }
    if (confirmPassword === null) {
      confirmPassword = '';
    }

    if (confirmPassword!.length > 0 && password!.length == 0) {
      this.pwdFeedback = "Enter a password";
      checksPassed = false;
    }
    else {
      this.pwdFeedback = "";
    }

    if (password!.length > 0 && confirmPassword!.length == 0) {
      this.confirmPasswordFeedback = "Renter your password";
      checksPassed = false;
    }
    else {
      this.confirmPasswordFeedback = "";
    }

    if (password!.length > 0 && confirmPassword!.length > 0 && password !== confirmPassword) {
      this.generalFeedback = 'Password and confirm password does not match';
      checksPassed = false;
    }
    else {
      this.generalFeedback = '';
    }
    
    if (checksPassed) {
      this.data.modifyAccount(this.uid, firstName!, lastName!, password!).subscribe((res) => {
        this.userInfo = res;
      });
      this.signupForm.reset();
    }
  }
}
