import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsComponent } from './inscriptions.component';

describe('InscriptionsComponent', () => {
  let component: InscriptionsComponent;
  let fixture: ComponentFixture<InscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionsComponent]
    });
    fixture = TestBed.createComponent(InscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
