import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

// ____________SCENE
// const sceneA = new THREE.Scene()
// // scene.background = new THREE.Color(0x123456)
// sceneA.background = new THREE.TextureLoader().load("https://sbcode.net/img/grid.png")

// const sceneB = new THREE.Scene()
// sceneB.background = new THREE.CubeTextureLoader()
//                   .setPath('https://sbcode.net/img/')
//                   .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
// sceneB.backgroundBlurriness = 0.3
// const sceneC = new THREE.Scene()
// sceneC.background = new THREE.Color(0xffe5ec)
const scene = new THREE.Scene()

// _________CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 2, 4)
camera.lookAt(0, 0.5, 0)

// const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, -5, 10)
// camera.position.set(1, 1, 1)
// camera.lookAt(0, 0.5, 0)

// ____RENDERER
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera) // render whenever the screen size changes
})

// __________ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {
  renderer.render(scene, camera) // render whenever the OrbitControls changes
})
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

// ______CUBE
const cube = new THREE.Mesh(geometry, material)
cube.position.y = 0.5

// ____________STAT
const stats = new Stats()
// stats.showPanel(1)
document.body.appendChild(stats.dom)

// _________ ADD BTNs SCENES
// let activeScene = sceneC
// const setScene = {
//   sceneA: () => {
//     activeScene = sceneA
//   },
//   sceneB: () => {
//     activeScene = sceneB
//   },
//   sceneC: () => {
//     activeScene = sceneC
//   },
// }

const gui = new GUI()
// gui.add(setScene, 'sceneA').name('Scene A')
// gui.add(setScene, 'sceneB').name('Scene B')
// gui.add(setScene, 'sceneC').name('Scene C')

const cube_folder = gui.addFolder("Cube")
cube_folder.add(cube.position, "y", 0, 20)
const cam_folder = gui.addFolder("Camera")
cam_folder.add(camera, "fov", 0, 180, 0.01).onChange(() => {
  camera.updateProjectionMatrix()
})
cam_folder.add(camera, "aspect", 0.0001, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cam_folder.add(camera, "near", 0.001, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cam_folder.add(camera, "far", 0.001, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
// cam_folder.add(camera, 'left', -10, 0).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cam_folder.add(camera, 'right', 0, 10).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cam_folder.add(camera, 'top', 0, 10).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cam_folder.add(camera, 'bottom', -10, 0).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cam_folder.add(camera, 'near', -5, 5).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cam_folder.add(camera, 'far', 0, 10).onChange(() => {
//   camera.updateProjectionMatrix()
// })
cam_folder.open()
cam_folder.add(camera.position, 'x', 0, 20)
cam_folder.add(camera.position, 'y', 0, 20)
cam_folder.add(camera.position, 'z', 0, 20)
// function animate() {
//   requestAnimationFrame(animate)
//   // stats.begin()
//   // cube.rotation.x += 0.01
//   // cube.rotation.y += 0.01
//   // stats.end()
//   activeScene.add(cube)
//   activeScene.add(new THREE.GridHelper())
//   renderer.render(activeScene, camera)
//   stats.update()
// }

// animate()
scene.add(cube)
renderer.render(scene, camera)