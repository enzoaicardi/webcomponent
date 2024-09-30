# Create your first WebComponent

First, let's create a [customElement](https://developer.mozilla.org/fr/docs/Web/API/Web_components/Using_custom_elements) in javascript, and define it.

```js
class MyComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log("hello world !");
    }
}

customElements.define("my-component", MyComponent);
```

Now we've created a customElement that displays “hello world!” in the browser's console when it detects the `my-component` tag in the DOM.

To make this component a WebComponent, we simply replace the parent class `HTMLElement` and the `customElements` keyword with `WebComponent`. We also need to add the `tagName` as a static class property, and we can remove it from the definition.

```js
import { WebComponent } from "@enzoaicardi/webcomponent";

class MyComponent extends WebComponent {
    static tagName = "my-component";

    constructor() {
        super();
    }
    connectedCallback() {
        console.log("hello world !");
    }
}

WebComponent.define(MyComponent);
```

And now we have a WebComponent that does the same thing as our customElement. But by doing this, our component has new methods:

-   `static createElement()`: contructor
-   `static createRaw()`: createElement & toString
-   `render()`: string
-   `renderAsync()`: Promise
-   `toString()`: render | renderAsync

---

# Next

[The rendering methods](./render.md)
