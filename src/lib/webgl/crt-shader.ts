/**
 * Shaders del fondo CRT.
 *
 * Se dibuja un único rectángulo que cubre la pantalla y todo el trabajo pasa
 * en el fragment shader, que se ejecuta una vez por píxel en la GPU. Por eso
 * puede deformarse a 60 fps sin tocar el layout ni repintar nada del DOM.
 *
 * El tirón magnético consiste en desplazar la coordenada con la que se
 * consulta el patrón de líneas: si ese punto se mueve hacia el cursor, las
 * líneas aparecen estiradas hacia él, igual que un imán cerca del tubo.
 *
 * El shader no depende del tiempo: la imagen solo cambia si cambia el
 * cursor. Eso permite pintar bajo demanda en vez de a 60 fps constantes.
 */

export const VERTEX_SHADER = /* glsl */ `
  attribute vec2 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

export const FRAGMENT_SHADER = /* glsl */ `
  // En escritorio da igual (las GPU usan precisión alta de todos modos), pero
  // en móvil mediump son ~10 bits de mantisa: suficiente para que el patrón
  // de líneas se rompa en manchas. Se pide alta cuando el móvil la soporta.
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform vec2 uResolution;   // tamaño del lienzo en píxeles físicos
  uniform vec2 uPointer;      // cursor en 0..1, con y hacia arriba
  uniform float uStrength;    // 0 sin cursor, 1 con el cursor encima
  uniform float uDpr;         // densidad de píxeles
  uniform vec3 uBase;         // color de fondo
  uniform vec3 uLine;         // color de las líneas (más oscuro que el fondo)

  // Radio de influencia del imán, en alto de pantalla
  const float RADIUS = 0.34;
  // Cuánto se desplaza el patrón como máximo
  const float PULL = 0.1;
  // Separación de las líneas, en píxeles CSS
  const float LINE_GAP = 6.0;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;

    // Distancia al cursor corregida por proporción, para que el campo sea
    // circular y no un óvalo en pantallas anchas.
    vec2 toPointer = uPointer - uv;
    vec2 scaled = vec2(toPointer.x * aspect, toPointer.y);
    float dist = length(scaled);

    // Caída gaussiana: fuerte en el centro y sin borde visible.
    float falloff = exp(-(dist * dist) / (RADIUS * RADIUS * 0.5)) * uStrength;

    // El patrón se consulta más cerca del cursor, así que las líneas se ven
    // estiradas hacia él.
    vec2 pull = normalize(toPointer + vec2(0.0001)) * falloff * PULL;
    vec2 warped = uv + pull;

    // Curvatura del tubo: las líneas se comban hacia los bordes.
    float bend = (warped.x - 0.5) * (warped.x - 0.5) * 0.035;
    float y = (warped.y + bend) * uResolution.y / uDpr;

    // Solo importa la posición DENTRO de la línea, no la altura absoluta:
    // con mod los números se quedan pequeños y el coseno no pierde precisión.
    float phase = mod(y, LINE_GAP) / LINE_GAP;

    // Líneas suaves, no franjas duras: evita el moiré al escalar.
    float line = 0.5 + 0.5 * cos(phase * 6.2831853);
    line = pow(line, 1.6);

    // Las líneas son las zonas oscuras entre barridos del haz, no franjas
    // claras: sobre un fondo tan luminoso, aclarar no se ve.
    vec3 color = mix(uBase, uLine, line * 0.9);

    // Bajo el imán la imagen se aclara un poco, como el brillo del fósforo.
    color += falloff * 0.05;

    // Viñeta: el tubo pierde luz en las esquinas.
    vec2 fromCenter = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    float vignette = smoothstep(0.95, 0.25, length(fromCenter));
    color *= mix(0.88, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;
