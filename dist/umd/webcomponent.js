!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).t={})}(this,(function(t){"use strict";class e extends Error{constructor(t){super(t)}}class s extends e{constructor(t,e){super(`Missing property ${t} on ${e.name}`),this.name="PropertyRequiredError"}}const i="undefined"==typeof document,n=!i,r=i?class{}:HTMLElement,o=i?null:document.createElement("template"),c=new Set,h=t=>{if(n&&t){if(!t.tagName)throw new s("static tagName",t);c.has(t)||(c.add(t),customElements.define(t.tagName,t))}},a=(t,e,s)=>`<${e}${s?Object.entries(s).reduce(((t,[e,s])=>t+` ${e}="${s}"`),""):""}>${t}</${e}>`;class f{static i=Symbol();static o=Symbol()}class u extends r{static tagName;static define=h;static createElement(...t){return h(this),new this(...t)}static createRaw(...t){return h(this),new this(...t).toString()}properties;[f.o]=Object.getPrototypeOf(this).constructor;[f.i](t){const e=this,s=(t=>o?(o.innerHTML=t,o.content):null)(t),i=this.properties;if(i)for(const t in i)e.setAttribute(t,i[t]);s&&e.appendChild(s)}constructor(){super()}connectedCallback(){const t=this;if(!t.childNodes.length)if(this.render)this[f.i](this.render());else if(this.renderAsync)return this.renderAsync().then((e=>(this[f.i](e),t)));return Promise.resolve(t)}toString(){const t=this.properties,e=this[f.o],i=e.tagName;if(!i)throw new s("static tagName",e);if(this.render)return a(this.render(),i,t);if(this.renderAsync)return this.renderAsync().then((e=>a(e,i,t)));throw new s("render | renderAsync",e)}[Symbol.toPrimitive](){if(this.render)return a(this.render(),this[f.o].tagName,this.properties);throw new s("render",this[f.o])}}t.t=u,t.u=n,t.l=i}));
