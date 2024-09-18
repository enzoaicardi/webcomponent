import { WebComponent } from "./element";

/** @internal */
class WebComponentError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/** @internal */
export class PropertyRequiredError extends WebComponentError {
    constructor(property: string, component: typeof WebComponent) {
        super(`Missing property ${property} on ${component.name}`);
        this.name = "PropertyRequiredError";
    }
}
