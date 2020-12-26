parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aAl5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;class t{constructor(s,a,i){this.c=i.getContext("2d"),this.data=a,this.c_height=i.height,this.c_width=i.width,this.num=s,this.col_w=this.c_width/this.num,this.status=0,this.req=0,this.speed=1,this.description=Object.keys(t.prototype).map(t=>t.split(" ").map(t=>t[0].toUpperCase()+t.substr(1)).join(" ")).sort(),this.mode="column"}set_fill(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#f0f0f0";this.c.fillStyle=t}showData(){this.c.clearRect(0,0,this.c_width,this.c_height);for(var t=this.col_w*this.num/this.c_width,s=0,a=this.data.length;s!==a;s++)this.c.fillRect(this.data[s][0]-t,this.c_height-this.data[s][1],this.col_w+t,this.data[s][1])}redLine(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#ff0505";this.set_fill(t);let s=this.col_w/(this.c_width/this.num);for(var a=arguments.length,i=new Array(a>1?a-1:0),h=1;h<a;h++)i[h-1]=arguments[h];for(let e=0;e<i.length;e++)this.c.fillRect(i[e][0]-s,this.c_height-i[e][1],this.col_w+s,i[e][1]);this.set_fill()}async sleep(){return new Promise(requestAnimationFrame)}callBack(){}async shuffle(){this.set_fill();let t=0;for(let s=0;s<144;s++){await this.sleep(),t=0;for(let s=0;s<this.data.length;s++)this.data[s][1]?this.data[s][1]=~~(this.data[s][1]*(11/12)):t++;if(this.showData(),t===this.data.length)break}this.data=[],await this.setRandomData()}async setRandomData(){this.set_fill(),this.col_w=this.c_width/this.num;let t=this.data.length,s=this.num;if(s<t){for(let s=0;s<-this.num+t;s++)this.data.pop();return}let a=[];for(let i=0;i<s-t;i++)a.push([t+i,~~(this.c_height-Math.random()*(this.c_height-15))]),this.data.push([i*this.col_w,0]);this.anim_data(a,15,t,s)}async anim_data(t,s,a,i){let h=s,e=0,d=t;for(let o=0;o<h*h;o++){await this.sleep(),e=0,this.showData();for(let t=0;t<i-a;t++)this.data[a+t][1]>=d[t][1]?(e++,this.data[a+t][1]=d[t][1]):this.data[a+t][1]=~~(this.data[a+t][1]+d[t][1]/h);if(e===i-a)break}}end_sort(){this.c.fillStyle="#00ff00",this.showData(),this.status=0,this.callBack()}}exports.default=t,t.prototype["Bubble sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=0,s=0,a=this.num,i=0,h=await(async()=>{for(;;){if(!this.status)return 0;if(await this.sleep(),this.showData(),this.redLine("#ff0505",this.data[s]),s+1<a&&this.data[s][1]>this.data[s+1][1]?(i=this.data[s][1],this.data[s][1]=this.data[s+1][1],this.data[s+1][1]=i,t=0):t++,t>=a)return 1;++s>=a&&(a-=t,t=0,s=0)}})();this.showData(),h&&this.end_sort()},t.prototype["Comb sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=this.data.length-1,s=~~(10*this.data.length/13),a=0,i=0,h=0,e=0,d=s,o=await(async()=>{for(;;){if(!this.status)return 0;if(await this.sleep(),this.showData(),this.redLine("#ff0505",this.data[a]),a+s<=t&&this.data[a][1]>this.data[a+s][1]?(i=this.data[a][1],this.data[a][1]=this.data[a+s][1],this.data[a+s][1]=i,e&&(s=d),e=0,h=0):h++,this.redLine("#ff0505",this.data[a+s]),++a+s>t){if(a=0,d=s,(s=~~(10*s/13))<1&&h>=t)return 1;(s<1||h>=t-d)&&(e=1,s=1),h=0}}})();this.showData(),o&&this.end_sort()},t.prototype["Insertion sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=1,s=t+1,a=0,i=await(async()=>{for(;;){if(!this.status)return 0;if(await this.sleep(),this.showData(),this.redLine("#ff0505",this.data[s-1]),--s-1>=0&&this.data[s][1]<this.data[s-1][1]?(a=this.data[s][1],this.data[s][1]=this.data[s-1][1],this.data[s-1][1]=a):s=++t+1,t>=this.num)return 1}})();this.showData(),i&&this.end_sort()},t.prototype["Merge sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=async(a,i)=>{if(a<i){var h=~~(a+(i-a)/2);await t(a,h),await t(h+1,i),await s(a,h,i)}if(!this.status)return-1},s=async(t,s,a)=>{let i=this.data.slice(t,s+1),h=this.data.slice(s+1,a+1),e=i.length+h.length,d=[];for(let n=0,f=0;n+f<e;n++,f++){var o,r,l;if(!this.status)return-1;await this.sleep(),this.showData(),void 0===(null===(o=h[f])||void 0===o?void 0:o[1])||(null===(r=i[n])||void 0===r?void 0:r[1])<(null===(l=h[f])||void 0===l?void 0:l[1])?(d.push(i[n][1]),this.redLine("#ff0505",this.data[n+t],this.data[s+f]),f--):(d.push(h[f][1]),this.redLine("#ff0505",this.data[n+t],this.data[s+f]),n--)}for(let n=0;n<d.length;n++){if(!this.status)return-1;this.data[t+n][1]=d[n],this.showData(),this.redLine("#ff0505",this.data[t+n]),await this.sleep()}},a=await t(0,this.data.length-1)||1;this.showData(),-1!==a&&this.end_sort()},t.prototype["Shell sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=this.data.length,s=~~(this.data.length/2),a=s,i=s,h=0,e=await(async()=>{for(;;){if(!this.status)return 0;if(await this.sleep(),i-s>=0&&this.data[i][1]<this.data[i-s][1]?(h=this.data[i][1],this.data[i][1]=this.data[i-s][1],this.data[i-s][1]=h,i-=s):i=++a,this.showData(),this.redLine("#ff0505",this.data[i-s*(i>=s)]),a>=t&&(a=s=~~(s/2),i=s,s<1))return 1;this.redLine("#ff0505",this.data[a])}})();this.showData(),e&&this.end_sort()},t.prototype["Cocktail sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=0,s=0,a=this.data.length-1,i=1,h=0,e=0,d=await(async()=>{for(;;){if(!this.status)return 0;if(await this.sleep(),this.showData(),this.redLine("#ff0505",this.data[t]),s<=t+i&&t+i<=a?(i>0&&this.data[t][1]>this.data[t+i][1]||i<0&&this.data[t][1]<this.data[t-1][1]?(h=this.data[t][1],this.data[t][1]=this.data[t+i][1],this.data[t+i][1]=h,e=0):e++,t+=i):(i=-i,t=t>=a?a-=e:s+=e),s>a)return 1}})();this.showData(),d&&this.end_sort()},t.prototype["Quick Sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=0,s=async(t,i)=>{if(t<i){let h=await a(t,i);if(-1===h)return h;await s(t,h),await s(h+1,i)}if(!this.status)return-1},a=async(s,a)=>{let i=0,h=0;var e=~~((a+s)/2);let d=this.data[e][1],o=s-1,r=a+1;for(;;){if(!this.status)return-1;if(await this.sleep(),i||(o++,this.data[o][1]>=d&&(i=1)),i&&(r--,this.data[r][1]<=d&&(h=1)),this.showData(),this.redLine("#68f571",this.data[e]),this.redLine("#ff0505",this.data[o],this.data[r-1*!i]),i&&h){if(o>=r)return r;i=0,h=0,o===e?e=r:r===e&&(e=o),t=this.data[o][1],this.data[o][1]=this.data[r][1],this.data[r][1]=t}}},i=await s(0,this.data.length-1)||1;this.showData(),-1!==i&&this.end_sort()};
},{}],"O1zn":[function(require,module,exports) {
"use strict";var e=t(require("./Methods.js"));function t(e){return e&&e.__esModule?e:{default:e}}let n=document.querySelector("canvas"),a=document.querySelector(".nav-bar"),i=document.querySelector(".selection"),c=document.querySelector(".ip"),l=document.querySelector(".start"),s=document.querySelector(".randomizer"),o=document.querySelector(".stop"),d=[],r=new e.default(parseInt(c.value),d,n),u=parseInt(c.value);for(let C of r.description){let e=document.createElement("OPTION"),t=document.createTextNode(C);e.appendChild(t),e.classList.add("opts"),e.value=C.toLowerCase(),i.appendChild(e)}let m=document.querySelector(".option-wrap"),h=i.length,w=document.createElement("DIV");w.setAttribute("class","current-select"),w.setAttribute("value",i[0].innerHTML.toLowerCase()),w.innerHTML=i[0].innerHTML;let g=document.createElement("I");g.setAttribute("class","fas fa-caret-down arrow-down"),w.appendChild(g),m.appendChild(w);let v=document.createElement("DIV"),L=[];v.setAttribute("class","select-items"),v.classList.toggle("hide-items");for(let C=0;C<h;C++)L.push(document.createElement("DIV")),L[C].setAttribute("class","choices"),L[C].innerHTML=i[C].innerHTML,L[C].addEventListener("click",()=>{w.firstChild.data=L[C].innerHTML,w.setAttribute("value",L[C].innerHTML.toLowerCase()),r.status=0,r.callBack()}),v.appendChild(L[C]);function f(){w.classList.toggle("active"),v.classList.toggle("hide-items")}function p(){n.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n.height=window.innerHeight-a.clientHeight||document.documentElement.clientHeight-a.clientHeight||document.body.clientHeight-a.clientHeight,r.c_height=n.height,r.c_width=n.width,r.setRandomData();for(var e=0,t=r.data.length;e!==t;e++)r.col_w=r.c_width/r.num,r.data[e][0]=e*r.col_w;r.set_fill(),r.showData()}async function E(){if(r.num>=+c.min){var e;console.clear();const t=(new Date).getTime();console.log("Start: ".concat(t)),await(null===(e=r[w.getAttribute("value").toLowerCase()])||void 0===e?void 0:e.call(r));const n=(new Date).getTime();console.log("End: ".concat(n)),console.log("Time taken: ".concat(n-t,"ms"))}}function y(){r.status=0,r.callBack()}m.appendChild(v),m.addEventListener("click",f),window.addEventListener("click",e=>{!m.contains(e.target)&&w.classList.contains("active")&&f()}),r.callBack=function(){l.firstChild.classList="fas fa-play"},l.addEventListener("click",()=>{r.status=!r.status,r.status?(l.firstChild.classList="fas fa-pause",E()):y()}),window.addEventListener("resize",p),c.addEventListener("change",()=>{y(),r.num=parseInt(c.value),(r.num<+c.min||r.num>+c.max)&&(c.value=u,r.num=u,alert("Invalid number (Too high or too low)")),p()}),s.addEventListener("click",async()=>{y(),r.shuffle()}),o.addEventListener("click",y),p();
},{"./Methods.js":"aAl5"}]},{},["O1zn"], null)
//# sourceMappingURL=Sorting.f8fcd0f8.js.map