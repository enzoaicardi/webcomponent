class t{static raw=Symbol();static t=Symbol();static i=Symbol()}class s extends Error{constructor(t){super(`[${t.name}] Missing static property tagName.`),this.name="MissingTagName"}}class i extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Cannot render component without rendering method (render | renderAsync).`),this.name="MissingRenderingMethod"}}class r extends Error{constructor(t){super(`[${t.name} ${t.tagName}] Unauthorized implicit coercion without synchronous rendering. Use toString instead.`),this.name="UnauthorizedCoercion"}}class e{static tagName;attrs=new Map;[t.i]=Object.getPrototypeOf(this).constructor;[t.raw](i){const r=this[t.i].tagName;if(r){return`<${r}${this.attrs?Object.entries(this.attrs).reduce(((t,[s,i])=>t+(/[^:.\w_-]/.test(s)?"":` ${s}="${i}"`)),""):""}>${i}</${r}>`}throw new s(this[t.i])}toString(){if(this.render)return this[t.raw](this.render());if(this.renderAsync)return this.renderAsync().then((s=>this[t.raw](s)));throw new i(this[t.i])}[Symbol.toPrimitive](){if(this.render)return this[t.raw](this.render());throw new r(this[t.i])}}class n extends e{}export{n as WebComponent};
