const fragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 0.8);
  }
`

export default fragmentShader
