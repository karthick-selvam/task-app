import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseTimePipe } from './pipes/parse-time.pipe';
import { ParseDateTimePipe } from './pipes/parse-date-time.pipe';
import { ConvertBooleanPipe } from './pipes/convert-boolean.pipe';
import { ParseIntoRelativePathPipe } from './pipes/parse-into-relative-path.pipe';
import { TruncateTextDirective } from './directives/truncate-text.directive';
import { MaterialModule } from './material/material.module';
import { ReplaceCharacterPipe } from './pipes/replace-character.pipe';

@NgModule({
  declarations: [
    ParseTimePipe,
    ParseDateTimePipe,
    ConvertBooleanPipe,
    ParseIntoRelativePathPipe,
    TruncateTextDirective,
    ReplaceCharacterPipe,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    ParseTimePipe,
    ParseDateTimePipe,
    ConvertBooleanPipe,
    ParseIntoRelativePathPipe,
    TruncateTextDirective,
    ReplaceCharacterPipe,
  ],
})
export class SharedModule {}
