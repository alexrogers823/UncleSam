import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.scss'
})
export class AreaChartComponent implements OnChanges {
  chart: any;
  @Input() chartData: any[] = [];
  @Input() label!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this._createChart();
  }

  private _createChart(): void {
    // using archive data 
    this.chart = new Chart("AreaChart", {
      type: 'line',
      data: {
        // values on X-axis 
        labels: this.chartData.map(d => d.title),
        datasets: [
          {
            label: this.label,
            data: this.chartData.map(d => {
              if (d.currentAmount) {
                return d.currentAmount;
              }

              return d.amount;
            }),
            backgroundColor: 'blue',
            fill: 'start'
          }
        ],
      },
      options: {
        aspectRatio: 2.5
      }
    })
  }
}
