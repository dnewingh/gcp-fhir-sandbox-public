import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <main class="container">
      <p>
        home works!
      </p>
    </main>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
