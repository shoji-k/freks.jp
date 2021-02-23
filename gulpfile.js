const { src, dest, series } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
// var uglify = require("gulp-uglify");
// var concat = require("gulp-concat");
// var gzip = require("gulp-gzip");

function compileCss() {
  return src("scss/style.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("css/"));
}

function minifyCss() {
  return src(["css/style.css"])
    .pipe(cleanCSS({ compatibility: "*" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("css"));
}

// gulp.task("watch", function() {
//   gulp.watch('./scss/*.scss', ['sass']);
//   gulp.watch('./js/*.js', ['concat-js']);
// });

// gulp.task('concat-js', function() {
//   return gulp.src(['js/main.js','js/contact.js'])
//     .pipe(concat('script.js'))
//     .pipe(gulp.dest('js'));
// });
//
// gulp.task('minify-js', function() {
//   return gulp.src('js/script.js')
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('js'));
// });
// gulp.task('compress-js', function() {
//   return gulp.src('js/script.min.js')
//     .pipe(gzip())
//     .pipe(gulp.dest('js'));
// });
// gulp.task('compress-css', function() {
//   return gulp.src(['css/base.min.css', 'css/style.min.css'])
//     .pipe(gzip())
//     .pipe(gulp.dest('css'));
// });
//
// gulp.task("initial", ['copy', 'compile']);
// gulp.task("compile", ['sass', 'concat-js']);
// gulp.task("release", ['minify-css', 'minify-js', 'compress-css', 'compress-js']);
// gulp.task("default", gulp.task('sass'));

exports.default = series(compileCss, minifyCss);
