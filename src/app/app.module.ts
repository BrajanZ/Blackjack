import { AccountComponent } from './components/account/account.component';
import { AlonePlayerFieldComponent } from './components/alone-player-field/alone-player-field.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BetButtonsComponent } from './components/bet-buttons/bet-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from './components/main-area/card/card.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MainAreaComponent } from './components/main-area/main-area.component';
import { NgModule } from '@angular/core';
import { PlayersFieldComponent } from './components/players-field/players-field.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AreasComponent } from './components/areas/areas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    RankingComponent,
    AlonePlayerFieldComponent,
    PlayersFieldComponent,
    BetButtonsComponent,
    CardComponent,
    MainAreaComponent,
    UserLoginComponent,
    RegisterUserComponent,
    AreasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
