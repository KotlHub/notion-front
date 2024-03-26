import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewpageComponent } from './createnewpage.component';

describe('CreatenewpageComponent', () => {
  let component: CreatenewpageComponent;
  let fixture: ComponentFixture<CreatenewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
