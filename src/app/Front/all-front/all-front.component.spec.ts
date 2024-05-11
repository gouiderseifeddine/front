import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFrontComponent } from './all-front.component';

describe('AllFrontComponent', () => {
  let component: AllFrontComponent;
  let fixture: ComponentFixture<AllFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFrontComponent]
    });
    fixture = TestBed.createComponent(AllFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
