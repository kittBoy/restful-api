!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.signature=n()}(this,function(){"use strict";"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function t(t,n){return t(n={exports:{}},n.exports),n.exports}var r=t(function(t,n){var r,h,e,i,o,s,p,a,u,c,f,d,l;t.exports=(r=r||(h=Math,e=Object.create||function(){function r(){}return function(t){var n;return r.prototype=t,n=new r,r.prototype=null,n}}(),o=(i={}).lib={},s=o.Base={extend:function(t){var n=e(this);return t&&n.mixIn(t),n.hasOwnProperty("init")&&this.init!==n.init||(n.init=function(){n.$super.init.apply(this,arguments)}),(n.init.prototype=n).$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},p=o.WordArray=s.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=null!=n?n:4*t.length},toString:function(t){return(t||u).stringify(this)},concat:function(t){var n=this.words,r=t.words,e=this.sigBytes,i=t.sigBytes;if(this.clamp(),e%4)for(var o=0;o<i;o++){var s=r[o>>>2]>>>24-o%4*8&255;n[e+o>>>2]|=s<<24-(e+o)%4*8}else for(var o=0;o<i;o+=4)n[e+o>>>2]=r[o>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=h.ceil(n/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var n,r=[],e=function(n){var n=n,r=987654321,e=4294967295;return function(){var t=((r=36969*(65535&r)+(r>>16)&e)<<16)+(n=18e3*(65535&n)+(n>>16)&e)&e;return t/=4294967296,(t+=.5)*(.5<h.random()?1:-1)}},i=0;i<t;i+=4){var o=e(4294967296*(n||h.random()));n=987654071*o(),r.push(4294967296*o()|0)}return new p.init(r,t)}}),a=i.enc={},u=a.Hex={stringify:function(t){for(var n=t.words,r=t.sigBytes,e=[],i=0;i<r;i++){var o=n[i>>>2]>>>24-i%4*8&255;e.push((o>>>4).toString(16)),e.push((15&o).toString(16))}return e.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new p.init(r,n/2)}},c=a.Latin1={stringify:function(t){for(var n=t.words,r=t.sigBytes,e=[],i=0;i<r;i++){var o=n[i>>>2]>>>24-i%4*8&255;e.push(String.fromCharCode(o))}return e.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new p.init(r,n)}},f=a.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},d=o.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new p.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var n=this._data,r=n.words,e=n.sigBytes,i=this.blockSize,o=4*i,s=e/o,a=(s=t?h.ceil(s):h.max((0|s)-this._minBufferSize,0))*i,u=h.min(4*a,e);if(a){for(var c=0;c<a;c+=i)this._doProcessBlock(r,c);var f=r.splice(0,a);n.sigBytes-=u}return new p.init(f,u)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),o.Hasher=d.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var n=this._doFinalize();return n},blockSize:16,_createHelper:function(r){return function(t,n){return new r.init(n).finalize(t)}},_createHmacHelper:function(r){return function(t,n){return new l.HMAC.init(r,n).finalize(t)}}}),l=i.algo={},i),r)}),i=t(function(t,n){var s;t.exports=(s=r,function(f){var t=s,n=t.lib,r=n.WordArray,e=n.Hasher,i=t.algo,H=[];!function(){for(var t=0;t<64;t++)H[t]=4294967296*f.abs(f.sin(t+1))|0}();var o=i.MD5=e.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,n){for(var r=0;r<16;r++){var e=n+r,i=t[e];t[e]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var o=this._hash.words,s=t[n+0],a=t[n+1],u=t[n+2],c=t[n+3],f=t[n+4],h=t[n+5],p=t[n+6],d=t[n+7],l=t[n+8],y=t[n+9],v=t[n+10],g=t[n+11],_=t[n+12],w=t[n+13],B=t[n+14],m=t[n+15],x=o[0],b=o[1],S=o[2],j=o[3];b=A(b=A(b=A(b=A(b=M(b=M(b=M(b=M(b=z(b=z(b=z(b=z(b=O(b=O(b=O(b=O(b,S=O(S,j=O(j,x=O(x,b,S,j,s,7,H[0]),b,S,a,12,H[1]),x,b,u,17,H[2]),j,x,c,22,H[3]),S=O(S,j=O(j,x=O(x,b,S,j,f,7,H[4]),b,S,h,12,H[5]),x,b,p,17,H[6]),j,x,d,22,H[7]),S=O(S,j=O(j,x=O(x,b,S,j,l,7,H[8]),b,S,y,12,H[9]),x,b,v,17,H[10]),j,x,g,22,H[11]),S=O(S,j=O(j,x=O(x,b,S,j,_,7,H[12]),b,S,w,12,H[13]),x,b,B,17,H[14]),j,x,m,22,H[15]),S=z(S,j=z(j,x=z(x,b,S,j,a,5,H[16]),b,S,p,9,H[17]),x,b,g,14,H[18]),j,x,s,20,H[19]),S=z(S,j=z(j,x=z(x,b,S,j,h,5,H[20]),b,S,v,9,H[21]),x,b,m,14,H[22]),j,x,f,20,H[23]),S=z(S,j=z(j,x=z(x,b,S,j,y,5,H[24]),b,S,B,9,H[25]),x,b,c,14,H[26]),j,x,l,20,H[27]),S=z(S,j=z(j,x=z(x,b,S,j,w,5,H[28]),b,S,u,9,H[29]),x,b,d,14,H[30]),j,x,_,20,H[31]),S=M(S,j=M(j,x=M(x,b,S,j,h,4,H[32]),b,S,l,11,H[33]),x,b,g,16,H[34]),j,x,B,23,H[35]),S=M(S,j=M(j,x=M(x,b,S,j,a,4,H[36]),b,S,f,11,H[37]),x,b,d,16,H[38]),j,x,v,23,H[39]),S=M(S,j=M(j,x=M(x,b,S,j,w,4,H[40]),b,S,s,11,H[41]),x,b,c,16,H[42]),j,x,p,23,H[43]),S=M(S,j=M(j,x=M(x,b,S,j,y,4,H[44]),b,S,_,11,H[45]),x,b,m,16,H[46]),j,x,u,23,H[47]),S=A(S,j=A(j,x=A(x,b,S,j,s,6,H[48]),b,S,d,10,H[49]),x,b,B,15,H[50]),j,x,h,21,H[51]),S=A(S,j=A(j,x=A(x,b,S,j,_,6,H[52]),b,S,c,10,H[53]),x,b,v,15,H[54]),j,x,a,21,H[55]),S=A(S,j=A(j,x=A(x,b,S,j,l,6,H[56]),b,S,m,10,H[57]),x,b,p,15,H[58]),j,x,w,21,H[59]),S=A(S,j=A(j,x=A(x,b,S,j,f,6,H[60]),b,S,g,10,H[61]),x,b,u,15,H[62]),j,x,y,21,H[63]),o[0]=o[0]+x|0,o[1]=o[1]+b|0,o[2]=o[2]+S|0,o[3]=o[3]+j|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,e=8*t.sigBytes;n[e>>>5]|=128<<24-e%32;var i=f.floor(r/4294967296),o=r;n[15+(e+64>>>9<<4)]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),n[14+(e+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.sigBytes=4*(n.length+1),this._process();for(var s=this._hash,a=s.words,u=0;u<4;u++){var c=a[u];a[u]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}return s},clone:function(){var t=e.clone.call(this);return t._hash=this._hash.clone(),t}});function O(t,n,r,e,i,o,s){var a=t+(n&r|~n&e)+i+s;return(a<<o|a>>>32-o)+n}function z(t,n,r,e,i,o,s){var a=t+(n&e|r&~e)+i+s;return(a<<o|a>>>32-o)+n}function M(t,n,r,e,i,o,s){var a=t+(n^r^e)+i+s;return(a<<o|a>>>32-o)+n}function A(t,n,r,e,i,o,s){var a=t+(r^(n|~e))+i+s;return(a<<o|a>>>32-o)+n}t.MD5=e._createHelper(o),t.HmacMD5=e._createHmacHelper(o)}(Math),s.MD5)}),e=new(function(){function t(){}return t.prototype.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},t.prototype.json2str=function(t){return JSON.stringify(t,function(t,n){return String(n)})},t.prototype.sortByKey=function(t){for(var n=this,r={},e=0,i=Object.keys(t).sort();e<i.length;e++){var o=i[e],s=t[o];Array.isArray(s)?r[o]=s.map(function(t){return n.isObject(t)?n.sortByKey(t):t}):r[o]=this.isObject(s)?this.sortByKey(s):s}return r},t.prototype.signature=function(t,n,r){void 0===n&&(n={}),void 0===r&&(r={});var e=t+this.json2str(this.sortByKey(n))+this.json2str(this.sortByKey(r));return i(e).toString()},t}());return function(t,n,r){return void 0===n&&(n={}),void 0===r&&(r={}),e.signature(t,n,r)}});
