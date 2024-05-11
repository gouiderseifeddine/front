import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillformComponent } from './fillform.component';

describe('FillformComponent', () => {
  let component: FillformComponent;
  let fixture: ComponentFixture<FillformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillformComponent]
    });
    fixture = TestBed.createComponent(FillformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
