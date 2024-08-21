/** @internal */
export const isServer = typeof document === "undefined";

interface AnonymousConstructor extends Function {
    new (): any;
    prototype: {};
}

export const WebComponentConnector: AnonymousConstructor | typeof HTMLElement =
    isServer ? class {} : HTMLElement;

/** @internal */
export const templateElement: HTMLTemplateElement | null = isServer
    ? null
    : document.createElement("template");
