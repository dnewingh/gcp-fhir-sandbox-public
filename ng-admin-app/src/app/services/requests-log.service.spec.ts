import { TestBed } from '@angular/core/testing';

import { RequestsLogService } from './requests-log.service';

describe('RequestsLogService', () => {
  let service: RequestsLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
