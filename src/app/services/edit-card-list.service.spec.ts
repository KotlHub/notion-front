import { TestBed } from '@angular/core/testing';

import { EditCardListService } from './edit-card-list.service';

describe('EditCardListService', () => {
  let service: EditCardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
