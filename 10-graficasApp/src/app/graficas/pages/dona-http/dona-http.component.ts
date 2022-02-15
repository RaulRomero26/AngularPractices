import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service'

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

public doughnutChartLabels: Label[] = [
  // 'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Other Sales'
];
public doughnutChartData: MultiDataSet = [
  // [350, 450, 100, 150],
];

public doughnutChartType: ChartType = 'doughnut';

public colors: Color[] = [
  {
    backgroundColor:['#034CFD','#19A8E6','#0FFAE0','#02E366','#03FD04']
  }
]

  constructor( private graficasService: GraficasService) { }

  ngOnInit(): void {

    // this.graficasService.getUsuariosRedesSociales()
    //   .subscribe(data => {
    //     console.log(data)
    //     const labels = Object.keys(data);
    //     const values = Object.values(data);
    //     console.log(labels)
    //     console.log(values)
    //     this.doughnutChartLabels = labels;
    //     this.doughnutChartData = values;
    //   })

    this.graficasService.getUsuariosRedesSocialesDonaDta()
      .subscribe (({labels, values}) => {
        this.doughnutChartLabels = labels;
        this.doughnutChartData.push(values)
      })
  }

}
