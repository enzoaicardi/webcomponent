# sanitize

To guarantee the security of your application, you don't want a user to be able to inject HTML code directly into your components, `sanitize` is an utility used to escape these HTML special characters.

It can be used for both textual content and attribute values.

```ts
import { sanitize } from "@enzoaicardi/webcomponent";

const userInput = `<script>alert('XSS')</script>`;
const safeInput = sanitize(userInput);

console.log(safeInput);
// result: `&lt;script&gt;alert(&#039;XSS&#039;)&lt;/script&gt;`
```

# Next

[isClient & isServer](./env.md)
