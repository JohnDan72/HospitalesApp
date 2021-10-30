import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public NUM_LINECHARTS = 1;
  public DATA_SIZE = 12;
  public lineChartLabels: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  public lineChartData: ChartDataSets[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let ind = 0; ind < this.NUM_LINECHARTS; ind++) {
      this.lineChartData.push({
        label: `Clientes`,
        data: this.randomData(),
        ...this.randomColor()
      });
    }
  }

  randomData(): number[]{
    let data: number[] = [];
    for (let ind = 0; ind < this.DATA_SIZE; ind++) {
      data.push(Math.floor(Math.random() * 20) + 1);
    }
    return data
  }

  randomColor(){
    const tranp = '0.5';
    const borders = [ 
      `rgba(126, 87, 194,1)`,
      `rgba(92, 107, 192,1)`,
      `rgba(66, 165, 245,1)`,

      `rgba(79, 195, 247,1)`,
      `rgba(38, 198, 218,1)`,
      `rgba(38, 166, 154,1)`,
      
      `rgba(102, 187, 106,1)`,
      `rgba(156, 204, 101,1)`,
      `rgba(212, 225, 87,1)`,
     ];
     const colors = [ 
      `rgba(126, 87, 194,${tranp})`,
      `rgba(92, 107, 192,${tranp})`,
      `rgba(66, 165, 245,${tranp})`,

      `rgba(79, 195, 247,${tranp})`,
      `rgba(38, 198, 218,${tranp})`,
      `rgba(38, 166, 154,${tranp})`,
      
      `rgba(102, 187, 106,${tranp})`,
      `rgba(156, 204, 101,${tranp})`,
      `rgba(212, 225, 87,${tranp})`,
     ];
     const ind = Math.floor(Math.random() * colors.length);
    return { // grey
      backgroundColor: colors[ind],
      borderColor: borders[ind],
      pointBackgroundColor: borders[ind],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: colors[ind]
    }
  }

}
