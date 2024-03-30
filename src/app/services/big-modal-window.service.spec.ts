import { TestBed } from '@angular/core/testing';

import { BigModalWindowService } from './big-modal-window.service';

describe('BigModalWindowService', () => {
  let service: BigModalWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigModalWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
