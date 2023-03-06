import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHousingComponent } from './employee-housing.component';

describe('EmployeeHousingComponent', () => {
  let component: EmployeeHousingComponent;
  let fixture: ComponentFixture<EmployeeHousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeHousingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
