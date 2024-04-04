import { Component, Input } from '@angular/core';
import { FhirstoreDataService } from '../services/fhirstore-data.service';
import { RequestLogsService } from '../services/request-logs.service';

@Component({
  selector: 'app-home-mock-data-table-row-actions',
  standalone: true,
  imports: [],
  template: `
    <button type="button" class="btn btn-primary btn-sm" [disabled]="isPosting" (click)="postMockData(resourceType, mockResource)">
      @if (isPosting === true) {
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span class="visually-hidden" role="status">Loading...</span>
      } POST
    </button>
    <button type="button" class="btn btn-primary btn-sm ms-2" [disabled]="isValidating" (click)="validateMockData(resourceType, mockResource)">
      @if (isValidating === true) {
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span class="visually-hidden" role="status">Loading...</span>
        }
      $Validate
    </button>
  `,
  styles: ``
})
export class HomeMockDataTableRowActionsComponent {
  @Input() resourceType = 'ResourceType';
  @Input() mockResource = {};
  isPosting = false;
  isValidating = false;

  constructor(private FhirstoreDataService: FhirstoreDataService, private RequestLogsService: RequestLogsService) {}

  postMockData(resourceType: string, resourcePayload: object) {
    // Set actions state
    this.isPosting = true;

    // Post resource to FHIR store
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
        complete: () => {
          console.log('resource posted.')
          
          // Update actions state
          this.isPosting = false;
        }
      }
    )
    
  }

  validateMockData(resourceType: string, resourcePayload: object) {
    // Set actions state
    this.isValidating = true;

    // Send request for $validate operation to FHIR server
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
              mockResourceId: '123',  //TO DO: get actual resourceId
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
        complete: () => {
          console.log('resource validated.')
          
          // Update actions state
          this.isValidating = false;
        }
      }
    )    
  }

}
