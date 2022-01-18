import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BaseChartDirective, NgChartsConfiguration} from "ng2-charts";
import {
    ChartConfiguration,
    ChartData,
    ChartDataset,
    ChartType,
    ChartTypeRegistry,
    DefaultDataPoint, DoughnutDataPoint,
    PieDataPoint
} from "chart.js";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styles: []
})
export class StatisticsComponent implements OnInit {
    public labels = ['', ''];

    constructor(
        private httpClient: HttpClient,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.translate.get('weak').subscribe(data => this.labels[0] = data);
        this.translate.get('strong').subscribe(data => this.labels[1] = data);
        this.httpClient.get(environment.apiUrl + 'statistics/index.php')
            .subscribe(
                (data) => this.setData(data),
                (err) => console.log(err)
            );
    }

    @ViewChildren(BaseChartDirective)
    charts: QueryList<BaseChartDirective>;

    public data1d = this.getDataStructure();
    public data7d = this.getDataStructure();
    public data30d = this.getDataStructure();
    public data365d = this.getDataStructure();

    setData(data) {
        // this.data1d.labels = this.getLabels();
        // this.data7d.labels = this.getLabels();
        // this.data30d.labels = this.getLabels();
        // this.data365d.labels = this.getLabels();
        console.log(this.data1d);
        this.data1d.datasets[0].data = data.checks.last24Hours.data;
        this.data7d.datasets[0].data = data.checks.last7Days.data;
        this.data30d.datasets[0].data = data.checks.last30Days.data;
        this.data365d.datasets[0].data = data.checks.last12Months.data;
        this.charts.forEach((chart, index) => {
            chart.update();
        });
    }

    getDataStructure() {
        return {
            labels: this.labels,
            datasets: [{
                hoverBackgroundColor: this.getHoverColors(),
                hoverBorderColor: this.getHoverColors(),
                borderColor: this.getColors(),
                backgroundColor: this.getColors(),
                data: [0, 0]
            }]
        };
    }

    getColors() {
        return ['#C04040', '#40C040'];
    }

    getHoverColors() {
        return ['#F06060', '#60F060'];
    }

    getLabels() {
        return this.labels;
    }
}
