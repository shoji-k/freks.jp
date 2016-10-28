var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task("compile", function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css/'));
});

gulp.task("watch", function() {
  gulp.watch('./scss/*.scss', ['compile']);
});

gulp.task("default", ['compile']);
