import { MissingTagName } from "./errors";
import {
    createRawComponent,
    renderRawComponent,
    toPrimitiveComponent,
} from "./shared";
import { Symbols } from "./symbols";

type ClientWebComponentConstructor = Required<typeof ClientWebComponent> &
    CustomElementConstructor;

/** @internal */
const template = document.createElement("template");

/** @internal */
const registry = new Set<ClientWebComponentConstructor>();

export class ClientWebComponent extends HTMLElement {
    /** @type {string} The element <tag-name> */
    public static tagName: string;

    /**
     * Defines a customElement in window's CustomElementRegistry
     * @param {ClientWebComponentConstructor|undefined} definition WebComponent subclass definition
     */
    public static define(definition: ClientWebComponentConstructor = this) {
        if (definition.tagName) {
            if (!registry.has(definition)) {
                registry.add(definition);
                customElements.define(definition.tagName, definition);
            }
        } else {
            throw new MissingTagName(this);
        }
    }

    /**
     * Constructor method used to create a ClientWebComponent instance
     */
    constructor(definition: ClientWebComponentConstructor) {
        ClientWebComponent.define(definition);
        super();
    }

    /** @internal */
    [Symbols.raw] = renderRawComponent;

    /** @internal */
    [Symbols.definition]: typeof ClientWebComponent =
        Object.getPrototypeOf(this).constructor;

    /** @internal */
    [Symbols.populate](raw: string): void {
        template.innerHTML = raw;
        const fragment = template.content;
        const attrs = this.attrs;
        // set component attributes
        if (attrs) {
            for (const key in attrs) {
                this.setAttribute(key, attrs[key]);
            }
        }
        // set component childNodes
        this.appendChild(fragment);
    }

    /** @type {Object<string, string> | undefined} The customElement attributes */
    attrs?: Record<string, string>;

    /**
     * Native custom element connectedCallback method
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements|MDN}
     * @returns {Promise<void>|void}
     */
    connectedCallback(): Promise<void> | void {
        // if the WebComponent is empty
        if (!this.childNodes.length) {
            // sync -> populate
            if (this.render) {
                this[Symbols.populate](this.render());
            }
            // async -> Promise -> populate
            else if (this.renderAsync) {
                return this.renderAsync().then((raw) =>
                    this[Symbols.populate](raw)
                );
            }
        }
    }

    /**
     * Method used to define the content of a WebComponent
     * @returns {string}
     */
    render?(): string;

    /**
     * Method used to define the content of a WebComponent
     * @returns {Promise<string>}
     */
    renderAsync?(): Promise<string>;

    /**
     * Method used to return the string representation of the WebComponent
     * @returns {string}
     */
    toString = createRawComponent;

    /**
     * Method used to return the primitive representation of the WebComponent
     * @returns {string}
     */
    [Symbol.toPrimitive] = toPrimitiveComponent;
}
