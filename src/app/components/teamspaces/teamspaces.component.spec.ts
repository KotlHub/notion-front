import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamspacesComponent } from './teamspaces.component';

describe('TeamspacesComponent', () => {
  let component: TeamspacesComponent;
  let fixture: ComponentFixture<TeamspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamspacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
