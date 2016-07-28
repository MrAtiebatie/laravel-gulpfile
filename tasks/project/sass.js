module.exports = function (gulp, plugins, settings) {

    gulp.src(settings.sass.compile)
        .pipe(plugins.sass().on('error', settings.error))
        .pipe(plugins.autoprefixer())
        .pipe(concat('app.css'))
        .pipe(notify('Success!'))
        .pipe(gulp.dest(settings.dest + 'css'));
}
