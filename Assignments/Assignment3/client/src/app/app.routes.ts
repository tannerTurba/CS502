import { Routes } from '@angular/router';

import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { profileGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', title: 'Wheel of Fortuner - Login', component: LoginComponent },
    { path: 'users/:uid/games', title: 'Wheel of Fortuner - Game List', component: GameListComponent, canActivate: [profileGuard] },
    { path: 'users/:uid/games/:gid', title: 'Wheel of Fortuner - Game', component: GameComponent, canActivate: [profileGuard] }
];
