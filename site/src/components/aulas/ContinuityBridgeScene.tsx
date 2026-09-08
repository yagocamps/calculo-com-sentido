"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { bridgeProfile, bridgeReading, LEFT_HEIGHT } from "@/lib/continuity-bridge";
import styles from "./ContinuityBridge.module.css";

type SceneControl = { update: (height: number, angle: number) => void; reset: () => void; zoom: (factor: number) => void; };
export default function ContinuityBridgeScene({ height, angle, onHeightChange }: { height: number; angle: number; onHeightChange: (height: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const control = useRef<SceneControl | null>(null);
  const callback = useRef(onHeightChange);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => { callback.current = onHeightChange; }, [onHeightChange]);
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    const canvas = renderer.domElement;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Ponte 3D sobre um rio. Arraste a alça dourada para mudar a altura. Arraste o fundo para girar a câmera. Com foco na cena, as setas esquerda e direita giram a visão; os controles abaixo permitem ajustar a ponte pelo teclado.");
    canvas.tabIndex = 0; container.appendChild(canvas);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eaf0ed");
    scene.fog = new THREE.Fog("#eaf0ed", 27, 55);
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 80);
    const orbit = new OrbitControls(camera, canvas);
    orbit.enablePan = false; orbit.enableDamping = false;
    orbit.minDistance = 9; orbit.maxDistance = 24;
    orbit.minPolarAngle = 0.12; orbit.maxPolarAngle = Math.PI / 2 - 0.05;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x718d83, 3));
    const sun = new THREE.DirectionalLight(0xfff6db, 4);
    sun.position.set(-4, 11, 6); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 0.5, far: 30 });
    sun.shadow.normalBias = 0.03; scene.add(sun);
    const fill = new THREE.DirectionalLight(0xc5e2ff, 1.5); fill.position.set(6, 6, -6); scene.add(fill);
    const material = (color: number, roughness = 0.75, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const concrete = material(0xc3c8bc);
    const asphalt = material(0x334553);
    const grass = material(0x9aaf8c);
    const earth = material(0xb4a38c);
    const blue = material(0x317ba9, 0.42, 0.25);
    const gold = material(0xe4a535, 0.38, 0.3);
    const white = material(0xf1ecd9);
    const steel = material(0x758993, 0.3, 0.65);
    const trunk = material(0x77634d);
    const leaves = material(0x587e61);
    const textures: THREE.Texture[] = [];
    function box(parent: THREE.Object3D, size: [number, number, number], position: [number, number, number], mat: THREE.Material, radius = 0.03) {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, radius), mat);
      mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    }
    function label(text: string, position: [number, number, number], color: string, scale = 1) {
      const bitmap = document.createElement("canvas"); bitmap.width = 512; bitmap.height = 96;
      const ctx = bitmap.getContext("2d")!;
      ctx.fillStyle = color; ctx.font = "700 38px Arial"; ctx.textAlign = "center"; ctx.fillText(text, 256, 60);
      const texture = new THREE.CanvasTexture(bitmap); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
      sprite.scale.set(2.9 * scale, 0.54 * scale, 1); sprite.position.set(...position); scene.add(sprite); return sprite;
    }
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material(0xeaf0ed));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.65; ground.receiveShadow = true; scene.add(ground);
    box(scene, [13, 0.35, 11], [0, -0.48, 0], earth, 0.18);
    for (const side of [-1, 1]) {
      box(scene, [3.9, 0.5, 11], [side * 4.55, -0.08, 0], earth, 0.12);
      box(scene, [3.9, 0.15, 11], [side * 4.55, 0.24, 0], grass, 0.12);
      for (const z of [-3.8, 3.5]) {
        const tree = new THREE.Group(); tree.position.set(side * 5.25, 0.3, z); scene.add(tree);
        box(tree, [0.14, 0.75, 0.14], [0, 0.375, 0], trunk);
        const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.68, 1), leaves);
        crown.position.y = 1.05; crown.scale.set(0.8, 1.2, 0.8); crown.castShadow = true; tree.add(crown);
      }
    }
    const water = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 11), new THREE.MeshStandardMaterial({ color: 0x5dabb2, roughness: 0.23, metalness: 0.15, transparent: true, opacity: 0.9 }));
    water.rotation.x = -Math.PI / 2; water.position.y = 0; water.receiveShadow = true; scene.add(water);
    const ripple = new THREE.MeshBasicMaterial({ color: 0xe2f7ed, transparent: true, opacity: 0.35 });
    for (let i = 0; i < 20; i++) box(scene, [0.02, 0.005, 0.3 + i % 3 * 0.12], [-2.1 + (i * 0.71) % 4.2, 0.015, -4.5 + (i * 1.31) % 9], ripple, 0.001);

    function deck(color: THREE.Material, start: number) {
      const group = new THREE.Group();
      box(group, [4, 0.24, 2.2], [start + 2, -0.145, 0], concrete);
      box(group, [4, 0.025, 1.86], [start + 2, -0.0125, 0], asphalt, 0.002);
      for (const z of [-1.04, 1.04]) {
        box(group, [4, 0.13, 0.12], [start + 2, 0.025, z], color);
        box(group, [4, 0.045, 0.045], [start + 2, 0.58, z], color);
        box(group, [4, 0.028, 0.035], [start + 2, 0.32, z], steel);
        for (let i = 0; i <= 5; i++) box(group, [0.045, 0.56, 0.045], [start + 0.1 + i * 0.76, 0.3, z], steel);
      }
      for (let i = 0; i < 5; i++) box(group, [0.43, 0.012, 0.045], [start + 0.4 + i * 0.75, 0.006, 0], white, 0.002);
      return group;
    }
    const leftDeck = deck(blue, -4); leftDeck.position.y = LEFT_HEIGHT; scene.add(leftDeck);
    const rightDeck = deck(gold, 0); rightDeck.matrixAutoUpdate = false; scene.add(rightDeck);
    const supports: Array<{ mesh: THREE.Mesh; x: number; right: boolean }> = [];
    for (const x of [-3.3, 3.3]) {
      box(scene, [1.15, 0.25, 2.25], [x, 0.42, 0], concrete, 0.08);
      for (const z of [-0.65, 0.65]) {
        const mesh = box(scene, [0.4, 1, 0.42], [x, 1.3, z], concrete);
        supports.push({ mesh, x, right: x > 0 });
      }
    }
    // Reference plane is only a marker, never a connecting surface across a jump.
    const seamMaterial = new THREE.MeshBasicMaterial({ color: 0x26816e, transparent: true, opacity: 0.75 });
    const seam = box(scene, [0.035, 0.025, 2.18], [0, LEFT_HEIGHT + 0.02, 0], seamMaterial, 0.002);
    const differenceMaterial = new THREE.MeshBasicMaterial({ color: 0xd68e23 });
    const difference = box(scene, [0.04, 1, 0.04], [0.04, 2.5, 1.23], differenceMaterial, 0.001);
    const leftPin = box(scene, [0.4, 0.025, 0.25], [-0.2, LEFT_HEIGHT + 0.018, 0.62], blue);
    const rightPin = box(scene, [0.4, 0.025, 0.25], [0.2, LEFT_HEIGHT + 0.018, 0.62], gold);
    leftPin.castShadow = rightPin.castShadow = false;
    const handle = new THREE.Group(); scene.add(handle);
    const gripMaterial = new THREE.MeshStandardMaterial({ color: 0xf3b43b, roughness: 0.3, metalness: 0.4, emissive: 0x7b4900, emissiveIntensity: 0.15 });
    const grip = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), gripMaterial); grip.castShadow = true; handle.add(grip);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.035, 8, 40), gold); handle.add(ring);
    const stem = box(scene, [0.025, 0.75, 0.025], [0.5, 3, 1.3], gold, 0.001);
    const gripLabel = label("ARRASTE ↕", [0.5, 4, 1.3], "#8a590d", 0.7);
    label("LADO FIXO", [-2.7, 3.5, -0.1], "#286489", 0.8);
    label("JUNÇÃO", [0, 0.55, 2.1], "#49645b", 0.75);
    let active = true;
    function render() {
      if (!active) return;
      ring.quaternion.copy(camera.quaternion);
      renderer.render(scene, camera);
    }
    function reset() {
      camera.position.set(8, 8, 12); orbit.target.set(0, 1.6, 0); orbit.update(); render();
    }
    orbit.addEventListener("change", render);
    function resize() {
      if (!container?.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight); render();
    }
    const observer = new ResizeObserver(resize); observer.observe(container);
    const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
    const plane = new THREE.Plane(); const hit = new THREE.Vector3();
    let dragging: { id: number; offset: number; startHeight: number } | null = null;
    let currentHeight = LEFT_HEIGHT;
    function cast(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
    }
    function down(event: PointerEvent) {
      if (event.button !== 0 || dragging) return;
      cast(event);
      if (!raycaster.intersectObject(handle, true).length) return;
      const normal = camera.getWorldDirection(new THREE.Vector3()); normal.y = 0;
      if (normal.lengthSq() < 0.0001) return;
      plane.setFromNormalAndCoplanarPoint(normal.normalize(), handle.position);
      if (!raycaster.ray.intersectPlane(plane, hit)) return;
      dragging = { id: event.pointerId, offset: hit.y, startHeight: currentHeight };
      orbit.enabled = false; canvas.setPointerCapture(event.pointerId); canvas.style.cursor = "ns-resize";
      event.preventDefault(); event.stopImmediatePropagation();
    }
    function move(event: PointerEvent) {
      cast(event);
      if (!dragging) {
        canvas.style.cursor = raycaster.intersectObject(handle, true).length ? "ns-resize" : "grab";
        return;
      }
      if (dragging.id !== event.pointerId) return;
      if (raycaster.ray.intersectPlane(plane, hit)) callback.current(dragging.startHeight + hit.y - dragging.offset);
      event.preventDefault(); event.stopImmediatePropagation();
    }
    function up(event: PointerEvent) {
      if (!dragging || dragging.id !== event.pointerId) return;
      dragging = null; orbit.enabled = true; canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      event.stopImmediatePropagation();
    }
    function keydown(event: KeyboardEvent) {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const offset = camera.position.clone().sub(orbit.target);
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
      zoom: factor => {
        const offset = camera.position.clone().sub(orbit.target).multiplyScalar(factor);
        offset.setLength(THREE.MathUtils.clamp(offset.length(), 9, 24));
        camera.position.copy(orbit.target).add(offset); orbit.update(); render();
      },
      update: (nextHeight, nextAngle) => {
        currentHeight = nextHeight;
        const slope = Math.tan(nextAngle * Math.PI / 180);
        rightDeck.matrix.set(1, 0, 0, 0, slope, 1, 0, nextHeight, 0, 0, 1, 0, 0, 0, 0, 1);
        rightDeck.matrixWorldNeedsUpdate = true;
        for (const item of supports) {
          const top = (item.right ? bridgeProfile(item.x, nextHeight, nextAngle) : LEFT_HEIGHT) - 0.24;
          item.mesh.scale.y = top - 0.53; item.mesh.position.y = (top + 0.53) / 2;
        }
        const reading = bridgeReading(nextHeight);
        seam.visible = reading.continuous; difference.visible = !reading.continuous;
        difference.scale.y = Math.max(0.01, Math.abs(reading.difference));
        difference.position.y = (LEFT_HEIGHT + nextHeight) / 2;
        rightPin.position.y = bridgeProfile(0.2, nextHeight, nextAngle) + 0.018;
        rightPin.rotation.z = Math.atan(slope);
        const gripBase = bridgeProfile(0.5, nextHeight, nextAngle);
        handle.position.set(0.5, gripBase + 0.9, 1.3);
        stem.position.set(0.5, gripBase + 0.42, 1.3);
        gripLabel.position.set(0.5, gripBase + 1.4, 1.3);
        canvas.setAttribute("aria-label", "Ponte 3D: lado fixo 2,50 metros; lado ajustável " + nextHeight.toFixed(2).replace(".", ",") + " metros na junção; inclinação " + nextAngle + " graus. " + (reading.continuous ? "Trechos conectados." : "Existe um degrau.") + " Arraste a alça dourada para ajustar a altura ou use os controles abaixo. Arraste o fundo ou use as setas esquerda e direita para girar a câmera.");
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
      scene.traverse(object => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(mat => materials.add(mat));
      });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(mat => mat.dispose());
      textures.forEach(texture => texture.dispose()); sun.shadow.dispose(); renderer.dispose(); canvas.remove();
    };
  }, []);
  useEffect(() => { control.current?.update(height, angle); }, [height, angle]);
  return <div className={styles.scene}>
    <div className={styles.canvas} ref={host} />
    <div className={styles.sceneHeading}><span>PONTE SOBRE O RIO</span><b>3D</b></div>
    <p className={styles.legend}>Azul · fixo &nbsp; / &nbsp; Dourado · ajustável</p>
    {unavailable && <p className={styles.unavailable} role="status">A cena 3D não pôde ser exibida. Você pode continuar usando os botões, os ajustes numéricos e o gráfico abaixo.</p>}
    <div className={styles.camera} role="group" aria-label="Câmera da ponte">
      <button type="button" onClick={() => control.current?.reset()}>Restaurar visão</button>
      <button type="button" aria-label="Aproximar câmera" onClick={() => control.current?.zoom(0.85)}>+</button>
      <button type="button" aria-label="Afastar câmera" onClick={() => control.current?.zoom(1.18)}>−</button>
    </div>
    <p className={styles.cameraHint}>Arraste o fundo para girar · role para aproximar</p>
  </div>;
}
