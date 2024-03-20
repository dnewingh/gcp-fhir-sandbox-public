import { Component } from '@angular/core';
import { RequestLogsEntry, RequestLogsService } from '../services/request-logs.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-request-logs',
  standalone: true,
  imports: [ NgbAccordionModule, JsonPipe ],
  template: `
    <p>
      request-logs works! ({{ requestLogs.length }})
    </p>
    <div ngbAccordion>
      @for (logEntry of requestLogs; track logEntry.mockResourceId) {
        <div ngbAccordionItem>
          <div ngbAccordionHeader>
            <button ngbAccordionButton class="justify-content-between">
              <div>
                {{ logEntry.requestMethod}} {{ logEntry.relativeUrl }}
              </div>
              <div>
                Response Status: {{ logEntry.responseStatus }}
              </div>
            </button>
          </div>
          <div ngbAccordionCollapse>
            <div ngbAccordionBody>
              <ng-template><pre style="white-space: pre-wrap">{{ logEntry.responseBody | json }}</pre></ng-template>
            </div>
          </div>
        </div>
      }
      
    </div>
      
    
  `,
  styles: ``
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
