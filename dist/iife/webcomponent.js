var WebComponent=function(t){"use strict";const s="undefined"==typeof document,e=!s,i=s?class{}:HTMLElement,n=s?null:document.createElement("template"),r=new Set,o=t=>{e&&t&&!r.has(t)&&(r.add(t),customElements.define(t.tagName,t))},c=(t,s)=>{if(s)return`<${s}>${t}</${s}>`;throw new Error};class h{static t=Symbol();static i=Symbol()}class u extends i{static tagName;static define=o;[h.i]=Object.getPrototypeOf(this).constructor;[h.t](t){const s=(t=>n?(n.innerHTML=t,n.content):null)(t);s&&this.appendChild(s)}constructor(){super(),e&&o(this[h.i])}connectedCallback(){const t=this;if(!t.childNodes.length)if(this.render)this[h.t](this.render());else if(this.h)return this.h().then((s=>(this[h.t](s),t)));return Promise.resolve(t)}toString(){const t=this[h.i].tagName;if(this.render)return c(this.render(),t);if(this.h)return this.h().then((s=>c(s,t)));throw new Error}[Symbol.toPrimitive](){if(this.render)return c(this.render(),this[h.i].tagName);throw new Error}}return t.u=u,t.l=e,t.m=s,t}({});
