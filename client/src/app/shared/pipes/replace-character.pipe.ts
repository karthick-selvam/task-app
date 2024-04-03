import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCharacter',
})
export class ReplaceCharacterPipe implements PipeTransform {
  transform(
    value: string,
    replace: string,
    replaceWith: string,
    transformCase: string
  ): string {
    if (typeof value !== 'string') {
      return value;
    }
    const replacedString = value.replace(new RegExp(replace, 'g'), replaceWith);

    switch (transformCase) {
      case 'uppercase':
        return replacedString.toUpperCase();
      case 'lowercase':
        return replacedString.toLowerCase();
      case 'titlecase':
        return replacedString
          .replace(/\b\w\S*/g, (word: string) => word.toLowerCase())
          .replace(/\b\w/g, (char: string) => char.toUpperCase());
      default:
        return value;
    }
  }
}
