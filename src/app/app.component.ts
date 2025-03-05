import { Component, OnInit } from '@angular/core';
import { ArchiveService } from './archives/archive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  chartData: any[] = [];

  constructor(
    private _archiveService: ArchiveService
  ) {}

  ngOnInit(): void {
    this.getChartData();
  }

  getChartData() {
    this._archiveService.getChartData()
      .subscribe(chartData => {
        this.chartData = chartData
      });
  }

  getSpecificChartData(label: string) {
    return this.chartData.find((chart: any) => chart.type === label)
  }
}
