const { writeFileSync } = require('fs');
const path = require('path');
const { build } = require('vite');
const { version } = require('../package.json');
const manifest = require('../chrome-extension/manifest.json');

async function buildExtension() {
  console.log(`Building venus-devtools version ${version}`);
  let validVersion = version;
  // 处理雨燕 dev 阶段版本号，比如可能长这样 0.0.9001561684-dev.3
  if (version.includes('dev')) {
    const [, sprintId, deployCount] = version.match(/(\d+)-dev\.(\d+)/);
    // 取 sprintId 的后三位，比如 684，然后拼接上 deployCount，比如 3，得到 6843
    validVersion =
      version.split(sprintId)[0] +
      sprintId.substr(sprintId.length - 3, sprintId.length) +
      deployCount;
    console.log('Dectected dev version, replace version to', validVersion);
  }
  writeFileSync(
    path.resolve(__dirname, '../chrome-extension/manifest.json'),
    JSON.stringify(
      {
        ...manifest,
        version: validVersion,
      },
      null,
      2,
    ),
  );
  await build();
}

buildExtension();
