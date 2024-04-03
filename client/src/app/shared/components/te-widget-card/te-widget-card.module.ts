import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeWidgetCardComponent } from './te-widget-card.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [TeWidgetCardComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  exports: [TeWidgetCardComponent],
})
export class TeWidgetCardModule {}
