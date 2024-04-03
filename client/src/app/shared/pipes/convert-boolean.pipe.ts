import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBoolean',
})
export class ConvertBooleanPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): boolean {
    return Boolean(value);
  }
}
