const fragmentShader = `
  varying vec3 vNormal;
  varying float vPerlinStrength;

  void main() {
    float pStrength = vPerlinStrength * 0.1;
    pStrength *= 2.0;
    gl_FragColor = vec4(vNormal, 1.0);
  }
`

export default fragmentShader
