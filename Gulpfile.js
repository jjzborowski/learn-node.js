const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      css = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
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
