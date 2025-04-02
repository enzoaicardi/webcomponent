"use strict";class t{static raw=Symbol();static t=Symbol();static i=Symbol()}class s extends Error{constructor(t){super(`[${t.name}] Missing static property tagName.`),this.name="MissingTagName"}}class e extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Cannot render component without rendering method (render | renderAsync).`),this.name="MissingRenderingMethod"}}class i extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Unauthorized implicit coercion without synchronous rendering. Use toString instead.`),this.name="UnauthorizedCoercion"}}class r{static tagName;[t.i]=Object.getPrototypeOf(this).constructor;[t.raw](e){const i=this[t.i].tagName;if(i){let t="";for(const{name:s,value:e}of this.attributes)e+""!=""&&(t+=/[^:.\w_-]/.test(s)?"":` ${s}="${e}"`);return`<${i}${t}>${e}</${i}>`}throw new s(this[t.i])}attributes;toString(){if(this.render)return this[t.raw](this.render());if(this.renderAsync)return this.renderAsync().then((s=>this[t.raw](s)));throw new e(this[t.i])}[Symbol.toPrimitive](){if(this.render)return this[t.raw](this.render());throw new i(this[t.i])}}const n=Symbol(),o=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();class h{[n]={};*[Symbol.iterator](){for(const t in this[n])yield{name:t,value:this[n][t]}}}class c{[n]=new Set;constructor(t){t&&this.add(...t.split(" "))}add(...t){t.forEach((t=>this[n].add(t)))}remove(...t){t.forEach((t=>this[n].delete(t)))}toggle(t,s){const e=null!=s?s:this[n].has(t);this[n][e?"delete":"add"](t)}replace(t,s){this[n].has(t)&&(this[n].delete(t),this[n].add(s))}contains=this[n].has;[Symbol.toPrimitive](){return Array.from(this[n]).join(" ")}}function a(t){t&&t.split(";").map((t=>t.split(":"))).forEach((([t,s])=>{s&&(this[t.replace(/-([a-z])/g,((t,s)=>s.toUpperCase()))]=s)}))}const u={[Symbol.toPrimitive](){let t="";for(const s in this)t+=o(s)+":"+this[s]+";";return t}};a.prototype=u;class l{static get(t,s){const e=o(s);return t[n]["data-"+e]}static set(t,s,e){const i=o(s);return t[n]["data-"+i]=e,!0}}exports.WebComponent=class extends r{attributes=new h;classList=new c;dataset=new Proxy(this.attributes,l);style=new a;constructor(){super(),this.attributes[n].class=this.classList,this.attributes[n].style=this.style}setAttribute(t,s){"class"===t?(s=new c(s),this.classList=s):"style"===t&&(s=new a(s),this.style=s),this.attributes[n][t]=s}getAttribute(t){return this.attributes[n][t]+""}hasAttribute(t){return!!this.attributes[n][t]}removeAttribute(t){delete this.attributes[n][t]}};
