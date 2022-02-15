import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Other Sales'];
public doughnutChartData: MultiDataSet = [
  [350, 450, 100, 150],
];

public doughnutChartType: ChartType = 'doughnut';

public colors: Color[] = [
  {
    backgroundColor:['#034CFD','#19A8E6','#0FFAE0','#02E366','#03FD04']
  }
]
}
