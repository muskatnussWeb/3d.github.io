 // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main() {
      gl_FragColor = vColor;
    }
`;

export {fsSource};