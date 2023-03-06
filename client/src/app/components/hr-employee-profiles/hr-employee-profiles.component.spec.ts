import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeProfilesComponent } from './hr-employee-profiles.component';

describe('HrEmployeeProfilesComponent', () => {
  let component: HrEmployeeProfilesComponent;
  let fixture: ComponentFixture<HrEmployeeProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmployeeProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrEmployeeProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
