import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { pluralize } from 'src/app/utils';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnChanges {
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

    this.dateLabels = [...new Set<string>(dates.flat())].sort()
    console.log(this.dateLabels)
  }

  private _arrangeAmountDataPoints(history: any[]): number|null[] {
    const dataPoints: number|null[] = [];

    if (this.dateLabels) {
      const historyDates = history.map((h: any) => h.date);

      this.dateLabels.forEach((date) => {
        if (historyDates.includes(date)) {
          const index = historyDates.indexOf(date)
          dataPoints.push(history[index].amount);
        } else {
          dataPoints.push(null);
        }
      })
    }

    console.log('data points', dataPoints)

    return dataPoints;
  }

  private _createChart(): void {
    // using archive data 
    this.chart = new Chart("LineChart", {
      type: 'line',
      data: {
        // values on X-axis 
        labels: this.dateLabels,
        datasets: this.chartData.data.map((instance: any) => (
          {
            label: instance.title,
            data: this._arrangeAmountDataPoints(instance.history),
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
