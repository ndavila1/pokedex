import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexComponent } from './component/pokedex/pokedex.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { OnlyLoggedGuard } from './guards/only-logged.guard';
import { PokemonDetailsComponent } from './component/pokemon-details/pokemon-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'pokedex/:name', component: PokemonDetailsComponent, canActivate: [OnlyLoggedGuard]},
  {path:'pokedex', component: PokedexComponent, canActivate: [OnlyLoggedGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo : 'pokedex' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
