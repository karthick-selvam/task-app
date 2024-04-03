import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appTruncateText]',
})
export class TruncateTextDirective {
  @Input() maxWidth: string = '100%'; // Default maximum width

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.truncateText();
  }

  truncateText() {
    const element = this.el.nativeElement;
    const maxWidth = parseInt(this.maxWidth, 10); // Parse maxWidth string to integer
    const actualWidth = element.offsetWidth; // Get the actual width of the element
    if (actualWidth > maxWidth) {
      const ratio = maxWidth / actualWidth;
      const truncationIndex = Math.floor(element.textContent.length * ratio);
      const truncatedText =
        element.textContent.slice(0, truncationIndex) + '...';
      element.textContent = truncatedText;
      element.dataset['showTooltip'] = true;
    }
  }
}
