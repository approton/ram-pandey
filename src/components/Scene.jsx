'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Scene.module.css';
export default function Scene() {
  const canvas = useRef(null);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    const node = canvas.current;
    let gl;
    try {
      gl = node.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {}
    if (!gl) {
      setAvailable(false);
      return;
    }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0,
      visible = true,
      t = 0;
    const pointer = { x: 0, y: 0 };
    const vertex = `attribute vec3 aPosition;attribute vec3 aNormal;uniform float uTime;uniform vec2 uPointer;uniform float uAspect;varying vec3 vNormal;varying vec3 vPosition;mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}void main(){mat3 r=rx(.55+uPointer.y*.35)*ry(uTime*.13+uPointer.x*.45);vec3 p=r*aPosition;vNormal=r*aNormal;vPosition=p;float perspective=7./(7.-p.z);gl_Position=vec4(p.x*.29/uAspect*perspective,p.y*.29*perspective,p.z*.1,1.);}`;
    const fragment = `precision mediump float;varying vec3 vNormal;varying vec3 vPosition;uniform float uTime;void main(){vec3 n=normalize(vNormal);vec3 light=normalize(vec3(-.6,1.,1.));float d=max(dot(n,light),0.);float rim=pow(1.-abs(n.z),2.);float wave=.5+.5*sin(vPosition.y*1.1+vPosition.x*.7+uTime*.15);vec3 c=mix(vec3(.31,.2,.85),vec3(.15,.85,.98),wave);c*=.25+d*.75;c+=vec3(.55,.72,1.)*rim*.65;float spec=pow(max(dot(reflect(-light,n),vec3(0.,0.,1.)),0.),30.);gl_FragColor=vec4(c+spec*.6,.9);}`;
    function shader(type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('Shader unavailable');
      return s;
    }
    let program, vs, fs;
    try {
      vs = shader(gl.VERTEX_SHADER, vertex);
      fs = shader(gl.FRAGMENT_SHADER, fragment);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Program unavailable');
    } catch {
      setAvailable(false);
      return;
    }
    gl.useProgram(program);
    const verts = [],
      normals = [];
    const center = (t) => [
      (2 + 0.42 * Math.cos(3 * t)) * Math.cos(2 * t),
      (2 + 0.42 * Math.cos(3 * t)) * Math.sin(2 * t),
      0.8 * Math.sin(3 * t),
    ];
    function point(i, j) {
      const a = (i / 220) * Math.PI * 2,
        b = (j / 12) * Math.PI * 2,
        c = center(a),
        next = center(a + 0.001);
      let tangent = next.map((n, k) => n - c[k]);
      const len = Math.hypot(...tangent);
      tangent = tangent.map((n) => n / len);
      let n = [tangent[1], -tangent[0], 0],
        nl = Math.hypot(...n);
      n = n.map((x) => x / nl);
      const bin = [
        tangent[1] * n[2] - tangent[2] * n[1],
        tangent[2] * n[0] - tangent[0] * n[2],
        tangent[0] * n[1] - tangent[1] * n[0],
      ];
      const normal = n.map((x, k) => x * Math.cos(b) + bin[k] * Math.sin(b));
      return { p: c.map((x, k) => x + normal[k] * 0.105), n: normal };
    }
    for (let i = 0; i < 220; i++)
      for (let j = 0; j < 12; j++) {
        const a = point(i, j),
          b = point(i + 1, j),
          c = point(i, j + 1),
          d = point(i + 1, j + 1);
        for (const v of [a, b, c, b, d, c]) {
          verts.push(...v.p);
          normals.push(...v.n);
        }
      }
    const buffers = [];
    for (const [name, data] of [
      ['aPosition', verts],
      ['aNormal', normals],
    ]) {
      const b = gl.createBuffer();
      buffers.push(b);
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    }
    const ut = gl.getUniformLocation(program, 'uTime'),
      up = gl.getUniformLocation(program, 'uPointer'),
      ua = gl.getUniformLocation(program, 'uAspect');
    gl.enable(gl.DEPTH_TEST);
    function draw() {
      const dpr = Math.min(devicePixelRatio, 1.5),
        w = Math.round(node.clientWidth * dpr),
        h = Math.round(node.clientHeight * dpr);
      if (node.width !== w || node.height !== h) {
        node.width = w;
        node.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform1f(ut, t);
      gl.uniform2f(up, pointer.x, pointer.y);
      gl.uniform1f(ua, w / h);
      gl.drawArrays(gl.TRIANGLES, 0, verts.length / 3);
    }
    function loop() {
      if (visible && !document.hidden) {
        if (!paused && !reduced.matches) t += 0.016;
        draw();
      }
      raf = requestAnimationFrame(loop);
    }
    const move = (e) => {
      const r = node.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width - 0.5;
      pointer.y = (e.clientY - r.top) / r.height - 0.5;
    };
    node.addEventListener('pointermove', move);
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    });
    observer.observe(node);
    draw();
    if (!paused && !reduced.matches) loop();
    const loss = (e) => {
      e.preventDefault();
      setAvailable(false);
    };
    node.addEventListener('webglcontextlost', loss);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      node.removeEventListener('pointermove', move);
      node.removeEventListener('webglcontextlost', loss);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [paused]);
  return (
    <div className={`${styles.scene} ${paused ? styles.paused : ''}`}>
      <div className={styles.halo} />
      {available ? (
        <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
      ) : (
        <div className={styles.fallback} aria-hidden="true">
          <div className={styles.orbitA} />
          <div className={styles.orbitB} />
          <div className={styles.orbitC} />
          <div className={styles.core} />
          <div className={styles.satellite} />
        </div>
      )}
      <div className={styles.sceneLabels} aria-hidden="true">
        <span>CREATIVE ENGINEERING</span>
        <span>IDEA → SYSTEM → EXPERIENCE</span>
      </div>
      {
        <button
          className={styles.pause}
          onClick={() => setPaused(!paused)}
          aria-label={paused ? 'Play 3D animation' : 'Pause 3D animation'}
        >
          {paused ? '▶' : 'Ⅱ'}
        </button>
      }
    </div>
  );
}
