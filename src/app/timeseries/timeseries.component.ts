import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration} from "chart.js";

@Component({
    selector: 'app-statistics',
    templateUrl: './timeseries.component.html',
    styles: []
})
export class TimeseriesComponent implements OnInit {
    titleWeak = '';
    titleStrong = '';
    titleAbsolute = '';
    titleRelative = '';

    constructor(
        private httpClient: HttpClient,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.translate.get('weak').subscribe(data => this.titleWeak = data);
        this.translate.get('strong').subscribe(data => this.titleStrong = data);
        this.translate.get('stats.absoluteNumbers').subscribe(data => this.titleAbsolute = data);
        this.translate.get('stats.relativePercentage').subscribe(data => this.titleRelative = data);
        this.httpClient.get(environment.apiUrl + 'timeseries/index.php')
            .subscribe(
                (data) => this.setData(data),
                (err) => console.log(err)
            );
    }

    @ViewChildren(BaseChartDirective)
    charts: QueryList<BaseChartDirective>;

    public data365dAbs = this.getDataStructure();
    public data365dRel = this.getDataStructure();
    public data30dAbs = this.getDataStructure();
    public data30dRel = this.getDataStructure();

    setData(data) {
        this.data365dAbs.labels = [];
        this.data365dAbs.datasets[0].label = this.titleWeak;
        this.data365dAbs.datasets[1].label = this.titleStrong;
        this.data365dAbs.datasets[0].data = [];
        this.data365dAbs.datasets[1].data = [];
        this.data365dRel.labels = [];
        this.data365dRel.datasets[0].label = this.titleWeak;
        this.data365dRel.datasets[1].label = this.titleStrong;
        this.data365dRel.datasets[0].data = [];
        this.data365dRel.datasets[1].data = [];
        for(let [key, value] of Object.entries(data.checks).slice(data.checks.length - 30)) {
            this.data365dAbs.labels.push(key);
            this.data365dAbs.datasets[0].data.push(parseInt(value['data'][0]));
            this.data365dAbs.datasets[1].data.push(parseInt(value['data'][1]));
            // calculate relative percentage
            this.data365dRel.labels.push(key);
            this.data365dRel.datasets[0].data.push(parseInt(value['data'][0])/parseInt(value['checkTotal'])*100);
            this.data365dRel.datasets[1].data.push(parseInt(value['data'][1])/parseInt(value['checkTotal'])*100);
        }
        this.data365dRel.datasets[0].fill = true;
        this.data365dRel.datasets[1].fill = true;

        this.data30dAbs = JSON.parse(JSON.stringify(this.data365dAbs));
        this.data30dRel = JSON.parse(JSON.stringify(this.data365dRel));

        // shorten list to last 30 entries
        this.data30dAbs.labels.splice(0, this.data30dAbs.labels.length - 30);
        this.data30dAbs.datasets[0].data.splice(0, this.data30dAbs.datasets[0].data.length - 30);
        this.data30dAbs.datasets[1].data.splice(0, this.data30dAbs.datasets[1].data.length - 30);
        this.data30dRel.labels.splice(0, this.data30dRel.labels.length - 30);
        this.data30dRel.datasets[0].data.splice(0, this.data30dRel.datasets[0].data.length - 30);
        this.data30dRel.datasets[1].data.splice(0, this.data30dRel.datasets[1].data.length - 30);

        this.charts.forEach((chart, index) => {
            switch(index) {
                case 0:
                case 2:
                    chart.chart.options = {
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: this.titleAbsolute
                                }
                            }
                        }
                    };
                    break;
                case 1:
                case 3:
                    chart.chart.options = {
                        scales: {
                            y: {
                                min: 0,
                                max: 100,
                                stacked: true,
                                title: {
                                    display: true,
                                    text: this.titleRelative
                                }
                            }
                        }
                    };
                    break;
            }
            chart.update();
        });
    }

    getDataStructure() {
        return {
            labels: [],
            datasets: [{
                    borderColor: this.getColors()[0],
                    backgroundColor: this.getColors()[0],
                    data: [0, 0],
                    pointRadius: 0,
                    fill: false,
                    normalized: false,
                    label: ''
                },
                {
                    borderColor: this.getColors()[1],
                    backgroundColor: this.getColors()[1],
                    data: [0, 0],
                    pointRadius: 0,
                    fill: false,
                    normalized: false,
                    label: ''
                }
            ]
        };
    }

    getColors() {
        return ['#C04040', '#40C040'];
    }
}
