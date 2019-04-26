# CSS Component: Checkbox and Radio
Radio buttons and checkboxes allow users to select an answer from 2 or more options.

More detailed information on [how to use form patterns can be found in our design guidance](https://coop-design-system.herokuapp.com/pattern-library/foundations/checkboxes-and-radio-buttons.html).

## Installation
This component was designed to work with [CSS Foundations](https://github.com/coopdigital/css-foundations) and requires it display correctly. This guide assumes you have CSS Foundations installed and running in your build pipeline; please refer to its own documentation for examples and guidance.

You can install `component-checkbox-radio` via `npm` or Yarn:
```bash
$ npm install @coopdigital/component-checkbox--save
# OR
$ yarn add @coopdigital/component-checkbox
```

## Usage
You can include `component-checkbox-radio` in your project by referencing it from your existing CSS via `@import` statement, i.e.:
```css
@import "node_modules/@coopdigital/component-checkbox/dist/checkbox-radio.css";
```

If you use PostCSS in your build pipeline, you can reference the sources directly like so:
```css
@import "node_modules/@coopdigital/component-checkbox/src/checkbox-radio.pcss";
```

If you use a `postcss-import` plugin, it gets even easier:
```css
@import "@coopdigital/component-checkbox-radio";
```

## Examples
Here's a bunch of examples, showing how you can integrate this CSS module in your project, based on most popular stacks of project. You can either use a post-processed and pre-built CSS form the `dist` directory, ot use PostCSS sources from the `src` dir.

The latter have certain dependencies, which should be consumed by your frontend toolkit to postprocess the CSS correctly.

### HTML samples
```html
<!-- Radio button -->
<div class="coop-c-form-choice">
    <input type="radio" name="option" id="option-1" value="1" class="coop-c-form-choice__input coop-c-form-choice__input--radio-button">
    <label class="coop-c-form-choice__label" for="option-1">Radio button</label>
</div>

<!-- Checkbox -->
<div class="coop-c-form-choice">
    <input type="checkbox" name="option" id="checkbox" value="2" class="coop-c-form-choice__input coop-c-form-choice__input--checkbox">
    <label for="checkbox" class="coop-c-form-choice__label">Checkbox</label>
</div>
```

### Vue.js
TBD

### React.js
TBD

## Development
TBD
