module.exports = function (gulp, plugins, settings) {

    return function (gulp, plugins, settings) {

        gulp.src(settings.less.compile)
            .pipe(plugins.less().on('error', settings.error))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.concat('app.css'))
            .pipe(gulp.dest(settings.dest + 'css'));

    }.bind(this, gulp, plugins, settings);
}
