import { WebComponentCore } from "./shared";

const nodes = Symbol();

const toKebabCase = (string: string) =>
    string.replace(/([A-Z])/g, "-$1").toLowerCase();

export class ServerWebComponent extends WebComponentCore {
    attributes = new ServerNamedNodeMap();
    classList = new ServerClassList();
    dataset = new Proxy<ServerNamedNodeMap>(this.attributes, ServerDataSet);
    style: typeof ServerStylePrototype = new ServerStyle();

    constructor() {
        super();
        this.attributes[nodes].class = this.classList;
        this.attributes[nodes].style = this.style;
    }

    setAttribute(qualifiedName: string, value: unknown): void {
        if (qualifiedName === "class") {
            value = new ServerClassList(value as string);
            this.classList = value as ServerClassList;
        } else if (qualifiedName === "style") {
            value = new ServerStyle(value as string);
            this.style = value as typeof ServerStylePrototype;
        }

        this.attributes[nodes][qualifiedName] = value;
    }

    getAttribute(qualifiedName: string): string {
        return this.attributes[nodes][qualifiedName] + "";
    }

    hasAttribute(qualifiedName: string): boolean {
        return !!this.attributes[nodes][qualifiedName];
    }

    removeAttribute(qualifiedName: string): void {
        delete this.attributes[nodes][qualifiedName];
    }
}

export class ServerNamedNodeMap {
    [nodes]: Record<string, unknown> = {};
    [key: string]: unknown;

    *[Symbol.iterator]() {
        for (const key in this[nodes]) {
            yield { name: key, value: this[nodes][key] };
        }
    }
}

export class ServerClassList {
    [nodes] = new Set<string>();

    constructor(className?: string) {
        if (className) {
            this.add(...className.split(" "));
        }
    }

    add(...tokens: string[]): void {
        tokens.forEach((token) => this[nodes].add(token));
    }

    remove(...tokens: string[]): void {
        tokens.forEach((token) => this[nodes].delete(token));
    }

    toggle(token: string, force?: boolean): void {
        const exist = force != null ? force : this[nodes].has(token);
        this[nodes][exist ? "delete" : "add"](token);
    }

    replace(oldToken: string, newToken: string) {
        if (this[nodes].has(oldToken)) {
            this[nodes].delete(oldToken);
            this[nodes].add(newToken);
        }
    }

    contains = this[nodes].has;

    [Symbol.toPrimitive](): string {
        return Array.from(this[nodes]).join(" ");
    }
}

export function ServerStyle(cssRules?: string) {
    if (cssRules) {
        cssRules
            .split(";")
            .map((rule) => rule.split(":"))
            .forEach(([rule, value]) => {
                value &&
                    (this[
                        rule.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase())
                    ] = value);
            });
    }
}

const ServerStylePrototype: { [key in keyof CSSStyleDeclaration]?: unknown } & {
    [Symbol.toPrimitive](): string;
} = {
    [Symbol.toPrimitive](): string {
        let style = "";
        for (const key in this) {
            style += toKebabCase(key) + ":" + this[key] + ";";
        }
        return style;
    },
};

ServerStyle.prototype = ServerStylePrototype;

export class ServerDataSet {
    static get(attributes: ServerNamedNodeMap, property: string): unknown {
        const name = toKebabCase(property);
        return attributes[nodes]["data-" + name];
    }

    static set(
        attributes: ServerNamedNodeMap,
        property: string,
        value: unknown
    ): boolean {
        const name = toKebabCase(property);
        attributes[nodes]["data-" + name] = value;
        return true;
    }
}
