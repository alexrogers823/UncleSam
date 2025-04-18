import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRandomColor, pluralize } from 'src/app/utils';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnChanges {
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
    this.dateLabels = this.chartData.data.map((instance: any) => instance.title);
  }

  private _arrangeAmountDataPoints(history: any[]): number[] {
    return [history[0].amount];
  }

  private _setBackgroundColor(): string {
    const [red, green, blue] = [getRandomColor(), getRandomColor(), getRandomColor()]
    return `rgba(${red}, ${green}, ${blue}, 0.2)`
  }

  private _createChart(): void {
    // using archive data 
    this.chart = new Chart("BarChart", {
      type: 'bar',
      data: {
        // values on X-axis 
        labels: this.dateLabels,
        datasets: [
          {
            data: this.chartData.data.map((instance: any) => instance.history[instance.history.length-1].amount),
            backgroundColor: this.chartData.data.map((_: any) => this._setBackgroundColor())
          }
        ],
      },
      options: {
        aspectRatio: 2.5,
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
