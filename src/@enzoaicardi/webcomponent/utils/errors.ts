import { WebComponentCore } from "../core";

type WebComponent = ReturnType<typeof WebComponentCore>;

/** @internal */
export class MissingTagName extends Error {
    constructor(definition: WebComponent) {
        super(`[${definition.name}] Missing static property tagName.`);
        this.name = "MissingTagName";
    }
}

/** @internal */
export class MissingRenderingMethod extends Error {
    constructor(definition: WebComponent) {
        super(
            `[${definition.name} ${definition.tagName}] Cannot render component without rendering method (render | renderAsync).`
        );
        this.name = "MissingRenderingMethod";
    }
}

/** @internal */
export class UnauthorizedCoercion extends Error {
    constructor(definition: WebComponent) {
        super(
            `[${definition.name} ${definition.tagName}] Unauthorized implicit coercion without synchronous rendering. Use toString instead.`
        );
        this.name = "UnauthorizedCoercion";
    }
}
