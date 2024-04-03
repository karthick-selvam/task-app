import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    panelClass: ['warning-snackbar'],
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    action: string = 'Dismiss',
    config: MatSnackBarConfig = this.defaultConfig
  ) {
    this.snackBar.open(message, action, config);
  }
}
