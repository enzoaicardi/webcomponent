import { Symbols } from "./symbols";
import {
    MissingRenderingMethod,
    MissingTagName,
    UnauthorizedCoercion,
} from "./errors";

export class WebComponentCore {
    /** @type {string} The element <tag-name> */
    public static tagName: string;

    /** Element attributes */
    attrs = new Map<string, any>();

    /** @internal */
    [Symbols.definition]: typeof WebComponentCore =
        Object.getPrototypeOf(this).constructor;

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

    /** @internal */
    [Symbols.raw](raw: string): string {
        const tagName = this[Symbols.definition]["tagName"];

        if (tagName) {
            const attributes = this.attrs
                ? Object.entries(this.attrs).reduce(
                      (acc, [key, value]) =>
                          acc +
                          (/[^:.\w_-]/.test(key) ? "" : ` ${key}="${value}"`),
                      ""
                  )
                : "";

            return `<${tagName}${attributes}>${raw}</${tagName}>`;
        } else {
            throw new MissingTagName(this[Symbols.definition]);
        }
    }

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
