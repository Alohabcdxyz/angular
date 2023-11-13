import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConfirmOrderComponent } from './not-confirm-order.component';

describe('NotConfirmOrderComponent', () => {
  let component: NotConfirmOrderComponent;
  let fixture: ComponentFixture<NotConfirmOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotConfirmOrderComponent]
    });
    fixture = TestBed.createComponent(NotConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
