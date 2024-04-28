import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyIngredientsComponent } from './my-ingredients/my-ingredients.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThePantryComponent } from './the-pantry/the-pantry.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { profileGuard } from './auth.guard';
import { HouseholdComponent } from './household/household.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', title: 'Cellarium | Login', component: LoginComponent},
    { path: 'sign-up', title: 'Cellarium | Sign Up', component: SignUpComponent },
    { path: 'users/:uid/my-ingredients', title: 'Cellarium | My Ingredients', component: MyIngredientsComponent, canActivate: [profileGuard] },
    { path: 'users/:uid/the-pantry', title: 'Cellarium | The Pantry', component: ThePantryComponent, canActivate: [profileGuard] },
    { path: 'users/:uid/messages', title: 'Cellarium | Messages', component: MessagePageComponent, canActivate: [profileGuard] },
    { path: 'users/:uid/household', title: 'Cellarium | Household', component: HouseholdComponent, canActivate: [profileGuard] },
    { path: 'users/:uid/my-account', title: 'Cellarium | My Account', component: AccountDetailsComponent, canActivate: [profileGuard] }
];
