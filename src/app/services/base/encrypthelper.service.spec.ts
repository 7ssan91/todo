import { TestBed } from '@angular/core/testing';

import { EncrypthelperService } from './encrypthelper.service';

describe('EncrypthelperService', () => {
  let service: EncrypthelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrypthelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
