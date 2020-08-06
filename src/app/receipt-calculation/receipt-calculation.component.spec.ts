import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCalculationComponent } from './receipt-calculation.component';

describe('ReceiptCalculationComponent', () => {
  let component: ReceiptCalculationComponent;
  let fixture: ComponentFixture<ReceiptCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
