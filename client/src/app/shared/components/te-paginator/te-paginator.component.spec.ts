import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TePaginatorComponent } from './te-paginator.component';

describe('TePaginatorComponent', () => {
  let component: TePaginatorComponent;
  let fixture: ComponentFixture<TePaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TePaginatorComponent]
    });
    fixture = TestBed.createComponent(TePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
