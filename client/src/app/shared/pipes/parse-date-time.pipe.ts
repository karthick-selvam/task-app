import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'parseDateTime',
})
export class ParseDateTimePipe implements PipeTransform {
  transform(
    value: any,
    inputFormat: string = 'YYYY-MM-DD HH:mm:ss',
    format: string = 'MMM D, YYYY h:mm A'
  ): any {
    if (!value) {
      return '';
    }
    return moment(value, inputFormat).format(format);
  }
}
