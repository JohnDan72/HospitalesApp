import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgFilterPipe } from './img-filter.pipe';

@NgModule({
  declarations: [
      ImgFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImgFilterPipe
  ]
})
export class MiPipesModule { }
