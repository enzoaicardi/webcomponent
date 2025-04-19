var WebComponent=function(t){"use strict";class e extends Error{constructor(t){super(`[${t.name}] Missing static property tagName.`),this.name="MissingTagName"}}class n extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Cannot render component without rendering method (render | renderAsync).`),this.name="MissingRenderingMethod"}}class s extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Unauthorized implicit coercion without synchronous rendering. Use toString instead.`),this.name="UnauthorizedCoercion"}}const i=function(){const t=Object.getPrototypeOf(this).constructor;if(!t.tagName)throw new e(t);return customElements.get(t.tagName)||customElements.define(t.tagName,t),Reflect.construct(HTMLElement,[],new.target)};function r(t,n){const s=t.definition.tagName;if(s){let e="";for(const{name:n,value:s}of t.attributes)s+""!=""&&(e+=/[^:.\w_-]/.test(n)?"":` ${n}="${s}"`);return`<${s}${e}>${n}</${s}>`}throw new e(t.definition)}(i.prototype=HTMLElement.prototype).constructor=i;const o=document.createElement("template");class c extends(function(t=class{}){return class extends t{static tagName;definition=Object.getPrototypeOf(this).constructor;toString(){if(this.render)return r(this,this.render());if(this.renderAsync)return this.renderAsync().then((t=>r(this,t)));throw new n(this.definition)}[Symbol.toPrimitive](){if(this.render)return r(this,this.render());throw new s(this.definition)}}}(i)){static tagName;connectedCallback(){if(!this.childNodes.length)if(this.render)h(this,this.render());else if(this.renderAsync)return this.renderAsync().then((t=>h(this,t)))}}function h(t,e){o.innerHTML=e;const n=o.content;t.appendChild(n)}return t.i=c,t}({});
