import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  DASHBOARD_SERVICE_HOST = `${environment.NODE_API_URL}/api`;

  constructor(private http: HttpClient) {}

  getUsers() {
    const url = `${this.DASHBOARD_SERVICE_HOST}/users`;
    return this.http.get(url);
  }

  addNewTask(task: any) {
    const url = `${this.DASHBOARD_SERVICE_HOST}/tasks`;
    return this.http.post(url, task);
  }

  getTasks(pagination) {
    let params = new HttpParams();
    params = params.appendAll({
      ...pagination,
    });
    const url = `${this.DASHBOARD_SERVICE_HOST}/tasks`;
    return this.http.get(url, { params });
  }

  getTask(taskId) {
    const url = `${this.DASHBOARD_SERVICE_HOST}/tasks/${taskId}`;
    return this.http.get(url);
  }

  deleteTask(taskId: string) {
    const url = `${this.DASHBOARD_SERVICE_HOST}/tasks/${taskId}`;
    return this.http.delete(url);
  }
}
