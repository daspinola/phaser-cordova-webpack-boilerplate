import {run} from 'runjs';
const sync = {
  async: false,
};
const cordovaFolder = {
  cwd: 'cordova', 
  async: true,
};
const cordovaSync = {
  cwd: 'cordova', 
  async: false,
};

/**
 * Tasks that can be run via command line with 'run taskName'
 *  run start - Creates the base folders and android platform
 *  run server - Run local server to test the game in the browser
 *  run deploy - Builds and installs unsigned apk to a connected device or emulator 
 *  run deploy:prod - Creates a signed apk for android that can be uploaded to google store
 *  run keystore - Generates the keystore to sign the apk
 *  run apk:align - Checks the integrity of the apk
 *  run apk:sign - Uses the keystore to create a signed apk that can be uploaded to google store
 *  run build - Creates an unsigned apk that can be used to deploy
 *  run build:prod - Creates a signed apk that can be used to deploy to production
 *  run cordova:base - Creates the base folders and android platform
 *  run cordova:delete - Removes cordova folder
 *  run cordova:copy - Copies the game files to the cordova folder
 *  run platform:android - Makes cordova available for android build
 */
const task = {
  'start': () => {
    task['cordova:base']();
  },
  'server': () => {
    run('webpack-dev-server');
  },
  'deploy': () => {
    run('cordova run android', cordovaSync);
  },
  'deploy:prod': (apkName, alias, password) => {
    if (apkName && alias && password) {
      run(`rm -rf ./apk/${apkName}`);
      task['build:prod'](alias, password);
      task['apk:align'](apkName);
      task['apk:sign'](apkName);
    } else {
      run('echo Missing apk name, alias or password. Ex: run deploy:prod myAppName myAppAlias keystorePassword');
    }
  },
  'keystore': (appName) => {
    if (appName) {
      run('rm -rf keystore');
      run('mkdir keystore');
      run(`keytool -genkey -v -keystore ./keystore/release-key.jks -keyalg RSA -keysize 2040 -validity 100000 -alias ${appName}`, sync);
    } else {
      run('echo Please insert application name. Ex. run keystore myAppName');
    }
  },
  'apk:align': (apkName) => {
    if (apkName) {
      run(`rm -rf ./apk/${apkName}.apk`, sync);
      run(`$zipalign -v -p 4 ./cordova/platforms/android/build/outputs/apk/android-release-unsigned.apk ./apk/${apkName}.apk`, sync);
    } else {
      run('echo Please insert application name. Ex. run apk:align myAppName');
    }
  },
  'apk:sign': (apkName) => {
    if (apkName) {
      run(`$apksigner sign --ks ./keystore/release-key.jks ./apk/${apkName}.apk`);
    } else {
      run('echo Please insert application name. Ex. run apk:sign myAppName');
    }
  },
  'build': () => {
    task['start']();
    run('cordova build android', cordovaSync);
  },
  'build:deploy': () => {
    task['build']();
    task['deploy']();
  },
  'build:prod': (alias, password) => {
    if (alias && password) {
      task['start']();
      run(`cordova build android --release --keystore=../keystore/release-key.jks --storePassword=${password} --alias=${alias} --password=${password}`, cordovaSync);
    } else {
      run('echo Missing alias or password. Ex: run build:prod myAppAlias keystorePassword');
    }
  },
  'cordova:base': () => {
    task['cordova:delete']();
    run('mkdir cordova', sync);
    run('mkdir platforms', cordovaFolder);
    run('mkdir www', cordovaFolder);
    run('cp -a config.xml ./cordova');
    task['cordova:copy']();
    task['platform:android']();
  },
  'cordova:delete': () => {
    run('rm -rf ./cordova', sync);
  },
  'cordova:copy': () => {
    run('cp index.html ./cordova/www');
    run('cp -a ./assets ./cordova/www');
    run('webpack -p');    
  },
  'platform:android': () => {
    run('cordova platform add android', cordovaSync);
  }
};

export default task;
