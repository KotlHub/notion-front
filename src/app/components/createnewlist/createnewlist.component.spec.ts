import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewlistComponent } from './createnewlist.component';

describe('CreatenewlistComponent', () => {
  let component: CreatenewlistComponent;
  let fixture: ComponentFixture<CreatenewlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatenewlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatenewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
