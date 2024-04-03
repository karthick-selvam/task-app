import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeWidgetCardComponent } from './te-widget-card.component';

describe('TeWidgetCardComponent', () => {
  let component: TeWidgetCardComponent;
  let fixture: ComponentFixture<TeWidgetCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeWidgetCardComponent]
    });
    fixture = TestBed.createComponent(TeWidgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
