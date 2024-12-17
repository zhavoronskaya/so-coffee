export default /*glsl */ `

attribute float aSize;
attribute float aAngle;
attribute float aAlpha;
attribute vec3 aColor;

uniform float uTime;

varying float vAngle;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec3 mvPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * vec4(mvPosition, 1.0);
  gl_PointSize = aSize  / -mvPosition.z;
  vAngle = aAngle;
  vAlpha = aAlpha;
  vColor = aColor;
}`;
