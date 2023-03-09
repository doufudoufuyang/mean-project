import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApplicationReviewComponent } from './hr-application-review.component';

describe('HrApplicationReviewComponent', () => {
  let component: HrApplicationReviewComponent;
  let fixture: ComponentFixture<HrApplicationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrApplicationReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrApplicationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
