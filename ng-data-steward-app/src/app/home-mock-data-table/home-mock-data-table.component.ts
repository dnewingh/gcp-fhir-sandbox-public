import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BigqueryMockDataService } from '../services/bigquery-mock-data.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FhirstoreDataService } from '../services/fhirstore-data.service';
import { RequestLogsService } from '../services/request-logs.service';

@Component({
  selector: 'app-home-mock-data-table',
  standalone: true,
  imports: [JsonPipe, NgbAccordionModule],
  template: `
    <h2>{{ resourceType }}</h2>
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
              <button type="button" class="btn btn-primary btn-sm" (click)="postMockData(resourceType, mockResource)">Post</button>
              <button type="button" class="btn btn-primary btn-sm ms-2" (click)="validateMockData(resourceType, mockResource)">$Validate</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styleUrl: './home-mock-data-table.component.scss'
})

export class HomeMockDataTableComponent {
  @Input() resourceType = 'ResourceType';
  @Input() mockDataTableName = 'MockDataTableName'
  mockData?: any[];

  constructor(private BigqueryMockDataService: BigqueryMockDataService, private FhirstoreDataService: FhirstoreDataService, private RequestLogsService: RequestLogsService) {}

  ngOnInit() {
    this.BigqueryMockDataService.getMockData(this.mockDataTableName).subscribe(
      {
        next: data => this.mockData = data,
        error: error => console.error(error),
        complete: () => console.log('Mock Data loaded from ' + this.mockDataTableName + '.  ' + this.mockData?.length + ' resources.')
      }
    );
  }

  postMockData(resourceType: string, resourcePayload: object) {
    this.FhirstoreDataService.postResource(resourceType, resourcePayload).subscribe(
      {
        next: (data) => {
          this.RequestLogsService.addLog(
            {
              resourceType: resourceType,
              mockResourceId: '123',  //TO DO: get actual resourceId
              requestMethod: 'POST',
              requestTimestamp: new Date(),
              relativeUrl: resourceType,
              responseStatus: data.status,
              responseBody: data.body
            }
          );
          console.log(data);  // Log the full response
          //console.log(this.RequestLogsService.getLogs());
        },
        error: error => console.error(error),
        complete: () => console.log('resource posted.')
      }
    )    
  }

  validateMockData(resourceType: string, resourcePayload: object) {
    this.FhirstoreDataService.postResource(resourceType + '/$validate', resourcePayload).subscribe(
      {
        next: (data) => {
          this.RequestLogsService.addLog(
            {
              resourceType: resourceType,
              mockResourceId: '123',  //TO DO: get actual resourceId
              requestMethod: 'POST',
              requestTimestamp: new Date(),
              relativeUrl: resourceType + '/$validate',
              responseStatus: data.status,
              responseBody: data.body
            }
          );
          console.log(data);  // Log the full response
          //console.log(this.RequestLogsService.getLogs());
        },
        error: (error) => {
          this.RequestLogsService.addLog(
            {
              resourceType: resourceType,
              mockResourceId: '123',
              requestMethod: 'POST',
              requestTimestamp: new Date(),
              relativeUrl: resourceType + '/$validate',
              responseStatus: error.status,
              responseBody: error.error
            }
          );
          console.log(error);
          console.log(this.RequestLogsService.getLogs());
        },
        complete: () => console.log('resource validated.')
      }
    )    
  }


}
