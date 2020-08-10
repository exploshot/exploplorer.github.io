import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as Chartist from 'chartist';
import {ExplorerService} from '../explorer.service';
import {Functions} from '../functions';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CdkScrollableModule} from '@angular/cdk/scrolling';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    multi: any[];

    // options
    legend = true;
    showLabels = true;
    animations = true;
    xAxis = true;
    yAxis = true;
    showYAxisLabel = true;
    showXAxisLabel = true;
    xAxisLabel = 'Timestamp';
    yAxisLabel = 'Difficulty';
    legendPosition = 'right';
    timeline = true;

    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    public Difficulties;
    public BlockHeights;
    public Txses;
    public Sizes;
    public DateTimestamps;
    public Timestamps;

    public lastBlock: any;
    public lastStats: any;
    public blockchainHeight = 0;
    public blockchainTransactions = 0;
    public initialBlocks: any;
    public txMemPoolTxs: any;

    public synctimer = 1;

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public hexToRGB(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        } else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }

    constructor(private exSer: ExplorerService,
                private func: Functions) {
        const self = this;

        setTimeout(() => {
            self.refresh();
        }, 1000);
        setInterval(() => {
            self.refresh();
        }, 30 * 1000);
    }

    refresh() {
        const self = this;
        self.getLiveStats();
        self.getLastBlock();
        self.getTxMemPool();
        self.getInitialBlocks();
    }

    onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    ngOnInit() {
        this.refresh();
    }

    ngAfterViewInit() {
    }

    getLiveStats() {
        this.exSer.getLiveStats().then((lastStats: any) => {
            this.lastStats = lastStats;
            this.blockchainHeight = lastStats.height;
        });
    }

    getLastBlock() {
        this.exSer.getLastBlock().then((lastBLock: any) => {
            this.lastBlock = lastBLock;
            this.blockchainHeight = lastBLock.height;
        });
    }

    getInitialBlocks() {
        const self = this;
        if (self.blockchainHeight > 0) {
            self.exSer.getHttpBlockListByHeight(this.blockchainHeight).then((blockList: any) => {
                self.initialBlocks = blockList;
                self.createBasicChartData();
            });
        }
    }

    getTxMemPool() {
        const self = this;
        self.exSer.getPoolTransactions().then((txMemPool: any) => {
            self.txMemPoolTxs = txMemPool;
        });
    }

    createBasicChartData() {
        const self = this;
        let block: any;
        const blocks: any = this.initialBlocks;
        const multi: any[] = [];
        const dSeries: any[] = [];
        const hSeries: any[] = [];
        const sSeries: any[] = [];
        for (block of blocks) {
            const date = new Date(block['timestamp'] * 1000).toLocaleString();

            dSeries.push(
                {
                    'name': date,
                    'value': block['difficulty']
                }
            );
            hSeries.push(
                {
                    'name': date,
                    'value': block['height']
                }
            );
            sSeries.push(
                {
                    'name': date,
                    'value': block['cumul_size']
                }
            );
        }

        multi.push(
            {
                'name': 'Difficulty',
                'series': dSeries.reverse()
            },
            {
                'name': 'Height',
                'series': hSeries.reverse()
            },
            {
                'name': 'Size',
                'series': sSeries.reverse()
            }
        );

        self.multi = multi;
        console.log(self.multi);
    }
}
