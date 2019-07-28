import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimestampService } from '../service/timestampService';
import { PopoverController, AlertController } from '@ionic/angular';
import { ColorPickerPage } from '../module/color-picker/color-picker.page';
import { ColorService } from '../service/colorService';
import { Storage } from '@ionic/storage';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(ts, cs, // Notice only used in html would prompt 'declared but never read'
    pop, alertController, storageDB) {
        var _this = this;
        this.ts = ts;
        this.cs = cs;
        this.pop = pop;
        this.alertController = alertController;
        this.storageDB = storageDB;
        // Fake data
        this.storage = {
            setting: [],
            defaultSetting: [],
            record: [],
        };
        // label last
        this.labelLast = '';
        // color last
        this.colorLast = '';
        // Edit label flag
        this.labelEditingFlg = 0;
        // Edit range flag
        this.recordRngEditingFlg = 0;
        // Flash css flag
        this.flashCssFlg = 0;
        // display id and timestamp list
        this.displayList = [];
        // setting label list
        this.labelList = [];
        // date scale list
        this.rangeDateList = Array.from(Array(31).keys()).reverse();
        // date offset days
        this.rangeDateOffset = 30;
        // date offset used
        this.rangeDateOffsetUsed = 0;
        // time setted by date picker
        this.timeDayStart = this.ts.getTimestampToday() - this.rangeDateOffsetUsed * 86400;
        // range length
        this.lengthRngStandard = 600;
        // range start proportion
        this.propRngStart = 0;
        // range end proportion
        this.propRngEnd = (this.ts.getTimestampNow() - this.ts.getTimestampToday()) / 86400;
        // range cursor proportion
        this.propRngCursor = (this.ts.getTimestampNow() - this.ts.getTimestampToday()) / 86400;
        // range cursor height value
        this.lengthTimeSetPosition = this.propRngCursor * this.lengthRngStandard;
        // range cursor time set by value
        this.timeSet = this.ts.getTimestampNow();
        // Added label name
        this.labelAdded = '';
        // Added label color
        this.colorAdded = '';
        // length of padding offset of div
        this.lengthRngPaddingA = this.lengthRngStandard / 48;
        // length of padding offset of input range
        this.lengthRngPaddingB = this.lengthRngStandard / 96;
        // length full
        this.lengthRngFull = this.lengthRngStandard * 25 / 24;
        this.dbdefaultSetting = [{
                label: 'work',
                color: '#e45a33',
            }, {
                label: 'study',
                color: '#fde84e',
            }, {
                label: 'play',
                color: '#9ac53e',
            }, {
                label: 'others',
                color: '#4488ff',
            }, {
                label: 'sleep',
                color: '#06394a',
            }, {
                label: 'none',
                color: '#808080',
            }];
        this.dbrecord = [{
                id: 0,
                timestamp: 0,
                label: 'none',
                color: '#808080',
            }, {
                id: 1,
                timestamp: this.ts.getTimestampToday() - 32000,
                label: 'others',
                color: '#4488ff',
            }, {
                id: 2,
                timestamp: this.ts.getTimestampToday() - 16000,
                label: 'work',
                color: '#e45a33',
            }, {
                id: 3,
                timestamp: this.ts.getTimestampToday() - 8000,
                label: 'study',
                color: '#fde84e',
            }, {
                id: 4,
                timestamp: this.ts.getTimestampToday() - 4000,
                label: 'play',
                color: '#9ac53e',
            }, {
                id: 5,
                timestamp: this.ts.getTimestampToday() + 1000,
                label: 'others',
                color: '#4488ff',
            }, {
                id: 6,
                timestamp: this.ts.getTimestampToday() + 4000,
                label: 'sleep',
                color: '#06394a',
            }];
        // Refresh every second
        setInterval(function () {
            // Synchronize the cursor in range if not in editing
            if (!_this.recordRngEditingFlg) {
                _this.lengthTimeSetPosition = _this.propRngEnd * _this.lengthRngStandard;
                _this.timeSet = _this.ts.getTimestampNow();
            }
            // Show title local time in seconds
            _this.ts.showTimeInSeconds('timeNow');
            // Show drag range time in seconds
            _this.ts.showTimeInSeconds('timeDrag', _this.timeSet);
            // Range start and end proportion
            _this.storageDB.get('record').then(function (r) {
                _this.propRngStart = r[r.length - 1].timestamp - _this.ts.getTimestampToday() > 0 ?
                    r[r.length - 1].timestamp - _this.ts.getTimestampToday() / 86400 : 0;
            });
            _this.propRngEnd = (_this.ts.getTimestampNow() - _this.ts.getTimestampToday()) / 86400;
            // Flash the border display css flag
            _this.flashCssFlg = _this.flashCssFlg ? 0 : 1;
        }, 1000);
        // Refresh every minute
        setInterval(function () {
            // Show record display
            _this.calculateEachDayDisplay(_this.ts.getTimestampToday());
        }, 60000);
    }
    // tslint:disable-next-line: use-life-cycle-interface
    Tab1Page.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Init label default setting
                    return [4 /*yield*/, this.storageDB.set('defaultSetting', this.dbdefaultSetting)];
                    case 1:
                        // Init label default setting
                        _a.sent();
                        // TEST db record data
                        return [4 /*yield*/, this.storageDB.set('record', this.dbrecord)];
                    case 2:
                        // TEST db record data
                        _a.sent();
                        // TEST db setting
                        return [4 /*yield*/, this.storageDB.set('setting', this.dbdefaultSetting)];
                    case 3:
                        // TEST db setting
                        _a.sent();
                        this.labelList = this.dbdefaultSetting;
                        return [4 /*yield*/, this.storageDB.get('record').then(function (r) {
                                _this.labelLast = r[r.length - 1].label;
                                _this.colorLast = r[r.length - 1].color;
                            })];
                    case 4:
                        _a.sent();
                        console.log('Start up');
                        // Refresh today display
                        this.calculateEachDayDisplay(this.ts.getTimestampToday());
                        // Response the range changing
                        document.getElementById('rangeTime').addEventListener('input', function () {
                            // Get the setted time from record edit input
                            _this.timeSet = _this.ts.getTimestampToday() + Math.floor(_this.lengthTimeSetPosition / _this.lengthRngStandard * 86400);
                            _this.recordRngEditingFlg = _this.timeSet !== _this.ts.getTimestampNow() ? 1 : 0;
                            // Show drag range time in seconds
                            _this.ts.showTimeInSeconds('timeDrag', _this.timeSet);
                        });
                        document.getElementById('rangeDate').addEventListener('input', function () {
                            _this.rangeDateOffsetUsed = 30 - _this.rangeDateOffset;
                            _this.timeDayStart = _this.ts.getTimestampToday() - _this.rangeDateOffsetUsed * 86400;
                            // Refresh date setted display
                            _this.calculateEachDayDisplay(_this.timeDayStart);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // Add record
    Tab1Page.prototype.onLabelClick = function (labelSelected) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If same with current label, alert, do noting
                        if (this.labelLast === labelSelected) {
                            this.pushAlert('currentEventTheSame');
                            return [2 /*return*/];
                        }
                        // If multiple labels at the same time, alert, do nothing
                        return [4 /*yield*/, this.storageDB.get('record').then(function (r) {
                                if (_this.timeSet === r[r.length - 1].timestamp) {
                                    _this.pushAlert('multiLabelsOneTime');
                                    return;
                                }
                            })];
                    case 1:
                        // If multiple labels at the same time, alert, do nothing
                        _a.sent();
                        // Add
                        // At least one item of record existence promised
                        // Record id well sorted and continuous promised
                        return [4 /*yield*/, this.storageDB.get('setting').then(function (r) { return _this.labelList = r; })];
                    case 2:
                        // Add
                        // At least one item of record existence promised
                        // Record id well sorted and continuous promised
                        _a.sent();
                        return [4 /*yield*/, this.storageDB.get('record').then(function (r) {
                                _this.storageDB.set('record', r.push({
                                    id: r.length,
                                    timestamp: _this.recordRngEditingFlg ? _this.timeSet : _this.ts.getTimestampNow(),
                                    label: labelSelected,
                                    color: _this.labelList.filter(function (obj) { return obj.label === labelSelected; })[0].color,
                                }));
                                // Record label and color last (added)
                                _this.labelLast = r[r.length - 1].label;
                                _this.colorLast = r[r.length - 1].color;
                            })];
                    case 3:
                        _a.sent();
                        // Refresh today display
                        this.calculateEachDayDisplay(this.ts.getTimestampToday());
                        return [2 /*return*/];
                }
            });
        });
    };
    // Remove record
    Tab1Page.prototype.onLabelRevert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Remove
                    return [4 /*yield*/, this.storageDB.get('record').then(function (r) {
                            // Save the default
                            var record;
                            record = r.length === 1 ? [{
                                    id: 0,
                                    timestamp: 0,
                                    label: 'default',
                                    color: '#05d59e',
                                }] : r.pop();
                            _this.storageDB.set('record', record);
                            // Record label and color last (added)
                            _this.labelLast = r[r.length - 1].label;
                            _this.colorLast = r[r.length - 1].color;
                        })];
                    case 1:
                        // Remove
                        _a.sent();
                        // Refresh today display
                        this.calculateEachDayDisplay(this.ts.getTimestampToday());
                        return [2 /*return*/];
                }
            });
        });
    };
    // Add label
    // Setting may be empty
    // Uniqueness ensured
    Tab1Page.prototype.onLabelAdd = function (event, label) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storageDB.get('setting').then(function (r) { return _this.labelList = r; })];
                    case 1:
                        _a.sent();
                        // Set the label added
                        this.labelAdded = label;
                        // If the label name inputed is empty, alert, do nothing.
                        if (!this.labelAdded) {
                            this.pushAlert('inputLabelNull');
                            // TODO give focus to input
                            return [2 /*return*/];
                            // If The label name inputed exist, alert, do nothing.
                        }
                        else if (this.labelList.some(function (obj) { return obj.label === _this.labelAdded; })) { // if setting is empty, there is no error.
                            this.pushAlert('inputLabelExist');
                            // TODO give focus to input
                            return [2 /*return*/];
                        }
                        // Show the color picker template and set the color selected.
                        return [4 /*yield*/, this.colorPicking(event, this.labelList)];
                    case 2:
                        // Show the color picker template and set the color selected.
                        _a.sent();
                        // If the select color is empty, do nothing and let the user to push the button and pick again.
                        if (!this.colorAdded) {
                            return [2 /*return*/];
                            // If The color selected exist, alert, do nothing.
                        }
                        else if (this.labelList.some(function (obj) { return obj.color === _this.colorAdded; })) {
                            this.pushAlert('selectColorExist');
                            this.colorAdded = '';
                            return [2 /*return*/];
                        }
                        this.labelList.push({
                            label: this.labelAdded,
                            color: this.colorAdded,
                        });
                        return [4 /*yield*/, this.storageDB.set('setting', this.labelList)];
                    case 3:
                        _a.sent();
                        this.labelAdded = '';
                        this.colorAdded = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    // Select color from module
    Tab1Page.prototype.colorPicking = function (event, settingData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var colorComponent;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pop.create({
                            // component
                            component: ColorPickerPage,
                            // event
                            event: event,
                            // props
                            componentProps: {
                                setting: settingData,
                            }
                        })];
                    case 1:
                        colorComponent = _a.sent();
                        // show the component
                        colorComponent.present();
                        // Define the dismiss event, catch the return data
                        return [4 /*yield*/, colorComponent.onDidDismiss()
                                .then(function (data) {
                                // Color selected
                                _this.colorAdded = data.data;
                            })];
                    case 2:
                        // Define the dismiss event, catch the return data
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Remove label
    Tab1Page.prototype.onLabelDelete = function (label) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storageDB.get('setting').then(function (r) {
                            _this.labelList = r.splice(r.indexOf(r.filter(function (obj) { return obj.label === label; })[0]), 1);
                            _this.storageDB.set('setting', _this.labelList);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Edit label
    Tab1Page.prototype.onLabelEdit = function () {
        this.labelEditingFlg = this.labelEditingFlg ? 0 : 1;
        this.labelAdded = '';
        this.colorAdded = '';
    };
    // Set label to default
    Tab1Page.prototype.onLabelDefault = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storageDB.get('defaultSetting').then(function (r) {
                            _this.labelList = r;
                            _this.storageDB.set('setting', r);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Make common component event processing code
    // For multiple days display
    // Have two situation, one is that past date display, another is today's display
    // Need to consider the border problem
    // Deal with each day
    Tab1Page.prototype.calculateEachDayDisplay = function (calDayTimestamp) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var timeNow, timeStopCal, timeDayStart, timeDayEnd, resultList, recordCal, recordHeadItemId_1, recordHeadItem_1, i, timeStart, timeEnd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeNow = this.ts.getTimestampNow();
                        timeDayStart = calDayTimestamp;
                        timeDayEnd = timeDayStart + 86400;
                        resultList = [];
                        return [4 /*yield*/, this.storageDB.get('record').then(function (r) {
                                recordCal = r.filter(function (obj) { return obj.timestamp >= timeDayStart && obj.timestamp < timeDayEnd; });
                            })];
                    case 1:
                        _a.sent();
                        if (!recordCal.some(function (obj) { return obj.timestamp !== timeDayStart; })) return [3 /*break*/, 3];
                        recordHeadItemId_1 = recordCal.reduce(function (prev, curr) { return prev.id < curr.id ? prev : curr; }).id;
                        return [4 /*yield*/, this.storageDB.get('record').then(function (r) {
                                recordHeadItem_1 = r.filter(function (obj) { return obj.id === recordHeadItemId_1 - 1; })[0];
                            })];
                    case 2:
                        _a.sent();
                        // Change the record timestamp to today start for calcualte
                        recordHeadItem_1.timestamp = timeDayStart;
                        // Add the record in the top of record list for calculate
                        recordCal.splice(0, 0, recordHeadItem_1);
                        _a.label = 3;
                    case 3:
                        // Deal with the bottom
                        timeStopCal = timeNow >= timeDayStart && timeNow < timeDayEnd ? timeNow : timeDayEnd;
                        // Calculate
                        for (i = 0; i < recordCal.length; i++) {
                            timeStart = recordCal[i].timestamp;
                            timeEnd = i === recordCal.length - 1 ? timeStopCal : recordCal[i + 1].timestamp;
                            resultList.push({
                                // TODO Attention result 0 posibility, check if affected in HTML
                                // Giving more precious calculate results than Math.floor
                                length: parseFloat(((timeEnd - timeStart) / 86400 * this.lengthRngStandard).toFixed(2)),
                                label: recordCal[i].label,
                                color: recordCal[i].color,
                                timestamp: timeDayStart,
                                id: recordCal[i].id,
                            });
                        }
                        // Give the display data list
                        this.displayList = resultList;
                        return [2 /*return*/];
                }
            });
        });
    };
    // Alert handler: presentAlertMultipleButtons
    Tab1Page.prototype.pushAlert = function (alertId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, alert_1, alert_2, alert_3, alert_4, alert_5;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = alertId;
                        switch (_a) {
                            case ('currentEventTheSame'): return [3 /*break*/, 1];
                            case ('multiLabelsOneTime'): return [3 /*break*/, 4];
                            case ('inputLabelNull'): return [3 /*break*/, 7];
                            case ('inputLabelExist'): return [3 /*break*/, 10];
                            case ('selectColorExist'): return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 16];
                    case 1: return [4 /*yield*/, this.alertController.create({
                            header: 'Ooouch, nothing performed',
                            subHeader: 'On click label button',
                            message: 'Current event is the same as button clicked when adding record. Try to choose another one.',
                            buttons: [{
                                    text: 'Confirm',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Alert confirmed: ' + alertId);
                                    }
                                }]
                        })];
                    case 2:
                        alert_1 = _b.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 4: return [4 /*yield*/, this.alertController.create({
                            header: 'Ooops, please notice',
                            subHeader: 'On click label button',
                            message: 'Multiple labels added at the same time (within one second). Only the first one would be recorded.',
                            buttons: [{
                                    text: 'Confirm',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Alert confirmed: ' + alertId);
                                    }
                                }]
                        })];
                    case 5:
                        alert_2 = _b.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 7: return [4 /*yield*/, this.alertController.create({
                            header: 'Ooouch, nothing performed',
                            subHeader: 'On click add button',
                            message: 'Label name inputed is empty. Please input it before adding.',
                            buttons: [{
                                    text: 'Confirm',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Alert confirmed: ' + alertId);
                                    }
                                }]
                        })];
                    case 8:
                        alert_3 = _b.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 10: return [4 /*yield*/, this.alertController.create({
                            header: 'Ooouch, nothing performed',
                            subHeader: 'On click add button',
                            message: 'The label name inputed exist. Please input another label name.',
                            buttons: [{
                                    text: 'Confirm',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Alert confirmed: ' + alertId);
                                    }
                                }]
                        })];
                    case 11:
                        alert_4 = _b.sent();
                        return [4 /*yield*/, alert_4.present()];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 13: return [4 /*yield*/, this.alertController.create({
                            header: 'Ooouch, nothing performed',
                            subHeader: 'On click add button',
                            message: 'The color selected exist. Please select another color.',
                            buttons: [{
                                    text: 'Confirm',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Alert confirmed: ' + alertId);
                                    }
                                }]
                        })];
                    case 14:
                        alert_5 = _b.sent();
                        return [4 /*yield*/, alert_5.present()];
                    case 15:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 16: return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TimestampService,
            ColorService,
            PopoverController,
            AlertController,
            Storage])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map