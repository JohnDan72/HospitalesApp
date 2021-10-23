import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgFilter'
})
export class ImgFilterPipe implements PipeTransform {

  transform(imgName: string, tipo: 'usuarios'|'hospitales'|'medicos'): string {

    // return (imgName && imgName.startsWith('https://')) ? 
    //         imgName : `${base_url}/upload/?tipo=${tipo}&imagenName=${imgName}`;
    return (imgName) ? 
            imgName : `../../assets/images/no-photo.png`;
  }

}
