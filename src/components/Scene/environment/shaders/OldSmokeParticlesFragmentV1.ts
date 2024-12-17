export default /*glsl */ `

#define PI 3.1415926535897932384626433832795


uniform sampler2D uTexture;
uniform float uTime;

varying float vAngle;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;

  float c = cos(vAngle);
  float s = sin(vAngle);
  mat2 r = mat2(c, s, -s, c);

  uv = (uv - 0.5) * r + 0.5;
  
  vec4 texel = texture2D(uTexture, uv);

  gl_FragColor = vec4(texel.xyz ,(1.- texel.a )* vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
