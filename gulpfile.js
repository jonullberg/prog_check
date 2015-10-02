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

var paths = {
  scripts: './app/**/*.js',
  styles: ['./app/**/*.css', './app/**/*.scss'],
  html: './app/**/*.html',
  serverLib: './lib/**/*.js',
  serverTests: './tests/**/*.js',
  serverFiles: ['./server.js', './routes/**/*.js'],
  dataModels: './models/**/*.js',
  gulpfile: './gulpfile.js'
};


gulp.task('watch', function() {
  var client = ['build'];
  gulp.watch(paths.scripts, client);
  gulp.watch(paths.html, client);
  gulp.watch(paths.styles, client);
});

var workingFiles = ['gulpfile.js', './lib/**/*.js', './routes/**/*.js', './app/**/*.js', './test/**/*.js', './models/**/*.js'];

gulp.task('webpack:client', ['copy:html'], function(callback) {
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

gulp.task('clean:build', function (cb) {
  del.sync([
    'build/css/**/*',
    'build/templates/**/*',
    'build/index.html',
    'build/bundle.js',
    '!build/img/**/*',
    '!build/uploads/**/*'
    ]);
  cb();
});

gulp.task('clean:karma', function(cb) {
  del.sync([
    'test/karma_tests/build.js'
    ]);
  cb();
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
gulp.task('build', ['webpack:client']);
gulp.task('default', ['webpack:client']);
