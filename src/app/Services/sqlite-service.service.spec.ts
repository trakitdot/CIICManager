import { TestBed } from '@angular/core/testing';

import { SQLiteServiceService } from './sqlite-service.service';

describe('SQLiteServiceService', () => {
  let service: SQLiteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SQLiteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
