import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <main class="container">
      <p>
        home works!
      </p>
      <div>
        <p>Without JSON pipe:</p>
        <pre>{{ testObject }}</pre>
        <p>With JSON pipe:</p>
        <pre>{{ testObject | json }}</pre>
      </div>
    </main>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  testObject: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};
}
