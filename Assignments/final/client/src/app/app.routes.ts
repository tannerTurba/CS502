import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyIngredientsComponent } from './my-ingredients/my-ingredients.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', redirectTo: 'my-ingredients', pathMatch: 'full' },
    { path: 'login', title: 'Cellarium | Login', component: LoginComponent},
    { path: 'sign-up', title: 'Cellarium | Sign Up', component: SignUpComponent },
    { path: 'my-ingredients', title: 'Cellarium | My Ingredients', component: MyIngredientsComponent }
];
