import { BufferAttribute, BufferGeometry, Points, PointsMaterial, ShaderMaterial } from 'three'
import { globalContext } from './store'

export function initPoints() {
	const num = 10 ** 3

	//cube
	const pos0 = new Float32Array(num * 3)
	//chaos
	const pos1 = new Float32Array(num * 3)
	//sphere
	const pos2 = new Float32Array(num * 3)
	//color
	const colors = new Float32Array(num * 3)

	let i = 0
	for (let x = 0; x < 10; ++x) {
		for (let y = 0; y < 10; ++y) {
			for (let z = 0; z < 10; ++z) {
				// const edge = [0, 9]
				// if (!edge.includes(x) && !edge.includes(y) && !edge.includes(z)) continue

				//cube
				pos0[i * 3 + 0] = x - 4.5
				pos0[i * 3 + 1] = y - 4.5
				pos0[i * 3 + 2] = z - 4.5

				//chaos
				pos1[i * 3 + 0] = 40 * Math.random() - 20
				pos1[i * 3 + 1] = 40 * Math.random() - 20
				pos1[i * 3 + 2] = 40 * Math.random() - 20

				// sphere
				const theta = (Math.PI * Math.random() * 9) / 10
				const phi = (Math.PI * 2 * Math.random() * 10) / 10
				const r = 5 * Math.random() ** (1 / 2)

				pos2[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi)
				pos2[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
				pos2[i * 3 + 2] = r * Math.cos(theta)

				colors[i * 3 + 0] = (x + 1) / 11
				colors[i * 3 + 1] = (y + 1) / 11
				colors[i * 3 + 2] = (z + 1) / 11
				++i
			}
		}
	}

	const geo = new BufferGeometry()
	geo.setAttribute('position', new BufferAttribute(pos0, 3))
	geo.setAttribute('position1', new BufferAttribute(pos1, 3))
	geo.setAttribute('position2', new BufferAttribute(pos2, 3))
	geo.setAttribute('color', new BufferAttribute(colors, 3))

	const mat = new PointsMaterial({
		vertexColors: true,
		size: 0.1,
	})

	const points = new Points(geo, mat)
	globalContext.points = points
	globalContext.scene.add(points)

	globalContext.updateMap.set('points', () => {
		points.rotation.x += 0.005
		points.rotation.y += 0.005
	})
}

const getMat = () => {
	const pointsMat = new ShaderMaterial({
		uniforms: {},
	})

	return pointsMat
}
