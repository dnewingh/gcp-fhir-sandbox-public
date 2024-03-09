import { Component } from '@angular/core';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [],
  template: `
    <header>
      <nav class="navbar bg-dark border-bottom border-body mb-3" data-bs-theme="dark">
        <div class="container">
          <a class="navbar-brand" href="#">Admin App</a>
        </div>
      </nav>
    </header>
  `,
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent {

}
