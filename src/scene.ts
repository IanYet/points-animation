import { globalContext } from './store'

export const initScene = (el: HTMLElement) => {
	const { camera, renderer } = globalContext
	el.appendChild(renderer.domElement)
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setAnimationLoop(animate)

	camera.position.set(0, 0, 20)
	camera.lookAt(0, 0, 0)
}

function animate() {
	const { camera, renderer, scene, updateMap } = globalContext

	for (let update of updateMap.values()) {
		update()
	}
	renderer.render(scene, camera)
}
