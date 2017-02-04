const gulp = require('gulp');
const sass = require('gulp-sass');
const css = require('gulp-clean-css');
const beautifier = require('gulp-jsbeautifier');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync');
const src = {
    sass: 'sass/*.scss',
    html: 'app/*.html',
    css: 'app/css/*.css',
    js: 'app/**/*.js'    
};
const dest = {
    sass: 'sass/',
    html: 'app/',
    css: 'app/css/',
    js: 'app/js/'    
}

gulp.task('beautifier', () => {
//    gulp.src(src.sass)
//        .pipe(beautifier())
//        .pipe(gulp.dest(dest.sass));
//    gulp.src(src.js)
//        .pipe(beautifier())
//        .pipe(gulp.dest(dest.js));
//    gulp.src(src.html)
//        .pipe(beautifier())
//        .pipe(gulp.dest(dest.html));
});

gulp.task('compile-sass', () => {
    gulp.src(src.sass)
        .pipe(beautifier())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(css({compatibility: '*'}))
        .pipe(gulp.dest(dest.css));
//        .pipe(sync.reload({stream: true}));
});

gulp.task('default', () => {
//    sync.init({
//        server: {
//            baseDir: './app'
//        } 
//    });
//    gulp.watch([src.js, src.html], ['beautifier']);
    gulp.watch(src.sass, ['compile-sass']);
//    gulp.watch(src.html).on('change', sync.reload);
//    gulp.watch(src.js).on('change', sync.reload);
//    gulp.watch(src.html, sync.reload);
//    gulp.watch(src.css, sync.reload);
//    gulp.watch(src.js, sync.reload);
});
