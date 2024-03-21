import { Routes } from '@angular/router';

import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'login', title: 'Wheel of Fortuner - Login', component: LoginComponent },
    { path: '', redirectTo: '/gameList', pathMatch: 'full' },
    { path: 'gameList', title: 'Wheel of Fortuner - Game List', component: GameListComponent },
    { path: 'game/:id', title: 'Wheel of Fortuner - Game', component: GameComponent }
];
