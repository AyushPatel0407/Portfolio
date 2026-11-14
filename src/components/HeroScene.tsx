"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Theme + motion preferences                                          */
/* ------------------------------------------------------------------ */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const PALETTE = {
  dark: { accent: "#ff6a33", base: "#ecebe6", node: "#ffb08f" },
  light: { accent: "#d9481a", base: "#17160f", node: "#d9481a" },
};

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

// 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT)
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform vec2  uMouse;
uniform float uPixelRatio;
uniform float uSize;
attribute float aRandom;
varying float vDisp;
varying float vRandom;
${SIMPLEX}
void main() {
  vec3 dir = normalize(position);
  // Two octaves of flowing noise push each particle in or out along its normal
  float n = snoise(position * 1.1 + vec3(uTime * 0.12));
  float d = snoise(position * 2.8 - vec3(uTime * 0.22)) * 0.12;
  float disp = n * 0.32 + d;
  // The side of the sphere facing the cursor swells towards it
  vec3 mouseDir = normalize(vec3(uMouse * 1.4, 1.0));
  disp += pow(max(dot(dir, mouseDir), 0.0), 5.0) * 0.45 * length(uMouse);
  vec3 p = position + dir * disp;
  vDisp = disp;
  vRandom = aRandom;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.45 + aRandom) * uPixelRatio / -mv.z;
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3  uAccent;
uniform vec3  uBase;
uniform float uOpacity;
varying float vDisp;
varying float vRandom;
void main() {
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  float alpha = smoothstep(0.5, 0.05, r);
  vec3 col = mix(uBase, uAccent, smoothstep(-0.15, 0.4, vDisp));
  gl_FragColor = vec4(col, alpha * uOpacity * (0.35 + vRandom * 0.65));
}
`;

/* ------------------------------------------------------------------ */
/* Pieces of the scene                                                 */
/* ------------------------------------------------------------------ */

const PARTICLES = 9000;
const RADIUS = 1.55;

function ParticleCore({
  mouse,
  colors,
  dark,
  animate,
}: {
  mouse: React.RefObject<THREE.Vector2>;
  colors: (typeof PALETTE)["dark"];
  dark: boolean;
  animate: boolean;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  // Fibonacci sphere: evenly spread points with a little random jitter
  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLES * 3);
    const randoms = new Float32Array(PARTICLES);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < PARTICLES; i++) {
      const y = 1 - (i / (PARTICLES - 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const r = RADIUS * (0.97 + Math.random() * 0.06);
      positions[i * 3] = Math.cos(theta) * ring * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * ring * r;
      randoms[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uPixelRatio: { value: 1 },
      uSize: { value: 17 },
      uAccent: { value: new THREE.Color() },
      uBase: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    }),
    [],
  );

  const gl = useThree((s) => s.gl);
  const wide = useThree((s) => s.size.width >= 1000);

  useEffect(() => {
    uniforms.uAccent.value.set(colors.accent);
    uniforms.uBase.value.set(colors.base);
    // Fainter when the sphere sits behind text on narrow screens
    uniforms.uOpacity.value = (dark ? 0.7 : 0.6) * (wide ? 1 : 0.65);
    uniforms.uPixelRatio.value = gl.getPixelRatio();
  }, [colors, dark, gl, uniforms, wide]);

  useFrame((_, delta) => {
    if (animate) uniforms.uTime.value += delta;
    uniforms.uMouse.value.lerp(mouse.current!, 0.06);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

// One orbiting node per product shipped at work
const ORBITS = [
  { radius: 2.15, tilt: [0.3, 0, 0.15], speed: 0.32, phase: 0.0, size: 0.055 },
  { radius: 2.4, tilt: [-0.4, 0.2, -0.1], speed: -0.24, phase: 1.3, size: 0.045 },
  { radius: 2.65, tilt: [1.1, 0, 0.4], speed: 0.2, phase: 2.6, size: 0.05 },
  { radius: 2.3, tilt: [-1.0, 0.3, 0.6], speed: 0.28, phase: 3.9, size: 0.04 },
  { radius: 2.85, tilt: [0.15, 0.5, -0.5], speed: -0.16, phase: 5.0, size: 0.06 },
  { radius: 2.05, tilt: [0.75, -0.4, 1.0], speed: -0.36, phase: 0.7, size: 0.035 },
  { radius: 3.05, tilt: [-0.6, 0, -0.25], speed: 0.13, phase: 4.4, size: 0.045 },
] as const;

function Orbit({
  orbit,
  color,
  dark,
  animate,
}: {
  orbit: (typeof ORBITS)[number];
  color: string;
  dark: boolean;
  animate: boolean;
}) {
  const node = useRef<THREE.Mesh>(null);
  const angle = useRef<number>(orbit.phase);

  const ring = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * orbit.radius, 0, Math.sin(a) * orbit.radius));
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ transparent: true, depthWrite: false }),
    );
    return line;
  }, [orbit.radius]);

  useEffect(() => {
    const mat = ring.material as THREE.LineBasicMaterial;
    mat.color.set(color);
    mat.opacity = dark ? 0.1 : 0.14;
  }, [ring, color, dark]);

  useFrame((_, delta) => {
    if (animate) angle.current += delta * orbit.speed;
    node.current?.position.set(
      Math.cos(angle.current) * orbit.radius,
      0,
      Math.sin(angle.current) * orbit.radius,
    );
  });

  return (
    <group rotation={orbit.tilt as unknown as [number, number, number]}>
      <primitive object={ring} />
      <mesh ref={node}>
        <sphereGeometry args={[orbit.size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Rig({
  mouse,
  children,
  animate,
}: {
  mouse: React.RefObject<THREE.Vector2>;
  children: React.ReactNode;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const wide = size.width >= 1000;

  // Wide screens: beside the name. Narrow screens: smaller, tucked top-right.
  const x = wide ? viewport.width * 0.2 : viewport.width * 0.3;
  const baseY = wide ? viewport.height * 0.17 : viewport.height * 0.22;
  const scale = wide
    ? Math.min(1, viewport.height / 7)
    : Math.min(0.75, viewport.width / 7.5);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const m = mouse.current!;
    if (animate) g.rotation.y += delta * 0.06;
    // Ease towards the cursor for a gentle parallax tilt
    g.rotation.x += (m.y * 0.35 - g.rotation.x) * 0.04;
    g.rotation.z += (-m.x * 0.12 - g.rotation.z) * 0.04;
    // Drift upwards as the hero scrolls away
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    g.position.y = baseY + scroll * 1.2;
  });

  return (
    <group ref={group} position={[x, baseY, 0]} scale={scale}>
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function HeroScene() {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const colors = dark ? PALETTE.dark : PALETTE.light;
  const mouse = useRef(new THREE.Vector2());
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Track the cursor across the whole window so the canvas never blocks clicks
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    const onLeave = () => mouse.current.set(0, 0);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Stop rendering once the hero has scrolled out of view
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = !reducedMotion;

  return (
    <div ref={wrapper} className="hero-canvas pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
      >
        <Rig mouse={mouse} animate={animate}>
          <ParticleCore mouse={mouse} colors={colors} dark={dark} animate={animate} />
          {ORBITS.map((orbit, i) => (
            <Orbit key={i} orbit={orbit} color={colors.node} dark={dark} animate={animate} />
          ))}
        </Rig>
      </Canvas>
    </div>
  );
}
