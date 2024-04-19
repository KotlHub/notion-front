import { TestBed } from '@angular/core/testing';

import { EditCardBoardService } from './edit-card-board.service';

describe('EditCardBoardService', () => {
  let service: EditCardBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCardBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
