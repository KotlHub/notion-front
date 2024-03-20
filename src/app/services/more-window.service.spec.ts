import { TestBed } from '@angular/core/testing';

import { MoreWindowService } from './more-window.service';

describe('MoreWindowService', () => {
  let service: MoreWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
