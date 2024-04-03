import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'parseTime',
})
export class ParseTimePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return 'Not Exited';
    }
    if (!moment(value).isValid()) {
      return 'N/A';
    }

    const parsedDate = moment(value);
    return parsedDate.format('HH:mm:ss A');
  }
}
