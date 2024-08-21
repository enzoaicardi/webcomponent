import { WebComponentConnector, isServer, templateElement } from "./utils";
import { Symbols } from "./symbols";

export class WebComponent extends WebComponentConnector {
    server: boolean = isServer;
    client: boolean = !isServer;
    /** @internal */
    [Symbols.args]: any[] = [];
    /** @internal */
    [Symbols.definition]: WebComponent =
        Object.getPrototypeOf(this).constructor;

    static tagName: string = "";
    /** @internal */
    static [Symbols.rendered]: string = "";
    /** @internal */
    static [Symbols.template]: DocumentFragment | null = null;
    /** @internal */
    static [Symbols.defined] = new Set<WebComponent>();

    static define(definition: any) {
        // csr only
        if (definition && !WebComponent[Symbols.defined].has(definition)) {
            WebComponent[Symbols.defined].add(definition);
            const tagName = definition.tagName;
            if (!isServer && tagName) {
                customElements.define(tagName, definition);
            }
        }
    }

    constructor(...args: any[]) {
        super();
        this[Symbols.args] = args;
    }

    connectedCallback(): HTMLElement {
        // csr only
        const self = this as unknown as HTMLElement;

        if (!self.childNodes.length) {
            const childNodesFragment = this[Symbols.childNodes]();
            if (childNodesFragment) {
                self.append(childNodesFragment);
            }
        }

        return self;
    }

    render(): string {
        // csr & ssr
        return "";
    }

    static createElement(...args: any[]): HTMLElement {
        if (!isServer) {
            WebComponent.define(this);
        }
        return new this(...args) as unknown as HTMLElement;
    }

    /** @internal */
    [Symbols.childNodes](): DocumentFragment | null {
        // csr only
        if (templateElement) {
            // get the rendered string
            const rendered: string = this.render();

            // compare to current memory value
            if (this[Symbols.definition][Symbols.rendered] === rendered) {
                // return the current document fragment
                return this[Symbols.definition][Symbols.template];
            } else {
                // append html to template element
                templateElement.innerHTML = rendered;

                // update the current rendered & document fragment
                this[Symbols.definition][Symbols.rendered] = rendered;
                this[Symbols.definition][Symbols.template] =
                    templateElement.content;

                return templateElement.content;
            }
        } else {
            return null;
        }
    }

    /** @internal */
    [Symbols.stringPrimitive](): string {
        // csr & ssr
        const tagName = this[Symbols.definition]["tagName"];
        return tagName && `<${tagName}>${this.render()}</${tagName}>`;
    }

    toString = this[Symbols.stringPrimitive];
    [Symbol.toPrimitive] = this[Symbols.stringPrimitive];
}
