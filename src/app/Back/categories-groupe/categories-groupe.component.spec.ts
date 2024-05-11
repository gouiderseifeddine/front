import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesGroupeComponent } from './categories-groupe.component';

describe('CategoriesGroupeComponent', () => {
  let component: CategoriesGroupeComponent;
  let fixture: ComponentFixture<CategoriesGroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesGroupeComponent]
    });
    fixture = TestBed.createComponent(CategoriesGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
