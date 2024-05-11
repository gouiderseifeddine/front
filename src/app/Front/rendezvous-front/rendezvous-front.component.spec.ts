import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousFrontComponent } from './rendezvous-front.component';

describe('RendezvousFrontComponent', () => {
  let component: RendezvousFrontComponent;
  let fixture: ComponentFixture<RendezvousFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezvousFrontComponent]
    });
    fixture = TestBed.createComponent(RendezvousFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
