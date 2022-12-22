// Components
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { vertexShader, fragmentShader } from '../../modules/animation/shaders/sphere/'
import { useRef } from 'react'
import { ShaderMaterial } from 'three'

const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0
  },
  vertexShader,
  fragmentShader
)

extend({ WaveShaderMaterial })

const WaveShader = () => {
  const shaderRef = useRef<ShaderMaterial>()
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
      <waveShaderMaterial ref={shaderRef} />
      <sphereBufferGeometry attach='geometry' args={[1, 128, 128]} />
    </mesh>
  )
}

const Sphere = () => {
  return (
    <div className='h-screen'>
      <Canvas>
        <WaveShader />
      </Canvas>
    </div>
  )
}

export default Sphere
