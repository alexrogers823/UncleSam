import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'goalDate',
  standalone: true
})
export class GoalDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return moment(value, "YYYY-MM-DD").fromNow();
  }

}
