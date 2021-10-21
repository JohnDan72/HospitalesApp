import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Pipe({
  name: 'imgFilter'
})
export class ImgFilterPipe implements PipeTransform {

  transform(imgName: string = '', tipo: 'usuarios'|'hospitales'|'medicos'): string {

    return (imgName && imgName.startsWith('https://')) ? 
            imgName : `${base_url}/upload/?tipo=${tipo}&imagenName=${imgName}`;
  }

}
