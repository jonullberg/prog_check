'use strict';

var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var webpack = require('webpack');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var copy = require('gulp-copy');
var karma = require('gulp-karma');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');

var paths = {
  scripts: './app/**/*.js',
  styles: ['./app/**/*.css', './app/**/*.scss'],
  html: './app/**/*.html',
  serverLib: './lib/**/*.js',
  serverTests: './routes/**/*-tests.js',
  serverFiles: ['./server.js', './routes/**/*.js'],
  dataModels: './models/**/*.js',
  gulpfile: './gulpfile.js'
};

// Testing
gulp.task('webpack:karma_test', ['clean:karma'], function(callback) {
  webpack({
    entry: __dirname + '/test/karma_tests/test_entry.js',
    output: {
      path: 'test/karma_tests/',
      file: 'bundle.js'
    }
  }, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({

    }));
    callback();
  });
});
gulp.task('karma:test', ['webpack:karma_test'], function() {
  return gulp.src('./test/karma_tests/bundle.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    });
});
gulp.task('mocha:backend', function() {
  return gulp.src(paths.serverTests, {read: false})
    .pipe(mocha({reporter: 'spec'}));
});
gulp.task('lint', function() {
  return gulp.src(workingFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});
gulp.task('jscs', function() {
  return gulp.src(workingFiles)
    .pipe(jscs());
});
gulp.task('karmatest', ['karma:test']);

gulp.task('test', ['lint', 'jscs', 'mocha:backend', 'karma:test']);


gulp.task('watch', function() {
  var client = ['build'];
  gulp.watch(paths.scripts, client);
  gulp.watch(paths.html, client);
  gulp.watch(paths.styles, client);
});

var workingFiles = ['gulpfile.js', './lib/**/*.js', './routes/**/*.js', './app/**/*.js', './test/**/*.js', './models/**/*.js'];


gulp.task('clean:karma', function(cb) {
  del.sync([
    'test/karma_tests/build.js'
    ]);
  cb();
});

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
  var srcFiles = ['app/**/*.html', 'app/**/*.css', 'app/**/*.png'];
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
    gutil.log('[webpack]', stats.toString({

    }));
    callback();
  });
});

gulp.task('uglify:build', ['webpack:build'], function() {
  return gulp.src('build/bundle.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});
gulp.task('build', ['uglify:build']);

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
    gutil.log('[webpack]', stats.toString({

    }));
    callback();
  });
});

gulp.task('uglify:dist', ['webpack:dist'], function() {
  return gulp.src('dist/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['uglify:dist']);
