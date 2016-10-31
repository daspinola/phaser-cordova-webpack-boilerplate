import {run, generate} from 'runjs';
const async = {
  async: true,
};
const cordovaFolder = {
  cwd: 'cordova', 
  async: true,
};

const task = {
  'start': () => {
    task['cordova:base']();
  },
  'server': () => {
    run('webpack-dev-server');
  },
  'cordova:base': () => {
    run('mkdir cordova', async);
    run('mkdir platforms', cordovaFolder);
    run('mkdir www', cordovaFolder);
    run('cp -a config.xml ./cordova');
    task['platform-android']();
  },
  'cordova:copy': () => {
    run('cp index.html ./cordova/www');
    run('cp base.css ./cordova/www');
    run('cp -a ./assets ./cordova/www');
    run('webpack -p');    
  },
  'platform-android': () => {
    run('cordova platform add android', cordovaFolder);
  }
};

export default task