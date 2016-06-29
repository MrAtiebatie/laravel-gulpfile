var gulp = require('gulp');
var elixir = require('laravel-elixir');
var concat = require('gulp-concat');
var watch = require("gulp-watch");
var gutil = require("gulp-util");
var flatten = require('gulp-flatten');
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var notifier = require('node-notifier');
var notify = require('gulp-notify');

// JavaScript
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var webpack = require('webpack');

// CSS
var sass = require('gulp-sass');
var less = require('gulp-less');
var clean = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
    public: 'public/',
    scripts: ['resources/assets/js/**/*.js', 'resources/assets/js/**/*.vue'],
    less: 'resources/assets/less/**/*.less',
    sass: 'resources/assets/sass/**/*.scss',
}

var error = function (error) {
    gutil.log(error);

    if (typeof error != 'undefined' || typeof error.formated != 'undefined') {
        error = error.formated;
    } else {
        error = error;
    }

    notifier.notify({
        icon: 'node_modules/laravel-elixir/icons/fail.png',
        title: 'Failed',
        message: error,
    });
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
gulp.task('vendor:js', function() {

    var bowerFiles = mainBowerFiles({ filter: new RegExp('.*js$', 'i'), checkExistence: true });
    console.log(bowerFiles);

    return gulp.src(bowerFiles)
       .pipe(concat('vendor.js'))
       .pipe(uglify())
       .pipe(gulp.dest(paths.public + 'js'));

});

gulp.task('vendor:css', function () {

    // LESS files
    var lessFiles = mainBowerFiles({ filter: new RegExp('.*less$', 'i') });
    console.log(lessFiles);

    var lessStream = gulp.src(lessFiles)
        .pipe(less())
        .pipe(concat('less-files.css'));

    // SASS files
    var sassFiles = mainBowerFiles({ filter: new RegExp('.*scss$', 'i') });
    console.log(sassFiles);

    var sassStream = gulp.src(sassFiles)
        .pipe(sass())
        .pipe(concat('sass-files.css'));

    // CSS files
    var cssFiles = mainBowerFiles({ filter: new RegExp('[^\s]+(\.?([^s]css))$', 'i') });
    console.log(cssFiles);

    var cssStream = gulp.src(cssFiles)
        .pipe(concat('css-files.css'));

    // Concat files
    return merge(lessStream, sassStream, cssStream)
        .pipe(concat('vendor.css'))
        .pipe(clean())
        .pipe(gulp.dest(paths.public + 'css'));

});

gulp.task('vendor:fonts', function () {

    return gulp.src('bower_components/**/fonts/*.{ttf,woff,woff2,eot,eof,svg}')
        .pipe(flatten())
        .pipe(gulp.dest(paths.public + 'fonts'));

});

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
gulp.task('compile:sass', function () {

    return gulp.src('./resources/assets/sass/app.scss')
        .pipe(sass().on('error', error))
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(notify('Success!'))
        .pipe(gulp.dest(paths.public + 'css'));
});

gulp.task('compile:less', function () {

    return gulp.src('./resources/assets/less/app.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(paths.public + 'css'));
});

gulp.task("compile:js", function() {
    webpack(require("./webpack.config.js"), function(err, stats) {
        if (err || stats.compilation.missingDependencies.length > 0 || stats.compilation.errors.length > 0) {
            error();

            gutil.log("Webpack errors:");
            gutil.log(stats.compilation.missingDependencies);
            gutil.log(stats.compilation.errors[0].message);

            return;
        }

        notifier.notify({
            message: "Webpack has finished",
            icon: "node_modules/laravel-elixir/icons/laravel.png"
        });
    });
});

gulp.task('watch', function () {

    gulp.watch(paths.scripts, ['compile:js']);
    gulp.watch(paths.less, ['compile:less']);
    gulp.watch(paths.sass, ['compile:sass']);

});

gulp.task('compile:vendor', ['vendor:fonts', 'vendor:css', 'vendor:js']);