import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'createdDate',
  standalone: true
})
export class CreatedDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return moment(value).format("MMM Do, YYYY");
  }

}
