import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBarComponent } from './app-bar/app-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppBarComponent, RouterOutlet],
  template: `
	<app-app-bar></app-app-bar>	
	<router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  patientsMockData?: any[];
  conditionsMockData?: any[];

  constructor() {}
}
