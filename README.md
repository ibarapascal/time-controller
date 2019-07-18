# Time Controller Application

Build app from Ionic / Angular / Bootstrap.

## Time line

### 20190715 Environment setting, serve, build, signature.

Install, serve and package

npm, Ionic, Cordova, Angualr, Android Studio, Android SDK

```shell
npm install -g ionic cordova
cd TimeController
ionic serve
ionic cordova build android --prod --release
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
C:\Program Files\Java\jdk1.8.0_211\bin\jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks C:\WorkPlace\Github\WorkRep\TimeController\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk my-alias
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1\zipalign -v 4 C:\WorkPlace\Github\WorkRep\TimeController\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk HelloWorldFromKeikai.apk
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1\apksigner verify HelloWorldFromKeikai.apk
```

Path before SDK tools and apk:
```shell
C:\WorkPlace\Github\WorkRep\TimeController\platforms\android\app\build\outputs\apk\release
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1
```
Reference info [Ionic document deploying](https://ionicframework.com/docs/v3/intro/deploying/)


### 20190718 Data structure, static html, bootstrap, basic process

[Import bootstrap to ionic 4 app](https://stackoverflow.com/questions/53063005/how-can-i-add-and-use-bootstrap-to-an-ionic-4-app)

[Color Picker](https://www.npmjs.com/package/ngx-color-picker)

### TODO

[Change the font color with background color changed](https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area)

[Drag and drop](https://material.angular.io/cdk/drag-drop/overview)
