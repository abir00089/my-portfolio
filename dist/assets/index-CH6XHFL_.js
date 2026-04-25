const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/initialFX-fogK9blf.js","assets/gsap-DsZHCS56.js","assets/three-CYAyE3K3.js","assets/Navbar-DdP9m-Gw.js","assets/ScrollTrigger-CezCZ8EY.js","assets/Navbar-CdpI39bg.css","assets/index-JG5cOoFc.js","assets/MainContainer-Ck5pAQOp.js","assets/MainContainer-UI4iO4F-.css"])))=>i.map(i=>d[i]);
import{r as c,_ as A,j as e,c as Y}from"./three-CYAyE3K3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const C="/",Z=r=>{const t=C.endsWith("/")?C:`${C}/`,o=r.replace(/^\/+/,"");return`${t}${o}`};var D={};function H(r){if(typeof window>"u")return;const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=r,document.head.appendChild(t),r}Object.defineProperty(D,"__esModule",{value:!0});var s=c;function J(r){return r&&typeof r=="object"&&"default"in r?r:{default:r}}var h=J(s);H(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const Q=s.forwardRef(function({style:t={},className:o="",autoFill:i=!1,play:n=!0,pauseOnHover:a=!1,pauseOnClick:m=!1,direction:l="left",speed:x=50,delay:b=0,loop:y=0,gradient:S=!1,gradientColor:d="white",gradientWidth:f=200,onFinish:E,onCycleComplete:I,onMount:N,children:_},B){const[R,G]=s.useState(0),[M,X]=s.useState(0),[L,T]=s.useState(1),[q,V]=s.useState(!1),U=s.useRef(null),v=B||U,j=s.useRef(null),w=s.useCallback(()=>{if(j.current&&v.current){const u=v.current.getBoundingClientRect(),$=j.current.getBoundingClientRect();let p=u.width,g=$.width;(l==="up"||l==="down")&&(p=u.height,g=$.height),T(i&&p&&g&&g<p?Math.ceil(p/g):1),G(p),X(g)}},[i,v,l]);s.useEffect(()=>{if(q&&(w(),j.current&&v.current)){const u=new ResizeObserver(()=>w());return u.observe(v.current),u.observe(j.current),()=>{u&&u.disconnect()}}},[w,v,q]),s.useEffect(()=>{w()},[w,_]),s.useEffect(()=>{V(!0)},[]),s.useEffect(()=>{typeof N=="function"&&N()},[]);const O=s.useMemo(()=>i?M*L/x:M<R?R/x:M/x,[i,R,M,L,x]),F=s.useMemo(()=>Object.assign(Object.assign({},t),{"--pause-on-hover":!n||a?"paused":"running","--pause-on-click":!n||a&&!m||m?"paused":"running","--width":l==="up"||l==="down"?"100vh":"100%","--transform":l==="up"?"rotate(-90deg)":l==="down"?"rotate(90deg)":"none"}),[t,n,a,m,l]),K=s.useMemo(()=>({"--gradient-color":d,"--gradient-width":typeof f=="number"?`${f}px`:f}),[d,f]),z=s.useMemo(()=>({"--play":n?"running":"paused","--direction":l==="left"?"normal":"reverse","--duration":`${O}s`,"--delay":`${b}s`,"--iteration-count":y?`${y}`:"infinite","--min-width":i?"auto":"100%"}),[n,l,O,b,y,i]),P=s.useMemo(()=>({"--transform":l==="up"?"rotate(90deg)":l==="down"?"rotate(-90deg)":"none"}),[l]),k=s.useCallback(u=>[...Array(Number.isFinite(u)&&u>=0?u:0)].map(($,p)=>h.default.createElement(s.Fragment,{key:p},s.Children.map(_,g=>h.default.createElement("div",{style:P,className:"rfm-child"},g)))),[P,_]);return q?h.default.createElement("div",{ref:v,style:F,className:"rfm-marquee-container "+o},S&&h.default.createElement("div",{style:K,className:"rfm-overlay"}),h.default.createElement("div",{className:"rfm-marquee",style:z,onAnimationIteration:I,onAnimationEnd:E},h.default.createElement("div",{className:"rfm-initial-child-container",ref:j},s.Children.map(_,u=>h.default.createElement("div",{style:P,className:"rfm-child"},u))),k(L-1)),h.default.createElement("div",{className:"rfm-marquee",style:z},k(L))):null});var ee=D.default=Q;const te=({percent:r})=>{const t=`${Z("")}#`,{setIsLoading:o}=re(),[i,n]=c.useState(!1),[a,m]=c.useState(!1),[l,x]=c.useState(!1);c.useEffect(()=>{if(r<100)return;const d=setTimeout(()=>{n(!0)},600),f=setTimeout(()=>{m(!0)},1600);return()=>{clearTimeout(d),clearTimeout(f)}},[r]);const[b,y]=c.useState(!1);c.useEffect(()=>{a&&(x(!0),A(()=>import("./initialFX-fogK9blf.js"),__vite__mapDeps([0,1,2,3,4,5])).then(d=>{setTimeout(()=>{y(!0),d.initialFX&&d.initialFX(),setTimeout(()=>{o(!1)},800)},900)}))},[a]);function S(d){const{currentTarget:f}=d,E=f.getBoundingClientRect(),I=d.clientX-E.left,N=d.clientY-E.top;f.style.setProperty("--mouse-x",`${I}px`),f.style.setProperty("--mouse-y",`${N}px`)}return e.jsxs("div",{className:`loading-full-wrapper ${b?"loading-exit":""}`,children:[e.jsxs("div",{className:"loading-header",children:[e.jsx("a",{href:t,className:"loader-title","data-cursor":"disable",children:"AM"}),e.jsx("div",{className:`loaderGame ${l&&"loader-out"}`,children:e.jsxs("div",{className:"loaderGame-container",children:[e.jsx("div",{className:"loaderGame-in",children:[...Array(27)].map((d,f)=>e.jsx("div",{className:"loaderGame-line"},f))}),e.jsx("div",{className:"loaderGame-ball"})]})})]}),e.jsxs("div",{className:`loading-screen ${l&&"loading-clicked-screen"}`,children:[e.jsx("div",{className:"loading-marquee",children:e.jsxs(ee,{children:[e.jsx("span",{children:" AI & Software Developer"})," ",e.jsx("span",{children:"Student"}),e.jsx("span",{children:" AI & Software Developer"})," ",e.jsx("span",{children:"Student"})]})}),e.jsxs("div",{className:`loading-wrap ${l&&"loading-clicked"}`,onMouseMove:d=>S(d),children:[e.jsx("div",{className:"loading-hover"}),e.jsxs("div",{className:`loading-button ${i&&"loading-complete"}`,onClick:()=>{i&&m(!0)},style:{cursor:i?"pointer":"default"},children:[e.jsxs("div",{className:"loading-container",children:[e.jsx("div",{className:"loading-content",children:e.jsxs("div",{className:"loading-content-in",children:["Loading ",e.jsxs("span",{children:[r,"%"]})]})}),e.jsx("div",{className:"loading-box"})]}),e.jsx("div",{className:"loading-content2",children:e.jsx("span",{children:"Welcome"})})]})]})]})]})},le=r=>{let t=0,o=setInterval(()=>{if(t<=50){let a=Math.round(Math.random()*5);t=t+a,r(t)}else clearInterval(o),o=setInterval(()=>{t=t+Math.round(Math.random()),r(t),t>91&&clearInterval(o)},2e3)},100);function i(){clearInterval(o),r(100)}function n(){return new Promise(a=>{clearInterval(o),o=setInterval(()=>{t<100?(t++,r(t)):(a(t),clearInterval(o))},2)})}return{loaded:n,percent:t,clear:i}},W=c.createContext(null),ne=({children:r})=>{const[t,o]=c.useState(!0),[i,n]=c.useState(0),a={isLoading:t,setIsLoading:o,setLoading:n};return c.useEffect(()=>{},[i]),e.jsxs(W.Provider,{value:a,children:[t&&e.jsx(te,{percent:i}),e.jsx("main",{className:"main-body",children:r})]})},re=()=>{const r=c.useContext(W);if(!r)throw new Error("useLoading must be used within a LoadingProvider");return r},ae=c.lazy(()=>A(()=>import("./index-JG5cOoFc.js"),__vite__mapDeps([6,2,1,4]))),se=c.lazy(()=>A(()=>import("./MainContainer-Ck5pAQOp.js"),__vite__mapDeps([7,2,1,3,4,5,8]))),ie=()=>e.jsx(e.Fragment,{children:e.jsx(ne,{children:e.jsx(c.Suspense,{fallback:e.jsx("div",{children:"Loading app..."}),children:e.jsx(se,{children:e.jsx(c.Suspense,{fallback:e.jsx("div",{children:"Loading 3D..."}),children:e.jsx(ae,{})})})})})});Y(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(ie,{})}));export{Z as a,le as s,re as u};
