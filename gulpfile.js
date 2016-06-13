var gulp = require('gulp');
var elixir = require('laravel-elixir');
var concat = require('gulp-concat');
var watch = require("gulp-watch");
var gutil = require("gulp-util");
var notifier = require("node-notifier");

// JavaScript
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var webpack = require('webpack');

// CSS
var less = require('gulp-less');
var clean = require('gulp-clean-css');

var flatten = require('gulp-flatten');
var mainBowerFiles = require('main-bower-files');

var dest = 'public/';

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
gulp.task('compile:js', function() {

    var bowerFiles = mainBowerFiles({ filter: new RegExp('.*js$', 'i') });
    console.log(bowerFiles);

    return gulp.src(bowerFiles)
       .pipe(concat('vendor.js'))
       .pipe(uglify())
       .pipe(gulp.dest(dest + 'js'));

});

gulp.task('compile:css', function () {

    var bowerFiles = mainBowerFiles({ filter: new RegExp(/(.*)(\.less|\.css)/gi) });
    console.log(bowerFiles);

    return gulp.src(bowerFiles)
        .pipe(less())
        .pipe(concat('vendor.css'))
        .pipe(clean())
        .pipe(gulp.dest(dest + 'css'));

});

gulp.task('compile:fonts', function () {

    return gulp.src('bower_components/**/fonts/*.{ttf,woff,woff2,eot,eof,svg}')
        .pipe(flatten())
        .pipe(gulp.dest(dest + 'fonts'));

});

gulp.task("webpack", function() {
    build();

    watch(["./resources/assets/js/**/*.js", "./resources/assets/js/**/*.vue", "./webpack.config.js"], function() {
        build();
    });
});

/**
 * Build webpack scripts
 */
function build () {
    webpack(require("./webpack.config.js"), function(err, stats) {
        if (err || stats.compilation.missingDependencies.length > 0) {
            notifier.notify({
                title: "Webpack",
                message: "Webpack has failed",
                icon: "node_modules/laravel-elixir/icons/fail.png"
            });

            gutil.log("Webpack missing dependencies:");
            gutil.log(stats.compilation.missingDependencies);

            return;
        }

        notifier.notify({
            title: "Webpack",
            message: "Webpack has finished",
            icon: "node_modules/laravel-elixir/icons/laravel.png"
        });
    });
}

elixir(function(mix) {
    mix.sass('app.scss');
});