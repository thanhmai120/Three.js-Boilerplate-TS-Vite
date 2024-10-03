import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const stats = new Stats()
// stats.showPanel(1)
document.body.appendChild(stats.dom)

const gui = new GUI()
const cube_folder = gui.addFolder("Cube")
cube_folder.add(cube.rotation, "x", 0, Math.PI*2)
cube_folder.add(cube.rotation, "y", 0, Math.PI*2)
cube_folder.add(cube.rotation, "z", 0, Math.PI*2)

const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 20)
cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)
  // stats.begin()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  // stats.end()
  renderer.render(scene, camera)
  stats.update()
}

animate()