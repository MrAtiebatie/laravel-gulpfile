var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')({
    pattern: ['*'],
    rename: {
        'merge-stream': 'merge',
        'node-notifier': 'notifier',
    }
});

/*
 |--------------------------------------------------------------------------
 | User settings
 |--------------------------------------------------------------------------
 |
 | These settings can be modified by the user to his desires.
 | All possible options, are listed here
 */
var settings = {
    root: path.resolve('./'),
    bower: 'bower_components',
    webpack: 'webpack.config.js',
    dest: 'public/',
    scripts: {
        watch: ['resources/assets/js/**/*.js', 'resources/assets/js/**/*.vue'],
        // Compile source is in the webpack.config.js
    },
    less: {
        watch: 'resources/assets/less/**/*.less',
        compile: 'resources/assets/less/app.less',
    },
    sass: {
        watch: 'resources/assets/sass/**/*.scss',
        compile: 'resources/assets/sass/app.scss',
    },
    error: function (error) {
        gutil.log(gutil.colors.red('ERROR', error));
        new gutil.PluginError('ERROR', error, { showStack: true });

        notifier.notify({
            icon: 'node_modules/laravel-elixir/icons/fail.png',
            title: 'Failed',
            message: error,
        });
    }
};

/**
 * Include task
 * @param  {string} task
 * @return {Function}
 */
function task(task) {
    return require(path.resolve(settings.bower + '/laravel-gulpfile/tasks/' + task))(gulp, plugins, settings);
}

/*
 |--------------------------------------------------------------------------
 | Vendor related tasks
 |--------------------------------------------------------------------------
 |
 | All the vendor tasks, use the mainBowerFiles plugin to
 | search for the main files from bower components. It will concat all
 | files to one single vendor file.
 */
gulp.task('vendor:js', task('vendor/javascript.js'));
gulp.task('vendor:css', task('vendor/styles.js'));
gulp.task('vendor:fonts', task('vendor/fonts.js'));
gulp.task('compile:vendor', ['vendor:js', 'vendor:css', 'vendor:fonts']);

/*
|--------------------------------------------------------------------------
| Project related tasks
|--------------------------------------------------------------------------
|
| Here we define the project related tasks. This includes compiling
| all our stylesheet files, wether it's SASS or LESS. The Webpack task
| is also defined here.
|
*/
gulp.task('compile:js', task('project/javascript.js'));
gulp.task('compile:less', task('project/less.js'));
gulp.task('compile:sass', task('project/sass.js'));

gulp.task('watch', function () {

    gulp.watch(settings.scripts.watch, 'compile:js');
    gulp.watch(settings.less.watch, 'compile:less');
    gulp.watch(settings.sass.watch, 'compile:sass');

});
