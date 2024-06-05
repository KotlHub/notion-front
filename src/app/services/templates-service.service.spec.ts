import { TestBed } from '@angular/core/testing';

import { TemplatesServiceService } from './templates-service.service';

describe('TemplatesServiceService', () => {
  let service: TemplatesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
