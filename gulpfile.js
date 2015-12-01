'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var plug = require('gulp-load-plugins')();
var plato = require('plato');
var glob = require('glob');
var merge = require('merge-stream');

var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;
var port = process.env.PORT || 7203;

var paths = {
  scripts: './app/**/*.js',
  styles: ['./app/**/*.css', './app/**/*.scss'],
  html: './app/**/*.html',
  serverLib: './lib/**/*.js',
  serverTests: './routes/**/*-tests.js',
  serverFiles: ['./server.js', './routes/**/*.js'],
  dataModels: './models/**/*.js',
  gulpfile: './gulpfile.js',
  tests: {
    tests: [
      './__tests__/frontend/**/*.spec.js',
      './__tests__/backend/**/*.spec.js'],
    frontend:'./__tests__/frontend/**/*.spec.js',
    backend: './__tests__/backend/**/*.spec.js'
  },
  "js": "./app/js/**/*.js"
};

gulp.task('watch', ['analyze'], function() {
  gulp.watch([paths.scripts, paths.tests.frontend, paths.tests.backend], ['test', 'build'])
});
/**
 * Lint the available gulp tasks
 */
gulp.task('help', plug.taskListing);

/**
 * Lint the code, create coverage report and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', function() {
  log('Analyzing source with JSHint, JSCS and Plato');

  var jshint = analyzejshint([].concat(paths.scripts));
  var jscs = analyzejscs([].concat(paths.scripts));

  startPlatoVisualizer();

  return merge(jshint, jscs);

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

gulp.task('test', ['mocha:backend', 'karma:test']);

gulp.task('watch:testing', function() {
  gulp.watch(paths.tests.tests, ['mocha:backend']);
});

gulp.task('watch:development', function() {
  var client = ['build'];
  gulp.watch(paths.scripts, client);
  gulp.watch(paths.html, client);
  gulp.watch(paths.styles, client);
});

var workingFiles = ['gulpfile.js', './lib/**/*.js', './routes/**/*.js', './app/**/*.js', './test/**/*.js', './models/**/*.js'];

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

// DIST
gulp.task('clean:dist', function (cb) {
  del.sync([
    'dist/css/**/*',
    'dist/templates/**/*',
    'dist/index.html',
    'dist/bundle.js',
    '!dist/img/**/*',
    '!dist/uploads/**/*'
    ]);
  cb();
});

gulp.task('copy:dist', ['clean:dist'], function() {
  var srcFiles = ['app/**/*.html', 'app/**/*.css', 'app/**/*.png'];
  return gulp.src(srcFiles)
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack:dist', ['copy:dist'], function(callback) {
  webpack({
    entry: __dirname + '/app/js/client.js',
    output: {
      path: 'dist/',
      file: 'bundle.min.js'
    }
  }, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    log('[webpack]', stats.toString({

    }));
    callback();
  });
});

gulp.task('uglify:dist', ['webpack:dist'], function() {
  return gulp.src('dist/bundle.js')
    .pipe(plug.uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['uglify:dist']);

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
