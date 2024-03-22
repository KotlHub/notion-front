import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingswindowComponent } from './settingswindow.component';

describe('SettingswindowComponent', () => {
  let component: SettingswindowComponent;
  let fixture: ComponentFixture<SettingswindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingswindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingswindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
