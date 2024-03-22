import { TestBed } from '@angular/core/testing';

import { BigqueryMockDataService } from './bigquery-mock-data.service';

describe('BigqueryMockDataService', () => {
  let service: BigqueryMockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigqueryMockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
