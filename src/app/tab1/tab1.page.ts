import { Component } from '@angular/core';
import { TimestampService } from '../service/timestampService';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private ts: TimestampService
    ) {
      // Unfuntion in ionic/cordova
      setTimeout(() => {
        this.ts.showTimeInSeconds('timeNow');
      }, 1000);
  }

  // Variables only used in pages.
  // Added label name
  labelAdded = '';
  // Added label color
  colorAdded = '';

  // current selected label
  currentSelectedLabel = '';
  // length
  // TODO need correction
  lengthDisplayOneDay = 600;
  // Edit label flag
  labelEditable = 0;
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
      label: 'default',
      color: 'gray',
    }, {
      id: 1,
      timestamp: this.ts.getTimestampToday() - 11000,
      label: 'game',
      color: 'green',
    }, {
      id: 2,
      timestamp: this.ts.getTimestampToday() - 1000,
      label: 'work',
      color: '#FF0000',
    }, {
      id: 3,
      timestamp: this.ts.getTimestampToday() + 1000,
      label: 'study',
      color: 'blue',
    }, {
      id: 4,
      timestamp: this.ts.getTimestampToday() + 2000,
      label: 'others',
      color: 'gold',
    }, {
      id: 5,
      timestamp: this.ts.getTimestampToday() + 4000,
      label: 'game',
      color: 'green',
    }, {
      id: 6,
      timestamp: this.ts.getTimestampToday() + 8000,
      label: 'sleep',
      color: 'black',
    }],
    displayRecordIdList: [],
    editcache: [],
  };

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    // TODO get the data from storage
    console.log('Start up');
    // Refresh today display
    this.calculateEachDayDisplay(this.ts.getTimestampToday() - 86400);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.storage.setting, event.previousIndex, event.currentIndex);
  }

  // Add record
  // TODO to ensure that user must click once within two seconds, or only use the lastest input
  //    to keep the uniqueness of data recorded in timestamp
  //    used in other event (maybe)
  onLabelClick(labelSelected: string) {
    // Same with current label, do noting
    if (this.currentSelectedLabel === labelSelected) {
      // TODO alert: Current event is the same with button clicked.
      return;
    }
    // Add
    this.storage.record.push({
      // At least one item of record existence promised
      // Record id well sorted and continuous promised
      id: this.storage.record.length,
      timestamp: this.ts.getTimestampNow(),
      label: labelSelected,
      color: this.storage.setting.filter(obj => obj.label === labelSelected)[0].color,
    });
    // Record current label
    this.currentSelectedLabel = labelSelected;
    // Refresh today display
    this.calculateEachDayDisplay(this.ts.getTimestampToday());
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
        color: 'gray',
      });
    }
    // Revert current label
    this.currentSelectedLabel = this.storage.record[this.storage.record.length - 1].label;
    // Refresh today display
    this.calculateEachDayDisplay(this.ts.getTimestampToday());
  }

  // Add label
  // Setting may be empty
  // Uniqueness ensured
  onLabelAdd(label: string, color: string) {
    if (!label || !color) {
      // TODO may add default option.
      // TODO alert: Please input label name and select color.
    } else if (this.storage.setting.some(obj => obj.label === label)) { // if setting is empty, there is no error.
      // TODO alert: There are {{label}} existed, please select another label name.
    } else if (this.storage.setting.some(obj => obj.color === color)) {
      // TODO alert: There are {{color}} existed, please select another label name.
    } else {
      this.storage.setting.push({label, color});
    }
  }

  // Remove label
  // Only remove the existing label from displayed button
  // Remove the only one of selected
  onLabelDelete(label: string) {
    const itemDelete = this.storage.setting.filter(obj => obj.label === label)[0]; // Uniqueness premised
    const indexOfItemDelete = this.storage.setting.indexOf(itemDelete);
    this.storage.setting.splice(indexOfItemDelete, 1);
  }

  // Edit label
  onLabelEdit() {
    // Reset input label name
    this.labelAdded = '';
    // Reset input label color
    this.colorAdded = '';
    this.labelEditable ? this.labelEditable = 0 : this.labelEditable = 1;
  }

  // Set label to default
  onLabelDefault() {
    // Pass object by reference: NG
    // this.storage.setting = this.storage.defaultSetting;
    // Pass object by value: OK
    this.storage.setting = Object.create(this.storage.defaultSetting);
  }

  // Make common component event processing code
  // For multiple days display
  // Have two situation, one is that past date display, another is today's display
  // Need to consider the border problem
  // Deal with each day
  calculateEachDayDisplay(calDayTimestamp: number) {

    // Initialize
    const timeNow: number = this.ts.getTimestampNow();
    let timeStopCal: number;
    const timeDayStart: number = calDayTimestamp;
    const timeDayEnd: number = timeDayStart + 86400; // 60*60*24
    const resultList: {length: number, label: string, color: string, timestamp: number, localId: number, id: number}[] = [];
    // Get record data via timestamp in range of today [)
    const recordCal = Object.create(this.storage.record.filter(obj => obj.timestamp >= timeDayStart && obj.timestamp < timeDayEnd));

    // Deal with the top
    // The situation when one event start before the day calculating and last till that day
    // Noticed that we assume there would always be a default record item with timestamp 1970, so it would be added
    if (recordCal.some((obj: { timestamp: number; }) => obj.timestamp !== timeDayStart)) {
      // Find the minimum id
      const recordHeadItemId: number = recordCal.reduce(
        (prev: { id: number; }, curr: { id: number; }) => prev.id < curr.id ? prev : curr).id;
      // Find the record one before minimum via id
      // Assume the uniqueness of data recorded
      const recordHeadItem = Object.create(this.storage.record.filter(obj => obj.id === recordHeadItemId - 1)[0]);
      // Change the record timestamp to today start for calcualte
      recordHeadItem.timestamp = timeDayStart;
      // Add the record in the top of record list for calculate
      recordCal.splice(0, 0, recordHeadItem);
    }

    // Deal with the bottom
    timeStopCal = timeNow >= timeDayStart && timeNow < timeDayEnd ? timeNow : timeDayEnd;

    // Calculate
    for (let i = 0; i < recordCal.length; i++) {
      const timeStart: number = recordCal[i].timestamp;
      const timeEnd: number = i === recordCal.length - 1 ? timeStopCal : recordCal[i + 1].timestamp;
      resultList.push({
        // TODO Attention result 0 posibility, check if affected in HTML
        length: Math.floor((timeEnd - timeStart) / 86400 * this.lengthDisplayOneDay),
        label: recordCal[i].label,
        color: recordCal[i].color,
        timestamp: timeDayStart,
        localId: i,
        id: recordCal[i].id,
      });
    }

    // Give the display data list
    this.displayList = resultList;

    console.log(resultList);
  }

}
