module.exports = function (gulp, plugins, settings) {

    console.log(settings.root + '/' + settings.webpack);

    plugins.webpack(require(settings.root + '/' + settings.webpack), function(err, stats) {
        if (err || stats.compilation.missingDependencies.length > 0 || stats.compilation.errors.length > 0) {
            // Send error notification
            settings.error([err, stats.compilation.missingDependencies, stats.compilation.errors[0].message]);
            return;
        }
        
        console.log(plugins.notifier);

        plugins.notifier.notify({
            message: "Webpack has finished",
            icon: "node_modules/laravel-elixir/icons/laravel.png"
        });
    });
}
