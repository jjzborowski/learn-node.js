const gulp = require('gulp'),
      sass = require('gulp-sass'),
      css = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      src = {
          sass: 'source/sass/*.scss',
          js: 'source/js/*.js'    
      },
      dest = {
          css: 'app/css/',
          js: 'app/js/'
      };

gulp.task('convertion-js', () => {
    return gulp.src(src.js)
        .pipe(babel({presets: ['es2015']}))
//        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest.js));
});

gulp.task('convertion-sass', () => {
    return gulp.src(src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(css({compatibility: '*'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest.css));
});

gulp.task('default', () => {
    gulp.watch(src.sass, ['convertion-sass']);
    gulp.watch(src.js, ['convertion-js']);
});
