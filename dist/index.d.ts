// Generated by dts-bundle-generator v9.5.1

declare class ServerWebComponent {
	/** @type {string} The element <tag-name> */
	static tagName: string;
	/**
	 * Constructor method used to create a ServerWebComponent instance
	 */
	constructor();
	/** @type {Object<string, string> | undefined} The customElement attributes */
	attrs?: Record<string, string>;
	/**
	 * Method used to define the content of a WebComponent
	 * @returns {string}
	 */
	render?(): string;
	/**
	 * Method used to define the content of a WebComponent
	 * @returns {Promise<string>}
	 */
	renderAsync?(): Promise<string>;
	/**
	 * Method used to return the string representation of the WebComponent
	 * @returns {string}
	 */
	toString: typeof createRawComponent;
	/**
	 * Method used to return the primitive representation of the WebComponent
	 * @returns {string}
	 */
	[Symbol.toPrimitive]: typeof toPrimitiveComponent;
}
export type WebComponent = ClientWebComponent | ServerWebComponent;
declare function createRawComponent<T extends WebComponent>(this: T): string | Promise<string>;
declare function toPrimitiveComponent<T extends WebComponent>(this: T): string;
export type ClientWebComponentConstructor = Required<typeof ClientWebComponent> & CustomElementConstructor;
declare class ClientWebComponent extends HTMLElement {
	/** @type {string} The element <tag-name> */
	static tagName: string;
	/**
	 * Defines a customElement in window's CustomElementRegistry
	 * @param {ClientWebComponentConstructor|undefined} definition WebComponent subclass definition
	 */
	static define(definition?: ClientWebComponentConstructor): void;
	/**
	 * Constructor method used to create a ClientWebComponent instance
	 */
	constructor(definition: ClientWebComponentConstructor);
	/** @type {Object<string, string> | undefined} The customElement attributes */
	attrs?: Record<string, string>;
	/**
	 * Native custom element connectedCallback method
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements|MDN}
	 * @returns {Promise<void>|void}
	 */
	connectedCallback(): Promise<void> | void;
	/**
	 * Method used to define the content of a WebComponent
	 * @returns {string}
	 */
	render?(): string;
	/**
	 * Method used to define the content of a WebComponent
	 * @returns {Promise<string>}
	 */
	renderAsync?(): Promise<string>;
	/**
	 * Method used to return the string representation of the WebComponent
	 * @returns {string}
	 */
	toString: typeof createRawComponent;
	/**
	 * Method used to return the primitive representation of the WebComponent
	 * @returns {string}
	 */
	[Symbol.toPrimitive]: typeof toPrimitiveComponent;
}

export {
	ClientWebComponent as client,
	ServerWebComponent as server,
};

export {};
