# Oasis DevTools

## Development

1. `pnpm i`
1. `pnpm build`
1. open [chrome://extensions](chrome://extensions) and load unpacked extension located at `chrome-extension`

## Usage

手动注册 `WebGLEngine` 实例

```js
const engine = new WebGLEngine("canvas");
window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__ &&
  window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.register(engine);
```
