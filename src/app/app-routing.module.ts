import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './components/account/account.component';
import { AlonePlayerFieldComponent } from './components/alone-player-field/alone-player-field.component';
import { AreasComponent } from './components/areas/areas.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PlayersFieldComponent } from './components/players-field/players-field.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'play-vs-bot', component: AlonePlayerFieldComponent },
  { path: 'play-vs-player', component: PlayersFieldComponent },
  { path: 'ranking', component: RankingComponent },
  // { path: 'account', component: AccountComponent },
  { path: 'battle/:id', component: AreasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
