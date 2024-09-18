import { WebComponent } from "./element";
import { PropertyRequiredError } from "./errors";

export const isServer: boolean = typeof document === "undefined";
export const isClient: boolean = !isServer;

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
        }
        throw new PropertyRequiredError("static tagName", definition);
    }
};

/** @internal */
export const createRawComponent = (
    rawHTML: string,
    tagName: string
): string => {
    return `<${tagName}>${rawHTML}</${tagName}>`;
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
