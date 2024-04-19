import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcardlistComponent } from './editcardlist.component';

describe('EditcardlistComponent', () => {
  let component: EditcardlistComponent;
  let fixture: ComponentFixture<EditcardlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcardlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
