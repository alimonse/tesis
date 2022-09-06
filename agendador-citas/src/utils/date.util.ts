import { format } from 'date-fns';

export class DateUtil {
  static formatCalenda(date: string | Date) {
    if (!date) {
      return '';
    }
    return `${format(new Date(date), 'yyyy-MM-dd')}T${format(
      new Date(date),
      'HH:mm:ss',
    )}-05:00`;
  }
}
