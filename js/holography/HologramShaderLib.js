/**
 * Created by tiago on 3/12/15.
 */

CGHLab.HologramShaderLib = {

    'bipolar': {
        uniforms: {
            "color": { type: "c", value: new THREE.Color( 0x666666 ) },
            "lightPoints": { type: "v4v", value: [ new THREE.Vector4() ] },
            "n_lightPoints": { type: "i", value: 162 },
            "horizCycleLength": { type: "f", value: 0 },
            "waveLength": { type: "f", value: 1 }
        },
        vertexShader: [
            "varying vec4 worldPosition;",
            "void main(){",
            "   worldPosition = modelMatrix * vec4( position, 1.0 );",
            "   gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );",
            "}"
        ].join('\n'),

        fragmentShader: [
            "uniform vec3 color;",
            "uniform int n_lightPoints;",
            "uniform vec4 lightPoints[162];",
            "uniform float horizCycleLength;",
            "uniform float waveLength;",
            "varying vec4 worldPosition;",
            "void main(){",
            "   const float tau = 6.283185307179586476925286766559;",
            "   float refArrivalPhase = 0.0;",
            //"   float perWaveAmplitude[162];",
            //"   float totalAmplitude = 0.0;",
            "   float totalIntensity = 0.0;",
            "   float normalizedIntensity = 0.0;",
            "   float n = float(n_lightPoints);",

            "   refArrivalPhase = tau * ( worldPosition.x / horizCycleLength );",
            //"   float refAmplitude = cos(refArrivalPhase);",
            "   float k = tau / waveLength;",

            "   for(int i = 0; i < 162; i++){",
            "       if (i == n_lightPoints) break;",
            "       float d = distance(lightPoints[i].xyz, worldPosition.xyz);",
            "       float objArrivalPhase = (d - lightPoints[i].w) * k;",
            //"       perWaveAmplitude[i] = cos(objArrivalPhase);",
            //"       totalAmplitude += perWaveAmplitude[i];",
            "       totalIntensity += cos(objArrivalPhase - refArrivalPhase);",
            "       normalizedIntensity = totalIntensity / (n*2.0) + 0.5;",
            "   }",
            "   gl_FragColor = vec4( vec3(normalizedIntensity), 1.0 );",
            "}"
        ].join('\n')
    }
};