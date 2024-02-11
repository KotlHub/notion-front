import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserteamspacesComponent } from './userteamspaces.component';

describe('UserteamspacesComponent', () => {
  let component: UserteamspacesComponent;
  let fixture: ComponentFixture<UserteamspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserteamspacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserteamspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
