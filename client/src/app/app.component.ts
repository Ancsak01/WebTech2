import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Beadando';
  routerName = window.location.pathname.split('-')[0].split('/')[1];
}
