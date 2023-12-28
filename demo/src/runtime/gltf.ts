import { WebGLEngine, GLTFResource } from "@galacean/engine";



const gltfList = {
  fox: "https://gw.alipayobjects.com/os/bmw-prod/f40ef8dd-4c94-41d4-8fac-c1d2301b6e47.glb"
}

export async function loadGLTF(engine: WebGLEngine) {
  const gltfResource = await engine.resourceManager.load<GLTFResource>(gltfList.fox);
  const { defaultSceneRoot } = gltfResource;

  const rootEntity = engine.sceneManager.activeScene.createRootEntity();
  rootEntity.addChild(defaultSceneRoot);
  defaultSceneRoot.transform.scale.set(0.08, 0.08, 0.08);
  defaultSceneRoot.transform.position.set(0, 0, 0);
}
