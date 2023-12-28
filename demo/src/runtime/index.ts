import {
  BlinnPhongMaterial,
  Camera,
  MeshRenderer,
  PrimitiveMesh,
  Vector3,
  WebGLEngine,
} from '@galacean/engine'
import { OrbitControl } from '@galacean/engine-toolkit-controls'
import { loadGLTF } from './gltf'
import { loadEnv } from './env'

export async function createRuntime() {
  const engine = await WebGLEngine.create({
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
  })

  engine.canvas.resizeByClientSize()
  const scene = engine.sceneManager.activeScene
  const rootEntity = scene.createRootEntity()

  // scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
  // scene.ambientLight.diffuseIntensity = 1.2;

  // init camera
  const cameraEntity = rootEntity.createChild('camera')
  cameraEntity.addComponent(Camera)
  cameraEntity.addComponent(OrbitControl)

  const pos = cameraEntity.transform.position
  pos.set(10, 10, 10)
  cameraEntity.transform.position = pos
  cameraEntity.transform.lookAt(new Vector3(0, 0, 0))

  // init light
  scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1)
  scene.ambientLight.diffuseIntensity = 1.2

  // init cube
  const cubeEntity = rootEntity.createChild('cube')
  const renderer = cubeEntity.addComponent(MeshRenderer)
  const mtl = new BlinnPhongMaterial(engine)
  const color = mtl.baseColor
  color.r = 0.0
  color.g = 0.8
  color.b = 0.5
  color.a = 1.0
  renderer.mesh = PrimitiveMesh.createCuboid(engine)
  renderer.setMaterial(mtl)

  await loadEnv(engine)
  await loadGLTF(engine)

  engine.run()

  // for galacean-devtools
  // @ts-expect-error global hook
  window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__ && window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.register(engine)
}
