"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { MAX_TANK_TIME, TANK_CAPACITY, tankFormat, tankRate, tankVolume } from "@/lib/derivative-tank";
import styles from "./ContinuityBridge.module.css";

type SceneControl = { update: (time: number, drain: boolean, interval: number | null) => void; reset: () => void; zoom: (factor: number) => void; };
export default function DerivativeTankScene({ time, drain, interval, onTimeChange }: { time: number; drain: boolean; interval: number | null; onTimeChange: (time: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const control = useRef<SceneControl | null>(null);
  const callback = useRef(onTimeChange);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => { callback.current = onTimeChange; }, [onTimeChange]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" }); }
    catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- external WebGL initialization failure
      setUnavailable(true); return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
    const canvas = renderer.domElement;
    canvas.setAttribute("role", "img"); canvas.tabIndex = 0; container.appendChild(canvas);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eaf0ed"); scene.fog = new THREE.Fog("#eaf0ed", 26, 55);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
    const orbit = new OrbitControls(camera, canvas);
    orbit.enablePan = false; orbit.enableDamping = false; orbit.minDistance = 7; orbit.maxDistance = 22;
    orbit.minPolarAngle = 0.1; orbit.maxPolarAngle = Math.PI / 2 - 0.04;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8b9ca2, 2.6));
    const sun = new THREE.DirectionalLight(0xfff7e3, 3.4);
    sun.position.set(-4, 10, 6); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.5, far: 25 }); sun.shadow.normalBias = 0.025; scene.add(sun);
    const fill = new THREE.DirectionalLight(0xb9d9ff, 1.5); fill.position.set(5, 5, -5); scene.add(fill);
    const material = (color: number, metalness = 0, roughness = 0.65) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const steel = material(0xa3b0b7, 0.65, 0.3);
    const dark = material(0x263744, 0.2);
    const blue = material(0x287eab, 0.35, 0.3);
    const brass = material(0xe0ab42, 0.5, 0.3);
    const white = material(0xe9efee);
    const rubber = material(0x24313b);
    const textures: THREE.Texture[] = [];
    function box(parent: THREE.Object3D, size: [number, number, number], position: [number, number, number], mat: THREE.Material, radius = 0.035) {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, radius), mat);
      mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    }
    function cylinder(parent: THREE.Object3D, radius: number, length: number, position: [number, number, number], mat: THREE.Material, axis: "x" | "y" | "z" = "y") {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 48), mat);
      if (axis === "x") mesh.rotation.z = Math.PI / 2;
      if (axis === "z") mesh.rotation.x = Math.PI / 2;
      mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    }
    function ring(parent: THREE.Object3D, radius: number, tube: number, position: [number, number, number], mat: THREE.Material, horizontal = true) {
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 64), mat);
      if (horizontal) mesh.rotation.x = Math.PI / 2;
      mesh.position.set(...position); mesh.castShadow = true; parent.add(mesh); return mesh;
    }
    function label(text: string, position: [number, number, number], color = "#3d5863", scale = 1) {
      const bitmap = document.createElement("canvas"); bitmap.width = 512; bitmap.height = 96;
      const ctx = bitmap.getContext("2d")!; ctx.fillStyle = color; ctx.font = "700 38px Arial"; ctx.textAlign = "center"; ctx.fillText(text, 256, 60);
      const texture = new THREE.CanvasTexture(bitmap); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
      sprite.scale.set(2.6 * scale, 0.49 * scale, 1); sprite.position.set(...position); scene.add(sprite); return sprite;
    }
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), material(0xeaf0ed)); floor.rotation.x = -Math.PI / 2; floor.position.y = -0.22; floor.receiveShadow = true; scene.add(floor);
    box(scene, [6.8, 0.22, 4], [0, 0.12, 0], steel, 0.12);
    box(scene, [6.6, 0.045, 3.8], [0, 0.245, 0], dark);
    for (const x of [-2.7, 2.7]) for (const z of [-1.4, 1.4]) cylinder(scene, 0.19, 0.25, [x, -0.05, z], rubber);
    const center = -0.75;
    const bottom = 0.72;
    const fullHeight = 3.3;
    for (const dx of [-0.85, 0.85]) for (const z of [-0.8, 0.8]) cylinder(scene, 0.075, 0.45, [center + dx, 0.48, z], steel);
    cylinder(scene, 1.32, 0.14, [center, bottom - 0.07, 0], steel);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, fullHeight, 64, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xdaf5f4, transparent: true, opacity: 0.15, roughness: 0.1, metalness: 0.05, side: THREE.DoubleSide, depthWrite: false }));
    glass.position.set(center, bottom + fullHeight / 2, 0); glass.renderOrder = 4; scene.add(glass);
    ring(scene, 1.31, 0.065, [center, bottom, 0], steel);
    ring(scene, 1.31, 0.065, [center, bottom + fullHeight, 0], steel);
    for (const a of [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]) cylinder(scene, 0.027, fullHeight, [center + Math.cos(a) * 1.34, bottom + fullHeight / 2, Math.sin(a) * 1.34], steel);
    const waterMaterial = new THREE.MeshPhysicalMaterial({ color: 0x238dba, transparent: true, opacity: 0.78, roughness: 0.15, metalness: 0.1, depthWrite: false });
    const water = cylinder(scene, 1.26, 1, [center, bottom + 0.5, 0], waterMaterial); water.castShadow = false; water.renderOrder = 1;
    const surface = new THREE.Mesh(new THREE.CircleGeometry(1.26, 64), new THREE.MeshBasicMaterial({ color: 0x6fc9df, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false }));
    surface.rotation.x = -Math.PI / 2; surface.renderOrder = 2; scene.add(surface);
    const waterEdge = ring(scene, 1.27, 0.019, [center, bottom + 1, 0], new THREE.MeshBasicMaterial({ color: 0x136a93 })); waterEdge.renderOrder = 3;
    const future = ring(scene, 1.34, 0.028, [center, bottom + 1.5, 0], new THREE.MeshBasicMaterial({ color: 0xd99b29 })); future.renderOrder = 5;
    const futureLabel = label("DEPOIS", [center, 3, 1.6], "#956212", 0.65);
    for (const liters of [25, 50, 75, 100]) {
      box(scene, [0.2, 0.014, 0.025], [center + 0.55, bottom + liters / 100 * fullHeight, 1.22], white, 0.002);
      label(liters + " L", [center + 0.88, bottom + liters / 100 * fullHeight, 1.22], "#416470", 0.45);
    }
    // Inlet pump, pipework and nozzle.
    box(scene, [0.75, 0.2, 0.8], [-2.7, 0.39, -0.4], steel);
    cylinder(scene, 0.29, 0.65, [-2.7, 0.8, -0.35], blue, "z");
    cylinder(scene, 0.18, 0.68, [-2.7, 0.8, -0.35], steel, "z");
    cylinder(scene, 0.08, 3.55, [-2.7, 2.5, 0], steel);
    cylinder(scene, 0.08, 1.95, [-1.725, 4.28, 0], steel, "x");
    cylinder(scene, 0.105, 0.32, [center, 4.16, 0], brass);
    for (const y of [1.1, 3.9]) ring(scene, 0.12, 0.028, [-2.7, y, 0], brass);
    const rotor = new THREE.Group(); rotor.position.set(-2.7, 0.8, 0.025); scene.add(rotor);
    ring(rotor, 0.22, 0.027, [0, 0, 0], brass, false);
    box(rotor, [0.4, 0.036, 0.035], [0, 0, 0], brass, 0.005);
    box(rotor, [0.036, 0.4, 0.035], [0, 0, 0], brass, 0.005);
    const inletLabel = label("ENTRADA", [-2.7, 1.45, 0], "#287b99", 0.65);
    const stream = cylinder(scene, 1, 1, [center, 3, 0], new THREE.MeshBasicMaterial({ color: 0x4fc0dd, transparent: true, opacity: 0.6, depthWrite: false }));
    stream.castShadow = false; stream.renderOrder = 2;
    const drops = Array.from({ length: 4 }, () => {
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), new THREE.MeshBasicMaterial({ color: 0xb9ecf4 }));
      drop.renderOrder = 3; scene.add(drop); return drop;
    });
    // Separate outlet, visibly active only in the draining experiment.
    cylinder(scene, 0.09, 1.15, [1.1, 0.82, 0], steel, "x");
    cylinder(scene, 0.15, 0.22, [1.15, 0.82, 0], brass, "x");
    cylinder(scene, 0.09, 0.5, [1.67, 0.57, 0], steel);
    const outletArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0.8, 1.08, 0), 0.8, 0x278cb3, 0.2, 0.13); scene.add(outletArrow);
    const outletLabel = label("SAÍDA", [1.15, 0.65, 1.1], "#287b99", 0.65);
    // A draggable rotary time control; HTML controls provide its keyboard equivalent.
    box(scene, [0.95, 0.12, 0.65], [2.45, 0.33, 1.0], steel);
    box(scene, [0.13, 0.65, 0.13], [2.45, 0.68, 1.0], steel);
    box(scene, [1.1, 1.1, 0.16], [2.45, 1.3, 1.0], dark, 0.08);
    const knob = new THREE.Group(); knob.position.set(2.45, 1.3, 1.13); scene.add(knob);
    cylinder(knob, 0.3, 0.2, [0, 0, 0], blue, "z");
    const hand = box(knob, [0.035, 0.2, 0.024], [0, 0.15, 0.11], white, 0.003);
    for (let i = 0; i <= 12; i++) {
      const a = -Math.PI * 0.75 + i / 12 * Math.PI * 1.5;
      box(scene, [0.025, 0.025, 0.02], [2.45 + Math.sin(a) * 0.4, 1.3 + Math.cos(a) * 0.4, 1.1], brass, 0.003);
    }
    label("TEMPO ↔", [2.45, 2.15, 1.0], "#326883", 0.8);
    label("0 s", [2.06, 0.73, 1.13], "#48636c", 0.4);
    label("6 s", [2.84, 0.73, 1.13], "#48636c", 0.4);
    let active = true;
    let currentTime = 2;
    function render() { if (active) renderer.render(scene, camera); }
    function reset() { camera.position.set(7, 6, 11); orbit.target.set(-0.1, 2, 0); orbit.update(); render(); }
    function resize() {
      if (!container?.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight); render();
    }
    orbit.addEventListener("change", render);
    const observer = new ResizeObserver(resize); observer.observe(container);
    const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
    const plane = new THREE.Plane(); const hit = new THREE.Vector3();
    let dragging: { id: number; x: number; time: number } | null = null;
    function cast(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1); raycaster.setFromCamera(pointer, camera);
    }
    function down(event: PointerEvent) {
      if (event.button !== 0 || dragging) return;
      cast(event); if (!raycaster.intersectObject(knob, true).length) return;
      const normal = camera.getWorldDirection(new THREE.Vector3()); normal.x = 0;
      if (normal.lengthSq() < 0.0001) return;
      plane.setFromNormalAndCoplanarPoint(normal.normalize(), knob.position);
      if (!raycaster.ray.intersectPlane(plane, hit)) return;
      dragging = { id: event.pointerId, x: hit.x, time: currentTime };
      orbit.enabled = false; canvas.setPointerCapture(event.pointerId); canvas.style.cursor = "ew-resize";
      event.preventDefault(); event.stopImmediatePropagation();
      callback.current(currentTime);
    }
    function move(event: PointerEvent) {
      cast(event);
      if (!dragging) { canvas.style.cursor = raycaster.intersectObject(knob, true).length ? "ew-resize" : "grab"; return; }
      if (event.pointerId !== dragging.id) return;
      if (raycaster.ray.intersectPlane(plane, hit)) callback.current(dragging.time + (hit.x - dragging.x) * 2);
      event.preventDefault(); event.stopImmediatePropagation();
    }
    function up(event: PointerEvent) {
      if (!dragging || event.pointerId !== dragging.id) return;
      dragging = null; orbit.enabled = true; canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      event.stopImmediatePropagation();
    }
    function keydown(event: KeyboardEvent) {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault(); const offset = camera.position.clone().sub(orbit.target);
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), event.key === "ArrowLeft" ? -Math.PI / 8 : Math.PI / 8);
      camera.position.copy(orbit.target).add(offset); orbit.update();
    }
    const lost = (event: Event) => { event.preventDefault(); active = false; setUnavailable(true); };
    const restored = () => { active = true; setUnavailable(false); render(); };
    canvas.addEventListener("pointerdown", down, true); canvas.addEventListener("pointermove", move, true);
    canvas.addEventListener("pointerup", up, true); canvas.addEventListener("pointercancel", up, true); canvas.addEventListener("lostpointercapture", up, true);
    canvas.addEventListener("keydown", keydown); canvas.addEventListener("webglcontextlost", lost); canvas.addEventListener("webglcontextrestored", restored);
    control.current = {
      reset,
      zoom: factor => { const offset = camera.position.clone().sub(orbit.target).multiplyScalar(factor); offset.setLength(THREE.MathUtils.clamp(offset.length(), 7, 22)); camera.position.copy(orbit.target).add(offset); orbit.update(); render(); },
      update: (nextTime, isDrain, nextInterval) => {
        currentTime = nextTime;
        const volume = tankVolume(nextTime, isDrain);
        const rate = tankRate(nextTime, isDrain);
        const height = volume / TANK_CAPACITY * fullHeight;
        const level = bottom + height;
        water.scale.y = height; water.position.set(center, bottom + height / 2, 0);
        surface.position.set(center, level + 0.006, 0); waterEdge.position.y = level + 0.006;
        future.visible = futureLabel.visible = nextInterval !== null;
        if (nextInterval !== null) {
          const futureLevel = bottom + tankVolume(nextTime + nextInterval, isDrain) / TANK_CAPACITY * fullHeight;
          future.position.y = futureLevel; futureLabel.position.set(center, futureLevel + 0.2, 1.65);
        }
        stream.visible = !isDrain && rate > 0;
        const length = Math.max(0.01, 4.0 - level);
        const radius = 0.015 + Math.sqrt(Math.abs(rate)) * 0.018;
        stream.scale.set(radius, length, radius); stream.position.set(center, level + length / 2, 0);
        drops.forEach((drop, i) => { drop.visible = stream.visible; drop.position.set(center, 4 - ((nextTime * 2 + i / 4) % 1) * length, 0); });
        rotor.rotation.z = isDrain ? 0 : -(volume - 10) * 0.6;
        inletLabel.visible = !isDrain && nextInterval === null; outletArrow.visible = outletLabel.visible = isDrain;
        outletArrow.setLength(0.25 + Math.abs(rate) * 0.05, 0.15, 0.1);
        outletArrow.visible = isDrain && rate !== 0;
        const dialAngle = -Math.PI * 0.75 + nextTime / MAX_TANK_TIME * Math.PI * 1.5;
        hand.position.set(Math.sin(dialAngle) * 0.14, Math.cos(dialAngle) * 0.14, 0.11);
        hand.rotation.z = -dialAngle;
        canvas.setAttribute("aria-label", "Reservatório 3D de 100 litros. Aos " + tankFormat(nextTime) + " segundos, volume " + tankFormat(volume) + " litros e taxa " + tankFormat(rate) + " litros por segundo. Arraste o controle azul de tempo na horizontal ou use os controles abaixo. Arraste o fundo ou use as setas esquerda e direita para girar a câmera.");
        render();
      },
    };
    reset(); resize();
    return () => {
      active = false; observer.disconnect(); orbit.dispose(); control.current = null;
      canvas.removeEventListener("pointerdown", down, true); canvas.removeEventListener("pointermove", move, true);
      canvas.removeEventListener("pointerup", up, true); canvas.removeEventListener("pointercancel", up, true); canvas.removeEventListener("lostpointercapture", up, true);
      canvas.removeEventListener("keydown", keydown); canvas.removeEventListener("webglcontextlost", lost); canvas.removeEventListener("webglcontextrestored", restored);
      const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
      scene.traverse(object => { const mesh = object as THREE.Mesh; if (mesh.geometry) geometries.add(mesh.geometry); if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(mat => materials.add(mat)); });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(mat => mat.dispose()); textures.forEach(texture => texture.dispose());
      sun.shadow.dispose(); renderer.dispose(); canvas.remove();
    };
  }, []);
  useEffect(() => { control.current?.update(time, drain, interval); }, [time, drain, interval]);
  return <div className={styles.scene}>
    <div className={styles.canvas} ref={host} />
    <div className={styles.sceneHeading}><span>RESERVATÓRIO · 100 L</span><b>3D</b></div>
    <p className={styles.legend}>Arraste o controle azul de tempo ↔</p>
    {unavailable && <p className={styles.unavailable} role="status">A cena 3D não pôde ser exibida. As leituras, os controles de tempo e o gráfico continuam disponíveis.</p>}
    <div className={styles.camera} role="group" aria-label="Câmera do reservatório">
      <button type="button" onClick={() => control.current?.reset()}>Restaurar visão</button>
      <button type="button" aria-label="Aproximar câmera" onClick={() => control.current?.zoom(0.85)}>+</button>
      <button type="button" aria-label="Afastar câmera" onClick={() => control.current?.zoom(1.18)}>−</button>
    </div>
    <p className={styles.cameraHint}>Arraste o fundo para girar · role para aproximar</p>
  </div>;
}
