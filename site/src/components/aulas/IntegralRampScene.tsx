"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { rampFormat, rampHeight, rampSlices, rampVolume, type RampModel } from "@/lib/integral-ramp";
import styles from "./ContinuityBridge.module.css";

type Controls = { update: (model: RampModel, x: number, count: number | null) => void; reset: () => void; zoom: (factor:number) => void };
export default function IntegralRampScene({model,x,count,onPositionChange}:{model:RampModel;x:number;count:number|null;onPositionChange:(x:number)=>void}) {
  const host=useRef<HTMLDivElement>(null);
  const controls=useRef<Controls|null>(null);
  const change=useRef(onPositionChange);
  const [unavailable,setUnavailable]=useState(false);
  useEffect(()=>{change.current=onPositionChange;},[onPositionChange]);
  useEffect(()=>{
    const container=host.current;if(!container)return;
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"low-power"});}
    catch{
      // eslint-disable-next-line react-hooks/set-state-in-effect -- report an unavailable external graphics context
      setUnavailable(true);return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
    const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute("role","img");container.appendChild(canvas);
    const scene=new THREE.Scene();scene.background=new THREE.Color(0xeaf0ed);
    const camera=new THREE.PerspectiveCamera(34,1,0.1,70);
    const orbit=new OrbitControls(camera,canvas);orbit.enablePan=false;orbit.minDistance=7;orbit.maxDistance=23;
    orbit.minPolarAngle=.15;orbit.maxPolarAngle=Math.PI/2-.06;
    scene.add(new THREE.HemisphereLight(0xffffff,0x8e9993,2.8));
    const light=new THREE.DirectionalLight(0xfff4da,3.2);light.position.set(-3,9,5);light.castShadow=true;
    light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-7,right:7,top:6,bottom:-6,near:.5,far:25});light.shadow.normalBias=.03;scene.add(light);
    const fill=new THREE.DirectionalLight(0xd3e6ff,1.5);fill.position.set(4,3,-5);scene.add(fill);
    const concrete=new THREE.MeshStandardMaterial({color:0xa7a69d,roughness:.93});
    const blue=new THREE.MeshStandardMaterial({color:0x2579a4,roughness:.4,metalness:.2});
    const edge=new THREE.LineBasicMaterial({color:0x627770,transparent:true,opacity:.5});
    const sliceEdge=new THREE.LineBasicMaterial({color:0x3d6980,transparent:true,opacity:.6});
    const blueGlass=new THREE.MeshStandardMaterial({color:0x58b5d2,transparent:true,opacity:.45,side:THREE.DoubleSide,depthWrite:false});
    const blockMaterial=new THREE.MeshStandardMaterial({color:0x7ba9b3,roughness:.7,transparent:true,opacity:.82});
    const foundationMat=new THREE.MeshStandardMaterial({color:0xc5c7bd,roughness:1});
    const groundMat=new THREE.MeshStandardMaterial({color:0xeaf0ed,roughness:1});
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(60,60),groundMat);floor.rotation.x=-Math.PI/2;floor.position.y=-.15;floor.receiveShadow=true;scene.add(floor);
    const grid=new THREE.GridHelper(14,28,0xd0dbd4,0xdce5df);grid.position.y=-.14;scene.add(grid);
    const group=new THREE.Group();scene.add(group);
    const knob=new THREE.Mesh(new THREE.SphereGeometry(.14,24,16),blue);knob.castShadow=true;scene.add(knob);
    const section=new THREE.Mesh(new THREE.BoxGeometry(.018,1,1),blueGlass);section.renderOrder=3;scene.add(section);
    let current:RampModel|undefined,currentX=0,active=true,dragging:number|null=null;
    const geometries=new Set<THREE.BufferGeometry>();
    function clearModel(){group.clear();geometries.forEach(g=>g.dispose());geometries.clear();}
    function mesh(geometry:THREE.BufferGeometry,material:THREE.Material) {
      geometries.add(geometry);const m=new THREE.Mesh(geometry,material);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;
    }
    function wedge(m:RampModel,end:number) {
      const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(end,0);shape.lineTo(end,rampHeight(m,end));shape.lineTo(0,m.startHeight);shape.closePath();
      return new THREE.ExtrudeGeometry(shape,{depth:m.width,bevelEnabled:false,steps:1});
    }
    function outline(g:THREE.BufferGeometry,material:THREE.LineBasicMaterial,position:THREE.Vector3) {
      const edges=new THREE.EdgesGeometry(g);geometries.add(edges);const lines=new THREE.LineSegments(edges,material);lines.position.copy(position);group.add(lines);
    }
    function render(){if(active)renderer.render(scene,camera);}
    function reset(){camera.position.set(8,6.7,9);orbit.target.set(0,.4,0);orbit.update();render();}
    function resize(){const r=container!.getBoundingClientRect();renderer.setSize(r.width,Math.max(r.height,1),false);camera.aspect=r.width/Math.max(r.height,1);camera.updateProjectionMatrix();render();}
    const observer=new ResizeObserver(resize);observer.observe(container);orbit.addEventListener("change",render);
    const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),hit=new THREE.Vector3();
    const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-.16);
    function locate(e:PointerEvent){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);}
    function down(e:PointerEvent){if(e.button!==0||!current)return;locate(e);if(!ray.intersectObject(knob).length&&!ray.intersectObject(section).length)return;e.preventDefault();e.stopImmediatePropagation();dragging=e.pointerId;orbit.enabled=false;canvas.setPointerCapture(e.pointerId);}
    function move(e:PointerEvent){if(dragging!==e.pointerId||!current)return;e.preventDefault();e.stopImmediatePropagation();locate(e);if(ray.ray.intersectPlane(plane,hit))change.current(Math.max(0,Math.min(current.length,hit.x+current.length/2)));}
    function up(e:PointerEvent){if(dragging!==e.pointerId)return;dragging=null;orbit.enabled=true;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}
    function key(e:KeyboardEvent){if(!current)return;if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();change.current(Math.max(0,Math.min(current.length,currentX+(e.key==="ArrowRight"?.1:-.1))));}else if(e.key==="Home"){e.preventDefault();change.current(0);}else if(e.key==="End"){e.preventDefault();change.current(current.length);}}
    function lost(e:Event){e.preventDefault();setUnavailable(true);}
    function restored(){setUnavailable(false);render();}
    canvas.addEventListener("pointerdown",down,true);canvas.addEventListener("pointermove",move,true);
    canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",up);canvas.addEventListener("lostpointercapture",up);
    canvas.addEventListener("keydown",key);canvas.addEventListener("webglcontextlost",lost);canvas.addEventListener("webglcontextrestored",restored);
    controls.current={reset,zoom:factor=>{const offset=camera.position.clone().sub(orbit.target).multiplyScalar(factor);offset.setLength(THREE.MathUtils.clamp(offset.length(),7,23));camera.position.copy(orbit.target).add(offset);orbit.update();render();},update:(m,end,n)=>{
      current=m;currentX=end;clearModel();
      const slab=mesh(new THREE.BoxGeometry(m.length+.4,.16,m.width+.4),foundationMat);slab.position.set(0,-.04,0);
      const target=wedge(m,m.length);geometries.add(target);outline(target,edge,new THREE.Vector3(-m.length/2,.045,-m.width/2));
      if(end>.00001){
        if(n===null){const solid=mesh(wedge(m,end),concrete);solid.position.set(-m.length/2,.045,-m.width/2);outline(solid.geometry,edge,solid.position);}
        else for(const s of rampSlices(m,end,n)){const block=mesh(new THREE.BoxGeometry(s.end-s.start,s.height,m.width),blockMaterial);block.position.set(-m.length/2+(s.end+s.start)/2,.045+s.height/2,0);outline(block.geometry,sliceEdge,block.position);}
      }
      const h=rampHeight(m,end);section.scale.set(1,h,m.width+.04);section.position.set(end-m.length/2,.045+h/2,0);
      knob.position.set(end-m.length/2,.17,m.width/2+.32);
      canvas.setAttribute("aria-label",`Rampa 3D com ${rampFormat(end)} metros preenchidos e ${rampFormat(rampVolume(m,end),3)} metros cúbicos de concreto. ${n===null?"Volume contínuo.":n+" fatias retangulares."} Arraste o corte azul ou use as setas para mover; Home esvazia e End preenche. Arraste o fundo para girar.`);
      render();
    }};
    reset();resize();
    return ()=>{
      active=false;observer.disconnect();orbit.removeEventListener("change",render);orbit.dispose();controls.current=null;clearModel();
      canvas.removeEventListener("pointerdown",down,true);canvas.removeEventListener("pointermove",move,true);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);canvas.removeEventListener("lostpointercapture",up);canvas.removeEventListener("keydown",key);canvas.removeEventListener("webglcontextlost",lost);canvas.removeEventListener("webglcontextrestored",restored);
      for(const obj of [knob,section,floor,grid])obj.geometry.dispose();
      const mats=Array.isArray(grid.material)?grid.material:[grid.material];
      [concrete,blue,edge,sliceEdge,blueGlass,blockMaterial,foundationMat,groundMat,...mats].forEach(m=>m.dispose());
      light.shadow.dispose();renderer.dispose();canvas.remove();
    };
  },[]);
  useEffect(()=>{controls.current?.update(model,x,count);},[model,x,count]);
  return <div className={styles.scene}>
    <div ref={host} className={styles.canvas}/>
    <div className={styles.sceneHeading}><span>RAMPA DE CONCRETO</span><b>3D</b></div>
    <p className={styles.legend}>{count===null?"Cinza: concreto · azul: corte atual":"Azul: blocos aproximados · contorno: rampa exata"}</p>
    {unavailable&&<p className={styles.unavailable} role="status">A cena 3D não pôde ser exibida. Os controles, o gráfico e o cálculo de volume continuam disponíveis.</p>}
    <div className={styles.camera} role="group" aria-label="Câmera da rampa"><button type="button" onClick={()=>controls.current?.reset()}>Restaurar visão</button><button type="button" aria-label="Aproximar câmera da rampa" onClick={()=>controls.current?.zoom(.85)}>+</button><button type="button" aria-label="Afastar câmera da rampa" onClick={()=>controls.current?.zoom(1.18)}>−</button></div>
    <p className={styles.cameraHint}>Arraste o fundo para girar · corte azul para preencher</p>
  </div>;
}
