export const isServer: boolean = typeof document === "undefined";
export const isClient: boolean = !isServer;

interface AnonymousConstructor extends Function {
    new (): any;
    prototype: {};
}

export const WebComponentConnector: AnonymousConstructor | typeof HTMLElement =
    isServer ? class {} : HTMLElement;

/** @internal */
export const templateElement: HTMLTemplateElement | null = isServer
    ? null
    : document.createElement("template");

/**
 * TODO :
 * - html`` doit rendre une Promise<string>
 * - ce doit aussi etre le type de retour de render
 * - du coup connectedCallBack est asynchrone aussi = retourne une Promise<HTMLElement>
 *  - permet .then(component => ...)
 * - createElement doit quand à elle être synchrone car elle retourne juste le constructeur
 *  - puis [Symbol.toprimitive] doit être asynchrone et await le this.render
 * - cela devrait permettre une intégration sans effort des composants asynchrones
 */

export async function createAsyncTemplateLiteral(
    strings: TemplateStringsArray,
    ...values: any[]
): Promise<string> {
    let result = "";
    let i = 0;
    for (; i < strings.length - 1; i++) {
        let value = values[i] instanceof Promise ? await values[i] : values[i];
        result += strings[i] + value;
    }
    return result + strings[i];
}
