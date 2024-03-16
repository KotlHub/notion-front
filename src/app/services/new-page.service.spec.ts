import { TestBed } from '@angular/core/testing';

import { NewPageService } from './new-page.service';

describe('NewPageService', () => {
  let service: NewPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
