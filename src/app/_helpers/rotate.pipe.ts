import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rotate'
})
export class RotatePipe implements PipeTransform {

  transform(value: any[], startIndex?: any, count = 4): any {
    //console.log(startIndex);
    //console.log(value);

    startIndex = startIndex % value.length;
    return value.slice(startIndex, value.length).concat(value.slice(0, startIndex)).slice(0, 4);

    if (startIndex <= value.length - count) {
      //console.log('returing');
      return value.slice(startIndex, startIndex + count);
    } else {
      // console.log('in else');
      // 8-5 = 3
      // 6,7,8
      const c = count - (value.length - startIndex);

      return [...value.slice(startIndex), ...value.slice(0, c)];
    }

  }

}
