import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnChanges {
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
    this.chart = new Chart("LineChart", {
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
            backgroundColor: 'blue'
          }
        ],
      },
      options: {
        aspectRatio: 2.5
      }
    })
  }
}
