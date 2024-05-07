import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewtableComponent } from './createnewtable.component';

describe('CreatenewtableComponent', () => {
  let component: CreatenewtableComponent;
  let fixture: ComponentFixture<CreatenewtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewtableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatenewtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
