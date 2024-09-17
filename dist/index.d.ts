declare module "webcomponent/symbols" { }
declare module "webcomponent/element" {
    import { SuperClass } from "webcomponent/utils";
    export class WebComponent extends SuperClass {
        /** @type {string} <Client|Server> the element <tag-name> */
        static tagName: string;
        /**
         * <Client> defines a custom element in window's CustomElementRegistry
         * @param {WebComponent} definition WebComponent subclass definition
         */
        static define: (definition: typeof WebComponent) => void;
        /**
         * <Client|Server> constructor method used to create a WebComponent instance
         */
        constructor();
        /**
         * <Client> native custom element connectedCallback method
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements|MDN}
         * @returns {HTMLElement | Promise<HTMLElement>}
         */
        connectedCallback(): Promise<HTMLElement>;
        render?(): string;
        renderAsync?(): Promise<string>;
        /**
         * <Client|Server> method used to return the string representation of the WebComponent
         * @returns {string|Promise<string>}
         */
        toString(): string | Promise<string>;
        /**
         * <Client|Server> method used to return the string representation of the WebComponent
         * @returns {string}
         */
        [Symbol.toPrimitive](): string;
    }
}
declare module "webcomponent/utils" {
    export const isServer: boolean;
    export const isClient: boolean;
    interface AnonymousClass extends Function {
        new (): any;
        prototype: {};
    }
    export const SuperClass: AnonymousClass | typeof HTMLElement;
}
declare module "webcomponent" {
    import { isClient, isServer } from "webcomponent/utils";
    import { WebComponent } from "webcomponent/element";
    export { WebComponent as WebComponent, isClient as isClient, isServer as isServer, };
}
