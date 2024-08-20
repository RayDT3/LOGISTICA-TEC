import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedausers'
})
export class BusquedausersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 2) return value;
    const resultPosts = [];
    for (const item of value){
      if(item.username.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(item);
      }
    }
    return resultPosts;
  }

}
