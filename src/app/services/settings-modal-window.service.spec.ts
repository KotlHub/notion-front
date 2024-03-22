import { TestBed } from '@angular/core/testing';

import { SettingsModalWindowService } from './settings-modal-window.service';

describe('SettingsModalWindowService', () => {
  let service: SettingsModalWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsModalWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
