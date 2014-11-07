'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  gulp.src('./dist/*', { read: false })
    .pipe(clean());
});

gulp.task('copyAssets', function() {
  gulp.src('./lib/assets/**/*.*', { base: './lib' })
    .pipe(gulp.dest('dist'));
});

gulp.task('copyHtml', function() {
  gulp.src('./index.html', { base: './' })
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle', function() {
  gulp.src('./index.js', { read: false })
    .pipe(browserify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/**/*.*', ['build']);
});

gulp.task('build', ['clean', 'bundle', 'copyHtml', 'copyAssets']);

gulp.task('default', ['watch']);