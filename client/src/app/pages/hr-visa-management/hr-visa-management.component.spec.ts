import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVisaManagementComponent } from './hr-visa-management.component';

describe('HrVisaManagementComponent', () => {
  let component: HrVisaManagementComponent;
  let fixture: ComponentFixture<HrVisaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrVisaManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrVisaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
