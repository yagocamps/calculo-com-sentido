import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_RAMP, rampSection, rampSlices, rampVolume } from "@/lib/integral-ramp";

test("ramp integral matches trapezoidal prism geometry and its derivative is the section",()=>{
  for(const m of [DEFAULT_RAMP,{...DEFAULT_RAMP,startHeight:1.2,endHeight:.2},{...DEFAULT_RAMP,endHeight:.2}]) {
    assert.ok(Math.abs(rampVolume(m,m.length)-m.length*m.width*(m.startHeight+m.endHeight)/2)<1e-12);
    assert.equal(rampVolume(m,0),0);
    const x=2.1,h=1e-5;
    assert.ok(Math.abs((rampVolume(m,x+h)-rampVolume(m,x-h))/(2*h)-rampSection(m,x))<1e-8);
    const error=(n:number)=>rampSlices(m,x,n).reduce((sum,s)=>sum+s.volume,0)-rampVolume(m,x);
    assert.ok(Math.abs(error(8)/2-error(16))<1e-12);
    assert.ok((m.endHeight-m.startHeight)*error(8)>=-1e-12);
  }
  assert.equal(rampVolume(DEFAULT_RAMP,-1),0);
  assert.equal(rampVolume(DEFAULT_RAMP,Infinity),0);
  assert.equal(rampVolume(DEFAULT_RAMP,100),rampVolume(DEFAULT_RAMP,6));
});
