import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedareceta'
})
export class BusquedacategoriaPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if(arg === '' || arg.length < 1) return value;
    const resultPosts = [];
    for (const item of value){
      if(item.receta.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(item);
      }
    }
    return resultPosts;
  }

}
