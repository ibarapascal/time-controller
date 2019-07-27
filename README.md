# Time Controller Application

Build an app from Ionic / Angular / Bootstrap.

## Timeline

### 20190715 Environment setting, serve, build, signature.

Install, serve and package

npm, Ionic, Cordova, Angular, Android Studio, Android SDK

```shell
npm install -g ionic cordova
cd TimeController
ionic serve
ionic cordova build android --prod --release
First time: keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
Move app-release-unsigned.apk to root path:
C:\'Program Files'\Java\jdk1.8.0_211\bin\jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk my-alias
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1\zipalign -v 4 app-release-unsigned.apk HelloWorldFromKeikai.apk
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1\apksigner verify HelloWorldFromKeikai.apk
```

Path before SDK tools and apk:
```shell
C:\WorkPlace\Github\WorkRep\TimeController\platforms\android\app\build\outputs\apk\release
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1
```
Reference info [Ionic document deploying](https://ionicframework.com/docs/v3/intro/deploying/)


### 20190718 Data structure, static HTML, bootstrap, the basic process

- [Import bootstrap to ionic 4 app](https://stackoverflow.com/questions/53063005/how-can-i-add-and-use-bootstrap-to-an-ionic-4-app)

- [Color Picker](https://www.npmjs.com/package/ngx-color-picker) => don't have a very well performance, handle it later

- Feature:
```javascript
Obj.some(obj => obj.label === label))
Obj.reduce((prev, curr) => prev.id < curr.id ? prev : curr).id;
```
### 20190721 Calculate chart length, rewrite, border situation, bugfix

 - Bugfix:
```javascript
let xxx = list.filter(...)[index].someLabel,
let xxx = someValue // list would be changed -> pass value via reference, be cautious
```

### 20190722 Scroll bar, clock time, Html adjust, Angular update

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

### 20190724 Bugfix, map scales, adjust template

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

### 20190725 Input range, range display, variables rename, bug fix

- Some slider (input range) tools

  [1.Angular: ignite-ui-angular](https://www.infragistics.com/products/ignite-ui-angular/angular/components/slider.html)
  
  [2.Angular: mat-slider](https://material.angular.io/components/slider/overview)

- EventListener

```javascript
document.getElementById('rangeTime').addEventListener('change', () => { //console.log('valueChanged');
document.getElementById('rangeTime').addEventListener('input', () => { //console.log('valueChanging');
```

### 20190726 Drag time display in real time, color trans, font color, color picker

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

### 20190727 Color picker page module

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

### TODO

- Template adjustment (font color, position, transparency)

- Local storage in the phone.

  [1.Ionic storage](https://ionicframework.com/docs/building/storage)

  [2.Android storage overview](https://developer.android.com/guide/topics/data/data-storage#db)

- [Drag & drop unfunction](https://github.com/valor-software/ng2-dragula)

- Multi days data charts.

- Bugfix: 1s match when dragging to the bottom.

- Statistic data charts.



