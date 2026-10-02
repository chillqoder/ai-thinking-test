(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xc="170",Ss={ROTATE:0,DOLLY:1,PAN:2},ms={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wu=0,$c=1,Xu=2,Oh=1,Fh=2,Qn=3,Ei=0,nn=1,En=2,Si=0,bs=1,Jc=2,Qc=3,tl=4,Yu=5,Oi=100,qu=101,Zu=102,Ku=103,ju=104,$u=200,Ju=201,Qu=202,td=203,Ta=204,Aa=205,ed=206,nd=207,id=208,sd=209,rd=210,od=211,ad=212,cd=213,ld=214,Ra=0,Ca=1,Pa=2,Ps=3,La=4,Da=5,Ia=6,Ua=7,zh=0,hd=1,ud=2,bi=0,dd=1,fd=2,pd=3,Bh=4,md=5,gd=6,_d=7,kh=300,Ls=301,Ds=302,Na=303,Oa=304,Co=306,xo=1e3,zi=1001,Fa=1002,mn=1003,xd=1004,Rr=1005,Bn=1006,Fo=1007,Bi=1008,ri=1009,Hh=1010,Vh=1011,ur=1012,vc=1013,Hi=1014,kn=1015,br=1016,Mc=1017,yc=1018,Is=1020,Gh=35902,Wh=1021,Xh=1022,Un=1023,Yh=1024,qh=1025,Es=1026,Us=1027,Sc=1028,bc=1029,Zh=1030,Ec=1031,wc=1033,uo=33776,fo=33777,po=33778,mo=33779,za=35840,Ba=35841,ka=35842,Ha=35843,Va=36196,Ga=37492,Wa=37496,Xa=37808,Ya=37809,qa=37810,Za=37811,Ka=37812,ja=37813,$a=37814,Ja=37815,Qa=37816,tc=37817,ec=37818,nc=37819,ic=37820,sc=37821,go=36492,rc=36494,oc=36495,Kh=36283,ac=36284,cc=36285,lc=36286,vd=3200,Md=3201,jh=0,yd=1,ei="",ln="srgb",Fs="srgb-linear",Po="linear",pe="srgb",qi=7680,el=519,Sd=512,bd=513,Ed=514,$h=515,wd=516,Td=517,Ad=518,Rd=519,hc=35044,nl="300 es",ii=2e3,vo=2001;class Wi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let il=1234567;const rr=Math.PI/180,dr=180/Math.PI;function Hn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function Ve(i,t,e){return Math.max(t,Math.min(e,i))}function Tc(i,t){return(i%t+t)%t}function Cd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Pd(i,t,e){return i!==t?(e-i)/(t-i):0}function or(i,t,e){return(1-e)*i+e*t}function Ld(i,t,e,n){return or(i,t,1-Math.exp(-e*n))}function Dd(i,t=1){return t-Math.abs(Tc(i,t*2)-t)}function Id(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ud(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Nd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Od(i,t){return i+Math.random()*(t-i)}function Fd(i){return i*(.5-Math.random())}function zd(i){i!==void 0&&(il=i);let t=il+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Bd(i){return i*rr}function kd(i){return i*dr}function Hd(i){return(i&i-1)===0&&i!==0}function Vd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Gd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Wd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function In(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function de(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Mo={DEG2RAD:rr,RAD2DEG:dr,generateUUID:Hn,clamp:Ve,euclideanModulo:Tc,mapLinear:Cd,inverseLerp:Pd,lerp:or,damp:Ld,pingpong:Dd,smoothstep:Id,smootherstep:Ud,randInt:Nd,randFloat:Od,randFloatSpread:Fd,seededRandom:zd,degToRad:Bd,radToDeg:kd,isPowerOfTwo:Hd,ceilPowerOfTwo:Vd,floorPowerOfTwo:Gd,setQuaternionFromProperEuler:Wd,normalize:de,denormalize:In};class rt{constructor(t=0,e=0){rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,n,s,r,o,a,c,l){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],y=s[4],x=s[7],C=s[2],R=s[5],w=s[8];return r[0]=o*_+a*M+c*C,r[3]=o*m+a*y+c*R,r[6]=o*p+a*x+c*w,r[1]=l*_+h*M+u*C,r[4]=l*m+h*y+u*R,r[7]=l*p+h*x+u*w,r[2]=d*_+f*M+g*C,r[5]=d*m+f*y+g*R,r[8]=d*p+f*x+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(zo.makeScale(t,e)),this}rotate(t){return this.premultiply(zo.makeRotation(-t)),this}translate(t,e){return this.premultiply(zo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const zo=new Yt;function Jh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function yo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xd(){const i=yo("canvas");return i.style.display="block",i}const sl={};function ir(i){i in sl||(sl[i]=!0,console.warn(i))}function Yd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function qd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Zd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ne={enabled:!0,workingColorSpace:Fs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===pe&&(i.r=si(i.r),i.g=si(i.g),i.b=si(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===pe&&(i.r=ws(i.r),i.g=ws(i.g),i.b=ws(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ei?Po:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const rl=[.64,.33,.3,.6,.15,.06],ol=[.2126,.7152,.0722],al=[.3127,.329],cl=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ll=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ne.define({[Fs]:{primaries:rl,whitePoint:al,transfer:Po,toXYZ:cl,fromXYZ:ll,luminanceCoefficients:ol,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:rl,whitePoint:al,transfer:pe,toXYZ:cl,fromXYZ:ll,luminanceCoefficients:ol,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}});let Zi;class Kd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zi===void 0&&(Zi=yo("canvas")),Zi.width=t.width,Zi.height=t.height;const n=Zi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=yo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jd=0;class Qh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Hn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Bo(s[o].image)):r.push(Bo(s[o]))}else r=Bo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Bo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $d=0;class qe extends Wi{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,n=zi,s=zi,r=Bn,o=Bi,a=Un,c=ri,l=qe.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Hn(),this.name="",this.source=new Qh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xo:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case Fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xo:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case Fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=kh;qe.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,x=(f+1)/2,C=(p+1)/2,R=(h+d)/4,w=(u+_)/4,I=(g+m)/4;return y>x&&y>C?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=R/n,r=w/n):x>C?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=I/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=w/r,s=I/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jd extends Wi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new qe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Qh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vi extends Jd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class tu extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qd extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _n{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),R=Math.atan2(C,p*M);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const x=a*M;if(c=c*m+d*x,l=l*m+f*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ve(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ko.copy(this).projectOnVector(t),this.sub(ko)}reflect(t){return this.sub(ko.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ko=new L,hl=new _n;class Xi{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Cn):Cn.fromBufferAttribute(r,o),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ws),Pr.subVectors(this.max,Ws),Ki.subVectors(t.a,Ws),ji.subVectors(t.b,Ws),$i.subVectors(t.c,Ws),li.subVectors(ji,Ki),hi.subVectors($i,ji),Ri.subVectors(Ki,$i);let e=[0,-li.z,li.y,0,-hi.z,hi.y,0,-Ri.z,Ri.y,li.z,0,-li.x,hi.z,0,-hi.x,Ri.z,0,-Ri.x,-li.y,li.x,0,-hi.y,hi.x,0,-Ri.y,Ri.x,0];return!Ho(e,Ki,ji,$i,Pr)||(e=[1,0,0,0,1,0,0,0,1],!Ho(e,Ki,ji,$i,Pr))?!1:(Lr.crossVectors(li,hi),e=[Lr.x,Lr.y,Lr.z],Ho(e,Ki,ji,$i,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Yn=[new L,new L,new L,new L,new L,new L,new L,new L],Cn=new L,Cr=new Xi,Ki=new L,ji=new L,$i=new L,li=new L,hi=new L,Ri=new L,Ws=new L,Pr=new L,Lr=new L,Ci=new L;function Ho(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ci.fromArray(i,r);const a=s.x*Math.abs(Ci.x)+s.y*Math.abs(Ci.y)+s.z*Math.abs(Ci.z),c=t.dot(Ci),l=e.dot(Ci),h=n.dot(Ci);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const tf=new Xi,Xs=new L,Vo=new L;class zs{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):tf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xs.subVectors(t,this.center);const e=Xs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xs.copy(t.center).add(Vo)),this.expandByPoint(Xs.copy(t.center).sub(Vo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new L,Go=new L,Dr=new L,ui=new L,Wo=new L,Ir=new L,Xo=new L;class Ac{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Go.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),ui.copy(this.origin).sub(Go);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Dr),a=ui.dot(this.direction),c=-ui.dot(Dr),l=ui.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Go).addScaledVector(Dr,d),f}intersectSphere(t,e){qn.subVectors(t.center,this.origin);const n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,n,s,r){Wo.subVectors(e,t),Ir.subVectors(n,t),Xo.crossVectors(Wo,Ir);let o=this.direction.dot(Xo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ui.subVectors(this.origin,t);const c=a*this.direction.dot(Ir.crossVectors(ui,Ir));if(c<0)return null;const l=a*this.direction.dot(Wo.cross(ui));if(l<0||c+l>o)return null;const h=-a*ui.dot(Xo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ef,t,nf)}lookAt(t,e,n){const s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),di.crossVectors(n,dn),di.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),di.crossVectors(n,dn)),di.normalize(),Ur.crossVectors(dn,di),s[0]=di.x,s[4]=Ur.x,s[8]=dn.x,s[1]=di.y,s[5]=Ur.y,s[9]=dn.y,s[2]=di.z,s[6]=Ur.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],x=n[11],C=n[15],R=s[0],w=s[4],I=s[8],b=s[12],v=s[1],E=s[5],T=s[9],D=s[13],O=s[2],F=s[6],N=s[10],B=s[14],H=s[3],tt=s[7],at=s[11],ut=s[15];return r[0]=o*R+a*v+c*O+l*H,r[4]=o*w+a*E+c*F+l*tt,r[8]=o*I+a*T+c*N+l*at,r[12]=o*b+a*D+c*B+l*ut,r[1]=h*R+u*v+d*O+f*H,r[5]=h*w+u*E+d*F+f*tt,r[9]=h*I+u*T+d*N+f*at,r[13]=h*b+u*D+d*B+f*ut,r[2]=g*R+_*v+m*O+p*H,r[6]=g*w+_*E+m*F+p*tt,r[10]=g*I+_*T+m*N+p*at,r[14]=g*b+_*D+m*B+p*ut,r[3]=M*R+y*v+x*O+C*H,r[7]=M*w+y*E+x*F+C*tt,r[11]=M*I+y*T+x*N+C*at,r[15]=M*b+y*D+x*B+C*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,y=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,x=h*_*l-g*u*l+g*a*f-o*_*f-h*a*p+o*u*p,C=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,R=e*M+n*y+s*x+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return t[0]=M*w,t[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*w,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*w,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*w,t[4]=y*w,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*w,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*w,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*w,t[8]=x*w,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*p-e*u*p)*w,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*w,t[12]=C*w,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*m+e*u*m)*w,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,M=c*l,y=c*h,x=c*u,C=n.x,R=n.y,w=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+x)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(f-x)*R,s[5]=(1-(d+p))*R,s[6]=(m+M)*R,s[7]=0,s[8]=(g+y)*w,s[9]=(m-M)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Pn.copy(this);const l=1/r,h=1/o,u=1/a;return Pn.elements[0]*=l,Pn.elements[1]*=l,Pn.elements[2]*=l,Pn.elements[4]*=h,Pn.elements[5]*=h,Pn.elements[6]*=h,Pn.elements[8]*=u,Pn.elements[9]*=u,Pn.elements[10]*=u,e.setFromRotationMatrix(Pn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ii){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===ii)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===vo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ii){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h;let g,_;if(a===ii)g=(o+r)*u,_=-2*u;else if(a===vo)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new L,Pn=new Qt,ef=new L(0,0,0),nf=new L(1,1,1),di=new L,Ur=new L,dn=new L,ul=new Qt,dl=new _n;class sn{constructor(t=0,e=0,n=0,s=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ul.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ul,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dl.setFromEuler(this),this.setFromQuaternion(dl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class eu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let sf=0;const fl=new L,Qi=new _n,Zn=new Qt,Nr=new L,Ys=new L,rf=new L,of=new _n,pl=new L(1,0,0),ml=new L(0,1,0),gl=new L(0,0,1),_l={type:"added"},af={type:"removed"},ts={type:"childadded",child:null},Yo={type:"childremoved",child:null};class Oe extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Oe.DEFAULT_UP.clone();const t=new L,e=new sn,n=new _n,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Yt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=Oe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(pl,t)}rotateY(t){return this.rotateOnAxis(ml,t)}rotateZ(t){return this.rotateOnAxis(gl,t)}translateOnAxis(t,e){return fl.copy(t).applyQuaternion(this.quaternion),this.position.add(fl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pl,t)}translateY(t){return this.translateOnAxis(ml,t)}translateZ(t){return this.translateOnAxis(gl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Nr.copy(t):Nr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Ys,Nr,this.up):Zn.lookAt(Nr,Ys,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(Zn),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_l),ts.child=t,this.dispatchEvent(ts),ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(af),Yo.child=t,this.dispatchEvent(Yo),Yo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_l),ts.child=t,this.dispatchEvent(ts),ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,t,rf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,of,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Oe.DEFAULT_UP=new L(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new L,Kn=new L,qo=new L,jn=new L,es=new L,ns=new L,xl=new L,Zo=new L,Ko=new L,jo=new L,$o=new ge,Jo=new ge,Qo=new ge;class wn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Ln.subVectors(t,e),s.cross(Ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Ln.subVectors(s,e),Kn.subVectors(n,e),qo.subVectors(t,e);const o=Ln.dot(Ln),a=Ln.dot(Kn),c=Ln.dot(qo),l=Kn.dot(Kn),h=Kn.dot(qo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,jn.x),c.addScaledVector(o,jn.y),c.addScaledVector(a,jn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return $o.setScalar(0),Jo.setScalar(0),Qo.setScalar(0),$o.fromBufferAttribute(t,e),Jo.fromBufferAttribute(t,n),Qo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector($o,r.x),o.addScaledVector(Jo,r.y),o.addScaledVector(Qo,r.z),o}static isFrontFacing(t,e,n,s){return Ln.subVectors(n,e),Kn.subVectors(t,e),Ln.cross(Kn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ln.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Ln.cross(Kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return wn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;es.subVectors(s,n),ns.subVectors(r,n),Zo.subVectors(t,n);const c=es.dot(Zo),l=ns.dot(Zo);if(c<=0&&l<=0)return e.copy(n);Ko.subVectors(t,s);const h=es.dot(Ko),u=ns.dot(Ko);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(es,o);jo.subVectors(t,r);const f=es.dot(jo),g=ns.dot(jo);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ns,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return xl.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(xl,a);const p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(es,o).addScaledVector(ns,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},Or={h:0,s:0,l:0};function ta(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class mt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ne.workingColorSpace){if(t=Tc(t,1),e=Ve(e,0,1),n=Ve(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ta(o,r,t+1/3),this.g=ta(o,r,t),this.b=ta(o,r,t-1/3)}return ne.toWorkingColorSpace(this,s),this}setStyle(t,e=ln){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ln){const n=nu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ln){return ne.fromWorkingColorSpace(Xe.copy(this),t),Math.round(Ve(Xe.r*255,0,255))*65536+Math.round(Ve(Xe.g*255,0,255))*256+Math.round(Ve(Xe.b*255,0,255))}getHexString(t=ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Xe.copy(this),e);const n=Xe.r,s=Xe.g,r=Xe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=ln){ne.fromWorkingColorSpace(Xe.copy(this),t);const e=Xe.r,n=Xe.g,s=Xe.b;return t!==ln?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(fi),this.setHSL(fi.h+t,fi.s+e,fi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(fi),t.getHSL(Or);const n=or(fi.h,Or.h,e),s=or(fi.s,Or.s,e),r=or(fi.l,Or.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new mt;mt.NAMES=nu;let cf=0;class Ti extends Wi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=Hn(),this.name="",this.blending=bs,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ta,this.blendDst=Aa,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=el,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(n.blending=this.blending),this.side!==Ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ta&&(n.blendSrc=this.blendSrc),this.blendDst!==Aa&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==el&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Lo extends Ti{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ce=new L,Fr=new rt;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hc,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fr.fromBufferAttribute(this,e),Fr.applyMatrix3(t),this.setXY(e,Fr.x,Fr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix3(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=In(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=In(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=In(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=In(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=In(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hc&&(t.usage=this.usage),t}}class iu extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class su extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let lf=0;const Mn=new Qt,ea=new Oe,is=new L,fn=new Xi,qs=new Xi,Be=new L;class be extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jh(t)?su:iu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Mn.makeRotationFromQuaternion(t),this.applyMatrix4(Mn),this}rotateX(t){return Mn.makeRotationX(t),this.applyMatrix4(Mn),this}rotateY(t){return Mn.makeRotationY(t),this.applyMatrix4(Mn),this}rotateZ(t){return Mn.makeRotationZ(t),this.applyMatrix4(Mn),this}translate(t,e,n){return Mn.makeTranslation(t,e,n),this.applyMatrix4(Mn),this}scale(t,e,n){return Mn.makeScale(t,e,n),this.applyMatrix4(Mn),this}lookAt(t){return ea.lookAt(t),ea.updateMatrix(),this.applyMatrix4(ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(fn.min,qs.min),fn.expandByPoint(Be),Be.addVectors(fn.max,qs.max),fn.expandByPoint(Be)):(fn.expandByPoint(qs.min),fn.expandByPoint(qs.max))}fn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Be.fromBufferAttribute(a,l),c&&(is.fromBufferAttribute(t,l),Be.add(is)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new L,c[I]=new L;const l=new L,h=new L,u=new L,d=new rt,f=new rt,g=new rt,_=new L,m=new L;function p(I,b,v){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,v),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const E=1/(f.x*g.y-g.x*f.y);isFinite(E)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(E),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(E),a[I].add(_),a[b].add(_),a[v].add(_),c[I].add(m),c[b].add(m),c[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,b=M.length;I<b;++I){const v=M[I],E=v.start,T=v.count;for(let D=E,O=E+T;D<O;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const y=new L,x=new L,C=new L,R=new L;function w(I){C.fromBufferAttribute(s,I),R.copy(C);const b=a[I];y.copy(b),y.sub(C.multiplyScalar(C.dot(b))).normalize(),x.crossVectors(R,b);const E=x.dot(c[I])<0?-1:1;o.setXYZW(I,y.x,y.y,y.z,E)}for(let I=0,b=M.length;I<b;++I){const v=M[I],E=v.start,T=v.count;for(let D=E,O=E+T;D<O;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new hn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vl=new Qt,Pi=new Ac,zr=new zs,Ml=new L,Br=new L,kr=new L,Hr=new L,na=new L,Vr=new L,yl=new L,Gr=new L;class _e extends Oe{constructor(t=new be,e=new Lo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Vr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(na.fromBufferAttribute(u,t),o?Vr.addScaledVector(na,h):Vr.addScaledVector(na.sub(e),h))}e.add(Vr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(zr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(zr,Ml)===null||Pi.origin.distanceToSquared(Ml)>(t.far-t.near)**2))&&(vl.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(vl),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,C=y;x<C;x+=3){const R=a.getX(x),w=a.getX(x+1),I=a.getX(x+2);s=Wr(this,p,t,n,l,h,u,R,w,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);s=Wr(this,o,t,n,l,h,u,M,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,C=y;x<C;x+=3){const R=x,w=x+1,I=x+2;s=Wr(this,p,t,n,l,h,u,R,w,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,x=m+2;s=Wr(this,o,t,n,l,h,u,M,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function hf(i,t,e,n,s,r,o,a){let c;if(t.side===nn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Ei,a),c===null)return null;Gr.copy(a),Gr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Gr);return l<e.near||l>e.far?null:{distance:l,point:Gr.clone(),object:i}}function Wr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Br),i.getVertexPosition(c,kr),i.getVertexPosition(l,Hr);const h=hf(i,t,e,n,Br,kr,Hr,yl);if(h){const u=new L;wn.getBarycoord(yl,Br,kr,Hr,u),s&&(h.uv=wn.getInterpolatedAttribute(s,a,c,l,u,new rt)),r&&(h.uv1=wn.getInterpolatedAttribute(r,a,c,l,u,new rt)),o&&(h.normal=wn.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new L,materialIndex:0};wn.getNormal(Br,kr,Hr,d.normal),h.face=d,h.barycoord=u}return h}class Bs extends be{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function g(_,m,p,M,y,x,C,R,w,I,b){const v=x/w,E=C/I,T=x/2,D=C/2,O=R/2,F=w+1,N=I+1;let B=0,H=0;const tt=new L;for(let at=0;at<N;at++){const ut=at*E-D;for(let Pt=0;Pt<F;Pt++){const Vt=Pt*v-T;tt[_]=Vt*M,tt[m]=ut*y,tt[p]=O,l.push(tt.x,tt.y,tt.z),tt[_]=0,tt[m]=0,tt[p]=R>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(Pt/w),u.push(1-at/I),B+=1}}for(let at=0;at<I;at++)for(let ut=0;ut<w;ut++){const Pt=d+ut+F*at,Vt=d+ut+F*(at+1),q=d+(ut+1)+F*(at+1),it=d+(ut+1)+F*at;c.push(Pt,Vt,it),c.push(Vt,q,it),H+=6}a.addGroup(f,H,b),f+=H,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ns(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function $e(i){const t={};for(let e=0;e<i.length;e++){const n=Ns(i[e]);for(const s in n)t[s]=n[s]}return t}function uf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ru(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const df={clone:Ns,merge:$e};var ff=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Ti{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ff,this.fragmentShader=pf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ns(t.uniforms),this.uniformsGroups=uf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ou extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=ii}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new L,Sl=new rt,bl=new rt;class pn extends ou{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=dr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(rr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return dr*2*Math.atan(Math.tan(rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,Sl,bl),e.subVectors(bl,Sl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(rr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ss=-90,rs=1;class mf extends Oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(ss,rs,t,e);s.layers=this.layers,this.add(s);const r=new pn(ss,rs,t,e);r.layers=this.layers,this.add(r);const o=new pn(ss,rs,t,e);o.layers=this.layers,this.add(o);const a=new pn(ss,rs,t,e);a.layers=this.layers,this.add(a);const c=new pn(ss,rs,t,e);c.layers=this.layers,this.add(c);const l=new pn(ss,rs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===vo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class au extends qe{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ls,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class gf extends Vi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new au(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bs(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:Si});r.uniforms.tEquirect.value=e;const o=new _e(s,r),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Bn),new mf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const ia=new L,_f=new L,xf=new Yt;class xi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ia.subVectors(n,e).cross(_f.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ia),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||xf.getNormalMatrix(t),s=this.coplanarPoint(ia).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new zs,Xr=new L;class Rc{constructor(t=new xi,e=new xi,n=new xi,s=new xi,r=new xi,o=new xi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ii){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],M=s[13],y=s[14],x=s[15];if(n[0].setComponents(c-r,d-l,m-f,x-p).normalize(),n[1].setComponents(c+r,d+l,m+f,x+p).normalize(),n[2].setComponents(c+o,d+h,m+g,x+M).normalize(),n[3].setComponents(c-o,d-h,m-g,x-M).normalize(),n[4].setComponents(c-a,d-u,m-_,x-y).normalize(),e===ii)n[5].setComponents(c+a,d+u,m+_,x+y).normalize();else if(e===vo)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Xr.x=s.normal.x>0?t.max.x:t.min.x,Xr.y=s.normal.y>0?t.max.y:t.min.y,Xr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function vf(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class ks extends be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let y=0;y<l;y++){const x=y*u-r;g.push(x,-M,0),_.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const y=M+l*p,x=M+l*(p+1),C=M+1+l*(p+1),R=M+1+l*p;f.push(y,x,R),f.push(x,C,R)}this.setIndex(f),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(_,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ks(t.width,t.height,t.widthSegments,t.heightSegments)}}var Mf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Af=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Cf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Df=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,If=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Uf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Gf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ap=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,up=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_p=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ep=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ip=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Kp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,t0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,e0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,n0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,i0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,s0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,r0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,a0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,c0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,l0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,h0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,u0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,d0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,f0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,p0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,m0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,x0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const v0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,T0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,A0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,R0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,C0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,P0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,z0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,k0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,H0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,W0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Z0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,K0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,J0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:Mf,alphahash_pars_fragment:yf,alphamap_fragment:Sf,alphamap_pars_fragment:bf,alphatest_fragment:Ef,alphatest_pars_fragment:wf,aomap_fragment:Tf,aomap_pars_fragment:Af,batching_pars_vertex:Rf,batching_vertex:Cf,begin_vertex:Pf,beginnormal_vertex:Lf,bsdfs:Df,iridescence_fragment:If,bumpmap_pars_fragment:Uf,clipping_planes_fragment:Nf,clipping_planes_pars_fragment:Of,clipping_planes_pars_vertex:Ff,clipping_planes_vertex:zf,color_fragment:Bf,color_pars_fragment:kf,color_pars_vertex:Hf,color_vertex:Vf,common:Gf,cube_uv_reflection_fragment:Wf,defaultnormal_vertex:Xf,displacementmap_pars_vertex:Yf,displacementmap_vertex:qf,emissivemap_fragment:Zf,emissivemap_pars_fragment:Kf,colorspace_fragment:jf,colorspace_pars_fragment:$f,envmap_fragment:Jf,envmap_common_pars_fragment:Qf,envmap_pars_fragment:tp,envmap_pars_vertex:ep,envmap_physical_pars_fragment:dp,envmap_vertex:np,fog_vertex:ip,fog_pars_vertex:sp,fog_fragment:rp,fog_pars_fragment:op,gradientmap_pars_fragment:ap,lightmap_pars_fragment:cp,lights_lambert_fragment:lp,lights_lambert_pars_fragment:hp,lights_pars_begin:up,lights_toon_fragment:fp,lights_toon_pars_fragment:pp,lights_phong_fragment:mp,lights_phong_pars_fragment:gp,lights_physical_fragment:_p,lights_physical_pars_fragment:xp,lights_fragment_begin:vp,lights_fragment_maps:Mp,lights_fragment_end:yp,logdepthbuf_fragment:Sp,logdepthbuf_pars_fragment:bp,logdepthbuf_pars_vertex:Ep,logdepthbuf_vertex:wp,map_fragment:Tp,map_pars_fragment:Ap,map_particle_fragment:Rp,map_particle_pars_fragment:Cp,metalnessmap_fragment:Pp,metalnessmap_pars_fragment:Lp,morphinstance_vertex:Dp,morphcolor_vertex:Ip,morphnormal_vertex:Up,morphtarget_pars_vertex:Np,morphtarget_vertex:Op,normal_fragment_begin:Fp,normal_fragment_maps:zp,normal_pars_fragment:Bp,normal_pars_vertex:kp,normal_vertex:Hp,normalmap_pars_fragment:Vp,clearcoat_normal_fragment_begin:Gp,clearcoat_normal_fragment_maps:Wp,clearcoat_pars_fragment:Xp,iridescence_pars_fragment:Yp,opaque_fragment:qp,packing:Zp,premultiplied_alpha_fragment:Kp,project_vertex:jp,dithering_fragment:$p,dithering_pars_fragment:Jp,roughnessmap_fragment:Qp,roughnessmap_pars_fragment:t0,shadowmap_pars_fragment:e0,shadowmap_pars_vertex:n0,shadowmap_vertex:i0,shadowmask_pars_fragment:s0,skinbase_vertex:r0,skinning_pars_vertex:o0,skinning_vertex:a0,skinnormal_vertex:c0,specularmap_fragment:l0,specularmap_pars_fragment:h0,tonemapping_fragment:u0,tonemapping_pars_fragment:d0,transmission_fragment:f0,transmission_pars_fragment:p0,uv_pars_fragment:m0,uv_pars_vertex:g0,uv_vertex:_0,worldpos_vertex:x0,background_vert:v0,background_frag:M0,backgroundCube_vert:y0,backgroundCube_frag:S0,cube_vert:b0,cube_frag:E0,depth_vert:w0,depth_frag:T0,distanceRGBA_vert:A0,distanceRGBA_frag:R0,equirect_vert:C0,equirect_frag:P0,linedashed_vert:L0,linedashed_frag:D0,meshbasic_vert:I0,meshbasic_frag:U0,meshlambert_vert:N0,meshlambert_frag:O0,meshmatcap_vert:F0,meshmatcap_frag:z0,meshnormal_vert:B0,meshnormal_frag:k0,meshphong_vert:H0,meshphong_frag:V0,meshphysical_vert:G0,meshphysical_frag:W0,meshtoon_vert:X0,meshtoon_frag:Y0,points_vert:q0,points_frag:Z0,shadow_vert:K0,shadow_frag:j0,sprite_vert:$0,sprite_frag:J0},pt={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Fn={basic:{uniforms:$e([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:$e([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new mt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:$e([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:$e([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:$e([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new mt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:$e([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:$e([pt.points,pt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:$e([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:$e([pt.common,pt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:$e([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:$e([pt.sprite,pt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:$e([pt.common,pt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:$e([pt.lights,pt.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Fn.physical={uniforms:$e([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Yr={r:0,b:0,g:0},Di=new sn,Q0=new Qt;function tm(i,t,e,n,s,r,o){const a=new mt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?e:t).get(y)),y}function _(M){let y=!1;const x=g(M);x===null?p(a,c):x&&x.isColor&&(p(x,1),y=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,y){const x=g(y);x&&(x.isCubeTexture||x.mapping===Co)?(h===void 0&&(h=new _e(new Bs(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Ns(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Di.copy(y.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Q0.makeRotationFromEuler(Di)),h.material.toneMapped=ne.getTransfer(x.colorSpace)!==pe,(u!==x||d!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new _e(new ks(2,2),new Vn({name:"BackgroundMaterial",uniforms:Ns(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ne.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,y){M.getRGB(Yr,ru(i)),n.buffers.color.setClear(Yr.r,Yr.g,Yr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:_,addToRenderList:m}}function em(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(v,E,T,D,O){let F=!1;const N=u(D,T,E);r!==N&&(r=N,l(r.object)),F=f(v,D,T,O),F&&g(v,D,T,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,x(v,E,T,D),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,E,T){const D=T.wireframe===!0;let O=n[v.id];O===void 0&&(O={},n[v.id]=O);let F=O[E.id];F===void 0&&(F={},O[E.id]=F);let N=F[D];return N===void 0&&(N=d(c()),F[D]=N),N}function d(v){const E=[],T=[],D=[];for(let O=0;O<e;O++)E[O]=0,T[O]=0,D[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:T,attributeDivisors:D,object:v,attributes:{},index:null}}function f(v,E,T,D){const O=r.attributes,F=E.attributes;let N=0;const B=T.getAttributes();for(const H in B)if(B[H].location>=0){const at=O[H];let ut=F[H];if(ut===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(ut=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(ut=v.instanceColor)),at===void 0||at.attribute!==ut||ut&&at.data!==ut.data)return!0;N++}return r.attributesNum!==N||r.index!==D}function g(v,E,T,D){const O={},F=E.attributes;let N=0;const B=T.getAttributes();for(const H in B)if(B[H].location>=0){let at=F[H];at===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(at=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(at=v.instanceColor));const ut={};ut.attribute=at,at&&at.data&&(ut.data=at.data),O[H]=ut,N++}r.attributes=O,r.attributesNum=N,r.index=D}function _(){const v=r.newAttributes;for(let E=0,T=v.length;E<T;E++)v[E]=0}function m(v){p(v,0)}function p(v,E){const T=r.newAttributes,D=r.enabledAttributes,O=r.attributeDivisors;T[v]=1,D[v]===0&&(i.enableVertexAttribArray(v),D[v]=1),O[v]!==E&&(i.vertexAttribDivisor(v,E),O[v]=E)}function M(){const v=r.newAttributes,E=r.enabledAttributes;for(let T=0,D=E.length;T<D;T++)E[T]!==v[T]&&(i.disableVertexAttribArray(T),E[T]=0)}function y(v,E,T,D,O,F,N){N===!0?i.vertexAttribIPointer(v,E,T,O,F):i.vertexAttribPointer(v,E,T,D,O,F)}function x(v,E,T,D){_();const O=D.attributes,F=T.getAttributes(),N=E.defaultAttributeValues;for(const B in F){const H=F[B];if(H.location>=0){let tt=O[B];if(tt===void 0&&(B==="instanceMatrix"&&v.instanceMatrix&&(tt=v.instanceMatrix),B==="instanceColor"&&v.instanceColor&&(tt=v.instanceColor)),tt!==void 0){const at=tt.normalized,ut=tt.itemSize,Pt=t.get(tt);if(Pt===void 0)continue;const Vt=Pt.buffer,q=Pt.type,it=Pt.bytesPerElement,ht=q===i.INT||q===i.UNSIGNED_INT||tt.gpuType===vc;if(tt.isInterleavedBufferAttribute){const J=tt.data,xt=J.stride,Rt=tt.offset;if(J.isInstancedInterleavedBuffer){for(let Ut=0;Ut<H.locationSize;Ut++)p(H.location+Ut,J.meshPerAttribute);v.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Ut=0;Ut<H.locationSize;Ut++)m(H.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let Ut=0;Ut<H.locationSize;Ut++)y(H.location+Ut,ut/H.locationSize,q,at,xt*it,(Rt+ut/H.locationSize*Ut)*it,ht)}else{if(tt.isInstancedBufferAttribute){for(let J=0;J<H.locationSize;J++)p(H.location+J,tt.meshPerAttribute);v.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let J=0;J<H.locationSize;J++)m(H.location+J);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let J=0;J<H.locationSize;J++)y(H.location+J,ut/H.locationSize,q,at,ut*it,ut/H.locationSize*J*it,ht)}}else if(N!==void 0){const at=N[B];if(at!==void 0)switch(at.length){case 2:i.vertexAttrib2fv(H.location,at);break;case 3:i.vertexAttrib3fv(H.location,at);break;case 4:i.vertexAttrib4fv(H.location,at);break;default:i.vertexAttrib1fv(H.location,at)}}}}M()}function C(){I();for(const v in n){const E=n[v];for(const T in E){const D=E[T];for(const O in D)h(D[O].object),delete D[O];delete E[T]}delete n[v]}}function R(v){if(n[v.id]===void 0)return;const E=n[v.id];for(const T in E){const D=E[T];for(const O in D)h(D[O].object),delete D[O];delete E[T]}delete n[v.id]}function w(v){for(const E in n){const T=n[E];if(T[v.id]===void 0)continue;const D=T[v.id];for(const O in D)h(D[O].object),delete D[O];delete T[v.id]}}function I(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function nm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function im(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Un&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const I=w===br&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ri&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==kn&&!I)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:C,maxSamples:R}}function sm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new xi,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,y=M*4;let x=p.clippingState||null;c.value=x,x=h(g,d,y,f);for(let C=0;C!==y;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=f;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function rm(i){let t=new WeakMap;function e(o,a){return a===Na?o.mapping=Ls:a===Oa&&(o.mapping=Ds),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Na||a===Oa)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new gf(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class lu extends ou{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const gs=4,El=[.125,.215,.35,.446,.526,.582],Fi=20,sa=new lu,wl=new mt;let ra=null,oa=0,aa=0,ca=!1;const Ni=(1+Math.sqrt(5))/2,os=1/Ni,Tl=[new L(-Ni,os,0),new L(Ni,os,0),new L(-os,0,Ni),new L(os,0,Ni),new L(0,Ni,-os),new L(0,Ni,os),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Al{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ra=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ra,oa,aa),this._renderer.xr.enabled=ca,t.scissorTest=!1,qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ls||t.mapping===Ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ra=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:br,format:Un,colorSpace:Fs,depthBuffer:!1},s=Rl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=om(r)),this._blurMaterial=am(r,t,e)}return s}_compileMaterial(t){const e=new _e(this._lodPlanes[0],t);this._renderer.compile(e,sa)}_sceneToCubeUV(t,e,n,s){const a=new pn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(wl),h.toneMapping=bi,h.autoClear=!1;const f=new Lo({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),g=new _e(new Bs,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(wl),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const y=this._cubeSize;qr(s,M*y,p>2?y:0,y,y),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ls||t.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new _e(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;qr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,sa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Tl[(s-r-1)%Tl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new _e(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Fi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Fi;m>Fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fi}`);const p=[];let M=0;for(let w=0;w<Fi;++w){const I=w/_,b=Math.exp(-I*I/2);p.push(b),w===0?M+=b:w<m&&(M+=2*b)}for(let w=0;w<p.length;w++)p[w]=p[w]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const x=this._sizeLods[s],C=3*x*(s>y-gs?s-y+gs:0),R=4*(this._cubeSize-x);qr(e,C,R,3*x,2*x),c.setRenderTarget(e),c.render(u,sa)}}function om(i){const t=[],e=[],n=[];let s=i;const r=i-gs+1+El.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-gs?c=El[o-i+gs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),y=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let R=0;R<f;R++){const w=R%3*2/3-1,I=R>2?0:-1,b=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];M.set(b,_*g*R),y.set(d,m*g*R);const v=[R,R,R,R,R,R];x.set(v,p*g*R)}const C=new be;C.setAttribute("position",new hn(M,_)),C.setAttribute("uv",new hn(y,m)),C.setAttribute("faceIndex",new hn(x,p)),t.push(C),s>gs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Rl(i,t,e){const n=new Vi(i,t,e);return n.texture.mapping=Co,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function am(i,t,e){const n=new Float32Array(Fi),s=new L(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Cl(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Pl(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Cc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Na||c===Oa,h=c===Ls||c===Ds;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Al(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Al(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function lm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ir("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function hm(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let y=0,x=M.length;y<x;y+=3){const C=M[y+0],R=M[y+1],w=M[y+2];d.push(C,R,R,w,w,C)}}else if(g!==void 0){const M=g.array;_=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const C=y+0,R=y+1,w=y+2;d.push(C,R,R,w,w,C)}}else return;const m=new(Jh(d)?su:iu)(d,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function um(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function dm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function fm(i,t,e){const n=new WeakMap,s=new ge;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var f=v;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,R=1;C>t.maxTextureSize&&(R=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const w=new Float32Array(C*R*4*u),I=new tu(w,C,R,u);I.type=kn,I.needsUpdate=!0;const b=x*4;for(let E=0;E<u;E++){const T=p[E],D=M[E],O=y[E],F=C*R*4*E;for(let N=0;N<T.count;N++){const B=N*b;g===!0&&(s.fromBufferAttribute(T,N),w[F+B+0]=s.x,w[F+B+1]=s.y,w[F+B+2]=s.z,w[F+B+3]=0),_===!0&&(s.fromBufferAttribute(D,N),w[F+B+4]=s.x,w[F+B+5]=s.y,w[F+B+6]=s.z,w[F+B+7]=0),m===!0&&(s.fromBufferAttribute(O,N),w[F+B+8]=s.x,w[F+B+9]=s.y,w[F+B+10]=s.z,w[F+B+11]=O.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new rt(C,R)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function pm(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class hu extends qe{constructor(t,e,n,s,r,o,a,c,l,h=Es){if(h!==Es&&h!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Es&&(n=Hi),n===void 0&&h===Us&&(n=Is),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:mn,this.minFilter=c!==void 0?c:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const uu=new qe,Ll=new hu(1,1),du=new tu,fu=new Qd,pu=new au,Dl=[],Il=[],Ul=new Float32Array(16),Nl=new Float32Array(9),Ol=new Float32Array(4);function Hs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Dl[s];if(r===void 0&&(r=new Float32Array(s),Dl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Do(i,t){let e=Il[t];e===void 0&&(e=new Int32Array(t),Il[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function mm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function gm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function _m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function vm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Fe(e,n))return;Ol.set(n),i.uniformMatrix2fv(this.addr,!1,Ol),ze(e,n)}}function Mm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Fe(e,n))return;Nl.set(n),i.uniformMatrix3fv(this.addr,!1,Nl),ze(e,n)}}function ym(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Fe(e,n))return;Ul.set(n),i.uniformMatrix4fv(this.addr,!1,Ul),ze(e,n)}}function Sm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function Em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function Tm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function Rm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function Pm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ll.compareFunction=$h,r=Ll):r=uu,e.setTexture2D(t||r,s)}function Lm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||fu,s)}function Dm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||pu,s)}function Im(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||du,s)}function Um(i){switch(i){case 5126:return mm;case 35664:return gm;case 35665:return _m;case 35666:return xm;case 35674:return vm;case 35675:return Mm;case 35676:return ym;case 5124:case 35670:return Sm;case 35667:case 35671:return bm;case 35668:case 35672:return Em;case 35669:case 35673:return wm;case 5125:return Tm;case 36294:return Am;case 36295:return Rm;case 36296:return Cm;case 35678:case 36198:case 36298:case 36306:case 35682:return Pm;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Dm;case 36289:case 36303:case 36311:case 36292:return Im}}function Nm(i,t){i.uniform1fv(this.addr,t)}function Om(i,t){const e=Hs(t,this.size,2);i.uniform2fv(this.addr,e)}function Fm(i,t){const e=Hs(t,this.size,3);i.uniform3fv(this.addr,e)}function zm(i,t){const e=Hs(t,this.size,4);i.uniform4fv(this.addr,e)}function Bm(i,t){const e=Hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function km(i,t){const e=Hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Hm(i,t){const e=Hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Vm(i,t){i.uniform1iv(this.addr,t)}function Gm(i,t){i.uniform2iv(this.addr,t)}function Wm(i,t){i.uniform3iv(this.addr,t)}function Xm(i,t){i.uniform4iv(this.addr,t)}function Ym(i,t){i.uniform1uiv(this.addr,t)}function qm(i,t){i.uniform2uiv(this.addr,t)}function Zm(i,t){i.uniform3uiv(this.addr,t)}function Km(i,t){i.uniform4uiv(this.addr,t)}function jm(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||uu,r[o])}function $m(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||fu,r[o])}function Jm(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||pu,r[o])}function Qm(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||du,r[o])}function tg(i){switch(i){case 5126:return Nm;case 35664:return Om;case 35665:return Fm;case 35666:return zm;case 35674:return Bm;case 35675:return km;case 35676:return Hm;case 5124:case 35670:return Vm;case 35667:case 35671:return Gm;case 35668:case 35672:return Wm;case 35669:case 35673:return Xm;case 5125:return Ym;case 36294:return qm;case 36295:return Zm;case 36296:return Km;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return Jm;case 36289:case 36303:case 36311:case 36292:return Qm}}class eg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Um(e.type)}}class ng{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=tg(e.type)}}class ig{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const la=/(\w+)(\])?(\[|\.)?/g;function Fl(i,t){i.seq.push(t),i.map[t.id]=t}function sg(i,t,e){const n=i.name,s=n.length;for(la.lastIndex=0;;){const r=la.exec(n),o=la.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Fl(e,l===void 0?new eg(a,i,t):new ng(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new ig(a),Fl(e,u)),e=u}}}class _o{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);sg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function zl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const rg=37297;let og=0;function ag(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Bl=new Yt;function cg(i){ne._getMatrix(Bl,ne.workingColorSpace,i);const t=`mat3( ${Bl.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(i)){case Po:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ag(i.getShaderSource(t),o)}else return s}function lg(i,t){const e=cg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function hg(i,t){let e;switch(t){case dd:e="Linear";break;case fd:e="Reinhard";break;case pd:e="Cineon";break;case Bh:e="ACESFilmic";break;case gd:e="AgX";break;case _d:e="Neutral";break;case md:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Zr=new L;function ug(){ne.getLuminanceCoefficients(Zr);const i=Zr.x.toFixed(4),t=Zr.y.toFixed(4),e=Zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sr).join(`
`)}function fg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function pg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function sr(i){return i!==""}function Hl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function uc(i){return i.replace(mg,_g)}const gg=new Map;function _g(i,t){let e=Zt[t];if(e===void 0){const n=gg.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return uc(e)}const xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gl(i){return i.replace(xg,vg)}function vg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Mg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Oh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qn&&(t="SHADOWMAP_TYPE_VSM"),t}function yg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ls:case Ds:t="ENVMAP_TYPE_CUBE";break;case Co:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Sg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ds:t="ENVMAP_MODE_REFRACTION";break}return t}function bg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zh:t="ENVMAP_BLENDING_MULTIPLY";break;case hd:t="ENVMAP_BLENDING_MIX";break;case ud:t="ENVMAP_BLENDING_ADD";break}return t}function Eg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function wg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Mg(e),l=yg(e),h=Sg(e),u=bg(e),d=Eg(e),f=dg(e),g=fg(r),_=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(sr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(sr).join(`
`),p.length>0&&(p+=`
`)):(m=[Wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sr).join(`
`),p=[Wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bi?"#define TONE_MAPPING":"",e.toneMapping!==bi?Zt.tonemapping_pars_fragment:"",e.toneMapping!==bi?hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,lg("linearToOutputTexel",e.outputColorSpace),ug(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(sr).join(`
`)),o=uc(o),o=Hl(o,e),o=Vl(o,e),a=uc(a),a=Hl(a,e),a=Vl(a,e),o=Gl(o),a=Gl(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+o,x=M+p+a,C=zl(s,s.VERTEX_SHADER,y),R=zl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,C),s.attachShader(_,R),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(E){if(i.debug.checkShaderErrors){const T=s.getProgramInfoLog(_).trim(),D=s.getShaderInfoLog(C).trim(),O=s.getShaderInfoLog(R).trim();let F=!0,N=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,R);else{const B=kl(s,C,"vertex"),H=kl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+T+`
`+B+`
`+H)}else T!==""?console.warn("THREE.WebGLProgram: Program Info Log:",T):(D===""||O==="")&&(N=!1);N&&(E.diagnostics={runnable:F,programLog:T,vertexShader:{log:D,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(C),s.deleteShader(R),I=new _o(s,_),b=pg(s,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,rg)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=og++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=R,this}let Tg=0;class Ag{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Rg(t),e.set(t,n)),n}}class Rg{constructor(t){this.id=Tg++,this.code=t,this.usedTimes=0}}function Cg(i,t,e,n,s,r,o){const a=new eu,c=new Ag,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,v,E,T,D){const O=T.fog,F=D.geometry,N=b.isMeshStandardMaterial?T.environment:null,B=(b.isMeshStandardMaterial?e:t).get(b.envMap||N),H=B&&B.mapping===Co?B.image.height:null,tt=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const at=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ut=at!==void 0?at.length:0;let Pt=0;F.morphAttributes.position!==void 0&&(Pt=1),F.morphAttributes.normal!==void 0&&(Pt=2),F.morphAttributes.color!==void 0&&(Pt=3);let Vt,q,it,ht;if(tt){const ue=Fn[tt];Vt=ue.vertexShader,q=ue.fragmentShader}else Vt=b.vertexShader,q=b.fragmentShader,c.update(b),it=c.getVertexShaderID(b),ht=c.getFragmentShaderID(b);const J=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Rt=D.isInstancedMesh===!0,Ut=D.isBatchedMesh===!0,Kt=!!b.map,Q=!!b.matcap,ot=!!B,U=!!b.aoMap,At=!!b.lightMap,st=!!b.bumpMap,Et=!!b.normalMap,ft=!!b.displacementMap,Ft=!!b.emissiveMap,St=!!b.metalnessMap,P=!!b.roughnessMap,S=b.anisotropy>0,W=b.clearcoat>0,j=b.dispersion>0,nt=b.iridescence>0,$=b.sheen>0,Ct=b.transmission>0,gt=S&&!!b.anisotropyMap,bt=W&&!!b.clearcoatMap,Jt=W&&!!b.clearcoatNormalMap,ct=W&&!!b.clearcoatRoughnessMap,wt=nt&&!!b.iridescenceMap,zt=nt&&!!b.iridescenceThicknessMap,Bt=$&&!!b.sheenColorMap,Tt=$&&!!b.sheenRoughnessMap,ee=!!b.specularMap,qt=!!b.specularColorMap,xe=!!b.specularIntensityMap,k=Ct&&!!b.transmissionMap,_t=Ct&&!!b.thicknessMap,Z=!!b.gradientMap,et=!!b.alphaMap,yt=b.alphaTest>0,vt=!!b.alphaHash,Gt=!!b.extensions;let Ae=bi;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ae=i.toneMapping);const Ge={shaderID:tt,shaderType:b.type,shaderName:b.name,vertexShader:Vt,fragmentShader:q,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:ht,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&D._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&D.instanceColor!==null,instancingMorph:Rt&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Fs,alphaToCoverage:!!b.alphaToCoverage,map:Kt,matcap:Q,envMap:ot,envMapMode:ot&&B.mapping,envMapCubeUVHeight:H,aoMap:U,lightMap:At,bumpMap:st,normalMap:Et,displacementMap:d&&ft,emissiveMap:Ft,normalMapObjectSpace:Et&&b.normalMapType===yd,normalMapTangentSpace:Et&&b.normalMapType===jh,metalnessMap:St,roughnessMap:P,anisotropy:S,anisotropyMap:gt,clearcoat:W,clearcoatMap:bt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:ct,dispersion:j,iridescence:nt,iridescenceMap:wt,iridescenceThicknessMap:zt,sheen:$,sheenColorMap:Bt,sheenRoughnessMap:Tt,specularMap:ee,specularColorMap:qt,specularIntensityMap:xe,transmission:Ct,transmissionMap:k,thicknessMap:_t,gradientMap:Z,opaque:b.transparent===!1&&b.blending===bs&&b.alphaToCoverage===!1,alphaMap:et,alphaTest:yt,alphaHash:vt,combine:b.combine,mapUv:Kt&&_(b.map.channel),aoMapUv:U&&_(b.aoMap.channel),lightMapUv:At&&_(b.lightMap.channel),bumpMapUv:st&&_(b.bumpMap.channel),normalMapUv:Et&&_(b.normalMap.channel),displacementMapUv:ft&&_(b.displacementMap.channel),emissiveMapUv:Ft&&_(b.emissiveMap.channel),metalnessMapUv:St&&_(b.metalnessMap.channel),roughnessMapUv:P&&_(b.roughnessMap.channel),anisotropyMapUv:gt&&_(b.anisotropyMap.channel),clearcoatMapUv:bt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&_(b.sheenRoughnessMap.channel),specularMapUv:ee&&_(b.specularMap.channel),specularColorMapUv:qt&&_(b.specularColorMap.channel),specularIntensityMapUv:xe&&_(b.specularIntensityMap.channel),transmissionMapUv:k&&_(b.transmissionMap.channel),thicknessMapUv:_t&&_(b.thicknessMap.channel),alphaMapUv:et&&_(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Et||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!F.attributes.uv&&(Kt||et),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:xt,skinning:D.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Pt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&E.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ae,decodeVideoTexture:Kt&&b.map.isVideoTexture===!0&&ne.getTransfer(b.map.colorSpace)===pe,decodeVideoTextureEmissive:Ft&&b.emissiveMap.isVideoTexture===!0&&ne.getTransfer(b.emissiveMap.colorSpace)===pe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===En,flipSided:b.side===nn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Gt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&b.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ge.vertexUv1s=l.has(1),Ge.vertexUv2s=l.has(2),Ge.vertexUv3s=l.has(3),l.clear(),Ge}function p(b){const v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(const E in b.defines)v.push(E),v.push(b.defines[E]);return b.isRawShaderMaterial===!1&&(M(v,b),y(v,b),v.push(i.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function M(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function y(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const v=g[b.type];let E;if(v){const T=Fn[v];E=df.clone(T.uniforms)}else E=b.uniforms;return E}function C(b,v){let E;for(let T=0,D=h.length;T<D;T++){const O=h[T];if(O.cacheKey===v){E=O,++E.usedTimes;break}}return E===void 0&&(E=new wg(i,v,b,r),h.push(E)),E}function R(b){if(--b.usedTimes===0){const v=h.indexOf(b);h[v]=h[h.length-1],h.pop(),b.destroy()}}function w(b){c.remove(b)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:R,releaseShaderCache:w,programs:h,dispose:I}}function Pg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Lg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Xl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Yl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Lg),n.length>1&&n.sort(d||Xl),s.length>1&&s.sort(d||Xl)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Dg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Yl,i.set(n,[o])):s>=r.length?(o=new Yl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Ig(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new mt};break;case"SpotLight":e={position:new L,direction:new L,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":e={color:new mt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Ug(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Ng=0;function Og(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Fg(i){const t=new Ig,e=Ug(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new Qt,o=new Qt;function a(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,y=0,x=0,C=0,R=0,w=0;l.sort(Og);for(let b=0,v=l.length;b<v;b++){const E=l[b],T=E.color,D=E.intensity,O=E.distance,F=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=T.r*D,u+=T.g*D,d+=T.b*D;else if(E.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(E.sh.coefficients[N],D);w++}else if(E.isDirectionalLight){const N=t.get(E);if(N.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const B=E.shadow,H=e.get(E);H.shadowIntensity=B.intensity,H.shadowBias=B.bias,H.shadowNormalBias=B.normalBias,H.shadowRadius=B.radius,H.shadowMapSize=B.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=F,n.directionalShadowMatrix[f]=E.shadow.matrix,M++}n.directional[f]=N,f++}else if(E.isSpotLight){const N=t.get(E);N.position.setFromMatrixPosition(E.matrixWorld),N.color.copy(T).multiplyScalar(D),N.distance=O,N.coneCos=Math.cos(E.angle),N.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),N.decay=E.decay,n.spot[_]=N;const B=E.shadow;if(E.map&&(n.spotLightMap[C]=E.map,C++,B.updateMatrices(E),E.castShadow&&R++),n.spotLightMatrix[_]=B.matrix,E.castShadow){const H=e.get(E);H.shadowIntensity=B.intensity,H.shadowBias=B.bias,H.shadowNormalBias=B.normalBias,H.shadowRadius=B.radius,H.shadowMapSize=B.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=F,x++}_++}else if(E.isRectAreaLight){const N=t.get(E);N.color.copy(T).multiplyScalar(D),N.halfWidth.set(E.width*.5,0,0),N.halfHeight.set(0,E.height*.5,0),n.rectArea[m]=N,m++}else if(E.isPointLight){const N=t.get(E);if(N.color.copy(E.color).multiplyScalar(E.intensity),N.distance=E.distance,N.decay=E.decay,E.castShadow){const B=E.shadow,H=e.get(E);H.shadowIntensity=B.intensity,H.shadowBias=B.bias,H.shadowNormalBias=B.normalBias,H.shadowRadius=B.radius,H.shadowMapSize=B.mapSize,H.shadowCameraNear=B.camera.near,H.shadowCameraFar=B.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=E.shadow.matrix,y++}n.point[g]=N,g++}else if(E.isHemisphereLight){const N=t.get(E);N.skyColor.copy(E.color).multiplyScalar(D),N.groundColor.copy(E.groundColor).multiplyScalar(D),n.hemi[p]=N,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==M||I.numPointShadows!==y||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+C-R,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=M,I.numPointShadows=y,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=w,n.version=Ng++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const y=l[p];if(y.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(y.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function ql(i){const t=new Fg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function zg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ql(i),t.set(s,[a])):r>=o.length?(a=new ql(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Bg extends Ti{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=vd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class kg extends Ti{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Gg(i,t,e){let n=new Rc;const s=new rt,r=new rt,o=new ge,a=new Bg({depthPacking:Md}),c=new kg,l={},h=e.maxTextureSize,u={[Ei]:nn,[nn]:Ei,[En]:En},d=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Hg,fragmentShader:Vg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new be;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _e(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oh;let p=this.type;this.render=function(R,w,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const b=i.getRenderTarget(),v=i.getActiveCubeFace(),E=i.getActiveMipmapLevel(),T=i.state;T.setBlending(Si),T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);const D=p!==Qn&&this.type===Qn,O=p===Qn&&this.type!==Qn;for(let F=0,N=R.length;F<N;F++){const B=R[F],H=B.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const tt=H.getFrameExtents();if(s.multiply(tt),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,H.mapSize.y=r.y)),H.map===null||D===!0||O===!0){const ut=this.type!==Qn?{minFilter:mn,magFilter:mn}:{};H.map!==null&&H.map.dispose(),H.map=new Vi(s.x,s.y,ut),H.map.texture.name=B.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const at=H.getViewportCount();for(let ut=0;ut<at;ut++){const Pt=H.getViewport(ut);o.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),T.viewport(o),H.updateMatrices(B,ut),n=H.getFrustum(),x(w,I,H.camera,B,this.type)}H.isPointLightShadow!==!0&&this.type===Qn&&M(H,I),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,v,E)};function M(R,w){const I=t.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Vi(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,I,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,I,f,_,null)}function y(R,w,I,b){let v=null;const E=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(E!==void 0)v=E;else if(v=I.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const T=v.uuid,D=w.uuid;let O=l[T];O===void 0&&(O={},l[T]=O);let F=O[D];F===void 0&&(F=v.clone(),O[D]=F,w.addEventListener("dispose",C)),v=F}if(v.visible=w.visible,v.wireframe=w.wireframe,b===Qn?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:u[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const T=i.properties.get(v);T.light=I}return v}function x(R,w,I,b,v){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===Qn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const D=t.update(R),O=R.material;if(Array.isArray(O)){const F=D.groups;for(let N=0,B=F.length;N<B;N++){const H=F[N],tt=O[H.materialIndex];if(tt&&tt.visible){const at=y(R,tt,b,v);R.onBeforeShadow(i,R,w,I,D,at,H),i.renderBufferDirect(I,null,D,at,R,H),R.onAfterShadow(i,R,w,I,D,at,H)}}}else if(O.visible){const F=y(R,O,b,v);R.onBeforeShadow(i,R,w,I,D,F,null),i.renderBufferDirect(I,null,D,F,R,null),R.onAfterShadow(i,R,w,I,D,F,null)}}const T=R.children;for(let D=0,O=T.length;D<O;D++)x(T[D],w,I,b,v)}function C(R){R.target.removeEventListener("dispose",C);for(const I in l){const b=l[I],v=R.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}const Wg={[Ra]:Ca,[Pa]:Ia,[La]:Ua,[Ps]:Da,[Ca]:Ra,[Ia]:Pa,[Ua]:La,[Da]:Ps};function Xg(i,t){function e(){let k=!1;const _t=new ge;let Z=null;const et=new ge(0,0,0,0);return{setMask:function(yt){Z!==yt&&!k&&(i.colorMask(yt,yt,yt,yt),Z=yt)},setLocked:function(yt){k=yt},setClear:function(yt,vt,Gt,Ae,Ge){Ge===!0&&(yt*=Ae,vt*=Ae,Gt*=Ae),_t.set(yt,vt,Gt,Ae),et.equals(_t)===!1&&(i.clearColor(yt,vt,Gt,Ae),et.copy(_t))},reset:function(){k=!1,Z=null,et.set(-1,0,0,0)}}}function n(){let k=!1,_t=!1,Z=null,et=null,yt=null;return{setReversed:function(vt){if(_t!==vt){const Gt=t.get("EXT_clip_control");_t?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const Ae=yt;yt=null,this.setClear(Ae)}_t=vt},getReversed:function(){return _t},setTest:function(vt){vt?J(i.DEPTH_TEST):xt(i.DEPTH_TEST)},setMask:function(vt){Z!==vt&&!k&&(i.depthMask(vt),Z=vt)},setFunc:function(vt){if(_t&&(vt=Wg[vt]),et!==vt){switch(vt){case Ra:i.depthFunc(i.NEVER);break;case Ca:i.depthFunc(i.ALWAYS);break;case Pa:i.depthFunc(i.LESS);break;case Ps:i.depthFunc(i.LEQUAL);break;case La:i.depthFunc(i.EQUAL);break;case Da:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case Ua:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}et=vt}},setLocked:function(vt){k=vt},setClear:function(vt){yt!==vt&&(_t&&(vt=1-vt),i.clearDepth(vt),yt=vt)},reset:function(){k=!1,Z=null,et=null,yt=null,_t=!1}}}function s(){let k=!1,_t=null,Z=null,et=null,yt=null,vt=null,Gt=null,Ae=null,Ge=null;return{setTest:function(ue){k||(ue?J(i.STENCIL_TEST):xt(i.STENCIL_TEST))},setMask:function(ue){_t!==ue&&!k&&(i.stencilMask(ue),_t=ue)},setFunc:function(ue,An,Wn){(Z!==ue||et!==An||yt!==Wn)&&(i.stencilFunc(ue,An,Wn),Z=ue,et=An,yt=Wn)},setOp:function(ue,An,Wn){(vt!==ue||Gt!==An||Ae!==Wn)&&(i.stencilOp(ue,An,Wn),vt=ue,Gt=An,Ae=Wn)},setLocked:function(ue){k=ue},setClear:function(ue){Ge!==ue&&(i.clearStencil(ue),Ge=ue)},reset:function(){k=!1,_t=null,Z=null,et=null,yt=null,vt=null,Gt=null,Ae=null,Ge=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,y=null,x=null,C=null,R=null,w=new mt(0,0,0),I=0,b=!1,v=null,E=null,T=null,D=null,O=null;const F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,B=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(H)[1]),N=B>=1):H.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),N=B>=2);let tt=null,at={};const ut=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),Vt=new ge().fromArray(ut),q=new ge().fromArray(Pt);function it(k,_t,Z,et){const yt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(k,vt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<Z;Gt++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,et,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(_t+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return vt}const ht={};ht[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),ht[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ht[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(i.DEPTH_TEST),o.setFunc(Ps),st(!1),Et($c),J(i.CULL_FACE),U(Si);function J(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function xt(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Rt(k,_t){return u[k]!==_t?(i.bindFramebuffer(k,_t),u[k]=_t,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_t),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function Ut(k,_t){let Z=f,et=!1;if(k){Z=d.get(_t),Z===void 0&&(Z=[],d.set(_t,Z));const yt=k.textures;if(Z.length!==yt.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Gt=yt.length;vt<Gt;vt++)Z[vt]=i.COLOR_ATTACHMENT0+vt;Z.length=yt.length,et=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,et=!0);et&&i.drawBuffers(Z)}function Kt(k){return g!==k?(i.useProgram(k),g=k,!0):!1}const Q={[Oi]:i.FUNC_ADD,[qu]:i.FUNC_SUBTRACT,[Zu]:i.FUNC_REVERSE_SUBTRACT};Q[Ku]=i.MIN,Q[ju]=i.MAX;const ot={[$u]:i.ZERO,[Ju]:i.ONE,[Qu]:i.SRC_COLOR,[Ta]:i.SRC_ALPHA,[rd]:i.SRC_ALPHA_SATURATE,[id]:i.DST_COLOR,[ed]:i.DST_ALPHA,[td]:i.ONE_MINUS_SRC_COLOR,[Aa]:i.ONE_MINUS_SRC_ALPHA,[sd]:i.ONE_MINUS_DST_COLOR,[nd]:i.ONE_MINUS_DST_ALPHA,[od]:i.CONSTANT_COLOR,[ad]:i.ONE_MINUS_CONSTANT_COLOR,[cd]:i.CONSTANT_ALPHA,[ld]:i.ONE_MINUS_CONSTANT_ALPHA};function U(k,_t,Z,et,yt,vt,Gt,Ae,Ge,ue){if(k===Si){_===!0&&(xt(i.BLEND),_=!1);return}if(_===!1&&(J(i.BLEND),_=!0),k!==Yu){if(k!==m||ue!==b){if((p!==Oi||x!==Oi)&&(i.blendEquation(i.FUNC_ADD),p=Oi,x=Oi),ue)switch(k){case bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jc:i.blendFunc(i.ONE,i.ONE);break;case Qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}M=null,y=null,C=null,R=null,w.set(0,0,0),I=0,m=k,b=ue}return}yt=yt||_t,vt=vt||Z,Gt=Gt||et,(_t!==p||yt!==x)&&(i.blendEquationSeparate(Q[_t],Q[yt]),p=_t,x=yt),(Z!==M||et!==y||vt!==C||Gt!==R)&&(i.blendFuncSeparate(ot[Z],ot[et],ot[vt],ot[Gt]),M=Z,y=et,C=vt,R=Gt),(Ae.equals(w)===!1||Ge!==I)&&(i.blendColor(Ae.r,Ae.g,Ae.b,Ge),w.copy(Ae),I=Ge),m=k,b=!1}function At(k,_t){k.side===En?xt(i.CULL_FACE):J(i.CULL_FACE);let Z=k.side===nn;_t&&(Z=!Z),st(Z),k.blending===bs&&k.transparent===!1?U(Si):U(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const et=k.stencilWrite;a.setTest(et),et&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ft(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(k){v!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),v=k)}function Et(k){k!==Wu?(J(i.CULL_FACE),k!==E&&(k===$c?i.cullFace(i.BACK):k===Xu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xt(i.CULL_FACE),E=k}function ft(k){k!==T&&(N&&i.lineWidth(k),T=k)}function Ft(k,_t,Z){k?(J(i.POLYGON_OFFSET_FILL),(D!==_t||O!==Z)&&(i.polygonOffset(_t,Z),D=_t,O=Z)):xt(i.POLYGON_OFFSET_FILL)}function St(k){k?J(i.SCISSOR_TEST):xt(i.SCISSOR_TEST)}function P(k){k===void 0&&(k=i.TEXTURE0+F-1),tt!==k&&(i.activeTexture(k),tt=k)}function S(k,_t,Z){Z===void 0&&(tt===null?Z=i.TEXTURE0+F-1:Z=tt);let et=at[Z];et===void 0&&(et={type:void 0,texture:void 0},at[Z]=et),(et.type!==k||et.texture!==_t)&&(tt!==Z&&(i.activeTexture(Z),tt=Z),i.bindTexture(k,_t||ht[k]),et.type=k,et.texture=_t)}function W(){const k=at[tt];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Jt(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ct(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function wt(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(k){Vt.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Vt.copy(k))}function Tt(k){q.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),q.copy(k))}function ee(k,_t){let Z=l.get(_t);Z===void 0&&(Z=new WeakMap,l.set(_t,Z));let et=Z.get(k);et===void 0&&(et=i.getUniformBlockIndex(_t,k.name),Z.set(k,et))}function qt(k,_t){const et=l.get(_t).get(k);c.get(_t)!==et&&(i.uniformBlockBinding(_t,et,k.__bindingPointIndex),c.set(_t,et))}function xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},tt=null,at={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,y=null,x=null,C=null,R=null,w=new mt(0,0,0),I=0,b=!1,v=null,E=null,T=null,D=null,O=null,Vt.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:xt,bindFramebuffer:Rt,drawBuffers:Ut,useProgram:Kt,setBlending:U,setMaterial:At,setFlipSided:st,setCullFace:Et,setLineWidth:ft,setPolygonOffset:Ft,setScissorTest:St,activeTexture:P,bindTexture:S,unbindTexture:W,compressedTexImage2D:j,compressedTexImage3D:nt,texImage2D:wt,texImage3D:zt,updateUBOMapping:ee,uniformBlockBinding:qt,texStorage2D:Jt,texStorage3D:ct,texSubImage2D:$,texSubImage3D:Ct,compressedTexSubImage2D:gt,compressedTexSubImage3D:bt,scissor:Bt,viewport:Tt,reset:xe}}function Zl(i,t,e,n){const s=Yg(n);switch(e){case Wh:return i*t;case Yh:return i*t;case qh:return i*t*2;case Sc:return i*t/s.components*s.byteLength;case bc:return i*t/s.components*s.byteLength;case Zh:return i*t*2/s.components*s.byteLength;case Ec:return i*t*2/s.components*s.byteLength;case Xh:return i*t*3/s.components*s.byteLength;case Un:return i*t*4/s.components*s.byteLength;case wc:return i*t*4/s.components*s.byteLength;case uo:case fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case po:case mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ba:case Ha:return Math.max(i,16)*Math.max(t,8)/4;case za:case ka:return Math.max(i,8)*Math.max(t,8)/2;case Va:case Ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case tc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ec:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case nc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ic:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case sc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case go:case rc:case oc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Kh:case ac:return Math.ceil(i/4)*Math.ceil(t/4)*8;case cc:case lc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yg(i){switch(i){case ri:case Hh:return{byteLength:1,components:1};case ur:case Vh:case br:return{byteLength:2,components:1};case Mc:case yc:return{byteLength:2,components:4};case Hi:case vc:case kn:return{byteLength:4,components:1};case Gh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function qg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return f?new OffscreenCanvas(P,S):yo("canvas")}function _(P,S,W){let j=1;const nt=St(P);if((nt.width>W||nt.height>W)&&(j=W/Math.max(nt.width,nt.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const $=Math.floor(j*nt.width),Ct=Math.floor(j*nt.height);u===void 0&&(u=g($,Ct));const gt=S?g($,Ct):u;return gt.width=$,gt.height=Ct,gt.getContext("2d").drawImage(P,0,0,$,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+$+"x"+Ct+")."),gt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){i.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(P,S,W,j,nt=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let $=S;if(S===i.RED&&(W===i.FLOAT&&($=i.R32F),W===i.HALF_FLOAT&&($=i.R16F),W===i.UNSIGNED_BYTE&&($=i.R8)),S===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&($=i.R8UI),W===i.UNSIGNED_SHORT&&($=i.R16UI),W===i.UNSIGNED_INT&&($=i.R32UI),W===i.BYTE&&($=i.R8I),W===i.SHORT&&($=i.R16I),W===i.INT&&($=i.R32I)),S===i.RG&&(W===i.FLOAT&&($=i.RG32F),W===i.HALF_FLOAT&&($=i.RG16F),W===i.UNSIGNED_BYTE&&($=i.RG8)),S===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&($=i.RG8UI),W===i.UNSIGNED_SHORT&&($=i.RG16UI),W===i.UNSIGNED_INT&&($=i.RG32UI),W===i.BYTE&&($=i.RG8I),W===i.SHORT&&($=i.RG16I),W===i.INT&&($=i.RG32I)),S===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&($=i.RGB8UI),W===i.UNSIGNED_SHORT&&($=i.RGB16UI),W===i.UNSIGNED_INT&&($=i.RGB32UI),W===i.BYTE&&($=i.RGB8I),W===i.SHORT&&($=i.RGB16I),W===i.INT&&($=i.RGB32I)),S===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&($=i.RGBA8UI),W===i.UNSIGNED_SHORT&&($=i.RGBA16UI),W===i.UNSIGNED_INT&&($=i.RGBA32UI),W===i.BYTE&&($=i.RGBA8I),W===i.SHORT&&($=i.RGBA16I),W===i.INT&&($=i.RGBA32I)),S===i.RGB&&W===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),S===i.RGBA){const Ct=nt?Po:ne.getTransfer(j);W===i.FLOAT&&($=i.RGBA32F),W===i.HALF_FLOAT&&($=i.RGBA16F),W===i.UNSIGNED_BYTE&&($=Ct===pe?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(P,S){let W;return P?S===null||S===Hi||S===Is?W=i.DEPTH24_STENCIL8:S===kn?W=i.DEPTH32F_STENCIL8:S===ur&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Hi||S===Is?W=i.DEPTH_COMPONENT24:S===kn?W=i.DEPTH_COMPONENT32F:S===ur&&(W=i.DEPTH_COMPONENT16),W}function C(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==mn&&P.minFilter!==Bn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function R(P){const S=P.target;S.removeEventListener("dispose",R),I(S),S.isVideoTexture&&h.delete(S)}function w(P){const S=P.target;S.removeEventListener("dispose",w),v(S)}function I(P){const S=n.get(P);if(S.__webglInit===void 0)return;const W=P.source,j=d.get(W);if(j){const nt=j[S.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&b(P),Object.keys(j).length===0&&d.delete(W)}n.remove(P)}function b(P){const S=n.get(P);i.deleteTexture(S.__webglTexture);const W=P.source,j=d.get(W);delete j[S.__cacheKey],o.memory.textures--}function v(P){const S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let nt=0;nt<S.__webglFramebuffer[j].length;nt++)i.deleteFramebuffer(S.__webglFramebuffer[j][nt]);else i.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)i.deleteFramebuffer(S.__webglFramebuffer[j]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=P.textures;for(let j=0,nt=W.length;j<nt;j++){const $=n.get(W[j]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(W[j])}n.remove(P)}let E=0;function T(){E=0}function D(){const P=E;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),E+=1,P}function O(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function F(P,S){const W=n.get(P);if(P.isVideoTexture&&ft(P),P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(W,P,S);return}}e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+S)}function N(P,S){const W=n.get(P);if(P.version>0&&W.__version!==P.version){q(W,P,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+S)}function B(P,S){const W=n.get(P);if(P.version>0&&W.__version!==P.version){q(W,P,S);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+S)}function H(P,S){const W=n.get(P);if(P.version>0&&W.__version!==P.version){it(W,P,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+S)}const tt={[xo]:i.REPEAT,[zi]:i.CLAMP_TO_EDGE,[Fa]:i.MIRRORED_REPEAT},at={[mn]:i.NEAREST,[xd]:i.NEAREST_MIPMAP_NEAREST,[Rr]:i.NEAREST_MIPMAP_LINEAR,[Bn]:i.LINEAR,[Fo]:i.LINEAR_MIPMAP_NEAREST,[Bi]:i.LINEAR_MIPMAP_LINEAR},ut={[Sd]:i.NEVER,[Rd]:i.ALWAYS,[bd]:i.LESS,[$h]:i.LEQUAL,[Ed]:i.EQUAL,[Ad]:i.GEQUAL,[wd]:i.GREATER,[Td]:i.NOTEQUAL};function Pt(P,S){if(S.type===kn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Bn||S.magFilter===Fo||S.magFilter===Rr||S.magFilter===Bi||S.minFilter===Bn||S.minFilter===Fo||S.minFilter===Rr||S.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,tt[S.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,tt[S.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,tt[S.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,at[S.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,at[S.minFilter]),S.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ut[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===mn||S.minFilter!==Rr&&S.minFilter!==Bi||S.type===kn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Vt(P,S){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",R));const j=S.source;let nt=d.get(j);nt===void 0&&(nt={},d.set(j,nt));const $=O(S);if($!==P.__cacheKey){nt[$]===void 0&&(nt[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),nt[$].usedTimes++;const Ct=nt[P.__cacheKey];Ct!==void 0&&(nt[P.__cacheKey].usedTimes--,Ct.usedTimes===0&&b(S)),P.__cacheKey=$,P.__webglTexture=nt[$].texture}return W}function q(P,S,W){let j=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=i.TEXTURE_3D);const nt=Vt(P,S),$=S.source;e.bindTexture(j,P.__webglTexture,i.TEXTURE0+W);const Ct=n.get($);if($.version!==Ct.__version||nt===!0){e.activeTexture(i.TEXTURE0+W);const gt=ne.getPrimaries(ne.workingColorSpace),bt=S.colorSpace===ei?null:ne.getPrimaries(S.colorSpace),Jt=S.colorSpace===ei||gt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let ct=_(S.image,!1,s.maxTextureSize);ct=Ft(S,ct);const wt=r.convert(S.format,S.colorSpace),zt=r.convert(S.type);let Bt=y(S.internalFormat,wt,zt,S.colorSpace,S.isVideoTexture);Pt(j,S);let Tt;const ee=S.mipmaps,qt=S.isVideoTexture!==!0,xe=Ct.__version===void 0||nt===!0,k=$.dataReady,_t=C(S,ct);if(S.isDepthTexture)Bt=x(S.format===Us,S.type),xe&&(qt?e.texStorage2D(i.TEXTURE_2D,1,Bt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,Bt,ct.width,ct.height,0,wt,zt,null));else if(S.isDataTexture)if(ee.length>0){qt&&xe&&e.texStorage2D(i.TEXTURE_2D,_t,Bt,ee[0].width,ee[0].height);for(let Z=0,et=ee.length;Z<et;Z++)Tt=ee[Z],qt?k&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Tt.width,Tt.height,wt,zt,Tt.data):e.texImage2D(i.TEXTURE_2D,Z,Bt,Tt.width,Tt.height,0,wt,zt,Tt.data);S.generateMipmaps=!1}else qt?(xe&&e.texStorage2D(i.TEXTURE_2D,_t,Bt,ct.width,ct.height),k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct.width,ct.height,wt,zt,ct.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,ct.width,ct.height,0,wt,zt,ct.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){qt&&xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Bt,ee[0].width,ee[0].height,ct.depth);for(let Z=0,et=ee.length;Z<et;Z++)if(Tt=ee[Z],S.format!==Un)if(wt!==null)if(qt){if(k)if(S.layerUpdates.size>0){const yt=Zl(Tt.width,Tt.height,S.format,S.type);for(const vt of S.layerUpdates){const Gt=Tt.data.subarray(vt*yt/Tt.data.BYTES_PER_ELEMENT,(vt+1)*yt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,vt,Tt.width,Tt.height,1,wt,Gt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Tt.width,Tt.height,ct.depth,wt,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Bt,Tt.width,Tt.height,ct.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Tt.width,Tt.height,ct.depth,wt,zt,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Bt,Tt.width,Tt.height,ct.depth,0,wt,zt,Tt.data)}else{qt&&xe&&e.texStorage2D(i.TEXTURE_2D,_t,Bt,ee[0].width,ee[0].height);for(let Z=0,et=ee.length;Z<et;Z++)Tt=ee[Z],S.format!==Un?wt!==null?qt?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,Tt.width,Tt.height,wt,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Bt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?k&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Tt.width,Tt.height,wt,zt,Tt.data):e.texImage2D(i.TEXTURE_2D,Z,Bt,Tt.width,Tt.height,0,wt,zt,Tt.data)}else if(S.isDataArrayTexture)if(qt){if(xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Bt,ct.width,ct.height,ct.depth),k)if(S.layerUpdates.size>0){const Z=Zl(ct.width,ct.height,S.format,S.type);for(const et of S.layerUpdates){const yt=ct.data.subarray(et*Z/ct.data.BYTES_PER_ELEMENT,(et+1)*Z/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,ct.width,ct.height,1,wt,zt,yt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,wt,zt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,ct.width,ct.height,ct.depth,0,wt,zt,ct.data);else if(S.isData3DTexture)qt?(xe&&e.texStorage3D(i.TEXTURE_3D,_t,Bt,ct.width,ct.height,ct.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,wt,zt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,ct.width,ct.height,ct.depth,0,wt,zt,ct.data);else if(S.isFramebufferTexture){if(xe)if(qt)e.texStorage2D(i.TEXTURE_2D,_t,Bt,ct.width,ct.height);else{let Z=ct.width,et=ct.height;for(let yt=0;yt<_t;yt++)e.texImage2D(i.TEXTURE_2D,yt,Bt,Z,et,0,wt,zt,null),Z>>=1,et>>=1}}else if(ee.length>0){if(qt&&xe){const Z=St(ee[0]);e.texStorage2D(i.TEXTURE_2D,_t,Bt,Z.width,Z.height)}for(let Z=0,et=ee.length;Z<et;Z++)Tt=ee[Z],qt?k&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,wt,zt,Tt):e.texImage2D(i.TEXTURE_2D,Z,Bt,wt,zt,Tt);S.generateMipmaps=!1}else if(qt){if(xe){const Z=St(ct);e.texStorage2D(i.TEXTURE_2D,_t,Bt,Z.width,Z.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,wt,zt,ct)}else e.texImage2D(i.TEXTURE_2D,0,Bt,wt,zt,ct);m(S)&&p(j),Ct.__version=$.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function it(P,S,W){if(S.image.length!==6)return;const j=Vt(P,S),nt=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+W);const $=n.get(nt);if(nt.version!==$.__version||j===!0){e.activeTexture(i.TEXTURE0+W);const Ct=ne.getPrimaries(ne.workingColorSpace),gt=S.colorSpace===ei?null:ne.getPrimaries(S.colorSpace),bt=S.colorSpace===ei||Ct===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Jt=S.isCompressedTexture||S.image[0].isCompressedTexture,ct=S.image[0]&&S.image[0].isDataTexture,wt=[];for(let et=0;et<6;et++)!Jt&&!ct?wt[et]=_(S.image[et],!0,s.maxCubemapSize):wt[et]=ct?S.image[et].image:S.image[et],wt[et]=Ft(S,wt[et]);const zt=wt[0],Bt=r.convert(S.format,S.colorSpace),Tt=r.convert(S.type),ee=y(S.internalFormat,Bt,Tt,S.colorSpace),qt=S.isVideoTexture!==!0,xe=$.__version===void 0||j===!0,k=nt.dataReady;let _t=C(S,zt);Pt(i.TEXTURE_CUBE_MAP,S);let Z;if(Jt){qt&&xe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,ee,zt.width,zt.height);for(let et=0;et<6;et++){Z=wt[et].mipmaps;for(let yt=0;yt<Z.length;yt++){const vt=Z[yt];S.format!==Un?Bt!==null?qt?k&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt,0,0,vt.width,vt.height,Bt,vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt,ee,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt,0,0,vt.width,vt.height,Bt,Tt,vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt,ee,vt.width,vt.height,0,Bt,Tt,vt.data)}}}else{if(Z=S.mipmaps,qt&&xe){Z.length>0&&_t++;const et=St(wt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,ee,et.width,et.height)}for(let et=0;et<6;et++)if(ct){qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,wt[et].width,wt[et].height,Bt,Tt,wt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,ee,wt[et].width,wt[et].height,0,Bt,Tt,wt[et].data);for(let yt=0;yt<Z.length;yt++){const Gt=Z[yt].image[et].image;qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt+1,0,0,Gt.width,Gt.height,Bt,Tt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt+1,ee,Gt.width,Gt.height,0,Bt,Tt,Gt.data)}}else{qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Bt,Tt,wt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,ee,Bt,Tt,wt[et]);for(let yt=0;yt<Z.length;yt++){const vt=Z[yt];qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt+1,0,0,Bt,Tt,vt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,yt+1,ee,Bt,Tt,vt.image[et])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),$.__version=nt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ht(P,S,W,j,nt,$){const Ct=r.convert(W.format,W.colorSpace),gt=r.convert(W.type),bt=y(W.internalFormat,Ct,gt,W.colorSpace),Jt=n.get(S),ct=n.get(W);if(ct.__renderTarget=S,!Jt.__hasExternalTextures){const wt=Math.max(1,S.width>>$),zt=Math.max(1,S.height>>$);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,$,bt,wt,zt,S.depth,0,Ct,gt,null):e.texImage2D(nt,$,bt,wt,zt,0,Ct,gt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),Et(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,nt,ct.__webglTexture,0,st(S)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,nt,ct.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function J(P,S,W){if(i.bindRenderbuffer(i.RENDERBUFFER,P),S.depthBuffer){const j=S.depthTexture,nt=j&&j.isDepthTexture?j.type:null,$=x(S.stencilBuffer,nt),Ct=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=st(S);Et(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt,$,S.width,S.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,$,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,$,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,P)}else{const j=S.textures;for(let nt=0;nt<j.length;nt++){const $=j[nt],Ct=r.convert($.format,$.colorSpace),gt=r.convert($.type),bt=y($.internalFormat,Ct,gt,$.colorSpace),Jt=st(S);W&&Et(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Jt,bt,S.width,S.height):Et(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Jt,bt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,bt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),F(S.depthTexture,0);const nt=j.__webglTexture,$=st(S);if(S.depthTexture.format===Es)Et(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(S.depthTexture.format===Us)Et(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Rt(P){const S=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const nt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",nt)};j.addEventListener("dispose",nt),S.__depthDisposeCallback=nt}S.__boundDepthTexture=j}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");xt(S.__webglFramebuffer,P)}else if(W){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=i.createRenderbuffer(),J(S.__webglDepthbuffer[j],P,!1);else{const nt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),J(S.__webglDepthbuffer,P,!1);else{const j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(P,S,W){const j=n.get(P);S!==void 0&&ht(j.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Rt(P)}function Kt(P){const S=P.texture,W=n.get(P),j=n.get(S);P.addEventListener("dispose",w);const nt=P.textures,$=P.isWebGLCubeRenderTarget===!0,Ct=nt.length>1;if(Ct||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=S.version,o.memory.textures++),$){W.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[gt]=[];for(let bt=0;bt<S.mipmaps.length;bt++)W.__webglFramebuffer[gt][bt]=i.createFramebuffer()}else W.__webglFramebuffer[gt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let gt=0;gt<S.mipmaps.length;gt++)W.__webglFramebuffer[gt]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let gt=0,bt=nt.length;gt<bt;gt++){const Jt=n.get(nt[gt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Et(P)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let gt=0;gt<nt.length;gt++){const bt=nt[gt];W.__webglColorRenderbuffer[gt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[gt]);const Jt=r.convert(bt.format,bt.colorSpace),ct=r.convert(bt.type),wt=y(bt.internalFormat,Jt,ct,bt.colorSpace,P.isXRRenderTarget===!0),zt=st(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,wt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,W.__webglColorRenderbuffer[gt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),J(W.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Pt(i.TEXTURE_CUBE_MAP,S);for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0)for(let bt=0;bt<S.mipmaps.length;bt++)ht(W.__webglFramebuffer[gt][bt],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,bt);else ht(W.__webglFramebuffer[gt],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let gt=0,bt=nt.length;gt<bt;gt++){const Jt=nt[gt],ct=n.get(Jt);e.bindTexture(i.TEXTURE_2D,ct.__webglTexture),Pt(i.TEXTURE_2D,Jt),ht(W.__webglFramebuffer,P,Jt,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,0),m(Jt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let gt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(gt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,j.__webglTexture),Pt(gt,S),S.mipmaps&&S.mipmaps.length>0)for(let bt=0;bt<S.mipmaps.length;bt++)ht(W.__webglFramebuffer[bt],P,S,i.COLOR_ATTACHMENT0,gt,bt);else ht(W.__webglFramebuffer,P,S,i.COLOR_ATTACHMENT0,gt,0);m(S)&&p(gt),e.unbindTexture()}P.depthBuffer&&Rt(P)}function Q(P){const S=P.textures;for(let W=0,j=S.length;W<j;W++){const nt=S[W];if(m(nt)){const $=M(P),Ct=n.get(nt).__webglTexture;e.bindTexture($,Ct),p($),e.unbindTexture()}}}const ot=[],U=[];function At(P){if(P.samples>0){if(Et(P)===!1){const S=P.textures,W=P.width,j=P.height;let nt=i.COLOR_BUFFER_BIT;const $=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(P),gt=S.length>1;if(gt)for(let bt=0;bt<S.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let bt=0;bt<S.length;bt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),gt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Jt=n.get(S[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Jt,0)}i.blitFramebuffer(0,0,W,j,0,0,W,j,nt,i.NEAREST),c===!0&&(ot.length=0,U.length=0,ot.push(i.COLOR_ATTACHMENT0+bt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ot.push($),U.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),gt)for(let bt=0;bt<S.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Jt=n.get(S[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,Jt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const S=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function st(P){return Math.min(s.maxSamples,P.samples)}function Et(P){const S=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ft(P){const S=o.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function Ft(P,S){const W=P.colorSpace,j=P.format,nt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==Fs&&W!==ei&&(ne.getTransfer(W)===pe?(j!==Un||nt!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function St(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=T,this.setTexture2D=F,this.setTexture2DArray=N,this.setTexture3D=B,this.setTextureCube=H,this.rebindTextures=Ut,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=Et}function Zg(i,t){function e(n,s=ei){let r;const o=ne.getTransfer(s);if(n===ri)return i.UNSIGNED_BYTE;if(n===Mc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Hh)return i.BYTE;if(n===Vh)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===vc)return i.INT;if(n===Hi)return i.UNSIGNED_INT;if(n===kn)return i.FLOAT;if(n===br)return i.HALF_FLOAT;if(n===Wh)return i.ALPHA;if(n===Xh)return i.RGB;if(n===Un)return i.RGBA;if(n===Yh)return i.LUMINANCE;if(n===qh)return i.LUMINANCE_ALPHA;if(n===Es)return i.DEPTH_COMPONENT;if(n===Us)return i.DEPTH_STENCIL;if(n===Sc)return i.RED;if(n===bc)return i.RED_INTEGER;if(n===Zh)return i.RG;if(n===Ec)return i.RG_INTEGER;if(n===wc)return i.RGBA_INTEGER;if(n===uo||n===fo||n===po||n===mo)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===uo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===uo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===za||n===Ba||n===ka||n===Ha)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Va||n===Ga||n===Wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Va||n===Ga)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xa||n===Ya||n===qa||n===Za||n===Ka||n===ja||n===$a||n===Ja||n===Qa||n===tc||n===ec||n===nc||n===ic||n===sc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ka)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ja)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ec)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ic)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===go||n===rc||n===oc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===go)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kh||n===ac||n===cc||n===lc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ac)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===lc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Is?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Kg extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class $t extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jg={type:"move"};class ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const $g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Qg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Vn({vertexShader:$g,fragmentShader:Jg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new _e(new ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t_ extends Wi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=new Qg,m=e.getContextAttributes();let p=null,M=null;const y=[],x=[],C=new rt;let R=null;const w=new pn;w.viewport=new ge;const I=new pn;I.viewport=new ge;const b=[w,I],v=new Kg;let E=null,T=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let it=y[q];return it===void 0&&(it=new ha,y[q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(q){let it=y[q];return it===void 0&&(it=new ha,y[q]=it),it.getGripSpace()},this.getHand=function(q){let it=y[q];return it===void 0&&(it=new ha,y[q]=it),it.getHandSpace()};function D(q){const it=x.indexOf(q.inputSource);if(it===-1)return;const ht=y[it];ht!==void 0&&(ht.update(q.inputSource,q.frame,l||o),ht.dispatchEvent({type:q.type,data:q.inputSource}))}function O(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",F);for(let q=0;q<y.length;q++){const it=x[q];it!==null&&(x[q]=null,y[q].disconnect(it))}E=null,T=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,M=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",O),s.addEventListener("inputsourceschange",F),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Vi(f.framebufferWidth,f.framebufferHeight,{format:Un,type:ri,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,ht=null,J=null;m.depth&&(J=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?Us:Es,ht=m.stencil?Is:Hi);const xt={colorFormat:e.RGBA8,depthFormat:J,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(xt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Vi(d.textureWidth,d.textureHeight,{format:Un,type:ri,depthTexture:new hu(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Vt.setContext(s),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function F(q){for(let it=0;it<q.removed.length;it++){const ht=q.removed[it],J=x.indexOf(ht);J>=0&&(x[J]=null,y[J].disconnect(ht))}for(let it=0;it<q.added.length;it++){const ht=q.added[it];let J=x.indexOf(ht);if(J===-1){for(let Rt=0;Rt<y.length;Rt++)if(Rt>=x.length){x.push(ht),J=Rt;break}else if(x[Rt]===null){x[Rt]=ht,J=Rt;break}if(J===-1)break}const xt=y[J];xt&&xt.connect(ht)}}const N=new L,B=new L;function H(q,it,ht){N.setFromMatrixPosition(it.matrixWorld),B.setFromMatrixPosition(ht.matrixWorld);const J=N.distanceTo(B),xt=it.projectionMatrix.elements,Rt=ht.projectionMatrix.elements,Ut=xt[14]/(xt[10]-1),Kt=xt[14]/(xt[10]+1),Q=(xt[9]+1)/xt[5],ot=(xt[9]-1)/xt[5],U=(xt[8]-1)/xt[0],At=(Rt[8]+1)/Rt[0],st=Ut*U,Et=Ut*At,ft=J/(-U+At),Ft=ft*-U;if(it.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ft),q.translateZ(ft),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),xt[10]===-1)q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const St=Ut+ft,P=Kt+ft,S=st-Ft,W=Et+(J-Ft),j=Q*Kt/P*St,nt=ot*Kt/P*St;q.projectionMatrix.makePerspective(S,W,j,nt,St,P),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function tt(q,it){it===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(it.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let it=q.near,ht=q.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(ht=_.depthFar)),v.near=I.near=w.near=it,v.far=I.far=w.far=ht,(E!==v.near||T!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),E=v.near,T=v.far),w.layers.mask=q.layers.mask|2,I.layers.mask=q.layers.mask|4,v.layers.mask=w.layers.mask|I.layers.mask;const J=q.parent,xt=v.cameras;tt(v,J);for(let Rt=0;Rt<xt.length;Rt++)tt(xt[Rt],J);xt.length===2?H(v,w,I):v.projectionMatrix.copy(w.projectionMatrix),at(q,v,J)};function at(q,it,ht){ht===null?q.matrix.copy(it.matrixWorld):(q.matrix.copy(ht.matrixWorld),q.matrix.invert(),q.matrix.multiply(it.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=dr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let ut=null;function Pt(q,it){if(h=it.getViewerPose(l||o),g=it,h!==null){const ht=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let J=!1;ht.length!==v.cameras.length&&(v.cameras.length=0,J=!0);for(let Rt=0;Rt<ht.length;Rt++){const Ut=ht[Rt];let Kt=null;if(f!==null)Kt=f.getViewport(Ut);else{const ot=u.getViewSubImage(d,Ut);Kt=ot.viewport,Rt===0&&(t.setRenderTargetTextures(M,ot.colorTexture,d.ignoreDepthValues?void 0:ot.depthStencilTexture),t.setRenderTarget(M))}let Q=b[Rt];Q===void 0&&(Q=new pn,Q.layers.enable(Rt),Q.viewport=new ge,b[Rt]=Q),Q.matrix.fromArray(Ut.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Ut.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Rt===0&&(v.matrix.copy(Q.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),J===!0&&v.cameras.push(Q)}const xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")){const Rt=u.getDepthInformation(ht[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,s.renderState)}}for(let ht=0;ht<y.length;ht++){const J=x[ht],xt=y[ht];J!==null&&xt!==void 0&&xt.update(J,it,l||o)}ut&&ut(q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const Vt=new cu;Vt.setAnimationLoop(Pt),this.setAnimationLoop=function(q){ut=q},this.dispose=function(){}}}const Ii=new sn,e_=new Qt;function n_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ru(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,x=M.envMapRotation;y&&(m.envMap.value=y,Ii.copy(x),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),m.envMapRotation.value.setFromMatrix4(e_.makeRotationFromEuler(Ii)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function i_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,y){const x=y.program;n.uniformBlockBinding(M,x)}function l(M,y){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));const C=y.program;n.updateUBOMapping(M,C);const R=t.render.frame;r[M.id]!==R&&(d(M),r[M.id]=R)}function h(M){const y=u();M.__bindingPointIndex=y;const x=i.createBuffer(),C=M.__size,R=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const y=s[M.id],x=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let R=0,w=x.length;R<w;R++){const I=Array.isArray(x[R])?x[R]:[x[R]];for(let b=0,v=I.length;b<v;b++){const E=I[b];if(f(E,R,b,C)===!0){const T=E.__offset,D=Array.isArray(E.value)?E.value:[E.value];let O=0;for(let F=0;F<D.length;F++){const N=D[F],B=_(N);typeof N=="number"||typeof N=="boolean"?(E.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,T+O,E.__data)):N.isMatrix3?(E.__data[0]=N.elements[0],E.__data[1]=N.elements[1],E.__data[2]=N.elements[2],E.__data[3]=0,E.__data[4]=N.elements[3],E.__data[5]=N.elements[4],E.__data[6]=N.elements[5],E.__data[7]=0,E.__data[8]=N.elements[6],E.__data[9]=N.elements[7],E.__data[10]=N.elements[8],E.__data[11]=0):(N.toArray(E.__data,O),O+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,T,E.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,x,C){const R=M.value,w=y+"_"+x;if(C[w]===void 0)return typeof R=="number"||typeof R=="boolean"?C[w]=R:C[w]=R.clone(),!0;{const I=C[w];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return C[w]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(M){const y=M.uniforms;let x=0;const C=16;for(let w=0,I=y.length;w<I;w++){const b=Array.isArray(y[w])?y[w]:[y[w]];for(let v=0,E=b.length;v<E;v++){const T=b[v],D=Array.isArray(T.value)?T.value:[T.value];for(let O=0,F=D.length;O<F;O++){const N=D[O],B=_(N),H=x%C,tt=H%B.boundary,at=H+tt;x+=tt,at!==0&&C-at<B.storage&&(x+=C-at),T.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),T.__offset=x,x+=B.storage}}}const R=x%C;return R>0&&(x+=C-R),M.__size=x,M.__cache={},this}function _(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class s_{constructor(t={}){const{canvas:e=Xd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this.toneMapping=bi,this.toneMappingExposure=1;const x=this;let C=!1,R=0,w=0,I=null,b=-1,v=null;const E=new ge,T=new ge;let D=null;const O=new mt(0);let F=0,N=e.width,B=e.height,H=1,tt=null,at=null;const ut=new ge(0,0,N,B),Pt=new ge(0,0,N,B);let Vt=!1;const q=new Rc;let it=!1,ht=!1;const J=new Qt,xt=new Qt,Rt=new L,Ut=new ge,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function ot(){return I===null?H:1}let U=n;function At(A,V){return e.getContext(A,V)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xc}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),U===null){const V="webgl2";if(U=At(V,A),U===null)throw At(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let st,Et,ft,Ft,St,P,S,W,j,nt,$,Ct,gt,bt,Jt,ct,wt,zt,Bt,Tt,ee,qt,xe,k;function _t(){st=new lm(U),st.init(),qt=new Zg(U,st),Et=new im(U,st,t,qt),ft=new Xg(U,st),Et.reverseDepthBuffer&&d&&ft.buffers.depth.setReversed(!0),Ft=new dm(U),St=new Pg,P=new qg(U,st,ft,St,Et,qt,Ft),S=new rm(x),W=new cm(x),j=new vf(U),xe=new em(U,j),nt=new hm(U,j,Ft,xe),$=new pm(U,nt,j,Ft),Bt=new fm(U,Et,P),ct=new sm(St),Ct=new Cg(x,S,W,st,Et,xe,ct),gt=new n_(x,St),bt=new Dg,Jt=new zg(st),zt=new tm(x,S,W,ft,$,f,c),wt=new Gg(x,$,Et),k=new i_(U,Ft,Et,ft),Tt=new nm(U,st,Ft),ee=new um(U,st,Ft),Ft.programs=Ct.programs,x.capabilities=Et,x.extensions=st,x.properties=St,x.renderLists=bt,x.shadowMap=wt,x.state=ft,x.info=Ft}_t();const Z=new t_(x,U);this.xr=Z,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const A=st.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=st.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(A){A!==void 0&&(H=A,this.setSize(N,B,!1))},this.getSize=function(A){return A.set(N,B)},this.setSize=function(A,V,X=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,B=V,e.width=Math.floor(A*H),e.height=Math.floor(V*H),X===!0&&(e.style.width=A+"px",e.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(N*H,B*H).floor()},this.setDrawingBufferSize=function(A,V,X){N=A,B=V,H=X,e.width=Math.floor(A*X),e.height=Math.floor(V*X),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(E)},this.getViewport=function(A){return A.copy(ut)},this.setViewport=function(A,V,X,Y){A.isVector4?ut.set(A.x,A.y,A.z,A.w):ut.set(A,V,X,Y),ft.viewport(E.copy(ut).multiplyScalar(H).round())},this.getScissor=function(A){return A.copy(Pt)},this.setScissor=function(A,V,X,Y){A.isVector4?Pt.set(A.x,A.y,A.z,A.w):Pt.set(A,V,X,Y),ft.scissor(T.copy(Pt).multiplyScalar(H).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(A){ft.setScissorTest(Vt=A)},this.setOpaqueSort=function(A){tt=A},this.setTransparentSort=function(A){at=A},this.getClearColor=function(A){return A.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(A=!0,V=!0,X=!0){let Y=0;if(A){let G=!1;if(I!==null){const lt=I.texture.format;G=lt===wc||lt===Ec||lt===bc}if(G){const lt=I.texture.type,Mt=lt===ri||lt===Hi||lt===ur||lt===Is||lt===Mc||lt===yc,Lt=zt.getClearColor(),Dt=zt.getClearAlpha(),kt=Lt.r,Wt=Lt.g,It=Lt.b;Mt?(g[0]=kt,g[1]=Wt,g[2]=It,g[3]=Dt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=kt,_[1]=Wt,_[2]=It,_[3]=Dt,U.clearBufferiv(U.COLOR,0,_))}else Y|=U.COLOR_BUFFER_BIT}V&&(Y|=U.DEPTH_BUFFER_BIT),X&&(Y|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),bt.dispose(),Jt.dispose(),St.dispose(),S.dispose(),W.dispose(),$.dispose(),xe.dispose(),k.dispose(),Ct.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Gc),Z.removeEventListener("sessionend",Wc),Ai.stop()};function et(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const A=Ft.autoReset,V=wt.enabled,X=wt.autoUpdate,Y=wt.needsUpdate,G=wt.type;_t(),Ft.autoReset=A,wt.enabled=V,wt.autoUpdate=X,wt.needsUpdate=Y,wt.type=G}function vt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Gt(A){const V=A.target;V.removeEventListener("dispose",Gt),Ae(V)}function Ae(A){Ge(A),St.remove(A)}function Ge(A){const V=St.get(A).programs;V!==void 0&&(V.forEach(function(X){Ct.releaseProgram(X)}),A.isShaderMaterial&&Ct.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,X,Y,G,lt){V===null&&(V=Kt);const Mt=G.isMesh&&G.matrixWorld.determinant()<0,Lt=Hu(A,V,X,Y,G);ft.setMaterial(Y,Mt);let Dt=X.index,kt=1;if(Y.wireframe===!0){if(Dt=nt.getWireframeAttribute(X),Dt===void 0)return;kt=2}const Wt=X.drawRange,It=X.attributes.position;let ie=Wt.start*kt,ve=(Wt.start+Wt.count)*kt;lt!==null&&(ie=Math.max(ie,lt.start*kt),ve=Math.min(ve,(lt.start+lt.count)*kt)),Dt!==null?(ie=Math.max(ie,0),ve=Math.min(ve,Dt.count)):It!=null&&(ie=Math.max(ie,0),ve=Math.min(ve,It.count));const ye=ve-ie;if(ye<0||ye===1/0)return;xe.setup(G,Y,Lt,X,Dt);let rn,ce=Tt;if(Dt!==null&&(rn=j.get(Dt),ce=ee,ce.setIndex(rn)),G.isMesh)Y.wireframe===!0?(ft.setLineWidth(Y.wireframeLinewidth*ot()),ce.setMode(U.LINES)):ce.setMode(U.TRIANGLES);else if(G.isLine){let Nt=Y.linewidth;Nt===void 0&&(Nt=1),ft.setLineWidth(Nt*ot()),G.isLineSegments?ce.setMode(U.LINES):G.isLineLoop?ce.setMode(U.LINE_LOOP):ce.setMode(U.LINE_STRIP)}else G.isPoints?ce.setMode(U.POINTS):G.isSprite&&ce.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)ce.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))ce.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Nt=G._multiDrawStarts,Xn=G._multiDrawCounts,le=G._multiDrawCount,Rn=Dt?j.get(Dt).bytesPerElement:1,Yi=St.get(Y).currentProgram.getUniforms();for(let un=0;un<le;un++)Yi.setValue(U,"_gl_DrawID",un),ce.render(Nt[un]/Rn,Xn[un])}else if(G.isInstancedMesh)ce.renderInstances(ie,ye,G.count);else if(X.isInstancedBufferGeometry){const Nt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Xn=Math.min(X.instanceCount,Nt);ce.renderInstances(ie,ye,Xn)}else ce.render(ie,ye)};function ue(A,V,X){A.transparent===!0&&A.side===En&&A.forceSinglePass===!1?(A.side=nn,A.needsUpdate=!0,Ar(A,V,X),A.side=Ei,A.needsUpdate=!0,Ar(A,V,X),A.side=En):Ar(A,V,X)}this.compile=function(A,V,X=null){X===null&&(X=A),p=Jt.get(X),p.init(V),y.push(p),X.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),A!==X&&A.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights();const Y=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const lt=G.material;if(lt)if(Array.isArray(lt))for(let Mt=0;Mt<lt.length;Mt++){const Lt=lt[Mt];ue(Lt,X,G),Y.add(Lt)}else ue(lt,X,G),Y.add(lt)}),y.pop(),p=null,Y},this.compileAsync=function(A,V,X=null){const Y=this.compile(A,V,X);return new Promise(G=>{function lt(){if(Y.forEach(function(Mt){St.get(Mt).currentProgram.isReady()&&Y.delete(Mt)}),Y.size===0){G(A);return}setTimeout(lt,10)}st.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let An=null;function Wn(A){An&&An(A)}function Gc(){Ai.stop()}function Wc(){Ai.start()}const Ai=new cu;Ai.setAnimationLoop(Wn),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(A){An=A,Z.setAnimationLoop(A),A===null?Ai.stop():Ai.start()},Z.addEventListener("sessionstart",Gc),Z.addEventListener("sessionend",Wc),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(V),V=Z.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,V,I),p=Jt.get(A,y.length),p.init(V),y.push(p),xt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),q.setFromProjectionMatrix(xt),ht=this.localClippingEnabled,it=ct.init(this.clippingPlanes,ht),m=bt.get(A,M.length),m.init(),M.push(m),Z.enabled===!0&&Z.isPresenting===!0){const lt=x.xr.getDepthSensingMesh();lt!==null&&Oo(lt,V,-1/0,x.sortObjects)}Oo(A,V,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(tt,at),Q=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Q&&zt.addToRenderList(m,A),this.info.render.frame++,it===!0&&ct.beginShadows();const X=p.state.shadowsArray;wt.render(X,A,V),it===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,G=m.transmissive;if(p.setupLights(),V.isArrayCamera){const lt=V.cameras;if(G.length>0)for(let Mt=0,Lt=lt.length;Mt<Lt;Mt++){const Dt=lt[Mt];Yc(Y,G,A,Dt)}Q&&zt.render(A);for(let Mt=0,Lt=lt.length;Mt<Lt;Mt++){const Dt=lt[Mt];Xc(m,A,Dt,Dt.viewport)}}else G.length>0&&Yc(Y,G,A,V),Q&&zt.render(A),Xc(m,A,V);I!==null&&(P.updateMultisampleRenderTarget(I),P.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(x,A,V),xe.resetDefaultState(),b=-1,v=null,y.pop(),y.length>0?(p=y[y.length-1],it===!0&&ct.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Oo(A,V,X,Y){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){Y&&Ut.setFromMatrixPosition(A.matrixWorld).applyMatrix4(xt);const Mt=$.update(A),Lt=A.material;Lt.visible&&m.push(A,Mt,Lt,X,Ut.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){const Mt=$.update(A),Lt=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ut.copy(A.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Ut.copy(Mt.boundingSphere.center)),Ut.applyMatrix4(A.matrixWorld).applyMatrix4(xt)),Array.isArray(Lt)){const Dt=Mt.groups;for(let kt=0,Wt=Dt.length;kt<Wt;kt++){const It=Dt[kt],ie=Lt[It.materialIndex];ie&&ie.visible&&m.push(A,Mt,ie,X,Ut.z,It)}}else Lt.visible&&m.push(A,Mt,Lt,X,Ut.z,null)}}const lt=A.children;for(let Mt=0,Lt=lt.length;Mt<Lt;Mt++)Oo(lt[Mt],V,X,Y)}function Xc(A,V,X,Y){const G=A.opaque,lt=A.transmissive,Mt=A.transparent;p.setupLightsView(X),it===!0&&ct.setGlobalState(x.clippingPlanes,X),Y&&ft.viewport(E.copy(Y)),G.length>0&&Tr(G,V,X),lt.length>0&&Tr(lt,V,X),Mt.length>0&&Tr(Mt,V,X),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function Yc(A,V,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Vi(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?br:ri,minFilter:Bi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const lt=p.state.transmissionRenderTarget[Y.id],Mt=Y.viewport||E;lt.setSize(Mt.z,Mt.w);const Lt=x.getRenderTarget();x.setRenderTarget(lt),x.getClearColor(O),F=x.getClearAlpha(),F<1&&x.setClearColor(16777215,.5),x.clear(),Q&&zt.render(X);const Dt=x.toneMapping;x.toneMapping=bi;const kt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),it===!0&&ct.setGlobalState(x.clippingPlanes,Y),Tr(A,X,Y),P.updateMultisampleRenderTarget(lt),P.updateRenderTargetMipmap(lt),st.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let It=0,ie=V.length;It<ie;It++){const ve=V[It],ye=ve.object,rn=ve.geometry,ce=ve.material,Nt=ve.group;if(ce.side===En&&ye.layers.test(Y.layers)){const Xn=ce.side;ce.side=nn,ce.needsUpdate=!0,qc(ye,X,Y,rn,ce,Nt),ce.side=Xn,ce.needsUpdate=!0,Wt=!0}}Wt===!0&&(P.updateMultisampleRenderTarget(lt),P.updateRenderTargetMipmap(lt))}x.setRenderTarget(Lt),x.setClearColor(O,F),kt!==void 0&&(Y.viewport=kt),x.toneMapping=Dt}function Tr(A,V,X){const Y=V.isScene===!0?V.overrideMaterial:null;for(let G=0,lt=A.length;G<lt;G++){const Mt=A[G],Lt=Mt.object,Dt=Mt.geometry,kt=Y===null?Mt.material:Y,Wt=Mt.group;Lt.layers.test(X.layers)&&qc(Lt,V,X,Dt,kt,Wt)}}function qc(A,V,X,Y,G,lt){A.onBeforeRender(x,V,X,Y,G,lt),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(x,V,X,Y,A,lt),G.transparent===!0&&G.side===En&&G.forceSinglePass===!1?(G.side=nn,G.needsUpdate=!0,x.renderBufferDirect(X,V,Y,G,A,lt),G.side=Ei,G.needsUpdate=!0,x.renderBufferDirect(X,V,Y,G,A,lt),G.side=En):x.renderBufferDirect(X,V,Y,G,A,lt),A.onAfterRender(x,V,X,Y,G,lt)}function Ar(A,V,X){V.isScene!==!0&&(V=Kt);const Y=St.get(A),G=p.state.lights,lt=p.state.shadowsArray,Mt=G.state.version,Lt=Ct.getParameters(A,G.state,lt,V,X),Dt=Ct.getProgramCacheKey(Lt);let kt=Y.programs;Y.environment=A.isMeshStandardMaterial?V.environment:null,Y.fog=V.fog,Y.envMap=(A.isMeshStandardMaterial?W:S).get(A.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,kt===void 0&&(A.addEventListener("dispose",Gt),kt=new Map,Y.programs=kt);let Wt=kt.get(Dt);if(Wt!==void 0){if(Y.currentProgram===Wt&&Y.lightsStateVersion===Mt)return Kc(A,Lt),Wt}else Lt.uniforms=Ct.getUniforms(A),A.onBeforeCompile(Lt,x),Wt=Ct.acquireProgram(Lt,Dt),kt.set(Dt,Wt),Y.uniforms=Lt.uniforms;const It=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(It.clippingPlanes=ct.uniform),Kc(A,Lt),Y.needsLights=Gu(A),Y.lightsStateVersion=Mt,Y.needsLights&&(It.ambientLightColor.value=G.state.ambient,It.lightProbe.value=G.state.probe,It.directionalLights.value=G.state.directional,It.directionalLightShadows.value=G.state.directionalShadow,It.spotLights.value=G.state.spot,It.spotLightShadows.value=G.state.spotShadow,It.rectAreaLights.value=G.state.rectArea,It.ltc_1.value=G.state.rectAreaLTC1,It.ltc_2.value=G.state.rectAreaLTC2,It.pointLights.value=G.state.point,It.pointLightShadows.value=G.state.pointShadow,It.hemisphereLights.value=G.state.hemi,It.directionalShadowMap.value=G.state.directionalShadowMap,It.directionalShadowMatrix.value=G.state.directionalShadowMatrix,It.spotShadowMap.value=G.state.spotShadowMap,It.spotLightMatrix.value=G.state.spotLightMatrix,It.spotLightMap.value=G.state.spotLightMap,It.pointShadowMap.value=G.state.pointShadowMap,It.pointShadowMatrix.value=G.state.pointShadowMatrix),Y.currentProgram=Wt,Y.uniformsList=null,Wt}function Zc(A){if(A.uniformsList===null){const V=A.currentProgram.getUniforms();A.uniformsList=_o.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function Kc(A,V){const X=St.get(A);X.outputColorSpace=V.outputColorSpace,X.batching=V.batching,X.batchingColor=V.batchingColor,X.instancing=V.instancing,X.instancingColor=V.instancingColor,X.instancingMorph=V.instancingMorph,X.skinning=V.skinning,X.morphTargets=V.morphTargets,X.morphNormals=V.morphNormals,X.morphColors=V.morphColors,X.morphTargetsCount=V.morphTargetsCount,X.numClippingPlanes=V.numClippingPlanes,X.numIntersection=V.numClipIntersection,X.vertexAlphas=V.vertexAlphas,X.vertexTangents=V.vertexTangents,X.toneMapping=V.toneMapping}function Hu(A,V,X,Y,G){V.isScene!==!0&&(V=Kt),P.resetTextureUnits();const lt=V.fog,Mt=Y.isMeshStandardMaterial?V.environment:null,Lt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Fs,Dt=(Y.isMeshStandardMaterial?W:S).get(Y.envMap||Mt),kt=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Wt=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),It=!!X.morphAttributes.position,ie=!!X.morphAttributes.normal,ve=!!X.morphAttributes.color;let ye=bi;Y.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ye=x.toneMapping);const rn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ce=rn!==void 0?rn.length:0,Nt=St.get(Y),Xn=p.state.lights;if(it===!0&&(ht===!0||A!==v)){const vn=A===v&&Y.id===b;ct.setState(Y,A,vn)}let le=!1;Y.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==Xn.state.version||Nt.outputColorSpace!==Lt||G.isBatchedMesh&&Nt.batching===!1||!G.isBatchedMesh&&Nt.batching===!0||G.isBatchedMesh&&Nt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Nt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Nt.instancing===!1||!G.isInstancedMesh&&Nt.instancing===!0||G.isSkinnedMesh&&Nt.skinning===!1||!G.isSkinnedMesh&&Nt.skinning===!0||G.isInstancedMesh&&Nt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Nt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Nt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Nt.instancingMorph===!1&&G.morphTexture!==null||Nt.envMap!==Dt||Y.fog===!0&&Nt.fog!==lt||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==ct.numPlanes||Nt.numIntersection!==ct.numIntersection)||Nt.vertexAlphas!==kt||Nt.vertexTangents!==Wt||Nt.morphTargets!==It||Nt.morphNormals!==ie||Nt.morphColors!==ve||Nt.toneMapping!==ye||Nt.morphTargetsCount!==ce)&&(le=!0):(le=!0,Nt.__version=Y.version);let Rn=Nt.currentProgram;le===!0&&(Rn=Ar(Y,V,G));let Yi=!1,un=!1,Vs=!1;const Se=Rn.getUniforms(),Nn=Nt.uniforms;if(ft.useProgram(Rn.program)&&(Yi=!0,un=!0,Vs=!0),Y.id!==b&&(b=Y.id,un=!0),Yi||v!==A){ft.buffers.depth.getReversed()?(J.copy(A.projectionMatrix),qd(J),Zd(J),Se.setValue(U,"projectionMatrix",J)):Se.setValue(U,"projectionMatrix",A.projectionMatrix),Se.setValue(U,"viewMatrix",A.matrixWorldInverse);const ai=Se.map.cameraPosition;ai!==void 0&&ai.setValue(U,Rt.setFromMatrixPosition(A.matrixWorld)),Et.logarithmicDepthBuffer&&Se.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Se.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),v!==A&&(v=A,un=!0,Vs=!0)}if(G.isSkinnedMesh){Se.setOptional(U,G,"bindMatrix"),Se.setOptional(U,G,"bindMatrixInverse");const vn=G.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),Se.setValue(U,"boneTexture",vn.boneTexture,P))}G.isBatchedMesh&&(Se.setOptional(U,G,"batchingTexture"),Se.setValue(U,"batchingTexture",G._matricesTexture,P),Se.setOptional(U,G,"batchingIdTexture"),Se.setValue(U,"batchingIdTexture",G._indirectTexture,P),Se.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&Se.setValue(U,"batchingColorTexture",G._colorsTexture,P));const Gs=X.morphAttributes;if((Gs.position!==void 0||Gs.normal!==void 0||Gs.color!==void 0)&&Bt.update(G,X,Rn),(un||Nt.receiveShadow!==G.receiveShadow)&&(Nt.receiveShadow=G.receiveShadow,Se.setValue(U,"receiveShadow",G.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Nn.envMap.value=Dt,Nn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&V.environment!==null&&(Nn.envMapIntensity.value=V.environmentIntensity),un&&(Se.setValue(U,"toneMappingExposure",x.toneMappingExposure),Nt.needsLights&&Vu(Nn,Vs),lt&&Y.fog===!0&&gt.refreshFogUniforms(Nn,lt),gt.refreshMaterialUniforms(Nn,Y,H,B,p.state.transmissionRenderTarget[A.id]),_o.upload(U,Zc(Nt),Nn,P)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(_o.upload(U,Zc(Nt),Nn,P),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Se.setValue(U,"center",G.center),Se.setValue(U,"modelViewMatrix",G.modelViewMatrix),Se.setValue(U,"normalMatrix",G.normalMatrix),Se.setValue(U,"modelMatrix",G.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const vn=Y.uniformsGroups;for(let ai=0,ci=vn.length;ai<ci;ai++){const jc=vn[ai];k.update(jc,Rn),k.bind(jc,Rn)}}return Rn}function Vu(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function Gu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,V,X){St.get(A.texture).__webglTexture=V,St.get(A.depthTexture).__webglTexture=X;const Y=St.get(A);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,V){const X=St.get(A);X.__webglFramebuffer=V,X.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,X=0){I=A,R=V,w=X;let Y=!0,G=null,lt=!1,Mt=!1;if(A){const Dt=St.get(A);if(Dt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(U.FRAMEBUFFER,null),Y=!1;else if(Dt.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(Dt.__hasExternalTextures)P.rebindTextures(A,St.get(A.texture).__webglTexture,St.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const It=A.depthTexture;if(Dt.__boundDepthTexture!==It){if(It!==null&&St.has(It)&&(A.width!==It.image.width||A.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const kt=A.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Mt=!0);const Wt=St.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Wt[V])?G=Wt[V][X]:G=Wt[V],lt=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?G=St.get(A).__webglMultisampledFramebuffer:Array.isArray(Wt)?G=Wt[X]:G=Wt,E.copy(A.viewport),T.copy(A.scissor),D=A.scissorTest}else E.copy(ut).multiplyScalar(H).floor(),T.copy(Pt).multiplyScalar(H).floor(),D=Vt;if(ft.bindFramebuffer(U.FRAMEBUFFER,G)&&Y&&ft.drawBuffers(A,G),ft.viewport(E),ft.scissor(T),ft.setScissorTest(D),lt){const Dt=St.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+V,Dt.__webglTexture,X)}else if(Mt){const Dt=St.get(A.texture),kt=V||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Dt.__webglTexture,X||0,kt)}b=-1},this.readRenderTargetPixels=function(A,V,X,Y,G,lt,Mt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=St.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Mt!==void 0&&(Lt=Lt[Mt]),Lt){ft.bindFramebuffer(U.FRAMEBUFFER,Lt);try{const Dt=A.texture,kt=Dt.format,Wt=Dt.type;if(!Et.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Et.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-Y&&X>=0&&X<=A.height-G&&U.readPixels(V,X,Y,G,qt.convert(kt),qt.convert(Wt),lt)}finally{const Dt=I!==null?St.get(I).__webglFramebuffer:null;ft.bindFramebuffer(U.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(A,V,X,Y,G,lt,Mt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=St.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Mt!==void 0&&(Lt=Lt[Mt]),Lt){const Dt=A.texture,kt=Dt.format,Wt=Dt.type;if(!Et.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Et.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=A.width-Y&&X>=0&&X<=A.height-G){ft.bindFramebuffer(U.FRAMEBUFFER,Lt);const It=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,It),U.bufferData(U.PIXEL_PACK_BUFFER,lt.byteLength,U.STREAM_READ),U.readPixels(V,X,Y,G,qt.convert(kt),qt.convert(Wt),0);const ie=I!==null?St.get(I).__webglFramebuffer:null;ft.bindFramebuffer(U.FRAMEBUFFER,ie);const ve=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Yd(U,ve,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,It),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,lt),U.deleteBuffer(It),U.deleteSync(ve),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,V=null,X=0){A.isTexture!==!0&&(ir("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1]);const Y=Math.pow(2,-X),G=Math.floor(A.image.width*Y),lt=Math.floor(A.image.height*Y),Mt=V!==null?V.x:0,Lt=V!==null?V.y:0;P.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,Mt,Lt,G,lt),ft.unbindTexture()},this.copyTextureToTexture=function(A,V,X=null,Y=null,G=0){A.isTexture!==!0&&(ir("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,A=arguments[1],V=arguments[2],G=arguments[3]||0,X=null);let lt,Mt,Lt,Dt,kt,Wt,It,ie,ve;const ye=A.isCompressedTexture?A.mipmaps[G]:A.image;X!==null?(lt=X.max.x-X.min.x,Mt=X.max.y-X.min.y,Lt=X.isBox3?X.max.z-X.min.z:1,Dt=X.min.x,kt=X.min.y,Wt=X.isBox3?X.min.z:0):(lt=ye.width,Mt=ye.height,Lt=ye.depth||1,Dt=0,kt=0,Wt=0),Y!==null?(It=Y.x,ie=Y.y,ve=Y.z):(It=0,ie=0,ve=0);const rn=qt.convert(V.format),ce=qt.convert(V.type);let Nt;V.isData3DTexture?(P.setTexture3D(V,0),Nt=U.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(P.setTexture2DArray(V,0),Nt=U.TEXTURE_2D_ARRAY):(P.setTexture2D(V,0),Nt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,V.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,V.unpackAlignment);const Xn=U.getParameter(U.UNPACK_ROW_LENGTH),le=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Rn=U.getParameter(U.UNPACK_SKIP_PIXELS),Yi=U.getParameter(U.UNPACK_SKIP_ROWS),un=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ye.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ye.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Dt),U.pixelStorei(U.UNPACK_SKIP_ROWS,kt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Wt);const Vs=A.isDataArrayTexture||A.isData3DTexture,Se=V.isDataArrayTexture||V.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Nn=St.get(A),Gs=St.get(V),vn=St.get(Nn.__renderTarget),ai=St.get(Gs.__renderTarget);ft.bindFramebuffer(U.READ_FRAMEBUFFER,vn.__webglFramebuffer),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let ci=0;ci<Lt;ci++)Vs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,St.get(A).__webglTexture,G,Wt+ci),A.isDepthTexture?(Se&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,St.get(V).__webglTexture,G,ve+ci),U.blitFramebuffer(Dt,kt,lt,Mt,It,ie,lt,Mt,U.DEPTH_BUFFER_BIT,U.NEAREST)):Se?U.copyTexSubImage3D(Nt,G,It,ie,ve+ci,Dt,kt,lt,Mt):U.copyTexSubImage2D(Nt,G,It,ie,ve+ci,Dt,kt,lt,Mt);ft.bindFramebuffer(U.READ_FRAMEBUFFER,null),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Se?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(Nt,G,It,ie,ve,lt,Mt,Lt,rn,ce,ye.data):V.isCompressedArrayTexture?U.compressedTexSubImage3D(Nt,G,It,ie,ve,lt,Mt,Lt,rn,ye.data):U.texSubImage3D(Nt,G,It,ie,ve,lt,Mt,Lt,rn,ce,ye):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,It,ie,lt,Mt,rn,ce,ye.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,It,ie,ye.width,ye.height,rn,ye.data):U.texSubImage2D(U.TEXTURE_2D,G,It,ie,lt,Mt,rn,ce,ye);U.pixelStorei(U.UNPACK_ROW_LENGTH,Xn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Rn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Yi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,un),G===0&&V.generateMipmaps&&U.generateMipmap(Nt),ft.unbindTexture()},this.copyTextureToTexture3D=function(A,V,X=null,Y=null,G=0){return A.isTexture!==!0&&(ir("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,A=arguments[2],V=arguments[3],G=arguments[4]||0),ir('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,V,X,Y,G)},this.initRenderTarget=function(A){St.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),ft.unbindTexture()},this.resetState=function(){R=0,w=0,I=null,ft.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}class Pc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new mt(t),this.near=e,this.far=n}clone(){return new Pc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class r_ extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class o_{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=hc,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ke=new L;class So{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix4(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyNormalMatrix(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.transformDirection(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=In(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=In(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=In(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=In(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=In(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new hn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new So(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class mu extends Ti{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let as;const Zs=new L,cs=new L,ls=new L,hs=new rt,Ks=new rt,gu=new Qt,Kr=new L,js=new L,jr=new L,Kl=new rt,ua=new rt,jl=new rt;class a_ extends Oe{constructor(t=new mu){if(super(),this.isSprite=!0,this.type="Sprite",as===void 0){as=new be;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new o_(e,5);as.setIndex([0,1,2,0,2,3]),as.setAttribute("position",new So(n,3,0,!1)),as.setAttribute("uv",new So(n,2,3,!1))}this.geometry=as,this.material=t,this.center=new rt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cs.setFromMatrixScale(this.matrixWorld),gu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ls.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cs.multiplyScalar(-ls.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;$r(Kr.set(-.5,-.5,0),ls,o,cs,s,r),$r(js.set(.5,-.5,0),ls,o,cs,s,r),$r(jr.set(.5,.5,0),ls,o,cs,s,r),Kl.set(0,0),ua.set(1,0),jl.set(1,1);let a=t.ray.intersectTriangle(Kr,js,jr,!1,Zs);if(a===null&&($r(js.set(-.5,.5,0),ls,o,cs,s,r),ua.set(0,1),a=t.ray.intersectTriangle(Kr,jr,js,!1,Zs),a===null))return;const c=t.ray.origin.distanceTo(Zs);c<t.near||c>t.far||e.push({distance:c,point:Zs.clone(),uv:wn.getInterpolation(Zs,Kr,js,jr,Kl,ua,jl,new rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function $r(i,t,e,n,s,r){hs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ks.x=r*hs.x-s*hs.y,Ks.y=s*hs.x+r*hs.y):Ks.copy(hs),i.copy(t),i.x+=Ks.x,i.y+=Ks.y,i.applyMatrix4(gu)}class c_ extends qe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=mn,h=mn,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $l extends hn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const us=new Qt,Jl=new Qt,Jr=[],Ql=new Xi,l_=new Qt,$s=new _e,Js=new zs;class ki extends _e{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new $l(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,l_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Xi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),Ql.copy(t.boundingBox).applyMatrix4(us),this.boundingBox.union(Ql)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),Js.copy(t.boundingSphere).applyMatrix4(us),this.boundingSphere.union(Js)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Js.copy(this.boundingSphere),Js.applyMatrix4(n),t.ray.intersectsSphere(Js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),Jl.multiplyMatrices(n,us),$s.matrixWorld=Jl,$s.raycast(t,Jr);for(let o=0,a=Jr.length;o<a;o++){const c=Jr[o];c.instanceId=r,c.object=this,e.push(c)}Jr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new $l(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new c_(new Float32Array(s*this.count),s,this.count,Sc,kn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class _u extends Ti{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const bo=new L,Eo=new L,th=new Qt,Qs=new Ac,Qr=new zs,da=new L,eh=new L;class h_ extends Oe{constructor(t=new be,e=new _u){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)bo.fromBufferAttribute(e,s-1),Eo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=bo.distanceTo(Eo);t.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(s),Qr.radius+=r,t.ray.intersectsSphere(Qr)===!1)return;th.copy(s).invert(),Qs.copy(t.ray).applyMatrix4(th);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),y=to(this,t,Qs,c,p,M);y&&e.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=to(this,t,Qs,c,_,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=l){const p=to(this,t,Qs,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=to(this,t,Qs,c,g-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function to(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(bo.fromBufferAttribute(o,s),Eo.fromBufferAttribute(o,r),e.distanceSqToSegment(bo,Eo,da,eh)>n)return;da.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(da);if(!(c<t.near||c>t.far))return{distance:c,point:eh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Lc extends qe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new rt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new L,s=[],r=[],o=[],a=new L,c=new Qt;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ve(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ve(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Dc extends Gn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new rt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class u_ extends Dc{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ic(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const eo=new L,fa=new Ic,pa=new Ic,ma=new Ic;class wo extends Gn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(eo.subVectors(s[0],s[1]).add(s[0]),l=eo);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(eo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=eo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),fa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),pa.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),ma.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),pa.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),ma.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(fa.calc(c),pa.calc(c),ma.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function nh(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function d_(i,t){const e=1-i;return e*e*t}function f_(i,t){return 2*(1-i)*i*t}function p_(i,t){return i*i*t}function ar(i,t,e,n){return d_(i,t)+f_(i,e)+p_(i,n)}function m_(i,t){const e=1-i;return e*e*e*t}function g_(i,t){const e=1-i;return 3*e*e*i*t}function __(i,t){return 3*(1-i)*i*i*t}function x_(i,t){return i*i*i*t}function cr(i,t,e,n,s){return m_(i,t)+g_(i,e)+__(i,n)+x_(i,s)}class xu extends Gn{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(cr(t,s.x,r.x,o.x,a.x),cr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class v_ extends Gn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(cr(t,s.x,r.x,o.x,a.x),cr(t,s.y,r.y,o.y,a.y),cr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vu extends Gn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class M_ extends Gn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mu extends Gn{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ar(t,s.x,r.x,o.x),ar(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y_ extends Gn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ar(t,s.x,r.x,o.x),ar(t,s.y,r.y,o.y),ar(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yu extends Gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(nh(a,c.x,l.x,h.x,u.x),nh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new rt().fromArray(s))}return this}}var dc=Object.freeze({__proto__:null,ArcCurve:u_,CatmullRomCurve3:wo,CubicBezierCurve:xu,CubicBezierCurve3:v_,EllipseCurve:Dc,LineCurve:vu,LineCurve3:M_,QuadraticBezierCurve:Mu,QuadraticBezierCurve3:y_,SplineCurve:yu});class S_ extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new dc[s.type]().fromJSON(s))}return this}}class ih extends S_{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new vu(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Mu(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new xu(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new yu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Dc(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class To extends be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,h=new rt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new jt(o,3)),this.setAttribute("normal",new jt(a,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new To(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Er extends be{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(d,3)),this.setAttribute("uv",new jt(f,2));function M(){const x=new L,C=new L;let R=0;const w=(e-t)/n;for(let I=0;I<=r;I++){const b=[],v=I/r,E=v*(e-t)+t;for(let T=0;T<=s;T++){const D=T/s,O=D*c+a,F=Math.sin(O),N=Math.cos(O);C.x=E*F,C.y=-v*n+m,C.z=E*N,u.push(C.x,C.y,C.z),x.set(F,w,N).normalize(),d.push(x.x,x.y,x.z),f.push(D,1-v),b.push(g++)}_.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){const v=_[b][I],E=_[b+1][I],T=_[b+1][I+1],D=_[b][I+1];(t>0||b!==0)&&(h.push(v,E,D),R+=3),(e>0||b!==r-1)&&(h.push(E,T,D),R+=3)}l.addGroup(p,R,0),p+=R}function y(x){const C=g,R=new rt,w=new L;let I=0;const b=x===!0?t:e,v=x===!0?1:-1;for(let T=1;T<=s;T++)u.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;const E=g;for(let T=0;T<=s;T++){const O=T/s*c+a,F=Math.cos(O),N=Math.sin(O);w.x=b*N,w.y=m*v,w.z=b*F,u.push(w.x,w.y,w.z),d.push(0,v,0),R.x=F*.5+.5,R.y=N*.5*v+.5,f.push(R.x,R.y),g++}for(let T=0;T<s;T++){const D=C+T,O=E+T;x===!0?h.push(O,O+1,D):h.push(O+1,O,D),I+=3}l.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Er(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vi extends Er{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new vi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Io extends be{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(r.slice(),3)),this.setAttribute("uv",new jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new L,x=new L,C=new L;for(let R=0;R<e.length;R+=3)f(e[R+0],y),f(e[R+1],x),f(e[R+2],C),c(y,x,C,M)}function c(M,y,x,C){const R=C+1,w=[];for(let I=0;I<=R;I++){w[I]=[];const b=M.clone().lerp(x,I/R),v=y.clone().lerp(x,I/R),E=R-I;for(let T=0;T<=E;T++)T===0&&I===R?w[I][T]=b:w[I][T]=b.clone().lerp(v,T/E)}for(let I=0;I<R;I++)for(let b=0;b<2*(R-I)-1;b++){const v=Math.floor(b/2);b%2===0?(d(w[I][v+1]),d(w[I+1][v]),d(w[I][v])):(d(w[I][v+1]),d(w[I+1][v+1]),d(w[I+1][v]))}}function l(M){const y=new L;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const M=new L;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=m(M)/2/Math.PI+.5,C=p(M)/Math.PI+.5;o.push(x,1-C)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){const y=o[M+0],x=o[M+2],C=o[M+4],R=Math.max(y,x,C),w=Math.min(y,x,C);R>.9&&w<.1&&(y<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),C<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){const x=M*3;y.x=t[x+0],y.y=t[x+1],y.z=t[x+2]}function g(){const M=new L,y=new L,x=new L,C=new L,R=new rt,w=new rt,I=new rt;for(let b=0,v=0;b<r.length;b+=9,v+=6){M.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),R.set(o[v+0],o[v+1]),w.set(o[v+2],o[v+3]),I.set(o[v+4],o[v+5]),C.copy(M).add(y).add(x).divideScalar(3);const E=m(C);_(R,v+0,M,E),_(w,v+2,y,E),_(I,v+4,x,E)}}function _(M,y,x,C){C<0&&M.x===1&&(o[y]=M.x-1),x.x===0&&x.z===0&&(o[y]=C/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.vertices,t.indices,t.radius,t.details)}}class Uc extends Io{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Uc(t.radius,t.detail)}}class Su extends ih{constructor(t){super(t),this.uuid=Hn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ih().fromJSON(s))}return this}}const b_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=bu(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=R_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return fr(r,o,e,a,c,f,0),o}};function bu(i,t,e,n,s){let r,o;if(s===B_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=sh(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=sh(r,i[r],i[r+1],o);return o&&Uo(o,o.next)&&(mr(o),o=o.next),o}function Gi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Uo(e,e.next)||Te(e.prev,e,e.next)===0)){if(mr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&I_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?w_(i,n,s,r):E_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),mr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=T_(Gi(i),t,e),fr(i,t,e,n,s,r,2)):o===2&&A_(i,t,e,n,s,r):fr(Gi(i),t,e,n,s,r,1);break}}}function E_(i){const t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&_s(s,a,r,c,o,l,g.x,g.y)&&Te(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function w_(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Te(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=fc(f,g,t,e,n),M=fc(_,m,t,e,n);let y=i.prevZ,x=i.nextZ;for(;y&&y.z>=p&&x&&x.z<=M;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&_s(a,h,c,u,l,d,y.x,y.y)&&Te(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&_s(a,h,c,u,l,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&_s(a,h,c,u,l,d,y.x,y.y)&&Te(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&_s(a,h,c,u,l,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function T_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Uo(s,r)&&Eu(s,n,n.next,r)&&pr(s,r)&&pr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),mr(n),mr(n.next),n=i=r),n=n.next}while(n!==i);return Gi(n)}function A_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&O_(o,a)){let c=wu(o,a);o=Gi(o,o.next),c=Gi(c,c.next),fr(o,t,e,n,s,r,0),fr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function R_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=bu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(N_(l));for(s.sort(C_),r=0;r<s.length;r++)e=P_(s[r],e);return e}function C_(i,t){return i.x-t.x}function P_(i,t){const e=L_(i,t);if(!e)return t;const n=wu(e,i);return Gi(n,n.next),Gi(e,e.next)}function L_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&_s(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),pr(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&D_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function D_(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function I_(i,t,e,n){let s=i;do s.z===0&&(s.z=fc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,U_(s)}function U_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function fc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function N_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function _s(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function O_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!F_(i,t)&&(pr(i,t)&&pr(t,i)&&z_(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||Uo(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Uo(i,t){return i.x===t.x&&i.y===t.y}function Eu(i,t,e,n){const s=io(Te(i,t,e)),r=io(Te(i,t,n)),o=io(Te(e,n,i)),a=io(Te(e,n,t));return!!(s!==r&&o!==a||s===0&&no(i,e,t)||r===0&&no(i,n,t)||o===0&&no(e,i,n)||a===0&&no(e,t,n))}function no(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function io(i){return i>0?1:i<0?-1:0}function F_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Eu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function pr(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function z_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function wu(i,t){const e=new pc(i.i,i.x,i.y),n=new pc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function sh(i,t,e,n){const s=new pc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function pc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function B_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class lr{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return lr.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];rh(t),oh(n,t);let o=t.length;e.forEach(rh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,oh(n,e[c]);const a=b_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function rh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function oh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Nc extends be{constructor(t=new Su([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new jt(s,3)),this.setAttribute("uv",new jt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:k_;let y,x=!1,C,R,w,I;p&&(y=p.getSpacedPoints(h),x=!0,d=!1,C=p.computeFrenetFrames(h,!1),R=new L,w=new L,I=new L),d||(m=0,f=0,g=0,_=0);const b=a.extractPoints(l);let v=b.shape;const E=b.holes;if(!lr.isClockWise(v)){v=v.reverse();for(let Q=0,ot=E.length;Q<ot;Q++){const U=E[Q];lr.isClockWise(U)&&(E[Q]=U.reverse())}}const D=lr.triangulateShape(v,E),O=v;for(let Q=0,ot=E.length;Q<ot;Q++){const U=E[Q];v=v.concat(U)}function F(Q,ot,U){return ot||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(ot,U)}const N=v.length,B=D.length;function H(Q,ot,U){let At,st,Et;const ft=Q.x-ot.x,Ft=Q.y-ot.y,St=U.x-Q.x,P=U.y-Q.y,S=ft*ft+Ft*Ft,W=ft*P-Ft*St;if(Math.abs(W)>Number.EPSILON){const j=Math.sqrt(S),nt=Math.sqrt(St*St+P*P),$=ot.x-Ft/j,Ct=ot.y+ft/j,gt=U.x-P/nt,bt=U.y+St/nt,Jt=((gt-$)*P-(bt-Ct)*St)/(ft*P-Ft*St);At=$+ft*Jt-Q.x,st=Ct+Ft*Jt-Q.y;const ct=At*At+st*st;if(ct<=2)return new rt(At,st);Et=Math.sqrt(ct/2)}else{let j=!1;ft>Number.EPSILON?St>Number.EPSILON&&(j=!0):ft<-Number.EPSILON?St<-Number.EPSILON&&(j=!0):Math.sign(Ft)===Math.sign(P)&&(j=!0),j?(At=-Ft,st=ft,Et=Math.sqrt(S)):(At=ft,st=Ft,Et=Math.sqrt(S/2))}return new rt(At/Et,st/Et)}const tt=[];for(let Q=0,ot=O.length,U=ot-1,At=Q+1;Q<ot;Q++,U++,At++)U===ot&&(U=0),At===ot&&(At=0),tt[Q]=H(O[Q],O[U],O[At]);const at=[];let ut,Pt=tt.concat();for(let Q=0,ot=E.length;Q<ot;Q++){const U=E[Q];ut=[];for(let At=0,st=U.length,Et=st-1,ft=At+1;At<st;At++,Et++,ft++)Et===st&&(Et=0),ft===st&&(ft=0),ut[At]=H(U[At],U[Et],U[ft]);at.push(ut),Pt=Pt.concat(ut)}for(let Q=0;Q<m;Q++){const ot=Q/m,U=f*Math.cos(ot*Math.PI/2),At=g*Math.sin(ot*Math.PI/2)+_;for(let st=0,Et=O.length;st<Et;st++){const ft=F(O[st],tt[st],At);J(ft.x,ft.y,-U)}for(let st=0,Et=E.length;st<Et;st++){const ft=E[st];ut=at[st];for(let Ft=0,St=ft.length;Ft<St;Ft++){const P=F(ft[Ft],ut[Ft],At);J(P.x,P.y,-U)}}}const Vt=g+_;for(let Q=0;Q<N;Q++){const ot=d?F(v[Q],Pt[Q],Vt):v[Q];x?(w.copy(C.normals[0]).multiplyScalar(ot.x),R.copy(C.binormals[0]).multiplyScalar(ot.y),I.copy(y[0]).add(w).add(R),J(I.x,I.y,I.z)):J(ot.x,ot.y,0)}for(let Q=1;Q<=h;Q++)for(let ot=0;ot<N;ot++){const U=d?F(v[ot],Pt[ot],Vt):v[ot];x?(w.copy(C.normals[Q]).multiplyScalar(U.x),R.copy(C.binormals[Q]).multiplyScalar(U.y),I.copy(y[Q]).add(w).add(R),J(I.x,I.y,I.z)):J(U.x,U.y,u/h*Q)}for(let Q=m-1;Q>=0;Q--){const ot=Q/m,U=f*Math.cos(ot*Math.PI/2),At=g*Math.sin(ot*Math.PI/2)+_;for(let st=0,Et=O.length;st<Et;st++){const ft=F(O[st],tt[st],At);J(ft.x,ft.y,u+U)}for(let st=0,Et=E.length;st<Et;st++){const ft=E[st];ut=at[st];for(let Ft=0,St=ft.length;Ft<St;Ft++){const P=F(ft[Ft],ut[Ft],At);x?J(P.x,P.y+y[h-1].y,y[h-1].x+U):J(P.x,P.y,u+U)}}}q(),it();function q(){const Q=s.length/3;if(d){let ot=0,U=N*ot;for(let At=0;At<B;At++){const st=D[At];xt(st[2]+U,st[1]+U,st[0]+U)}ot=h+m*2,U=N*ot;for(let At=0;At<B;At++){const st=D[At];xt(st[0]+U,st[1]+U,st[2]+U)}}else{for(let ot=0;ot<B;ot++){const U=D[ot];xt(U[2],U[1],U[0])}for(let ot=0;ot<B;ot++){const U=D[ot];xt(U[0]+N*h,U[1]+N*h,U[2]+N*h)}}n.addGroup(Q,s.length/3-Q,0)}function it(){const Q=s.length/3;let ot=0;ht(O,ot),ot+=O.length;for(let U=0,At=E.length;U<At;U++){const st=E[U];ht(st,ot),ot+=st.length}n.addGroup(Q,s.length/3-Q,1)}function ht(Q,ot){let U=Q.length;for(;--U>=0;){const At=U;let st=U-1;st<0&&(st=Q.length-1);for(let Et=0,ft=h+m*2;Et<ft;Et++){const Ft=N*Et,St=N*(Et+1),P=ot+At+Ft,S=ot+st+Ft,W=ot+st+St,j=ot+At+St;Rt(P,S,W,j)}}}function J(Q,ot,U){c.push(Q),c.push(ot),c.push(U)}function xt(Q,ot,U){Ut(Q),Ut(ot),Ut(U);const At=s.length/3,st=M.generateTopUV(n,s,At-3,At-2,At-1);Kt(st[0]),Kt(st[1]),Kt(st[2])}function Rt(Q,ot,U,At){Ut(Q),Ut(ot),Ut(At),Ut(ot),Ut(U),Ut(At);const st=s.length/3,Et=M.generateSideWallUV(n,s,st-6,st-3,st-2,st-1);Kt(Et[0]),Kt(Et[1]),Kt(Et[3]),Kt(Et[1]),Kt(Et[2]),Kt(Et[3])}function Ut(Q){s.push(c[Q*3+0]),s.push(c[Q*3+1]),s.push(c[Q*3+2])}function Kt(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return H_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new dc[s.type]().fromJSON(s)),new Nc(n,t.options)}}const k_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new rt(r,o),new rt(a,c),new rt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new rt(o,1-c),new rt(l,1-u),new rt(d,1-g),new rt(_,1-p)]:[new rt(a,1-c),new rt(h,1-u),new rt(f,1-g),new rt(m,1-p)]}};function H_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ts extends Io{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ts(t.radius,t.detail)}}class Oc extends be{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new L,g=new rt;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,y=M,x=M+n+1,C=M+n+2,R=M+1;a.push(y,x,R),a.push(x,C,R)}}this.setIndex(a),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class No extends be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,d=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const R=C/e;u.x=-t*Math.cos(s+R*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+R*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(R+x,1-y),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const y=h[p][M+1],x=h[p][M],C=h[p+1][M],R=h[p+1][M+1];(p!==0||o>0)&&f.push(y,x,R),(p!==n-1||c<Math.PI)&&f.push(x,C,R)}this.setIndex(f),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(_,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new No(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Fc extends be{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(_,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class gn extends Ti{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jh,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class zc extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class V_ extends zc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ga=new Qt,ah=new L,ch=new L;class Tu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rc,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(ah),ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ch),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const lh=new Qt,tr=new L,_a=new L;class G_ extends Tu{constructor(){super(new pn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new rt(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),tr.setFromMatrixPosition(t.matrixWorld),n.position.copy(tr),_a.copy(n.position),_a.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(_a),n.updateMatrixWorld(),s.makeTranslation(-tr.x,-tr.y,-tr.z),lh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lh)}}class W_ extends zc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new G_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class X_ extends Tu{constructor(){super(new lu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Y_ extends zc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new X_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class hh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ve(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class q_ extends Wi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);const uh={type:"change"},Bc={type:"start"},Au={type:"end"},so=new Ac,dh=new xi,Z_=Math.cos(70*Mo.DEG2RAD),De=new L,on=2*Math.PI,me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xa=1e-6;class K_ extends q_{constructor(t,e=null){super(t,e),this.state=me.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ss.ROTATE,MIDDLE:Ss.DOLLY,RIGHT:Ss.PAN},this.touches={ONE:ms.ROTATE,TWO:ms.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new _n,this._lastTargetPosition=new L,this._quat=new _n().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new hh,this._sphericalDelta=new hh,this._scale=1,this._panOffset=new L,this._rotateStart=new rt,this._rotateEnd=new rt,this._rotateDelta=new rt,this._panStart=new rt,this._panEnd=new rt,this._panDelta=new rt,this._dollyStart=new rt,this._dollyEnd=new rt,this._dollyDelta=new rt,this._dollyDirection=new L,this._mouse=new rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=$_.bind(this),this._onPointerDown=j_.bind(this),this._onPointerUp=J_.bind(this),this._onContextMenu=rx.bind(this),this._onMouseWheel=ex.bind(this),this._onKeyDown=nx.bind(this),this._onTouchStart=ix.bind(this),this._onTouchMove=sx.bind(this),this._onMouseDown=Q_.bind(this),this._onMouseMove=tx.bind(this),this._interceptControlDown=ox.bind(this),this._interceptControlUp=ax.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(uh),this.update(),this.state=me.NONE}update(t=null){const e=this.object.position;De.copy(e).sub(this.target),De.applyQuaternion(this._quat),this._spherical.setFromVector3(De),this.autoRotate&&this.state===me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=on:n>Math.PI&&(n-=on),s<-Math.PI?s+=on:s>Math.PI&&(s-=on),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(De.setFromSpherical(this._spherical),De.applyQuaternion(this._quatInverse),e.copy(this.target).add(De),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=De.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=De.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(so.origin.copy(this.object.position),so.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(so.direction))<Z_?this.object.lookAt(this.target):(dh.setFromNormalAndCoplanarPoint(this.object.up,this.target),so.intersectPlane(dh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>xa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xa||this._lastTargetPosition.distanceToSquared(this.target)>xa?(this.dispatchEvent(uh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?on/60*this.autoRotateSpeed*t:on/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){De.setFromMatrixColumn(e,0),De.multiplyScalar(-t),this._panOffset.add(De)}_panUp(t,e){this.screenSpacePanning===!0?De.setFromMatrixColumn(e,1):(De.setFromMatrixColumn(e,0),De.crossVectors(this.object.up,De)),De.multiplyScalar(t),this._panOffset.add(De)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;De.copy(s).sub(this.target);let r=De.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(on*this._rotateDelta.x/e.clientHeight),this._rotateUp(on*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(on*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-on*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(on*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-on*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(on*this._rotateDelta.x/e.clientHeight),this._rotateUp(on*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function j_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function $_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function J_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Au),this.state=me.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Q_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=me.DOLLY;break;case Ss.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=me.ROTATE}break;case Ss.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=me.PAN}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(Bc)}function tx(i){switch(this.state){case me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ex(i){this.enabled===!1||this.enableZoom===!1||this.state!==me.NONE||(i.preventDefault(),this.dispatchEvent(Bc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Au))}function nx(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function ix(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ms.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=me.TOUCH_ROTATE;break;case ms.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=me.TOUCH_PAN;break;default:this.state=me.NONE}break;case 2:switch(this.touches.TWO){case ms.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=me.TOUCH_DOLLY_PAN;break;case ms.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=me.TOUCH_DOLLY_ROTATE;break;default:this.state=me.NONE}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(Bc)}function sx(i){switch(this._trackPointer(i),this.state){case me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=me.NONE}}function rx(i){this.enabled!==!1&&i.preventDefault()}function ox(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ax(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ne=60,Ot=Math.PI*2,Tn=(i,t=0,e=1)=>Math.min(e,Math.max(t,i)),en=(i,t,e)=>i+(t-i)*e,cx=i=>i-Math.floor(i),Ht=i=>(i=Tn(i),i*i*(3-2*i)),we=(i,t,e=0)=>cx(i*t/Ne+e),dt=(i,t,e=0)=>Math.sin(Ot*(i*t/Ne+e)),fe=(i,t,e)=>Tn((i-t)/(e-t)),ke=(i,t,e,n=.05)=>Ht(fe(i,t,t+n))*(1-Ht(fe(i,e-n,e)));function Sn(i,t=.18){i=Tn(i);const e=1/(1-t);return i<t?e*i*i/(2*t):i>1-t?1-e*(1-i)*(1-i)/(2*t):e*(i-t/2)}function lx(i,t,e){return typeof i=="number"?i+(t-i)*e:i.map((n,s)=>n+(t[s]-n)*e)}function Ee(i,t,e=Ht){const n=t.length;let s=n-1;for(let u=0;u<n;u++)if(t[u][0]>i){s=u-1;break}s<0&&(s=n-1);const r=t[s],o=t[(s+1)%n];let a=r[0],c=o[0],l=i;c<=a&&(c+=1,l<a&&(l+=1));const h=r[2]||e;return lx(r[1],o[1],h((l-a)/(c-a)))}function oi(i=1){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function hx(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new be;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(const h in r){const u=fh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);const g=fh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function fh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new hn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const _=h.getComponent(d,g);a.setComponent(d+u,g,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const va=new Map;function xs(i,t={}){const e=i+JSON.stringify(t);return va.has(e)||va.set(e,new gn({color:i,roughness:.9,metalness:0,flatShading:!0,...t})),va.get(e)}const kc=new gn({color:"#3e4c5c",roughness:.4,emissive:"#ffb04a",emissiveIntensity:0,flatShading:!0}),Ma=new Map;function mi(i,t){return Ma.has(i)||Ma.set(i,t()),Ma.get(i)}const z={box:(i,t,e)=>mi(`b${i},${t},${e}`,()=>new Bs(i,t,e)),cyl:(i,t,e,n=8)=>mi(`c${i},${t},${e},${n}`,()=>new Er(i,t,e,n)),cone:(i,t,e=8)=>mi(`k${i},${t},${e}`,()=>new vi(i,t,e)),ico:(i,t=0)=>mi(`i${i},${t}`,()=>new Ts(i,t)),dode:i=>mi(`d${i}`,()=>new Uc(i,0)),sphere:(i,t=8,e=6)=>mi(`s${i},${t},${e}`,()=>new No(i,t,e)),torus:(i,t,e=6,n=10,s=Math.PI*2)=>mi(`t${i},${t},${e},${n},${s}`,()=>new Fc(i,t,e,n,s)),prism:(i,t,e)=>mi(`p${i},${t},${e}`,()=>{const n=new Su;n.moveTo(-i/2,0),n.lineTo(i/2,0),n.lineTo(0,t),n.closePath();const s=new Nc(n,{depth:e,bevelEnabled:!1});return s.translate(0,0,-e/2),s})};function K(i,t,e=[0,0,0],n=[0,0,0],s=1,r){const o=t instanceof Ti?t:xs(t,r),a=new _e(i,o);return a.position.set(...e),a.rotation.set(...n),typeof s=="number"?a.scale.setScalar(s):a.scale.set(...s),a.castShadow=!0,a.receiveShadow=!0,a}function ae(i,t=[0,0,0],e=[0,0,0]){const n=new $t;return n.position.set(...t),n.rotation.set(...e),i&&i.add(n),n}const ro=new Qt,ph=new _n,mh=new sn,gh=new L,_h=new L,Mi=new mt;class gr{constructor(){this.parts=[],this.stack=[new Qt]}get top(){return this.stack[this.stack.length-1]}push(t=[0,0,0],e=0){return ro.compose(gh.set(...t),ph.setFromEuler(mh.set(0,e,0)),_h.set(1,1,1)),this.stack.push(this.top.clone().multiply(ro)),this}pop(){return this.stack.pop(),this}world(t){return new L(...t).applyMatrix4(this.top)}add(t,e,n=[0,0,0],s=[0,0,0],r=[1,1,1]){return typeof r=="number"&&(r=[r,r,r]),ro.compose(gh.set(...n),ph.setFromEuler(mh.set(...s)),_h.set(...r)),this.addMatrix(t,e,this.top.clone().multiply(ro))}addMatrix(t,e,n){let s=t.index?t.toNonIndexed():t.clone();for(const a of Object.keys(s.attributes))a!=="position"&&s.deleteAttribute(a);s.applyMatrix4(n),Mi.set(e);const r=s.attributes.position.count,o=new Float32Array(r*3);for(let a=0;a<r;a++)o[a*3]=Mi.r,o[a*3+1]=Mi.g,o[a*3+2]=Mi.b;return s.setAttribute("color",new hn(o,3)),this.parts.push(s),this}box(t,e,n,s){return this.add(z.box(...n),t,e,s)}build(t,{castShadow:e=!0,receiveShadow:n=!0}={}){if(!this.parts.length)return new $t;const s=hx(this.parts);s.computeVertexNormals(),s.computeBoundingSphere();const r=new _e(s,t||new gn({vertexColors:!0,roughness:.9,flatShading:!0}));return r.castShadow=e,r.receiveShadow=n,r}}function Le(i,t,e=.06){Mi.set(i);const n={};return Mi.getHSL(n),Mi.setHSL(n.h+(t()-.5)*e*.3,n.s,Mo.clamp(n.l+(t()-.5)*e,0,1)),"#"+Mi.getHexString()}const ux=54,Me={x:0,z:-14},te=6,As=19,_r=29,Xt={half:11,top:10,thick:1.6,towerR:2.4},dx=[[Me.x-Xt.half,Me.z+Xt.half],[Me.x+Xt.half,Me.z+Xt.half],[Me.x+Xt.half,Me.z-Xt.half],[Me.x-Xt.half,Me.z-Xt.half]],he={x:0,z:Me.z+Xt.half,width:3.2},Je={x:0,z:Me.z,w:9,d:9,h:11},oe={x:0,y:12,z:Je.z+Je.d/2+.85},vs={x:6.2,z:-7.2},yi={x:0,z:22,r:6.5},bn={x:-1.2,z:22},ds={x:.75,z:23.35},On={x:-6,z:17.5,yaw:.55},oo={x:9,z:15.5,yaw:-.75},re={x:-30,z:13,r:5.6},Rs=[[-35.2,14.2],[-40,16.5],[-45,16.2],[-49,17.6],[-56,18.8]],xr={x:18,z:31,w:9,d:7},He={x:18.4,z:31.4,r:2.4},ni={x:36,z:-3,w:13,d:17},mc={x:33.5,z:11.5,yaw:Math.PI},vr={x:-16.5,z:29.5,yaw:.3},Ms={x:-23.5,z:39},fx={x:-2,z:32.5},Mr={x:13.5,z:43},ys={x:9,z:39,r:2.8},Ao={x:30,z:26},px=[{w:1.5,pts:[[0,-1.5],[.4,6],[-.6,12],[0,16.5]]},{w:1.3,pts:[[-5.5,23.5],[-11,26],[-16,27.5],[-22,23],[-26,18.5]]},{w:1.3,pts:[[5.5,21.5],[12,23.5],[20,22],[26,17],[30,11],[31,5]]},{w:1.2,pts:[[.5,28],[1.5,34],[6,38],[12,41.5]]},{w:1,pts:[[3.5,1],[14,4],[24,8],[29,10]]},{w:1,pts:[[-16,27.5],[-19.5,33.5],[-22,37]]}],xh=[[-11,15.5,.85,3.6,3.2,2.3,"thatch"],[-12.5,21.5,1.35,3.4,3.4,2.2,"tile"],[-8.5,9.5,.45,3.2,3,2.1,"thatch"],[11,24.5,-1.45,3.6,3.2,2.3,"tile"],[7.5,28.5,-2.4,3.2,3,2.1,"thatch"],[-8,28.2,2.6,3.4,3.2,2.2,"tile"],[-11.5,36,2,3,3,2.1,"thatch"],[3.5,43,-3,3.2,3,2.1,"tile"],[-2.5,40,3,3,2.8,2,"thatch"],[16.5,17.5,-1.9,3.2,3,2.1,"thatch"],[21,39,-2.4,3.2,3,2.1,"tile"],[-19,18.5,1,3.2,3,2.1,"thatch"]],mx=[{x:Me.x,z:Me.z,r:_r-3},{x:yi.x,z:yi.z+6,r:17},{x:re.x,z:re.z,r:re.r+2},{x:xr.x,z:xr.z,r:6.5},{x:ni.x,z:ni.z,r:11.5},{x:mc.x,z:mc.z,r:5},{x:Ao.x,z:Ao.z,r:7},{x:ys.x,z:ys.z,r:5},{x:Mr.x,z:Mr.z,r:3.5},{x:vr.x,z:vr.z,r:4.5}];function Os(i){return ux+3.2*Math.sin(3*i+.5)+2.1*Math.sin(5*i+1.3)+1.1*Math.sin(9*i+2)}function Ru(i,t,e,n,s,r){const o=s-e,a=r-n,c=Tn(((i-e)*o+(t-n)*a)/(o*o+a*a));return Math.hypot(i-(e+o*c),t-(n+a*c))}function gc(i,t){let e=0;for(const r of px)for(let o=0;o<r.pts.length-1;o++){const[a,c]=r.pts[o],[l,h]=r.pts[o+1],u=Ru(i,t,a,c,l,h),d=1-Ht(fe(u,r.w*.5-.25,r.w*.5+.35));d>e&&(e=d)}const n=Math.hypot(i-yi.x,t-yi.z);e=Math.max(e,1-Ht(fe(n,yi.r-1.2,yi.r+.4)));const s=Math.hypot(i-vr.x,t-vr.z-.8);return e=Math.max(e,.85*(1-Ht(fe(s,1.6,3)))),e}function Hc(i,t){let e=1/0;for(let n=0;n<Rs.length-1;n++)e=Math.min(e,Ru(i,t,...Rs[n],...Rs[n+1]));return e}function se(i,t){const e=Math.hypot(i-Me.x,t-Me.z),n=te*(1-Ht(fe(e,As,_r))),s=Ht(fe(e,As,As+6)),r=.32*Math.sin(i*.21+t*.13)+.22*Math.sin(i*.07-t*.17+1.3)+.12*Math.sin(i*.45+t*.39+.7),o=Math.hypot(i-yi.x,t-yi.z),a=.35+.65*Ht(fe(o,6,14)),c=Math.hypot(i-re.x,t-re.z),l=-1.4*(1-Ht(fe(c,re.r-2,re.r+.8))),h=Math.hypot(i-He.x,t-He.z),u=-.12*(1-Ht(fe(h,He.r-.5,He.r+.5))),d=-.35*(1-Ht(fe(Hc(i,t),.6,1.6)))*Ht(fe(c,re.r-1,re.r+2)),f=Math.hypot(i,t),g=Os(Math.atan2(t,i)),_=-1*Ht(fe(f/g,.93,1));return n+r*s*a+l+u+d+_}const an={grassA:new mt("#86c34f"),grassB:new mt("#6aab3e"),grassDark:new mt("#5b9437"),dirt:new mt("#c9a26a"),court:new mt("#bfb29a"),sand:new mt("#d8c48f"),soil:new mt("#6b4a30"),rockA:new mt("#9a8670"),rockB:new mt("#7a6b5c"),rockC:new mt("#b19b7e"),rockDark:new mt("#5a4f47"),moss:new mt("#6f8a45")},Ie=192,ao=72;function gx(){const i=new $t,t=oi(7),e=[],n=[],s=new mt,r=new Float32Array(Ie),o=[];for(let p=0;p<=ao;p++){const M=Math.pow(p/ao,.85);for(let y=0;y<Ie;y++){const x=y/Ie*Ot,C=Os(x),R=Math.cos(x)*C*M,w=Math.sin(x)*C*M,I=se(R,w);e.push(R,I,w),p===ao&&(r[y]=I,o.push([R,w]));const b=.5+.5*Math.sin(R*.31+w*.17)*Math.sin(R*.11-w*.27+2);s.copy(an.grassA).lerp(an.grassB,b);const v=Math.hypot(R-Me.x,w-Me.z);v>As&&v<_r&&s.lerp(an.grassDark,.25*Math.sin((v-As)/(_r-As)*Math.PI)),s.lerp(an.grassDark,Ht(fe(M,.82,1))*.6);const E=Math.abs(R-Me.x)<Xt.half-.4&&Math.abs(w-Me.z)<Xt.half-.4?1:0;s.lerp(an.court,E*.9);const T=Math.hypot(R-re.x,w-re.z);s.lerp(an.sand,1-Ht(fe(T,re.r-.5,re.r+1.4))),s.lerp(an.sand,.8*(1-Ht(fe(Hc(R,w),.9,1.8)))*Ht(fe(T,re.r,re.r+2))),s.lerp(an.dirt,gc(R,w));const D=(t()-.5)*.04;n.push(s.r+D,s.g+D,s.b+D*.5)}}const a=[];for(let p=0;p<ao;p++)for(let M=0;M<Ie;M++){const y=p*Ie+M,x=p*Ie+(M+1)%Ie,C=(p+1)*Ie+M,R=(p+1)*Ie+(M+1)%Ie;a.push(y,x,C,x,R,C)}const c=new be;c.setAttribute("position",new jt(e,3)),c.setAttribute("color",new jt(n,3)),c.setIndex(a),c.computeVertexNormals();const l=new _e(c,new gn({vertexColors:!0,roughness:.95,flatShading:!0}));l.receiveShadow=!0,l.castShadow=!0,i.add(l);const h=15,u=[],d=[],f=new L(3,-40,-2);for(let p=0;p<=h;p++)for(let M=0;M<Ie;M++){const y=M/Ie*Ot,[x,C]=o[M];let R,w,I;if(p===0)R=x,I=C,w=r[M];else if(p===h)R=f.x,w=f.y,I=f.z;else{const v=(p-1)/(h-1),E=1+.07*Math.sin(7*y+p*1.7)+.05*Math.sin(13*y+p*.9)+(t()-.5)*.06,T=p===1?1.01:Math.pow(1-v,1.05)*E;R=f.x*v+x*T*(1-v*.15),I=f.z*v+C*T*(1-v*.15),w=p===1?r[M]-1.6:-2-36*Math.pow(v,1.25)+(t()-.5)*1.6}if(u.push(R,w,I),p<=1)s.copy(an.soil);else{const v=.5+.5*Math.sin(w*.55+Math.sin(y*5)*.8);s.copy(an.rockA).lerp(an.rockB,v),Math.sin(w*1.3+y*9)>.7&&s.lerp(an.rockC,.6),s.lerp(an.rockDark,Ht(fe(-w,18,40))*.75),p===2&&Math.sin(y*11)>.2&&s.lerp(an.moss,.6)}const b=(t()-.5)*.05;d.push(s.r+b,s.g+b,s.b+b)}const g=[];for(let p=0;p<h;p++)for(let M=0;M<Ie;M++){const y=p*Ie+M,x=p*Ie+(M+1)%Ie,C=(p+1)*Ie+M,R=(p+1)*Ie+(M+1)%Ie;g.push(y,x,C,x,R,C)}const _=new be;_.setAttribute("position",new jt(u,3)),_.setAttribute("color",new jt(d,3)),_.setIndex(g),_.computeVertexNormals();const m=new _e(_,new gn({vertexColors:!0,roughness:1,flatShading:!0}));return m.castShadow=!0,m.receiveShadow=!0,i.add(m),i}function _x(){const i={top:{value:new mt("#4f9fe0")},horizon:{value:new mt("#d5ecf7")},bottom:{value:new mt("#9fc9e8")},sunDir:{value:new L(0,1,0)},sunColor:{value:new mt("#fff2d0")}},t=new Vn({uniforms:i,side:nn,depthWrite:!1,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * p;
      }`,fragmentShader:`
      uniform vec3 top, horizon, bottom, sunDir, sunColor;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 c = h > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 1.0, h), 0.7))
                         : mix(horizon, bottom, smoothstep(0.0, 0.6, -h));
        float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        c += sunColor * (pow(s, 600.0) * 1.2 + pow(s, 12.0) * 0.18);
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`}),e=new _e(new No(600,32,16),t);return e.frustumCulled=!1,e.renderOrder=-10,{dome:e,uniforms:i}}function ya({sectors:i,perSector:t,rMin:e,rMax:n,yMin:s,yMax:r,sizeMin:o,sizeMax:a,seed:c,flat:l=.55,color:h="#ffffff"}){const u=oi(c),d=[];for(let y=0;y<t;y++){const x=u()*(Ot/i),C=e+u()*(n-e),R=s+u()*(r-s),w=o+u()*(a-o),I=3+Math.floor(u()*4),b=[];for(let v=0;v<I;v++)b.push([(u()-.5)*w*2.2,(u()-.3)*w*.5,(u()-.5)*w*1.2,w*(.55+u()*.6)]);d.push({a:x,r:C,y:R,parts:b})}const f=d.reduce((y,x)=>y+x.parts.length,0)*i,g=new ki(z.ico(1,1),new gn({color:h,roughness:1,flatShading:!0,emissive:"#5b6f8a",emissiveIntensity:.18}),f),_=new Qt,m=new _n,p=new sn;let M=0;for(let y=0;y<i;y++)for(const x of d){const C=x.a+y*Ot/i,R=Math.cos(C)*x.r,w=Math.sin(C)*x.r;for(const[I,b,v,E]of x.parts){const T=I*-Math.sin(C)+v*Math.cos(C),D=I*Math.cos(C)+v*Math.sin(C);m.setFromEuler(p.set(0,M*.7,0)),_.compose(new L(R+T,x.y+b,w+D),m,new L(E*1.2,E*l,E)),g.setMatrixAt(M++,_)}}return g.instanceMatrix.needsUpdate=!0,g.castShadow=!1,g.receiveShadow=!1,{mesh:g,sectors:i}}function xx(){const i=new $t,t=[{...ya({sectors:8,perSector:26,rMin:8,rMax:150,yMin:-50,yMax:-41,sizeMin:5,sizeMax:11,seed:3,flat:.5}),dir:1},{...ya({sectors:6,perSector:4,rMin:82,rMax:125,yMin:-4,yMax:22,sizeMin:4,sizeMax:7,seed:11}),dir:-1},{...ya({sectors:5,perSector:5,rMin:70,rMax:190,yMin:48,yMax:70,sizeMin:6,sizeMax:12,seed:23,flat:.3}),dir:1}];for(const e of t)i.add(e.mesh);return{root:i,update(e){for(const n of t)n.mesh.rotation.y=n.dir*(Ot/n.sectors)*(e/Ne)}}}function vx(i){const t=new $t,e=K(z.cone(.14,.7,5),i,[0,0,0],[Math.PI/2,0,0]),n=K(z.ico(.11),i,[0,.04,.36]),s=K(z.cone(.04,.14,4),"#e8a33a",[0,.03,.5],[Math.PI/2,0,0]),r=new be;r.setAttribute("position",new jt([0,0,.18,0,0,-.18,.75,0,-.1],3)),r.computeVertexNormals();const o=xs(i,{side:En}),a=new $t,c=new $t,l=new _e(r,o),h=new _e(r,o);return h.scale.x=-1,a.add(l),c.add(h),a.position.x=.08,c.position.x=-.08,t.add(e,n,s,a,c),t.traverse(u=>u.castShadow=!0),{b:t,wl:a,wr:c}}function Mx(){const i=new $t,t=[],e=oi(99),n=[{cx:Me.x,cz:Me.z,r:22,y:26,n:5,laps:2,color:"#f4f1ea"},{cx:4,cz:14,r:40,y:20,n:6,laps:-1,color:"#3d3a40"},{cx:-10,cz:20,r:14,y:14,n:3,laps:3,color:"#8a5a3b"}];for(const s of n){const r=ae(i,[s.cx,0,s.cz]),o=[];for(let a=0;a<s.n;a++){const c=vx(s.color),l=a/s.n*.9+e()*.15,h=s.r+(e()-.5)*4,u=s.y+(e()-.5)*3;c.b.position.set(Math.sin(l)*h,u,Math.cos(l)*h),c.b.rotation.y=l+(s.laps>0?Math.PI/2:-Math.PI/2),c.b.scale.setScalar(1.3),r.add(c.b),o.push({...c,y:u,off:e(),flaps:70+10*Math.floor(e()*4)})}t.push({g:r,birds:o,laps:s.laps})}return{root:i,update(s){for(const r of t){r.g.rotation.y=Ot*r.laps*s/Ne;for(const o of r.birds){const a=.5+.5*dt(s,6,o.off),c=dt(s,o.flaps,o.off)*(.15+.85*a);o.wl.rotation.z=c*.9,o.wr.rotation.z=-c*.9,o.b.position.y=o.y+dt(s,4,o.off)*.8-c*.05,o.b.rotation.z=(r.laps>0?-1:1)*.25}}}}}const Dn={skyTop:new mt("#4f9fe0"),skyHorizon:new mt("#d8eef8"),skyBottom:new mt("#a8d0ec"),sun:new mt("#fff0d4"),hemiSky:new mt("#cfe8ff"),hemiGround:new mt("#8f7d58"),fog:new mt("#cfe6f4")},Ui={skyTop:new mt("#5a6fb0"),skyHorizon:new mt("#ffc59a"),skyBottom:new mt("#e7a38a"),sun:new mt("#ffa463"),hemiSky:new mt("#b9a6d6"),hemiGround:new mt("#6a5040"),fog:new mt("#f2c6a6")};function yx(i,t){const e=new V_(Dn.hemiSky,Dn.hemiGround,1.25);i.add(e);const n=new Y_(Dn.sun,2.8);n.castShadow=!0,n.shadow.mapSize.set(4096,4096);const s=n.shadow.camera;s.left=-62,s.right=62,s.top=62,s.bottom=-62,s.near=10,s.far=320,n.shadow.bias=-4e-4,n.shadow.normalBias=.04,n.shadow.radius=3,n.target.position.set(0,0,4),i.add(n,n.target),i.fog=new Pc(Dn.fog,160,520);const r=new mt,o=new L,a={dusk:0,glow:0};return{state:a,update(c){const l=.5-.5*Math.cos(Ot*c/Ne),h=Ht(l)*Ht(l);a.dusk=h,a.glow=Ht((h-.35)/.55);const u=Mo.degToRad(58-42*h),d=Mo.degToRad(35-85*h);o.set(Math.cos(u)*Math.sin(d),Math.sin(u),Math.cos(u)*Math.cos(d)),n.position.copy(n.target.position).addScaledVector(o,160),n.color.copy(Dn.sun).lerp(Ui.sun,h),n.intensity=2.8-.9*h,e.color.copy(Dn.hemiSky).lerp(Ui.hemiSky,h),e.groundColor.copy(Dn.hemiGround).lerp(Ui.hemiGround,h),e.intensity=1.25-.35*h,i.fog.color.copy(r.copy(Dn.fog).lerp(Ui.fog,h));const f=t.uniforms;f.top.value.copy(Dn.skyTop).lerp(Ui.skyTop,h),f.horizon.value.copy(Dn.skyHorizon).lerp(Ui.skyHorizon,h),f.bottom.value.copy(Dn.skyBottom).lerp(Ui.skyBottom,h),f.sunDir.value.copy(o),f.sunColor.value.copy(n.color)}}}const Ue="#c3b9a8",er="#a39886",Ye="#d6cdbc",vh="#b3a894",$n="#3b302a",nr="#8a5a35",Jn="#5e3c24",Sx="#b9473d",Mh="#4a69a8";function bx(){const i=new gr,t=new gr,e=oi(42),n=[],s=[],r=te-1,o=Xt.top-r;function a(E,T,D,O,F,N,{merlons:B=!0}={}){const H=Math.hypot(D-E,O-T),tt=(E+D)/2,at=(T+O)/2,ut=Math.atan2(D-E,O-T);i.push([tt,0,at],ut);const Pt=Math.sign(Math.cos(ut)*F-Math.sin(ut)*N)||1;i.box(Ue,[0,r+o/2,0],[Xt.thick,o,H]),i.box(vh,[0,Xt.top+.02,0],[Xt.thick-.1,.06,H]);for(let Vt=r+1.2;Vt<Xt.top-.4;Vt+=1.15)i.box(er,[Pt*(Xt.thick/2+.01),Vt,0],[.04,.12,H-.1]);if(B){const Vt=Math.floor(H/1.3);for(let q=0;q<Vt;q++){const it=-H/2+(q+.5)*(H/Vt);i.box(Le(Ue,e,.05),[Pt*(Xt.thick/2-.22),Xt.top+.42,it],[.44,.85,.68])}i.box(Ue,[Pt*(Xt.thick/2-.22),Xt.top+.1,0],[.44,.2,H]),i.box(er,[-Pt*(Xt.thick/2-.1),Xt.top+.2,0],[.2,.4,H])}i.pop()}const c=Xt.half,{x:l,z:h}=Me,u=Xt.towerR,d=he.width/2;a(l-c+u-.3,h+c,l-d,h+c,0,1),a(l+d,h+c,l+c-u+.3,h+c,0,1),i.box(Ue,[he.x,Xt.top-.75,he.z],[he.width+.2,1.5,Xt.thick]),i.box(vh,[he.x,Xt.top+.02,he.z],[he.width+.2,.06,Xt.thick-.1]);for(let E=0;E<3;E++)i.box(Ue,[he.x-1+E,Xt.top+.42,he.z+.58],[.68,.85,.44]);i.box(er,[he.x,Xt.top+.2,he.z-.7],[he.width,.4,.2]),a(l+c,h+c-u+.3,l+c,h-c+u-.3,1,0),a(l+c-u+.3,h-c,l-c+u-.3,h-c,0,-1),a(l-c,h-c+u-.3,l-c,h+c-u+.3,-1,0);for(let E=-3;E<=3;E++)i.box($n,[he.x+E*.45,Xt.top-2,he.z+.55],[.08,1.2,.08]);i.box($n,[he.x,Xt.top-2.5,he.z+.55],[he.width,.08,.08]),i.box(nr,[he.x-d-.1,r+2.6,he.z-1.3],[.15,3.2,1.5],[0,.35,0]),i.box(nr,[he.x+d+.1,r+2.6,he.z-1.3],[.15,3.2,1.5],[0,-.35,0]);for(const E of[-1,1]){const T=he.x+E*(d+1.3),D=he.z+1.7;i.box(Ye,[T,r+3.7,D],[2.6,7.4,3]);for(let O=0;O<3;O++)i.box(Ye,[T-.85+O*.85,r+7.8,D+1.3],[.5,.8,.4]),i.box(Ye,[T+E*1.1,r+7.8,D-.9+O*.9],[.4,.8,.5]);i.box(Ue,[T,r+7.45,D],[2.6,.1,3]),i.box($n,[T,r+4.8,D+1.51],[.18,.9,.04]),i.box($n,[T,r+2.8,D+1.51],[.18,.7,.04]),i.box("#b8352f",[T,r+5.6,D+1.53],[1.1,1.8,.05]),i.box("#e9c04a",[T,r+5.6,D+1.56],[.25,1.5,.03]),i.add(z.prism(1.1,.4,.05),"#b8352f",[T,r+4.7,D+1.53],[Math.PI,0,0])}i.box(Ye,[he.x,Xt.top-1.3,he.z+.85],[he.width+.6,.4,.3]);for(const[E,T]of dx){const D=Xt.top+3.6;i.add(z.cyl(u,u+.15,D-r,12),Ue,[E,(D+r)/2,T]),i.add(z.cyl(u+.35,u,.6,12),er,[E,D+.1,T]);for(let N=0;N<10;N++){const B=N/10*Math.PI*2;i.add(z.box(.6,.8,.4),Le(Ue,e,.05),[E+Math.cos(B)*(u+.15),D+.8,T+Math.sin(B)*(u+.15)],[0,-B+Math.PI/2,0])}i.add(z.cyl(u-.3,u-.3,.9,12),Ye,[E,D+.6,T]),i.add(z.cone(u+.35,4.2,12),Sx,[E,D+1.05+2.1,T]),i.add(z.cyl(.05,.05,2.4,5),Jn,[E,D+5.2,T]),n.push({pos:new L(E,D+6.35,T),w:1.6,h:.95,color:"#c8372f"});const O=Math.sign(l-E),F=Math.sign(h-T);i.box($n,[E+O*(u-.05),Xt.top+.95,T],[.12,1.9,1]),i.box($n,[E,Xt.top+.95,T+F*(u-.05)],[1,1.9,.12]);for(const N of[.4,2.1,3.7,5.2])i.add(z.box(.16,.9,.1),$n,[E+Math.cos(N)*(u+.08),Xt.top+2.2,T+Math.sin(N)*(u+.08)],[0,-N+Math.PI/2,0]),i.add(z.box(.16,.9,.1),$n,[E+Math.cos(N+.8)*(u+.12),r+3,T+Math.sin(N+.8)*(u+.12)],[0,-N-.8+Math.PI/2,0])}const f=r+Je.h,g=Je.x,_=Je.z,m=Je.w/2,p=Je.d/2;i.box(Ye,[g,(f+r)/2,_],[Je.w,Je.h,Je.d]),i.box(Ue,[g,r+.6,_],[Je.w+.4,1.2,Je.d+.4]),i.box(Ue,[g,f+.15,_],[Je.w+.4,.3,Je.d+.4]);for(let E=0;E<7;E++){const T=-m+.6+E*((Je.w-1.2)/6);i.box(Ye,[g+T,f+.7,_+p+.05],[.65,.8,.45]),i.box(Ye,[g+T,f+.7,_-p-.05],[.65,.8,.45]),i.box(Ye,[g+m+.05,f+.7,_+T],[.45,.8,.65]),i.box(Ye,[g-m-.05,f+.7,_+T],[.45,.8,.65])}for(const[E,T]of[[-1,1],[1,1],[-1,-1]]){const D=g+E*m,O=_+T*p;i.add(z.cyl(.85,.6,2.4,8),Ue,[D,f+.6,O]),i.add(z.cone(1.05,2,8),Mh,[D,f+2.8,O])}const M=g+m-.6,y=_-p+.6,x=f+6.5;i.add(z.cyl(2.1,2.2,x-r,12),Ye,[M,(x+r)/2,y]),i.add(z.cyl(2.45,2.1,.6,12),Ue,[M,x+.1,y]);for(let E=0;E<9;E++){const T=E/9*Math.PI*2;i.add(z.box(.55,.75,.4),Ye,[M+Math.cos(T)*2.25,x+.75,y+Math.sin(T)*2.25],[0,-T+Math.PI/2,0])}i.add(z.cyl(1.8,1.8,.8,12),Ye,[M,x+.6,y]),i.add(z.cone(2.5,5.2,12),Mh,[M,x+1+2.6,y]),i.add(z.cyl(.06,.06,3,5),Jn,[M,x+7.4,y]),n.push({pos:new L(M,x+8.8,y),w:2.6,h:1.5,color:"#2f4f9a"});for(let E=r+3;E<x-1;E+=3.2)t.box("#fff",[M+1.45,E,y+1.5],[.4,.8,.12],[0,Math.PI/4,0]);const C=_+p;i.box(Ue,[oe.x,oe.y-.15,C+.85],[3.8,.3,1.7]);for(const E of[-1.3,0,1.3])i.add(z.box(.35,.7,1.2),er,[oe.x+E,oe.y-.6,C+.5]);for(let E=0;E<=8;E++)i.box(Ye,[oe.x-1.75+E*.4375,oe.y+.42,C+1.62],[.12,.8,.12]);for(let E=1;E<=3;E++)i.box(Ye,[oe.x-1.82,oe.y+.42,C+E*.42],[.12,.8,.12]),i.box(Ye,[oe.x+1.82,oe.y+.42,C+E*.42],[.12,.8,.12]);i.box(Ue,[oe.x,oe.y+.86,C+1.62],[3.8,.12,.22]),i.box(Ue,[oe.x-1.82,oe.y+.86,C+.8],[.22,.12,1.65]),i.box(Ue,[oe.x+1.82,oe.y+.86,C+.8],[.22,.12,1.65]),i.box($n,[oe.x,oe.y+1.05,C+.02],[1.3,2.1,.06]),i.box(Ue,[oe.x,oe.y+2.2,C+.04],[1.7,.25,.1]);for(const E of[-1,1])i.box("#7b2d8c",[oe.x+E*3,oe.y+.6,C+.04],[1.2,3,.05]),i.box("#e9c04a",[oe.x+E*3,oe.y+1.1,C+.07],[.5,.5,.03],[0,0,Math.PI/4]),i.add(z.prism(1.2,.5,.05),"#7b2d8c",[oe.x+E*3,oe.y-.9,C+.04],[Math.PI,0,0]),i.add(z.cyl(.04,.04,1.5,5),Jn,[oe.x+E*3,oe.y+2.1,C+.1],[0,0,Math.PI/2]);i.box(Jn,[g,r+2.3,C+.03],[1.8,2.6,.08]),i.box(Ue,[g,r+3.75,C+.06],[2.3,.3,.12]),i.box(Ue,[g,r+1.15,C+.9],[2.4,.3,1.8]);for(const E of[-1,1])for(const T of[r+4.4,f-1.5])t.box("#fff",[g+E*2.8,T,C+.03],[.6,1,.08]),t.box("#fff",[g+m+.03,T,_+E*2.4],[.08,1,.6]),t.box("#fff",[g-m-.03,T,_+E*2.4],[.08,1,.6]);for(let E=he.z-1;E>C+1.8;E-=.9)i.box(Le("#a99d88",e,.08),[he.x+(e()-.5)*.2,te+.03,E],[1.6,.06,.8]);{const E=l-c+2.6;i.box("#e2d6bd",[E,te+1.2,h-2],[3.2,2.4,11]),i.box(Jn,[E+1.62,te+1.2,h-2],[.06,2.4,.15]),i.add(z.box(3.9,.22,11.6),"#8c5a3c",[E+.1,te+2.75,h-2],[0,0,-.32]);for(const T of[-6,-2,2])i.box(Jn,[E+1.62,te+.9,h+T],[.06,1.7,.9]),t.box("#fff",[E+1.62,te+1.5,h+T+1.3],[.06,.6,.6])}const R=vs.x,w=vs.z;i.box("#8f8577",[R+2.2,te+.55,w-.6],[1.8,1.1,1.4]),i.box("#6c6359",[R+2.2,te+1.15,w-.6],[1.9,.12,1.5]),i.box("#8f8577",[R+2.6,te+2.4,w-1.05],[.8,4.8,.7]),i.box("#6c6359",[R+2.6,te+4.9,w-1.05],[.95,.25,.85]),s.push({pos:new L(R+2.6,te+5.1,w-1.05),dark:!0}),i.box("#4a4a50",[R,te+.35,w+1.1],[.45,.7,.4]),i.box("#55555c",[R,te+.78,w+1.1],[.9,.2,.36]),i.add(z.cone(.18,.4,4),"#55555c",[R+.6,te+.78,w+1.1],[0,0,-Math.PI/2]),i.add(z.cyl(.4,.36,.8,10),nr,[R-1.3,te+.4,w+.4]),i.add(z.cyl(.34,.34,.02,10),"#3d6f8f",[R-1.3,te+.75,w+.4]),i.box(Jn,[R-1.1,te+.9,w-1.6],[1.8,.1,.1]);for(let E=0;E<4;E++)i.add(z.cyl(.03,.03,1.8,4),"#9a9aa2",[R-1.8+E*.45,te+.9,w-1.5],[.15,0,0]);for(const[E,T]of[[-1.2,-2.1],[3.4,-2.1],[-1.2,1.9],[3.4,1.9]])i.add(z.cyl(.08,.08,2.8,5),Jn,[R+E,te+1.4,w+T]);i.add(z.box(5,.12,4.6),"#9b6b44",[R+1.1,te+2.85,w-.1],[.12,0,0]);for(const[E,T]of[[-5.5,-5.2],[-6.1,-4.6],[5.2,-21.5],[6,-22.2],[-5.8,-22]])i.add(z.cyl(.35,.3,.75,8),Le(nr,e,.1),[E,te+.37,T]);i.box("#a8763f",[l-3.4,te+.35,h+9.2],[.7,.7,.7],[0,.4,0]),i.box("#a8763f",[l-3.9,te+.3,h+8.5],[.6,.6,.6],[0,.1,0]),i.add(z.cyl(.8,1,.9,8),"#e2c25d",[l+7.2,te+.45,h-7.5]),i.add(z.cyl(.07,.07,1.8,5),Jn,[l-4.5,te+.9,h-7]),i.box(nr,[l-4.5,te+1.5,h-7],[1,.1,.1]),i.add(z.ico(.28),"#d9c08a",[l-4.5,te+1.95,h-7]),i.add(z.cyl(.25,.3,.7,6),"#d9c08a",[l-4.5,te+1.35,h-7]);const I=new $t;I.add(i.build()),I.add(t.build(kc,{castShadow:!1}));const b=K(z.box(1.2,.18,.9),"#ff7a2a",[R+2.2,te+1.25,w-.6],[0,0,0],1,{emissive:"#ff5a10",emissiveIntensity:2});b.castShadow=!1,I.add(b);const v=new W_("#ff8a3a",6,7,1.6);return v.position.set(R+2.2,te+1.9,w-.2),I.add(v),{group:I,flags:n,smoke:s,fire:b,forgeLight:v}}const yh=["#f1e6cc","#ece0c0","#f5ead6","#e8d9b8"],ti="#6b4528",Ex="#d4ac62",wx="#b5523b",_i="#8a5a35",je="#5e3c24",Sh="#a8a092",_c=(i,t,e=1,n=1)=>Math.min(se(i-e/2,t-n/2),se(i+e/2,t-n/2),se(i-e/2,t+n/2),se(i+e/2,t+n/2),se(i,t));function Sa(i,t,e,n,s,r,o,a,c,l,{chimney:h=!0,plaster:u}={}){const d=_c(n,s,o,a),f=u||yh[Math.floor(e()*yh.length)],g=Le(l==="thatch"?Ex:wx,e,.08);i.push([n,d,s],r),t.push([n,d,s],r);const _=.2+c;i.box(Sh,[0,-.25,0],[o+.3,.9,a+.3]),i.box(f,[0,.2+c/2,0],[o,c,a]);for(const w of[-1,1])for(const I of[-1,1])i.box(ti,[w*(o/2),.2+c/2,I*(a/2)],[.16,c,.16]);for(const w of[-1,1])i.box(ti,[0,_-.06,w*(a/2+.01)],[o,.14,.06]),i.box(ti,[0,.2+c*.5,w*(a/2+.01)],[o,.1,.05]);for(const w of[-1,1])i.box(ti,[w*(o/2+.01),_-.06,0],[.06,.14,a]),i.add(z.box(.05,.1,Math.hypot(c*.5,a/2)*.95),ti,[w*(o/2+.01),.2+c*.25,-a/4],[Math.atan2(c*.5,a/2),0,0]);const m=o*.48,p=o/2+.4;i.add(z.prism(o,m*(o/2)/p+.02,a),f,[0,_,0]);const M=Math.hypot(p,m),y=Math.atan2(m,p);for(const w of[-1,1])i.add(z.box(M+.12,l==="thatch"?.32:.2,a+.6),g,[w*p/2,_+m/2-.05,0],[0,0,-w*y]);i.add(z.box(.26,.26,a+.7),Le(g,e,.1),[0,_+m-.02,0],[0,0,Math.PI/4]);const x=o>3.3?-o*.18:0;i.box(je,[x,.85,a/2+.04],[.8,1.35,.08]),i.box(ti,[x,1.56,a/2+.06],[.95,.1,.08]),i.box(Sh,[x,.12,a/2+.35],[1,.18,.5]),i.box("#c7a24a",[x+.25,.85,a/2+.09],[.06,.06,.04]);const C=[];x!==0&&C.push([o*.22,1.3,a/2+.03,0]),C.push([o/2+.03,1.3,0,Math.PI/2],[-o/2-.03,1.3,0,Math.PI/2],[0,1.3,-a/2-.03,0]);for(const[w,I,b,v]of C){t.add(z.box(.55,.55,.05),"#fff",[w,I,b],[0,v,0]);const E=Math.cos(v),T=-Math.sin(v);i.add(z.box(.68,.08,.08),ti,[w,I-.32,b],[0,v,0]),i.add(z.box(.68,.08,.08),ti,[w,I+.32,b],[0,v,0]),i.add(z.box(.26,.6,.05),"#4f7a3a",[w+E*.44,I,b+T*.44],[0,v,0]),i.add(z.box(.26,.6,.05),"#4f7a3a",[w-E*.44,I,b-T*.44],[0,v,0])}if(x!==0){i.box(_i,[o*.22,.92,a/2+.15],[.7,.16,.22]);for(let w=0;w<4;w++)i.add(z.ico(.08),["#e0475a","#f2c94c","#ffffff","#d16ad9"][w],[o*.22-.24+w*.16,1.05,a/2+.16])}let R=null;if(h){const w=o/2-.6,I=_+m*(1-w/p);i.box("#9c8f80",[w,(_+I+.9)/2,-a/4],[.5,I+.9-_,.5]),i.box("#7d7266",[w,I+.92,-a/4],[.6,.12,.6]),R=i.world([w,I+1,-a/4])}return i.pop(),t.pop(),R}function Tx(){const i=new $t,t=new gr,e=new gr,n=oi(1234),s=[],r={};for(const[T,D,O,F,N,B,H]of xh){const tt=Sa(t,e,n,T,D,O,F,N,B,H);tt&&n()<.8&&s.push({pos:tt})}{const{x:T,z:D,yaw:O}=oo;s.push({pos:Sa(t,e,n,T,D,O,4.2,3.6,2.5,"tile",{plaster:"#f3dfb5"})});const F=_c(T,D,4,4);t.push([T,F,D],O),t.add(z.cyl(.04,.04,.9,4),ti,[1.6,2.05,2.2],[Math.PI/2,0,0]),t.box(_i,[1.6,1.7,2.6],[.75,.5,.06]),t.add(z.sphere(.2,8,5),"#c58a3e",[1.6,1.7,2.65],[0,0,0],[1.4,.7,.4]),t.add(z.sphere(.95,10,6,0),"#c9a07a",[-3,.2,.7],[0,0,0],[1,.85,1]),t.box("#9c8f80",[-3,.1,.7],[2.1,.3,2.1]),t.box("#2b1d16",[-3,.55,1.6],[.6,.5,.12]),t.box(_i,[1.4,.75,3],[1.4,.1,.7]);for(const[N,B]of[[-.6,-.25],[.6,-.25],[-.6,.25],[.6,.25]])t.box(je,[1.4+N,.37,3+B],[.08,.75,.08]);for(let N=0;N<5;N++)t.add(z.sphere(.13,7,5),"#c98a3c",[.9+N*.25,.86,3+N%2*.15-.07],[0,.4*N,0],[1.5,.75,1]);r.ovenGlow=t.world([-3,.55,1.67]),r.bakeryDoor=t.world([-4.2*.18,0,2.6]),r.bakeryYaw=O,t.pop()}{const{x:T,z:D,yaw:O}=mc;Sa(t,e,n,T,D,O,5.6,6.5,3.2,"tile",{chimney:!1,plaster:"#a5452f"});const F=_c(T,D,5,6);t.push([T,F,D],O),t.box("#7a3322",[0,1.4,3.27],[2.2,2.4,.06]),t.box("#f0e6d0",[0,1.4,3.31],[2.2,.12,.03],[0,0,.83]),t.box("#f0e6d0",[0,1.4,3.31],[2.2,.12,.03],[0,0,-.83]),t.add(z.cyl(.7,.8,.9,8),"#e2c25d",[3.6,.45,1.5]),t.add(z.cyl(.7,.8,.9,8),"#d9b94f",[3.4,.45,-.2]),t.pop()}{const T=se(bn.x,bn.z);t.push([bn.x,T,bn.z],0),t.add(z.cyl(.95,1,.9,12),"#a59c8d",[0,.45,0]),t.add(z.cyl(1.02,1.02,.12,12),"#8e8678",[0,.92,0]),t.add(z.cyl(.78,.78,.02,12),"#1f2a33",[0,.97,0]);for(const F of[-1,1])t.box(_i,[F*.95,1.45,0],[.16,1.9,.16]);t.add(z.cyl(.07,.07,2.1,6),je,[0,1.45,0],[0,0,Math.PI/2]),t.add(z.cyl(.17,.17,.7,8),"#b08a5a",[0,1.45,0],[0,0,Math.PI/2]),t.add(z.prism(2.5,.8,1.6),"#8c5a3c",[0,2.35,0],[0,Math.PI/2,0]),t.pop();const D=ae(i,[bn.x+1.08,T+1.45,bn.z]);D.add(K(z.box(.06,.06,.42),je,[.02,0,.21])),D.add(K(z.cyl(.035,.035,.3,5),_i,[.15,0,.4],[0,0,Math.PI/2])),r.well={crank:D,drumY:T+1.45,rimY:T+.97,g:T};const O=se(ds.x,ds.z);t.push([ds.x,O,ds.z],0),t.box(_i,[0,.3,0],[1.7,.55,.65]),t.box("#3f87b5",[0,.52,0],[1.5,.06,.45]);for(const F of[-1,1])t.box(je,[F*.75,.15,0],[.12,.3,.8]);t.pop(),r.trough={x:ds.x,y:O+.55,z:ds.z}}{const{x:T,z:D,yaw:O}=On,F=se(T,D);t.push([T,F,D],O),t.box(_i,[0,.5,0],[2.4,.95,.9]),t.box("#a7774a",[0,1,.05],[2.6,.08,1.05]);for(const B of[-1.2,1.2])t.box(je,[B,1.3,.45],[.1,2.6,.1]),t.box(je,[B,1.2,-.5],[.1,2.4,.1]);for(let B=0;B<6;B++)t.add(z.box(.45,.06,1.5),B%2?"#f4efe4":"#c8443b",[-1.125+B*.45,2.55,0],[.35,0,0]);const N=[["#d8402f",.09],["#7fbf3f",.12],["#f0a03a",.1],["#9b3fb0",.08]];for(let B=0;B<4;B++){t.box(je,[-.9+B*.6,1.1,.1],[.5,.12,.5]);for(let H=0;H<4;H++)t.add(z.ico(N[B][1]),N[B][0],[-.98+B*.6+H%2*.16,1.22+Math.floor(H/2)*.08,.04+H%2*.14])}t.add(z.cyl(.3,.25,.55,8),"#b07c43",[1.7,.27,.6]),t.add(z.cyl(.3,.25,.55,8),"#a6733d",[1.6,.27,-.2]),r.stallFront=t.world([0,0,1.6]),r.stallBack=t.world([.2,0,-1]),t.pop()}{const{x:T,z:D,w:O,d:F}=xr,N=[],B=(ht,J,xt,Rt)=>{const Ut=Math.hypot(xt-ht,Rt-J),Kt=Math.ceil(Ut/1.3);for(let st=0;st<=Kt;st++)N.push([ht+(xt-ht)*st/Kt,J+(Rt-J)*st/Kt]);const Q=Math.atan2(xt-ht,Rt-J),ot=(ht+xt)/2,U=(J+Rt)/2,At=se(ot,U);t.add(z.box(.07,.1,Ut),"#9b7149",[ot,At+.45,U],[0,Q,0]),t.add(z.box(.07,.1,Ut),"#9b7149",[ot,At+.85,U],[0,Q,0])},H=T-O/2,tt=T+O/2,at=D-F/2,ut=D+F/2;B(H,at,tt,at),B(tt,at,tt,ut),B(tt,ut,H+2.2,ut),B(H,ut,H,at),t.add(z.box(.07,.1,1.2),"#9b7149",[H+.9,se(H+1,ut)+.5,ut+.35],[0,1.1,0]);for(const[ht,J]of N)t.add(z.box(.14,1.1,.14),"#7a5434",[ht,se(ht,J)+.45,J]);const Pt=se(tt-1.2,at+.8);t.box(_i,[tt-1.2,Pt+.18,at+.8],[1.3,.35,.5]),t.box("#c8a050",[tt-1.2,Pt+.33,at+.8],[1.1,.06,.32]),t.add(z.cyl(.8,.95,.7,8),"#e2c25d",[H+1.2,se(H+1.2,at+1.2)+.35,at+1.2]);const Vt=new To(He.r,20),q=Vt.attributes.position;for(let ht=1;ht<q.count;ht++){const J=Math.atan2(q.getY(ht),q.getX(ht)),xt=1+.16*Math.sin(3*J+1)+.1*Math.sin(5*J+2);q.setXY(ht,q.getX(ht)*xt*1.15,q.getY(ht)*xt*.9)}const it=new _e(Vt,new gn({color:"#6b4a2e",roughness:.35,metalness:.05,flatShading:!0}));it.rotation.x=-Math.PI/2,it.position.set(He.x,se(He.x,He.z)+.06,He.z),it.receiveShadow=!0,i.add(it)}{const{x:T,z:D}=Mr,O=se(T,D);t.push([T,O,D],-.6);for(const[F,N]of[[-.7,-.6],[.7,-.6],[-.7,.6],[.7,.6]])t.box(je,[F,.35,N],[.1,.7,.1]);t.box("#d7b98a",[0,1.2,0],[1.6,1,1.4]),t.add(z.prism(1.9,.75,1.7),"#a8432f",[0,1.7,0],[0,Math.PI/2,0]),t.box("#3b2a20",[0,1.05,.71],[.4,.45,.04]),t.add(z.box(.45,.05,1.1),"#9b7149",[0,.38,1.15],[.65,0,0]),t.pop()}const o=[];{const{x:T,z:D,w:O,d:F}=ni,N=9,B=new ks(O,F,N*4,34);B.rotateX(-Math.PI/2);const H=B.attributes.position,tt=[],at=new mt("#7a5232"),ut=new mt("#946640");for(let J=0;J<H.count;J++){const xt=H.getX(J),Rt=H.getZ(J),Ut=T+xt,Kt=D+Rt,Q=(xt+O/2)/(O/N)%1,ot=Math.sin(Q*Math.PI);H.setY(J,se(Ut,Kt)+.06+ot*.12);const U=at.clone().lerp(ut,ot);tt.push(U.r,U.g,U.b)}B.setAttribute("color",new jt(tt,3)),B.computeVertexNormals();const Pt=new _e(B,new gn({vertexColors:!0,roughness:1,flatShading:!0}));Pt.position.set(T,0,D),Pt.receiveShadow=!0,i.add(Pt);const Vt=["wheat","wheat","cabbage","carrot","wheat","cabbage","wheat","carrot","wheat"];for(let J=0;J<N;J++){const xt=T-O/2+(J+.5)*(O/N);for(let Rt=D-F/2+.5;Rt<D+F/2-.3;Rt+=.62){const Ut=xt+(n()-.5)*.15;o.push({kind:Vt[J],x:Ut,z:Rt,y:se(Ut,Rt)+.16,s:.8+n()*.4,row:J})}}r.fieldRows=Array.from({length:N},(J,xt)=>T-O/2+(xt+.5)*(O/N));for(let J=0;J<=16;J++){const xt=D-F/2-.6+J/16*(F+1.2);for(const Rt of[T-O/2-.6,T+O/2+.6])t.box("#7a5434",[Rt,se(Rt,xt)+.4,xt],[.12,.9,.12])}for(const J of[T-O/2-.6,T+O/2+.6])t.add(z.box(.06,.08,F+1.2),"#9b7149",[J,se(J,D)+.6,D]);const q=T+O/2-2.9,it=D-3.5,ht=se(q,it);t.box(je,[q,ht+1,it],[.1,2.1,.1]),t.box(je,[q,ht+1.55,it],[1.5,.08,.08]),t.box("#5c7fa8",[q,ht+1.4,it],[.6,.65,.35]),t.add(z.ico(.24),"#e3c98b",[q,ht+2,it]),t.add(z.cone(.38,.35,8),"#b8862e",[q,ht+2.25,it]),t.add(z.cyl(.42,.42,.04,8),"#b8862e",[q,ht+2.1,it])}const a=[{kind:"wheat",g:(()=>{const T=new vi(.17,.75,5);return T.translate(0,.37,0),T})(),color:"#e8c25a"},{kind:"cabbage",g:z.ico(.22,0),color:"#6fbf4a"},{kind:"carrot",g:(()=>{const T=new vi(.12,.38,4);return T.translate(0,.19,0),T})(),color:"#4f9e3a"}];for(const T of a){const D=o.filter(B=>B.kind===T.kind),O=new ki(T.g,xs("#ffffff"),D.length),F=new Qt,N=new mt;D.forEach((B,H)=>{F.compose(new L(B.x,B.y,B.z),new _n().setFromEuler(new sn(0,B.s*7,0)),new L(B.s,B.s,B.s)),O.setMatrixAt(H,F),O.setColorAt(H,N.set(Le(T.color,n,.12)))}),O.castShadow=!0,O.receiveShadow=!0,i.add(O)}{const T=new _e(new To(re.r+.9,28),new gn({color:"#4aa3c9",roughness:.12,metalness:.1,transparent:!0,opacity:.85,flatShading:!0}));T.rotation.x=-Math.PI/2,T.position.set(re.x,-.32,re.z),T.receiveShadow=!0,i.add(T),r.waterY=-.32;for(let F=0;F<7;F++){const N=n()*Ot,B=re.r*(.35+n()*.5);t.add(z.cyl(.32,.32,.03,7),"#5c9e3c",[re.x+Math.cos(N)*B,-.29,re.z+Math.sin(N)*B]),F%3===0&&t.add(z.ico(.08),"#f6b5d0",[re.x+Math.cos(N)*B,-.22,re.z+Math.sin(N)*B])}for(let F=0;F<46;F++){const N=n()*Ot;if(Math.cos(N)>.75&&Math.abs(Math.sin(N))<.4)continue;const B=re.r+.2+n()*.9,H=re.x+Math.cos(N)*B,tt=re.z+Math.sin(N)*B,at=.7+n()*.6;t.add(z.cone(.05,at,3),Le("#5f8f3a",n,.1),[H,se(H,tt)+at/2-.1,tt]),n()<.3&&t.add(z.cyl(.05,.05,.18,5),"#6b4226",[H,se(H,tt)+at-.05,tt])}const D=re.x+re.r+1.4,O=re.z+.6;for(let F=0;F<6;F++)t.box(Le("#9b7149",n,.1),[D-F*.5,.12,O],[.45,.08,1.3]);for(const[F,N]of[[.5,.6],[.5,-.6],[2.6,.6],[2.6,-.6]])t.box(je,[D-F,-.4,O+N],[.12,1.2,.12]);r.dock={x:D-2.6,y:.16,z:O}}{const{x:T,z:D,yaw:O}=vr,F=se(T,D);t.push([T,F,D],O),t.add(z.cyl(.36,.42,.45,9),"#8b6239",[0,.22,1.05]),t.add(z.cyl(.34,.34,.02,9),"#d8b27a",[0,.455,1.05]);for(let N=0;N<3;N++)for(let B=0;B<4-N;B++)t.add(z.cyl(.17,.17,1.2,7),Le("#8b5e34",n,.1),[1.55+(B+N*.5-1.5)*.34,.17+N*.29,.1],[Math.PI/2,0,0]);for(const N of[-1,1])t.box(je,[1.55+N*.78,.4,.1],[.08,.8,.08]);for(const N of[-1,1]){t.add(z.ico(.55,0),"#b9874f",[N*.95,0,1.15],[0,N,0],[1.1,.42,.9]);for(let B=0;B<5;B++)t.add(z.box(.12,.12,.5),Le("#d2a46a",n,.1),[N*(.8+n()*.4),.18+n()*.06,.95+n()*.4],[0,n()*3,.2])}t.box(je,[-2.2,1,-1.2],[.12,2,.12]),t.box(je,[.2,1,-1.2],[.12,2,.12]),t.add(z.box(3,.12,1.6),"#8c5a3c",[-1,2,-1.6],[-.25,0,0]);for(let N=0;N<6;N++)t.add(z.cyl(.16,.16,.6,6),Le("#c99a5f",n,.1),[-2+N*.35,.18+N%2*.3,-1.7],[Math.PI/2,0,0]);t.pop(),r.wood={x:T,z:D,yaw:O,g:F}}const c=[],l=(T,D)=>xh.some(([O,F])=>Math.hypot(O-T,F-D)<3.6),h=(T,D)=>mx.some(O=>Math.hypot(O.x-T,O.z-D)<O.r);c.push({x:Ms.x,z:Ms.z,kind:"round",s:1.7});let u=0;for(;c.length<190&&u++<6e3;){const T=n()*Ot,D=Os(T),O=Math.sqrt(n())*D*.95,F=Math.cos(T)*O,N=Math.sin(T)*O;if(h(F,N)||l(F,N)||gc(F,N)>.05||Hc(F,N)<1.6||Math.hypot(F-oo.x,N-oo.z)<6||Math.hypot(F-On.x,N-On.z)<3||Math.hypot(F-Ms.x,N-Ms.z)<4.5||c.some(tt=>Math.hypot(tt.x-F,tt.z-N)<2.1))continue;const B=Math.max(Math.min(1,(-F-14)/14),Math.min(1,(-N-26)/10),O/D>.85?.7:0);if(n()>.12+.88*B)continue;const H=Math.hypot(F-Me.x,N-Me.z);c.push({x:F,z:N,kind:n()<(H<_r+6?.4:.6)?"pine":"round",s:.75+n()*.6})}const d=new ki(z.cyl(.16,.24,1.6,6),xs("#7a5232"),c.length),f=(()=>{const T=[new vi(1.25,2,7).translate(0,1,0),new vi(.95,1.7,7).translate(0,2,0),new vi(.6,1.3,7).translate(0,2.9,0)],D=new be,O=[];for(const F of T){const N=F.toNonIndexed();O.push(...N.attributes.position.array)}return D.setAttribute("position",new jt(O,3)),D.computeVertexNormals(),D})(),g=(()=>{const T=[new Ts(1.25,0).translate(0,1.1,0),new Ts(.85,0).translate(.6,1.6,.2),new Ts(.8,0).translate(-.5,1.5,-.3)],D=[];for(const F of T)D.push(...F.toNonIndexed().attributes.position.array);const O=new be;return O.setAttribute("position",new jt(D,3)),O.computeVertexNormals(),O})(),_=c.filter(T=>T.kind==="pine"),m=c.filter(T=>T.kind==="round"),p=new ki(f,xs("#ffffff"),_.length),M=new ki(g,xs("#ffffff"),m.length),y=new Qt,x=new _n,C=new sn,R=new L,w=new L,I=new mt;c.forEach((T,D)=>{T.y=se(T.x,T.z)-.1,T.phase=n(),T.yaw=n()*Ot,y.compose(R.set(T.x,T.y+.8*T.s,T.z),x.identity(),w.set(T.s,T.s,T.s)),d.setMatrixAt(D,y)}),_.forEach((T,D)=>p.setColorAt(D,I.set(Le("#3f8a4a",n,.12)))),m.forEach((T,D)=>M.setColorAt(D,I.set(Le(D===0?"#5fae45":"#68b24a",n,.14))));for(const T of[d,p,M])T.castShadow=!0,T.receiveShadow=!0,i.add(T);const b=T=>{const D=.035*dt(T.time,6,T.phase)+.015*dt(T.time,15,T.phase*2);C.set(D,T.yaw,D*.6),x.setFromEuler(C),y.compose(R.set(T.x,T.y+1.4*T.s,T.z),x,w.set(T.s,T.s,T.s))},v=T=>{_.forEach((D,O)=>{D.time=T,b(D),p.setMatrixAt(O,y)}),m.forEach((D,O)=>{D.time=T,b(D),M.setMatrixAt(O,y)}),p.instanceMatrix.needsUpdate=!0,M.instanceMatrix.needsUpdate=!0};v(0);{const T=(F,N)=>!l(F,N)&&gc(F,N)<.2&&Math.hypot(F-re.x,N-re.z)>re.r+.8&&!(Math.abs(F-ni.x)<ni.w/2+1&&Math.abs(N-ni.z)<ni.d/2+1)&&!(Math.abs(F-Me.x)<11.5&&Math.abs(N-Me.z)<11.5)&&Math.hypot(F-He.x,N-He.z)>He.r+.4,D=(F,N)=>{for(let B=0,H=0;B<F&&H<F*8;H++){const tt=n()*Ot,at=Math.sqrt(n())*Os(tt)*.95,ut=Math.cos(tt)*at,Pt=Math.sin(tt)*at;T(ut,Pt)&&(N(ut,Pt,se(ut,Pt)),B++)}};D(45,(F,N,B)=>t.add(z.dode(.3+n()*.5),Le("#9a958c",n,.1),[F,B+.05,N],[n(),n(),n()],[1,.6+n()*.4,1])),D(70,(F,N,B)=>t.add(z.ico(.45+n()*.3,0),Le("#4f9a3c",n,.12),[F,B+.2,N],[n(),n(),0],[1,.75,1]));const O=["#f7f3e8","#f2c94c","#e0475a","#b77fe0","#ff9f4a"];D(520,(F,N,B)=>{n()<.55?t.add(z.cone(.09,.4,3),Le("#5aa33e",n,.15),[F,B+.15,N],[0,n()*3,0]):(t.add(z.ico(.07),O[Math.floor(n()*O.length)],[F,B+.18,N]),t.add(z.cone(.03,.2,3),"#4f8f36",[F,B+.08,N]))})}i.add(t.build()),i.add(e.build(kc,{castShadow:!1}));const E=K(z.box(.5,.4,.04),"#ff8a3a",[r.ovenGlow.x,r.ovenGlow.y,r.ovenGlow.z],[0,oo.yaw,0],1,{emissive:"#ff6a1a",emissiveIntensity:1.6});return i.add(E),{root:i,smoke:s,anchors:r,updateTrees:v,ovenGlow:E}}function Ax(i){const t=document.createElement("canvas");t.width=128,t.height=80;const e=t.getContext("2d");e.fillStyle=i,e.fillRect(0,0,128,80),e.fillStyle="#f2c94c",e.fillRect(0,0,128,7),e.fillRect(0,73,128,7),e.beginPath(),e.moveTo(42,54),e.lineTo(38,26),e.lineTo(52,40),e.lineTo(64,20),e.lineTo(76,40),e.lineTo(90,26),e.lineTo(86,54),e.closePath(),e.fill(),e.fillRect(42,56,44,6);const n=new Lc(t);return n.colorSpace=ln,n}function Rx(i){const t=new $t,e=i.map((n,s)=>{const r=new ks(n.w,n.h,12,5);r.translate(n.w/2,-n.h/2,0);const o=Float32Array.from(r.attributes.position.array),a=new _e(r,new gn({map:Ax(n.color),side:En,roughness:.8,flatShading:!0}));return a.position.copy(n.pos),a.castShadow=!0,t.add(a),{g:r,base:o,w:n.w,phase:s*.13}});return{root:t,update(n){for(const s of e){const r=s.g.attributes.position,o=r.array,a=Ot/(s.w*.85);for(let c=0;c<r.count;c++){const l=s.base[c*3],h=s.base[c*3+1],u=l/s.w,d=Ot*(n*70/Ne+s.phase)-a*l;o[c*3+2]=Math.sin(d)*.22*u*s.w*.35+Math.sin(d*.5+h)*.04*u,o[c*3+1]=h-u*u*.08*s.w+Math.cos(d)*.03*u,o[c*3]=l*(1-.04*u*(1+Math.cos(d)))}r.needsUpdate=!0,s.g.computeVertexNormals()}}}}function Cx(i){const n=new ki(z.ico(1,0),new gn({color:"#ffffff",roughness:1,flatShading:!0}),i.length*7);n.castShadow=!1;const s=oi(5),r=new mt,o=i.map((d,f)=>{const g=s();for(let _=0;_<7;_++)n.setColorAt(f*7+_,r.set(d.dark?Le("#8d8781",s,.06):Le("#eeebe6",s,.04)));return{...d,seed:g,big:d.dark?1.3:1}}),a=new Qt,c=new _n,l=new sn,h=new L,u=new L;return{mesh:n,update(d){let f=0;for(const g of o)for(let _=0;_<7;_++){const m=we(d,12,_/7+g.seed),p=Ht(m/.12)*(1-Ht((m-.55)/.45)),M=(.18+.6*m)*p*g.big;h.set(g.pos.x+m*2.2+.25*Math.sin(m*7+g.seed*9),g.pos.y+m*4.2,g.pos.z+.3*Math.sin(m*5+g.seed*5)),c.setFromEuler(l.set(m*2,g.seed*6+m,0)),a.compose(h,c,u.set(M,M*.85,M)),n.setMatrixAt(f++,a)}n.instanceMatrix.needsUpdate=!0}}}function bh(i){const n=document.createElement("canvas");n.width=64,n.height=256;const s=n.getContext("2d"),r=s.createImageData(64,256),o=oi(i),a=new Float32Array(64*256*2);for(let l=0;l<64*256;l++)a[l*2+1]=.55;for(let l=0;l<110;l++){const h=Math.floor(o()*64),u=Math.floor(o()*256),d=20+o()*90,f=1+Math.floor(o()*3),g=.4+o()*.6;for(let _=0;_<d;_++){const m=(u+_)%256,p=Math.sin(_/d*Math.PI);for(let M=0;M<f;M++){const y=(h+M)%64,x=(m*64+y)*2;a[x]=Math.min(1,a[x]+g*p),a[x+1]=Math.min(1,a[x+1]+.4*p)}}}for(let l=0;l<64*256;l++)r.data[l*4]=a[l*2]*255,r.data[l*4+1]=a[l*2+1]*255,r.data[l*4+2]=0,r.data[l*4+3]=255;s.putImageData(r,0,0);const c=new Lc(n);return c.wrapS=c.wrapT=xo,c.colorSpace=ei,c}function Eh(i,{color:t="#8fd3f5",repeat:e=6,opacity:n=.9,fadeEnd:s=!0}){return new Vn({uniforms:{map:{value:i},uOffset:{value:0},uRepeat:{value:e},uColor:{value:new mt(t)},uOpacity:{value:n},uFadeEnd:{value:s?1:0},uLight:{value:1}},transparent:!0,depthWrite:!1,side:En,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform sampler2D map;
      uniform float uOffset, uRepeat, uOpacity, uFadeEnd, uLight;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(map, vec2(vUv.x, vUv.y * uRepeat - uOffset));
        float edge = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
        float fade = smoothstep(0.0, 0.015, vUv.y) * mix(1.0, 1.0 - smoothstep(0.72, 1.0, vUv.y), uFadeEnd);
        vec3 c = mix(uColor, vec3(1.0), tex.r * 0.85) * uLight;
        gl_FragColor = vec4(c, tex.g * edge * fade * uOpacity);
        #include <colorspace_fragment>
      }`})}function wh(i,t,e){const n=[],s=[],r=[];let o=0;const a=[0];for(let l=1;l<i.length;l++)o+=i[l].distanceTo(i[l-1]),a.push(o);for(let l=0;l<i.length;l++){const h=i[l],u=e[l],d=t[l]/2;if(n.push(h.x-u.x*d,h.y-u.y*d,h.z-u.z*d,h.x+u.x*d,h.y+u.y*d,h.z+u.z*d),s.push(0,a[l]/o,1,a[l]/o),l>0){const f=(l-1)*2;r.push(f,f+1,f+2,f+1,f+3,f+2)}}const c=new be;return c.setAttribute("position",new jt(n,3)),c.setAttribute("uv",new jt(s,2)),c.setIndex(r),{g:c,total:o}}function Px(){const i=new $t,t=new gr,e=oi(77),n=[],s=bh(1),r=bh(2),o=[];for(let h=0;h<Rs.length-1;h++){const[u,d]=Rs[h],[f,g]=Rs[h+1],_=Math.ceil(Math.hypot(f-u,g-d)/.8);for(let m=0;m<_;m++){const p=u+(f-u)*m/_,M=d+(g-d)*m/_;if(Math.hypot(p,M)>Os(Math.atan2(M,p))*.985)break;o.push(new L(p,Math.max(se(p,M),-.33)+.06,M))}}const a=o[o.length-1],l=[{theta:Math.atan2(a.z,a.x),width:1.9,fromStream:!0},{theta:-.95,width:2.4},{theta:.52,width:2},{theta:-2.25,width:2.8}];{const h=o.map((_,m)=>{const p=o[Math.max(0,m-1)],M=o[Math.min(o.length-1,m+1)],y=new L().subVectors(M,p).setY(0).normalize();return new L(-y.z,0,y.x)}),{g:u,total:d}=wh(o,o.map(()=>1.5),h),f=Eh(s,{color:"#5fb7dc",repeat:d/3,opacity:1,fadeEnd:!1}),g=new _e(u,f);g.renderOrder=2,i.add(g),n.push({m:f,cycles:14})}for(const h of l){const u=Os(h.theta),d=new L(Math.cos(h.theta),0,Math.sin(h.theta)),f=new L(-d.z,0,d.x),g=[],_=[];if(h.fromStream)g.push(a.clone().addScaledVector(d,-.6));else{const C=d.clone().multiplyScalar(u*.925),R=se(C.x,C.z);for(let w=0;w<7;w++){const I=f.clone().multiplyScalar((w-3)*.55).addScaledVector(d,-.6-e()*.8);t.add(z.dode(.55+e()*.5),Le("#8f877b",e,.12),[C.x+I.x,R+.1,C.z+I.z],[e(),e(),e()])}g.push(new L(C.x,R+.12,C.z))}_.push(h.width*.8);const m=g[0].clone(),p=d.clone().multiplyScalar(u);for(let C=1;C<=5;C++){const R=m.clone().lerp(p,C/5);g.push(new L(R.x,Math.max(se(R.x*.995,R.z*.995),-.3)+.12,R.z)),_.push(h.width*(.8+.2*(C/5)))}const M=g[g.length-1].clone(),y=26;for(let C=1;C<=y;C++){const R=C/y,w=3.2*Math.pow(R,.55),I=M.y-.6*R-46*Math.pow(R,1.5);g.push(M.clone().addScaledVector(d,w).setY(I)),_.push(h.width*(1+.9*R))}const x=g.map(()=>f);for(const C of[{tex:s,cycles:44,offset:.02,scale:1,opacity:.95,color:"#9ad8f2"},{tex:r,cycles:31,offset:-.12,scale:1.25,opacity:.55,color:"#bfe6f7"}]){const R=g.map(E=>E.clone().addScaledVector(d,C.offset)),{g:w,total:I}=wh(R,_.map(E=>E*C.scale),x),b=Eh(C.tex,{color:C.color,repeat:I/7,opacity:C.opacity}),v=new _e(w,b);v.renderOrder=3,i.add(v),n.push({m:b,cycles:C.cycles})}for(let C=0;C<3;C++){const R=new _e(z.ico(.45,0),new gn({color:"#ffffff",roughness:1,flatShading:!0,transparent:!0,opacity:.85}));R.position.copy(M).addScaledVector(f,(C-1)*h.width*.35).addScaledVector(d,.5).add(new L(0,-.4,0)),i.add(R),n.push({foam:R,base:R.position.y,i:C})}}return i.add(t.build()),{root:i,update(h,u=1){for(const d of n)if(d.m)d.m.uniforms.uOffset.value=we(h,d.cycles),d.m.uniforms.uLight.value=u;else{const f=.8+.25*dt(h,40,d.i/3);d.foam.scale.set(f*1.3,f,f),d.foam.position.y=d.base+.1*dt(h,40,d.i/3+.25)}}}}const Th=.72;function Qe(i={}){const t={skin:"#f0c8a0",shirt:"#6a8fbf",pants:"#6b5640",boots:"#4a3526",hair:"#6b4226",hat:"none",hatColor:"#7a5a3a",belt:"#4a3526",scale:1,...i},e=new $t,n=ae(e);n.scale.setScalar(t.scale);const s=ae(n,[0,Th,0]),r=[-1,1].map(d=>{const f=ae(s,[d*.12,0,0]);return f.add(K(z.box(.17,.62,.2),t.pants,[0,-.31,0])),f.add(K(z.box(.19,.14,.27),t.boots,[0,-.65,.035])),f}),o=ae(s),a=ae(o);if(a.add(K(z.cyl(.21,.25,.64,8),t.shirt,[0,.31,0])),a.add(K(z.cyl(.255,.255,.08,8),t.belt,[0,.04,0])),t.apron&&a.add(K(z.box(.36,.5,.04),t.apron,[0,.12,.235],[-.08,0,0])),t.robe){const d=K(z.cyl(.25,.4,.68,10),t.robe,[0,-.32,0]);s.add(d)}const c=[-1,1].map(d=>{const f=ae(o,[d*.29,.56,0]);f.add(K(z.cyl(.07,.06,.5,6),t.shirt,[0,-.23,0])),f.add(K(z.ico(.075,0),t.skin,[0,-.5,0]));const g=ae(f,[0,-.52,0]);return{arm:f,hand:g}}),l=ae(o,[0,.62,0]),h=ae(l);if(h.add(K(z.ico(.22,1),t.skin,[0,.2,0])),h.add(K(z.box(.045,.06,.03),"#2a1d16",[-.08,.23,.2])),h.add(K(z.box(.045,.06,.03),"#2a1d16",[.08,.23,.2])),h.add(K(z.box(.06,.08,.08),Cu(t.skin,-.06),[0,.18,.22])),t.hat!=="hood"&&t.hat!=="helmet"){const d=K(z.sphere(.235,8,5),t.hair,[0,.24,-.03],[0,0,0],[1,.8,1]);h.add(d),h.add(K(z.box(.36,.2,.12),t.hair,[0,.2,-.15]))}return t.beard&&h.add(K(z.cone(.16,.32,6),t.beard,[0,.03,.12],[Math.PI,0,0])),Lx(h,t),e.userData.rig=!0,{root:e,body:n,hips:s,torso:o,chest:a,neck:l,head:h,legL:r[0],legR:r[1],armL:c[0].arm,armR:c[1].arm,handL:c[0].hand,handR:c[1].hand,hipY:Th}}function Cu(i,t){const e=new mt(i),n={};return e.getHSL(n),e.setHSL(n.h,n.s,Math.max(0,Math.min(1,n.l+t))),"#"+e.getHexString()}function Lx(i,t){const e=t.hatColor;switch(t.hat){case"hood":i.add(K(z.sphere(.26,8,6),e,[0,.22,-.03],[0,0,0],[1,1.05,1.05])),i.add(K(z.cone(.12,.25,6),e,[0,.3,-.2],[-1.9,0,0]));break;case"helmet":i.add(K(z.sphere(.25,8,5),e,[0,.25,-.01],[0,0,0],[1,.9,1])),i.add(K(z.cyl(.3,.3,.03,10),e,[0,.24,0])),i.add(K(z.box(.04,.15,.04),e,[0,.2,.25]));break;case"cap":i.add(K(z.cyl(.2,.24,.12,8),e,[0,.38,-.02],[-.15,0,0]));break;case"straw":i.add(K(z.cyl(.4,.4,.03,10),e,[0,.36,0])),i.add(K(z.cyl(.16,.2,.16,8),e,[0,.44,0]));break;case"chef":i.add(K(z.cyl(.21,.19,.18,8),e,[0,.4,0])),i.add(K(z.sphere(.24,8,5),e,[0,.55,0],[0,0,0],[1,.7,1]));break;case"kerchief":i.add(K(z.sphere(.245,8,5),e,[0,.25,-.02],[0,0,0],[1,.82,1.02])),i.add(K(z.cone(.08,.14,4),e,[0,.2,-.26],[-1.4,0,0]));break;case"crown":{i.add(K(z.cyl(.2,.2,.1,10),"#e9b934",[0,.42,0],[0,0,0],1,{metalness:.5,roughness:.35}));for(let n=0;n<6;n++){const s=n/6*Ot;i.add(K(z.cone(.045,.14,4),"#e9b934",[Math.cos(s)*.18,.53,Math.sin(s)*.18],[0,0,0],1,{metalness:.5,roughness:.35}))}i.add(K(z.ico(.035),"#c8102e",[0,.42,.2]));break}}}function tn(i){for(const t of[i.hips,i.torso,i.chest,i.neck,i.head,i.legL,i.legR,i.armL,i.armR])t.rotation.set(0,0,0);i.hips.position.set(0,i.hipY,0),i.chest.scale.set(1,1,1),i.armL.rotation.z=-.08,i.armR.rotation.z=.08}function ps(i,t,e=1,{arms:n=!0,run:s=0}={}){const r=Math.sin(Ot*t),o=Math.cos(Ot*t),a=(.55+s*.35)*e;i.legL.rotation.x=r*a,i.legR.rotation.x=-r*a,n&&(i.armL.rotation.x=-r*(.45+s*.5)*e,i.armR.rotation.x=r*(.45+s*.5)*e),i.hips.position.y=i.hipY+(Math.abs(o)*.05-.02+s*Math.abs(o)*.06)*e,i.torso.rotation.y=r*.08*e,i.torso.rotation.x=s*.25*e,i.hips.rotation.z=o*.03*e}function yn(i,t,e=.03){i.chest.scale.set(1+t*e,1+t*e*.5,1+t*e)}function Dx(i,t=.45){i.hips.position.y=t+.05,i.legL.rotation.x=-1.45,i.legR.rotation.x=-1.45}function zn(i,t,e=[0,0,0],n=[0,0,0]){return t.position.set(...e),t.rotation.set(...n),i.add(t),t}function Pe(i){i.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)})}const cn={bow(){const i=new $t;return i.add(K(z.torus(.42,.025,4,10,Math.PI*.95),"#6b4226",[0,0,0],[0,Math.PI/2,Math.PI/2+.08])),i.add(K(z.cyl(.006,.006,.82,3),"#e8e2d0",[0,0,-.02])),i},quiver(){const i=new $t;i.add(K(z.cyl(.08,.07,.5,6),"#7a4e2c"));for(let t=0;t<4;t++)i.add(K(z.cone(.035,.1,3),"#e8e2d0",[t%2*.05-.025,.3,Math.floor(t/2)*.05-.025]));return i},spear(){const i=new $t;return i.add(K(z.cyl(.03,.03,2.3,5),"#6b4226",[0,.55,0])),i.add(K(z.cone(.07,.25,4),"#b8bcc4",[0,1.8,0],[0,0,0],1,{metalness:.6,roughness:.3})),i},shield(i="#2f4f9a"){const t=new $t;return t.add(K(z.cyl(.3,.3,.05,10),i,[0,0,0],[Math.PI/2,0,0])),t.add(K(z.cyl(.08,.08,.08,8),"#e9c04a",[0,0,.03],[Math.PI/2,0,0])),t},axe(){const i=new $t;return i.add(K(z.cyl(.025,.03,.85,5),"#8a5a35",[0,.35,0])),i.add(K(z.box(.04,.16,.22),"#9aa0a8",[0,.72,.09],[0,0,0],1,{metalness:.5,roughness:.4})),i},hammer(){const i=new $t;return i.add(K(z.cyl(.022,.022,.45,5),"#6b4226",[0,.18,0])),i.add(K(z.box(.1,.1,.2),"#55555c",[0,.4,.02],[0,0,0],1,{metalness:.5,roughness:.4})),i},tongs(){const i=new $t;return i.add(K(z.box(.02,.02,.5),"#3b3b40",[0,0,.25])),i.add(K(z.box(.06,.03,.14),"#ff7a2a",[0,0,.52],[0,0,0],1,{emissive:"#ff5a10",emissiveIntensity:1.4})),i},hoe(){const i=new $t;return i.add(K(z.cyl(.022,.022,1.5,5),"#8a5a35",[0,0,0])),i.add(K(z.box(.2,.04,.16),"#7d828a",[0,-.74,.07],[.3,0,0],1,{metalness:.4,roughness:.5})),i},basket(i="#b0874f"){const t=new $t;return t.add(K(z.cyl(.2,.15,.2,8),i,[0,-.1,0])),t.add(K(z.torus(.17,.015,4,10,Math.PI),Cu(i,-.1),[0,0,0])),t.add(K(z.ico(.07),"#d8402f",[.06,.02,.03])),t.add(K(z.ico(.07),"#7fbf3f",[-.05,.02,-.04])),t.add(K(z.box(.22,.03,.16),"#f4efe4",[0,0,0])),t},bread(){const i=new $t;for(let t=0;t<3;t++)i.add(K(z.sphere(.1,7,5),"#c98a3c",[(t-1)*.13,.02*(t%2),0],[0,0,.2],[1.6,.7,.8]));return i.add(K(z.sphere(.1,7,5),"#b97a30",[0,.11,0],[0,.6,0],[1.6,.7,.8])),i},rod(){const i=new $t;i.add(K(z.cyl(.012,.025,2.6,4),"#7a5232",[0,1.3,0]));const t=ae(i,[0,2.6,0]);return{g:i,tip:t}},bucket(){const i=new $t;i.add(K(z.cyl(.18,.14,.3,8),"#8a5a35",[0,-.25,0])),i.add(K(z.cyl(.185,.185,.04,8),"#55555c",[0,-.15,0])),i.add(K(z.torus(.17,.012,3,8,Math.PI),"#55555c",[0,-.12,0]));const t=K(z.cyl(.16,.16,.02,8),"#3f87b5",[0,-.13,0]);return i.add(t),{g:i,water:t}},log(){return K(z.cyl(.16,.16,.48,8),"#8b5e34")}};function Re(i,t,e,n,s){i.root.position.set(t,s??se(t,e),e),i.root.rotation.y=n}function Ro(i,t,e,n,s,r,{offset:o=0,cruise:a=.9}={}){const c=Math.hypot(e-i,n-t),l=Ne/s;return(h,u=0)=>{const d=we(h,s,o-u),f=Ee(d,r),g=.002,_=Math.abs(Ee((d+g)%1,r)-Ee((d-g+1)%1,r))*c/(2*g*l);return{u:d,s:f,x:i+(e-i)*f,z:t+(n-t)*f,dist:f*c,amt:Tn(_/a)}}}function Pu(i,t,{stride:e=1.2,offset:n=0,y:s=0}={}){const r=new wo(i.map(([h,u])=>new L(h,s,u)),!0,"centripetal"),o=r.getLength(),a=Math.max(1,Math.round(o/e)),c=new L,l=new L;return h=>{const u=we(h,t,n);return r.getPointAt(u,c),r.getTangentAt(u,l),{x:c.x,z:c.z,yaw:Math.atan2(l.x,l.z),phase:u*a,u}}}const Ah=new L;function Ix(i,t,e=new L){return i.getWorldPosition(Ah),e.copy(t.worldToLocal(Ah))}const Ux=new L(0,1,0),co=new L;function Rh(i,t,e){co.subVectors(e,t);const n=co.length();i.position.copy(t).addScaledVector(co,.5),i.quaternion.setFromUnitVectors(Ux,co.normalize()),i.scale.set(1,Math.max(n,.001),1)}const Nx=(i,t)=>Math.atan2(Math.sin(t-i),Math.cos(t-i)),Ch=[{shirt:"#3f6b3a",hat:"hood",hatColor:"#4d7a45",pants:"#5a4a38"},{shirt:"#6b4f2f",hat:"helmet",hatColor:"#9aa0a8",pants:"#4a4036"},{shirt:"#3a5a7a",hat:"hood",hatColor:"#2f4d6b",pants:"#5a4a38"},{shirt:"#7a3a32",hat:"helmet",hatColor:"#8a9098",pants:"#4a4036"}];function Ox(i){const t=Qe({...Ch[i%Ch.length],skin:["#f0c8a0","#d9a77c","#c68b5e"][i%3]});zn(t.handL,cn.bow(),[0,0,.02],[0,0,0]);const e=cn.quiver();return e.position.set(.1,.38,-.27),e.rotation.set(.25,0,-.35),t.chest.add(e),Pe(t.root),t}function lo(i,{a:t,b:e,out:n,members:s,cycles:r=1,offset:o=0,idx0:a=0}){const c=Math.atan2(e[0]-t[0],e[1]-t[1]),l=Math.sign(Nx(c,n))*(Math.PI/2),h=[[0,0,Sn],[.24,.5],[.36,.5,Sn],[.5,1],[.62,1,Sn],[.92,0]],u=[[0,0],[.24,0],[.265,l],[.335,l],[.36,0],[.5,0],[.525,l],[.595,l],[.62,2*l],[.92,2*l],[.945,l],[.975,l],[1,0]],d=[-Math.cos(c),Math.sin(c)],f=Ro(t[0],t[1],e[0],e[1],r,h,{offset:o,cruise:.55}),g=s.map((_,m)=>({rig:Ox(a+m),..._}));for(const _ of g)i.add(_.rig.root);return _=>{for(const m of g){const p=f(_,m.lag||0),M=m.rig,y=Ee(p.u,u),x=1-Math.abs(Math.cos(y));tn(M),ps(M,p.dist/1.25,p.amt),M.armL.rotation.x=-.35-.55*x+(M.armL.rotation.x+.35)*.4,M.armL.rotation.z=-.15,M.head.rotation.y=.55*dt(_,20,m.lat)*x,M.head.rotation.x=-.12*x,M.torso.rotation.x+=.1*x,yn(M,dt(_,15,m.lat),.03),Re(M,p.x+d[0]*m.lat,p.z+d[1]*m.lat,c+y,Xt.top+.05)}}}function Fx(){const i=Qe({shirt:"#7b2d8c",robe:"#6a2479",pants:"#4a1f55",hair:"#e8e4dc",beard:"#f1ede6",hat:"crown",scale:1.06,belt:"#e9b934"});return i.chest.add(K(z.torus(.24,.07,5,10),"#f7f3ec",[0,.6,0],[Math.PI/2,0,0])),i.chest.add(K(z.box(.55,1.2,.06),"#a32a2a",[0,.05,-.27],[.12,0,0])),i.chest.add(K(z.box(.08,.08,.02),"#e9b934",[0,.45,.24])),Pe(i.root),i}function zx(){const i=new $t,t=[],e=Xt.half,{x:n,z:s}=Me,r=Xt.towerR+.25;t.push(lo(i,{a:[n-e+r,s+e-.2],b:[n+e-r,s+e-.2],out:0,members:[{lat:-.27},{lat:.27,lag:.004}],offset:0,idx0:0})),t.push(lo(i,{a:[n+e-.1,s+e-r],b:[n+e-.1,s-e+r],out:Math.PI/2,members:[{lat:-.27},{lat:.27,lag:.005}],offset:.45,idx0:2})),t.push(lo(i,{a:[n-e+.1,s-e+r],b:[n-e+.1,s+e-r],out:-Math.PI/2,members:[{lat:-.28},{lat:.28,lag:.003},{lat:0,lag:.016}],offset:.2,idx0:1})),t.push(lo(i,{a:[n+e-r,s-e+.1],b:[n-e+r,s-e+.1],out:Math.PI,members:[{lat:-.27},{lat:.27,lag:.004}],offset:.7,idx0:3}));{const o=Fx();i.add(o.root);const a=[[0,0],[.07,.55],[.17,.6],[.26,-.15],[.3,-.55],[.42,-.5],[.5,.05],[.58,.35],[.66,.4],[.72,-.3],[.84,-.35],[.93,.05]],c=[[.18,.24],[.47,.53],[.86,.92]];t.push(l=>{const h=we(l,1);tn(o);const u=ke(h,.3,.45,.04)*.9+ke(h,.7,.8,.03)*.6;let d=0;for(const[f,g]of c){const _=fe(h,f,g);d+=_>0&&_<1?.18*Math.sin(_*Math.PI*2*2)**2:0}o.torso.rotation.x=.06+.22*u,o.head.rotation.y=Ee(h,a)+.05*dt(l,7),o.head.rotation.x=d+.18*u-.04,o.head.rotation.z=-.05*Ee(h,a),o.armL.rotation.x=-.85-.2*u,o.armR.rotation.x=-.85-.2*u,o.armL.rotation.z=.12,o.armR.rotation.z=-.12,o.hips.rotation.z=.025*dt(l,3),o.hips.position.x=.02*dt(l,3),yn(o,dt(l,14),.035),Re(o,oe.x,oe.z+.27-.08*u,0,oe.y)})}{const o=[-1,1].map((c,l)=>{const h=Qe({shirt:"#2f4f9a",pants:"#3b3b44",hat:"helmet",hatColor:"#a8adb5",skin:l?"#d9a77c":"#f0c8a0",belt:"#6b4226"});h.chest.add(K(z.box(.44,.42,.06),"#e9c04a",[0,.36,.22])),h.chest.add(K(z.box(.12,.3,.07),"#2f4f9a",[0,.38,.235]));const u=c>0?h.handR:h.handL,d=c>0?h.handL:h.handR;return zn(u,cn.spear(),[0,0,0],[.45,0,0]),zn(d,cn.shield(),[-c*.05,.1,.12],[0,0,0]),Pe(h.root),i.add(h.root),{r:h,s:c}}),a=[[[0,0],[.12,0],[.16,.7],[.3,.7],[.34,0],[.6,0],[.63,-.5],[.72,-.5],[.76,0]],[[0,0],[.14,0],[.18,-.75],[.3,-.75],[.34,0],[.45,0],[.49,.6],[.58,.6],[.62,0],[.85,0],[.88,-.4],[.95,-.4]]];t.push(c=>{const l=we(c,1);o.forEach(({r:h,s:u},d)=>{tn(h);const f=u>0?h.armR:h.armL,g=u>0?h.armL:h.armR;f.rotation.x=-.45,f.rotation.z=u*.12,g.rotation.x=-.5,g.rotation.z=-u*.25,h.head.rotation.y=Ee(l,a[d]),d===1&&(h.head.rotation.x=.15*Math.sin(fe(l,.2,.28)*Math.PI*4)**2),h.hips.rotation.z=.03*dt(c,4,d*.3),h.hips.position.x=.02*dt(c,4,d*.3),yn(h,dt(c,16,d*.5),.03),Re(h,he.x+u*1.05,he.z+3.6,0,te+.02)})})}{const o=Qe({shirt:"#8a6a4a",pants:"#3b3028",apron:"#4a3426",hair:"#2a1d16",beard:"#2a1d16",skin:"#d9a77c",scale:1.08});zn(o.handR,cn.hammer(),[0,0,.02],[Math.PI/2+.25,0,0]),zn(o.handL,cn.tongs(),[0,0,0],[Math.PI/2+.1,0,0]),Pe(o.root),i.add(o.root);const a=10,c=new ki(z.box(.035,.035,.035),new Lo({color:"#ffb347"}),a);c.frustumCulled=!1,i.add(c);const l=oi(31),h=Array.from({length:a},()=>new L((l()-.5)*2.4,1+l()*1.6,(l()-.5)*2.4)),u=new L(vs.x,te+.92,vs.z+1.1),d=new Qt,f=new L,g=new _n,_=new L,m=10,p=Math.atan2(2.2,-.6);t.push(M=>{const y=we(M,m);tn(o);const C=fe(y,0,.48)*4%1;let R;C<.6?R=en(-.85,-2.5,Ht(C/.6)):C<.78?R=en(-2.5,-.85,((C-.6)/.18)**2):R=-.85+.12*Math.sin((C-.78)/.22*Math.PI);const w=Ee(y,[[0,0],[.5,0],[.57,p],[.82,p],[.89,0]]),I=ke(y,0,.48,.03),b=ke(y,.55,.85,.05),v=ke(y,.9,.995,.03);let E=en(-.6,R,I);E=en(E,-.9,b),o.armR.rotation.x=en(E,-.25,v),o.armR.rotation.z=-.15,o.armL.rotation.x=-.95*(1-v)-2.5*v,o.armL.rotation.z=.2+.25*v,o.head.rotation.x=.25*(1-v)-.1*v,o.torso.rotation.x=.12+(C>.6&&C<.85?.08:0)*I+.1*b,o.head.rotation.y=.15*b*dt(M,20),yn(o,dt(M,18),.04),Re(o,vs.x,vs.z,w,te+.02);const T=C-.78,D=I>.99&&T>0&&T<.2;for(let O=0;O<a;O++){const F=D?T/.2:0,N=h[O];f.set(u.x+N.x*F*.5,u.y+N.y*F*.45-F*F*.6,u.z+N.z*F*.5);const B=D?(1-F)*1.2:0;d.compose(f,g,_.set(B,B,B)),c.setMatrixAt(O,d)}c.instanceMatrix.needsUpdate=!0})}return{root:i,update(o){for(const a of t)a(o)}}}const fs=i=>Tn(i)*Tn(i),Ph=new L,gi=new L;function Lh(i,t,e,n,s,r=.24){const o=ae(i,[e,se(e,n),n],[0,s,0]),a=ae(o,[0,r,0],[-Math.PI/2,0,0]);return a.add(t.root),{frame:o,lie:a}}function Bx(i){const t=new $t,e=[];{const{x:n,z:s,yaw:r,g:o}=i.wood,a=ae(t,[n,o,s],[0,r,0]),c=Qe({shirt:"#b8433a",pants:"#4f4436",hat:"cap",hatColor:"#6b4a2b",beard:"#7a4a26",hair:"#7a4a26",skin:"#e8b48a",scale:1.05});c.chest.add(K(z.box(.46,.05,.36),"#3a2a20",[0,.42,.02],[0,0,.7])),zn(c.handR,cn.axe(),[0,0,.02],[Math.PI,0,0]),Pe(c.root),a.add(c.root);const l=cn.log();a.add(l);const h=[1,-1].map(x=>{const C=ae(a),R=new _e(new Er(.16,.16,.48,8,1,!1,x>0?0:Math.PI,Math.PI),l.material);R.position.set(-x*.16,.24,0);const w=K(z.box(.01,.47,.3),"#e2c08a",[-x*.16,.24,0]);return C.add(R,w),R.castShadow=!0,{pivot:C,s:x}}),u=8,d=new L(1.55,.3,.1),f=new L(0,.455+.24,1.05),g=[[0,[0,-.4]],[.02,[0,-.4]],[.09,[.72,-.2]],[.27,[.72,-.2]],[.34,[0,-.4]]],_=[[0,0],[.02,0],[.09,Math.PI/2],[.27,Math.PI/2],[.34,0]],m=[[0,0],[.09,0],[.13,.85],[.17,.85],[.22,.1],[.34,.1],[.38,.55],[.42,.55],[.46,0],[.6,-.12,fs],[.655,.4],[.72,.4],[.86,0]],p=[[0,-.1],[.09,-.1],[.13,-1.35],[.17,-1.35],[.22,-1],[.34,-1],[.38,-1.3],[.42,-1.3],[.46,-.25],[.6,-3.3,fs],[.655,-1.65],[.72,-1.65],[.86,-.25],[.89,-.25],[.92,-2.6],[.95,-2.6],[.98,-.1]],M=[[0,-.1],[.09,-.1],[.13,.5],[.17,.5],[.22,-.1],[.34,-.1],[.38,.3],[.42,.3],[.46,-.25],[.6,-3.3,fs],[.655,-1.65],[.72,-1.65],[.86,-.25],[.95,-.1]],y=new L;e.push(x=>{const C=we(x,u);tn(c);const[R,w]=Ee(C,g),I=Ee(C,_),b=ke(C,.02,.09,.02)+ke(C,.27,.34,.02);ps(c,(R+w)/.45,b*.6,{arms:!1}),c.torso.rotation.x=Ee(C,m);const v=ke(C,.46,.86,.04),E=ke(C,.89,.98,.03);c.armL.rotation.x=Ee(C,p),c.armR.rotation.x=Ee(C,M),c.armL.rotation.z=-.08+.33*v+.55*E,c.armR.rotation.z=.08-.33*v,c.head.rotation.x=.25*v-.1*E,yn(c,dt(x,16),.03),c.root.position.set(R,0,w),c.root.rotation.y=I,a.updateMatrixWorld(!0),Ix(c.handL,a,y);const T=fe(C,.12,.17),D=fe(C,.36,.42);l.visible=C>=.11&&C<.66,C<.36?(l.position.lerpVectors(d,y,Ht(T)),l.rotation.set(0,C<.12?Math.PI/2:I,Math.PI/2)):(l.position.lerpVectors(y,f,Ht(D)),l.rotation.set(0,0,Math.PI/2*(1-Ht(D))));const O=fe(C,.66,.72),F=fe(C,.72,.8),N=fe(C,.9,.98);for(const B of h){B.pivot.visible=C>=.66&&C<.98;const H=B.s*.16;B.pivot.position.set(en(H,B.s*.92,Ht(F)),en(.455,.12,F*F)+Math.sin(F*Math.PI)*.15-.42*Ht(N),en(1.05,1.12,F)),B.pivot.rotation.set(0,0,-B.s*(Math.PI/2)*Math.min(1,fs(O)+F))}})}{const n=i.well,s=Qe({shirt:"#8a6fae",robe:"#6d5a8e",hat:"kerchief",hatColor:"#e9e2cf",skin:"#f0c8a0",apron:"#efe8d8"});Pe(s.root),t.add(s.root);const r=cn.bucket();r.g.rotation.order="YXZ",Pe(r.g),t.add(r.g);const o=K(z.cyl(.015,.015,1,4),"#c8b48a");o.castShadow=!1,t.add(o);const a=new _e(z.cyl(.05,.035,1,6),new gn({color:"#7fc4e8",transparent:!0,opacity:.8,roughness:.2}));t.add(a);const c=bn.x+1.8,l=bn.z,h=new L(bn.x,n.drumY,bn.z),u=new L(i.trough.x,i.trough.y,i.trough.z),d=5,f=[[0,0,Sn],[.3,1],[.36,1,Sn],[.62,0]],g=[[0,-Math.PI/2],[.7,-Math.PI/2],[.76,0],[.88,0],[.94,-Math.PI/2]],_=[[0,0],[.62,0],[.7,1],[.94,1],[1,0]],m=new L;e.push(p=>{const M=we(p,d);tn(s);const y=Ee(M,f),x=-y*Ot*3;n.crank.rotation.x=x;const C=Ee(M,_),R=ke(M,.6,.72,.04)+ke(M,.93,1,.03),w=ke(M,.77,.88,.03),I=Ee(M,g),b=1-Ht(fe(M,.6,.64))+Ht(fe(M,.97,1)),v=Tn(b),E=-1.2+.35*Math.sin(x),T=.3*Math.cos(x),D=-.95-.35*R-.3*w;s.armL.rotation.x=en(D,E,v),s.armR.rotation.x=en(D,E,v),s.armL.rotation.z=en(.42,.28+T,v),s.armR.rotation.z=en(-.42,-.28+T,v),s.torso.rotation.x=.08+.06*Math.sin(x)*v+.35*R+.2*w,s.head.rotation.x=.15+.2*w,yn(s,dt(p,18),.03),Re(s,c,l,I),s.root.updateMatrixWorld(!0);const O=Ph.set(bn.x,n.drumY-.4-y*(n.drumY-.4-(n.rimY-1.4)),bn.z);s.handL.getWorldPosition(m),s.handR.getWorldPosition(gi),m.add(gi).multiplyScalar(.5),m.y+=.08,r.g.position.lerpVectors(O,m,Ht(C)),r.g.rotation.y=I*Ht(C),r.g.rotation.x=1.7*w,r.water.visible=M>.33&&M<.84,Rh(o,h,r.g.position);const F=ke(M,.79,.87,.015);if(a.visible=F>.01,a.visible){r.g.updateMatrixWorld(!0);const N=gi.set(0,-.1,.18).applyMatrix4(r.g.matrixWorld);Rh(a,N,u),a.scale.x=a.scale.z=F}})}{const n=Qe({shirt:"#c9a24a",pants:"#6b5640",hair:"#a0522d",skin:"#f0c8a0"}),s=K(z.cyl(.4,.4,.03,10),"#d8b45a",[0,.3,.3],[Math.PI/2,0,0]);s.add(K(z.cyl(.16,.2,.16,8),"#d8b45a",[0,.08,0])),n.chest.add(s),Pe(n.root);const r=new L(1,0,.75).normalize(),o=Ms.x+r.x*3,a=Ms.z+r.z*3;Lh(t,n,o,a,Math.atan2(r.x,r.z),.24);const c=(()=>{const d=document.createElement("canvas");d.width=d.height=64;const f=d.getContext("2d");f.font="bold 52px Georgia, serif",f.textAlign="center",f.textBaseline="middle",f.lineWidth=6,f.strokeStyle="#3b5b8a",f.strokeText("Z",32,34),f.fillStyle="#ffffff",f.fillText("Z",32,34);const g=new Lc(d);return g.colorSpace=ln,g})(),l=[0,1,2].map(()=>{const d=new a_(new mu({map:c,transparent:!0,depthWrite:!1}));return t.add(d),d}),h=[[0,0],[.28,0],[.34,1.25],[.62,1.25],[.68,0],[.82,0],[.86,-.35],[.94,-.35]],u=new L;e.push(d=>{tn(n);const f=we(d,1),g=Ee(f,h);n.root.rotation.y=g;const _=dt(d,15);yn(n,_,.07),n.armL.rotation.x=-.55+.05*_,n.armR.rotation.x=-.55+.05*_,n.armL.rotation.z=.35,n.armR.rotation.z=-.35-.6*Ht(g/1.25),n.legR.rotation.x=-.3-.25*Ht(g/1.25),n.head.rotation.y=.35*g,n.head.rotation.x=-.08*_,n.head.getWorldPosition(u),l.forEach((m,p)=>{const M=we(d,12,p/3),y=Ht(M/.15)*(1-Ht((M-.6)/.4));m.position.set(u.x+.3+M*.7+.12*Math.sin(M*8),u.y+.45+M*1.5,u.z+.1*Math.cos(M*6)),m.scale.setScalar(.22+M*.35),m.material.opacity=y*.95})})}{const n=Qe({shirt:"#9b7a55",pants:"#5d4733",hair:"#3b2a1e",skin:"#e3b18c",boots:"#3b2a1e"});n.chest.add(K(z.box(.3,.2,.05),"#6b4a2e",[.05,.25,.235])),Pe(n.root),Lh(t,n,He.x-.9,He.z+.5,2.2,.12),e.push(s=>{tn(n),n.root.rotation.y=.32*dt(s,4)+.12*dt(s,9,.2),n.armL.rotation.z=-1.25-.18*dt(s,8),n.armR.rotation.z=1.25+.18*dt(s,8,.15),n.armL.rotation.x=-.2,n.armR.rotation.x=-.2,n.legL.rotation.z=-.22-.06*dt(s,6),n.legR.rotation.z=.22+.06*dt(s,6,.3),n.head.rotation.y=.35*dt(s,4,.25),yn(n,dt(s,15),.05)})}{const s=[{shirt:"#e05a47",pants:"#5a6fa8",hair:"#f2c94c"},{shirt:"#4fa36b",pants:"#6b5640",hair:"#6b4226"},{shirt:"#f2a43a",robe:"#e07a9a",hair:"#3b2a1e"},{shirt:"#5a8fd6",pants:"#4f4436",hair:"#a0522d",hat:"cap",hatColor:"#c8443b"}].map((d,f)=>{const g=Qe({...d,scale:.6,skin:["#f0c8a0","#d9a77c","#f5d0b0","#c68b5e"][f]});return g.head.scale.setScalar(1.3),Pe(g.root),t.add(g.root),g}),r=fx,o=2.2,a=3.5,c=8,l=Math.round(Ot*o/.55),h=Math.round(Ot*a/.55),u=new L;e.push(d=>{const f=Ot*c*d/60,g=.85+.45*dt(d,3),_=1-Ht(fe(g,.45,.8)),m=(D,O,F,N,B,H,tt)=>{tn(D);const at=r.x+Math.sin(O)*F,ut=r.z+Math.cos(O)*F;return ps(D,O/Ot*N*H,1,{run:1}),Re(D,at,ut,O+H*Math.PI/2),D.root.position.y+=tt,[at,ut]},p=s[0],M=.25*Math.max(0,dt(d,16))**3,[y,x]=m(p,f,o,l,c,1,M);u.set(y,0,x),p.armL.rotation.z=-.1-2.2*_,p.armR.rotation.z=.1+2.2*_,p.head.rotation.y=-.6*_;const C=s[1];m(C,f-g,o,l,c,1,.12*Math.max(0,dt(d,24))**3),C.armR.rotation.x=en(C.armR.rotation.x,-1.5,_),C.armR.rotation.z=.2;const R=s[2];tn(R);const w=we(d,30),I=Math.sin(Math.PI*w)**2;R.armL.rotation.z=-(2.3+.4*dt(d,60)),R.armR.rotation.z=2.3+.4*dt(d,60,.5),R.legL.rotation.x=-.4*I,R.legR.rotation.x=-.4*I,R.head.rotation.x=-.2,Re(R,r.x,r.z,Math.atan2(u.x-r.x,u.z-r.z)),R.root.position.y+=.45*I;const b=s[3],v=-(Ot*5*d)/60+1.3,E=.35*Math.max(0,dt(d,10,.1))**3;m(b,v,a,h,5,-1,E);const T=Math.max(0,dt(d,10,.1))**2;b.armL.rotation.z=-.1-2.4*T,b.armR.rotation.z=.1+2.4*T})}{const n=Qe({shirt:"#d9c79a",pants:"#5a6fa8",hat:"straw",hatColor:"#e2c25d",skin:"#d9a77c",beard:"#8a8378",hair:"#8a8378"});zn(n.handR,cn.hoe(),[0,-.2,.08],[.1,0,0]),Pe(n.root),t.add(n.root);const s=i.fieldRows,r=(s[2]+s[3])/2,o=ni.z-5.5,a=ni.z+5.5,c=[[0,0],[.1,0,Sn],[.27,.5],[.43,.5,Sn],[.6,1],[.72,1,Sn],[.97,0]],l=[[0,Math.PI],[.05,0],[.72,0],[.76,Math.PI]],h=Ro(r,o,r,a,2,c,{cruise:.6});e.push(u=>{const d=h(u);tn(n),ps(n,d.dist/1.2,d.amt,{arms:!1});const f=1-Ht(d.amt*3),g=we(u,40),_=g<.55?Ht(g/.55):1-fs((g-.55)/.2),m=en(-.9,en(-.7,-1.7,Tn(_)),f);n.armR.rotation.x=m,n.armL.rotation.x=m+.1,n.armL.rotation.z=.35,n.armR.rotation.z=-.2,n.torso.rotation.x=.1+.25*f*(1-Tn(_)*.6),n.head.rotation.x=.2*f,yn(n,dt(u,16),.03),Re(n,d.x,d.z,Ee(d.u,l))})}{const n=Qe({shirt:"#4f7fbf",robe:"#3f669e",hat:"kerchief",hatColor:"#f4efe4",apron:"#f4efe4",skin:"#f5d0b0",hair:"#c27a3a"});zn(n.handL,cn.basket(),[0,-.05,.05],[0,0,0]),Pe(n.root),t.add(n.root);const s=Pu([[5,25.8],[8.3,31.5],[6.2,36.2],[1.5,37.6],[-3.5,36.8],[-5.2,31],[-4.6,26.4],[.5,26.6]],1,{stride:1.05});e.push(r=>{const o=s(r);tn(n),ps(n,o.phase,.8),n.armL.rotation.x=-.3,n.armL.rotation.z=-.25,n.head.rotation.y=.3*dt(r,3),Re(n,o.x,o.z,o.yaw)})}{const n=Qe({shirt:"#f4efe4",pants:"#6b5640",hat:"chef",hatColor:"#ffffff",apron:"#ffffff",skin:"#f0c8a0",hair:"#5a3a22",scale:1.04});n.chest.add(K(z.box(.5,.1,.36),"#a7774a",[0,.22,.42]));const s=cn.bread();s.position.set(0,.32,.42),n.chest.add(s),Pe(n.root),t.add(n.root);const r=i.bakeryDoor,o=On.yaw,a={x:On.x+1.9*Math.cos(o)+1.3*Math.sin(o),z:On.z-1.9*Math.sin(o)+1.3*Math.cos(o)},c=Math.atan2(a.x-r.x,a.z-r.z),l=Math.atan2(On.x-a.x,On.z-a.z),h=[[0,0,Sn],[.35,1],[.5,1,Sn],[.85,0]],u=Hx([[0,c],[.35,c],[.38,l],[.47,l],[.5,c+Math.PI],[.85,c+Math.PI],[.88,i.bakeryYaw+Math.PI],[.97,i.bakeryYaw+Math.PI]]),d=Ro(r.x,r.z,a.x,a.z,2,h,{cruise:.6});e.push(f=>{const g=d(f);tn(n),ps(n,g.dist/1.2,g.amt,{arms:!1});const _=ke(g.u,.38,.47,.03);n.armL.rotation.x=-1-.3*_,n.armR.rotation.x=-1-.3*_,n.armL.rotation.z=.5,n.armR.rotation.z=-.5,n.torso.rotation.x=.35*_,yn(n,dt(f,16),.03),Re(n,g.x,g.z,Ee(g.u,u))})}{const n=Qe({shirt:"#c8443b",pants:"#4f4436",hat:"cap",hatColor:"#2f4f9a",beard:"#5a3a22",hair:"#5a3a22",skin:"#e3b18c",apron:"#e9dcc0"}),s=Qe({shirt:"#7aa35a",robe:"#5c8a45",hat:"kerchief",hatColor:"#d8402f",skin:"#c68b5e",hair:"#2a1d16"});zn(s.handL,cn.basket("#a07a45"),[0,-.05,.05]),Pe(n.root),Pe(s.root),t.add(n.root,s.root);const r=i.stallBack,o=i.stallFront;e.push(a=>{const c=we(a,6),l=ke(c,.02,.48,.05),h=ke(c,.52,.98,.05);for(const[u,d,f,g]of[[n,l,h,0],[s,h,l,1]]){tn(u);const _=.5+.5*dt(a,42,g*.3),m=.5+.5*dt(a,30,g*.6+.2);u.armR.rotation.x=-.25-d*(.5+.6*_),u.armR.rotation.z=-.1-d*.3*m,g===0?(u.armL.rotation.x=-.2-d*.6*m,u.armL.rotation.z=d*.3):(u.armL.rotation.x=-.3,u.armL.rotation.z=-.25),u.head.rotation.x=f*.12*Math.sin(Ot*we(a,36,g*.4))**2+d*.05*dt(a,50),u.head.rotation.z=d*.08*dt(a,20,g),u.torso.rotation.y=d*.12*dt(a,12,g),u.hips.rotation.z=.02*dt(a,4,g*.5),yn(u,dt(a,16,g*.4),.03)}Re(n,r.x,r.z,On.yaw),Re(s,o.x,o.z,On.yaw+Math.PI)})}{const n=Qe({shirt:"#5a7a8f",pants:"#4f4436",hat:"straw",hatColor:"#c9a24a",beard:"#cfc8bc",hair:"#cfc8bc",skin:"#e3b18c"}),s=cn.rod();zn(n.handR,s.g,[0,0,.02],[1.87,0,0]),Pe(n.root),t.add(n.root);const r=i.dock,o=r.x+.35,a=r.z;t.add(K(z.cyl(.17,.14,.3,8),"#8a5a35",[o+.3,r.y+.15,a-.55]));const c=new $t;c.add(K(z.sphere(.06,8,5),"#e03a2f",[0,.02,0])),c.add(K(z.sphere(.055,8,5),"#ffffff",[0,-.03,0])),t.add(c);const l=new L(o-3.6,i.waterY+.02,a+.4),h=new be().setFromPoints(Array.from({length:12},()=>new L)),u=new h_(h,new _u({color:"#f4efe4",transparent:!0,opacity:.8}));u.frustumCulled=!1,t.add(u);const d=[0,1].map(()=>{const p=new _e(new Oc(.9,1,24),new Lo({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1}));return p.rotation.x=-Math.PI/2,t.add(p),p}),f=new L,g=new L,_=4,m=[[0,-.9],[.68,-.9],[.73,-1.75],[.8,-2.3],[.86,-2.3],[.9,-.7,fs],[.95,-.9]];e.push(p=>{const M=we(p,_);tn(n),Dx(n,0),n.legL.rotation.x=-1.35+.15*dt(p,6),n.legR.rotation.x=-1.35+.15*dt(p,6,.5);const y=Ee(M,m)+.04*dt(p,24)*(M<.66?1:0);n.armR.rotation.x=y,n.armL.rotation.x=y+.1,n.armL.rotation.z=.35,n.armR.rotation.z=-.1,n.torso.rotation.x=.15-.15*ke(M,.7,.9,.04),n.head.rotation.x=.12,yn(n,dt(p,15),.03),Re(n,o,a,-Math.PI/2,r.y),n.root.updateMatrixWorld(!0),s.tip.getWorldPosition(f);const x=Ee(M,[[0,0],[.68,0],[.74,1],[.86,1],[.92,0,kx]]);g.copy(f).add(Ph.set(0,-.55,0));const C=ke(M,.45,.6,.02)*Math.max(0,Math.sin(Ot*we(p,48)))*.06,R=l.clone();R.y+=.02*dt(p,30)-C,c.position.lerpVectors(R,g,x),M>.86&&M<.92&&(c.position.y+=Math.sin(x*Math.PI)*1.2);const w=h.attributes.position,I=.35*(1-x);for(let v=0;v<12;v++){const E=v/11;gi.lerpVectors(f,c.position,E),gi.y-=Math.sin(E*Math.PI)*I,w.setXYZ(v,gi.x,gi.y,gi.z)}w.needsUpdate=!0;const b=1-Ht(Tn(x*4));d.forEach((v,E)=>{const T=we(p,16,E/2);v.position.set(l.x,i.waterY+.03,l.z),v.scale.setScalar(.08+T*.7),v.material.opacity=.55*(1-T)*Ht(T/.1)*b})})}return{root:t,update(n){for(const s of e)s(n)}}}function kx(i){return Tn(i)}function Hx(i){const t=(n,s)=>n+Ot*Math.round((s-n)/Ot),e=[[i[0][0],i[0][1]]];for(let n=1;n<i.length;n++)e.push([i[n][0],t(i[n][1],e[n-1][1])]);return e.push([1,t(i[0][1],e[e.length-1][1])]),e}function Vc(i,t,e,n,s,r,o,a=.07){return[[-1,1],[1,1],[-1,-1],[1,-1]].map(([c,l])=>{const h=ae(i,[c*n,r,l*s]);return h.add(K(z.cyl(a,a*.85,o,6),t,[0,-o/2,0])),e&&h.add(K(z.cyl(a*.9,a,.06,6),e,[0,-o+.03,0])),h})}function ba(){const i=new $t,t=ae(i,[0,.42,0]);t.add(K(z.ico(.5,1),"#f2a9a0",[0,0,0],[0,0,0],[.78,.66,1.1]));const e=ae(t,[0,.08,.5]);e.add(K(z.ico(.27,1),"#f2a9a0",[0,0,.05])),e.add(K(z.cyl(.12,.13,.12,8),"#e8857c",[0,-.03,.31],[Math.PI/2,0,0]));for(const r of[-1,1])e.add(K(z.box(.03,.04,.02),"#5a2d2a",[r*.045,-.03,.375])),e.add(K(z.box(.04,.05,.02),"#2a1d16",[r*.12,.08,.27])),e.add(K(z.cone(.08,.16,4),"#e8938a",[r*.15,.24,0],[-.4,0,r*.5]));const n=Vc(t,"#eb9a90","#6b4a3a",.2,.3,-.15,.3),s=ae(t,[0,.14,-.55]);return s.add(K(z.torus(.06,.022,4,8),"#eb9a90",[0,.04,-.03],[0,Math.PI/2,0])),Pe(i),{root:i,body:t,head:e,legs:n,tail:s}}function Ea(i="#2a2522"){const t=new $t,e=ae(t,[0,1,0]);e.add(K(z.box(.78,.72,1.55),"#f4f1ea"));const n=[[.395,.1,.3,.3,.42],[-.395,-.05,-.25,.36,.3],[.2,.365,-.4,.3,.32],[-.395,.18,.45,.22,.28],[.395,-.12,-.45,.26,.24]];for(const[c,l,h,u,d]of n){const f=Math.abs(l)>.3;e.add(K(z.box(f?u:.02,f?.02:u,d),i,[c,l,h]))}e.add(K(z.sphere(.16,8,5),"#f2a9b4",[0,-.38,-.35],[0,0,0],[1.2,.8,1]));const s=ae(e,[0,.18,.75]),r=ae(s);r.add(K(z.box(.42,.42,.52),"#f4f1ea",[0,0,.24])),r.add(K(z.box(.4,.26,.2),"#f2b8b0",[0,-.08,.55])),r.add(K(z.box(.44,.14,.2),i,[0,.15,.12]));for(const c of[-1,1])r.add(K(z.cone(.05,.22,5),"#efe6c8",[c*.18,.28,.1],[0,0,-c*.5])),r.add(K(z.box(.2,.08,.12),"#f4f1ea",[c*.3,.12,.08],[0,0,c*.4])),r.add(K(z.box(.04,.06,.02),"#2a1d16",[c*.15,.06,.505]));const o=Vc(e,"#f4f1ea","#3b302a",.27,.6,-.3,.7,.09),a=ae(e,[0,.3,-.78]);return a.add(K(z.cyl(.025,.025,.75,4),"#f4f1ea",[0,-.375,0])),a.add(K(z.ico(.07),i,[0,-.77,0])),Pe(t),{root:t,body:e,neck:s,head:r,legs:o,tail:a}}function ho(i="#fbf7ef"){const t=new $t,e=ae(t,[0,.27,0]);e.add(K(z.ico(.17,1),i,[0,0,0],[0,0,0],[.9,.85,1.2])),e.add(K(z.cone(.1,.22,4),i,[0,.1,-.2],[-.8,0,0]));const n=ae(e,[0,.12,.15]);n.add(K(z.ico(.085,0),i,[0,.07,.03])),n.add(K(z.box(.025,.07,.1),"#d8352a",[0,.16,.03])),n.add(K(z.cone(.03,.08,4),"#f0a92e",[0,.06,.13],[Math.PI/2,0,0])),n.add(K(z.box(.02,.05,.03),"#d8352a",[0,.01,.1]));const s=[-1,1].map(o=>{const a=ae(e,[o*.13,.03,0]);return a.add(K(z.box(.03,.12,.22),i,[o*.01,-.04,-.02])),a}),r=[-1,1].map(o=>{const a=ae(t,[o*.06,.16,0]);return a.add(K(z.cyl(.015,.015,.16,4),"#f0a92e",[0,-.08,0])),a.add(K(z.box(.06,.015,.08),"#f0a92e",[0,-.155,.02])),a});return Pe(t),{root:t,body:e,head:n,wings:s,legs:r}}function Vx(){const i=new $t,t=ae(i,[0,.46,0]);t.add(K(z.box(.3,.3,.72),"#b07a45")),t.add(K(z.box(.26,.12,.5),"#f1e3c8",[0,-.12,.05]));const e=ae(t,[0,.2,.38]);e.add(K(z.box(.28,.26,.26),"#b07a45",[0,.02,.06])),e.add(K(z.box(.16,.13,.18),"#f1e3c8",[0,-.04,.24])),e.add(K(z.box(.07,.06,.04),"#2a1d16",[0,0,.34]));for(const r of[-1,1])e.add(K(z.box(.06,.18,.1),"#6b4226",[r*.15,.04,0],[0,0,r*.25])),e.add(K(z.box(.035,.04,.02),"#2a1d16",[r*.07,.08,.19]));const n=Vc(t,"#b07a45",null,.1,.27,-.12,.34,.05),s=ae(t,[0,.1,-.36]);return s.add(K(z.cyl(.03,.02,.32,4),"#b07a45",[0,.16,0])),s.rotation.x=-.6,Pe(i),{root:i,body:t,head:e,legs:n,tail:s}}function Dh(i,t,e,n=.5){const s=Math.sin(Ot*t)*n*e;i[0].rotation.x=s,i[3].rotation.x=s,i[1].rotation.x=-s,i[2].rotation.x=-s}function Gx(){const i=new $t,t=[];{const e=ba(),n=ba(),s=ba();i.add(e.root,n.root,s.root);const r=He.x+.9,o=He.z-.5,a=He.x-2.2,c=He.z-1.4,l=xr.x,h=xr.z,u=Array.from({length:14},(f,g)=>{const _=g/14*Ot;return[l+Math.cos(_)*3.4,h+Math.sin(_)*2.6]}),d=Pu(u,2,{stride:.55});t.push(f=>{e.body.rotation.set(0,0,1.35+.18*dt(f,5)),e.body.position.y=.3;const g=Math.max(0,dt(f,6,.3))**2;e.legs.forEach((p,M)=>p.rotation.x=.4*g*Math.sin(Ot*we(f,60,M*.25))),e.tail.rotation.z=.5*dt(f,90),Re(e,r,o,-.6,se(r,o)-.02);const _=Math.max(0,dt(f,12))**10;n.head.rotation.x=-.35*_+.12*Math.max(0,dt(f,5,.4)),n.head.rotation.y=.2*dt(f,3),n.body.position.y=.42+.03*_,n.head.scale.set(1,1,1+.06*_),n.tail.rotation.z=.7*dt(f,120),Re(n,a,c,.75);const m=d(f);Dh(s.legs,m.phase,1,.55),s.body.position.y=.42+.02*Math.abs(Math.sin(Ot*m.phase)),s.head.rotation.x=.25+.15*dt(f,8),s.tail.rotation.z=.6*dt(f,110,.2),Re(s,m.x,m.z,m.yaw)})}{const e=Ea(),n=Ea("#6b4226"),s=Ea();i.add(e.root,n.root,s.root);const r=Ao.x,o=Ao.z,a=(u,d,f)=>Ee((d+f)%1,[[0,.95],[.3,.95],[.36,.05],[.5,.05],[.56,.95],[.78,.95],[.82,.3],[.9,.3],[.94,.95]]),c=[[0,0,Sn],[.3,1],[.5,1,Sn],[.8,0]],l=Ro(r+2.5,o+3.2,r+6.5,o+1,1,c,{cruise:.18}),h=Math.atan2(4,-2.2);t.push(u=>{const d=we(u,1),f=a(e,d,0);e.neck.rotation.x=f*.95,e.head.rotation.z=.06*dt(u,50)*f,e.head.rotation.y=.08*dt(u,25)*(1-f),e.tail.rotation.z=.35*dt(u,24),e.tail.rotation.x=.15+.1*dt(u,12),Re(e,r,o,2.4);const g=l(u);Dh(n.legs,g.dist/1.1,g.amt,.35),n.neck.rotation.x=.25+.6*(1-g.amt),n.head.rotation.z=.05*dt(u,45)*(1-g.amt),n.tail.rotation.z=.35*dt(u,20,.3);const _=Ee(g.u,[[0,0],[.3,0],[.4,Math.PI],[.8,Math.PI],[.9,Ot],[1,Ot]]);Re(n,g.x,g.z,h+_),s.body.position.y=.55,s.legs.forEach((m,p)=>m.rotation.x=p<2?-1.45:1.45),s.neck.rotation.x=-.1,s.head.rotation.z=.07*dt(u,70),s.head.rotation.y=.35*dt(u,2,.1),s.tail.rotation.z=.25*dt(u,15,.6),Re(s,r-3.2,o+3.4,.6)})}{const e=[ho(),ho("#c8743a"),ho()],n=Vx();i.add(n.root,...e.map(u=>u.root));const s=5,r=u=>ys.r*(1+.16*Math.sin(3*u+.5)),o=u=>[ys.x+Math.sin(u)*r(u),ys.z+Math.cos(u)*r(u)],a=Ot*ys.r,c=Math.round(a/.28),l=Math.round(a/.9),h=u=>{const[d,f]=o(u-.01),[g,_]=o(u+.01);return Math.atan2(g-d,_-f)};t.push(u=>{const d=Ot*s*u/Ne;e.forEach((y,x)=>{const C=d-x*.38+.07*dt(u,7,x/3),[R,w]=o(C),I=C/Ot*c;y.legs[0].rotation.x=.8*Math.sin(Ot*I),y.legs[1].rotation.x=-.8*Math.sin(Ot*I),y.body.position.y=.27+.04*Math.abs(Math.sin(Ot*I)),y.body.rotation.x=.25;const b=.7+.5*dt(u,240,x*.3);y.wings[0].rotation.z=-b,y.wings[1].rotation.z=b,y.head.rotation.x=-.2,Re(y,R,w,h(C))});const f=1.15+.25*dt(u,3),g=d-f,[_,m]=o(g),p=g/Ot*l,M=Math.sin(Ot*p);n.legs[0].rotation.x=n.legs[1].rotation.x=.75*M,n.legs[2].rotation.x=n.legs[3].rotation.x=-.75*M,n.body.rotation.x=.12*Math.cos(Ot*p),n.body.position.y=.46+.07*Math.abs(Math.cos(Ot*p)),n.tail.rotation.z=.6*dt(u,150),n.head.rotation.x=-.15+.12*Math.max(0,dt(u,20))**6,Re(n,_,m,h(g))})}{const n=[[-1.6,-1.8],[1.5,-2.1],[-.6,-3.1],[2.6,-.4],[-2.6,-.2]].map(([s,r],o)=>({c:ho(o%2?"#d98a4a":"#fbf7ef"),ox:s,oz:r,off:o*.21}));for(const s of n)i.add(s.c.root);t.push(s=>{for(const r of n){const o=Math.max(0,dt(s,24+Math.round(r.off*20),r.off))**6;r.c.head.rotation.x=1.1*o,r.c.body.rotation.x=.35*o;const a=.5*Math.sin(Ot*(s/Ne+r.off)),c=.5*Math.cos(Ot*(s/Ne+r.off)),l=Math.max(0,dt(s,30,r.off+.5));r.c.legs[0].rotation.x=.4*Math.sin(Ot*we(s,90,r.off))*l,r.c.legs[1].rotation.x=-.4*Math.sin(Ot*we(s,90,r.off))*l;const h=Ot*(s/Ne+r.off)+Math.PI/2+.6*dt(s,4,r.off);Re(r.c,Mr.x+r.ox+a,Mr.z+r.oz+c,h)}})}return{root:i,update(e){for(const n of t)n(e)}}}const Ih=[[[-15,21,24],[0,9,-7]],[[12,13,39],[1,2.5,21]],[[38,11,42],[15,1.5,28]],[[66,15,6],[26,1.5,0]],[[18,-9,-74],[0,0,-10]],[[-66,12,-20],[-16,1,4]],[[-44,9,38],[-18,1,25]],[[-24,12,45],[-3,2,26]]];function Wx(i){const t=new wo(Ih.map(r=>new L(...r[0])),!0,"centripetal"),e=new wo(Ih.map(r=>new L(...r[1])),!0,"centripetal"),n=new L,s=new L;return{update(r){const o=we(r,1);t.getPoint(o,n),e.getPoint(o,s),i.position.copy(n),i.lookAt(s)}}}const wr=new URLSearchParams(location.search),Uh=parseFloat(wr.get("t")||"0")%Ne,Xx=parseFloat(wr.get("speed")||"1"),Yx=wr.has("freeze"),qx=wr.has("free"),xn=new s_({antialias:!0,powerPreference:"high-performance"});xn.setPixelRatio(Math.min(window.devicePixelRatio,2));xn.setSize(window.innerWidth,window.innerHeight);xn.shadowMap.enabled=!0;xn.shadowMap.type=Fh;xn.toneMapping=Bh;xn.toneMappingExposure=1.05;document.getElementById("app").appendChild(xn.domElement);const Ze=new r_,wi=new pn(45,window.innerWidth/window.innerHeight,.3,1500),Lu=_x();Ze.add(Lu.dome);const wa=yx(Ze,Lu);Ze.add(gx());const yr=bx();Ze.add(yr.group);const Sr=Tx();Ze.add(Sr.root);const Du=Px();Ze.add(Du.root);const Iu=xx();Ze.add(Iu.root);const Uu=Mx();Ze.add(Uu.root);const Nu=Rx(yr.flags);Ze.add(Nu.root);const Ou=Cx([...yr.smoke,...Sr.smoke]);Ze.add(Ou.mesh);const Fu=zx();Ze.add(Fu.root);const zu=Bx(Sr.anchors);Ze.add(zu.root);const Bu=Gx();Ze.add(Bu.root);const Zx=Wx(wi);let Cs=null;qx&&(wi.position.set(60,50,70),Cs=new K_(wi,xn.domElement),Cs.target.set(0,4,8),Cs.enableDamping=!0);const Kx=document.getElementById("hud"),jx=document.getElementById("bar"),$x=document.getElementById("clock");wr.get("hud")==="0"&&(Kx.style.display="none");function ku(i){wa.update(i);const t=wa.state.dusk;kc.emissiveIntensity=wa.state.glow*1.8,Iu.update(i),Uu.update(i),Nu.update(i),Ou.update(i),Du.update(i,1-.28*t),Sr.updateTrees(i);const e=.75+.15*dt(i,97)+.1*dt(i,151,.3);yr.fire.material.emissiveIntensity=2.2*e,yr.forgeLight.intensity=6*e,Sr.ovenGlow.material.emissiveIntensity=1.4+.3*dt(i,83),Fu.update(i),zu.update(i),Bu.update(i),Cs||Zx.update(i)}const Jx=performance.now();let hr=null;function Qx(){return hr!==null?hr:Yx?Uh:(((performance.now()-Jx)/1e3*Xx+Uh)%Ne+Ne)%Ne}let Nh=-1;xn.setAnimationLoop(()=>{const i=Qx();ku(i),Cs&&Cs.update(),xn.render(Ze,wi),jx.style.transform=`scaleX(${i/Ne})`;const t=Math.floor(i);t!==Nh&&(Nh=t,$x.textContent=`0:${String(t).padStart(2,"0")} / 1:00`)});window.addEventListener("resize",()=>{wi.aspect=window.innerWidth/window.innerHeight,wi.updateProjectionMatrix(),xn.setSize(window.innerWidth,window.innerHeight)});window.__sky={setTime(i){hr=i===null?null:(i%Ne+Ne)%Ne,hr!==null&&(ku(hr),xn.render(Ze,wi))},renderer:xn,scene:Ze,camera:wi};document.body.classList.add("ready");
