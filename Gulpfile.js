const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      css = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      config = {
          src: {
              sass: 'source/sass/main.scss',
              js: 'source/js/*.js'    
          },
          dest: {
              css: 'app/css/',
              js: 'app/js/'
          }
      };

gulp.task('convertion-js', ()=>{
    return gulp.src(config.src.js)
        .pipe(babel({presets: ['es2015']}))
    //        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('convertion-sass', ()=>{
    return gulp.src(config.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(css({compatibility: '*'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dest.css));
});

gulp.task('default', ()=>{
    gulp.watch(config.src.sass, ['convertion-sass']);
    gulp.watch(config.src.js, ['convertion-js']);
});
