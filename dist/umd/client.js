!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).t={})}(this,(function(t){"use strict";class e extends Error{constructor(t){super(`[${t.name}] Missing static property tagName.`),this.name="MissingTagName"}}class s extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Cannot render component without rendering method (render | renderAsync).`),this.name="MissingRenderingMethod"}}class i extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Unauthorized implicit coercion without synchronous rendering. Use toString instead.`),this.name="UnauthorizedCoercion"}}class n{static raw=Symbol();static i=Symbol();static o=Symbol()}class o{static tagName;[n.o]=Object.getPrototypeOf(this).constructor;[n.raw](t){const s=this[n.o].tagName;if(s){let e="";for(const{name:t,value:s}of this.attributes)s+""!=""&&(e+=/[^:.\w_-]/.test(t)?"":` ${t}="${s}"`);return`<${s}${e}>${t}</${s}>`}throw new e(this[n.o])}attributes;toString(){if(this.render)return this[n.raw](this.render());if(this.renderAsync)return this.renderAsync().then((t=>this[n.raw](t)));throw new s(this[n.o])}[Symbol.toPrimitive](){if(this.render)return this[n.raw](this.render());throw new i(this[n.o])}}const r=document.createElement("template");class c extends HTMLElement{static tagName;static define(t=this){if(!t.tagName)throw new e(t);customElements.get(t.tagName)||customElements.define(t.tagName,t)}constructor(t){c.define(t),super()}[n.o]=Object.getPrototypeOf(this).constructor;[n.raw]=o.prototype[n.raw];[n.i](t){r.innerHTML=t;const e=r.content;this.appendChild(e)}connectedCallback(){if(!this.childNodes.length)if(this.render)this[n.i](this.render());else if(this.renderAsync)return this.renderAsync().then((t=>this[n.i](t)))}toString=o.prototype.toString;[Symbol.toPrimitive]=o.prototype[Symbol.toPrimitive]}t.t=c}));
