'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var karma = require('gulp-karma');

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

gulp.task('webpack:heroku', ['copy:html'], function(callback) {
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

gulp.task('clean:build', function () {
  return gulp.src('build/')
    .pipe(clean());
});

gulp.task('clean:karma', function(done) {
  return gulp.src('test/karma_tests/build.js')
    .pipe(clean());
});

gulp.task('copy:html', ['clean:build'], function() {
  var srcFiles = ['app/**/*.html', 'app/**/*.css', 'app/**/*.png'];
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

gulp.task('karmatest', ['karma:test']);
gulp.task('build', ['webpack:client', 'copy:html']);
gulp.task('default', ['webpack:client']);
