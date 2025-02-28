import { Component, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnChanges {
  chart: any;
  @Input() chartData: any[] = [];
  @Input() label!: string;
  testChartData = [{ title: 'test', amount: 40 }];
  testLabel = 'Test'
  chartId!: string;

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  generateId(): void {
    this.chartId = `${this.testLabel}-bar-chart`;
  }

  createChart() {
    this.chart = new Chart("BarChart", {
      type: 'bar', 
      data: {
        // values on X-Axis
        labels: this.chartData.map(d => d.title), 
        datasets: [
          {
            label: this.label,
            data: this.chartData.map(d => d.amount),
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}
