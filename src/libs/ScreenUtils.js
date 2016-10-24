import globals from '../globals';

export default class ScreenUtils {

    static calculateScreenMetrics(defaultWidth, defaultHeight, maxGameWidth, maxGameHeight) {

        let windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

        // Calculate the game's max dimensions. The bounds are iPad and iPhone for now.
        if (typeof maxGameWidth === "undefined" || typeof maxGameHeight === "undefined") {
            maxGameWidth = Math.round(defaultWidth * 1420 / 1280);
            maxGameHeight = Math.round(defaultHeight * 960 / 800);
        }

        // Calculate aspect ratios
        let defaultAspect = globals.screen.width / globals.screen.height,
            windowAspect = windowWidth / windowHeight,
            offsetX = 0,
            offsetY = 0,
            gameWidth = 0,
            gameHeight = 0;

        if (windowAspect > defaultAspect) {
            gameHeight = defaultHeight;
            gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
            gameWidth = Math.min(gameWidth, maxGameWidth);
            offsetX = (gameWidth - defaultWidth) / 2;
            offsetY = 0;
        } else {
            gameWidth = defaultWidth;
            gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
            gameHeight = Math.min(gameHeight, maxGameHeight);
            offsetX = 0;
            offsetY = (gameHeight - defaultHeight) / 2;
        }

        // calculate scale
        const scaleX = windowWidth / gameWidth,
            scaleY = windowHeight / gameHeight;


        return {
            windowWidth: windowWidth,
            windowHeight: windowHeight,
            defaultGameWidth: defaultWidth,
            defaultGameHeight: defaultHeight,
            maxGameWidth: maxGameWidth,
            maxGameHeight: maxGameHeight,
            gameWidth: gameWidth,
            gameHeight: gameHeight,
            scaleX: scaleX,
            scaleY: scaleY,
            offsetX: offsetX,
            offsetY: offsetY
        }

    }
}
