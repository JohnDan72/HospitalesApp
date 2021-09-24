import { Component } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  
  public titulos: string[] = ['Titulo 1','Titulo 2','Titulo 3','Titulo 4'];
  public labels: string[][] = [
    ['Ventas 1', 'Compras 1', 'Precios 1'],
    ['Ventas 2', 'Compras 2', 'Precios 2'],
    ['Ventas 3', 'Compras 3', 'Precios 3'],
    ['Ventas 4', 'Compras 4', 'Precios 4'],
  ]
  public data: number[][] = [
    [24,345,49],
    [240,100,419],
    [41,35,59],
    [21,315,41],
  ]

  constructor() { }

}
