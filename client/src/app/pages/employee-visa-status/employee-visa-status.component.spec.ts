import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVisaStatusComponent } from './employee-visa-status.component';

describe('EmployeeVisaStatusComponent', () => {
  let component: EmployeeVisaStatusComponent;
  let fixture: ComponentFixture<EmployeeVisaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeVisaStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeVisaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
