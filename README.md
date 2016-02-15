# Single Site Style Guide

This repository contains the core front-end assets for the new Co-op branding. The styles can be previewed on the included Style Guide.

## Dependencies

This project uses [Jekyll](http://jekyllrb.com/) to build the Style Guide pages, and [Gulp](http://gulpjs.com/) to compile the assets into the Style Guide directory, so they can be served locally.

You need to install Ruby, Node and Bower dependencies:

```
bundle install
npm install
bower install
```

## Building the Style Guide

Once dependencies have been installed, you can build the actual style guide. Gulp commands are already set up to do this.

The default gulp task is configured to build and compile all the Style Guide assets, run the local server, then watch for changes automatically, simply by running `gulp`.

You can also run each of the tasks individually.

### Build and compile all the assets
```
gulp build
```
This will run a number of Gulp tasks: processing the Sass, compiling the scripts, and copying over any assets required, then building the Jekyll Style Guide.


### Run a local server
```
gulp connect
```

This will run a local server, accessible at [localhost:8888](http://localhost:8888)

### Start a watch task
```
gulp watch
```

This will watch any files in the `assets/`, `styles/`, `scripts/` directories, as well as any `.html` file in the `styleguide/` directory or any file in the `styleguide/_assets` directory. If any of these files changes, the `build` task will be called and all assets and pages will be recompiled.

If you have the LiveReload extension enabled in your browser and the local server running, the page will reload automatically once the build is complete.
