import { Component, Input } from '@angular/core';
import { FhirstoreDataService } from '../services/fhirstore-data.service';
import { RequestLogsService } from '../services/request-logs.service';

@Component({
  selector: 'app-home-mock-data-table-row-actions',
  standalone: true,
  imports: [],
  template: `
    <p>
      home-mock-data-table-row-actions works!
    </p>
    <button type="button" class="btn btn-primary btn-sm" (click)="postMockData(resourceType, mockResource)">
      @if (isPosting === true) {
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span class="visually-hidden" role="status">Loading...</span>
      } @else {
        Post
      }
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

}
