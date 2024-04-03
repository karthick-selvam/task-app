import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningDialogComponent } from './delete-warning-dialog.component';

describe('DeleteWarningDialogComponent', () => {
  let component: DeleteWarningDialogComponent;
  let fixture: ComponentFixture<DeleteWarningDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteWarningDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
