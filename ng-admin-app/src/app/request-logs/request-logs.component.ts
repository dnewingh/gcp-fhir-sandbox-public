import { Component } from '@angular/core';
import { RequestLogsEntry, RequestLogsService } from '../services/request-logs.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-request-logs',
  standalone: true,
  imports: [ NgbAccordionModule, JsonPipe, DatePipe ],
  template: `
    <h2>Request Logs</h2>
    
    <div ngbAccordion class="mb-3">
      @for (logEntry of requestLogs; track logEntry.mockResourceId) {
        <div ngbAccordionItem>
          <div ngbAccordionHeader class="p-1 accordion-button">
            <button ngbAccordionToggle class="btn container-fluid text-start p-0 mx-1">
              <div class="d-flex justify-content-between small">
                <div>{{ logEntry.requestTimestamp | date: 'mediumTime' }} {{ logEntry.requestMethod}} {{ logEntry.relativeUrl }}</div>
                <div>Response Status: {{ logEntry.responseStatus }}</div>
              </div>
            </button>
          </div>
          <div ngbAccordionCollapse>
            <div ngbAccordionBody>
              <ng-template><pre style="white-space: pre-wrap">{{ logEntry.responseBody | json }}</pre></ng-template>
            </div>
          </div>
        </div>
      } @empty {
        <p class="mb-0">There are no requests yet.</p>
      }
      
    </div>
      
    
  `,
  styles: `
    .custom-header::after {
      content: none;
    }
  `
})
export class RequestLogsComponent {
  requestLogs: RequestLogsEntry[] = [];

  constructor(private requestLogsService: RequestLogsService) {}
  
  ngOnInit() {
    this.requestLogs = this.requestLogsService.getLogs().sort((a, b) => {
      return b.requestTimestamp.getTime() - a.requestTimestamp.getTime(); // Sort in descending order by timestamp
    });
  }
}
