// Graphics
import { Vector3, Color, Spherical, Vector2 } from 'three'

// Sphere
export const size = {
  width: 512,
  height: 512
}

// Time
export const delta = 16

// Color
export const clearColor = new Color('#010101').convertSRGBToLinear()

// Lights
export const lights = {
  a: {
    color: '#ff3e00',
    intensity: 1.85,
    spherical: new Spherical(1, 0.615, 2.049)
  },
  b: {
    color: '#0063ff',
    intensity: 1.4,
    spherical: new Spherical(1, 2.561, -1.844)
  }
}

// Uniforms
export const uniforms = {
  // Color
  uLightAColor: new Color(lights.a.color),
  uLightAIntensity: lights.a.intensity,
  uLightAPosition: new Vector3(1.0, 1.0, 0.0),
  uLightBColor: new Color(lights.b.color),
  uLightBIntensity: lights.b.intensity,
  uLightBPosition: new Vector3(-1.0, -1.0, 0.0),
  // Subdivision
  uSubdivision: new Vector2(size.width, size.height),
  // Distortion
  uDistortionFrecuency: 2,
  uDistortionStrength: 1,
  // Displacement
  uDisplacementFrecuency: 2,
  uDisplacementStrength: 0.2,
  // Fresnel
  uFresnelOffset: -1.603,
  uFresnelMultiplier: 3.587,
  uFresnelPower: 1.793,
  // Time
  uTime: 0.11
}

// Controls
export const controls = {
  lights: {
    colorALight: {
      value: lights.a.color
    },
    intensityALight: {
      value: lights.a.intensity,
      min: 0,
      max: 5,
      step: 0.001
    },
    phiALight: {
      value: lights.a.spherical.phi,
      min: 0,
      max: Math.PI,
      step: 0.001
    },
    thetaALight: {
      value: lights.a.spherical.theta,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001
    },
    colorBLight: {
      value: lights.b.color
    },
    intensityBLight: {
      value: lights.b.intensity,
      min: 0,
      max: 5,
      step: 0.001
    },
    phiBLight: {
      value: lights.b.spherical.phi,
      min: 0,
      max: Math.PI,
      step: 0.001
    },
    thetaBLight: {
      value: lights.b.spherical.theta,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001
    }
  },
  distortion: {
    frecuencyDistortion: {
      value: uniforms.uDistortionFrecuency,
      min: 0,
      max: 10,
      step: 0.001
    },
    strengthDistortion: {
      value: uniforms.uDistortionStrength,
      min: 0,
      max: 10,
      step: 0.001
    }
  },
  displacement: {
    frecuencyDisplacement: {
      value: uniforms.uDisplacementFrecuency,
      min: 0,
      max: 5,
      step: 0.001
    },
    strengthDisplacement: {
      value: uniforms.uDisplacementStrength,
      min: 0,
      max: 1,
      step: 0.001
    }
  },
  fresnel: {
    offsetFresnel: {
      value: uniforms.uFresnelOffset,
      min: -2,
      max: 2,
      step: 0.001
    },
    multiplierFresnel: {
      value: uniforms.uFresnelMultiplier,
      min: 0,
      max: 5,
      step: 0.001
    },
    powerFresnel: {
      value: uniforms.uFresnelPower,
      min: 0,
      max: 5,
      step: 0.001
    }
  },
  time: {
    frecuencyTime: {
      value: uniforms.uTime,
      min: 0,
      max: 0.001,
      step: 0.000001
    }
  }
}
