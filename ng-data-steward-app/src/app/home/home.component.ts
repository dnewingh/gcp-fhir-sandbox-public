import { Component } from '@angular/core';
import { HomeMockDataTableComponent } from '../home-mock-data-table/home-mock-data-table.component';
import { RequestLogsComponent } from '../request-logs/request-logs.component';
import { BigqueryMockDataService } from '../services/bigquery-mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeMockDataTableComponent, RequestLogsComponent],
  template: `
    <main class="container">
      <app-request-logs></app-request-logs>
      <p class="mb-1 fw-light fst-italic fs-6">{{ sheetsUrl.sheetsUrl }}</p>
      <app-home-mock-data-table resourceType="Patient" mockDataTableName="vw_fhir_patients_publish"></app-home-mock-data-table>
      <app-home-mock-data-table resourceType="Condition" mockDataTableName="vw_fhir_conditions_publish"></app-home-mock-data-table>
    </main>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sheetsUrl?: any

  constructor(private BigqueryMockDataService: BigqueryMockDataService) {}

  ngOnInit() {
    this.BigqueryMockDataService.getMockData('sheetsUrl').subscribe(
      {
        next: data => this.sheetsUrl = data,
        error: error => console.error(error),
        complete: () => console.log('SheetsUrl=' + this.sheetsUrl)
      }
    );
  }

}
