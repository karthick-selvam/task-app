import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'detectedFacesSnapPath',
})
export class DetectedFacesSnapPathPipe implements PipeTransform {
  transform(value: any, isEntryPath: boolean): string {
    if (!value) return '';

    return `data/output/${value.userId}/${
      value.feedId
    }/Attendance/Detected_face/${moment(value.entryTime).format(
      'DD_MM_YYYY'
    )}/${isEntryPath ? value.entrySnapName : value.exitSnapName}`;
  }
}
