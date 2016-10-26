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
  'cordova:base': () => {
    run('mkdir cordova', async);
    run('mkdir platforms', cordovaFolder);
    run('mkdir www', cordovaFolder);
    run('cp -a config.xml ./cordova');
    run('cordova platform add android', cordovaFolder);  
  }
};

export default task