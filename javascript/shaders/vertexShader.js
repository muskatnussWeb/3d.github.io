const vsCode=`
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uColorVertex;
uniform int uGradient;

varying highp vec3 vLighting;
varying highp vec3 vColor;

void main(){
    gl_Position = uProjectionMatrix*uModelViewMatrix*vec4(aVertexPosition, 1.0);

    highp vec3 ambientlight = vec3(0.6, 0.6, 0.6);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = vec3(0, 1000, 2000);

    highp vec4 transformedNormal = uNormalMatrix*vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientlight + (directionalLightColor * directional);
    vColor = uColorVertex;
    if(uGradient == 1){
        if(vec4(aVertexPosition, 1.0).b == -10.0){
            vColor.rgb = vec3(0.24, 0.16, 0.0);
        }
        vLighting = vec3(1.0, 1.0, 1.0);
    }
}
`;
export{vsCode};