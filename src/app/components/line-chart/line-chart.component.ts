import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() lineChartLabels: string[];
  @Input() lineChartData: ChartDataSets[];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  constructor() {}

  ngOnInit(): void {}

}
