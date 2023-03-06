import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHousingManagementComponent } from './hr-housing-management.component';

describe('HrHousingManagementComponent', () => {
  let component: HrHousingManagementComponent;
  let fixture: ComponentFixture<HrHousingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrHousingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrHousingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
