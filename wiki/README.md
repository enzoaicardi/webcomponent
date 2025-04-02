# WebComponent.js

The WebComponent library is designed to be both client- and server-side compatible.

It contains only static declarations, enabling code to be isolated when bundled with tools such as rollup.

It's an unopinionated library which leaves you free to choose how you want to manage reactivity, user inputs, and even the architecture of your web server.

## How to create a WebComponent ?

To write a web component you'll need two distinct parts: the server part and the client part.

These two parts are optional: if you don't want interactivity, you don't need a client part; conversely, if you don't want server-side-rendering, you can use only the client part.

In the example below, you have a button component that must be rendered on the server side and which receives a “disabled” attribute when it is added to the DOM :

```ts
// my-component.ts
import { WebComponent as ClientWebComponent } from "@enzoaicardi/webcomponent/client";
import { WebComponent as ServerWebComponent } from "@enzoaicardi/webcomponent/server";

// server part
class ButtonServer extends ServerWebComponent {
    static tagName = "my-button";
    content: string;

    constructor(content: string) {
        this.content = content;
    }

    render(): string {
        return /* html */ `<button>${content}</button>`;
    }
}

// client part
class ButtonClient extends ClientWebComponent {
    static tagName = "my-button";

    constructor() {
        super(client);
    }

    connectedCallback() {
        /* in case of client-side rendering */
        super.connectedCallback();
        /* --- */
        this.querySelector("button").setAttribute("disabled", true);
    }
}

export { ButtonClient, ButtonServer };
```

## Explanations

First, let's take a step-by-step look at the properties that the `client` and `server` classes have in common:

-   `static tagName` the component name in the DOM (must contain a “-”)
-   `attributes` an object `NamedNodeMap | ServerNamedNodeMap` containing the component's attributes (used during rendering)
-   `render()` the synchronous rendering method
-   `renderAsync()` the asynchronous rendering method
-   `toString()` the method for converting an instance into a character string (synchronous or asynchronous)
-   `[Symbol.toPrimitive]` implicit coercion

_`tagName` is the only mandatory property in this list_

Now here are the methods you'll find only in client components :

-   `static define()` the method for adding your component to the customElements registry
-   `async connectedCallback()` the native web component method that executes when a customElement is added to the DOM, here the method is asynchronous to allow client-side rendering to be processed with `render()` and `renderAsync()`

## How to organize the code?

As explained earlier it is an unopinionated library which leaves you free to choose how you want to manage your components.

But if we assume that you want both server-side rendering and client-side reactivity, you could have three separate files:

-   `client-bundle.ts`
-   `server-bundle.ts`
-   `components/my-component.ts`

```ts
// client-bundle.ts
import { ButtonClient as Button } from "./components/my-component.ts";
Button.define();
```

```ts
// server-bundle.ts
import { ButtonServer as Button } from "./components/my-component.ts";

// routing etc...
app.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                ${new Button("Hello world").toString()}
            </body>
        </html>
    `);
});
```

## Additional features

If you're rendering on the server side, you'll certainly need to ensure that your user inputs are risk-free to avoid security problems. On the client side, you'll certainly want to manage reactivity. But you may also want to manage asynchronous rendering of components.

For these specific needs, you are free to choose the best library for your requirements.

I've created several packages to meet these different needs, all of which can be used with or without the WebComponents library:

-   [`@enzoaicardi/reactivity`](https://github.com/enzoaicardi/reactivity) to manage reactivity with signals
-   [`@enzoaicardi/htmlspecialchars`](https://github.com/enzoaicardi/htmlspecialchars) to escape user input and avoid HTML injections
-   [`@enzoaicardi/pendingliteral`](https://github.com/enzoaicardi/pendingliteral) for template literals waiting for promise resolution
