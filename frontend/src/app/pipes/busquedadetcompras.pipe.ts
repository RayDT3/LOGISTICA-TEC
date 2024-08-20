import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedadetcompras'
})
export class BusquedadetcomprasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 2) return value;
    const resultPosts = [];
    for (const item of value){
      if(item.proveedor.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(item);
      }
    }
    return resultPosts;
  }

}
