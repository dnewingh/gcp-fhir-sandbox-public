import { Component } from '@angular/core';
import { HomeMockDataTableComponent } from '../home-mock-data-table/home-mock-data-table.component';
import { RequestLogsComponent } from '../request-logs/request-logs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeMockDataTableComponent, RequestLogsComponent],
  template: `
    <main class="container">
      <app-request-logs></app-request-logs>
      <app-home-mock-data-table resourceType="Patient" mockDataTableName="vw_fhir_patients_publish"></app-home-mock-data-table>
      <app-home-mock-data-table resourceType="Condition" mockDataTableName="vw_fhir_conditions_publish"></app-home-mock-data-table>
    </main>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
