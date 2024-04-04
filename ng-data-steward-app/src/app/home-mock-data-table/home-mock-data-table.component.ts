import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BigqueryMockDataService } from '../services/bigquery-mock-data.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeMockDataTableRowActionsComponent } from '../home-mock-data-table-row-actions/home-mock-data-table-row-actions.component';

@Component({
  selector: 'app-home-mock-data-table',
  standalone: true,
  imports: [JsonPipe, NgbAccordionModule, HomeMockDataTableRowActionsComponent],
  template: `
    <h2>{{ resourceType }}</h2>
    @if (isLoading === true) {
      <div class="d-flex align-items-center">
        <p class="mb-0">Loading...</p>
        <div class="spinner-border spinner-border-sm ms-auto text-primary" role="status" aria-hidden="true"></div>
      </div>
    } @else {
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Resource</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (mockResource of mockData; track mockResource.id; let i = $index) {
            <tr>
              <td class="w-75">
                <div ngbAccordion>
                  <div ngbAccordionItem>
                    <h2 ngbAccordionHeader>
                      <button ngbAccordionButton class="p-1">{{ mockResource.id }}</button>
                    </h2>
                    <div ngbAccordionCollapse>
                      <div ngbAccordionBody>
                        <ng-template><pre style="white-space: pre-wrap">{{ mockResource | json }}</pre></ng-template>
                      </div>
                    </div>
                  </div>
                </div>  
              </td>
              <td>
                <app-home-mock-data-table-row-actions [resourceType]="resourceType" [mockResource]="mockResource"></app-home-mock-data-table-row-actions>
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styleUrl: './home-mock-data-table.component.scss'
})

export class HomeMockDataTableComponent {
  @Input() resourceType = 'ResourceType';
  @Input() mockDataTableName = 'MockDataTableName'
  mockData?: any[];
  isLoading = true;

  constructor(private BigqueryMockDataService: BigqueryMockDataService) {}

  ngOnInit() {
    // Fetch and hydrate components with Mock Data from BigQuery service
    this.BigqueryMockDataService.getMockData(this.mockDataTableName).subscribe(
      {
        next: data => this.mockData = data,
        error: error => console.error(error),
        complete: () => {
          console.log('Mock Data loaded from ' + this.mockDataTableName + '.  ' + this.mockData?.length + ' resources.');
          this.isLoading = false;
        }
      }
    );
  }

}
