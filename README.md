# tvMazeApp

## Installation

- cd into root
- run `npm install`
- run `cd ios && pod install`

## Running

- running in Android `npm run android`
- running in iOS `npm run ios`

## Build App

There is already a build at /dist, you can also buiild the app yourself:

- cd into root
- run `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
- run `cd android && ./gradlew assembleDebug`

the you can find the generated APK in `android/app/build/outputs/apk/debug/app-debug.apk`


## NOTES: Proposal for [improving performance at displaying seasons](https://github.com/gbaldev/tvMazeApp/pull/2)
