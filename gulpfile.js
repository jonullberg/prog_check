'use strict';

var gulp = require('gulp');
var stylish = require('jshint-stylish');
var workingFiles = ['gulpfile.js', './lib/**/*.js', './routes/**/*.js', './app/**/*.js', './test/**/*.js', './models/**/*.js'];
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(workingFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});


gulp.task('default', ['lint']);
