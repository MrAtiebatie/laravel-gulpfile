module.exports = function (gulp, plugins, settings) {

    return gulp.src(settings.less.compile)
        .pipe(plugins.less().on('error', settings.error))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest(settings.dest + 'css'));
}