import type { PlotSpec, PlotTone } from "@/data/plots";

export const PLOT_WIDTH = 600;
export const PLOT_HEIGHT = 340;
type Point = { x: number; y: number };
type Rect = { left: number; right: number; top: number; bottom: number };
type Segment = [Point, Point];
export type PlotLabel = Point & { text: string; tone?: PlotTone; size: number; weight?: number; anchor: "start" | "middle" | "end" };

export function formatPlotTick(value: number) {
  return (Math.abs(value) < 1e-9 ? 0 : value).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function ticks(min: number, max: number, target = 6) {
  const raw = (max - min) / target;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(n => n * power).find(n => n >= raw) ?? power * 10;
  const result: number[] = [];
  for (let value = Math.ceil(min / step) * step; value <= max + 1e-9; value += step) result.push(Math.abs(value) < step / 1000 ? 0 : value);
  return result;
}

export function createPlotScale(spec: PlotSpec) {
  const [xMin, xMax] = spec.x;
  const [yMin, yMax] = spec.y;
  const xTicks = spec.xTicks ?? ticks(xMin, xMax);
  const yTicks = spec.yTicks ?? ticks(yMin, yMax);
  // Reserve the actual number of monospaced characters, including separators.
  const left = spec.axes === "nenhum" ? 46 : Math.max(46, 18 + Math.max(...yTicks.map(t => formatPlotTick(t).length), 0) * 8);
  const right = spec.axes === "nenhum" ? 18 : Math.max(18, 6 + Math.max(...xTicks.map(t => formatPlotTick(t).length), 0) * 4);
  const pad = { top: 34, right, bottom: 48, left };
  const width = PLOT_WIDTH - pad.left - pad.right;
  const height = PLOT_HEIGHT - pad.top - pad.bottom;
  const k = Math.min(width / (xMax - xMin), height / (yMax - yMin));
  const equal = spec.aspect === "igual";
  const extraX = equal ? (width - (xMax - xMin) * k) / 2 : 0;
  const extraY = equal ? (height - (yMax - yMin) * k) / 2 : 0;
  return {
    xMin, xMax, yMin, yMax, pad, width, height, xTicks, yTicks,
    x: (value: number) => pad.left + extraX + (value - xMin) * (equal ? k : width / (xMax - xMin)),
    y: (value: number) => pad.top + height - extraY - (value - yMin) * (equal ? k : height / (yMax - yMin)),
  };
}
export type PlotScale = ReturnType<typeof createPlotScale>;

function labelBox(label: PlotLabel): Rect {
  // Conservative widths for the site's sans font; the browser audit also checks
  // the rendered glyph boxes. Wider letters and mathematical symbols need room.
  const width = [...label.text].reduce((n, c) => n + (/\s/.test(c) ? 0.34 : /[il.,:;!'|]/.test(c) ? 0.34 : /[MWmw@]/.test(c) ? 0.94 : 0.67), 0) * label.size;
  const left = label.x - (label.anchor === "middle" ? width / 2 : label.anchor === "end" ? width : 0);
  return { left: left - 4, right: left + width + 4, top: label.y - label.size - 4, bottom: label.y + label.size * 0.3 + 4 };
}

function intersects(a: Rect, b: Rect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function crosses([a, b]: Segment, box: Rect) {
  if (!intersects({ left: Math.min(a.x,b.x)-2, right: Math.max(a.x,b.x)+2, top: Math.min(a.y,b.y)-2, bottom: Math.max(a.y,b.y)+2 }, box)) return false;
  // Liang–Barsky: test the entire segment, including steep, narrow crossings.
  let low = 0, high = 1;
  const dx = b.x - a.x, dy = b.y - a.y;
  const p = [-dx, dx, -dy, dy], q = [a.x-box.left, box.right-a.x, a.y-box.top, box.bottom-a.y];
  for (let i=0; i<4; i++) {
    if (p[i] === 0) { if (q[i] < 0) return false; }
    else { const t=q[i]/p[i]; if (p[i]<0) low=Math.max(low,t); else high=Math.min(high,t); if (low>high) return false; }
  }
  return true;
}

export function layoutPlotLabels(spec: PlotSpec, scale: PlotScale): PlotLabel[] {
  const labels: PlotLabel[] = [];
  const segments: Segment[] = [];
  const point = (at: [number, number]): Point => ({ x: scale.x(at[0]), y: scale.y(at[1]) });
  const line = (a: Point, b: Point) => segments.push([a,b]);
  const add = (text: string, at: Point, tone?: PlotTone, anchor: PlotLabel["anchor"] = "start", size=14, weight?: number) => labels.push({ ...at, text, tone, anchor, size, weight });
  const { pad, width, height } = scale;
  for (const mark of spec.marks) {
    switch (mark.kind) {
      case "curve": {
        let previous: Point | null = null;
        const start=mark.from??scale.xMin, end=mark.to??scale.xMax;
        const tolerance=(scale.yMax-scale.yMin)*0.25;
        for(let i=0;i<=240;i++) {
          const x=start+(end-start)*i/240, y=mark.f(x);
          if(!Number.isFinite(y)||y<scale.yMin-tolerance||y>scale.yMax+tolerance){previous=null;continue;}
          const current=point([x,y]);
          if(previous)line(previous,current);
          previous=current;
        }
        break;
      }
      case "point": {
        const p=point(mark.at);
        for(let a=0;a<Math.PI*2;a+=Math.PI/12)line({x:p.x+7*Math.cos(a),y:p.y+7*Math.sin(a)},{x:p.x+7*Math.cos(a+Math.PI/12),y:p.y+7*Math.sin(a+Math.PI/12)});
        if(mark.label)add(mark.label,{x:p.x+10,y:p.y-9},mark.tone);
        break;
      }
      case "segment": {
        const a=point(mark.from),b=point(mark.to);line(a,b);
        if(mark.label)add(mark.label,{x:(a.x+b.x)/2+8,y:(a.y+b.y)/2-8},mark.tone);
        break;
      }
      case "vline": {
        const x=scale.x(mark.at);line({x,y:pad.top},{x,y:pad.top+height});
        if(mark.label)add(mark.label,{x:x+6,y:pad.top+14},mark.tone);
        break;
      }
      case "hline": {
        const y=scale.y(mark.at);line({x:pad.left,y},{x:pad.left+width,y});
        if(mark.label)add(mark.label,{x:pad.left+width-6,y:y-8},mark.tone,"end");
        break;
      }
      case "text":add(mark.text,point(mark.at),mark.tone,mark.anchor??"middle",14,600);break;
      case "polygon":mark.points.forEach((p,i)=>line(point(p),point(mark.points[(i+1)%mark.points.length])));break;
      case "rects":mark.edges.slice(0,-1).forEach((x,i)=>{const next=mark.edges[i+1], y=mark.f(mark.side==="right"?next:x);const corners:[[number,number],[number,number],[number,number],[number,number]]=[[x,0],[x,y],[next,y],[next,0]];corners.forEach((p,j)=>line(point(p),point(corners[(j+1)%4])));});break;
      case "angle":
      case "rightAngle": {
        const v=point(mark.at),a=point(mark.from),b=point(mark.to);
        const unit=(p:Point)=>{const n=Math.hypot(p.x-v.x,p.y-v.y)||1;return {x:(p.x-v.x)/n,y:(p.y-v.y)/n};};
        const u=unit(a),w=unit(b);
        if(mark.kind==="rightAngle") {
          const first={x:v.x+u.x*15,y:v.y+u.y*15},corner={x:v.x+(u.x+w.x)*15,y:v.y+(u.y+w.y)*15},last={x:v.x+w.x*15,y:v.y+w.y*15};line(first,corner);line(corner,last);
        }else{
          const from=Math.atan2(u.y,u.x);let to=Math.atan2(w.y,w.x);while(to-from>Math.PI)to-=Math.PI*2;while(to-from< -Math.PI)to+=Math.PI*2;
          for(let i=0;i<16;i++){const t=from+(to-from)*i/16,next=from+(to-from)*(i+1)/16;line({x:v.x+30*Math.cos(t),y:v.y+30*Math.sin(t)},{x:v.x+30*Math.cos(next),y:v.y+30*Math.sin(next)});}
          if(mark.label){const n=Math.hypot(u.x+w.x,u.y+w.y)||1;add(mark.label,{x:v.x+(u.x+w.x)/n*46,y:v.y+(u.y+w.y)/n*46+5},mark.tone,"middle",15,600);}
        }
        break;
      }
    }
  }
  const bounds: Rect = spec.axes === "nenhum" ? {left:6,right:594,top:6,bottom:334} : {left:pad.left+2,right:PLOT_WIDTH-pad.right,top:pad.top+2,bottom:pad.top+height-2};
  const occupied: Rect[]=[];
  return labels.map(label=>{
    const initial=labelBox(label);
    const shiftX=Math.max(0,bounds.left-initial.left)-Math.max(0,initial.right-bounds.right);
    const shiftY=Math.max(0,bounds.top-initial.top)-Math.max(0,initial.bottom-bounds.bottom);
    const base={...label,x:label.x+shiftX,y:label.y+shiftY};
    const candidates=[base];
    for(let radius=6;radius<=180;radius+=6)for(let i=0;i<16;i++){const angle=-Math.PI/2+i*Math.PI/8;candidates.push({...base,x:base.x+Math.cos(angle)*radius,y:base.y+Math.sin(angle)*radius});}
    let chosen=base, bestScore=Infinity;
    for(const candidate of candidates){
      const box=labelBox(candidate);
      if(box.left<bounds.left||box.right>bounds.right||box.top<bounds.top||box.bottom>bounds.bottom)continue;
      const score=occupied.filter(other=>intersects(box,other)).length*1000+segments.filter(segment=>crosses(segment,box)).length;
      if(score<bestScore){chosen=candidate;bestScore=score;}
      if(score===0)break;
    }
    occupied.push(labelBox(chosen));
    return chosen;
  });
}
