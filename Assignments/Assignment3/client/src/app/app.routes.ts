import { Routes } from '@angular/router';

import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'login', title: 'Wheel of Fortuner - Login', component: LoginComponent },
    { path: '', redirectTo: 'users/:uid/games', pathMatch: 'full' },
    { path: 'users/:uid/games/:gid', title: 'Wheel of Fortuner - Game List', component: GameListComponent },
    { path: 'users/:uid/games/:gid', title: 'Wheel of Fortuner - Game', component: GameComponent }
];
