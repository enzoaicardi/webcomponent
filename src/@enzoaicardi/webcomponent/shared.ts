import { Symbols } from "./symbols";
import { ClientWebComponent } from "./client";
import { ServerWebComponent } from "./server";
import {
    MissingRenderingMethod,
    MissingTagName,
    UnauthorizedCoercion,
} from "./errors";

type WebComponent = ClientWebComponent | ServerWebComponent;

export function renderRawComponent<T extends WebComponent>(
    this: T,
    raw: string
): string {
    const tagName = this[Symbols.definition]["tagName"];

    if (tagName) {
        const attributes = this.attrs
            ? Object.entries(this.attrs).reduce(
                  (acc, [key, value]) =>
                      acc + (/[^:.\w_-]/.test(key) ? "" : ` ${key}="${value}"`),
                  ""
              )
            : "";

        return `<${tagName}${attributes}>${raw}</${tagName}>`;
    } else {
        throw new MissingTagName(this[Symbols.definition]);
    }
}

export function createRawComponent<T extends WebComponent>(
    this: T
): string | Promise<string> {
    // sync -> string
    if (this.render) {
        return this[Symbols.raw](this.render());
    }
    // async -> Promise<string>
    else if (this.renderAsync) {
        return this.renderAsync().then((raw) => this[Symbols.raw](raw));
    } else {
        throw new MissingRenderingMethod(this[Symbols.definition]);
    }
}

export function toPrimitiveComponent<T extends WebComponent>(this: T): string {
    if (this.render) {
        return this[Symbols.raw](this.render());
    } else {
        throw new UnauthorizedCoercion(this[Symbols.definition]);
    }
}
