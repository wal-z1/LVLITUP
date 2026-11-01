var LVL = globalThis.LVL || {};
LVL.bands=[31,62,125,250,500,1000,2000,4000,8000,16000];
LVL.defaults={volume:1,eq:[0,0,0,0,0,0,0,0,0,0],balance:0,mono:false,limiter:true,loudness:false};
LVL.configDefaults={limiter:true,loudness:false,remember:true,duck:false,duckDb:-10,iconFollows:"loudest"};
LVL.strings={name:"LVLITUP",tagline:"Per-tab sound levels & control",limited:"Limited",noAccess:"No access",nothing:"Nothing is playing",clip:"CLIP",ducked:"Ducked",remember:"Remember for this site"};
LVL.clamp=function(n,min,max){n=Number(n);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min};
LVL.db=function(v){return 20*Math.log10(Math.max(1e-8,v))}; LVL.linear=function(d){return Math.pow(10,d/20)};
LVL.copySettings=function(s){s=s||{};return {volume:LVL.clamp(s.volume,0,4),eq:LVL.bands.map(function(_,i){return LVL.clamp((s.eq||[])[i],-12,12)}),balance:LVL.clamp(s.balance,-1,1),mono:!!s.mono,limiter:s.limiter!==false,loudness:!!s.loudness}};
LVL.merge=function(base,patch){return LVL.copySettings(Object.assign({},base||LVL.defaults,patch||{}))};