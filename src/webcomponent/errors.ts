import { WebComponent } from "./element";

class WebComponentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WebComponentError";
    }
}

export class PropertyRequiredError extends WebComponentError {
    constructor(property: string, component: WebComponent) {
        super(`Missing property ${property} on ${component.constructor.name}`);
        this.name = "PropertyRequiredError";
    }
}
