import { TestBed } from '@angular/core/testing';

import { RequestLogsService } from './request-logs.service';

describe('RequestLogsService', () => {
  let service: RequestLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
