import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { pluralize } from 'src/app/utils';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.scss'
})
export class AreaChartComponent implements OnChanges {
  chart: any;
  @Input() chartData: any = {};
  @Input() label!: string;
  dateLabels!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this._arrangeDateLabels();
    this._createChart();
  }

  private _arrangeDateLabels(): void {
    const dates = this.chartData.data.map((instance: any) => {
      return instance.history.map((h: any) => h.date);
    });

    this.dateLabels = [...new Set<string>(dates.flat())];
  }

  private _arrangeAmountDataPoints(history: any[]): number|null[] {
    const dataPoints: number|null[] = [];

    if (this.dateLabels) {
      this.dateLabels.forEach((date, index) => {
        if (index < history.length && date === history[index].date) {
          dataPoints.push(history[index].amount);
        } else {
          dataPoints.push(null);
        }
      })
    }

    return dataPoints;
  }

  private _createChart(): void {
    // using archive data 
    this.chart = new Chart("AreaChart", {
      type: 'line',
      data: {
        // values on X-axis 
        labels: this.dateLabels,
        datasets: this.chartData.data.map((instance: any) => (
          {
            label: instance.title,
            data: this._arrangeAmountDataPoints(instance.history),
            backgroundColor: 'blue',
            fill: 'start'
          }
        ))
      },
      options: {
        aspectRatio: 2.5,
        spanGaps: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: pluralize(this.chartData.type)
          }
        }
      }
    })
  }
}
