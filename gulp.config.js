'use strict';
var GulpConfig = (function() {

  function gulpConfig() {
    this.source = './src/';
    this.sourceApp = this.source + 'app/';

    this.dest = './build/';

    this.allTypeScript = this.sourceApp + '/**/*.ts';

    this.typings = './tools/typings';
    this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
  }
  return gulpConfig;
})();

module.exports = GulpConfig;
