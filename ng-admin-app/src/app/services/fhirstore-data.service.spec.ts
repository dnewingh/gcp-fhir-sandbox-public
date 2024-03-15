import { TestBed } from '@angular/core/testing';

import { FhirstoreDataService } from './fhirstore-data.service';

describe('FhirstoreDataService', () => {
  let service: FhirstoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhirstoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
