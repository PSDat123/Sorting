parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aAl5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;class t{constructor(s,i,a){this.c=a.getContext("2d"),this.data=i,this.c_height=a.height,this.c_width=a.width,this.num=s,this.col_w=this.c_width/this.num,this.status=0,this.req=0,this.speed=1,this.description=Object.keys(t.prototype).map(t=>t.split(" ").map(t=>t[0].toUpperCase()+t.substr(1)).join(" ")).sort()}updatePara(){for(var t=0,s=this.data.length;t!==s;t++)this.col_w=this.c_width/this.num,this.data[t][0]=t*this.col_w}showData(){this.c.clearRect(0,0,this.c_width,this.c_height);for(var t=this.col_w*this.num/this.c_width,s=0,i=this.data.length;s!==i;s++)this.c.fillRect(this.data[s][0]-t,this.c_height-this.data[s][1],this.col_w+t,this.data[s][1])}redLine(t){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#ff0505";this.set_fill(s),this.c.fillRect(t[0]-this.col_w/(this.c_width/this.num),this.c_height-t[1],this.col_w+this.col_w/(this.c_width/this.num),t[1]),this.set_fill()}setRandomData(){this.col_w=this.c_width/this.num;let t=this.data.length;if(this.num<t)for(let s=0;s<-this.num+t;s++)this.data.pop();else for(let s=0;s<this.num-t*(this.num>=t);s++)this.data.push([s*this.col_w,~~(this.c_height-Math.random()*this.c_height)])}end_sort(){cancelAnimationFrame(this.req),this.c.fillStyle="#00ff00",this.showData(),this.status=0,this.callBack()}set_fill(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#f0f0f0";this.c.fillStyle=t}callBack(){}}exports.default=t,t.prototype["Bubble sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();console.log("Start: ".concat(t));let s=0,i=0,a=this.num,e=0,h=()=>{this.req=requestAnimationFrame(h),this.showData(),this.redLine(this.data[i]);for(let h=0,o=this.speed;h<o;h++){if(i+1<a&&this.data[i][1]>this.data[i+1][1]?(e=this.data[i][1],this.data[i][1]=this.data[i+1][1],this.data[i+1][1]=e,s=0):s++,s>=a){this.end_sort();const s=(new Date).getTime();console.log("End: ".concat(s)),console.log("Time taken: ".concat(s-t,"ms"));break}++i>=a&&(a-=s,s=0,i=0)}};h()},t.prototype["Comb sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();console.log("Start: ".concat(t));let s=this.data.length-1,i=~~(10*this.data.length/13),a=0,e=0,h=0,o=0,n=i,c=()=>{this.req=requestAnimationFrame(c),this.showData(),this.redLine(this.data[a]);for(let c=0,l=this.speed;c<l;c++)if(a+i<=s&&this.data[a][1]>this.data[a+i][1]?(e=this.data[a][1],this.data[a][1]=this.data[a+i][1],this.data[a+i][1]=e,o&&(i=n),o=0,h=0):h++,c==l-1&&this.redLine(this.data[a+i]),++a+i>s){if(a=0,n=i,(i=~~(10*i/13))<1&&h>=s){this.end_sort();const s=(new Date).getTime();console.log("End: ".concat(s)),console.log("Time taken: ".concat(s-t,"ms"));break}(i<1||h>=s-n)&&(o=1,i=1),h=0}};c()},t.prototype["Insertion sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();console.log("Start: ".concat(t));let s=1,i=s+1,a=0,e=()=>{this.req=requestAnimationFrame(e),this.showData(),this.redLine(this.data[i-1]);for(let e=0;e<this.speed;e++)if(--i-1>=0&&this.data[i][1]<this.data[i-1][1]?(a=this.data[i][1],this.data[i][1]=this.data[i-1][1],this.data[i-1][1]=a):i=++s+1,s>=this.num){this.end_sort();const s=(new Date).getTime();console.log("End: ".concat(s)),console.log("Time taken: ".concat(s-t,"ms"));break}};e()},t.prototype["Merge sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();console.log("Start: ".concat(t));let s=async(t,s,i)=>{let a=this.data.slice(t,s+1),e=this.data.slice(s+1,i+1),h=a.length+e.length;for(let l=0,d=0;l+d<h;l++,d++){var o,n,c;await new Promise(requestAnimationFrame),this.showData(),void 0===(null===(o=e[d])||void 0===o?void 0:o[1])||(null===(n=a[l])||void 0===n?void 0:n[1])<(null===(c=e[d])||void 0===c?void 0:c[1])?(this.data[l+d+t]=[this.data[l+d+t][0],a[l][1]],this.redLine(this.data[l+d+t]),d--):(this.data[l+d+t]=[this.data[l+d+t][0],e[d][1]],this.redLine(this.data[l+d+t]),l--)}};(async()=>{await async function t(i,a){if(i<a){var e=~~(i+(a-i)/2);await t(i,e),await t(e+1,a),await s(i,e,a)}}(0,this.data.length-1),this.end_sort();const i=(new Date).getTime();console.log("End: ".concat(i)),console.log("Time taken: ".concat(i-t,"ms"))})()},t.prototype["Shell sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();console.log("Start: ".concat(t));let s=this.data.length,i=~~(this.data.length/2),a=i,e=i,h=0,o=()=>{if(this.req=requestAnimationFrame(o),0<=e-i&&this.data[e][1]<this.data[e-i][1]?(h=this.data[e][1],this.data[e][1]=this.data[e-i][1],this.data[e-i][1]=h,e-=i):e=++a,this.showData(),this.redLine(this.data[e-i*(e>=i)]),a>=s&&(a=i=~~(i/2),e=i,i<1)){this.end_sort();const s=(new Date).getTime();console.log("End: ".concat(s)),console.log("Time taken: ".concat(s-t,"ms"))}this.redLine(this.data[a])};o()},t.prototype["Cocktail sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();console.log("Start: ".concat(t));let s=0,i=0,a=this.data.length-1,e=1,h=0,o=0,n=()=>{this.req=requestAnimationFrame(n),this.showData(),this.redLine(this.data[s]);for(let n=0;n<this.speed;n++)if(i<=s+e&&s+e<=a?(e>0&&this.data[s][1]>this.data[s+e][1]||e<0&&this.data[s][1]<this.data[s-1][1]?(h=this.data[s][1],this.data[s][1]=this.data[s+e][1],this.data[s+e][1]=h,o=0):o++,s+=e):(e=-e,s=s>=a?a-=o:i+=o),i>a){this.end_sort();const s=(new Date).getTime();console.log("End: ".concat(s)),console.log("Time taken: ".concat(s-t,"ms"));break}};n()},t.prototype["Quick Sort".toLowerCase()]=function(){this.set_fill(),this.status=1;const t=(new Date).getTime();function s(){return new Promise(requestAnimationFrame)}console.log("Start: ".concat(t));let i=async(t,i)=>{let a=this.data[t][1],e=0,h=0,o=0,n=t-1,c=i+1;for(;;)if(await s(),h||(n++,this.data[n][1]>=a&&(h=1)),h&&(c--,this.data[c][1]<=a&&(o=1)),this.showData(),this.redLine(this.data[n]),this.redLine(this.data[c-1*!h]),h&&o){if(n>=c)return c;h=0,o=0,e=this.data[n][1],this.data[n][1]=this.data[c][1],this.data[c][1]=e}};(async()=>{await async function t(s,a){if(s<a){let e=await i(s,a);await t(s,e),await t(e+1,a)}}(0,this.data.length-1),this.end_sort();const s=(new Date).getTime();console.log("End: ".concat(s)),console.log("Time taken: ".concat(s-t,"ms"))})()};
},{}],"O1zn":[function(require,module,exports) {
"use strict";var e=t(require("./Methods.js"));function t(e){return e&&e.__esModule?e:{default:e}}let n=document.querySelector("canvas"),a=document.querySelector(".nav-bar"),i=document.querySelector(".start"),s=document.querySelector(".selection"),c=document.querySelector(".ip"),l=[],r=new e.default(parseInt(c.value),l,n),d=parseInt(c.value);for(let A of r.description){let e=document.createElement("OPTION"),t=document.createTextNode(A);e.appendChild(t),e.classList.add("opts"),e.value=A.toLowerCase(),s.appendChild(e)}const o=new Event("method_changed");let u=document.querySelector(".option-wrap"),h=s.length,m=document.createElement("DIV");m.setAttribute("class","current-select"),m.setAttribute("value",s[0].innerHTML.toLowerCase()),m.innerHTML=s[0].innerHTML;let L=document.createElement("I");L.setAttribute("class","fas fa-caret-down arrow-down"),m.appendChild(L),u.appendChild(m);let p=document.createElement("DIV"),f=[];p.setAttribute("class","select-items"),p.classList.toggle("hide-items");for(let A=0;A<h;A++)f.push(document.createElement("DIV")),f[A].setAttribute("class","choices"),f[A].innerHTML=s[A].innerHTML,f[A].addEventListener("click",()=>{m.firstChild.data=f[A].innerHTML,m.setAttribute("value",f[A].innerHTML.toLowerCase()),m.dispatchEvent(o)}),p.appendChild(f[A]);function v(){m.classList.toggle("active"),p.classList.toggle("hide-items")}function w(){n.width=window.innerWidth,n.height=window.innerHeight-a.offsetHeight,r.c_height=n.height,r.c_width=n.width,r.setRandomData(),r.updatePara(),r.set_fill(),r.showData()}u.appendChild(p),u.addEventListener("click",v),window.addEventListener("click",e=>{!u.contains(e.target)&&m.classList.contains("active")&&v()}),i.addEventListener("click",()=>{r.status=!r.status,r.status?(i.firstChild.classList="fas fa-pause",i.lastChild.data=" STOP",E()):T()}),r.callBack=function(){i.firstChild.classList="fas fa-play",i.lastChild.data=" START"},window.addEventListener("resize",w),m.addEventListener("method_changed",C,!1),c.addEventListener("change",()=>{T(),r.num=parseInt(c.value),(r.num<+c.min||r.num>+c.max)&&(c.value=d,r.num=d,alert("Invalid number (Too high or too low)")),w()}),w();let g="";function C(){r.status=0,r.callBack(),g='method["'.concat(m.getAttribute("value").toLowerCase(),'"]()')}function E(){r.num>=+c.min&&(cancelAnimationFrame(r.req),r[m.getAttribute("value").toLowerCase()]())}function T(){cancelAnimationFrame(r.req),r.status=0,r.callBack()}C();
},{"./Methods.js":"aAl5"}]},{},["O1zn"], null)
//# sourceMappingURL=/Sorting.d3f5ea37.js.map