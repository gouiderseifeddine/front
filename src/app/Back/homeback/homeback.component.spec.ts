import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebackComponent } from './homeback.component';

describe('HomebackComponent', () => {
  let component: HomebackComponent;
  let fixture: ComponentFixture<HomebackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomebackComponent]
    });
    fixture = TestBed.createComponent(HomebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
