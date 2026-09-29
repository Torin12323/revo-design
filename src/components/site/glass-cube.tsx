import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const TEX_W = 4096;
const TEX_H = 1024;

function labelTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const g = canvas.getContext("2d");
  if (!g) return { tex: new THREE.CanvasTexture(canvas), fontPx: 200 };
  g.clearRect(0, 0, TEX_W, TEX_H);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  const family = '"Schibsted Grotesk", "Noto Sans SC", sans-serif';
  let size = 640;
  g.font = `700 ${size}px ${family}`;
  if ("letterSpacing" in g) g.letterSpacing = "-0.04em";
  while (g.measureText(text).width > TEX_W * 0.92 && size > 140) {
    size -= 8;
    g.font = `700 ${size}px ${family}`;
    if ("letterSpacing" in g) g.letterSpacing = "-0.04em";
  }
  g.fillText(text, TEX_W / 2, TEX_H / 2 + size * 0.02);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  tex.needsUpdate = true;
  return { tex, fontPx: size };
}

const vert = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec3 vLocal;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vLocal = position;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform sampler2D uBg;
  uniform mat4 uProjection;
  uniform mat4 uView;
  uniform float uIor;
  uniform float uDisp;
  uniform float uThick;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec3 vLocal;

  vec3 sampleBg(vec2 uv) {
    return texture2D(uBg, clamp(uv, 0.0, 1.0)).rgb;
  }

  vec2 bendUV(vec3 N, float ior, float thick) {
    vec3 I = normalize(vWorld - cameraPosition);
    vec3 R = refract(I, N, 1.0 / ior);
    if (dot(R, R) < 1e-6) R = normalize(I - N * dot(I, N) * 0.55);
    vec4 clip = uProjection * uView * vec4(vWorld + R * thick, 1.0);
    return clip.xy / clip.w * 0.5 + 0.5;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 col = sampleBg(bendUV(N, uIor, uThick));

    vec3 V = normalize(cameraPosition - vWorld);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.1);
    vec3 q = vec3(0.5) - abs(vLocal);
    float m1 = min(q.x, min(q.y, q.z));
    float m3 = max(q.x, max(q.y, q.z));
    float m2 = q.x + q.y + q.z - m1 - m3;
    float edge = pow(1.0 - smoothstep(0.0, 0.032, m2), 1.25);
    float spec = pow(clamp(dot(N, normalize(normalize(vec3(1.5, 2.6, 4.0)) + V)), 0.0, 1.0), 70.0);
    vec3 glow = vec3(fres * 0.62 + edge * 1.15 + spec);
    gl_FragColor = vec4(col + glow, 1.0);
  }
`;

export const GlassCube = memo(function GlassCube({ label }: { label: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let dead = false;
    let cleanup = () => {};

    const start = async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      if (dead) return;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });
      if (!renderer.getContext()) {
        renderer.dispose();
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.autoClear = false;
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 0.05, 40);
      const planeZ = -1.2;
      const lift = 0.22;

      const { tex, fontPx } = labelTexture(label);
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      plane.position.set(0, lift, planeZ);
      plane.renderOrder = 1;
      scene.add(plane);

      const rt = new THREE.WebGLRenderTarget(8, 8, {
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        depthBuffer: false,
      });
      rt.texture.colorSpace = THREE.SRGBColorSpace;

      const uniforms = {
        uBg: { value: rt.texture },
        uProjection: { value: new THREE.Matrix4() },
        uView: { value: new THREE.Matrix4() },
        uIor: { value: 1.45 },
        uDisp: { value: 0.0 },
        uThick: { value: 0.8 },
      };
      const glass = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vert,
        fragmentShader: frag,
        toneMapped: false,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      });
      const cube = new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 6, 0.055), glass);
      cube.renderOrder = 2;
      cube.position.set(0, lift, 0.55);
      scene.add(cube);

      const bgScene = new THREE.Scene();
      const bgPlane = new THREE.Mesh(
        plane.geometry,
        new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
      );
      bgPlane.position.copy(plane.position);
      bgScene.add(bgPlane);

      const fit = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        const pr = Math.min(window.devicePixelRatio || 1, 1.25);
        renderer.setPixelRatio(pr);
        renderer.setSize(w, h, false);
        rt.setSize(Math.max(2, Math.floor(w * pr)), Math.max(2, Math.floor(h * pr)));
        camera.aspect = w / h;
        const tall = h / w > 1.05;
        const drop = tall ? -0.15 : -0.48;
        camera.position.set(0, lift + drop, 7.15);
        camera.lookAt(0, lift + drop, 0);
        camera.updateProjectionMatrix();

        const depth = camera.position.z - planeZ;
        const viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * depth;
        const viewW = viewH * camera.aspect;
        const planeW = Math.min(viewW * 0.94, viewH * 1.9);
        const planeH = planeW * (TEX_H / TEX_W);
        const geo = new THREE.PlaneGeometry(planeW, planeH);
        plane.geometry.dispose();
        bgPlane.geometry.dispose();
        plane.geometry = geo;
        bgPlane.geometry = geo;
        bgPlane.position.copy(plane.position);

        const glyph = (fontPx / TEX_H) * planeH;
        const cubeSize = glyph * (tall ? 1.22 : 1.05);
        cube.scale.setScalar(cubeSize);
        uniforms.uThick.value = cubeSize * 0.42;
        const cubeZ = 0.28;
        const camY = camera.position.y;
        const camZ = camera.position.z;
        const cubeY = camY + (lift - camY) * ((camZ - cubeZ) / (camZ - planeZ));
        const viewHAtCube = 2 * Math.tan((camera.fov * Math.PI) / 360) * (camZ - cubeZ);
        const cornerUp = (36 / h) * viewHAtCube;
        cube.position.set(0, cubeY + cornerUp, cubeZ);
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(host);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let raf = 0;
      let running = false;
      let onScreen = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (!running) return;
        const t = reduce ? 0.4 : (now - t0) / 1000;
        cube.rotation.order = "YXZ";
        cube.rotation.x = 0.12 + Math.sin(t * 0.8) * 0.02;
        cube.rotation.y = 0.28 + t * 0.85;
        cube.rotation.z = -0.05 + Math.sin(t * 0.55) * 0.015;
        uniforms.uProjection.value.copy(camera.projectionMatrix);
        uniforms.uView.value.copy(camera.matrixWorldInverse);

        cube.visible = false;
        renderer.setRenderTarget(rt);
        renderer.setClearColor(0x000000, 1);
        renderer.clear();
        renderer.render(bgScene, camera);
        renderer.setRenderTarget(null);
        renderer.setClearColor(0x000000, 0);
        renderer.clear();
        cube.visible = true;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      const pause = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      const resume = () => {
        if (!onScreen || document.hidden || running) return;
        running = true;
        raf = requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        ([entry]) => {
          onScreen = !!entry?.isIntersecting;
          if (onScreen) resume();
          else pause();
        },
        { threshold: 0.05 },
      );
      io.observe(host);
      const onVis = () => {
        if (document.hidden) pause();
        else resume();
      };
      document.addEventListener("visibilitychange", onVis);
      resume();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        tex.dispose();
        plane.geometry.dispose();
        (plane.material as { dispose(): void }).dispose();
        (bgPlane.material as { dispose(): void }).dispose();
        cube.geometry.dispose();
        glass.dispose();
        rt.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void start();
    return () => {
      dead = true;
      cleanup();
    };
  }, [label]);

  return <div className="glass-cube" ref={hostRef} />;
});
