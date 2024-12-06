import {
    createRawComponent,
    renderRawComponent,
    toPrimitiveComponent,
} from "./shared";
import { Symbols } from "./symbols";

export class ServerWebComponent {
    /** @type {string} The element <tag-name> */
    static tagName: string;

    /**
     * Constructor method used to create a ServerWebComponent instance
     */
    constructor() {}

    /** @internal */
    [Symbols.raw] = renderRawComponent;

    /** @internal */
    [Symbols.definition]: typeof ServerWebComponent =
        Object.getPrototypeOf(this).constructor;

    /** @type {Object<string, string> | undefined} The customElement attributes */
    attrs?: Record<string, string>;

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
