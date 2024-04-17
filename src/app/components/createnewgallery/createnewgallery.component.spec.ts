import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewgalleryComponent } from './createnewgallery.component';

describe('CreatenewgalleryComponent', () => {
  let component: CreatenewgalleryComponent;
  let fixture: ComponentFixture<CreatenewgalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewgalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatenewgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
