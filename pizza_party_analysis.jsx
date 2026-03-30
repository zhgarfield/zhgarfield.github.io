import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  card: "#13131a",
  cardBorder: "#1e1e2e",
  accent: "#e8572a",
  accent2: "#f59e0b",
  accent3: "#10b981",
  accent4: "#6366f1",
  accent5: "#ec4899",
  text: "#e4e4e7",
  textMuted: "#71717a",
  textDim: "#3f3f46",
  gridLine: "#1a1a24",
};

const BAR_PALETTE = [
  "#e8572a","#f59e0b","#10b981","#6366f1","#ec4899",
  "#06b6d4","#8b5cf6","#f43f5e","#14b8a6","#a855f7",
  "#eab308","#22d3ee","#f97316","#84cc16","#e879f9",
  "#fb923c","#34d399","#818cf8","#fb7185","#2dd4bf"
];

const topSenders = [
  {name:"Jorge",count:731},{name:"Peter Bayer",count:437},{name:"Jonathan S.",count:415},
  {name:"Zach",count:356},{name:"Sabine N.",count:334},{name:"Charlotte C",count:315},
  {name:"Cecile S.",count:303},{name:"Manvir",count:260},{name:"Ilaria P.",count:251},
  {name:"Kristin M.",count:242},{name:"Olympia C.",count:233},{name:"Sam Snow",count:218},
  {name:"Katerina",count:193},{name:"Marion 🐒",count:187},{name:"Cesar H.",count:186},
  {name:"Pablo",count:174},{name:"Léo F.",count:168},{name:"Minhua Y.",count:158},
  {name:"Piret A.",count:156},{name:"Jane C.",count:155}
];

const monthlyData = [
  {m:"2019-09",v:47},{m:"2019-10",v:133},{m:"2019-11",v:87},{m:"2019-12",v:133},
  {m:"2020-01",v:117},{m:"2020-02",v:178},{m:"2020-03",v:285},{m:"2020-04",v:10},
  {m:"2020-05",v:8},{m:"2020-06",v:40},{m:"2020-07",v:19},{m:"2020-08",v:67},
  {m:"2020-09",v:128},{m:"2020-10",v:108},{m:"2020-11",v:34},{m:"2020-12",v:16},
  {m:"2021-01",v:3},{m:"2021-02",v:2},{m:"2021-03",v:19},{m:"2021-04",v:30},
  {m:"2021-05",v:2},{m:"2021-06",v:30},{m:"2021-07",v:64},{m:"2021-08",v:69},
  {m:"2021-09",v:132},{m:"2021-10",v:88},{m:"2021-11",v:166},{m:"2021-12",v:103},
  {m:"2022-01",v:109},{m:"2022-02",v:160},{m:"2022-03",v:201},{m:"2022-04",v:63},
  {m:"2022-05",v:110},{m:"2022-06",v:104},{m:"2022-07",v:45},{m:"2022-08",v:25},
  {m:"2022-09",v:85},{m:"2022-10",v:244},{m:"2022-11",v:69},{m:"2022-12",v:103},
  {m:"2023-01",v:40},{m:"2023-02",v:93},{m:"2023-03",v:111},{m:"2023-04",v:52},
  {m:"2023-05",v:22},{m:"2023-06",v:42},{m:"2023-07",v:85},{m:"2023-08",v:30},
  {m:"2023-09",v:133},{m:"2023-10",v:200},{m:"2023-11",v:160},{m:"2023-12",v:133},
  {m:"2024-01",v:102},{m:"2024-02",v:83},{m:"2024-03",v:135},{m:"2024-04",v:112},
  {m:"2024-05",v:177},{m:"2024-06",v:133},{m:"2024-07",v:15},{m:"2024-08",v:21},
  {m:"2024-09",v:82},{m:"2024-10",v:191},{m:"2024-11",v:331},{m:"2024-12",v:110},
  {m:"2025-01",v:55},{m:"2025-02",v:115},{m:"2025-03",v:244},{m:"2025-04",v:187},
  {m:"2025-05",v:171},{m:"2025-06",v:193},{m:"2025-07",v:103},{m:"2025-08",v:52},
  {m:"2025-09",v:459},{m:"2025-10",v:277},{m:"2025-11",v:479},{m:"2025-12",v:291},
  {m:"2026-01",v:135},{m:"2026-02",v:185},{m:"2026-03",v:169}
];

const hourData = [
  {h:0,v:23},{h:1,v:13},{h:2,v:10},{h:3,v:4},{h:4,v:19},{h:5,v:30},{h:6,v:32},{h:7,v:124},
  {h:8,v:274},{h:9,v:519},{h:10,v:728},{h:11,v:947},{h:12,v:920},{h:13,v:673},{h:14,v:638},
  {h:15,v:717},{h:16,v:727},{h:17,v:867},{h:18,v:720},{h:19,v:348},{h:20,v:276},{h:21,v:262},
  {h:22,v:181},{h:23,v:92}
];

const dowData = [
  {d:"Mon",v:1118},{d:"Tue",v:1295},{d:"Wed",v:1800},{d:"Thu",v:1377},
  {d:"Fri",v:2102},{d:"Sat",v:873},{d:"Sun",v:579}
];

const heatmapRaw = [{"dow":4,"hour":20,"count":46},{"dow":1,"hour":17,"count":89},{"dow":4,"hour":8,"count":45},{"dow":4,"hour":9,"count":91},{"dow":4,"hour":10,"count":126},{"dow":4,"hour":11,"count":134},{"dow":4,"hour":13,"count":152},{"dow":4,"hour":14,"count":165},{"dow":4,"hour":16,"count":246},{"dow":4,"hour":18,"count":178},{"dow":5,"hour":15,"count":74},{"dow":5,"hour":18,"count":57},{"dow":5,"hour":20,"count":30},{"dow":6,"hour":12,"count":56},{"dow":4,"hour":12,"count":157},{"dow":4,"hour":17,"count":321},{"dow":4,"hour":19,"count":73},{"dow":2,"hour":16,"count":115},{"dow":2,"hour":18,"count":141},{"dow":3,"hour":11,"count":192},{"dow":0,"hour":17,"count":72},{"dow":1,"hour":9,"count":81},{"dow":1,"hour":13,"count":115},{"dow":1,"hour":14,"count":116},{"dow":4,"hour":15,"count":193},{"dow":5,"hour":17,"count":105},{"dow":5,"hour":19,"count":65},{"dow":2,"hour":10,"count":206},{"dow":2,"hour":11,"count":202},{"dow":2,"hour":12,"count":187},{"dow":3,"hour":13,"count":76},{"dow":3,"hour":20,"count":53},{"dow":0,"hour":7,"count":11},{"dow":0,"hour":9,"count":45},{"dow":0,"hour":11,"count":161},{"dow":1,"hour":12,"count":132},{"dow":1,"hour":19,"count":51},{"dow":1,"hour":20,"count":40},{"dow":6,"hour":18,"count":55},{"dow":0,"hour":8,"count":16},{"dow":0,"hour":12,"count":147},{"dow":1,"hour":11,"count":172},{"dow":1,"hour":15,"count":119},{"dow":1,"hour":18,"count":70},{"dow":2,"hour":9,"count":127},{"dow":2,"hour":13,"count":156},{"dow":5,"hour":11,"count":60},{"dow":2,"hour":20,"count":35},{"dow":3,"hour":21,"count":54},{"dow":3,"hour":12,"count":172},{"dow":3,"hour":19,"count":43},{"dow":5,"hour":14,"count":58},{"dow":3,"hour":16,"count":122},{"dow":3,"hour":17,"count":107},{"dow":2,"hour":19,"count":45},{"dow":2,"hour":15,"count":120},{"dow":6,"hour":20,"count":35},{"dow":0,"hour":14,"count":71},{"dow":2,"hour":14,"count":108},{"dow":2,"hour":21,"count":28},{"dow":2,"hour":22,"count":43},{"dow":3,"hour":8,"count":27},{"dow":3,"hour":9,"count":90},{"dow":3,"hour":14,"count":83},{"dow":3,"hour":15,"count":86},{"dow":4,"hour":22,"count":46},{"dow":5,"hour":16,"count":57},{"dow":6,"hour":9,"count":30},{"dow":6,"hour":10,"count":49},{"dow":6,"hour":11,"count":26},{"dow":6,"hour":15,"count":50},{"dow":6,"hour":16,"count":48},{"dow":6,"hour":17,"count":34},{"dow":0,"hour":13,"count":74},{"dow":0,"hour":18,"count":109},{"dow":0,"hour":19,"count":41},{"dow":0,"hour":21,"count":45},{"dow":3,"hour":18,"count":110},{"dow":5,"hour":9,"count":55},{"dow":6,"hour":14,"count":37},{"dow":0,"hour":20,"count":37},{"dow":1,"hour":8,"count":63},{"dow":1,"hour":10,"count":103},{"dow":3,"hour":23,"count":23},{"dow":4,"hour":21,"count":68},{"dow":2,"hour":17,"count":139},{"dow":0,"hour":15,"count":75},{"dow":1,"hour":22,"count":21},{"dow":3,"hour":22,"count":31},{"dow":6,"hour":13,"count":43},{"dow":6,"hour":19,"count":30},{"dow":1,"hour":16,"count":54},{"dow":3,"hour":10,"count":76},{"dow":0,"hour":16,"count":85},{"dow":5,"hour":21,"count":11},{"dow":6,"hour":8,"count":18},{"dow":2,"hour":8,"count":71},{"dow":0,"hour":10,"count":97},{"dow":4,"hour":23,"count":27},{"dow":5,"hour":13,"count":57},{"dow":5,"hour":8,"count":34},{"dow":3,"hour":7,"count":15},{"dow":5,"hour":12,"count":69},{"dow":5,"hour":10,"count":71},{"dow":0,"hour":23,"count":10},{"dow":0,"hour":22,"count":12},{"dow":5,"hour":5,"count":13},{"dow":4,"hour":7,"count":27},{"dow":1,"hour":7,"count":20},{"dow":2,"hour":5,"count":11},{"dow":6,"hour":21,"count":30},{"dow":1,"hour":21,"count":26},{"dow":2,"hour":23,"count":11},{"dow":5,"hour":22,"count":17},{"dow":2,"hour":7,"count":35},{"dow":4,"hour":6,"count":2},{"dow":5,"hour":7,"count":11},{"dow":1,"hour":23,"count":15},{"dow":6,"hour":22,"count":11},{"dow":6,"hour":7,"count":5},{"dow":2,"hour":6,"count":12},{"dow":1,"hour":6,"count":6}];

const vocabData = [
  {name:"Jorge",unique:3277,total:10548,ratio:.311},
  {name:"Peter B.",unique:1830,total:5047,ratio:.363},
  {name:"Jonathan S.",unique:2469,total:6599,ratio:.374},
  {name:"Zach",unique:1604,total:4178,ratio:.384},
  {name:"Sabine N.",unique:1139,total:3570,ratio:.319},
  {name:"Charlotte C",unique:1300,total:3230,ratio:.402},
  {name:"Cecile S.",unique:1041,total:2346,ratio:.444},
  {name:"Manvir",unique:758,total:1896,ratio:.400},
  {name:"Ilaria P.",unique:1204,total:3329,ratio:.362},
  {name:"Kristin M.",unique:1608,total:4026,ratio:.399},
  {name:"Olympia C.",unique:819,total:1783,ratio:.459},
  {name:"Sam Snow",unique:953,total:2539,ratio:.375},
  {name:"Katerina",unique:904,total:2170,ratio:.417},
  {name:"Marion 🐒",unique:893,total:2409,ratio:.371},
  {name:"Cesar H.",unique:1027,total:2295,ratio:.447},
  {name:"Pablo",unique:513,total:1602,ratio:.320},
  {name:"Léo F.",unique:606,total:1202,ratio:.504},
  {name:"Minhua Y.",unique:732,total:1773,ratio:.413},
  {name:"Piret A.",unique:583,total:1216,ratio:.479},
  {name:"Jane C.",unique:633,total:1452,ratio:.436},
];

const topWords = [
  {w:"anyone",c:658},{w:"join",c:464},{w:"thanks",c:422},{w:"lunch",c:368},
  {w:"people",c:279},{w:"toulouse",c:277},{w:"time",c:277},{w:"yes",c:264},
  {w:"today",c:236},{w:"great",c:204},{w:"place",c:198},{w:"iast",c:188},
  {w:"tomorrow",c:185},{w:"everyone",c:185},{w:"interested",c:180},{w:"hey",c:179},
  {w:"meet",c:169},{w:"happy",c:158},{w:"sure",c:160},{w:"beer",c:110},
];

const topEmojis = [
  {e:"😂",c:160},{e:"👍",c:109},{e:"😊",c:84},{e:"🥳",c:79},{e:"🙏",c:74},
  {e:"😉",c:65},{e:"😅",c:63},{e:"🙃",c:58},{e:"🎉",c:49},{e:"👏",c:43},
  {e:"🍻",c:42},{e:"❤️",c:34},{e:"😍",c:32},{e:"🍺",c:28},{e:"🍕",c:23},
];

const convStarters = [
  {name:"Sabine N.",c:114},{name:"Jorge",c:97},{name:"Zach",c:68},
  {name:"Jonathan S.",c:67},{name:"Ilaria P.",c:67},{name:"Sam Snow",c:60},
  {name:"Peter B.",c:54},{name:"Manvir",c:53},{name:"Cecile S.",c:51},
  {name:"Kristin M.",c:46}
];

const avgMsgLen = [
  {name:"Kristin M.",v:122.8},{name:"Jonathan S.",v:119.9},{name:"Jorge",v:109.0},
  {name:"Ilaria P.",v:100.7},{name:"Marion 🐒",v:92.8},{name:"Cesar H.",v:91.6},
  {name:"Zach",v:87.7},{name:"Sam Snow",v:85.3},{name:"Peter B.",v:84.8},
  {name:"Katerina",v:84.1},{name:"Sabine N.",v:78.3},{name:"Charlotte C",v:73.9},
  {name:"Jane C.",v:69.0},{name:"Pablo",v:67.6},{name:"Cecile S.",v:56.9},
  {name:"Piret A.",v:56.4},{name:"Olympia C.",v:54.9},{name:"Léo F.",v:53.6},
  {name:"Manvir",v:53.1}
];

// Build heatmap grid
const heatmapGrid = {};
let heatMax = 0;
heatmapRaw.forEach(d => {
  const key = `${d.dow}-${d.hour}`;
  heatmapGrid[key] = d.count;
  if(d.count > heatMax) heatMax = d.count;
});

function StatCard({label, value, sub, color}) {
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 12,
      padding: "18px 20px",
      flex: "1 1 0",
      minWidth: 140,
    }}>
      <div style={{fontSize:11,color:COLORS.textMuted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{label}</div>
      <div style={{fontSize:28,fontWeight:700,color:color||COLORS.text,fontFamily:"'JetBrains Mono',monospace"}}>{value}</div>
      {sub && <div style={{fontSize:12,color:COLORS.textMuted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

function HeatmapChart() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hours = Array.from({length:24},(_,i)=>i);
  const cellW = 28, cellH = 22, labelW = 36, labelH = 20;
  const w = labelW + 24*cellW + 10;
  const h = labelH + 7*cellH + 10;

  function getColor(val) {
    if(!val) return COLORS.cardBorder;
    const t = Math.pow(val/heatMax, 0.6);
    const r = Math.round(10 + t * (232-10));
    const g = Math.round(10 + t * (87-10));
    const b = Math.round(15 + t * (42-15));
    return `rgb(${r},${g},${b})`;
  }

  return (
    <div style={{overflowX:"auto"}}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",maxWidth:w,display:"block"}}>
        {hours.map(hr => (
          <text key={`lh${hr}`} x={labelW+hr*cellW+cellW/2} y={12} textAnchor="middle" fill={COLORS.textMuted} fontSize={9} fontFamily="'JetBrains Mono',monospace">
            {hr.toString().padStart(2,"0")}
          </text>
        ))}
        {days.map((d,di) => (
          <g key={d}>
            <text x={labelW-6} y={labelH+di*cellH+cellH/2+4} textAnchor="end" fill={COLORS.textMuted} fontSize={10} fontFamily="'JetBrains Mono',monospace">{d}</text>
            {hours.map(hr => {
              const val = heatmapGrid[`${di}-${hr}`] || 0;
              return (
                <rect key={`${di}-${hr}`} x={labelW+hr*cellW+1} y={labelH+di*cellH+1} width={cellW-2} height={cellH-2} rx={3}
                  fill={getColor(val)}>
                  <title>{d} {hr}:00 — {val} messages</title>
                </rect>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

function BarChart({data, maxVal, labelKey="name", valKey="count", color, horizontal=true, height=400}) {
  const max = maxVal || Math.max(...data.map(d=>d[valKey]));
  if(horizontal) {
    const barH = Math.min(28, (height-20)/data.length);
    const svgH = data.length*barH+20;
    return (
      <svg viewBox={`0 0 500 ${svgH}`} style={{width:"100%",display:"block"}}>
        {data.map((d,i) => {
          const bw = (d[valKey]/max)*310;
          const c = typeof color === "function" ? color(i) : (color || BAR_PALETTE[i%BAR_PALETTE.length]);
          return (
            <g key={i}>
              <text x={105} y={i*barH+barH/2+4} textAnchor="end" fill={COLORS.textMuted} fontSize={10} fontFamily="'JetBrains Mono',monospace">{d[labelKey]}</text>
              <rect x={112} y={i*barH+2} width={bw} height={barH-6} rx={4} fill={c} opacity={0.85}/>
              <text x={112+bw+6} y={i*barH+barH/2+4} fill={COLORS.textMuted} fontSize={9} fontFamily="'JetBrains Mono',monospace">{d[valKey]}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  return null;
}

function TimeSeriesChart() {
  const max = Math.max(...monthlyData.map(d=>d.v));
  const w = 900, h = 200, padL=40, padR=10, padT=10, padB=30;
  const plotW = w-padL-padR, plotH = h-padT-padB;
  const n = monthlyData.length;

  const points = monthlyData.map((d,i) => {
    const x = padL + (i/(n-1))*plotW;
    const y = padT + plotH - (d.v/max)*plotH;
    return {x,y,...d};
  });

  const linePath = points.map((p,i) => `${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  const areaPath = linePath + ` L${points[n-1].x},${padT+plotH} L${points[0].x},${padT+plotH} Z`;

  // Year labels
  const yearLabels = [];
  let lastYear = "";
  points.forEach(p => {
    const yr = p.m.slice(0,4);
    if(yr!==lastYear) {
      yearLabels.push({x:p.x, label:yr});
      lastYear=yr;
    }
  });

  // Annotations
  const lockdownIdx = monthlyData.findIndex(d=>d.m==="2020-03");
  const peakIdx = monthlyData.findIndex(d=>d.m==="2025-11");

  return (
    <div style={{overflowX:"auto"}}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",display:"block"}}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.accent} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0,.25,.5,.75,1].map(t => {
          const y = padT+plotH-t*plotH;
          return <g key={t}>
            <line x1={padL} x2={w-padR} y1={y} y2={y} stroke={COLORS.gridLine} strokeWidth={1}/>
            <text x={padL-6} y={y+3} textAnchor="end" fill={COLORS.textDim} fontSize={8} fontFamily="'JetBrains Mono',monospace">{Math.round(t*max)}</text>
          </g>;
        })}
        {yearLabels.map(yl => (
          <text key={yl.label} x={yl.x} y={h-6} fill={COLORS.textMuted} fontSize={9} fontFamily="'JetBrains Mono',monospace">{yl.label}</text>
        ))}
        <path d={areaPath} fill="url(#areaGrad)"/>
        <path d={linePath} fill="none" stroke={COLORS.accent} strokeWidth={2}/>
        {lockdownIdx>=0 && <>
          <line x1={points[lockdownIdx].x} y1={padT} x2={points[lockdownIdx].x} y2={padT+plotH} stroke="#f43f5e" strokeDasharray="4,3" strokeWidth={1} opacity={0.6}/>
          <text x={points[lockdownIdx].x+4} y={padT+12} fill="#f43f5e" fontSize={8} fontFamily="'JetBrains Mono',monospace" opacity={0.8}>COVID lockdown</text>
        </>}
        {peakIdx>=0 && <>
          <circle cx={points[peakIdx].x} cy={points[peakIdx].y} r={4} fill={COLORS.accent2} stroke={COLORS.bg} strokeWidth={2}/>
          <text x={points[peakIdx].x-4} y={points[peakIdx].y-10} fill={COLORS.accent2} fontSize={8} textAnchor="end" fontFamily="'JetBrains Mono',monospace">Peak: 479 msgs</text>
        </>}
      </svg>
    </div>
  );
}

function ScatterPlot() {
  const w=500, h=340, padL=50, padR=20, padT=20, padB=40;
  const plotW=w-padL-padR, plotH=h-padT-padB;
  const maxTotal = Math.max(...vocabData.map(d=>d.total));
  const maxRatio = Math.max(...vocabData.map(d=>d.ratio));
  const minRatio = Math.min(...vocabData.map(d=>d.ratio));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",display:"block"}}>
      {[0,.25,.5,.75,1].map(t => {
        const y = padT+plotH-t*plotH;
        const val = minRatio + t*(maxRatio-minRatio);
        return <g key={t}>
          <line x1={padL} x2={w-padR} y1={y} y2={y} stroke={COLORS.gridLine}/>
          <text x={padL-6} y={y+3} textAnchor="end" fill={COLORS.textDim} fontSize={8} fontFamily="'JetBrains Mono',monospace">{(val*100).toFixed(0)}%</text>
        </g>;
      })}
      <text x={w/2} y={h-4} textAnchor="middle" fill={COLORS.textMuted} fontSize={9} fontFamily="'JetBrains Mono',monospace">Total words written →</text>
      <text x={12} y={h/2} textAnchor="middle" fill={COLORS.textMuted} fontSize={9} fontFamily="'JetBrains Mono',monospace" transform={`rotate(-90,12,${h/2})`}>Vocab richness →</text>
      {vocabData.map((d,i) => {
        const x = padL + (d.total/maxTotal)*plotW;
        const y = padT + plotH - ((d.ratio-minRatio)/(maxRatio-minRatio))*plotH;
        const r = 4 + (d.unique/3300)*10;
        return <g key={i}>
          <circle cx={x} cy={y} r={r} fill={BAR_PALETTE[i%BAR_PALETTE.length]} opacity={0.7} stroke={BAR_PALETTE[i%BAR_PALETTE.length]} strokeWidth={1}/>
          <text x={x} y={y-r-4} textAnchor="middle" fill={COLORS.text} fontSize={8} fontFamily="'JetBrains Mono',monospace">{d.name}</text>
        </g>;
      })}
    </svg>
  );
}

function EmojiBar() {
  const max = topEmojis[0].c;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {topEmojis.slice(0,10).map((d,i) => (
        <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20,width:28,textAlign:"center"}}>{d.e}</span>
          <div style={{flex:1,background:COLORS.cardBorder,borderRadius:6,height:16,overflow:"hidden"}}>
            <div style={{width:`${(d.c/max)*100}%`,height:"100%",background:`linear-gradient(90deg, ${COLORS.accent4}, ${COLORS.accent5})`,borderRadius:6,transition:"width 0.5s"}}/>
          </div>
          <span style={{fontSize:11,color:COLORS.textMuted,fontFamily:"'JetBrains Mono',monospace",minWidth:30,textAlign:"right"}}>{d.c}</span>
        </div>
      ))}
    </div>
  );
}

function HourRadial() {
  const max = Math.max(...hourData.map(d=>d.v));
  const cx=120, cy=120, R=95, r0=25;
  return (
    <svg viewBox="0 0 240 240" style={{width:"100%",maxWidth:240,display:"block",margin:"0 auto"}}>
      {[.25,.5,.75,1].map(t => (
        <circle key={t} cx={cx} cy={cy} r={r0+t*(R-r0)} fill="none" stroke={COLORS.gridLine} strokeWidth={0.5}/>
      ))}
      {hourData.map((d,i) => {
        const angle = (i/24)*Math.PI*2 - Math.PI/2;
        const barLen = (d.v/max)*(R-r0);
        const x1 = cx + Math.cos(angle)*r0;
        const y1 = cy + Math.sin(angle)*r0;
        const x2 = cx + Math.cos(angle)*(r0+barLen);
        const y2 = cy + Math.sin(angle)*(r0+barLen);
        const lx = cx + Math.cos(angle)*(R+10);
        const ly = cy + Math.sin(angle)*(R+10);
        const t = d.v/max;
        const color = `rgb(${Math.round(16+t*216)},${Math.round(99-t*12)},${Math.round(129-t*87)})`;
        return <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={8} strokeLinecap="round" opacity={0.8}/>
          {i%3===0 && <text x={lx} y={ly+3} textAnchor="middle" fill={COLORS.textMuted} fontSize={8} fontFamily="'JetBrains Mono',monospace">{`${i}h`}</text>}
        </g>;
      })}
      <text x={cx} y={cy-4} textAnchor="middle" fill={COLORS.text} fontSize={11} fontWeight={700} fontFamily="'JetBrains Mono',monospace">Peak</text>
      <text x={cx} y={cy+10} textAnchor="middle" fill={COLORS.accent} fontSize={13} fontWeight={700} fontFamily="'JetBrains Mono',monospace">17h</text>
    </svg>
  );
}

const tabs = ["Overview","Activity","People","Language"];

export default function App() {
  const [tab, setTab] = useState("Overview");

  return (
    <div style={{
      background:COLORS.bg,color:COLORS.text,minHeight:"100vh",
      fontFamily:"'JetBrains Mono','Fira Code',monospace",padding:"20px 16px",
      maxWidth:920,margin:"0 auto"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{marginBottom:28,textAlign:"center"}}>
        <div style={{fontSize:11,color:COLORS.accent,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:6}}>WhatsApp Group Chat Analysis</div>
        <h1 style={{fontSize:32,fontWeight:700,margin:0,background:`linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          Pizza Party 🍕
        </h1>
        <div style={{fontSize:12,color:COLORS.textMuted,marginTop:6}}>Sept 2019 — Mar 2026 · 107 participants · 9,144 messages</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,marginBottom:24,justifyContent:"center",flexWrap:"wrap"}}>
        {tabs.map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{
            background:tab===t ? COLORS.accent : COLORS.card,
            color:tab===t ? "#fff" : COLORS.textMuted,
            border:`1px solid ${tab===t ? COLORS.accent : COLORS.cardBorder}`,
            borderRadius:8,padding:"8px 18px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:tab===t?600:400,
            transition:"all 0.2s"
          }}>{t}</button>
        ))}
      </div>

      {tab==="Overview" && <>
        {/* Stats Row */}
        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
          <StatCard label="Messages" value="9,144" sub="non-system" color={COLORS.accent}/>
          <StatCard label="Participants" value="107" sub="unique senders" color={COLORS.accent2}/>
          <StatCard label="Active Span" value="6.5 yrs" sub="Sep '19 – Mar '26" color={COLORS.accent3}/>
          <StatCard label="Top Word" value="anyone" sub="658 uses" color={COLORS.accent4}/>
        </div>

        {/* Time Series */}
        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 12px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Monthly Message Volume</div>
          <TimeSeriesChart/>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:8,textAlign:"center"}}>
            Clear seasonal pattern: summers go quiet, autumn–spring buzzes with activity
          </div>
        </div>

        {/* Two columns */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Top Emojis</div>
            <EmojiBar/>
          </div>
          <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Clock of Activity</div>
            <HourRadial/>
            <div style={{fontSize:10,color:COLORS.textMuted,textAlign:"center",marginTop:4}}>5pm is the magic hour</div>
          </div>
        </div>

        {/* Fun Facts */}
        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"18px 16px"}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Quick Facts</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:12,color:COLORS.textMuted}}>
            <div>🍺 The word <span style={{color:COLORS.accent2}}>"beer"</span> appears <span style={{color:COLORS.text}}>110 times</span></div>
            <div>🍕 The word <span style={{color:COLORS.accent2}}>"pizza"</span> appears as an emoji <span style={{color:COLORS.text}}>23 times</span></div>
            <div>❓ <span style={{color:COLORS.text}}>Jorge</span> asked the most questions: <span style={{color:COLORS.accent}}>135</span></div>
            <div>🔗 <span style={{color:COLORS.text}}>Jorge</span> shared the most links: <span style={{color:COLORS.accent}}>79</span></div>
            <div>🌙 Biggest night owl: <span style={{color:COLORS.text}}>Clark Warner</span> (13.8% after 10pm)</div>
            <div>🌅 Biggest early bird: <span style={{color:COLORS.text}}>Lauren</span> (24.5% before 10am)</div>
            <div>📅 Busiest single month: <span style={{color:COLORS.accent}}>Nov 2025</span> with 479 msgs</div>
            <div>💬 Friday has <span style={{color:COLORS.accent}}>3.6×</span> more messages than Sunday</div>
          </div>
        </div>
      </>}

      {tab==="Activity" && <>
        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 12px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Activity Heatmap</div>
          <div style={{fontSize:10,color:COLORS.textMuted,marginBottom:12}}>Day of week × hour — darker = more messages</div>
          <HeatmapChart/>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:8,textAlign:"center"}}>
            Friday 17:00 is the undisputed champion with 321 messages — apéro planning o'clock
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Messages by Day</div>
            <svg viewBox="0 0 300 200" style={{width:"100%",display:"block"}}>
              {dowData.map((d,i) => {
                const bh = (d.v/2102)*150;
                return <g key={i}>
                  <rect x={10+i*40} y={170-bh} width={30} height={bh} rx={4}
                    fill={i===4?COLORS.accent:i>=5?COLORS.accent4:COLORS.accent3} opacity={0.8}/>
                  <text x={25+i*40} y={188} textAnchor="middle" fill={COLORS.textMuted} fontSize={9} fontFamily="'JetBrains Mono',monospace">{d.d}</text>
                  <text x={25+i*40} y={165-bh} textAnchor="middle" fill={COLORS.textMuted} fontSize={8} fontFamily="'JetBrains Mono',monospace">{d.v}</text>
                </g>;
              })}
            </svg>
          </div>
          <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Messages by Year</div>
            {[{y:"2019",v:400},{y:"2020",v:1010},{y:"2021",v:708},{y:"2022",v:1318},
              {y:"2023",v:1101},{y:"2024",v:1492},{y:"2025",v:2626},{y:"2026*",v:489}].map((d,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{fontSize:10,color:COLORS.textMuted,width:36}}>{d.y}</span>
                <div style={{flex:1,background:COLORS.cardBorder,borderRadius:4,height:14,overflow:"hidden"}}>
                  <div style={{width:`${(d.v/2626)*100}%`,height:"100%",borderRadius:4,
                    background:d.y==="2025"?COLORS.accent:COLORS.accent3,opacity:0.7}}/>
                </div>
                <span style={{fontSize:10,color:COLORS.textMuted,width:36,textAlign:"right"}}>{d.v}</span>
              </div>
            ))}
            <div style={{fontSize:9,color:COLORS.textDim,marginTop:4}}>* 2026 through March only</div>
          </div>
        </div>

        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 12px"}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Monthly Timeline</div>
          <TimeSeriesChart/>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:8}}>
            Notice the dramatic crater in spring 2020 — lockdown shut down the social calendar. 
            The group came roaring back in late 2021 and has been accelerating ever since, peaking in late 2025.
          </div>
        </div>
      </>}

      {tab==="People" && <>
        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 12px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Top 20 Most Active Members</div>
          <BarChart data={topSenders} maxVal={731} valKey="count"/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Conversation Starters</div>
            <div style={{fontSize:10,color:COLORS.textMuted,marginBottom:10}}>Who breaks the silence? (first msg after 3hr gap)</div>
            <BarChart data={convStarters} maxVal={114} valKey="c" color={()=>COLORS.accent3}/>
          </div>
          <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Avg Message Length</div>
            <div style={{fontSize:10,color:COLORS.textMuted,marginBottom:10}}>Characters per message — who writes essays?</div>
            <BarChart data={avgMsgLen} maxVal={130} valKey="v" color={()=>COLORS.accent4}/>
          </div>
        </div>

        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Strongest Reply Pairs</div>
          <div style={{fontSize:10,color:COLORS.textMuted,marginBottom:12}}>Who responds to whom most often (within 10 min)</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[
              {a:"Jonathan S.",b:"Jorge",w:40},{a:"Jorge",b:"Jonathan S.",w:32},
              {a:"Jorge",b:"Peter B.",w:29},{a:"Peter B.",b:"Jorge",w:28},
              {a:"Jorge",b:"Olympia C.",w:23},{a:"Zach",b:"Sabine N.",w:20},
              {a:"Olympia C.",b:"Jorge",w:19},{a:"Charlotte C",b:"Jonathan S.",w:17},
              {a:"Manvir",b:"Zach",w:15},{a:"Peter B.",b:"Zach",w:15},
            ].map((d,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:11}}>
                <span style={{color:BAR_PALETTE[i%5]}}>{d.a}</span>
                <span style={{color:COLORS.textDim}}>→</span>
                <span style={{color:COLORS.text}}>{d.b}</span>
                <span style={{color:COLORS.textMuted,fontSize:9,marginLeft:"auto"}}>{d.w}×</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:10}}>
            Jorge is the clear social hub — most frequent reply partner with Jonathan, Peter, and Olympia
          </div>
        </div>
      </>}

      {tab==="Language" && <>
        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 12px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Most Used Words</div>
          <div style={{fontSize:10,color:COLORS.textMuted,marginBottom:12}}>Excluding common English/French stopwords</div>
          <BarChart data={topWords} maxVal={658} labelKey="w" valKey="c"
            color={(i)=>i<5?COLORS.accent:i<10?COLORS.accent2:i<15?COLORS.accent3:COLORS.accent4} height={520}/>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:8}}>
            "anyone" + "join" + "lunch" + "today" + "beer" — this group's DNA in five words
          </div>
        </div>

        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 12px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Vocabulary Richness</div>
          <div style={{fontSize:10,color:COLORS.textMuted,marginBottom:12}}>
            Unique words ÷ total words — higher = more diverse vocabulary. Bubble size = unique word count.
          </div>
          <ScatterPlot/>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:8}}>
            Léo has the richest vocabulary relative to volume (50%). Jorge writes the most total words but with more repetition (31%).
            Olympia and Cecile pack lots of variety into fewer messages.
          </div>
        </div>

        <div style={{background:COLORS.card,border:`1px solid ${COLORS.cardBorder}`,borderRadius:12,padding:"16px 14px"}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Top Emojis</div>
          <EmojiBar/>
          <div style={{fontSize:10,color:COLORS.textMuted,marginTop:10}}>
            😂 reigns supreme. Beer emojis 🍻🍺 combine for 70 uses — fitting for a group whose top words include "beer," "join," and "anyone."
          </div>
        </div>
      </>}

      <div style={{textAlign:"center",fontSize:10,color:COLORS.textDim,marginTop:28,paddingBottom:16}}>
        Pizza Party 🍕 · Analyzed {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
