module.exports = function (gulp, plugins, settings) {

    return function (gulp, plugins, settings) {

        plugins.webpack(require(settings.root + '/' + settings.webpack), function(err, stats) {
            if (err || stats.compilation.missingDependencies.length > 0 || stats.compilation.errors.length > 0) {
                // Send error notification
                settings.error([err, stats.compilation.missingDependencies, stats.compilation.errors[0].message]);
                return;
            }

            plugins.notifier.notify({
                message: "Webpack has finished",
                icon: "node_modules/laravel-elixir/icons/laravel.png"
            });
        });

    }.bind(this, gulp, plugins, settings);
}
