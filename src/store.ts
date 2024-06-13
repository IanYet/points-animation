import { PerspectiveCamera, Points, Scene, WebGLRenderer } from 'three'

type Context = {
	camera: PerspectiveCamera
	renderer: WebGLRenderer
	scene: Scene
	points?: Points
	updateMap: Map<string, () => any>
}

const renderer = new WebGLRenderer({ antialias: true })
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

export const globalContext: Context = { camera, renderer, scene, updateMap: new Map() }
