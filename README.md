# Co-op design system

The design system provides guidance on creating digital content for the Co-op.

## Dependencies

This project uses [Jekyll](http://jekyllrb.com/) to compile the pages, and various NPM modules to include the Co-op Front-end Toolkit dependency and  compile the assets. To install all required dependencies, run:

```
bundle install
npm install
```

## Local development

Once dependencies have been installed, you can build and serve the Design Manual locally. Gulp commands are already set up to generate the Jekyll build, lint and compile the SASS and JavaScript, to copy over necessary assets from the Toolkit, and to run a local server for development.

The default `gulp` task is configured to build and compile all the Design Manual assets. The `server` task will be most handy for local development: it will build the Jekyll site and compile all the assets, start a local server accessible at <http://localhost:9000> and start the watch tasks to automatically re-generate assets and pages on file change:

```
gulp server
```

## Heroku deployment

The Design system is automatically deployed to Heroku (<https://coop-design-manual.herokuapp.com>) when changes are merged into the master branch.

## Working on the [Co-op Front-end Toolkit](https://github.com/coopdigital/coop-frontend-toolkit) locally

The Design system is set up to allow easy development work on the Toolkit. In order to reflect changes made to your local version of the Toolkit directly in your local version of the Design system, you must first link the NPM dependency to your local version of the Toolkit.

If you haven't done so, first clone the Toolkit repository:
```
git clone git@github.com:coopdigital/coop-frontend-toolkit.git
```

Create a reference to the local NPM package from the Toolkit directory:
```
cd coop-frontend-toolkit
npm link
```

From the Design system directory, link the NPM package to the local version:
```
cd ../design-manual
npm link coop-frontend-toolkit
```

Any changes made to the local version of the Toolkit will now automatically be reflected in the local version of the Design system. The Gulp watch tasks are set up to pick up changes made to the Toolkit files automatically, so any change will trigger a recompiling of the assets and reload the browser if you have the server running.
