# Co-op frontend foundations

Co-op frontend foundations contains all the core assets needed to build Co-op branded digital content.

The foundations are the basic Co-op look and feel - they should be included in all Co-op services. A set of [optional Co-op components are also available](https://github.com/coopdigital/coop-frontend-components).

## Working on foundations locally

### Installation
`npm install`

### Lint
For linting
`npm run lint`

### Build
For local testing
`npm run build`

### Watch
For local continuous building of the project
`npm run watch`

The build tasks included here are for local development. This will build the CSS into a /build folder that contains a HTML page with all the basics included. To include in your service use our gulp core asset pipeline (coming soon).

## Using the foundations in your service
`npm install @coopdigital/coop-frontend-foundations --save-dev`

Then add into your import file
`@import 'node_modules/@coopdigital/coop-frontend-foundations/coop-foundations'`

Note: this path will need amending based on your project file structure.

Uncompressed the foundations are 100kb, minified 36kb and gzipped 6kb. On a live service make sure you gzip the file.

## Name spacing
We use name spacing in our CSS foundations and [components](https://github.com/coopdigital/coop-frontend-components). These namespaces avoid clashes with other styles used to extend the foundation and component styles when building services.

### General
`.coop-[name]`
Used for base styles such as forms and button EG `coop-btn` and `coop-form`.

### Layout
`.coop-l-[name]`
Used for layout (grid) classes. This replaces things like, `.row`, and `.large-12` with `.coop-l-row` and `.coop-l-large-12`.

### Utilities
`.coop-u-[name]`
Utility classes for colour and layout helpers.

### Components
`.coop-c-[name]`
Components - found in the [components repo](https://github.com/coopdigital/coop-frontend-components).

## Creating your own styles
When working on a service. Choose a sensible namespace and follow the same convention. For example a Funeral care service would use `.fc-c-[name]` for its components.
