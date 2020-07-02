import { TestBed } from '@angular/core/testing';

import { MsSQLServiceService } from './ms-sqlservice.service';

describe('MsSQLServiceService', () => {
  let service: MsSQLServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsSQLServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
