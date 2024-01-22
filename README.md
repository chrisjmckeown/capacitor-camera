# Setup

- `npm run build` to create out folder
- install capactitor `npm install -D @capacitor/cli`
- run `npx cap init`
- in the `capacitor.config.ts` change `webDir: 'public',` to `webDir: 'out',`
- install `npm install @capacitor/core @capacitor/ios @capacitor/android`
- run `npx cap add ios` to create a native ios project
- run `npx cap add android` to create a native android project
- open the ios project `npx cap open android`, just opens a windows folder on a Windows PC.
- open the android project `npx cap open android`, opens Android studio. Can take some time to build.

- add `local.properties` to `android\local.properties`
- To set java version `Ctrl + Alt + S` then, go to "Build, Execution, Deployment > Build Tools > Gradle

## Start

- git pull
- npm install
- npm run dev
- npx cap open android

## Live reload / hot reload

wsl check ip address: `ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`
to the `capacitor.config.ts` file add

```
  server: {
    url: 'http://172.22.112.1:3000',
    ...
  }
```

run `npx cap sync` to update changes made to the capacitor.config file

# capacitor/camera

install `npm i @capacitor/camera`

## Android

    <queries>
        <!-- Camera -->
        <intent>
            <action android:name="android.media.action.IMAGE_CAPTURE" />
        </intent>

        <!-- Gallery -->
        <intent>
            <action android:name="android.intent.action.GET_CONTENT" />
        </intent>
    </queries>

add below to android\app\src\main\AndroidManifest.xml > permissions section

```
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## IOS

add below to ios\App\App\Info.plist > near the end of the file

```
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) uses the camera to take photos</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>$(PRODUCT_NAME) uses the photo library to select photos</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>$(PRODUCT_NAME) uses the photo library to save photos</string>
```
