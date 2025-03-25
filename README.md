# Webcomponent.js

_A customElements abstraction layer to create web components that can be rendered on both client and server sides_

[![NPM Version](https://img.shields.io/npm/v/@enzoaicardi/webcomponent.svg?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/webcomponent)
[![NPM Downloads](https://img.shields.io/npm/dm/@enzoaicardi/webcomponent.svg?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/webcomponent)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@enzoaicardi/webcomponent?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/webcomponent)
[![JSDelivr Hits](https://img.shields.io/jsdelivr/npm/hm/@enzoaicardi/webcomponent?style=for-the-badge)](https://www.jsdelivr.com/package/npm/@enzoaicardi/webcomponent)
[![Wiki](https://img.shields.io/badge/Wiki-Documentation-blue?style=for-the-badge)](https://github.com/enzoaicardi/webcomponent/tree/main/wiki/README.md)

# What is a web-component

> _Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps._ (source: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components))

In pure javascript, web components are generally written using [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) and possibly [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

# Why WebComponent ?

Web-components are part of the user interface. They provide lifecycle methods once instantiated, but have no rendering method that can be executed on both client and server.

The WebComponent library is designed to solve these problems. Unlike most reactive component frameworks / libraries, WebComponent is just a small layer on top of customElements written in typescript (only 1.7kb) that doesn't take you out of the scope of traditional javascript development, doesn't use JSX, and doesn't require a transpiler.

To learn how to use it, [check the wiki](https://github.com/enzoaicardi/webcomponent/tree/main/wiki/README.md) !

# List of all exports

-   [x] [WebComponent](https://github.com/enzoaicardi/webcomponent/tree/main/wiki/README.md)

# Installations

The WebComponent layer is available as **ESModule / IIFE / Commonjs**.

## NPM Package

```bash
npm install @enzoaicardi/webcomponent
```

```js
import { WebComponent } from "@enzoaicardi/webcomponent/client"; // client es module
import { WebComponent } from "@enzoaicardi/webcomponent/server"; // server es module

const WebComponent = require("@enzoaicardi/webcomponent/client"); // client commonjs modules
const WebComponent = require("@enzoaicardi/webcomponent/server"); // server commonjs modules
```

## CDN import

```js
// client es module
import { WebComponent } from "https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/esm/client.js";
// server es module
import { WebComponent } from "https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/esm/server.js";
```

```html
<!-- iife function execution -->
<script src="https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/iife/client.js"></script>
<script>
    // global object
    WebComponent;
</script>
```
