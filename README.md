# Time Controller Application

Keywords: Angular, Ionic, Cordova, Android, Typescript, Bootstrap, Time, Management

[Try it online (stackblitz.com)](https://stackblitz.com/github/ibarapascal/time-controller)

[Try it on your phone (Android 9 apk)](https://github.com/ibarapascal/time-controller/blob/master/TimeController.apk)


## Current layout in 2019/08/02

![Current layout gif](https://raw.githubusercontent.com/ibarapascal/time-controller/master/record/devGif/SVID_20190802_221713_1.gif)


## Introduction

An application which can let you:

- Mark when you do what.

- Show record data with a vertical timeline chart.
  
- Edit the record easily.
  
- (TODO) Give full statistic data and chart.
  
- (TODO) Save and export the record data to remote storage.


## Dev record link

- [Environment, build, signature](#20190715)

- [Data structure, static Html, import bootstrap](#20190718)

- [Chart handling](#20190721)

- [Service: timestamp, Update/VersionUp: Angular & Ionic](#20190722)

- [Template adjust, chart scale](#20190724)

- [EventListener](#20190725)

- [setInterval: fontColor, input time drag](#20190726)

- [Module: ColorPicker](#20190727)

- [Controller: alert, input date drag](#20190728)

- [Storage](#20190729)

- [Multidays data processing](#20190730)

- [On device debug: devapp and chrome://inspect/](#20190731)

- [Bug fix](#20190801)

- [Export / import data via file](#20190805)

- [Statistic chart using canvas](#20190807)

- [TODO](#TODO)


## Timeline dev record details

### 20190715
### Environment setting, serve, build, signature

Install, serve and package

npm, Ionic, Cordova, Angular, Android Studio, Android SDK

```shell
npm install -g ionic cordova
cd time-controller
ionic serve
ionic cordova build android --prod --release
First time: keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
Move app-release-unsigned.apk to root path:
C:\'Program Files'\Java\jdk1.8.0_211\bin\jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk my-alias
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1\zipalign -v 4 app-release-unsigned.apk TimeController.apk
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1\apksigner verify TimeController.apk
```

Path before SDK tools and apk:
```shell
C:\WorkPlace\Github\WorkRep\time-controller\platforms\android\app\build\outputs\apk\release
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1
```
Reference info [Ionic document deploying](https://ionicframework.com/docs/v3/intro/deploying/)


### 20190718
### Data structure, static Html, bootstrap import

- [Import bootstrap to ionic 4 app](https://stackoverflow.com/questions/53063005/how-can-i-add-and-use-bootstrap-to-an-ionic-4-app)

- [Color Picker](https://www.npmjs.com/package/ngx-color-picker) => don't have a very well performance, handle it later

- Feature:
```javascript
Obj.some(obj => obj.label === label))
Obj.reduce((prev, curr) => prev.id < curr.id ? prev : curr).id;
```
### 20190721
### Calculate chart length, rewrite, border situation, bugfix

 - Bugfix:
```javascript
let xxx = list.filter(...)[index].someLabel,
let xxx = someValue // list would be changed -> pass value via reference, be cautious
```

### 20190722
### Scroll bar, clock time, Html adjust, Angular update

- Adjust the input color selection position.

- [Ionic scroll bar](https://ionicframework.com/docs/api/content)

- [Display a clock](https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock)

- [Drag and drop](https://material.angular.io/cdk/drag-drop/overview) => maybe not working in Ionic, handle it later

- Problems during version update of Angular 0.7.3->8.1.2 / Ionic 4->5

  [1.Module not found => restart VScode](https://stackoverflow.com/questions/38900357/no-exported-member-node-modules)

  [2.Could not find the implementation for builder @angular-devkit/build-angular](https://thecodebuzz.com/resolved-could-not-find-the-implementation-for-builder-angular-devkit-build-angularbrowser/)

  [3.Could not find the implementation for builder @ionic/angular-toolkit:cordova-build](https://github.com/ionic-team/ionic/issues/18431)

```shell
npm i @angular-devkit/build-angular @angular-devkit/architect@latest @angular-devkit/core@latest @angular-devkit/schematics@latest
```

### 20190724
### Bugfix, map scales, adjust template

- get UTC and local time.

```javascript
dateObj.getMonth() // Local
dateObj.getUTCMonth() // UTC
```

- Set loop timer in Ionic.

```javascript
setTimeout(() => {...}, 500); // NG
setInterval(() => {...}, 500); // OK
```

- PS drawing scales and arrange the template steps & hot keys
```shell
ctrl + J
ctrl + T
move
ctrl + shift + alt + T
```

### 20190725
### Input range, range display, variables rename, bug fix

- Some slider (input range) tools

  [1.Angular: ignite-ui-angular](https://www.infragistics.com/products/ignite-ui-angular/angular/components/slider.html)
  
  [2.Angular: mat-slider](https://material.angular.io/components/slider/overview)

- EventListener

```javascript
document.getElementById('rangeTime').addEventListener('change', () => { //console.log('valueChanged');
document.getElementById('rangeTime').addEventListener('input', () => { //console.log('valueChanging');
```

### 20190726
### Drag time display in real time, color trans, font color, color picker

- [Reference position div](https://disenowebakus.net/en/position-div-css)

- [Allow text to spill outside div](https://stackoverflow.com/questions/19302419/how-to-allow-text-to-spill-outside-div)

- [Timestamp to date](https://www.typescriptlang.org/docs/handbook/functions.html)

- [Color in definition](https://www.w3schools.com/html/html_colors.asp)

- [HEX->RGB RGB->HEX](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)

- [Font black or white changing with background-color](https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area)

- Some color picker tools
   
   [1.Angular: ngx-color-picker](https://www.npmjs.com/package/ngx-color-picker)
   
   [2.Angular: simple-angular-color-picker](https://github.com/speedfl/simple-angular-color-picker)

   [3.Ionic: RGB color picker](http://inmagik.github.io/ionic-color-picker/)

### 20190727
### Color picker page module, Adjust template, Placeholder Font Color

- [Ionic generate command](https://ionicframework.com/docs/cli/commands/generate)

- [Module nav sample](https://stackblitz.com/edit/ionic-4-color-list)

```javascript
@NgModule({
  entryComponents: [ColorPickerPage],
  imports: [ColorPickerPageModule],
  providers: [ColorPickerPage],
})
```
```javascript
// entryComponent
this.XXXXX = this.navParams.get('setting');
this.popCtrl.getTop().then(p => p.dismiss(YYYYY));
```
```javascript
// parentComponent
  async onColorPicking(event: Event) {
    const comp = await this.pop.create({
      component: ColorPickerPage,
      event,
      componentProps: {setting: XXXXX,}
    });
    comp.onDidDismiss().then((data) => {YYYYY = data.data});
    return await comp.present();
  }
```
- [Input placeholder color css](https://www.w3schools.com/cssref/sel_placeholder.asp)

```css
.phBlack::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}
```

### 20190728
### Alert controller, Adjust template, Date picker

- [Alert controller in Ionic](https://ionicframework.com/docs/api/alert)

```javascript
const alert = await this.alertController.create({
  header: 'Ooouch, nothing performed',
  subHeader: 'On click label button',
  message: 'Current event is the same as button clicked when adding record. Try to choose another one.',
  buttons: [{
    text: 'Confirm',
    role: 'cancel',
    cssClass: 'secondary',
    handler: () => {console.log('Alert'); }
  }]});
await alert.present();
```

- [Ionic: Date picker](https://ionicframework.com/docs/native/date-picker) <= seems [not working in cordova](https://stackoverflow.com/questions/45013041/ionic-native-date-picker-not-working-on-android)

- [Ionic: ion-datetime](https://ionicframework.com/docs/api/datetime)

  <= Solved: ion-datetime attribute (like min and max) must contain '0' in month and day. [Trans under Cordova](https://github.com/ionic-team/ionic/issues/15397)

  <= Issue: [Ignored attempt to cancel a touchstart event with cancelable=false](https://github.com/ionic-team/ionic/issues/15256).

  <= Issue: Pick only YYYY/MM/DD while return minutes etc not equals zero.

  <= Issue: Sync problem when chaning flag / press confirm button in calendar.

  => Decide to achieve the event natively.

### 20190729
### Ionic storage, Date picker, Bugfix

- Multi days data charts & record edit process.

- Local storage in the phone.

  [1.Ionic storage](https://ionicframework.com/docs/building/storage) <= Reference [example](https://ionicacademy.com/store-data-inside-ionic/)

  [2.Android storage overview](https://developer.android.com/guide/topics/data/data-storage#db)

### 20190730
### History data edit, Bugfix

- Delete object in object[] via object.attr

```javascript
  list.splice(list.indexOf(list.filter((obj: { timestamp: number; }) => obj.timestamp === x)[0]), 1);
```

- Sort object[] via object.attr

```javascript
  r.sort((prev: { timestamp: number; }, curr: { timestamp: number; }) => {
    return prev.timestamp - curr.timestamp;
  });
```

- Notice .pop(), .splice(), .filter() have returns, do not make such mistake

```javascript
  // filter out
  result = XXX.filter();
  // filter left
  XXX.filter();
  result = XXX;
```

### 20190731
### On device debug, Bug fix

#### Summary

```shell
ionic serve --devapp
ionic cordova run android --device -l --debug --verbose
```

```html
chrome://inspect/#devices
```

```javascript
IonicStorageModule.forRoot({name: '__mydb', driverOrder: ['websql', 'indexeddb', 'sqlite']})

await this.storageDB.ready().then(async () => {
      await this.dbInit();
    }).catch(e => {console.error(e); });
```

#### Details

- DONE: Local: Ionic serve

  Problem: Some bug only appear on device.

  Solution: On device debug.

- DONE: On device via devapp: [ionic serve --devapp](https://ionicframework.com/docs/appflow/devapp/)

  Step: Download app <Ionic devapp>, run in the same wifi, if facing a time_out problem, [turn off the firewall](https://forum.ionicframework.com/t/ionic-devapp-net-err-connection-timed-out-http-192-168-0-19-8100-devapp-true/114565/6)

  Problem: [Issus: Got no console log on device once error.](https://forum.ionicframework.com/t/devapp-on-ionic-4-issue-no-console-log/141723/31)

  Problem: Storage still not working on device using apk install, while under --devapp on device works well.

  Solution: Try to debug using USB drivers.

- DONE: On device via USB: [ionic cordova run android --device -l --debug --verbose](https://ionic.zone/debug/remote-debug-your-app#android)

  Step:

  1.[Install Android SDK tools: Google USB Driver, check the install position](https://developer.android.com/studio/run/device.html#setting-up)

  2.[Install OEM USB driver to device](https://developer.android.com/studio/run/oem-usb.html)

  3.On the device, open the Settings app, select Developer options, and then enable USB debugging. => [Huawei Step (WTF)](https://jingyan.baidu.com/article/a378c960e87118b3282830bc.html)

  4.For Huawei, turn the USB install need permission off, otherwise (WTF) => Failure [INSTALL_FAILED_ABORTED: User rejected permissions]

  5.Check if your device is ready => [chrome://inspect/](chrome://inspect/#devices).
  
  6.Click inspect under ionic to start debug.

  Result: Worked well.


- Bugfix: Ionic storage

  ? Issus: [Ionic storage not working on devices](https://forum.ionicframework.com/t/ionic-storage-not-working-in-real-devices/71642/3)

  ? Solution: [try JSON format manually](https://stackoverflow.com/questions/41316796/ionic-2-ionic-storage-not-working-on-android-device)

  ?Bingo Solution: [storage.ready().then(), IonicStorageModule.forRoot({name: '__mydb', driverOrder: ['indexeddb', 'sqlite', 'websql']})](https://www.npmjs.com/package/@ionic/storage)

  After having done debug on device.
  
  1.Creat keys in storage before using it! <= Error: Undefined

  2.Set the setInterval in ngOnInit rather than constructor. <= Error: Undefined

  3.Change the driverOrder from sqlite to websql. <= Could not open database <= more info in [this issus](https://forum.ionicframework.com/t/release-app-can-not-open-connection-to-db/90262)


### 20190801
### Bug fix

- Bug fix:

  OK 1.Local DB init fix.
	
  OK 2.Change date range and direct click label giving wrong position insert. And wrong label current.
	
  OK 3.Days with null record shows white.
	
  OK 4.Time range time display keep uncorrect position after date range return to today.  => match time now.

  OK 5.Template adjustment: scroll none, px offset, shining box border

- Delete useless comment

- Package

### 20190805
### Export / import data via file

- [Ionic 4 write file](https://stackoverflow.com/questions/51215920/writing-a-json-file-in-ionic/54531852#54531852)

```javascript
import { File } from '@ionic-native/file/ngx'; // OK
import { File } from '@ionic-native/file'; // NG
```

- [File location](https://github.com/apache/cordova-plugin-file)

### 20190807
### Statistic chart

- [Canvas chart in Angular](https://canvasjs.com/angular-charts/)

```javascript
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
```
- [Canvas import using canvas.min.js](https://stackoverflow.com/questions/51034968/canvas-js-issue-with-angular5)


### DOING

- Date select range

- Tab layout adjust

- Refresh with range change and page display


### TODO

- Feature:

  1.[Set focus to element by id in Angular / Ionic](https://stackoverflow.com/questions/46720611/how-to-use-angular4-to-set-focus-by-element-id)

  2.[Drag & drop unfunction](https://github.com/valor-software/ng2-dragula)

  3.Button outer border.

- Rewrite

  1.Global variables

  2.Component chart and range input

  3.Sass

- Release and deploy on Google Play




