declare module "symbols" { }
declare module "utils" {
    interface AnonymousConstructor extends Function {
        new (): any;
        prototype: {};
    }
    export const WebComponentConnector: AnonymousConstructor | typeof HTMLElement;
}
declare module "webcomponent" {
    import { WebComponentConnector } from "utils";
    export class WebComponent extends WebComponentConnector {
        server: boolean;
        client: boolean;
        static tagName: string;
        static define(definition: any): void;
        constructor(...args: any[]);
        connectedCallback(): HTMLElement;
        render(): string;
        static createElement(...args: any[]): HTMLElement;
        toString: () => string;
        [Symbol.toPrimitive]: () => string;
    }
}
