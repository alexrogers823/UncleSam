import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'dueDate',
  standalone: true
})
export class DueDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return moment(value, "YYYY-MM-DD").fromNow();
  }

}
