import { WebComponent } from "./element";

export const isServer: boolean = typeof document === "undefined";
export const isClient: boolean = !isServer;

interface AnonymousClass extends Function {
    new (): any;
    prototype: {};
}

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
    if (isClient && !!definition && !WebComponentRegistry.has(definition)) {
        WebComponentRegistry.add(definition);
        customElements.define(definition.tagName, definition as any);
    }
};

/** @internal */
export const createRawComponent = (
    rawHTML: string,
    tagName: string
): string => {
    if (tagName) {
        return `<${tagName}>${rawHTML}</${tagName}>`;
    }
    // TODO send custom error "missing tagName"
    throw new Error();
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
