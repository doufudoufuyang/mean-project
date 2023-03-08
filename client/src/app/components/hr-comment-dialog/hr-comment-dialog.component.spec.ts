import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCommentDialogComponent } from './hr-comment-dialog.component';

describe('HrCommentDialogComponent', () => {
  let component: HrCommentDialogComponent;
  let fixture: ComponentFixture<HrCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrCommentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
