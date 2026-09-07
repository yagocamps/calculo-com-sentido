"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { MotionScenario } from "@/lib/motion-limit";
import styles from "./MotionLimitBench.module.css";

type SceneControl = {
  update: (value: number, scenario: MotionScenario) => void;
  view: (name: "perspective" | "front" | "top") => void;
  zoom: (factor: number) => void;
  rotate: (angle: number) => void;
};

export default function MotionBenchScene({ value, scenario }: { value: number; scenario: MotionScenario }) {
  const host = useRef<HTMLDivElement>(null);
  const control = useRef<SceneControl | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power" });
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- report external WebGL initialization failure
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.setAttribute("aria-label", "Bancada tridimensional: arraste para girar a câmera. Os controles abaixo alteram o ensaio.");
    renderer.domElement.setAttribute("role", "img");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e8edf2");
    scene.fog = new THREE.Fog("#e8edf2", 22, 48);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 70);
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enablePan = false;
    orbit.enableDamping = false;
    orbit.minDistance = 6;
    orbit.maxDistance = 25;
    orbit.minPolarAngle = 0.06;
    orbit.maxPolarAngle = Math.PI / 2 - 0.025;
    orbit.target.set(0, 0.6, 0);

    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentMap = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentMap.texture;
    scene.environmentIntensity = 0.7;
    environment.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8190a0, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(-3, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -7, right: 7, top: 5, bottom: -5, near: 0.5, far: 25 });
    key.shadow.normalBias = 0.04;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb8d7ff, 2);
    rim.position.set(4, 4, -5); scene.add(rim);

    const materials = {
      aluminum: new THREE.MeshStandardMaterial({ color: 0x9aa9b6, metalness: 0.8, roughness: 0.27 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xd8e1e8, metalness: 0.95, roughness: 0.18 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1e2935, metalness: 0.4, roughness: 0.4 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x18202b, roughness: 0.82 }),
      blue: new THREE.MeshStandardMaterial({ color: 0x2b628c, metalness: 0.45, roughness: 0.28 }),
      orange: new THREE.MeshStandardMaterial({ color: 0xe68a36, metalness: 0.45, roughness: 0.35 }),
      cyan: new THREE.MeshStandardMaterial({ color: 0x2ad9d0, emissive: 0x11a7b0, emissiveIntensity: 0.75 }),
    };
    const box = (parent: THREE.Object3D, size: [number, number, number], pos: [number, number, number], material: THREE.Material, radius = 0.035) => {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, radius), material);
      mesh.position.set(...pos); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    };
    const cylinder = (parent: THREE.Object3D, radius: number, length: number, pos: [number, number, number], material: THREE.Material, axis: "x" | "y" | "z" = "y") => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 24), material);
      if (axis === "x") mesh.rotation.z = Math.PI / 2;
      if (axis === "z") mesh.rotation.x = Math.PI / 2;
      mesh.position.set(...pos); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    };
    const textures: THREE.Texture[] = [];
    function label(text: string, position: [number, number, number], color = "#35475b", scale = 1) {
      const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 96;
      const context = canvas.getContext("2d")!;
      context.fillStyle = color; context.font = "600 36px Arial"; context.textAlign = "center";
      context.fillText(text, 256, 60);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
      sprite.scale.set(2.4 * scale, 0.45 * scale, 1); sprite.position.set(...position); scene.add(sprite); return sprite;
    }

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.MeshStandardMaterial({ color: 0xe8edf2, roughness: 1 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.13; floor.receiveShadow = true; scene.add(floor);
    const grid = new THREE.GridHelper(30, 30, 0xc8d1da, 0xd5dce3);
    grid.material.transparent = true; grid.material.opacity = 0.3;
    grid.position.y = -0.12; scene.add(grid);
    box(scene, [9.1, 0.28, 2.2], [0, 0.29, 0], materials.aluminum, 0.09);
    box(scene, [8.8, 0.08, 1.96], [0, 0.47, 0], materials.dark);
    for (const z of [-0.6, 0.6]) {
      cylinder(scene, 0.085, 8.35, [0, 0.78, z], materials.steel, "x");
      for (const x of [-4.02, 4.02]) {
        box(scene, [0.38, 0.38, 0.34], [x, 0.63, z], materials.blue);
        cylinder(scene, 0.045, 0.035, [x, 0.84, z + 0.09], materials.dark);
      }
    }
    for (const x of [-3.85, 3.85]) for (const z of [-0.78, 0.78]) {
      cylinder(scene, 0.19, 0.28, [x, 0.04, z], materials.rubber);
      cylinder(scene, 0.055, 0.018, [x, 0.444, z], materials.steel);
    }
    for (let i = 0; i <= 64; i++) box(scene, [0.012, 0.009, i % 8 === 0 ? 0.18 : 0.08], [-3.36 + i * 0.105, 0.519, 0.89], materials.steel, 0.002);
    label("TRILHO LINEAR  /  s (m)", [0, 0.24, 1.7], "#566678", 0.8);
    label("6", [-3.15, 0.6, 1.16], "#566678", 0.55);
    label("9", [0, 0.6, 1.16], "#566678", 0.55);
    label("12", [3.15, 0.6, 1.16], "#566678", 0.55);

    const cart = new THREE.Group(); scene.add(cart);
    box(cart, [1.13, 0.26, 1.37], [0, 1.05, 0], materials.blue, 0.08);
    box(cart, [0.8, 0.08, 1.05], [0, 1.22, 0], materials.aluminum);
    box(cart, [0.4, 0.23, 0.55], [-0.12, 1.36, 0], materials.dark);
    box(cart, [0.18, 0.025, 0.36], [-0.14, 1.49, 0], materials.cyan, 0.009);
    const wheels: THREE.Mesh[] = [];
    for (const x of [-0.38, 0.38]) for (const z of [-0.67, 0.67]) {
      wheels.push(cylinder(cart, 0.19, 0.16, [x, 0.79, z], materials.rubber, "z"));
      cylinder(cart, 0.1, 0.175, [x, 0.79, z], materials.steel, "z");
      cylinder(cart, 0.035, 0.185, [x, 0.79, z], materials.dark, "z");
      cylinder(cart, 0.035, 0.03, [x, 1.28, z * 0.65], materials.dark);
    }
    box(cart, [0.23, 0.42, 0.45], [0.38, 1.25, 0], materials.orange);
    cylinder(cart, 0.09, 0.18, [0.38, 1.52, 0], materials.steel);
    cylinder(cart, 0.15, 0.07, [0.38, 1.64, 0], materials.dark);

    box(scene, [0.35, 0.65, 0.65], [-4.02, 0.95, 0], materials.dark);
    cylinder(scene, 0.13, 0.11, [-3.79, 1.13, 0], materials.steel, "x");
    cylinder(scene, 0.095, 0.13, [-3.74, 1.13, 0], materials.cyan, "x");
    const encoderLabel = label("ENCODER", [-4, 1.82, 0], "#227b80", 0.8);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 8), new THREE.MeshBasicMaterial({color:0x14baba, transparent:true, opacity:0.65}));
    beam.rotation.z = Math.PI / 2; scene.add(beam);

    const reference = new THREE.Group(); scene.add(reference);
    box(reference, [0.012, 1.8, 1.8], [0, 1.22, 0], new THREE.MeshBasicMaterial({color:0x8675bc, transparent:true, opacity:0.1, depthWrite:false}), 0.001);
    const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.012, 1.8, 1.8)), new THREE.LineBasicMaterial({color:0x8675bc, transparent:true, opacity:0.65}));
    frame.position.set(0, 1.22, 0); reference.add(frame);
    const referenceLabel = label("t₀ = 3 s  ·  s = 9 m", [0, 2.5, 0], "#66548f", 1);
    const velocityArrow = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,2.15,0), 2, 0x286696, 0.2, 0.12);
    const frictionArrow = new THREE.ArrowHelper(new THREE.Vector3(-1,0,0), new THREE.Vector3(0,1.9,0.3), 2, 0xd67829, 0.2, 0.12);
    scene.add(velocityArrow, frictionArrow);

    let animation = 0;
    let active = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function render() { if (active) renderer.render(scene, camera); }
    orbit.addEventListener("change", render);
    function view(name: "perspective" | "front" | "top") {
      camera.position.set(...(name === "front" ? [0, 3, 15] : name === "top" ? [0, 16, 0.1] : [7.5, 7.1, 12]) as [number,number,number]);
      orbit.target.set(0, 0.7, 0); orbit.update(); render();
    }
    function resize() {
      if (!container || !container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); render();
    }
    const observer = new ResizeObserver(resize); observer.observe(container);
    const lost = (event: Event) => { event.preventDefault(); active = false; setUnavailable(true); };
    const restored = () => { active = true; setUnavailable(false); render(); };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    control.current = {
      view,
      zoom: factor => { const offset = camera.position.clone().sub(orbit.target).multiplyScalar(factor); offset.setLength(THREE.MathUtils.clamp(offset.length(), 6, 25)); camera.position.copy(orbit.target).add(offset); orbit.update(); render(); },
      rotate: angle => { const offset = camera.position.clone().sub(orbit.target); offset.applyAxisAngle(new THREE.Vector3(0,1,0), angle); camera.position.copy(orbit.target).add(offset); orbit.update(); render(); },
      update: (next, mode) => {
        cancelAnimationFrame(animation);
        const isFriction = mode === "friction";
        const target = isFriction ? 0 : ((3 + next) ** 2 - 9) * 1.05;
        reference.visible = referenceLabel.visible = beam.visible = encoderLabel.visible = !isFriction;
        velocityArrow.visible = frictionArrow.visible = isFriction;
        velocityArrow.setDirection(new THREE.Vector3(Math.sign(next), 0, 0));
        velocityArrow.setLength(Math.abs(next) * 1.5, Math.min(0.2, Math.abs(next) * 0.5), Math.min(0.12, Math.abs(next) * 0.25));
        frictionArrow.setDirection(new THREE.Vector3(-Math.sign(next), 0, 0));
        const from = cart.position.x;
        const start = performance.now();
        function position(x: number) {
          cart.position.x = x;
          wheels.forEach(wheel => { wheel.rotation.y = x / 0.19; });
          const length = Math.max(0.001, x - 0.6 + 3.68);
          beam.scale.y = length; beam.position.set(-3.68 + length / 2, 1.13, 0);
        }
        function animate(now: number) {
          const progress = reducedMotion.matches || isFriction || !active ? 1 : Math.min((now - start) / 400, 1);
          position(THREE.MathUtils.lerp(from, target, 1 - (1 - progress) ** 3)); render();
          if (progress < 1 && active) animation = requestAnimationFrame(animate);
        }
        animate(start);
      },
    };
    view("perspective"); resize();
    return () => {
      active = false; cancelAnimationFrame(animation); observer.disconnect(); orbit.dispose(); control.current = null;
      renderer.domElement.removeEventListener("webglcontextlost", lost); renderer.domElement.removeEventListener("webglcontextrestored", restored);
      const geometries = new Set<THREE.BufferGeometry>(); const disposableMaterials = new Set<THREE.Material>();
      scene.traverse(object => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(material => disposableMaterials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose()); disposableMaterials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose()); environmentMap.dispose(); key.shadow.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  useEffect(() => { control.current?.update(value, scenario); }, [value, scenario]);

  return <div className={styles.scene}>
    <div ref={host} className={styles.sceneCanvas} />
    <div className={styles.sceneHeading}><span>BANCADA DE MOVIMENTO</span><b>3D</b></div>
    <div className={styles.sceneLegend}>{scenario === "friction" ? <><span>Azul · velocidade</span><span>Laranja · força de atrito</span></> : <><span>Violeta · posição de referência</span><span>Azul · posição medida</span></>}</div>
    {unavailable && <p className={styles.sceneUnavailable} role="status">A cena 3D não pôde ser exibida neste navegador. As leituras e os controles do ensaio continuam disponíveis abaixo.</p>}
    <div className={styles.cameraTools} role="group" aria-label="Câmera 3D">
      <button type="button" onClick={() => control.current?.view("perspective")}>Perspectiva</button>
      <button type="button" onClick={() => control.current?.view("front")}>Frente</button>
      <button type="button" onClick={() => control.current?.view("top")}>Topo</button>
      <button type="button" aria-label="Girar câmera para a esquerda" onClick={() => control.current?.rotate(-Math.PI / 8)}>↶</button>
      <button type="button" aria-label="Girar câmera para a direita" onClick={() => control.current?.rotate(Math.PI / 8)}>↷</button>
      <button type="button" aria-label="Aproximar câmera" onClick={() => control.current?.zoom(0.85)}>+</button>
      <button type="button" aria-label="Afastar câmera" onClick={() => control.current?.zoom(1.18)}>−</button>
    </div>
    <p className={styles.cameraHint}>Arraste para girar · role para aproximar</p>
  </div>;
}
