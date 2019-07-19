import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {

  }

  // Added label name
  labelAdded = '';
  // Added label color
  colorAdded = '';
  // Edit label flag
  labelDelEnableFlg = 0;
  // display id and timestamp list
  displayList = [];
  // Fake data
  storage = {
    setting: [{
      label: 'work',
      color: '#FF0000',
    }, {
      label: 'study',
      color: 'blue',
    }, {
      label: 'others',
      color: 'gold',
    }, {
      label: 'game',
      color: 'green',
    }, {
      label: 'sleep',
      color: 'black',
    }],
    defaultSetting: [{
      label: 'work',
      color: '#FF0000',
    }, {
      label: 'study',
      color: 'blue',
    }, {
      label: 'others',
      color: 'gold',
    }, {
      label: 'game',
      color: 'green',
    }, {
      label: 'sleep',
      color: 'black',
    }],
    record: [{
      id: 0,
      timestamp: 0,
      label: '',
    }, {
      id: 1,
      timestamp: 1561000000,
      label: 'study',
    }, {
      id: 2,
      timestamp: 1562000000,
      label: 'work',
    }, {
      id: 3,
      timestamp: 1563000000,
      label: 'game',
    }, {
      id: 4,
      timestamp: 1563463000,
      label: 'others',
    }, {
      id: 5,
      timestamp: 1563480000,
      label: 'work',
    }],
    displayRecordIdList: [],
    editcache: [],
  };

  // TODO need correction
  // length
  lengthDisplayToday = 600;

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    // TODO get the data from storage
    // Refresh display
    this.calculateTheDisplayToday();
    console.log('Start up');
  }

  // Add record
  onLabelClick(labelSelected: string) {
    if (this.storage.record.length) {
      if (this.storage.record[this.storage.record.length - 1].label === labelSelected) {
        return;
      }
    }
    // Get the bigest id (assume sorted)
    const id: number = this.storage.record.length ?
      this.storage.record[this.storage.record.length - 1].id + 1 : 0;
    // Get timestamp in second
    const timestamp: number = this.getTimestampNow();
    // Add
    this.storage.record.push({id, timestamp, label: labelSelected});
    // Refresh display
    this.calculateTheDisplayToday();
  }

  // Remove record
  onLabelRevert() {
    // Remove
    this.storage.record.pop();
    // Save the default
    if (!this.storage.record.length) {
      this.storage.record.push({
        id: 0,
        timestamp: 0,
        label: 'default',
      });
    }
    // Refresh display
    this.calculateTheDisplayToday();
  }

  // Add label
  onLabelAdd(label: string, color: string) {
    this.storage.setting.push({label: label ? label : 'label', color: color ? color : '#000000'});
  }

  // Remove label
  onLabelDelete(label: string) {
    for (let i = 0; i < this.storage.setting.length; i++) {
      if (this.storage.setting[i].label === label) {
        this.storage.setting.splice(i, 1);
      }
    }
  }

  // Edit label
  onLabelEdit() {
    this.labelDelEnableFlg ? this.labelDelEnableFlg = 0 : this.labelDelEnableFlg = 1;
  }

  // Set label to default
  onLabelDefault() {
    // Pass object by reference
    // this.storage.setting = this.storage.defaultSetting;
    // Pass object by value
    this.storage.setting = Object.create(this.storage.defaultSetting);
  }

  getTimestampNow(): number {
    return Math.floor(Date.now() / 1000);
  }

  getTimestampToday(): number {
    const dateNowObj: Date = new Date();
    const month: string = (dateNowObj.getUTCMonth() + 1).toString(); // months from 1-12
    const day: string = dateNowObj.getUTCDate().toString();
    const year: string = dateNowObj.getUTCFullYear().toString();
    const dateTodayString: string = year + '-' + month + '-' + day;
    const dateTodayObj: Date = new Date(dateTodayString);
    return Math.floor(dateTodayObj.getTime() / 1000);
  }

  calculateDisplayLength(timeStart: number, timeEnd: number): number {
    return Math.floor((timeEnd - timeStart) / 86400 * this.lengthDisplayToday);
  }

  // Get the storage.record always have 1 left with id:0, timestamp:0, label:'default'
  calculateTheDisplayToday() {
    const timeNow: number = this.getTimestampNow();
    const timeTodayStart: number = this.getTimestampToday();
    const timeTodayEnd: number = timeTodayStart + 86400; // 60*60*24
    const resultList: {id: number, color: string, length: number }[] = [];
    const recordToday = this.storage.record.filter(obj => obj.timestamp >= timeTodayStart && obj.timestamp < timeTodayEnd);
    // Have record
    if (this.storage.record.length > 1) {
      // Have record today
      if (recordToday.length) {
        // The first block
        const minId: number = recordToday.reduce((prev, curr) => prev.id < curr.id ? prev : curr).id;
        resultList.push({
          id: minId - 1,
          color: this.storage.setting.filter(x => x.label === this.storage.record[minId - 1].label)[0].color,
          length: this.calculateDisplayLength(timeTodayStart, this.storage.record[minId].timestamp),
        });
        // The middle block(s)
        for (let i = 0; i < this.storage.record.length; i++) {
          if (recordToday.indexOf(this.storage.record[i]) !== -1) {
            // have more than one record today
            if (recordToday.length > 1 && i !== this.storage.record.length - 1 && i !== 0) {
              resultList.push({
                id: this.storage.record[i].id,
                color: this.storage.setting.filter(x => x.label === this.storage.record[this.storage.record[i].id].label)[0].color,
                length: this.calculateDisplayLength(this.storage.record[i].timestamp, this.storage.record[i + 1].timestamp),
              });
            }}
        }
        // The last block
        const maxId: number = recordToday.reduce((prev, curr) => prev.id > curr.id ? prev : curr).id;
        resultList.push({
          id: maxId,
          color: this.storage.setting.filter(x => x.label === this.storage.record[maxId].label)[0].color,
          length: this.calculateDisplayLength(this.storage.record[maxId].timestamp, timeNow),
        });
      // Have no record today
      } else {
        resultList.push({
          id: this.storage.record.length - 1,
          color: this.storage.setting.filter(x => x.label === this.storage.record[this.storage.record.length - 1].label)[0].color,
          length: this.calculateDisplayLength(timeTodayStart, timeNow),
        });
      }
    // Have no record
    } else {
      resultList.push({
        id: 0,
        color: this.storage.setting.filter(x => x.label === this.storage.record[0].label)[0].color,
        length: this.calculateDisplayLength(timeTodayStart, timeNow),
      });
    }
    console.log(resultList);
    this.displayList = resultList;
    return;
  }
}
