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
  // Select start time timestamp
  timeStart: number;
  // Select end time timestamp // TODO Remember to add a day for [] selection
  timeEnd: number;

  constructor(
    private ts: TimestampService,
    private storageDB: Storage,
  ) {}

  // tslint:disable-next-line: use-life-cycle-interface
  async ngOnInit() {
    // TODO run every time page display from router
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
    console.log('Page 2 init.');
    // Init time range
    this.timeStart = 0;
    this.timeEnd = this.ts.getTimestampNow();
    // Calculate render data
    this.processData();
    // ngOnInit complete
    this.chartRender();
  }

  chartRender() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: 'Statistic chart'
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
  }

  processData() {
    // Select the calculate range
    const selectRecord = JSON.parse(JSON.stringify(
      this.recordList.filter(record => record.timestamp >= this.timeStart && record.timestamp <= this.timeEnd)));
    selectRecord.forEach((item: { timestamp: number; }, i: number) => {
      // Default label don't calculate
      if (i !== 0 && selectRecord[i - 1].label !== 'nothing') {
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
