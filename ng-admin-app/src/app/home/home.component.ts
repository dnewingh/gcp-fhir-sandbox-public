import { Component } from '@angular/core';
import { HomeMockDataTableComponent } from '../home-mock-data-table/home-mock-data-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeMockDataTableComponent],
  template: `
    <main class="container">
      <app-home-mock-data-table></app-home-mock-data-table>
    </main>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
