import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export default class TimeSpanPipe implements PipeTransform {
  transform(value: string, delimiter?: string): string {
    const vals = value?.split(delimiter || ':');

    let res = vals?.[0] ? `${vals?.[0]}h. ` : '';
    res += vals?.[1] ? `${vals?.[1]}m. ` : '';
    res += vals?.[2] ? `${vals?.[2]}s.` : '';

    return res;
  }
}
