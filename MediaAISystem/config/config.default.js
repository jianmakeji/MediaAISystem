/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582789502241_6679';

  // add your middleware config here
  config.middleware = [];
  /*
  config.mongoose = {
    client: {
      url: 'mongodb://192.168.3.110/example',
      options: {
        server:{
          poolSize: 10,
        }
      },
      // mongoose global plugins, expected a function or an array of function and options
      //plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };*/

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  config.assets = {
    publicPath: '/public/',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
