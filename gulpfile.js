var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task("compile", function () {
    gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css/'));
});

gulp.task("watch", function() {
  gulp.watch('./node_modules/bootstrap/scss/*.scss', ['compile']);
});

gulp.task("default", ['compile']);
