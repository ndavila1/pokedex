import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PokedexComponent } from './component/pokedex/pokedex.component';
import { CardComponent } from './component/card/card.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { PokemonDetailsComponent } from './component/pokemon-details/pokemon-details.component';
import { SignupComponent } from './component/signup/signup.component';


import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    CardComponent,
    LoginComponent,
    PokemonDetailsComponent,
    SignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [PokemonService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
