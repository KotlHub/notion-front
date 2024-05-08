import { TestBed } from '@angular/core/testing';

import { CreateNewUserItemService } from './create-new-user-item.service';

describe('CreateNewUserItemService', () => {
  let service: CreateNewUserItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewUserItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
