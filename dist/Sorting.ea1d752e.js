parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aAl5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;class t{constructor(s,a,i){this.c=i.getContext("2d",{alpha:!1}),this.data=a,this.c_height=i.height,this.c_width=i.width,this.num=s,this.col_w=this.c_width/this.num,this.status=0,this.speed=1,this.description=Object.keys(t.prototype).map(t=>t.split(" ").map(t=>t[0].toUpperCase()+t.substr(1)).join(" ")).sort(),this.mode="column"}set_fill(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#f0f0f0";this.c.fillStyle=t}showData(){let t=this.c_height,s=1+~~this.col_w;this.c.clearRect(0,0,this.c_width,this.c_height);for(let a=this.data.length;a--;)this.c.fillRect(this.data[a][0]-1,t-this.data[a][1],s,this.data[a][1])}redLine(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#ff0505";this.set_fill(t);let s=this.c_height,a=1+~~this.col_w;for(var i=arguments.length,h=new Array(i>1?i-1:0),e=1;e<i;e++)h[e-1]=arguments[e];for(let r=h.length;r--;)this.c.fillRect(h[r][0]-1,s-h[r][1],a,h[r][1]);this.set_fill()}async sleep(){return new Promise(requestAnimationFrame)}callBack(){}async shuffle(){this.set_fill();let t=0;for(let s=0;s<100;s++){await this.sleep(),t=0;for(let s=0;s<this.data.length;s++)this.data[s][1]<=1?(t++,this.data[s][1]=0):this.data[s][1]-=this.data[s][1]/10;if(this.showData(),t===this.data.length)break}this.data=[],await this.setRandomData()}async setRandomData(){this.set_fill(),this.col_w=this.c_width/this.num;let t=this.data.length,s=this.num;if(s<t){for(let s=t-this.num;s--;)this.data.pop();return}let a=[];for(let i=0,h=s-t;i<h;i++)a.push([t+i,5+~~(Math.random()*(this.c_height-5))]),this.data.push([~~(i*this.col_w),0]);await this.anim_data(a,12,t,s)}async anim_data(t,s,a,i){let h=s,e=0,r=t;for(let d=0;d<h*h;d++){await this.sleep(),e=0,this.showData();for(let t=0;t<i-a;t++)this.data[a+t][1]>=r[t][1]?(e++,this.data[a+t][1]=r[t][1]):this.data[a+t][1]=this.data[a+t][1]+r[t][1]/h;if(e===i-a)break}this.showData()}end_sort(){this.c.fillStyle="#00ff00",this.showData(),this.status=0,this.callBack()}}exports.default=t,t.prototype["Bubble sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=0,s=0,a=this.num,i=0;await(async()=>{for(;;){if(await this.sleep(),!this.status)return 0;if(this.showData(),this.redLine("#ff0505",this.data[s]),s+1<a&&this.data[s][1]>this.data[s+1][1]?(i=this.data[s][1],this.data[s][1]=this.data[s+1][1],this.data[s+1][1]=i,t=0):t++,t===a)return 1;++s===a&&(a-=t,t=0,s=0)}})()?this.end_sort():this.showData()},t.prototype["Comb sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=this.data.length-1,s=~~(10*this.data.length/13),a=0,i=0,h=0,e=0,r=s,d=await(async()=>{for(;;){if(await this.sleep(),!this.status)return 0;if(this.showData(),this.redLine("#ff0505",this.data[a]),a+s<=t&&this.data[a][1]>this.data[a+s][1]?(i=this.data[a][1],this.data[a][1]=this.data[a+s][1],this.data[a+s][1]=i,e&&(s=r),e=0,h=0):h++,a+s<=t&&this.redLine("#ff0505",this.data[a+s]),++a+s>t){if(a=0,r=s,(s=~~(10*s/13))<1&&h>=t)return 1;(s<1||h>=t-r)&&(e=1,s=1),h=0}}})();this.showData(),d&&this.end_sort()},t.prototype["Insertion sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=1,s=t+1,a=0,i=await(async()=>{for(;;){if(await this.sleep(),!this.status)return 0;if(this.showData(),this.redLine("#ff0505",this.data[s-1]),--s-1>=0&&this.data[s][1]<this.data[s-1][1]?(a=this.data[s][1],this.data[s][1]=this.data[s-1][1],this.data[s-1][1]=a):s=++t+1,t>=this.num)return 1}})();this.showData(),i&&this.end_sort()},t.prototype["Merge sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=async(a,i)=>{if(!this.status)return-1;if(a<i){var h=~~(a+(i-a)/2);await t(a,h),await t(h+1,i),await s(a,h,i)}return this.status?void 0:-1},s=async(t,s,a)=>{let i=this.data.slice(t,s+1),h=this.data.slice(s+1,a+1),e=i.length+h.length,r=[];for(let n=0,f=0;n+f<e;n++,f++){var d,o,l;if(await this.sleep(),!this.status)return-1;this.showData(),void 0===(null===(d=h[f])||void 0===d?void 0:d[1])||(null===(o=i[n])||void 0===o?void 0:o[1])<(null===(l=h[f])||void 0===l?void 0:l[1])?(r.push(i[n][1]),this.redLine("#ff0505",this.data[n+t],this.data[s+f]),f--):(r.push(h[f][1]),this.redLine("#ff0505",this.data[n+t],this.data[s+f]),n--)}for(let n=0;n<r.length;n++){if(await this.sleep(),!this.status)return-1;this.data[t+n][1]=r[n],this.showData(),this.redLine("#ff0505",this.data[t+n])}},a=await t(0,this.data.length-1)||1;this.showData(),-1!==a&&this.end_sort()},t.prototype["Shell sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=this.data.length,s=~~(this.data.length/2),a=s,i=s,h=0,e=await(async()=>{for(;;){if(await this.sleep(),!this.status)return 0;if(i-s>=0&&this.data[i][1]<this.data[i-s][1]?(h=this.data[i][1],this.data[i][1]=this.data[i-s][1],this.data[i-s][1]=h,i-=s):i=++a,this.showData(),this.redLine("#ff0505",this.data[i-s*(i>=s)]),a>=t&&(a=s=~~(s/2),i=s,s<1))return 1;this.redLine("#ff0505",this.data[a])}})();this.showData(),e&&this.end_sort()},t.prototype["Cocktail sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=0,s=0,a=this.data.length-1,i=1,h=0,e=0,r=await(async()=>{for(;;){if(await this.sleep(),!this.status)return 0;if(this.showData(),this.redLine("#ff0505",this.data[t]),s<=t+i&&t+i<=a?(i>0&&this.data[t][1]>this.data[t+i][1]||i<0&&this.data[t][1]<this.data[t-1][1]?(h=this.data[t][1],this.data[t][1]=this.data[t+i][1],this.data[t+i][1]=h,e=0):e++,t+=i):(i=-i,t=t>=a?a-=e:s+=e),s>a)return 1}})();this.showData(),r&&this.end_sort()},t.prototype["Quick Sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=0,s=async(t,i)=>{if(!this.status)return-1;if(t<i){let h=await a(t,i);if(-1===h)return h;await s(t,h),await s(h+1,i)}return this.status?void 0:-1},a=async(s,a)=>{let i=0,h=0;var e=~~((a+s)/2);let r=this.data[e][1],d=s-1,o=a+1;for(;;){if(await this.sleep(),!this.status)return-1;if(i||(d++,this.data[d][1]>=r&&(i=1)),i&&(o--,this.data[o][1]<=r&&(h=1)),this.showData(),this.redLine("#68f571",this.data[e]),this.redLine("#ff0505",this.data[d],this.data[o-1*!i]),i&&h){if(d>=o)return o;i=0,h=0,d===e?e=o:o===e&&(e=d),t=this.data[d][1],this.data[d][1]=this.data[o][1],this.data[o][1]=t}}},i=await s(0,this.data.length-1)||1;this.showData(),-1!==i&&this.end_sort()},t.prototype["Radix Sort".toLowerCase()]=async function(){this.set_fill(),this.status=1;let t=1+~~Math.log10(this.c_height),s=async t=>{let s=[0,0,0,0,0,0,0,0,0,0],a=[];for(let e=0;e<this.data.length;e++){if(await this.sleep(),!this.status)return 0;s[~~(this.data[e][1]%10**t/10**(t-1))]++,this.showData(),this.redLine("#ff0505",this.data[e])}for(let e=1;e<s.length;e++)s[e]+=s[e-1];s.unshift(0),s.pop();let i=[],h=[];for(let e=0,r=s.length;e!==r;e++)i.push(s[e]),s[e]<this.num&&this.redLine("#ff0505",this.data[s[e]]),0!==e&&(e===r-1&&(h[e]=this.num-i[e]),h[e-1]=i[e]-i[e-1]);for(let e=0,r=this.data.length;e!==r;e++){let i=~~(this.data[e][1]%10**t/10**(t-1));a[s[i]]=this.data[e][1],s[i]++}for(;;){if(await this.sleep(),!this.status)return 0;let t=0;this.showData();for(let s=0,e=i.length;s!==e;s++)h[s]&&(this.data[i[s]][1]=a[i[s]],this.redLine("#ff0505",this.data[i[s]]),i[s]++,h[s]--,t++);if(!t)break}},a=await(async()=>{for(let a=1;a<=t;a++){if(!this.status)return 0;await s(a)}return this.status?1:0})();this.showData(),a&&this.end_sort()};
},{}],"O1zn":[function(require,module,exports) {
"use strict";var e=t(require("./Methods.js"));function t(e){return e&&e.__esModule?e:{default:e}}let n=document.querySelector(".main-canvas"),a=document.querySelector(".nav-bar"),i=document.querySelector(".selection"),c=document.querySelector(".ip"),l=document.querySelector(".start"),s=document.querySelector(".randomizer"),o=document.querySelector(".stop"),d=[],r=new e.default(parseInt(c.value),d,n),u=parseInt(c.value),m=0;for(let H of r.description){let e=document.createElement("OPTION"),t=document.createTextNode(H);e.appendChild(t),e.classList.add("opts"),e.value=H.toLowerCase(),i.appendChild(e)}let h=document.querySelector(".option-wrap"),w=i.length,v=document.createElement("DIV");v.setAttribute("class","current-select"),v.setAttribute("value",i[0].innerHTML.toLowerCase()),v.innerHTML=i[0].innerHTML;let L=document.createElement("I");L.setAttribute("class","fas fa-caret-down arrow-down"),v.appendChild(L),h.appendChild(v);let g=document.createElement("DIV"),f=[];g.setAttribute("class","select-items"),g.classList.toggle("hide-items");for(let H=0;H<w;H++)f.push(document.createElement("DIV")),f[H].setAttribute("class","choices"),f[H].innerHTML=i[H].innerHTML,f[H].addEventListener("click",()=>{v.firstChild.data=f[H].innerHTML,v.setAttribute("value",f[H].innerHTML.toLowerCase()),r.status=0,r.callBack()}),g.appendChild(f[H]);function p(){v.classList.toggle("active"),g.classList.toggle("hide-items")}h.appendChild(g),h.addEventListener("click",p),window.addEventListener("click",e=>{!h.contains(e.target)&&v.classList.contains("active")&&p()});let E=1;function b(){n.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n.height=window.innerHeight-a.clientHeight||document.documentElement.clientHeight-a.clientHeight||document.body.clientHeight-a.clientHeight,r.c_height=n.height,r.c_width=n.width,r.setRandomData();for(var e=0,t=r.data.length;e!==t;e++)r.data[e][0]=~~(e*r.col_w);r.set_fill(),r.showData()}async function y(){if(r.num>=+c.min){var e;console.clear();const t=(new Date).getTime();console.log("Start: ".concat(t)),await(null===(e=r[v.getAttribute("value").toLowerCase()])||void 0===e?void 0:e.call(r));const n=(new Date).getTime();console.log("End: ".concat(n)),console.log("Time taken: ".concat(n-t,"ms")),r.callBack()}}function C(){r.status=0,r.callBack()}r.callBack=function(){l.firstChild.classList="fas fa-play",E=1},l.addEventListener("click",()=>{m||(r.status=!r.status),r.status?1===E&&(l.firstChild.classList="fas fa-pause",E=0,y()):C()}),window.addEventListener("resize",b),c.addEventListener("change",()=>{C(),r.num=parseInt(c.value),(r.num<+c.min||r.num>+c.max||!c.value)&&(c.value=u,r.num=u,alert("Invalid number (Too high or too low)")),b()}),s.addEventListener("click",async()=>{C(),m||(m=1,c.disabled=!0,await r.shuffle(),m=0,c.disabled=!1)}),o.addEventListener("click",C),window.addEventListener("load",b);
},{"./Methods.js":"aAl5"}]},{},["O1zn"], null)
//# sourceMappingURL=Sorting.ea1d752e.js.map