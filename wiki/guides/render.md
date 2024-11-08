# The rendering methods

In this section we'll take a look at the `render` and `renderAsync` rendering methods.

The first thing to know is that these two methods must be implemented by the developer. Their purpose is to return a string (or a Promise that turns into string) in HTML format.

```js
import { WebComponent, sanitize } from "@enzoaicardi/webcomponent";

class MyComponent extends WebComponent {
    static tagName = "my-component";

    constructor(what = "HTML") {
        super();
        this.what = what;
    }
    render() {
        return `<p>This is ${sanitize(this.what)}</p>`;
    }
}
```

## On the client

By doing this, on the client when the `<my-component>` element is detected in the DOM, the WebComponent will add the HTML content `<p>This is HTML</p>` to it.

```html
<my-component></my-component>
<!-- becomes -->
<my-component>
    <p>This is HTML</p>
</my-component>
```

Namely, if a component detected in the DOM already has content (even a line break or a single space), no rendering method will be used.

## On the server

However, if you want to retrieve this content from the server, you can use the static `createRaw()` method, which will return the component as a string.

```js
const component = MyComponent.createRaw("string");
component === "<my-component><p>This is string</p></my-component>";
```

## connectedCallback

On the client, all rendering takes place in the `connectedCallback()` method of the `WebComponent` parent class. It is therefore imperative to use the `super.connectedCallback()` method if you wish to implement this same method on your component.

The `super.connectedCallback()` method returns a promise that is resolved when rendering is completed, whether with `render` or `renderAsync`. The return value is the component itself, but with type `HTMLElement` (useful for Typescript).

```js
class MyComponent extends WebComponent {
    static tagName = "my-component";

    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback().then((self) => console.log(self.innerHTML));
    }
    render() {
        return `<p>This is MyComponent</p>`;
    }
}
```

## Nested components

It is possible to render a component within another component (on both client and server) by using the static `createRaw()` method in the renderer.

```js
class MyComponent extends WebComponent {
    static tagName = "my-component";

    constructor() {
        super();
    }
    render() {
        return `
            <div>
                <h1>This is MyComponent</h1>
                ${ComponentB.createRaw(/* constructor params */)}
                ${ComponentC.createRaw(/* constructor params */)}
                ${ComponentD.createRaw(/* constructor params */)}
            </div>
        `;
    }
}
```

However, there is one restriction: an asynchronous component can contain synchronous components, but **the reverse is not possible** !

In general, for rendering asynchronous components I recommend the [pendingliteral](https://github.com/enzoaicardi/pendingliteral) library which will allow you to keep the same syntax.

## Syntax highlighting

For syntax highlighting there are VSCode extensions like [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) which allow this by preceding your string with `/* html */`.

I don't recommend using a [tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) in synchronous components for syntax highlighting because they are less performant than native template literals.

---

# Next

[Manage states and reactivity](./reactivity.md)
