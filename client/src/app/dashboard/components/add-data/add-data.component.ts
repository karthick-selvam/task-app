import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent {
  addTaskForm: FormGroup = new FormGroup<any>({
    assignee: new FormControl<any>({}, [Validators.required]),
    designation: new FormControl<string>('', [Validators.required]),
    taskDescription: new FormControl<string>('', [Validators.required]),
    ETC: new FormControl<Date | null>(null, [Validators.required]),
  });

  users = [];

  constructor(
    private dashboardService: DashboardService,
    private matDialogRef: MatDialogRef<AddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getUsers();
    if (this.data?.taskId) {
      this.getTaskById(this.data?.taskId);
    }
  }

  getUsers() {
    this.dashboardService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err) => {},
    });
  }

  getTaskById(taskId) {
    this.dashboardService.getTask(taskId).subscribe({
      next: (res: any) => {
        const user = this.users.filter((user) => user._id === res.assignorId);
        this.addTaskForm.get('assignee').setValue(user[0]);
        this.addTaskForm.patchValue({
          designation: res?.designation,
          taskDescription: res?.taskDescription,
          ETC: res?.ETC,
        });
      },
    });
  }

  addTask() {
    if (this.addTaskForm.invalid) {
      return null;
    }

    const task = this.addTaskForm.value;
    return this.dashboardService.addNewTask(task).subscribe({
      next: (res: any) => {
        if (res._id) {
          this.closeDialog();
          this.snackBarService.openSnackBar(
            'Task has been created successfully!'
          );
        } else {
          this.snackBarService.openSnackBar(
            'Creating Task is not successfull. Please try again!'
          );
        }
      },
      error: (err) => {
        this.snackBarService.openSnackBar(
          'Creating Task is not successfull. Please try again!'
        );
      },
    });
  }

  resetTasksForm() {
    this.addTaskForm.reset();
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
