import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TePaginatorComponent } from './te-paginator.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [TePaginatorComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  exports: [TePaginatorComponent],
})
export class TePaginatorModule {}
