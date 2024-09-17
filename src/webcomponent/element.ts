import { Symbols } from "./symbols";
import {
    SuperClass,
    createFragmentComponent,
    createRawComponent,
    defineWebComponent,
    isClient,
} from "./utils";

export class WebComponent extends SuperClass {
    /** @type {string} <Client|Server> the element <tag-name> */
    static tagName: string;

    /**
     * <Client> defines a custom element in window's CustomElementRegistry
     * @param {WebComponent} definition WebComponent subclass definition
     */
    static define = defineWebComponent;

    /** @internal */
    [Symbols.definition]: typeof WebComponent =
        Object.getPrototypeOf(this).constructor;

    /** @internal */
    [Symbols.populate](rawHTML: string) {
        const fragment = createFragmentComponent(rawHTML);
        if (fragment) {
            (this as unknown as HTMLElement).appendChild(fragment);
        }
    }

    /**
     * <Client|Server> constructor method used to create a WebComponent instance
     */
    constructor() {
        super();
        if (isClient) {
            // define the WebComponent subclass to prevent "Illegal constructor" errors
            defineWebComponent(this[Symbols.definition]);
        }
    }

    /**
     * <Client> native custom element connectedCallback method
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements|MDN}
     * @returns {HTMLElement | Promise<HTMLElement>}
     */
    connectedCallback(): Promise<HTMLElement> {
        // get the current WebComponent subclass as HTMLElement
        const self = this as unknown as HTMLElement;

        // if the WebComponent is empty
        if (!self.childNodes.length) {
            // sync -> continue
            if (this.render) {
                this[Symbols.populate](this.render());
            }
            // async -> Promise<HTMLElement>
            else if (this.renderAsync) {
                return this.renderAsync().then((rawHTML) => {
                    this[Symbols.populate](rawHTML);
                    return self;
                });
            }
        }

        // sync -> Promise<HTMLElement>
        return Promise.resolve(self);
    }

    render?(): string;
    renderAsync?(): Promise<string>;

    /**
     * <Client|Server> method used to return the string representation of the WebComponent
     * @returns {string|Promise<string>}
     */
    toString(): string | Promise<string> {
        const tagName = this[Symbols.definition]["tagName"];

        // sync -> string
        if (this.render) {
            return createRawComponent(this.render(), tagName);
        }
        // async -> Promise<string>
        else if (this.renderAsync) {
            return this.renderAsync().then((rawHTML) =>
                createRawComponent(rawHTML, tagName)
            );
        }
        // TODO throw custom error : "missing render method on component"
        throw new Error();
    }

    /**
     * <Client|Server> method used to return the string representation of the WebComponent
     * @returns {string}
     */
    [Symbol.toPrimitive](): string {
        if (this.render) {
            return createRawComponent(
                this.render(),
                this[Symbols.definition]["tagName"]
            );
        }
        // TODO throw custom error : "missing render method on component"
        throw new Error();
    }
}
