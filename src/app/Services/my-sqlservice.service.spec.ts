import { TestBed } from '@angular/core/testing';

import { MySQLServiceService } from './my-sqlservice.service';

describe('MySQLServiceService', () => {
  let service: MySQLServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySQLServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
