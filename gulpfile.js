'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var plug = require('gulp-load-plugins')();
var config = require('./gulp.config');

var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;
var port = process.env.PORT || 7203;

var paths = {
  "scripts": "./app/**/*.js",
  "styles": ["./app/**/*.css", "./app/**/*.scss"],
  "serverLib": "./lib/**/*.js",
  "serverTests": "./routes/**/*-tests.js",
  "serverFiles": ["./server.js", "./routes/**/*.js"],
  "dataModels": "./models/**/*.js",
  "gulpfile": "./gulpfile.js",
  "client": "./app/js/client",
  "tests": {
    "frontend": "./app/js/**/*.spec.js",
    // Need to change this back to catch all server tests
    "backend": "./server/**/attempt.routes.spec.js"
  },
  "js": {
    "client": "./app/js/**/*.js",
    "server": ["server/**/*.js", "!server/**/*.spec.js"]
  },
  "ts": {
    "frontend": "app/**/*.ts",
    "backend": "server/**/*.ts",
    "all": "./**/*.ts"
  },
  "html": "app/**/*.html",
  "css": "app/**/*.css",
  "cssOutput": "app/css/",
  "sass": "app/stylesheets/**/*.scss"
};

gulp.task('watch', function() {
  gulp.watch(paths.ts.frontend, ['ts-lint:frontend', 'compile-ts:frontend']);
  // gulp.watch(paths.ts.backend, ['ts-lint:backend', 'compile-ts:backend']);
  gulp.watch([paths.js.client, paths.js.server, paths.html, paths.css], ['build']);
  gulp.watch(paths.tests.backend, ['mocha:backend']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('scripts', function() {
  var merge = require('merge-stream');
  var tsResult = gulp.src('./app/**/*.ts')
    .pipe(plug.typescript({
      declarationFiles: true,
      noExternalResolve:true,
      noImplicitAny: true,
      removeComments: true
    }));
    return merge([
      tsResult.dts.pipe(gulp.dest('testing/definitions')),
      tsResult.js.pipe(gulp.dest('testing/js'))
    ]);
});

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);

/**
 * Lint the code, create coverage report and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', function() {

  var merge = require('merge-stream');
  log('Analyzing source with JSHint, JSCS and Plato');

  var jshint = analyzejshint([].concat(paths.scripts));
  var jscs = analyzejscs([].concat(paths.scripts));

  startPlatoVisualizer();

  return merge(jshint, jscs);

});



// TypeScript
gulp.task('ts-lint:backend', function() {
  return gulp.src(paths.ts.backend)
    .pipe(plug.tslint())
    .pipe(plug.tslint.report('spec'));
});

gulp.task('compile-ts:backend', function() {
  gulp.src(paths.ts.backend)
    .pipe(plug.tsc())
    .pipe(gulp.dest('.'))
});

gulp.task('ts-lint:frontend', function() {
  return gulp.src(paths.ts.frontend)
    .pipe(plug.tslint())
    .pipe(plug.tslint.report('spec'));
});

gulp.task('compile-ts:frontend', function() {
  gulp.src(paths.ts.frontend)
    .pipe(plug.typescript({
      noImplicitAny:false,
      outDir: './ts/',
      removeComments: true
    }))
    .pipe(gulp.dest('./app/'))
});



// Testing
gulp.task('webpack:karma_test', function(callback) {
  webpack({
    entry: __dirname + '/__tests__/frontend/test_entry.js',
    output: {
      path: '__tests__/frontend/',
      file: 'bundle.js'
    }
  }, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    callback();
  });
});

gulp.task('karma:test', ['webpack:karma_test'], function() {
  return gulp.src('./__tests__/frontend/bundle.js')
    .pipe(plug.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});
gulp.task('mocha:backend', function() {
  return gulp.src(paths.tests.backend, {read: false})
    .pipe(plug.mocha({reporter: 'spec', growl: true}));
});

gulp.task('test', ['mocha:backend']);



// Build
gulp.task('clean:build', function (cb) {
  del.sync([
    'build/css/**/*',
    'build/templates/**/*',
    'build/index.html',
    'build/bundle.min.js',
    '!build/img/**/*',
    '!build/uploads/**/*'
    ]);
  cb();
});

gulp.task('copy:build', ['clean:build'], function() {
  var srcFiles = ['app/**/*.html', 'app/**/*.css', 'app/**/*.png', 'app/browserconfig.xml', 'app/safari-pinned-tab.svg', 'app/manifest.json', 'app/favicon.ico'];
  return gulp.src(srcFiles)
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:build', ['copy:build'], function(callback) {
  webpack({
    entry: __dirname + '/app/js/client.js',
    output: {
      path: 'build/',
      file: 'bundle.min.js'
    }
  }, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    log('[webpack]', stats.toString({

    }));
    callback();
  });
});

gulp.task('uglify:build', ['webpack:build'], function() {
  return gulp.src('build/bundle.min.js')
    .pipe(plug.uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:build']);

// SASS
gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(plug.sass().on('error', plug.sass.logError))
    .pipe(plug.concat('app.css'))
    .pipe(gulp.dest(paths.cssOutput));
});

// Private Functions
function analyzejshint(sources, overrideRcFile) {
  var jshintrcFile = overrideRcFile || './.jshintrc';
  log('Running JSHint');
  log(sources);
  return gulp
    .src(sources)
    .pipe(plug.jshint(jshintrcFile))
    .pipe(plug.jshint.reporter('jshint-stylish'));
}

function analyzejscs(sources) {
  log('Running JSCS');
  return gulp
    .src(sources)
    .pipe(plug.jscs('./.jscsrc'));
}

function startPlatoVisualizer() {
  var plato = require('plato');
  var glob = require('glob');

  log('Running Plato');
  var files = glob.sync('./app/js/**/*.js');

  var options = {
    title: 'Plato Inspections Report'
  };
  var outputDir = './report/plato';
  plato.inspect(files, outputDir, options, platoCompleted);

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    log(overview.summary);
  }
}

