import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneOrderComponent } from './done-order.component';

describe('DoneOrderComponent', () => {
  let component: DoneOrderComponent;
  let fixture: ComponentFixture<DoneOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoneOrderComponent]
    });
    fixture = TestBed.createComponent(DoneOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
