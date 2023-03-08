import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApplicationDetailComponent } from './hr-application-detail.component';

describe('HrApplicationDetailComponent', () => {
  let component: HrApplicationDetailComponent;
  let fixture: ComponentFixture<HrApplicationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrApplicationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
