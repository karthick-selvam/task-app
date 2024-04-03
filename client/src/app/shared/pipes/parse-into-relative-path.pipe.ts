import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseIntoRelativePath',
})
export class ParseIntoRelativePathPipe implements PipeTransform {
  transform(value: any, startFrom: string): string {
    if (!value || !startFrom) return '';

    const startIndex = value.indexOf(startFrom);
    if (startIndex === -1) return '';

    return value.substring(startIndex);
  }
}
