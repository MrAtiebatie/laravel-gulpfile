module.exports = function (gulp, plugins, settings) {

    var jsFiles = plugins.mainBowerFiles({ filter: new RegExp('.*js$', 'i'), checkExistence: true });
    console.log('JavaScript files', jsFiles, "\n");

    gulp.src(jsFiles)
       .pipe(plugins.concat('vendor.js'))
       .pipe(plugins.uglify())
       .pipe(gulp.dest(settings.dest + 'js'));
}