import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { DevelopersComponent } from './developers/developers.component';


const routes: Routes = [
  { path: 'games-component', component:  GamesComponent},
  { path: 'developers-component', component:  DevelopersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
