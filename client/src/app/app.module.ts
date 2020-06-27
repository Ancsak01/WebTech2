import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { GamesService } from './games/games.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { DevelopersComponent } from './developers/developers.component';
import { DevelopersService } from './developers/developers.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    DevelopersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [GamesService, DevelopersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
