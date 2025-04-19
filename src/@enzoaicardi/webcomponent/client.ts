import { HTMLElementInterface } from "./interface";
import { WebComponentCore } from "./core";

/** @internal */
const template = document.createElement("template");

export class ClientWebComponent extends WebComponentCore(HTMLElementInterface) {
    /** @type {string} The element <tag-name> */
    public static tagName: string;

    /**
     * Native custom element connectedCallback method
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements|MDN}
     * @returns {Promise<void>|void}
     */
    connectedCallback(): Promise<void> | void {
        // if the WebComponent is empty
        if (!this.childNodes.length) {
            // sync -> populate
            if (this.render) {
                populateComponent(this, this.render());
            }
            // async -> Promise -> populate
            else if (this.renderAsync) {
                return this.renderAsync().then((raw) =>
                    populateComponent(this, raw)
                );
            }
        }
    }
}

/** @internal */
function populateComponent(component: ClientWebComponent, raw: string): void {
    template.innerHTML = raw;
    const fragment = template.content;
    // set component childNodes
    component.appendChild(fragment);
}
