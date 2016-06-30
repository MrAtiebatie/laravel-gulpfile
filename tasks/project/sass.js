module.exports = function (gulp, plugins, settings) {

    return gulp.src(settings.sass.compile)
        .pipe(sass().on('error', settings.error))
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(notify('Success!'))
        .pipe(gulp.dest(settings.dest + 'css'));
}