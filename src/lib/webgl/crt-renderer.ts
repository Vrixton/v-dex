import { FRAGMENT_SHADER, VERTEX_SHADER } from "./crt-shader";

export type CrtRendererOptions = {
  /** El fondo reacciona al cursor. Con false se pinta un fotograma y ya. */
  interactive: boolean;
  /** Colores leídos de los tokens, en 0..1. */
  base: [number, number, number];
  line: [number, number, number];
};

export type CrtRenderer = {
  destroy: () => void;
};

/** Tope de densidad: por encima de esto no se nota y cuesta el doble. */
const MAX_DPR = 1.5;
/** Suavizado del seguimiento y de la entrada y salida del cursor. */
const FOLLOW = 0.12;
const FADE = 0.08;
/** Por debajo de esto el movimiento ya no se ve: el bucle puede parar. */
const SETTLED = 0.0015;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Monta el fondo CRT sobre un canvas.
 *
 * Devuelve null si WebGL no está disponible, y en ese caso la página se queda
 * con el fondo CSS de siempre: el efecto es una mejora, no un requisito.
 */
export function createCrtRenderer(
  canvas: HTMLCanvasElement,
  options: CrtRendererOptions,
): CrtRenderer | null {
  // alpha: true para que, si algo impide dibujar, se vea el fondo CSS de
  // respaldo en lugar de un canvas negro.
  const context = canvas.getContext("webgl", { antialias: false, alpha: true });
  if (!context) return null;

  // Copiarlo a una const ya comprobada mantiene el tipo dentro de los
  // closures de abajo (TypeScript no conserva el estrechamiento allí).
  const gl: WebGLRenderingContext = context;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  gl.useProgram(program);

  // Dos triángulos que cubren toda la pantalla.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    resolution: gl.getUniformLocation(program, "uResolution"),
    pointer: gl.getUniformLocation(program, "uPointer"),
    strength: gl.getUniformLocation(program, "uStrength"),
    dpr: gl.getUniformLocation(program, "uDpr"),
    base: gl.getUniformLocation(program, "uBase"),
    line: gl.getUniformLocation(program, "uLine"),
  };

  gl.uniform3fv(uniforms.base, options.base);
  gl.uniform3fv(uniforms.line, options.line);

  let dpr = 1;
  let frame = 0;
  let running = false;
  // Resolución que ESTE renderizador ya envió al shader. No se puede
  // deducir del tamaño del canvas: si otro renderizador lo dejó con las
  // medidas correctas (pasa en desarrollo, donde React monta los efectos
  // dos veces), el programa nuevo se quedaría sin uniforms y pintaría negro.
  let sentWidth = -1;
  let sentHeight = -1;

  // Posición objetivo y posición suavizada: el imán persigue al cursor con
  // algo de inercia, en vez de saltar de golpe.
  const target = { x: 0.5, y: 0.5, strength: 0 };
  const current = { x: 0.5, y: 0.5, strength: 0 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = Math.floor(canvas.clientWidth * dpr);
    const height = Math.floor(canvas.clientHeight * dpr);
    // Sin tamaño todavía: se reintenta en el siguiente fotograma.
    if (width === 0 || height === 0) return;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    if (width === sentWidth && height === sentHeight) return;

    sentWidth = width;
    sentHeight = height;
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.dpr, dpr);
  }

  /** Acerca el estado actual al objetivo y pinta. Devuelve si ya se estabilizó. */
  function draw(): boolean {
    current.x += (target.x - current.x) * FOLLOW;
    current.y += (target.y - current.y) * FOLLOW;
    current.strength += (target.strength - current.strength) * FADE;

    gl.uniform2f(uniforms.pointer, current.x, current.y);
    gl.uniform1f(uniforms.strength, current.strength);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    return (
      Math.abs(target.x - current.x) < SETTLED &&
      Math.abs(target.y - current.y) < SETTLED &&
      Math.abs(target.strength - current.strength) < SETTLED
    );
  }

  /**
   * Bucle bajo demanda: se ejecuta mientras la imagen esté cambiando y se
   * detiene en cuanto el fondo alcanza su estado final. Quieto, el coste en
   * CPU y GPU es cero; con el cursor moviéndose, un fotograma por frame.
   */
  function loop() {
    resize();
    const settled = canvas.width > 0 && draw();

    if (settled) {
      running = false;
      return;
    }
    frame = window.requestAnimationFrame(loop);
  }

  function requestFrame() {
    if (running || document.hidden) return;
    running = true;
    frame = window.requestAnimationFrame(loop);
  }

  function handlePointerMove(event: PointerEvent) {
    // El shader trabaja con y hacia arriba; la pantalla, hacia abajo.
    target.x = event.clientX / window.innerWidth;
    target.y = 1 - event.clientY / window.innerHeight;
    target.strength = 1;
    requestFrame();
  }

  function handlePointerLeave() {
    target.strength = 0;
    requestFrame();
  }

  function handleVisibility() {
    if (document.hidden) {
      running = false;
      window.cancelAnimationFrame(frame);
      return;
    }
    requestFrame();
  }

  function handleResize() {
    resize();
    draw();
  }

  resize();
  requestFrame();

  if (options.interactive) {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
  }

  window.addEventListener("resize", handleResize);

  return {
    destroy() {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}
