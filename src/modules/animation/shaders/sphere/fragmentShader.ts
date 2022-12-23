const fragmentShader = `
  varying vec3 vNormal;
  varying float vPerlinStrength;

  void main() {
    float pStrength = vPerlinStrength + 0.08;
    pStrength *= 4.0;
    gl_FragColor = vec4(pStrength*1.6, pStrength, pStrength, 0.6);
  }
`

export default fragmentShader
