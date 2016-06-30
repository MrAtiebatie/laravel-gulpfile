### The ultimate gulpfile for a Laravel project

This file is created for the purpose of faster front end development. Either it is LESS, SASS or Webpack.

You can even automize the `compile:vendor` task by creating a `.bowerrc` file.

    {
        "scripts": {
            "postinstall": "gulp compile:vendor"
        }
    }

