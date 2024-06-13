import { BufferAttribute, BufferGeometry, Points, ShaderMaterial } from 'three'
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
				//cube
				pos0[i * 3 + 0] = x - 4.5
				pos0[i * 3 + 1] = y - 4.5
				pos0[i * 3 + 2] = z - 4.5

				//chaos
				pos1[i * 3 + 0] = 40 * Math.random() - 20
				pos1[i * 3 + 1] = 40 * Math.random() - 20
				pos1[i * 3 + 2] = 40 * Math.random() - 20

				// sphere
				const theta = (Math.PI * x) / 10
				const phi = (Math.PI * 2 * y) / 10
				const r = z

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

	const points = new Points(geo, getMat())
	globalContext.points = points
	globalContext.scene.add(points)

	globalContext.updateMap.set('points', () => {
		points.rotation.x += 0.005
		points.rotation.y += 0.005
	})
}

const getMat = () => {
	const uniforms = {
		pointSize: { value: 10 },
		step: { value: 0 },
	}

	globalContext.updateMap.set('step', (t: number) => {
		uniforms.step.value = (t % 9000) / 3000
	})

	const pointsMat = new ShaderMaterial({
		uniforms,
		vertexShader: `
            uniform float pointSize;
            uniform float step;

            attribute vec3 color;
            attribute vec3 position1;
            attribute vec3 position2;
            varying vec3 vColor;

			void main() {
                vColor = color;

                float a = 0.0;
                vec3 vPosition = position;

                if(step <= 1.0){
                    vPosition = mix(position, position1, step);
                }else if( step <= 2.0){
                    vPosition = mix(position1, position2, step - 1.0);
                }else {
                    vPosition = mix(position2, position, step - 2.0);
                }
				vec4 mvPosition = modelViewMatrix * vec4( vPosition, 1.0 );

				gl_PointSize = pointSize * ( 10.0 / -mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}`,
		fragmentShader: `
            varying vec3 vColor;

            void main() {
                float len = distance( gl_PointCoord, vec2(0.5,0.5));
                if(len>= 0.5){
                    discard;
                }
				gl_FragColor = vec4(vColor,1.0 );
			}`,
	})

	return pointsMat
}
