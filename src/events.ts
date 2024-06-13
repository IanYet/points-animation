import { globalContext } from './store'

function onResize() {
	const { camera, renderer } = globalContext
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
}

export function initEvents() {
	window.addEventListener('resize', onResize)
}
