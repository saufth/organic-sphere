// Graphics
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { ShaderMaterial, Mesh, Vector3, Color, Spherical, Vector2 } from 'three'
// Shaders
import { vertexShader, fragmentShader } from './shaders'
// Controls
import { useControls, folder } from 'leva'
// Hooks
import { useEffect, useRef } from 'react'

const delta = 16

const controlsDefaults = {
  lightPositionPhi: {
    min: 0,
    max: Math.PI,
    step: 0.001
  },
  lightPositionTheta: {
    min: -Math.PI,
    max: Math.PI,
    step: 0.001
  },
  lightIntensity: {
    min: 0,
    max: 5,
    step: 0.001
  },
  distortion: {
    min: 0,
    max: 10,
    step: 0.001
  },
  displacementFrecuency: {
    min: 0,
    max: 5,
    step: 0.001
  },
  displacementStrength: {
    min: 0,
    max: 1,
    step: 0.001
  },
  fresnelOffset: {
    min: -1,
    max: 1,
    step: 0.001
  },
  frenelMultiplier: {
    min: 0,
    max: 5,
    step: 0.001
  },
  frenelPower: {
    min: 0,
    max: 5,
    step: 0.001
  },
  time: {
    min: 0,
    max: 0.001,
    step: 0.000001
  }
}

const sphere = {
  width: 512,
  height: 512
}

const lights = {
  a: {
    intensity: 1,
    color: '#ff2900',
    spherical: new Spherical(1, 0.615, 2.049)
  },
  b: {
    intensity: 1,
    color: '#3158ff',
    spherical: new Spherical(1, 2.561, -1.844)
  }
}

const uniforms = {
  // Color
  uLightAColor: new Color(lights.a.color),
  uLightAPosition: new Vector3(1.0, 1.0, 0.0),
  uLightAIntensity: lights.a.intensity,
  uLightBColor: new Color(lights.b.color),
  uLightBPosition: new Vector3(-1.0, -1.0, 0.0),
  uLightBIntensity: lights.b.intensity,
  // Subdivision
  uSubdivision: new Vector2(sphere.width, sphere.height),
  // Distortion
  uDistortionFrecuency: 2,
  uDistortionStrength: 1,
  // Displacement
  uDisplacementFrecuency: 2,
  uDisplacementStrength: 0.2,
  // Fresnel
  uFresnelOffset: 0,
  uFresnelMultiplier: 1,
  uFresnelPower: 1,
  // Time
  uTime: 0.11
}

const WaveShaderMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader
)

extend({ WaveShaderMaterial })

const WaveShader = () => {
  const shaderRef = useRef<ShaderMaterial>()
  const sphereRef = useRef<Mesh>()

  const {
    colorALight,
    phiALight,
    thetaALight,
    intensityALight,
    colorBLight,
    phiBLight,
    intensityBLight,
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
    Light: folder({
      colorALight: {
        value: lights.a.color
      },
      phiALight: {
        value: lights.a.spherical.phi,
        ...controlsDefaults.lightPositionPhi
      },
      thetaALight: {
        value: lights.a.spherical.theta,
        ...controlsDefaults.lightPositionTheta
      },
      intensityALight: {
        value: lights.a.intensity,
        ...controlsDefaults.lightIntensity
      },
      colorBLight: {
        value: lights.b.color
      },
      phiBLight: {
        value: lights.b.spherical.phi,
        ...controlsDefaults.lightPositionPhi
      },
      thetaBLight: {
        value: lights.b.spherical.theta,
        ...controlsDefaults.lightPositionTheta
      },
      intensityBLight: {
        value: lights.b.intensity,
        ...controlsDefaults.lightIntensity
      }
    }),
    Distortion: folder({
      frecuencyDistortion: {
        value: uniforms.uDistortionFrecuency,
        ...controlsDefaults.distortion
      },
      strengthDistortion: {
        value: uniforms.uDistortionStrength,
        ...controlsDefaults.distortion
      }
    }),
    Displacement: folder({
      frecuencyDisplacement: {
        value: uniforms.uDisplacementFrecuency,
        ...controlsDefaults.displacementFrecuency
      },
      strengthDisplacement: {
        value: uniforms.uDisplacementStrength,
        ...controlsDefaults.displacementStrength
      }
    }),
    Fresnel: folder({
      offsetFresnel: {
        value: uniforms.uFresnelOffset,
        ...controlsDefaults.fresnelOffset
      },
      multiplierFresnel: {
        value: uniforms.uFresnelMultiplier,
        ...controlsDefaults.frenelMultiplier
      },
      powerFresnel: {
        value: uniforms.uFresnelPower,
        ...controlsDefaults.frenelPower
      }
    }),
    Time: folder({
      frecuencyTime: {
        value: uniforms.uTime,
        ...controlsDefaults.time
      }
    })
  })

  useEffect(() => {
    sphereRef.current.geometry.computeTangents()
  }, [])

  // Light A

  useEffect(() => {
    shaderRef.current.uniforms.uLightAColor.value.set(colorALight)
  }, [colorALight])

  useEffect(() => {
    lights.a.spherical.phi = phiALight
    shaderRef.current.uniforms.uLightAPosition.value.setFromSpherical(lights.a.spherical)
  }, [phiALight])

  useEffect(() => {
    lights.a.spherical.theta = thetaALight
    shaderRef.current.uniforms.uLightAPosition.value.setFromSpherical(lights.a.spherical)
  }, [thetaALight])

  // Light B

  useEffect(() => {
    shaderRef.current.uniforms.uLightBColor.value.set(colorBLight)
  }, [colorBLight])

  useEffect(() => {
    lights.b.spherical.phi = phiBLight
    shaderRef.current.uniforms.uLightBPosition.value.setFromSpherical(lights.b.spherical)
  }, [phiBLight])

  useEffect(() => {
    lights.b.spherical.theta = thetaBLight
    shaderRef.current.uniforms.uLightBPosition.value.setFromSpherical(lights.b.spherical)
  }, [thetaBLight])

  // Time

  useFrame(() => {
    shaderRef.current.uniforms.uTime.value += delta * frecuencyTime
  })

  return (
    <mesh ref={sphereRef}>
      <OrbitControls />
      {/* <ambientLight intensity={0.8} />
      <spotLight position={[10, 15, 10]} angle={0.3} /> */}
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
        args={[1, sphere.width, sphere.height]}
      />
    </mesh>
  )
}

const Sphere = () => {
  return (
    <div className='h-screen'>
      <Canvas>
        <color attach='background' args={['#000000']} />
        <WaveShader />
      </Canvas>
    </div>
  )
}

export default Sphere
