# CSS Component: Checkbox
Radio buttons and checkboxes allow users to select an answer from 2 or more options.

More detailed information on [how to use form patterns can be found in our design guidance](https://coop-design-manual.herokuapp.com/styles/forms/index.html).

## Installation
This component was designed to work with [CSS Foundations](https://github.com/coopdigital/css-foundations) and requires it display correctly. This guide assumes you have CSS Foundations installed and running in your build pipeline; please refer to its own documentation for examples and guidance.

You can install `component-checkbox` via `npm` or Yarn:
```bash
$ npm install @coopdigital/component-checkbox --save
# OR
$ yarn add @coopdigital/component-checkbox
```

## Usage
You can include `component-checkbox` in your project by referencing it from your existing CSS via `@import` statement, i.e.:
```css
@import "node_modules/@coopdigital/component-checkbox/dist/checkbox.css";
```

If you use PostCSS in your build pipeline, you can reference the sources directly like so:
```css
@import "node_modules/@coopdigital/component-checkbox/src/checkbox.pcss";
```

If you use a `postcss-import` plugin, it gets even easier:
```css
@import "@coopdigital/component-checkbox";
```

## Examples
Here's a bunch of examples, showing how you can integrate this CSS module in your project, based on most popular stacks of project. You can either use a post-processed and pre-built CSS form the `dist` directory, ot use PostCSS sources from the `src` dir.

The latter have certain dependencies, which should be consumed by your frontend toolkit to postprocess the CSS correctly.

### HTML samples
```html
<!-- Radio button -->
<label class="coop-c-checkbox-radio__label" for="shipping-free">
  <input type="radio" value="shipping-free" name="shipping" id="shipping-free" class="coop-c-checkbox-radio__input">Radio label
</label>

<!-- Checkbox -->
<label class="coop-c-checkbox-radio__label">
  <input type="checkbox" value="1" name="client[owns_a_business]" class="coop-c-checkbox-radio__input">Checkbox label
</label>
```

### Vue.js
TBD

### React.js
TBD

## Development
TBD
