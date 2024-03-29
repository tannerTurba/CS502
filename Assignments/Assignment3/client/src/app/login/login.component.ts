import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user';
import { Router } from '@angular/router';

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

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    let emailFeedback = document.getElementById('emailFeedback') as HTMLElement;
    let pwdFeedback = document.getElementById('pwdFeedback') as HTMLElement;
    let generalFeedback = document.getElementById('generalFeedback') as HTMLElement;

    emailFeedback.innerText = "";
    pwdFeedback.innerText = "";
    generalFeedback.innerText = "";

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let checksPassed: boolean = true

    if (email?.length == 0) {
      emailFeedback.innerText = "Enter an email address";
      checksPassed = false;
    }
    else if (!email?.includes('@')) {
      emailFeedback.innerText = "Email must contain '@' character";
      checksPassed = false;
    }

    if (password!.length == 0) {
      pwdFeedback.innerText = "Enter a password";
      checksPassed = false;
    }
    
    if (checksPassed) {
      this.data.login(email!, password!).subscribe((res) => {
        if (typeof res === "string") {
          generalFeedback.innerText = res;
        }
        else {
          let userData:User = res;
          this.router.navigateByUrl(`users/${userData._id}/games`);
        }
      });
    }
  }
}
