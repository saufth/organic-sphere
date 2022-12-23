// Components
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { vertexShader, fragmentShader } from '../../modules/animation/shaders/sphere/'
import { useRef } from 'react'
import { ShaderMaterial } from 'three'
import { folder, useControls } from 'leva'

const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uDistortionFrecuency: 0,
    uDistortionStrength: 0,
    uDisplacementFrecuency: 0,
    uDisplacementStrength: 0,
    uTimeFrecuency: 0
  },
  vertexShader,
  fragmentShader
)

extend({ WaveShaderMaterial })

const WaveShader = () => {
  const shaderRef = useRef<ShaderMaterial>()

  const {
    distortionFrecuency,
    distortionStrength,
    displacementFrecuency,
    displacementStrength,
    timeFrecuency
  } = useControls('Sphere', {
    transform: folder({
      distortionFrecuency: {
        value: 0.31,
        min: 0,
        max: 10,
        step: 0.001
      },
      distortionStrength: {
        value: 10,
        min: 0,
        max: 10,
        step: 0.001
      },
      displacementFrecuency: {
        value: 0.80,
        min: 0,
        max: 10,
        step: 0.001
      },
      displacementStrength: {
        value: 0.62,
        min: 0,
        max: 1,
        step: 0.001
      },
      timeFrecuency: {
        value: 0.11,
        min: 0,
        max: 10,
        step: 0.001
      }
    })
  })

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      {/* @ts-ignore */}
      <waveShaderMaterial
        ref={shaderRef}
        uDistortionFrecuency={distortionFrecuency}
        uDistortionStrength={distortionStrength}
        uDisplacementFrecuency={displacementFrecuency}
        uDisplacementStrength={displacementStrength}
        uTimeFrecuency={timeFrecuency}
      />
      <sphereBufferGeometry attach='geometry' args={[2, 512, 512]} />
    </mesh>
  )
}

const Sphere = () => {
  return (
    <div className='h-screen'>
      <Canvas>
        <color attach='background' args={['white']} />
        <WaveShader />
      </Canvas>
    </div>
  )
}

export default Sphere
