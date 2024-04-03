import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-te-widget-card',
  templateUrl: './te-widget-card.component.html',
  styleUrls: ['./te-widget-card.component.scss'],
})
export class TeWidgetCardComponent {
  @Input() widgetTitle: string = '';
  @Input() widgetTitleIconPath: string = '';
}
