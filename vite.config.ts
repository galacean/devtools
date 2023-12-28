import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // minify: false,
    sourcemap: true,
    outDir: 'chrome-extension/bundle',
    rollupOptions: {
      input: {
        agent: fileURLToPath(new URL('./src/agent/index.js', import.meta.url)),
        ui: fileURLToPath(new URL('./src/ui/index.jsx', import.meta.url)),
      },
      output: {
        entryFileNames: `[name].js`,
        // 防止 message-type.js 被打包成 chunk
        // 失败了
        // manualChunks: {},
        // manualChunks: () => 'app',
        // chunkFileNames: `[name].js`,
        // assetFileNames: `[name].[ext]`,
      },
    },
  },
  // 试了没用，打包还是很慢
  // optimizeDeps: {
  //   include: ['antd', '@ant-design/icons'],
  // },
});
