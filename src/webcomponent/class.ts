import { WebComponentConnector, isServer, templateElement } from "./utils";
import { Symbols } from "./symbols";

export class WebComponent extends WebComponentConnector {
    /** @internal */
    [Symbols.args]: any[] = [];
    /** @internal */
    [Symbols.definition]: WebComponent =
        Object.getPrototypeOf(this).constructor;

    static tagName: string = "";
    /** @internal */
    static [Symbols.rendered]: string = "";
    /** @internal */
    static [Symbols.template]: DocumentFragment | null = null;
    /** @internal */
    static [Symbols.defined] = new Set<WebComponent>();

    /**
     * <Client> defines a custom element in window's CustomElementRegistry
     * @param {WebComponent} definition WebComponent subclass definition
     */
    static define(definition: any) {
        // csr only
        // executes only if the definition isn't already defined
        if (
            !isServer &&
            !!definition &&
            !WebComponent[Symbols.defined].has(definition)
        ) {
            // store definition as defined
            WebComponent[Symbols.defined].add(definition);
            const tagName = definition.tagName;
            // register the custom element in CustomElementsRegistry
            if (tagName) {
                customElements.define(tagName, definition);
            }
        }
    }

    /**
     * <Client|Server> method used to create a WebComponent instance
     * @param args arguments to pass to the WebComponent constructor
     * @returns {HTMLElement}
     */
    static createElement(...args: any[]): HTMLElement {
        if (!isServer) {
            // define the WebComponent subclass to prevent "Illegal constructor" errors
            WebComponent.define(this);
        }
        // return the current WebComponent subclass as HTMLElement
        return new this(...args) as unknown as HTMLElement;
    }

    /**
     * create a WebComponent
     */
    constructor(...args: any[]) {
        super();
        this[Symbols.args] = args;
    }

    /**
     * <Client> native custom element connectedCallback method
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements|MDN}
     * @returns {HTMLElement}
     */
    connectedCallback(): HTMLElement {
        // csr only
        // get the current WebComponent subclass as HTMLElement
        const self = this as unknown as HTMLElement;

        // if the WebComponent is empty
        if (!self.childNodes.length) {
            // get the childNodes fragment
            const childNodesFragment = this[Symbols.childNodes]();
            // if there is a fragment append the fragment as WebComponent child
            if (childNodesFragment) {
                self.append(childNodesFragment);
            }
        }

        // TypeScript concerns
        // return the current WebComponent subclass
        return self;
    }

    /**
     * <Client|Server> method used to represent the child content of a WebComponent
     * @returns {string}
     */
    render(): string {
        // csr & ssr
        return "";
    }

    /** @internal */
    [Symbols.childNodes](): DocumentFragment | null {
        // csr only
        if (templateElement) {
            // get the rendered string
            const rendered: string = this.render();

            // compare to current memory value
            if (this[Symbols.definition][Symbols.rendered] === rendered) {
                // return the current document fragment
                return this[Symbols.definition][Symbols.template];
            } else {
                // append html to template element
                templateElement.innerHTML = rendered;

                // update the current rendered & document fragment
                this[Symbols.definition][Symbols.rendered] = rendered;
                this[Symbols.definition][Symbols.template] =
                    templateElement.content;

                return templateElement.content;
            }
        } else {
            return null;
        }
    }

    /**
     * <Client|Server> method used to return the string representation of the WebComponent
     * @internal
     * @returns {string}
     */
    [Symbols.stringPrimitive](): string {
        // csr & ssr
        // get the WebComponent tagName
        const tagName = this[Symbols.definition]["tagName"];
        // build the string representation
        return tagName && `<${tagName}>${this.render()}</${tagName}>`;
    }

    toString = this[Symbols.stringPrimitive];
    [Symbol.toPrimitive] = this[Symbols.stringPrimitive];
}
