import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewboardComponent } from './createnewboard.component';

describe('CreatenewboardComponent', () => {
  let component: CreatenewboardComponent;
  let fixture: ComponentFixture<CreatenewboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
