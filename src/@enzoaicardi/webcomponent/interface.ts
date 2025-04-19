import { MissingTagName } from "./utils/errors";

export interface HTMLElementInterfaceConstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
}

/**
 * Class used to extend HTMLElement with automatic customElement definition
 */
export const HTMLElementInterface = function (this: HTMLElement) {
    // get current class constructor
    const definition = Object.getPrototypeOf(this).constructor;
    // check the static tagName property
    if (definition.tagName) {
        // define the related customElement
        if (!customElements.get(definition.tagName)) {
            customElements.define(definition.tagName, definition);
        }
    } else {
        throw new MissingTagName(definition);
    }
    return Reflect.construct(HTMLElement, [], new.target);
} as unknown as HTMLElementInterfaceConstructor;

HTMLElementInterface.prototype = HTMLElement.prototype;
HTMLElementInterface.prototype.constructor = HTMLElementInterface;
