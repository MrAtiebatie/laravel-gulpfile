module.exports = function (gulp, plugins, settings) {

    return function (gulp, plugins, settings) {
        
        plugins.del([settings.dest + 'fonts']);

        gulp.src(settings.bower + '/**/fonts/*.{ttf,woff,woff2,eot,eof,svg}')
            .pipe(plugins.flatten())
            .pipe(gulp.dest(settings.dest + 'fonts'));

    }.bind(this, gulp, plugins, settings);
}
