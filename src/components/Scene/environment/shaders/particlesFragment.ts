export default /*glsl */ `

uniform vec3 uColor;



float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);

    if(ll > 0.5)
        discard;
 
    gl_FragColor = vec4(uColor, step(ll, 0.5) * 0.45);



  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
