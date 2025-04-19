import { ServerNamedNodeMap } from "./server";
import {
    MissingRenderingMethod,
    MissingTagName,
    UnauthorizedCoercion,
} from "./utils/errors";

/**
 *
 * @param baseClass
 * @returns
 */
export function WebComponentCore<Class extends new (...args: any[]) => {}>(
    baseClass: Class = class {} as Class
) {
    return class extends baseClass {
        /** @type {string} The element <tag-name> */
        public static tagName: string;

        /** Element attributes */
        attributes: ServerNamedNodeMap | NamedNodeMap;

        /** customElement class */
        definition = Object.getPrototypeOf(this).constructor;

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
                return createRawComponent(this, this.render());
            }
            // async -> Promise<string>
            else if (this.renderAsync) {
                return this.renderAsync().then((raw) =>
                    createRawComponent(this, raw)
                );
            } else {
                throw new MissingRenderingMethod(this.definition);
            }
        }

        /**
         * Method used to return the primitive representation of the WebComponent
         * @returns {string}
         */
        [Symbol.toPrimitive](): string {
            if (this.render) {
                return createRawComponent(this, this.render());
            } else {
                throw new UnauthorizedCoercion(this.definition);
            }
        }
    };
}

/** @internal */
function createRawComponent(
    component: InstanceType<ReturnType<typeof WebComponentCore>>,
    raw: string
): string {
    const tagName = component.definition["tagName"];

    if (tagName) {
        let attributes = "";
        for (const { name, value } of component.attributes) {
            if (value + "" !== "") {
                attributes += /[^:.\w_-]/.test(name)
                    ? ""
                    : ` ${name}="${value}"`;
            }
        }
        return `<${tagName}${attributes}>${raw}</${tagName}>`;
    } else {
        throw new MissingTagName(component.definition);
    }
}
