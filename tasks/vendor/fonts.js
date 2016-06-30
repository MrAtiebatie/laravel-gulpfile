module.exports = function (gulp, plugins, settings) {

    gulp.src(settings.bower + '/**/fonts/*.{ttf,woff,woff2,eot,eof,svg}')
        .pipe(plugins.flatten())
        .pipe(gulp.dest(settings.dest + 'fonts'));
}