module.exports = function (gulp, plugins, settings) {

    return function (gulp, plugins, settings) {

        // LESS files
        var lessFiles = plugins.mainBowerFiles({ filter: new RegExp('.*less$', 'i') });
        console.log('LESS files:', lessFiles, "\n");

        var lessStream = gulp.src(lessFiles)
            .pipe(plugins.less())
            .pipe(plugins.concat('less-files.css'));

        // SASS files
        var sassFiles = plugins.mainBowerFiles({ filter: new RegExp('.*scss$', 'i') });
        console.log('SASS files:', sassFiles, "\n");

        var sassStream = gulp.src(sassFiles)
            .pipe(plugins.sass())
            .pipe(plugins.concat('sass-files.css'));

        // CSS files
        var cssFiles = plugins.mainBowerFiles({ filter: new RegExp('[^\s]+(\.?([^s]css))$', 'i') });
        console.log('CSS files', cssFiles, "\n");

        var cssStream = gulp.src(cssFiles)
            .pipe(plugins.concat('css-files.css'));

        // Concat files
        plugins.merge(lessStream, sassStream, cssStream)
            .pipe(plugins.concat('vendor.css'))
            .pipe(plugins.clean())
            .pipe(gulp.dest(settings.dest + 'css'));

    }.bind(this, gulp, plugins, settings);
}
