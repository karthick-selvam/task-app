import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning-dialog.component.html',
  styleUrls: ['./delete-warning-dialog.component.scss'],
})
export class DeleteWarningDialogComponent {
  title: string;
  question: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DeleteWarningDialogComponent>
  ) {
    this.title = data.title;
    this.question = data.question;
  }

  closeDialog(isDelete: boolean) {
    this.dialogRef.close({ isDelete });
  }
}
