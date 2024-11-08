import { WebComponent } from "./element";
import { PropertyRequiredError } from "./errors";

/** <Client|Server> constant indicating the execution environment */
export const isServer: boolean = typeof document === "undefined";
/** <Client|Server> constant indicating the execution environment */
export const isClient: boolean = !isServer;

/** @internal */
const HTMLRegex = /[&<>"'`]/g;

/** @internal */
const HTMLTable = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "`": "&#96;",
};

/** @internal */
const HTMLMatchTable = (match: string): string => HTMLTable[match];

/**
 * <Client|Server> function used to escape HTML special characters
 * @param {string} text the text to be sanitized
 * @returns {string} the sanitized text
 */
export const sanitize = (text: string): string => {
    return text.replace(HTMLRegex, HTMLMatchTable);
};

interface AnonymousClass extends Function {
    new (): any;
    prototype: {};
}

/**
 * <Client> HTMLElement
 * <Server> class {}
 */
export const SuperClass: AnonymousClass | typeof HTMLElement = isServer
    ? class {}
    : HTMLElement;

/** @internal */
export const templateElement: HTMLTemplateElement | null = isServer
    ? null
    : document.createElement("template");

/** @internal */
export const WebComponentRegistry = new Set<typeof WebComponent>();

/** @internal */
export const defineWebComponent = (definition: typeof WebComponent): void => {
    if (isClient && !!definition) {
        if (definition.tagName) {
            if (!WebComponentRegistry.has(definition)) {
                WebComponentRegistry.add(definition);
                customElements.define(definition.tagName, definition as any);
            }
        } else {
            throw new PropertyRequiredError("static tagName", definition);
        }
    }
};

/** @internal */
export const createRawComponent = (
    rawHTML: string,
    tagName: string,
    properties: Record<string, string> | undefined
): string => {
    const attributes = properties
        ? Object.entries(properties).reduce(
              (acc, [key, value]) =>
                  acc +
                  (/[^:.\w_-]/.test(key) ? "" : ` ${key}="${sanitize(value)}"`),
              ""
          )
        : "";
    return `<${tagName}${attributes}>${rawHTML}</${tagName}>`;
};

/** @internal */
export const createFragmentComponent = (
    rawHTML: string
): DocumentFragment | null => {
    if (templateElement) {
        // append html to template element
        templateElement.innerHTML = rawHTML;
        return templateElement.content;
    }
    return null;
};
