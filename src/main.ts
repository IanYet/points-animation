// console.log('hello')
import './style.css'

import { initScene } from './scene'
import { initEvents } from './events'
import { initPoints } from './points'

async function main() {
	const el = document.getElementById('app')!
	initScene(el)
	initPoints()
	initEvents()
}

main()
