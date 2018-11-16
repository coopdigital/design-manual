# Component card
Card component used on colleagues.coop.co.uk and coop.co.uk/recipes

## Installation
Install via `npm` or Yarn:
```bash
$ npm install @coopdigital/component-card --save
# OR
$ yarn add @coopdigital/component-card
```

## Usage
You can include `component-card` in your project by referencing it from your existing CSS via `@import` statement, i.e.:
```css
@import "node_modules/@coopdigital/component-[name]/dist/card.css";
```

If you use PostCSS in your build pipeline, you can reference the sources directly like so:
```css
@import "node_modules/@coopdigital/component-[name]/src/card.pcss";
```

If you use a `postcss-import` plugin, it gets even easier:
```css
@import "@coopdigital/component-card";
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
