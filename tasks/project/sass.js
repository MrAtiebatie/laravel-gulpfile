module.exports = function (gulp, plugins, settings) {

    gulp.src(settings.sass.compile)
        .pipe(plugins.sass().on('error', settings.error))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.notify('Success!'))
        .pipe(gulp.dest(settings.dest + 'css'));
}
