import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CanvasJS from '../service/canvasjs.min';
import { TimestampService } from '../service/timestampService';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // record list
  recordList: Array<{
    timestamp: number,
    label: string,
    color: string,
  }> = [];
  // setting list
  settingList: Array<{
    label: string,
    color: string,
  }> = [];
  // render data list
  renderDataList: Array<{
    name: string,
    y: number,
    color: string,
  }> = [];
  // time zone offset in seconds
  timeoffset: number;
  // Select start time timestamp
  timeStart: number;
  // Select start date
  dateStart: string;
  // Select end time timestamp
  timeEnd: number;
  // Select end date
  dateEnd: string;
  // Today time timestamp
  timeToday: number;
  // Today date
  dateToday: string;
  // Animation of chart flag
  animationChartFlg: boolean;

  constructor(
    private ts: TimestampService,
    private storageDB: Storage,
  ) {}

  // tslint:disable-next-line: use-life-cycle-interface
  async ngOnInit() {
    // Get time zone offset
    this.timeoffset = new Date().getTimezoneOffset() * 60;
    // Get time today
    this.timeToday = this.ts.getTimestampToday();
    this.dateToday = this.ts.showTimeInYYYYMMDD(this.timeToday);
    // Init time range, notice only the first time loading
    this.timeStart = this.ts.getTimestampToday() - 86400 * 29;
    this.timeEnd = this.timeToday;
  }

  async ionViewWillEnter() {
    // Animation
    this.animationChartFlg = true;
    // Init the whole process
    await this.initDataAndRender();
  }

  async initDataAndRender() {
    // Get time zone offset
    this.timeoffset = new Date().getTimezoneOffset() * 60;
    // Get time today
    this.timeToday = this.ts.getTimestampToday();
    this.dateToday = this.ts.showTimeInYYYYMMDD(this.timeToday);
    // Get the data record from storage
    await this.storageDB.get('record').then(x => {
      const r = JSON.parse(x);
      this.recordList = r;
    }).catch(e => {console.error(e); });
    // Get the data setting from storage
    await this.storageDB.get('setting').then(x => {
      const r = JSON.parse(x);
      this.settingList = r;
    }).catch(e => {console.error(e); });
    // Calculate render data
    this.processData();
    // ngOnInit complete
    this.chartRender();
  }

  onDateChanged() {
    // Format YYYY-MM-DD
    this.dateStart = this.dateStart ? this.dateStart.slice(0, 10) : '';
    this.dateEnd = this.dateEnd ? this.dateEnd.slice(0, 10) : '';
    // Transfer YYYY-MM-DD to timestamp
    this.timeStart = this.dateStart
      ? Math.floor(Date.parse(this.dateStart) / 1000  + this.timeoffset)
      : this.ts.getTimestampToday() - 86400 * 29;
    this.timeEnd = this.dateEnd
      ? Math.floor(Date.parse(this.dateEnd) / 1000 + this.timeoffset)
      : this.ts.getTimestampToday();
    // Calculate render data
    this.processData();
    // ngOnInit complete
    this.chartRender();
  }

  onClickDefault() {
    // Notice that this would run this.onDateChanged() after
    this.dateStart = '';
    this.dateEnd = '';
    this.animationChartFlg = true;
  }

  chartRender() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: this.animationChartFlg,
      exportEnabled: false,
      title: {
        text: 'Statistic Chart'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: this.renderDataList,
      }]
    });
    chart.render();
    this.renderDataList = [];
    this.animationChartFlg = false;
  }

  processData() {
    // Select the calculate range
    const selectRecord = JSON.parse(JSON.stringify(
      this.recordList.filter(record => record.timestamp >= this.timeStart && record.timestamp <= this.timeEnd + 86400)));
    selectRecord.forEach((item: { timestamp: number; }, i: number) => {
      // Default label don't calculate
      if (i !== 0 && selectRecord[i - 1].label !== 'nothing' && selectRecord[i - 1].label !== 'Nothing') {
        // Calculat the timestamp delta value
        const timeDelta = item.timestamp - selectRecord[i - 1].timestamp;
        // If the record label doesn't exist in current setting, giving label 'others'
        const labelRending = this.settingList.some(x => x.label === selectRecord[i - 1].label)
          ? selectRecord[i - 1].label
          : 'others';
        // If the render list have current label, add the delta value, or push a new item
        this.renderDataList.some(y => y.name === labelRending)
          ? this.renderDataList.filter(z => z.name === labelRending)[0].y += timeDelta
          : this.renderDataList.push({
            name: labelRending,
            y: timeDelta,
            color: this.settingList.filter(setting => setting.label === labelRending)[0].color,
          });
      }
    });
  }

}
