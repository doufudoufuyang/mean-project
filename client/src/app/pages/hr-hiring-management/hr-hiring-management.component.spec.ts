import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHiringManagementComponent } from './hr-hiring-management.component';

describe('HrHiringManagementComponent', () => {
  let component: HrHiringManagementComponent;
  let fixture: ComponentFixture<HrHiringManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrHiringManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrHiringManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
