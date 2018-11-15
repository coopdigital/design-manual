# CSS Foundations: Tables
CSS styles for making tables look in line with Co-op's Design System specification.

## Installation
Install via `npm` or Yarn:
```bash
$ npm install @coopdigital/foundations-tables --save
# OR
$ yarn add @coopdigital/foundations-tables
```

## Usage
You can include `foundations-tables` in your project by referencing it from your existing CSS via `@import` statement, i.e.:
```css
@import "node_modules/@coopdigital/foundations-tables/dist/tables.css";
```

If you use PostCSS in your build pipeline, you can reference the sources directly like so:
```css
@import "node_modules/@coopdigital/foundations-tables/src/tables.pcss";
```

If you use a `postcss-import` plugin, it gets even easier:
```css
@import "@coopdigital/foundations-tables";
```

## Examples
Here's a bunch of examples, showing how you can integrate this CSS module in your project, based on most popular stacks of project. You can either use a post-processed and pre-built CSS form the `dist` directory, ot use PostCSS sources from the `src` dir.

The latter have certain dependencies, which should be consumed by your frontend toolkit to postprocess the CSS correctly.

### Vue.js
TBD

### React.js
TBD

## Development
TBD
