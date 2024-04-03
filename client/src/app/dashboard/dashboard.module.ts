import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { MaterialModule } from '../shared/material/material.module';
import { TeWidgetCardModule } from '../shared/components/te-widget-card/te-widget-card.module';
import { TePaginatorModule } from '../shared/components/te-paginator/te-paginator.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../shared/shared.module';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { DeleteWarningDialogModule } from '../shared/components/delete-warning-dialog/delete-warning-dialog.module';

@NgModule({
  declarations: [DashboardHomeComponent, DataTableComponent, AddDataComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot(),
    MaterialModule,
    TeWidgetCardModule,
    TePaginatorModule,
    DeleteWarningDialogModule,
    SharedModule,
  ],
})
export class DashboardModule {}
