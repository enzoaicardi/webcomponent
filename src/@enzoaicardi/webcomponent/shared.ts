import { Symbols } from "./symbols";
import {
    MissingRenderingMethod,
    MissingTagName,
    UnauthorizedCoercion,
} from "./errors";
import { ServerNamedNodeMap } from "./server";

export const toKebabCase = (string: string) =>
    string.replace(/([A-Z])/g, "-$1").toLowerCase();

export const toCamelCase = (string: string) =>
    string.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase());

export class WebComponentCore {
    /** @type {string} The element <tag-name> */
    public static tagName: string;

    /** @internal */
    [Symbols.definition]: typeof WebComponentCore =
        Object.getPrototypeOf(this).constructor;

    /** @internal */
    [Symbols.raw](raw: string): string {
        const tagName = this[Symbols.definition]["tagName"];

        if (tagName) {
            let attributes = "";
            for (const { name, value } of this.attributes) {
                if (value + "" !== "") {
                    attributes += /[^:.\w_-]/.test(name)
                        ? ""
                        : ` ${name}="${value}"`;
                }
            }
            return `<${tagName}${attributes}>${raw}</${tagName}>`;
        } else {
            throw new MissingTagName(this[Symbols.definition]);
        }
    }

    /** Element attributes */
    attributes: ServerNamedNodeMap | NamedNodeMap;

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
    toString(): string | Promise<string> {
        // sync -> string
        if (this.render) {
            return this[Symbols.raw](this.render());
        }
        // async -> Promise<string>
        else if (this.renderAsync) {
            return this.renderAsync().then((raw) => this[Symbols.raw](raw));
        } else {
            throw new MissingRenderingMethod(this[Symbols.definition]);
        }
    }

    /**
     * Method used to return the primitive representation of the WebComponent
     * @returns {string}
     */
    [Symbol.toPrimitive](): string {
        if (this.render) {
            return this[Symbols.raw](this.render());
        } else {
            throw new UnauthorizedCoercion(this[Symbols.definition]);
        }
    }
}
