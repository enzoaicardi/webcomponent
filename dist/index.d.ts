declare module "@enzoaicardi/webcomponent/errors" { }
declare module "@enzoaicardi/webcomponent/symbols" { }
declare module "@enzoaicardi/webcomponent/element" {
    import { SuperClass } from "@enzoaicardi/webcomponent/utils";
    export class WebComponent extends SuperClass {
        /** @type {string} <Client|Server> the element <tag-name> */
        static tagName: string;
        /**
         * <Client> defines a custom element in window's CustomElementRegistry
         * @param {WebComponent} definition WebComponent subclass definition
         */
        static define: (definition: typeof WebComponent) => void;
        /**
         * <Client|Server> method used to create a WebComponent instance
         * @param args arguments to pass to the WebComponent constructor
         * @returns {HTMLElement}
         */
        static createElement<T extends new (...args: any[]) => InstanceType<T>>(this: T, ...args: ConstructorParameters<T>): HTMLElement;
        /**
         * <Client|Server> shortcut used to create a WebComponent instance as string
         * @param args arguments to pass to the WebComponent constructor
         * @returns {string|Promise<string>}
         */
        static createRaw<T extends new (...args: any[]) => InstanceType<T>>(this: T, ...args: ConstructorParameters<T>): string | Promise<string>;
        /** @type {Object<string, string> | undefined} <Client|Server> the element attributes */
        properties: Record<string, string> | undefined;
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
        /**
         * <Client|Server> method used to define the content of a WebComponent
         * @returns {string}
         */
        render?(): string;
        /**
         * <Client|Server> method used to define the content of a WebComponent
         * @returns {Promise<string>}
         */
        renderAsync?(): Promise<string>;
        /**
         * <Client|Server> method used to return the string representation of the WebComponent
         * @returns {string|Promise<string>}
         */
        toString(): string | Promise<string>;
        /**
         * <Client|Server> method used to return the primitive representation of the WebComponent
         * @returns {string}
         */
        [Symbol.toPrimitive](): string;
    }
}
declare module "@enzoaicardi/webcomponent/utils" {
    /** <Client|Server> constant indicating the execution environment */
    export const isServer: boolean;
    /** <Client|Server> constant indicating the execution environment */
    export const isClient: boolean;
    /**
     * <Client|Server> function used to escape HTML special characters
     * @param {string} text the text to be sanitized
     * @returns {string} the sanitized text
     */
    export const sanitize: (text: string) => string;
    interface AnonymousClass extends Function {
        new (): any;
        prototype: {};
    }
    /**
     * <Client> HTMLElement
     * <Server> class {}
     */
    export const SuperClass: AnonymousClass | typeof HTMLElement;
}
declare module "@enzoaicardi/webcomponent" {
    import { isClient, isServer, sanitize } from "@enzoaicardi/webcomponent/utils";
    import { WebComponent } from "@enzoaicardi/webcomponent/element";
    export { WebComponent as WebComponent, sanitize as sanitize, isServer as isServer, isClient as isClient, };
}
