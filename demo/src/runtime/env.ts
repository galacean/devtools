import { AssetType, PrimitiveMesh, SkyBoxMaterial, WebGLEngine } from "@galacean/engine";

const envList = {
  sunset: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
  pisa: "https://gw.alipayobjects.com/os/bmw-prod/6470ea5e-094b-4a77-a05f-4945bf81e318.bin",
  foot_2K: "https://gw.alipayobjects.com/os/bmw-prod/23c1893a-fe29-4e91-bd6a-bb1c4201a876.bin"
};

export async function loadEnv(engine: WebGLEngine) {
  const skyMaterial = new SkyBoxMaterial(engine);
  const scene = engine.sceneManager.activeScene;

  scene.background.sky.material = skyMaterial;
  scene.background.sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

  return engine.resourceManager.load({
    type: AssetType.Env,
    url: envList['sunset'],
  }).then((env) => {

    scene.ambientLight = env
    skyMaterial.texture = env.specularTexture;
    skyMaterial.textureDecodeRGBM = true
  })
}
