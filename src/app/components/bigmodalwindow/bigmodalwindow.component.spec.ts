import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigmodalwindowComponent } from './bigmodalwindow.component';

describe('BigmodalwindowComponent', () => {
  let component: BigmodalwindowComponent;
  let fixture: ComponentFixture<BigmodalwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigmodalwindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigmodalwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
