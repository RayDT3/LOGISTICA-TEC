import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if(arg === '' || arg.length < 2) return value;
    const resultPosts = [];
    for (const item of value){
      if(item.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(item);
      }
      if(item.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(item);
      }
      if(item.dni.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(item);
      }
    }
    return resultPosts;
  }

}
