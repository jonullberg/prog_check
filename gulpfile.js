'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var copy = require('gulp-copy');
var clean = require('gulp-clean');

var workingFiles = ['gulpfile.js', './lib/**/*.js', './routes/**/*.js', './app/**/*.js', './test/**/*.js', './models/**/*.js'];

gulp.task('webpack:client', function(callback) {
  webpack({
    entry: __dirname + '/app/js/client.js',
    output: {
      path: 'build/',
      file: 'bundle.js'
    }
  }, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({

    }));
    callback();
  });
});

gulp.task('clean', function () {
  return gulp.src('build/')
    .pipe(clean());
});

gulp.task('copy:html', function() {
  var srcFiles = ['app/**/*.html', 'app/**/*.css'];
  return gulp.src(srcFiles)
    .pipe(gulp.dest('build/'));
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

gulp.task('build', ['webpack:client', 'copy:html']);
gulp.task('default', ['lint', 'jscs']);
