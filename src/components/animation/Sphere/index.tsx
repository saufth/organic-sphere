// Graphics
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, shaderMaterial, Effects, PerspectiveCamera } from '@react-three/drei'
import { ShaderMaterial, Mesh, Vector2 } from 'three'
import { UnrealBloomPass } from 'three-stdlib'
// Shaders
import { vertexShader, fragmentShader } from './shaders'
// Controls
import { useControls, folder } from 'leva'
// Hooks
import { useEffect, useRef, useMemo } from 'react'
// Config
import * as config from './config'

const WaveShaderMaterial = shaderMaterial(
  config.uniforms,
  vertexShader,
  fragmentShader
)

extend({ WaveShaderMaterial, UnrealBloomPass })

const WaveShader = () => {
  const shaderRef = useRef<ShaderMaterial>()
  const sphereRef = useRef<Mesh>()

  const {
    colorALight,
    intensityALight,
    phiALight,
    thetaALight,
    colorBLight,
    intensityBLight,
    phiBLight,
    thetaBLight,
    frecuencyDistortion,
    strengthDistortion,
    frecuencyDisplacement,
    strengthDisplacement,
    offsetFresnel,
    multiplierFresnel,
    powerFresnel,
    frecuencyTime
  } = useControls('Sphere', {
    Light: folder(config.controls.lights),
    Distortion: folder(config.controls.distortion),
    Displacement: folder(config.controls.displacement),
    Fresnel: folder(config.controls.fresnel),
    Time: folder(config.controls.time)
  })

  useEffect(() => {
    sphereRef.current.geometry.computeTangents()
    console.log(UnrealBloomPass)
  }, [])

  // Light A

  useEffect(() => {
    shaderRef.current.uniforms.uLightAColor.value.set(colorALight)
  }, [colorALight])

  useEffect(() => {
    config.lights.a.spherical.phi = phiALight
    shaderRef.current.uniforms.uLightAPosition.value.setFromSpherical(config.lights.a.spherical)
  }, [phiALight])

  useEffect(() => {
    config.lights.a.spherical.theta = thetaALight
    shaderRef.current.uniforms.uLightAPosition.value.setFromSpherical(config.lights.a.spherical)
  }, [thetaALight])

  // Light B

  useEffect(() => {
    shaderRef.current.uniforms.uLightBColor.value.set(colorBLight)
  }, [colorBLight])

  useEffect(() => {
    config.lights.b.spherical.phi = phiBLight
    shaderRef.current.uniforms.uLightBPosition.value.setFromSpherical(config.lights.b.spherical)
  }, [phiBLight])

  useEffect(() => {
    config.lights.b.spherical.theta = thetaBLight
    shaderRef.current.uniforms.uLightBPosition.value.setFromSpherical(config.lights.b.spherical)
  }, [thetaBLight])

  // Time

  useFrame(() => {
    shaderRef.current.uniforms.uTime.value += config.delta * frecuencyTime
  })

  return (
    <mesh ref={sphereRef}>
      {/* @ts-ignore */}
      <waveShaderMaterial
        uLightAIntensity={intensityALight}
        uLightBIntensity={intensityBLight}
        uDistortionFrecuency={frecuencyDistortion}
        uDistortionStrength={strengthDistortion}
        uDisplacementFrecuency={frecuencyDisplacement}
        uDisplacementStrength={strengthDisplacement}
        uFresnelOffset={offsetFresnel}
        uFresnelMultiplier={multiplierFresnel}
        uFresnelPower={powerFresnel}
        ref={shaderRef}
      />
      <sphereGeometry
        attach='geometry'
        args={[1, config.size.width, config.size.height]}
      />
    </mesh>
  )
}

const EffectsComposer = () => {
  const { size, scene, camera } = useThree()

  const aspect = useMemo(
    () => new Vector2(size.width, size.height),
    [size]
  )

  return (
    <Effects>
      <renderPass scene={scene} camera={camera} />
      {/* @ts-ignore */}
      <unrealBloomPass
        resolution={aspect}
        strength={0.8}
        radius={0.315}
        clearColor={config.clearColor}
      />
    </Effects>
  )
}

const Sphere = () => {
  return (
    <div className='h-screen'>
      <Canvas
        dpr={Math.min(Math.max(window.devicePixelRatio, 1), 2)}
        gl={{ alpha: false }}
      >
        <color attach='background' args={[config.clearColor]} />
        <OrbitControls
          screenSpacePanning
          zoomSpeed={1}
          enableDamping
        />
        <PerspectiveCamera fov={25} far={15} />
        <EffectsComposer />
        <WaveShader />
      </Canvas>
    </div>
  )
}

export default Sphere
