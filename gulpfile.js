var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task("compile", function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css/'));
});

gulp.task("watch", function() {
  gulp.watch('./scss/*.scss', ['compile']);
});

gulp.task('minify-css', ['compile'], function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'));
});

gulp.task("default", ['compile']);
