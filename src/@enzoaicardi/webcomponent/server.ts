import { WebComponentCore } from "./core";
import { toCamelCase, toKebabCase } from "./utils/keys";

export class ServerWebComponent extends WebComponentCore() {
    /**
     * The ServerNamedNodeMap interface represents a collection of
     * attributes
     */
    attributes: ServerNamedNodeMap = new ServerNamedNodeMap();

    /**
     * Allows for manipulation of element's class content attribute
     * as a set of whitespace-separated tokens through a
     * ServerDOMTokenList object.
     */
    classList: ServerDOMTokenList = new ServerDOMTokenList();

    /**
     * The read-only style property of the HTMLElement returns
     * the inline style of an element in the form of a live
     * ServerCSSStyleDeclaration object that contains a list
     * of all styles properties
     */
    style: ServerCSSStyleDeclaration = new ServerCSSStyleDeclaration();

    constructor() {
        super();
        this.attributes.class = this.classList;
        this.attributes.style = this.style;
    }

    /**
     * Sets the value of element's first attribute whose qualified
     * name is qualifiedName to value.
     */
    setAttribute(qualifiedName: string, value: unknown): void {
        if (qualifiedName === "class") {
            value = new ServerDOMTokenList(value as string);
            this.classList = value as ServerDOMTokenList;
        } else if (qualifiedName === "style") {
            value = new ServerCSSStyleDeclaration(value as string);
            this.style = value as ServerCSSStyleDeclaration;
        }

        this.attributes[qualifiedName] = value;
    }

    /**
     * Returns element's first attribute whose qualified name is
     * qualifiedName, and null if there is no such attribute otherwise.
     */
    getAttribute(qualifiedName: string): string | null {
        return this.attributes[qualifiedName] + "" || null;
    }

    /**
     * Returns true if element has an attribute whose qualified
     * name is qualifiedName, and false otherwise.
     */
    hasAttribute(qualifiedName: string): boolean {
        return !!this.attributes[qualifiedName];
    }

    /**
     * Removes element's first attribute whose qualified name
     * is qualifiedName.
     */
    removeAttribute(qualifiedName: string): void {
        delete this.attributes[qualifiedName];
    }
}

export class ServerNamedNodeMap implements Record<string, unknown> {
    [key: string]: unknown;

    *[Symbol.iterator](): Generator<
        { name: string; value: unknown },
        void,
        unknown
    > {
        for (const key in this) {
            yield { name: key, value: this[key] };
        }
    }
}

class ServerDOMTokenList extends Set<string> {
    constructor(className?: string) {
        super(className?.split(" "));
    }

    /** @ts-ignore */
    add(...tokens: string[]): void {
        tokens.forEach((token) => super.add(token));
    }

    remove(...tokens: string[]): void {
        tokens.forEach((token) => this.delete(token));
    }

    toggle(token: string, force?: boolean): boolean {
        const exist = force != null ? !force : this.has(token);
        this[exist ? "delete" : "add"](token);
        return !exist;
    }

    replace(oldToken: string, newToken: string) {
        if (this.has(oldToken)) {
            this.delete(oldToken);
            this.add(newToken);
        }
    }

    item(token: string): number {
        return [...this].indexOf(token);
    }

    contains = this.has;

    get length(): number {
        return this.size;
    }

    get value(): string {
        return this[Symbol.toPrimitive]();
    }

    [Symbol.toPrimitive](): string {
        return Array.from(this).join(" ");
    }
}

type ServerCSSStyleDeclaration = {
    [key in keyof Omit<
        CSSStyleDeclaration,
        | "setProperty"
        | "getPropertyCSSValue"
        | "getPropertyPriority"
        | "getPropertyValue"
        | "item"
    >]?: unknown;
} & {
    length: number;
    cssText: string;
    parentRule: null;
    removeProperty(property: string): void;
    [Symbol.toPrimitive](): string;
};

function ServerCSSStyleDeclaration(cssRules?: string) {
    if (cssRules) {
        cssRules
            .split(";")
            .map((rule) => rule.split(":"))
            .forEach(([rule, value]) => {
                value && (this[toCamelCase(rule)] = value);
            });
    }
}

const ServerCSSStyleDeclarationPrototype = {
    [Symbol.toPrimitive](): string {
        let style = "";
        for (const key in this) {
            style += toKebabCase(key) + ":" + this[key] + ";";
        }
        return style;
    },
};

Object.defineProperties(ServerCSSStyleDeclarationPrototype, {
    parentRule: {
        value: null,
    },

    length: {
        get(): number {
            return Object.keys(this).length;
        },
    },

    cssText: {
        get(): string {
            return this[Symbol.toPrimitive]();
        },
    },

    removeProperty: {
        value(property: string): void {
            delete this[toCamelCase(property)];
        },
    },
});

ServerCSSStyleDeclaration.prototype =
    ServerCSSStyleDeclarationPrototype as ServerCSSStyleDeclaration;
