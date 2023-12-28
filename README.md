# Galacean DevTools

## Development

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
pnpm start:firefox
```

`web-ext` auto reload the extension when `extension/` files changed.

> While Vite handles HMR automatically in the most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommanded for cleaner hard reloading.

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to appropriate extension store.

---

## Usage

手动注册 `WebGLEngine` 实例

```js
const engine = new WebGLEngine('canvas')
window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__
&& window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.register(engine)
```
