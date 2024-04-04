import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { pagination } from 'src/app/shared/interfaces/shared.model';
import { AddDataComponent } from '../add-data/add-data.component';
import { DashboardService } from '../../services/dashboard.service';
import { DeleteWarningDialogComponent } from 'src/app/shared/components/delete-warning-dialog/delete-warning-dialog.component';
import { take } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  displayedColumns: string[] = [
    'assigneeName',
    'designation',
    'task',
    'ETC',
    'actions',
  ];

  paginationData: pagination = {
    page: 1,
    pageSize: 20,
    totalPages: 0,
  };

  dataSource = new MatTableDataSource<any>();
  userRole: string = '';
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      if (user.role) this.userRole = user.role;

      if (this.userRole !== 'admin') {
        const index = this.displayedColumns.indexOf('actions');
        if (index !== -1) {
          this.displayedColumns.splice(index, 1);
        }
      }
    });
    this.getTasks();
  }

  onPageChange(pagination: pagination) {
    this.paginationData = pagination;
    this.getTasks();
  }

  openTaskModal(task?) {
    const taskId = task?._id;
    const dialogRef = this.matDialog.open(AddDataComponent, {
      width: '50vh',
      autoFocus: false,
      data: {
        taskId,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks();
    });
  }

  getTasks() {
    this.dashboardService.getTasks(this.paginationData).subscribe({
      next: (res: any) => {
        if (res.tasks) {
          this.dataSource.data = res?.tasks;
          this.paginationData.page = res?.currentPage;
          this.paginationData.totalPages = res?.totalPages;
        }
      },
      error: (err) => {},
    });
  }

  openDeleteWarningDialog(task) {
    const taskId = task?._id;

    const dialogRef = this.matDialog.open(DeleteWarningDialogComponent, {
      maxWidth: '29rem',
      data: {
        title: 'Delete feed?',
        question: 'Are you sure you want to delete the task?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data.isDelete) this.deleteTask(taskId);
        },
      });
  }

  deleteTask(taskId) {
    this.dashboardService.deleteTask(taskId).subscribe({
      next: (res) => {
        this.getTasks();
        this.snackbarService.openSnackBar(
          'Task has been deleted successfully!'
        );
      },
    });
  }
}
