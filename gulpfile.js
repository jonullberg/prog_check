'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var plug = require('gulp-load-plugins')();
var plato = require('plato');
var glob = require('glob');
var merge = require('merge-stream');
var config = require('./gulp.config.json');

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
  allTypeScript: './**/*.ts'
};

gulp.task('watch', function() {
  gulp.watch([config.ts.frontend, config.ts.backend], ['ts-lint']);
  gulp.watch([config.js.client, config.js.server, config.html, config.css], ['build']);
  gulp.watch(config.tests.backend, ['analyze', 'mocha:backend']);
  gulp.watch(config.sass, ['sass', 'sass-concat'])
});

// gulp.task('watch:testing', function() {
//   gulp.watch(paths.tests.tests, ['mocha:backend']);
// });

// gulp.task('watch:development', function() {
//   var client = ['build'];
//   gulp.watch(paths.clientJs, client);
//   gulp.watch(paths.html, client);
//   gulp.watch(paths.styles, client);
// });

gulp.task('scripts', function() {
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
  log('Analyzing source with JSHint, JSCS and Plato');

  var jshint = analyzejshint([].concat(paths.scripts));
  var jscs = analyzejscs([].concat(paths.scripts));

  startPlatoVisualizer();

  return merge(jshint, jscs);

});

// TypeScript
gulp.task('ts-lint', function() {
  return gulp.src(paths.allTypeScript).pipe(plug.tslint()).pipe(plug.tslint.report('spec'));
});

gulp.task('compile-ts', function() {
  var sourceTsFiles = [paths.allTypeScript];
  var tsResult = gulp.src(sourceTsFiles)
    .pipe(plug.sourcemaps.init())
    .pipe(plug.tsc(tsProject));
    tsResult.dts.pipe(gulp.dest(paths.tsOutputPath));
    return tsResult.js
      .pipe(plug.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.tsOutputPath));
})

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
