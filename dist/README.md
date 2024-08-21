# Webcomponent.js

_A customElements abstraction layer to create web components that can be rendered on both client and server sides_

[![NPM Version](https://img.shields.io/npm/v/@enzoaicardi/webcomponent.svg?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/webcomponent)
[![NPM Downloads](https://img.shields.io/npm/dm/@enzoaicardi/webcomponent.svg?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/webcomponent)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@enzoaicardi/webcomponent?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/webcomponent)
[![JSDelivr Hits](https://img.shields.io/jsdelivr/npm/hm/@enzoaicardi/webcomponent?style=for-the-badge)](https://www.jsdelivr.com/package/npm/@enzoaicardi/webcomponent)
[![Wiki](https://img.shields.io/badge/Wiki-Documentation-blue?style=for-the-badge)](https://github.com/enzoaicardi/webcomponent/tree/main/wiki/README.md)

# What is a WebComponent

> _Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps._ (source: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components))

In pure javascript, web components are generally written using [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) and possibly [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

This approach doesn't usually allow you to do without large javascript frameworks when you want to create an application based entirely on reusable components, and there are two main reasons for this:

-   Rendering nested components on the client side requires careful DOM manipulation.
-   Server-side rendering of custom elements is impossible, as this is a browser API.

The WebComponent utility was created to solve both these problems. It allows you to write code in the manner of a classic custom element, and distribute the code to both client and server.

It is a minimal interface of less than **1kb** with no dependencies. To use it, read the [documentation](https://github.com/enzoaicardi/webcomponent/tree/main/wiki/README.md).

# List of all exports

-   [x] [WebComponent](https://github.com/enzoaicardi/webcomponent/tree/main/wiki/README.md)

# Installations

## NPM Package

```bash
npm install @enzoaicardi/webcomponent
```

```js
import { WebComponent } from "@enzoaicardi/webcomponent"; // es modules
const { WebComponent } = require("@enzoaicardi/webcomponent"); // commonjs modules
```

## CDN import

```js
// es modules
import { WebComponent } from "https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/esm/webcomponent.js";
```

```html
<!-- iife function execution -->
<script src="https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/iife/webcomponent.js"></script>
<script>
    // global object destructuration
    const { WebComponent } = WebComponent;
</script>
```
