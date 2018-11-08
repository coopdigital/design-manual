# Co-op Foundations: Variables
Common global variables that all Co-op CSS Modules rely upon.

## Dependencies (for PostCSS sources only)
- `postcss`
- `precss`

## How to use
1. Install via `npm` or Yarn:
  ```bash
  $ npm install @coopdigital/foundations-vars --save
  $ yarn add @coopdigital/foundations-vars
  ```
2. Add CSS module to your application via a most appropriate method. This will entirely depend on your application and how you are currently loading CSS modules within it.

> **Warning**  
> If you want to use global Media Query breakpoint variables, you have to include `src/vars.pcss` in your build pipeline, as they will not be present in the postprocessed CSS file that you can find under `dist/vars.css`.

## Examples
Here's a bunch of examples, showing how you can integrate this CSS module in your project, based on most popular types of project. You can either use a post-processed and pre-built CSS form the `dist` directory, ot use PostCSS sources from the `src` dir.

The latter have two dependencies, which should be consumed by your frontend toolkit to postprocess the CSS correctly.

### Vue.js
In Vue, you can just reference it from a global component like so:
```css
<style>
/* Import PostCSS source */
@import "~@coopdigital/foundations-typography/src/vars.pcss";
/* Import postprocessed CSS distributable */
@import "~@coopdigital/foundations-typography/dist/vars.css";
</style>
```

### React.js
TBD

### Webpack
TBD
