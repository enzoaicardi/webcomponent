import { PropertyRequiredError } from "./errors";
import { Symbols } from "./symbols";
import {
    SuperClass,
    createFragmentComponent,
    createRawComponent,
    defineWebComponent,
} from "./utils";

export class WebComponent extends SuperClass {
    /** @type {string} <Client|Server> the element <tag-name> */
    static tagName: string;

    /**
     * <Client> defines a custom element in window's CustomElementRegistry
     * @param {WebComponent} definition WebComponent subclass definition
     */
    static define = defineWebComponent;

    /**
     * <Client|Server> method used to create a WebComponent instance
     * @param args arguments to pass to the WebComponent constructor
     * @returns {HTMLElement}
     */
    static createElement<T extends new (...args: any[]) => InstanceType<T>>(
        this: T,
        ...args: ConstructorParameters<T>
    ): HTMLElement {
        defineWebComponent(this as unknown as typeof WebComponent);
        return new this(...args) as unknown as HTMLElement;
    }

    /**
     * <Client|Server> shortcut used to create a WebComponent instance as string
     * @param args arguments to pass to the WebComponent constructor
     * @returns {string|Promise<string>}
     */
    static createRaw<T extends new (...args: any[]) => InstanceType<T>>(
        this: T,
        ...args: ConstructorParameters<T>
    ): string | Promise<string> {
        defineWebComponent(this as unknown as typeof WebComponent);
        return (new this(...args) as WebComponent).toString();
    }

    /** @type {Object<string, string> | undefined} <Client|Server> the element attributes */
    properties: Record<string, string> | undefined;

    /** @internal */
    [Symbols.definition]: typeof WebComponent =
        Object.getPrototypeOf(this).constructor;

    /** @internal */
    [Symbols.populate](rawHTML: string) {
        const self = this as unknown as HTMLElement;
        const fragment = createFragmentComponent(rawHTML);
        const properties = this.properties;
        // set component attributes
        if (properties) {
            for (const key in properties) {
                self.setAttribute(key, properties[key]);
            }
        }
        // set component childNodes
        if (fragment) {
            self.appendChild(fragment);
        }
    }

    /**
     * <Client|Server> constructor method used to create a WebComponent instance
     */
    constructor() {
        super();
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

    /**
     * <Client|Server> method used to define the content of a WebComponent
     * @returns {string}
     */
    render?(): string;

    /**
     * <Client|Server> method used to define the content of a WebComponent
     * @returns {Promise<string>}
     */
    renderAsync?(): Promise<string>;

    /**
     * <Client|Server> method used to return the string representation of the WebComponent
     * @returns {string|Promise<string>}
     */
    toString(): string | Promise<string> {
        const properties = this.properties;
        const definition = this[Symbols.definition];
        const tagName = definition.tagName;

        if (tagName) {
            // sync -> string
            if (this.render) {
                return createRawComponent(this.render(), tagName, properties);
            }
            // async -> Promise<string>
            else if (this.renderAsync) {
                return this.renderAsync().then((rawHTML) =>
                    createRawComponent(rawHTML, tagName, properties)
                );
            }
        } else {
            throw new PropertyRequiredError("static tagName", definition);
        }
        throw new PropertyRequiredError("render | renderAsync", definition);
    }

    /**
     * <Client|Server> method used to return the primitive representation of the WebComponent
     * @returns {string}
     */
    [Symbol.toPrimitive](): string {
        if (this.render) {
            return createRawComponent(
                this.render(),
                this[Symbols.definition]["tagName"],
                this.properties
            );
        }
        throw new PropertyRequiredError("render", this[Symbols.definition]);
    }
}
