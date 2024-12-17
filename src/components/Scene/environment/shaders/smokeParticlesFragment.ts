export default /*glsl */ `

#define PI 3.1415926535897932384626433832795


uniform sampler2D uTexture;
uniform float uTime;

varying float vAngle;
varying float vAlpha;
varying vec3 vColor;
varying vec3 vPosition;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float alpha = smoothstep(12.,0.0,vPosition.y);

  float c = cos(vAngle*uTime);
  float s = sin(vAngle*uTime);
  mat2 r = mat2(c, s, -s, c);

  uv = (uv - 0.5) * r + 0.5;

  vec4 texel = texture2D(uTexture, uv);
  gl_FragColor = vec4(vec3(0.39, 0.2, 0.1), texel.a*0.05*alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
