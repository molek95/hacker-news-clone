import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimeToDate',
  pure: true,
  standalone: true
})
export class UnixTimeToDatePipe implements PipeTransform {
  transform(unixTime: number): Date {
    return new Date(unixTime * 1000);
  }
}