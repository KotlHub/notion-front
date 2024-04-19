import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcardboardComponent } from './editcardboard.component';

describe('EditcardboardComponent', () => {
  let component: EditcardboardComponent;
  let fixture: ComponentFixture<EditcardboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcardboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcardboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
