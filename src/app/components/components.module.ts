import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ModalImgComponent } from './modal-img/modal-img.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CentralCardComponent } from './central-card/central-card.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
    ModalImgComponent,
    LineChartComponent,
    CentralCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
    ModalImgComponent,
    LineChartComponent,
    CentralCardComponent
  ]
})
export class ComponentsModule { }
