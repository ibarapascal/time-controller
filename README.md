Build app from Ionic / Angular.

20190715 Environment setting, serve, build, sign.

Install:
npm: 6.4.1
Ionic: 5.2.2
Cordova: 9.0.0
Angualr: 7.2.2
Java SDK: 1.8.0_211
Android Studio: 3.4
SDK: default + Android 9.0

Command:
npm install -g ionic cordova
cd TimeController
ionic serve
ionic cordova build android --prod --release
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks {path}app-release-unsigned.apk my-alias
{path}zipalign -v 4 {path}app-release-unsigned.apk {path}HelloWorldFromKeikai.apk
{path}apksigner verify {path}HelloWorldFromKeikai.apk

Path before SDK tools and apk:
C:\WorkPlace\Github\WorkRep\TimeController\platforms\android\app\build\outputs\apk\release
C:\Users\JINGJIAWEI\AppData\Local\Android\Sdk\build-tools\29.0.1

Refer info:
https://ionicframework.com/docs/v3/intro/deploying/