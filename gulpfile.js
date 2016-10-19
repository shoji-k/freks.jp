// 必要なプラグインを読み込む
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Sassをコンパイルするタスク設定
gulp.task("default", function () {
    gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css/'));
});
