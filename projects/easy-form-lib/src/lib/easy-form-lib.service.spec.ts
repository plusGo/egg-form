import { TestBed } from '@angular/core/testing';

import { EasyFormLibService } from './easy-form-lib.service';

describe('EasyFormLibService', () => {
  let service: EasyFormLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasyFormLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
