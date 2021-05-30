import { TestBed } from '@angular/core/testing';

import { ServerOptionService } from './server-option.service';

describe('ServerOptionService', () => {
  let service: ServerOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
