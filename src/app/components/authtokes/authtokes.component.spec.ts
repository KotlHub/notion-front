import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthtokesComponent } from './authtokes.component';

describe('AuthtokesComponent', () => {
  let component: AuthtokesComponent;
  let fixture: ComponentFixture<AuthtokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthtokesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthtokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
