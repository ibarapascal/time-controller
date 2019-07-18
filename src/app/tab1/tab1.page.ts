import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // Added label name
  labelAdded = '';
  // Added label color
  colorAdded = '';
  // Edit label flag
  labelDelEnableFlg = 0;
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
      }],
      editcache: []
    };
  constructor() {

  }
  onInit() {

  }

  // Add record
  onLabelClick(labelSelected: string) {
    // Get the bigest id (assume sorted)
    const id: number = this.storage.record.length ?
      this.storage.record[this.storage.record.length - 1].id + 1 : 0;
    // Get timestamp in second
    const timestamp: number = Math.floor(Date.now() / 1000);
    this.storage.record.push({id, timestamp, label: labelSelected});
  }

  // Remove record
  onLabelRevert() {
    this.storage.record.pop();
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
}
