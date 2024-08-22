# Installations

The WebComponent layer is available as **ESModule / IIFE / Commonjs**.

## NPM Package

```bash
npm install @enzoaicardi/webcomponent
```

```js
import { WebComponent } from "@enzoaicardi/webcomponent"; // es modules
const { WebComponent } = require("@enzoaicardi/webcomponent"); // commonjs modules
```

## CDN import

```js
// es modules
import { WebComponent } from "https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/esm/webcomponent.js";
```

```html
<!-- iife function execution -->
<script src="https://cdn.jsdelivr.net/npm/@enzoaicardi/webcomponent@latest/iife/webcomponent.js"></script>
<script>
    // global object destructuration
    const { WebComponent } = WebComponent;
</script>
```

---

# Next

[Create your first component](./create.md)
