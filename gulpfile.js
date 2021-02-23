const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
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

function minifyJs() {
  return src('js/script.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('js'));
}

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

exports.build = parallel(series(compileCss, minifyCss), minifyJs);
exports.watch = function() {
  watch('scss/*.scss', series(compileCss, minifyCss));
  watch('js/script.js', minifyJs);
}
exports.default = parallel(series(compileCss, minifyCss), minifyJs);
