var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task("sass", function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('css/'));
});

gulp.task("watch", function() {
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['concat-js']);
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src(['css/base.css', 'css/style.css'])
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'));
});

gulp.task('concat-js', function() {
  return gulp.src(['js/main.js','js/contact.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('minify-js', ['concat-js'], function() {
  return gulp.src('js/script.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js'));
});

gulp.task('copy', function() {
  gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/tether/dist/js/tether.min.js'
  ])
  .pipe(gulp.dest('vendor/'));
});

gulp.task("initial", ['copy', 'compile']);
gulp.task("compile", ['sass', 'concat-js']);
gulp.task("release", ['minify-css', 'minify-js']);
gulp.task("default", ['compile']);
