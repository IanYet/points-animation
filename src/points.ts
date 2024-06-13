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

				pos0[i * 3 + 0] = x - 4.5
				pos0[i * 3 + 1] = y - 4.5
				pos0[i * 3 + 2] = z - 4.5

				colors[i * 3 + 0] = (x + 1) / 11
				colors[i * 3 + 1] = (y + 1) / 11
				colors[i * 3 + 2] = (z + 1) / 11
				++i
			}
		}
	}

	const geo = new BufferGeometry()
	geo.setAttribute('position', new BufferAttribute(pos0, 3))
	geo.setAttribute('color', new BufferAttribute(colors, 3))

	const mat = new PointsMaterial({
		vertexColors: true,
		size: 1,
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
