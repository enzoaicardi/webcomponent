var WebComponent=function(t){"use strict";class e extends Error{constructor(t){super(t)}}class s extends e{constructor(t,e){super(`Missing property ${t} on ${e.name}`),this.name="PropertyRequiredError"}}const i="undefined"==typeof document,r=!i,n=i?class{}:HTMLElement,c=i?null:document.createElement("template"),o=new Set,h=t=>{if(r&&t){if(!t.tagName)throw new s("static tagName",t);o.has(t)||(o.add(t),customElements.define(t.tagName,t))}},a=(t,e,s)=>`<${e}${s?Object.entries(s).reduce(((t,[e,s])=>t+` ${e}="${s}"`),""):""}>${t}</${e}>`;class u{static t=Symbol();static i=Symbol()}class l extends n{static tagName;static define=h;static createElement(...t){return h(this),new this(...t)}static createRaw(...t){return h(this),new this(...t).toString()}properties;[u.i]=Object.getPrototypeOf(this).constructor;[u.t](t){const e=this,s=(t=>c?(c.innerHTML=t,c.content):null)(t),i=this.properties;if(i)for(const t in i)e.setAttribute(t,i[t]);s&&e.appendChild(s)}constructor(){super()}connectedCallback(){const t=this;if(!t.childNodes.length)if(this.render)this[u.t](this.render());else if(this.renderAsync)return this.renderAsync().then((e=>(this[u.t](e),t)));return Promise.resolve(t)}toString(){const t=this.properties,e=this[u.i],i=e.tagName;if(!i)throw new s("static tagName",e);if(this.render)return a(this.render(),i,t);if(this.renderAsync)return this.renderAsync().then((e=>a(e,i,t)));throw new s("render | renderAsync",e)}[Symbol.toPrimitive](){if(this.render)return a(this.render(),this[u.i].tagName,this.properties);throw new s("render",this[u.i])}}return t.h=l,t.u=r,t.l=i,t}({});
