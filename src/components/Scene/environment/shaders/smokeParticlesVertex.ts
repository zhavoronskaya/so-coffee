export default /*glsl */ `
#define PI 3.1415926535897932384626433832795
attribute float aSize;
attribute float aAngle;
attribute float aAlpha;
attribute vec3 aColor;

uniform float uTime;
uniform sampler2D uPositions;

varying float vAngle;
varying float vAlpha;
varying vec3 vColor;
varying vec3 vPosition;


void main() {
vec3 pos = texture2D(uPositions, position.xy).xyz;

vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
vPosition = pos;
vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  //Size
  gl_PointSize = 100.0 * aSize;
  vAngle = aAngle;
  vAlpha = aAlpha;
  vColor = aColor;


gl_PointSize *= (1.0 / - viewPosition.z);


}`;
