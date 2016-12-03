# Phaser-cordova-webpack-boilerplate

Want to start coding games and don't know were to start?

Fret not! This boilerplate will get you ready to code and deploy games for android in 10 simple steps! 

**Let's get to it!**

# Development dependencies

1. Clone the boilerplate respository

    ``` git clone https://github.com/daspinola/phaser-cordova-webpack-boilerplate.git ```
2. Go to the cloned folder and run

    ``` npm install ```
3. For eslint install it globally with 

    ``` npm install -g eslint ```

**Note:** You can use the command ``` run server ``` to play the demo 

# Production dependencies
#### Should only be needed once

1. Install [android SDK](https://developer.android.com/studio/index.html)
2. Open the terminal and run

    ``` android sdk ```
3. Install android SDK Build-tools version **24.0.3** or superior
4. Install SDK Platform for API 19 (android 4.4.2) and higher versions
5. Add the following exports to your bash profile

    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$HOME/Library/Android/sdk/tools:$PATH
    export PATH=$HOME/Library/Android/sdk/platform-tools:$PATH

    export zipalign=$ANDROID_HOME/build-tools/24.0.3/zipalign
    export apksigner=$ANDROID_HOME/build-tools/24.0.3/apksigner
    ```
6. Change **widget id and application details** in the **config.xml** file
7. Create keystore so you can send the game for production with

    ``` run keystore projectName ```

**Important!** Do not forget the keystore password you set, you will need when building the apk for production!

# Workflow

- Add new assets in the **assets** folder and load them in the folder **src/states/preload**

- New game states are initialized in **src/game.js** and the state file is created in **src/states**

- Make files for each utility/action (or set of them) in the **src/libs**

- Test you game in the browser using the command line with

  ``` run server ```

  **Note** You can leave the server running and keep changing the game, just remember to reload the page when you want to test it out

- Want to see it on mobile device?
Make sure you have it set to debug and file transfer mode and in the terminal

  ``` run build:deploy ```

- While the game is opened in your mobile device you can inspect your game logs with [chrome inspect](chrome://inspect/#devices)

- Have the game ready and want to upload the apk to google play? 
You can find it in the **apk** folder after you do:
  
  ``` run deploy:prod ```

- See the plugins in the References section for the leaderboard and ads integration

# Plugins

This boilerplate comes with [google admob](https://www.google.com/admob/) and 
[google play services](https://github.com/alexandresgf/cordova-plugin-play-games-services) 
plugins for easier integration of those services

# Known limitations

1. [Chrome inspect](chrome://inspect/#devices) doesn't replicate the game on the browser
2. Google play services is not working on the browser it only runs on android emulator or device
3. When you deploy for production you must change the version of the apk manually in the config.xml

# Contributing

You found a bug?

Got an implementation to improve this boilerplate? 

Send a Pull Request!

# References and acknowledgments
[alexandresgf](https://github.com/alexandresgf) and 
[artberri](https://github.com/artberri)
for the google play services cordova plugin

[floatinghotpot](https://github.com/floatinghotpot/cordova-admob-pro) for the admob plugin

[lean](https://github.com/lean) wit the awesome phaser boilerplate

[Phaser.io](https://github.com/photonstorm/phaser) the game framework

[Pull and push](https://play.google.com/store/apps/details?id=com.bimyou.pushandpull&hl=en) our game created with this boilerplate

# Most importantly!

We want you to spend less time in the boilerplate and more time creating but most of all have fun and let us know of any game you make using this boilerplate 
[@daspinola](https://twitter.com/daspinola) and [@hexedster](https://twitter.com/hexedster)

# License

[MIT Licence](./LICENSE)