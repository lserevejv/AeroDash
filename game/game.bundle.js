var sx=Object.defineProperty;var Kn=(n,e,t)=>()=>{if(t)throw t[0];try{return n&&(e=n(n=0)),e}catch(i){throw t=[i],i}};var nl=(n,e)=>{for(var t in e)sx(n,t,{get:e[t],enumerable:!0})};function rx(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ox(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Io(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Pp(){let n=Io("canvas");return n.style.display="block",n}function Po(...n){let e="THREE."+n.shift();Rr?Rr("log",e,...n):console.log(e,...n)}function Dp(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function je(...n){n=Dp(n);let e="THREE."+n.shift();if(Rr)Rr("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=Dp(n);let e="THREE."+n.shift();if(Rr)Rr("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function zs(...n){let e=n.join(" ");e in Ef||(Ef[e]=!0,je(...n))}function Lp(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Zi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]+"-"+bn[e&255]+bn[e>>8&255]+"-"+bn[e>>16&15|64]+bn[e>>24&255]+"-"+bn[t&63|128]+bn[t>>8&255]+"-"+bn[t>>16&255]+bn[t>>24&255]+bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]).toLowerCase()}function ot(n,e,t){return Math.max(e,Math.min(t,n))}function ax(n,e){return(n%e+e)%e}function Xu(n,e,t){return(1-t)*n+t*e}function Ri(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function yt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function lx(){let n={enabled:!0,workingColorSpace:Ro,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pt&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(s.r=Tr(s.r),s.g=Tr(s.g),s.b=Tr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?Fo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return zs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return zs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ro]:{primaries:e,whitePoint:i,transfer:Fo,toXYZ:Tf,fromXYZ:Cf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:i,transfer:pt,toXYZ:Tf,fromXYZ:Cf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),n}function Ji(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Tr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}function Zu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Wl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}function ju(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}function oh(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Us.fromArray(n,r);let a=s.x*Math.abs(Us.x)+s.y*Math.abs(Us.y)+s.z*Math.abs(Us.z),l=e.dot(Us),c=t.dot(Us),u=i.dot(Us);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}function dl(n,e,t,i,s,r){Mr.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(bo.x=r*Mr.x-s*Mr.y,bo.y=s*Mr.x+r*Mr.y):bo.copy(Mr),n.copy(e),n.x+=bo.x,n.y+=bo.y,n.applyMatrix4(kp)}function Mx(n,e,t,i,s,r,o,a){let l;if(e.side===Xt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===gi,a),l===null)return null;vl.copy(a),vl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(vl);return c<t.near||c>t.far?null:{distance:c,point:vl.clone(),object:n}}function bl(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,gl),n.getVertexPosition(l,xl),n.getVertexPosition(c,yl);let u=Mx(n,e,t,i,gl,xl,yl,zf);if(u){let d=new N;Yi.getBarycoord(zf,gl,xl,yl,d),s&&(u.uv=Yi.getInterpolatedAttribute(s,a,l,c,d,new ye)),r&&(u.uv1=Yi.getInterpolatedAttribute(r,a,l,c,d,new ye)),o&&(u.normal=Yi.getInterpolatedAttribute(o,a,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new N,materialIndex:0};Yi.getNormal(gl,xl,yl,h.normal),u.face=h,u.barycoord=d}return u}function Wf(n,e,t,i,s,r,o){let a=Eh.distanceSqToPoint(n);if(a<t){let l=new N;Eh.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}function Wh(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let h=(o-r)/c-(a-r)/(c+u)+(a-o)/u,g=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,g*=u,s(o,a,h,g)},calc:function(r){let o=r*r,a=o*r;return n+e*r+t*o+i*a}}}function $f(n,e,t,i,s){let r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function Cx(n,e){let t=1-n;return t*t*e}function Ax(n,e){return 2*(1-n)*n*e}function Rx(n,e){return n*n*e}function To(n,e,t,i){return Cx(n,e)+Ax(n,t)+Rx(n,i)}function Fx(n,e){let t=1-n;return t*t*t*e}function Ix(n,e){let t=1-n;return 3*t*t*n*e}function Px(n,e){return 3*(1-n)*n*n*e}function Dx(n,e){return n*n*n*e}function Co(n,e,t,i,s){return Fx(n,e)+Ix(n,t)+Px(n,i)+Dx(n,s)}function Lx(n,e,t=2){let i=e&&e.length,s=i?e[0]*t:n.length,r=Bp(n,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=Ox(n,e,r,t)),n.length>80*t){a=n[0],l=n[1];let u=a,d=l;for(let h=t;h<s;h+=t){let g=n[h],v=n[h+1];g<a&&(a=g),v<l&&(l=v),g>u&&(u=g),v>d&&(d=v)}c=Math.max(u-a,d-l),c=c!==0?32767/c:0}return jo(r,o,t,a,l,c,0),o}function Bp(n,e,t,i,s){let r;if(s===Jx(n,e,t,i)>0)for(let o=e;o<t;o+=i)r=Yf(o/i|0,n[o],n[o+1],r);else for(let o=t-i;o>=e;o-=i)r=Yf(o/i|0,n[o],n[o+1],r);return r&&Ur(r,r.next)&&(ea(r),r=r.next),r}function Xs(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ur(t,t.next)||Pt(t.prev,t,t.next)===0)){if(ea(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function jo(n,e,t,i,s,r,o){if(!n)return;!o&&r&&Wx(n,i,s,r);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?Ux(n,i,s,r):Nx(n)){e.push(l.i,n.i,c.i),ea(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=kx(Xs(n),e),jo(n,e,t,i,s,r,2)):o===2&&Bx(n,e,t,i,s,r):jo(Xs(n),e,t,i,s,r,1);break}}}function Nx(n){let e=n.prev,t=n,i=n.next;if(Pt(e,t,i)>=0)return!1;let s=e.x,r=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(s,r,o),d=Math.min(a,l,c),h=Math.max(s,r,o),g=Math.max(a,l,c),v=i.next;for(;v!==e;){if(v.x>=u&&v.x<=h&&v.y>=d&&v.y<=g&&wo(s,a,r,l,o,c,v.x,v.y)&&Pt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Ux(n,e,t,i){let s=n.prev,r=n,o=n.next;if(Pt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,u=s.y,d=r.y,h=o.y,g=Math.min(a,l,c),v=Math.min(u,d,h),S=Math.max(a,l,c),p=Math.max(u,d,h),f=Th(g,v,e,t,i),b=Th(S,p,e,t,i),_=n.prevZ,m=n.nextZ;for(;_&&_.z>=f&&m&&m.z<=b;){if(_.x>=g&&_.x<=S&&_.y>=v&&_.y<=p&&_!==s&&_!==o&&wo(a,u,l,d,c,h,_.x,_.y)&&Pt(_.prev,_,_.next)>=0||(_=_.prevZ,m.x>=g&&m.x<=S&&m.y>=v&&m.y<=p&&m!==s&&m!==o&&wo(a,u,l,d,c,h,m.x,m.y)&&Pt(m.prev,m,m.next)>=0))return!1;m=m.nextZ}for(;_&&_.z>=f;){if(_.x>=g&&_.x<=S&&_.y>=v&&_.y<=p&&_!==s&&_!==o&&wo(a,u,l,d,c,h,_.x,_.y)&&Pt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;m&&m.z<=b;){if(m.x>=g&&m.x<=S&&m.y>=v&&m.y<=p&&m!==s&&m!==o&&wo(a,u,l,d,c,h,m.x,m.y)&&Pt(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function kx(n,e){let t=n;do{let i=t.prev,s=t.next.next;!Ur(i,s)&&zp(i,t,t.next,s)&&Qo(i,s)&&Qo(s,i)&&(e.push(i.i,t.i,s.i),ea(t),ea(t.next),t=n=s),t=t.next}while(t!==n);return Xs(t)}function Bx(n,e,t,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$x(o,a)){let l=Hp(o,a);o=Xs(o,o.next),l=Xs(l,l.next),jo(o,e,t,i,s,r,0),jo(l,e,t,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function Ox(n,e,t,i){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*i,l=r<o-1?e[r+1]*i:n.length,c=Bp(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Xx(c))}s.sort(zx);for(let r=0;r<s.length;r++)t=Hx(s[r],t);return t}function zx(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Hx(n,e){let t=Gx(n,e);if(!t)return e;let i=Hp(t,n);return Xs(i,i.next),Xs(t,t.next)}function Gx(n,e){let t=e,i=n.x,s=n.y,r=-1/0,o;if(Ur(n,t))return t;do{if(Ur(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Op(s<c?i:r,s,l,c,s<c?r:i,s,t.x,t.y)){let d=Math.abs(s-t.y)/(i-t.x);Qo(t,n)&&(d<u||d===u&&(t.x>o.x||t.x===o.x&&Vx(o,t)))&&(o=t,u=d)}t=t.next}while(t!==a);return o}function Vx(n,e){return Pt(n.prev,n,e.prev)<0&&Pt(e.next,n,n.next)<0}function Wx(n,e,t,i){let s=n;do s.z===0&&(s.z=Th(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,qx(s)}function qx(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,t*=2}while(e>1);return n}function Th(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Xx(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Op(n,e,t,i,s,r,o,a){return(s-o)*(e-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(i-a)}function wo(n,e,t,i,s,r,o,a){return!(n===o&&e===a)&&Op(n,e,t,i,s,r,o,a)}function $x(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Yx(n,e)&&(Qo(n,e)&&Qo(e,n)&&Zx(n,e)&&(Pt(n.prev,n,e.prev)||Pt(n,e.prev,e))||Ur(n,e)&&Pt(n.prev,n,n.next)>0&&Pt(e.prev,e,e.next)>0)}function Pt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ur(n,e){return n.x===e.x&&n.y===e.y}function zp(n,e,t,i){let s=Cl(Pt(n,e,t)),r=Cl(Pt(n,e,i)),o=Cl(Pt(t,i,n)),a=Cl(Pt(t,i,e));return!!(s!==r&&o!==a||s===0&&Tl(n,t,e)||r===0&&Tl(n,i,e)||o===0&&Tl(t,n,i)||a===0&&Tl(t,e,i))}function Tl(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Cl(n){return n>0?1:n<0?-1:0}function Yx(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&zp(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Qo(n,e){return Pt(n.prev,n,n.next)<0?Pt(n,e,n.next)>=0&&Pt(n,n.prev,e)>=0:Pt(n,e,n.prev)<0||Pt(n,n.next,e)<0}function Zx(n,e){let t=n,i=!1,s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Hp(n,e){let t=Ch(n.i,n.x,n.y),i=Ch(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Yf(n,e,t,i){let s=Ch(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ea(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ch(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Jx(n,e,t,i){let s=0;for(let r=e,o=t-i;r<t;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}function Zf(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Jf(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}function Kx(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}function Ks(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Kf(s))s.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Kf(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function En(n){let e={};for(let t=0;t<n.length;t++){let i=Ks(n[t]);for(let s in i)e[s]=i[s]}return e}function Kf(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function jx(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function qh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}function Al(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function ty(){this._document.hidden===!1&&this.reset()}function Yh(n,e,t,i){let s=uy(i);switch(t){case Hh:return n*e;case Vr:return n*e/s.components*s.byteLength;case Sc:return n*e/s.components*s.byteLength;case Ss:return n*e*2/s.components*s.byteLength;case Ec:return n*e*2/s.components*s.byteLength;case Gh:return n*e*3/s.components*s.byteLength;case ri:return n*e*4/s.components*s.byteLength;case wc:return n*e*4/s.components*s.byteLength;case ga:case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ya:case _a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cc:case Rc:return Math.max(n,16)*Math.max(e,8)/4;case Tc:case Ac:return Math.max(n,8)*Math.max(e,8)/2;case Fc:case Ic:case Dc:case Lc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Pc:case va:case Nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Bc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case zc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Xc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $c:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Zc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Jc:case Kc:case jc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Qc:case eu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ba:case tu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uy(n){switch(n){case Sn:case kh:return{byteLength:1,components:1};case Hr:case Bh:case dn:return{byteLength:2,components:1};case bc:case Mc:return{byteLength:2,components:4};case vi:case vc:case si:return{byteLength:4,components:1};case Oh:case zh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}var np,Dh,ip,oa,sp,zr,gi,Xt,Ct,ii,Ki,ct,Lh,Nh,mc,xi,rp,op,ap,lp,cp,aa,up,hp,Pl,Hs,dp,fp,pp,mp,gp,xp,yp,_p,vp,Dl,Ll,Nl,Gs,Ul,kl,Bl,Ol,gc,bp,Mp,_i,la,ca,ua,ts,ha,da,fa,Uh,vs,Js,xc,yc,pa,Qn,jt,zl,un,Sp,ma,wt,_c,bs,Sn,kh,Bh,Hr,vc,vi,si,dn,bc,Mc,Gr,Oh,zh,Hh,Gh,ri,Fi,Ms,Vr,Sc,Ss,Ec,wc,ga,xa,ya,_a,Tc,Cc,Ac,Rc,Fc,Ic,Pc,Dc,Lc,va,Nc,Uc,kc,Bc,Oc,zc,Hc,Gc,Vc,Wc,qc,Xc,$c,Yc,Zc,Jc,Kc,jc,Qc,eu,ba,tu,Ao,Hl,Il,_h,vh,bh,Mh,Ep,Ma,wp,bi,Kt,Ro,Fo,pt,Os,Sh,Tp,Cp,Ap,nu,Rp,Fp,iu,Ip,Gl,_t,Vh,mi,Ar,Ef,Rr,Np,Ii,bn,qu,Vl,ye,In,N,$u,wf,tt,Yu,Tf,Cf,at,cr,Wl,cx,Fr,ux,Ju,Tn,It,ql,qt,Do,Xl,ht,ur,di,hx,dx,cs,il,Hn,Af,Rf,ei,Lo,fx,Ff,hr,Vi,sl,go,px,mx,If,Pf,Df,Lf,gx,dr,Ku,kt,Ut,xx,Ir,Up,us,rl,le,Mn,No,ji,fi,Wi,Qu,qi,fr,pr,Nf,eh,th,nh,ih,sh,rh,Yi,Pi,Xi,pi,ol,mr,gr,xr,hs,ds,Ns,xo,al,ll,Us,Jt,cl,yx,lt,Uo,ko,et,_x,yo,ah,sn,vx,jn,lh,yr,Gn,_o,cn,dt,$l,wn,Bo,bx,yi,Dt,_r,vo,vr,br,Mr,bo,kp,ul,Mo,hl,Uf,ch,kf,Bt,$i,uh,fl,fs,hh,pl,dh,Oo,Ot,Bf,ks,ml,Of,gl,xl,yl,fh,_l,zf,vl,Xe,Vs,zo,Sr,Hf,Ml,Gf,Sx,So,Eo,Pn,ph,Ex,wx,Ai,Bs,Tx,Sl,Pr,Yl,Vf,Eh,El,wl,Vn,Ho,Ws,Qi,Zl,Go,ti,ms,Vo,Wn,Wo,Dr,qo,qn,Lr,Jl,qf,Xf,mh,gh,xh,qs,Xo,Kl,$o,jl,Yo,Zo,Jo,wh,Ql,Ko,Nr,Ah,Cr,Di,Li,Ni,ni,ta,hn,Qt,na,kr,ns,Qx,ey,ut,Br,xn,Cn,ia,ec,tc,gs,nc,ic,sc,rc,Xn,xs,oc,ac,lc,sa,ys,cc,uc,Gp,hc,Or,$s,yh,jf,Qf,dc,Rl,Fl,Ci,ra,ps,ep,tp,nn,Rh,Ys,_s,Fh,es,Er,wr,fc,pc,Zs,Xh,ny,$h,iy,sy,ry,oy,ay,ly,cy,Ih,Tt,CE,Ph,Zh=Kn(()=>{np=0,Dh=1,ip=2,oa=1,sp=2,zr=3,gi=0,Xt=1,Ct=2,ii=0,Ki=1,ct=2,Lh=3,Nh=4,mc=5,xi=100,rp=101,op=102,ap=103,lp=104,cp=200,aa=201,up=202,hp=203,Pl=204,Hs=205,dp=206,fp=207,pp=208,mp=209,gp=210,xp=211,yp=212,_p=213,vp=214,Dl=0,Ll=1,Nl=2,Gs=3,Ul=4,kl=5,Bl=6,Ol=7,gc=0,bp=1,Mp=2,_i=0,la=1,ca=2,ua=3,ts=4,ha=5,da=6,fa=7,Uh=300,vs=301,Js=302,xc=303,yc=304,pa=306,Qn=1e3,jt=1001,zl=1002,un=1003,Sp=1004,ma=1005,wt=1006,_c=1007,bs=1008,Sn=1009,kh=1010,Bh=1011,Hr=1012,vc=1013,vi=1014,si=1015,dn=1016,bc=1017,Mc=1018,Gr=1020,Oh=35902,zh=35899,Hh=1021,Gh=1022,ri=1023,Fi=1026,Ms=1027,Vr=1028,Sc=1029,Ss=1030,Ec=1031,wc=1033,ga=33776,xa=33777,ya=33778,_a=33779,Tc=35840,Cc=35841,Ac=35842,Rc=35843,Fc=36196,Ic=37492,Pc=37496,Dc=37488,Lc=37489,va=37490,Nc=37491,Uc=37808,kc=37809,Bc=37810,Oc=37811,zc=37812,Hc=37813,Gc=37814,Vc=37815,Wc=37816,qc=37817,Xc=37818,$c=37819,Yc=37820,Zc=37821,Jc=36492,Kc=36494,jc=36495,Qc=36283,eu=36284,ba=36285,tu=36286,Ao=2300,Hl=2301,Il=2302,_h=2303,vh=2400,bh=2401,Mh=2402,Ep=3200,Ma=0,wp=1,bi="",Kt="srgb",Ro="srgb-linear",Fo="linear",pt="srgb",Os=7680,Sh=519,Tp=512,Cp=513,Ap=514,nu=515,Rp=516,Fp=517,iu=518,Ip=519,Gl=35044,_t=35048,Vh="300 es",mi=2e3,Ar=2001;Ef={},Rr=null;Np={[Dl]:Ll,[Nl]:Bl,[Ul]:Ol,[Gs]:kl,[Ll]:Dl,[Bl]:Nl,[Ol]:Ul,[kl]:Gs},Ii=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qu=Math.PI/180,Vl=180/Math.PI;ye=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ot(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},In=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[o+0],g=r[o+1],v=r[o+2],S=r[o+3];if(d!==S||l!==h||c!==g||u!==v){let p=l*h+c*g+u*v+d*S;p<0&&(h=-h,g=-g,v=-v,S=-S,p=-p);let f=1-a;if(p<.9995){let b=Math.acos(p),_=Math.sin(b);f=Math.sin(f*b)/_,a=Math.sin(a*b)/_,l=l*f+h*a,c=c*f+g*a,u=u*f+v*a,d=d*f+S*a}else{l=l*f+h*a,c=c*f+g*a,u=u*f+v*a,d=d*f+S*a;let b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],h=r[o+1],g=r[o+2],v=r[o+3];return e[t]=a*v+u*d+l*g-c*h,e[t+1]=l*v+u*h+c*d-a*g,e[t+2]=c*v+u*g+a*h-l*d,e[t+3]=u*v-a*d-l*h-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),h=l(i/2),g=l(s/2),v=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*g*v,this._y=c*g*d-h*u*v,this._z=c*u*v+h*g*d,this._w=c*u*d-h*g*v;break;case"YXZ":this._x=h*u*d+c*g*v,this._y=c*g*d-h*u*v,this._z=c*u*v-h*g*d,this._w=c*u*d+h*g*v;break;case"ZXY":this._x=h*u*d-c*g*v,this._y=c*g*d+h*u*v,this._z=c*u*v+h*g*d,this._w=c*u*d-h*g*v;break;case"ZYX":this._x=h*u*d-c*g*v,this._y=c*g*d+h*u*v,this._z=c*u*v-h*g*d,this._w=c*u*d+h*g*v;break;case"YZX":this._x=h*u*d+c*g*v,this._y=c*g*d+h*u*v,this._z=c*u*v-h*g*d,this._w=c*u*d-h*g*v;break;case"XZY":this._x=h*u*d-c*g*v,this._y=c*g*d-h*u*v,this._z=c*u*v+h*g*d,this._w=c*u*d+h*g*v;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){let g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(u-l)*g,this._y=(r-c)*g,this._z=(o-s)*g}else if(i>a&&i>d){let g=2*Math.sqrt(1+i-a-d);this._w=(u-l)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+c)/g}else if(a>d){let g=2*Math.sqrt(1+a-i-d);this._w=(r-c)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(l+u)/g}else{let g=2*Math.sqrt(1+d-i-a);this._w=(o-s)/g,this._x=(r+c)/g,this._y=(l+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return $u.copy(this).projectOnVector(e),this.sub($u)}reflect(e){return this.sub($u.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ot(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$u=new N,wf=new In,tt=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],g=i[5],v=i[8],S=s[0],p=s[3],f=s[6],b=s[1],_=s[4],m=s[7],E=s[2],x=s[5],w=s[8];return r[0]=o*S+a*b+l*E,r[3]=o*p+a*_+l*x,r[6]=o*f+a*m+l*w,r[1]=c*S+u*b+d*E,r[4]=c*p+u*_+d*x,r[7]=c*f+u*m+d*w,r[2]=h*S+g*b+v*E,r[5]=h*p+g*_+v*x,r[8]=h*f+g*m+v*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,g=c*r-o*l,v=t*d+i*h+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/v;return e[0]=d*S,e[1]=(s*c-u*i)*S,e[2]=(a*i-s*o)*S,e[3]=h*S,e[4]=(u*t-s*l)*S,e[5]=(s*r-a*t)*S,e[6]=g*S,e[7]=(i*l-c*t)*S,e[8]=(o*t-i*r)*S,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return zs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Yu.makeScale(e,t)),this}rotate(e){return zs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Yu.makeRotation(-e)),this}translate(e,t){return zs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Yu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yu=new tt,Tf=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cf=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);at=lx();Wl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{cr===void 0&&(cr=Io("canvas")),cr.width=e.width,cr.height=e.height;let s=cr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=cr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Io("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ji(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ji(t[i]/255)*255):t[i]=Ji(t[i]);return{data:t,width:e.width,height:e.height}}else return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},cx=0,Fr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cx++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zu(s[o].image)):r.push(Zu(s[o]))}else r=Zu(s);i.url=r}return t||(e.images[this.uuid]=i),i}};ux=0,Ju=new N,Tn=class n extends Ii{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=jt,s=jt,r=wt,o=bs,a=ri,l=Sn,c=n.DEFAULT_ANISOTROPY,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ux++}),this.uuid=Zi(),this.name="",this.source=new Fr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ju).x}get height(){return this.source.getSize(Ju).y}get depth(){return this.source.getSize(Ju).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){je(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qn:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case zl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qn:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case zl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=Uh;Tn.DEFAULT_ANISOTROPY=1;It=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],g=l[5],v=l[9],S=l[2],p=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-S)<.01&&Math.abs(v-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+S)<.1&&Math.abs(v+p)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,m=(g+1)/2,E=(f+1)/2,x=(u+h)/4,w=(d+S)/4,y=(v+p)/4;return _>m&&_>E?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=x/i,r=w/i):m>E?m<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(m),i=x/s,r=y/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=w/r,s=y/r),this.set(i,s,r,t),this}let b=Math.sqrt((p-v)*(p-v)+(d-S)*(d-S)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(p-v)/b,this.y=(d-S)/b,this.z=(h-u)/b,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ql=class extends Ii{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Tn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Fr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qt=class extends ql{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Do=class extends Tn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Xl=class extends Tn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ht=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,o,a,l,c,u,d,h,g,v,S,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,d,h,g,v,S,p)}set(e,t,i,s,r,o,a,l,c,u,d,h,g,v,S,p){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=g,f[7]=v,f[11]=S,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/ur.setFromMatrixColumn(e,0).length(),r=1/ur.setFromMatrixColumn(e,1).length(),o=1/ur.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=o*u,g=o*d,v=a*u,S=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=g+v*c,t[5]=h-S*c,t[9]=-a*l,t[2]=S-h*c,t[6]=v+g*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*u,g=l*d,v=c*u,S=c*d;t[0]=h+S*a,t[4]=v*a-g,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=g*a-v,t[6]=S+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*u,g=l*d,v=c*u,S=c*d;t[0]=h-S*a,t[4]=-o*d,t[8]=v+g*a,t[1]=g+v*a,t[5]=o*u,t[9]=S-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*u,g=o*d,v=a*u,S=a*d;t[0]=l*u,t[4]=v*c-g,t[8]=h*c+S,t[1]=l*d,t[5]=S*c+h,t[9]=g*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,g=o*c,v=a*l,S=a*c;t[0]=l*u,t[4]=S-h*d,t[8]=v*d+g,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=g*d+v,t[10]=h-S*d}else if(e.order==="XZY"){let h=o*l,g=o*c,v=a*l,S=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+S,t[5]=o*u,t[9]=g*d-v,t[2]=v*d-g,t[6]=a*u,t[10]=S*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hx,e,dx)}lookAt(e,t,i){let s=this.elements;return Hn.subVectors(e,t),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),cs.crossVectors(i,Hn),cs.lengthSq()===0&&(Math.abs(i.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),cs.crossVectors(i,Hn)),cs.normalize(),il.crossVectors(Hn,cs),s[0]=cs.x,s[4]=il.x,s[8]=Hn.x,s[1]=cs.y,s[5]=il.y,s[9]=Hn.y,s[2]=cs.z,s[6]=il.z,s[10]=Hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],g=i[13],v=i[2],S=i[6],p=i[10],f=i[14],b=i[3],_=i[7],m=i[11],E=i[15],x=s[0],w=s[4],y=s[8],T=s[12],I=s[1],P=s[5],L=s[9],z=s[13],$=s[2],V=s[6],X=s[10],B=s[14],Q=s[3],he=s[7],ae=s[11],W=s[15];return r[0]=o*x+a*I+l*$+c*Q,r[4]=o*w+a*P+l*V+c*he,r[8]=o*y+a*L+l*X+c*ae,r[12]=o*T+a*z+l*B+c*W,r[1]=u*x+d*I+h*$+g*Q,r[5]=u*w+d*P+h*V+g*he,r[9]=u*y+d*L+h*X+g*ae,r[13]=u*T+d*z+h*B+g*W,r[2]=v*x+S*I+p*$+f*Q,r[6]=v*w+S*P+p*V+f*he,r[10]=v*y+S*L+p*X+f*ae,r[14]=v*T+S*z+p*B+f*W,r[3]=b*x+_*I+m*$+E*Q,r[7]=b*w+_*P+m*V+E*he,r[11]=b*y+_*L+m*X+E*ae,r[15]=b*T+_*z+m*B+E*W,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],g=e[14],v=e[3],S=e[7],p=e[11],f=e[15],b=l*g-c*h,_=a*g-c*d,m=a*h-l*d,E=o*g-c*u,x=o*h-l*u,w=o*d-a*u;return t*(S*b-p*_+f*m)-i*(v*b-p*E+f*x)+s*(v*_-S*E+f*w)-r*(v*m-S*x+p*w)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],g=e[11],v=e[12],S=e[13],p=e[14],f=e[15],b=t*a-i*o,_=t*l-s*o,m=t*c-r*o,E=i*l-s*a,x=i*c-r*a,w=s*c-r*l,y=u*S-d*v,T=u*p-h*v,I=u*f-g*v,P=d*p-h*S,L=d*f-g*S,z=h*f-g*p,$=b*z-_*L+m*P+E*I-x*T+w*y;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/$;return e[0]=(a*z-l*L+c*P)*V,e[1]=(s*L-i*z-r*P)*V,e[2]=(S*w-p*x+f*E)*V,e[3]=(h*x-d*w-g*E)*V,e[4]=(l*I-o*z-c*T)*V,e[5]=(t*z-s*I+r*T)*V,e[6]=(p*m-v*w-f*_)*V,e[7]=(u*w-h*m+g*_)*V,e[8]=(o*L-a*I+c*y)*V,e[9]=(i*I-t*L-r*y)*V,e[10]=(v*x-S*m+f*b)*V,e[11]=(d*m-u*x-g*b)*V,e[12]=(a*T-o*P-l*y)*V,e[13]=(t*P-i*T+s*y)*V,e[14]=(S*_-v*E-p*b)*V,e[15]=(u*E-d*_+h*b)*V,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,g=r*u,v=r*d,S=o*u,p=o*d,f=a*d,b=l*c,_=l*u,m=l*d,E=i.x,x=i.y,w=i.z;return s[0]=(1-(S+f))*E,s[1]=(g+m)*E,s[2]=(v-_)*E,s[3]=0,s[4]=(g-m)*x,s[5]=(1-(h+f))*x,s[6]=(p+b)*x,s[7]=0,s[8]=(v+_)*w,s[9]=(p-b)*w,s[10]=(1-(h+S))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=ur.set(s[0],s[1],s[2]).length(),a=ur.set(s[4],s[5],s[6]).length(),l=ur.set(s[8],s[9],s[10]).length();r<0&&(o=-o),di.copy(this);let c=1/o,u=1/a,d=1/l;return di.elements[0]*=c,di.elements[1]*=c,di.elements[2]*=c,di.elements[4]*=u,di.elements[5]*=u,di.elements[6]*=u,di.elements[8]*=d,di.elements[9]*=d,di.elements[10]*=d,t.setFromRotationMatrix(di),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,s,r,o,a=mi,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),g=(i+s)/(i-s),v,S;if(l)v=r/(o-r),S=o*r/(o-r);else if(a===mi)v=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===Ar)v=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=mi,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),g=-(i+s)/(i-s),v,S;if(l)v=1/(o-r),S=o/(o-r);else if(a===mi)v=-2/(o-r),S=-(o+r)/(o-r);else if(a===Ar)v=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ur=new N,di=new ht,hx=new N(0,0,0),dx=new N(1,1,1),cs=new N,il=new N,Hn=new N,Af=new ht,Rf=new In,ei=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ot(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Af.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Af,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rf.setFromEuler(this),this.setFromQuaternion(Rf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ei.DEFAULT_ORDER="XYZ";Lo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fx=0,Ff=new N,hr=new In,Vi=new ht,sl=new N,go=new N,px=new N,mx=new In,If=new N(1,0,0),Pf=new N(0,1,0),Df=new N(0,0,1),Lf={type:"added"},gx={type:"removed"},dr={type:"childadded",child:null},Ku={type:"childremoved",child:null},kt=class n extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fx++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new N,t=new ei,i=new In,s=new N(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new tt}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hr.setFromAxisAngle(e,t),this.quaternion.multiply(hr),this}rotateOnWorldAxis(e,t){return hr.setFromAxisAngle(e,t),this.quaternion.premultiply(hr),this}rotateX(e){return this.rotateOnAxis(If,e)}rotateY(e){return this.rotateOnAxis(Pf,e)}rotateZ(e){return this.rotateOnAxis(Df,e)}translateOnAxis(e,t){return Ff.copy(e).applyQuaternion(this.quaternion),this.position.add(Ff.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(If,e)}translateY(e){return this.translateOnAxis(Pf,e)}translateZ(e){return this.translateOnAxis(Df,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?sl.copy(e):sl.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(go,sl,this.up):Vi.lookAt(sl,go,this.up),this.quaternion.setFromRotationMatrix(Vi),s&&(Vi.extractRotation(s.matrixWorld),hr.setFromRotationMatrix(Vi),this.quaternion.premultiply(hr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lf),dr.child=e,this.dispatchEvent(dr),dr.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gx),Ku.child=e,this.dispatchEvent(Ku),Ku.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lf),dr.child=e,this.dispatchEvent(dr),dr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,e,px),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,mx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),g=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=s,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};kt.DEFAULT_UP=new N(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ut=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},xx={type:"move"},Ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let S of e.hand.values()){let p=t.getJointPose(S,i),f=this._getHandJoint(c,S);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),g=.02,v=.005;c.inputState.pinching&&h>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xx)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ut;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Up={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},us={h:0,s:0,l:0},rl={h:0,s:0,l:0};le=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=ax(e,1),t=ot(t,0,1),i=ot(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ju(o,r,e+1/3),this.g=ju(o,r,e),this.b=ju(o,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=Kt){function i(r){r!==void 0&&parseFloat(r)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){let i=Up[e.toLowerCase()];return i!==void 0?this.setHex(i,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}copyLinearToSRGB(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return at.workingToColorSpace(Mn.copy(this),e),Math.round(ot(Mn.r*255,0,255))*65536+Math.round(ot(Mn.g*255,0,255))*256+Math.round(ot(Mn.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Mn.copy(this),t);let i=Mn.r,s=Mn.g,r=Mn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=Kt){at.workingToColorSpace(Mn.copy(this),e);let t=Mn.r,i=Mn.g,s=Mn.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(us),this.setHSL(us.h+e,us.s+t,us.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(us),e.getHSL(rl);let i=Xu(us.h,rl.h,t),s=Xu(us.s,rl.s,t),r=Xu(us.l,rl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mn=new le;le.NAMES=Up;No=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new le(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ji=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},fi=new N,Wi=new N,Qu=new N,qi=new N,fr=new N,pr=new N,Nf=new N,eh=new N,th=new N,nh=new N,ih=new It,sh=new It,rh=new It,Yi=class n{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),fi.subVectors(e,t),s.cross(fi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){fi.subVectors(s,t),Wi.subVectors(i,t),Qu.subVectors(e,t);let o=fi.dot(fi),a=fi.dot(Wi),l=fi.dot(Qu),c=Wi.dot(Wi),u=Wi.dot(Qu),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,g=(c*l-a*u)*h,v=(o*u-a*l)*h;return r.set(1-g-v,v,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,qi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qi.x),l.addScaledVector(o,qi.y),l.addScaledVector(a,qi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ih.setScalar(0),sh.setScalar(0),rh.setScalar(0),ih.fromBufferAttribute(e,t),sh.fromBufferAttribute(e,i),rh.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ih,r.x),o.addScaledVector(sh,r.y),o.addScaledVector(rh,r.z),o}static isFrontFacing(e,t,i,s){return fi.subVectors(i,t),Wi.subVectors(e,t),fi.cross(Wi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),Wi.subVectors(this.a,this.b),fi.cross(Wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;fr.subVectors(s,i),pr.subVectors(r,i),eh.subVectors(e,i);let l=fr.dot(eh),c=pr.dot(eh);if(l<=0&&c<=0)return t.copy(i);th.subVectors(e,s);let u=fr.dot(th),d=pr.dot(th);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(fr,o);nh.subVectors(e,r);let g=fr.dot(nh),v=pr.dot(nh);if(v>=0&&g<=v)return t.copy(r);let S=g*c-l*v;if(S<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(i).addScaledVector(pr,a);let p=u*v-g*d;if(p<=0&&d-u>=0&&g-v>=0)return Nf.subVectors(r,s),a=(d-u)/(d-u+(g-v)),t.copy(s).addScaledVector(Nf,a);let f=1/(p+S+h);return o=S*f,a=h*f,t.copy(i).addScaledVector(fr,o).addScaledVector(pr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Pi=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,pi):pi.fromBufferAttribute(r,o),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ol.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ol.copy(i.boundingBox)),ol.applyMatrix4(e.matrixWorld),this.union(ol)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xo),al.subVectors(this.max,xo),mr.subVectors(e.a,xo),gr.subVectors(e.b,xo),xr.subVectors(e.c,xo),hs.subVectors(gr,mr),ds.subVectors(xr,gr),Ns.subVectors(mr,xr);let t=[0,-hs.z,hs.y,0,-ds.z,ds.y,0,-Ns.z,Ns.y,hs.z,0,-hs.x,ds.z,0,-ds.x,Ns.z,0,-Ns.x,-hs.y,hs.x,0,-ds.y,ds.x,0,-Ns.y,Ns.x,0];return!oh(t,mr,gr,xr,al)||(t=[1,0,0,0,1,0,0,0,1],!oh(t,mr,gr,xr,al))?!1:(ll.crossVectors(hs,ds),t=[ll.x,ll.y,ll.z],oh(t,mr,gr,xr,al))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Xi=[new N,new N,new N,new N,new N,new N,new N,new N],pi=new N,ol=new Pi,mr=new N,gr=new N,xr=new N,hs=new N,ds=new N,Ns=new N,xo=new N,al=new N,ll=new N,Us=new N;Jt=new N,cl=new ye,yx=0,lt=class extends Ii{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gl,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)cl.fromBufferAttribute(this,t),cl.applyMatrix3(e),this.setXY(t,cl.x,cl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ri(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=yt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),i=yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),i=yt(i,this.array),s=yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),i=yt(i,this.array),s=yt(s,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}},Uo=class extends lt{constructor(e,t,i){super(new Uint16Array(e),t,i)}},ko=class extends lt{constructor(e,t,i){super(new Uint32Array(e),t,i)}},et=class extends lt{constructor(e,t,i){super(new Float32Array(e),t,i)}},_x=new Pi,yo=new N,ah=new N,sn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):_x.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yo.subVectors(e,this.center);let t=yo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(yo,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ah.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yo.copy(e.center).add(ah)),this.expandByPoint(yo.copy(e.center).sub(ah))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},vx=0,jn=new ht,lh=new kt,yr=new N,Gn=new Pi,_o=new Pi,cn=new N,dt=class n extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vx++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rx(e)?ko:Uo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new tt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jn.makeRotationFromQuaternion(e),this.applyMatrix4(jn),this}rotateX(e){return jn.makeRotationX(e),this.applyMatrix4(jn),this}rotateY(e){return jn.makeRotationY(e),this.applyMatrix4(jn),this}rotateZ(e){return jn.makeRotationZ(e),this.applyMatrix4(jn),this}translate(e,t,i){return jn.makeTranslation(e,t,i),this.applyMatrix4(jn),this}scale(e,t,i){return jn.makeScale(e,t,i),this.applyMatrix4(jn),this}lookAt(e){return lh.lookAt(e),lh.updateMatrix(),this.applyMatrix4(lh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new et(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Gn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];_o.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Gn.min,_o.min),Gn.expandByPoint(cn),cn.addVectors(Gn.max,_o.max),Gn.expandByPoint(cn)):(Gn.expandByPoint(_o.min),Gn.expandByPoint(_o.max))}Gn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(cn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)cn.fromBufferAttribute(a,c),l&&(yr.fromBufferAttribute(e,c),cn.add(yr)),s=Math.max(s,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new lt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new N,l[y]=new N;let c=new N,u=new N,d=new N,h=new ye,g=new ye,v=new ye,S=new N,p=new N;function f(y,T,I){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,I),h.fromBufferAttribute(r,y),g.fromBufferAttribute(r,T),v.fromBufferAttribute(r,I),u.sub(c),d.sub(c),g.sub(h),v.sub(h);let P=1/(g.x*v.y-v.x*g.y);isFinite(P)&&(S.copy(u).multiplyScalar(v.y).addScaledVector(d,-g.y).multiplyScalar(P),p.copy(d).multiplyScalar(g.x).addScaledVector(u,-v.x).multiplyScalar(P),a[y].add(S),a[T].add(S),a[I].add(S),l[y].add(p),l[T].add(p),l[I].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let y=0,T=b.length;y<T;++y){let I=b[y],P=I.start,L=I.count;for(let z=P,$=P+L;z<$;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let _=new N,m=new N,E=new N,x=new N;function w(y){E.fromBufferAttribute(s,y),x.copy(E);let T=a[y];_.copy(T),_.sub(E.multiplyScalar(E.dot(T))).normalize(),m.crossVectors(x,T);let P=m.dot(l[y])<0?-1:1;o.setXYZW(y,_.x,_.y,_.z,P)}for(let y=0,T=b.length;y<T;++y){let I=b[y],P=I.start,L=I.count;for(let z=P,$=P+L;z<$;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new lt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);let s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,u=new N,d=new N;if(e)for(let h=0,g=e.count;h<g;h+=3){let v=e.getX(h+0),S=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,S),o.fromBufferAttribute(t,p),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u),g=0,v=0;for(let S=0,p=l.length;S<p;S++){a.isInterleavedBufferAttribute?g=l[S]*a.data.stride+a.offset:g=l[S]*u;for(let f=0;f<u;f++)h[v++]=c[g++]}return new lt(h,u,d)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,i);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){let h=c[u],g=e(h,i);l.push(g)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let g=c[d];u.push(g.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,g=d.length;h<g;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},$l=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gl,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},wn=new N,Bo=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ri(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=yt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ri(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ri(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ri(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ri(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),i=yt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),i=yt(i,this.array),s=yt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),i=yt(i,this.array),s=yt(s,this.array),r=yt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Po("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Po("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},bx=0,yi=class extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Ki,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pl,this.blendDst=Hs,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new le(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(i.blending=this.blending),this.side!==gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Pl&&(i.blendSrc=this.blendSrc),this.blendDst!==Hs&&(i.blendDst=this.blendDst),this.blendEquation!==xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new le().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ye().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ye().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Dt=class extends yi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},vo=new N,vr=new N,br=new N,Mr=new ye,bo=new ye,kp=new ht,ul=new N,Mo=new N,hl=new N,Uf=new ye,ch=new ye,kf=new ye,Bt=class extends kt{constructor(e=new Dt){if(super(),this.isSprite=!0,this.type="Sprite",_r===void 0){_r=new dt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new $l(t,5);_r.setIndex([0,1,2,0,2,3]),_r.setAttribute("position",new Bo(i,3,0,!1)),_r.setAttribute("uv",new Bo(i,2,3,!1))}this.geometry=_r,this.material=e,this.center=new ye(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vr.setFromMatrixScale(this.matrixWorld),kp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),br.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vr.multiplyScalar(-br.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;dl(ul.set(-.5,-.5,0),br,o,vr,s,r),dl(Mo.set(.5,-.5,0),br,o,vr,s,r),dl(hl.set(.5,.5,0),br,o,vr,s,r),Uf.set(0,0),ch.set(1,0),kf.set(1,1);let a=e.ray.intersectTriangle(ul,Mo,hl,!1,vo);if(a===null&&(dl(Mo.set(-.5,.5,0),br,o,vr,s,r),ch.set(0,1),a=e.ray.intersectTriangle(ul,hl,Mo,!1,vo),a===null))return;let l=e.ray.origin.distanceTo(vo);l<e.near||l>e.far||t.push({distance:l,point:vo.clone(),uv:Yi.getInterpolation(vo,ul,Mo,hl,Uf,ch,kf,new ye),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};$i=new N,uh=new N,fl=new N,fs=new N,hh=new N,pl=new N,dh=new N,Oo=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($i.copy(this.origin).addScaledVector(this.direction,t),$i.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){uh.copy(e).add(t).multiplyScalar(.5),fl.copy(t).sub(e).normalize(),fs.copy(this.origin).sub(uh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(fl),a=fs.dot(this.direction),l=-fs.dot(fl),c=fs.lengthSq(),u=Math.abs(1-o*o),d,h,g,v;if(u>0)if(d=o*l-a,h=o*a-l,v=r*u,d>=0)if(h>=-v)if(h<=v){let S=1/u;d*=S,h*=S,g=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),g=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),g=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),g=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-r,-l),r),g=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),g=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),g=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(uh).addScaledVector(fl,h),g}intersectSphere(e,t){$i.subVectors(e.center,this.origin);let i=$i.dot(this.direction),s=$i.dot($i)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,$i)!==null}intersectTriangle(e,t,i,s,r){hh.subVectors(t,e),pl.subVectors(i,e),dh.crossVectors(hh,pl);let o=this.direction.dot(dh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;fs.subVectors(this.origin,e);let l=a*this.direction.dot(pl.crossVectors(fs,pl));if(l<0)return null;let c=a*this.direction.dot(hh.cross(fs));if(c<0||l+c>o)return null;let u=-a*fs.dot(dh);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ot=class extends yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Bf=new ht,ks=new Oo,ml=new sn,Of=new N,gl=new N,xl=new N,yl=new N,fh=new N,_l=new N,zf=new N,vl=new N,Xe=class extends kt{constructor(e=new dt,t=new Ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){_l.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],d=r[l];u!==0&&(fh.fromBufferAttribute(d,e),o?_l.addScaledVector(fh,u):_l.addScaledVector(fh.sub(t),u))}t.add(_l)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ml.copy(i.boundingSphere),ml.applyMatrix4(r),ks.copy(e.ray).recast(e.near),!(ml.containsPoint(ks.origin)===!1&&(ks.intersectSphere(ml,Of)===null||ks.origin.distanceToSquared(Of)>(e.far-e.near)**2))&&(Bf.copy(r).invert(),ks.copy(e.ray).applyMatrix4(Bf),!(i.boundingBox!==null&&ks.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ks)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,S=h.length;v<S;v++){let p=h[v],f=o[p.materialIndex],b=Math.max(p.start,g.start),_=Math.min(a.count,Math.min(p.start+p.count,g.start+g.count));for(let m=b,E=_;m<E;m+=3){let x=a.getX(m),w=a.getX(m+1),y=a.getX(m+2);s=bl(this,f,e,i,c,u,d,x,w,y),s&&(s.faceIndex=Math.floor(m/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),S=Math.min(a.count,g.start+g.count);for(let p=v,f=S;p<f;p+=3){let b=a.getX(p),_=a.getX(p+1),m=a.getX(p+2);s=bl(this,o,e,i,c,u,d,b,_,m),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,S=h.length;v<S;v++){let p=h[v],f=o[p.materialIndex],b=Math.max(p.start,g.start),_=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let m=b,E=_;m<E;m+=3){let x=m,w=m+1,y=m+2;s=bl(this,f,e,i,c,u,d,x,w,y),s&&(s.faceIndex=Math.floor(m/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),S=Math.min(l.count,g.start+g.count);for(let p=v,f=S;p<f;p+=3){let b=p,_=p+1,m=p+2;s=bl(this,o,e,i,c,u,d,b,_,m),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};Vs=class extends Tn{constructor(e=null,t=1,i=1,s,r,o,a,l,c=un,u=un,d,h){super(null,o,a,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},zo=class extends lt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Sr=new ht,Hf=new ht,Ml=[],Gf=new Pi,Sx=new ht,So=new Xe,Eo=new sn,Pn=class extends Xe{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new zo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Sx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Sr),Gf.copy(e.boundingBox).applyMatrix4(Sr),this.boundingBox.union(Gf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new sn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Sr),Eo.copy(e.boundingSphere).applyMatrix4(Sr),this.boundingSphere.union(Eo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(So.geometry=this.geometry,So.material=this.material,So.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Eo.copy(this.boundingSphere),Eo.applyMatrix4(i),e.ray.intersectsSphere(Eo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Sr),Hf.multiplyMatrices(i,Sr),So.matrixWorld=Hf,So.raycast(e,Ml);for(let o=0,a=Ml.length;o<a;o++){let l=Ml[o];l.instanceId=r,l.object=this,t.push(l)}Ml.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new zo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Vs(new Float32Array(s*this.count),s,this.count,Vr,si));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ph=new N,Ex=new N,wx=new tt,Ai=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=ph.subVectors(i,t).cross(Ex.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(ph),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||wx.getNormalMatrix(e),s=this.coplanarPoint(ph).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bs=new sn,Tx=new ye(.5,.5),Sl=new N,Pr=class{constructor(e=new Ai,t=new Ai,i=new Ai,s=new Ai,r=new Ai,o=new Ai){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=mi,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],g=r[7],v=r[8],S=r[9],p=r[10],f=r[11],b=r[12],_=r[13],m=r[14],E=r[15];if(s[0].setComponents(c-o,g-u,f-v,E-b).normalize(),s[1].setComponents(c+o,g+u,f+v,E+b).normalize(),s[2].setComponents(c+a,g+d,f+S,E+_).normalize(),s[3].setComponents(c-a,g-d,f-S,E-_).normalize(),i)s[4].setComponents(l,h,p,m).normalize(),s[5].setComponents(c-l,g-h,f-p,E-m).normalize();else if(s[4].setComponents(c-l,g-h,f-p,E-m).normalize(),t===mi)s[5].setComponents(c+l,g+h,f+p,E+m).normalize();else if(t===Ar)s[5].setComponents(l,h,p,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bs)}intersectsSprite(e){Bs.center.set(0,0,0);let t=Tx.distanceTo(e.center);return Bs.radius=.7071067811865476+t,Bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bs)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Sl.x=s.normal.x>0?e.max.x:e.min.x,Sl.y=s.normal.y>0?e.max.y:e.min.y,Sl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Sl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Yl=class extends yi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vf=new ht,Eh=new Oo,El=new sn,wl=new N,Vn=class extends kt{constructor(e=new dt,t=new Yl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),El.copy(i.boundingSphere),El.applyMatrix4(s),El.radius+=r,e.ray.intersectsSphere(El)===!1)return;Vf.copy(s).invert(),Eh.copy(e.ray).applyMatrix4(Vf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),g=Math.min(c.count,o.start+o.count);for(let v=h,S=g;v<S;v++){let p=c.getX(v);wl.fromBufferAttribute(d,p),Wf(wl,p,l,s,e,t,this)}}else{let h=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=h,S=g;v<S;v++)wl.fromBufferAttribute(d,v),Wf(wl,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Ho=class extends Tn{constructor(e=[],t=vs,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ws=class extends Tn{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Qi=class extends Tn{constructor(e,t,i=vi,s,r,o,a=un,l=un,c,u=Fi,d=1){if(u!==Fi&&u!==Ms)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Zl=class extends Qi{constructor(e,t=vi,i=vs,s,r,o=un,a=un,l,c=Fi){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Go=class extends Tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ti=class n extends dt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],d=[],h=0,g=0;v("z","y","x",-1,-1,i,t,e,o,r,0),v("z","y","x",1,-1,i,t,-e,o,r,1),v("x","z","y",1,1,e,i,t,s,o,2),v("x","z","y",1,-1,e,i,-t,s,o,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(d,2));function v(S,p,f,b,_,m,E,x,w,y,T){let I=m/w,P=E/y,L=m/2,z=E/2,$=x/2,V=w+1,X=y+1,B=0,Q=0,he=new N;for(let ae=0;ae<X;ae++){let W=ae*P-z;for(let ne=0;ne<V;ne++){let F=ne*I-L;he[S]=F*b,he[p]=W*_,he[f]=$,c.push(he.x,he.y,he.z),he[S]=0,he[p]=0,he[f]=x>0?1:-1,u.push(he.x,he.y,he.z),d.push(ne/w),d.push(1-ae/y),B+=1}}for(let ae=0;ae<y;ae++)for(let W=0;W<w;W++){let ne=h+W+V*ae,F=h+W+V*(ae+1),J=h+(W+1)+V*(ae+1),Y=h+(W+1)+V*ae;l.push(ne,F,Y),l.push(F,J,Y),Q+=6}a.addGroup(g,Q,T),g+=Q,h+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},ms=class n extends dt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],u=t/2,d=Math.PI/2*e,h=t,g=2*d+h,v=i*2+r,S=s+1,p=new N,f=new N;for(let b=0;b<=v;b++){let _=0,m=0,E=0,x=0;if(b<=i){let T=b/i,I=T*Math.PI/2;m=-u-e*Math.cos(I),E=e*Math.sin(I),x=-e*Math.cos(I),_=T*d}else if(b<=i+r){let T=(b-i)/r;m=-u+T*t,E=e,x=0,_=d+T*h}else{let T=(b-i-r)/i,I=T*Math.PI/2;m=u+e*Math.sin(I),E=e*Math.cos(I),x=e*Math.sin(I),_=d+h+T*d}let w=Math.max(0,Math.min(1,_/g)),y=0;b===0?y=.5/s:b===v&&(y=-.5/s);for(let T=0;T<=s;T++){let I=T/s,P=I*Math.PI*2,L=Math.sin(P),z=Math.cos(P);f.x=-E*z,f.y=m,f.z=E*L,a.push(f.x,f.y,f.z),p.set(-E*z,x,E*L),p.normalize(),l.push(p.x,p.y,p.z),c.push(I+y,w)}if(b>0){let T=(b-1)*S;for(let I=0;I<s;I++){let P=T+I,L=T+I+1,z=b*S+I,$=b*S+I+1;o.push(P,L,z),o.push(L,$,z)}}}this.setIndex(o),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Vo=class n extends dt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new N,u=new ye;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){let g=i+d/t*s;c.x=e*Math.cos(g),c.y=e*Math.sin(g),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new et(o,3)),this.setAttribute("normal",new et(a,3)),this.setAttribute("uv",new et(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Wn=class n extends dt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],g=[],v=0,S=[],p=i/2,f=0;b(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(g,2));function b(){let m=new N,E=new N,x=0,w=(t-e)/i;for(let y=0;y<=r;y++){let T=[],I=y/r,P=I*(t-e)+e;for(let L=0;L<=s;L++){let z=L/s,$=z*l+a,V=Math.sin($),X=Math.cos($);E.x=P*V,E.y=-I*i+p,E.z=P*X,d.push(E.x,E.y,E.z),m.set(V,w,X).normalize(),h.push(m.x,m.y,m.z),g.push(z,1-I),T.push(v++)}S.push(T)}for(let y=0;y<s;y++)for(let T=0;T<r;T++){let I=S[T][y],P=S[T+1][y],L=S[T+1][y+1],z=S[T][y+1];(e>0||T!==0)&&(u.push(I,P,z),x+=3),(t>0||T!==r-1)&&(u.push(P,L,z),x+=3)}c.addGroup(f,x,0),f+=x}function _(m){let E=v,x=new ye,w=new N,y=0,T=m===!0?e:t,I=m===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,p*I,0),h.push(0,I,0),g.push(.5,.5),v++;let P=v;for(let L=0;L<=s;L++){let $=L/s*l+a,V=Math.cos($),X=Math.sin($);w.x=T*X,w.y=p*I,w.z=T*V,d.push(w.x,w.y,w.z),h.push(0,I,0),x.x=V*.5+.5,x.y=X*.5*I+.5,g.push(x.x,x.y),v++}for(let L=0;L<s;L++){let z=E+L,$=P+L;m===!0?u.push($,$+1,z):u.push($+1,$,z),y+=3}c.addGroup(f,y,m===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Wo=class n extends Wn{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Dr=class n extends dt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(r.slice(),3)),this.setAttribute("uv",new et(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){let _=new N,m=new N,E=new N;for(let x=0;x<t.length;x+=3)g(t[x+0],_),g(t[x+1],m),g(t[x+2],E),l(_,m,E,b)}function l(b,_,m,E){let x=E+1,w=[];for(let y=0;y<=x;y++){w[y]=[];let T=b.clone().lerp(m,y/x),I=_.clone().lerp(m,y/x),P=x-y;for(let L=0;L<=P;L++)L===0&&y===x?w[y][L]=T:w[y][L]=T.clone().lerp(I,L/P)}for(let y=0;y<x;y++)for(let T=0;T<2*(x-y)-1;T++){let I=Math.floor(T/2);T%2===0?(h(w[y][I+1]),h(w[y+1][I]),h(w[y][I])):(h(w[y][I+1]),h(w[y+1][I+1]),h(w[y+1][I]))}}function c(b){let _=new N;for(let m=0;m<r.length;m+=3)_.x=r[m+0],_.y=r[m+1],_.z=r[m+2],_.normalize().multiplyScalar(b),r[m+0]=_.x,r[m+1]=_.y,r[m+2]=_.z}function u(){let b=new N;for(let _=0;_<r.length;_+=3){b.x=r[_+0],b.y=r[_+1],b.z=r[_+2];let m=p(b)/2/Math.PI+.5,E=f(b)/Math.PI+.5;o.push(m,1-E)}v(),d()}function d(){for(let b=0;b<o.length;b+=6){let _=o[b+0],m=o[b+2],E=o[b+4],x=Math.max(_,m,E),w=Math.min(_,m,E);x>.9&&w<.1&&(_<.2&&(o[b+0]+=1),m<.2&&(o[b+2]+=1),E<.2&&(o[b+4]+=1))}}function h(b){r.push(b.x,b.y,b.z)}function g(b,_){let m=b*3;_.x=e[m+0],_.y=e[m+1],_.z=e[m+2]}function v(){let b=new N,_=new N,m=new N,E=new N,x=new ye,w=new ye,y=new ye;for(let T=0,I=0;T<r.length;T+=9,I+=6){b.set(r[T+0],r[T+1],r[T+2]),_.set(r[T+3],r[T+4],r[T+5]),m.set(r[T+6],r[T+7],r[T+8]),x.set(o[I+0],o[I+1]),w.set(o[I+2],o[I+3]),y.set(o[I+4],o[I+5]),E.copy(b).add(_).add(m).divideScalar(3);let P=p(E);S(x,I+0,b,P),S(w,I+2,_,P),S(y,I+4,m,P)}}function S(b,_,m,E){E<0&&b.x===1&&(o[_]=b.x-1),m.x===0&&m.z===0&&(o[_]=E/2/Math.PI+.5)}function p(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}},qo=class n extends Dr{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},qn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),s=0,r=i.length,o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let u=i[s],h=i[s+1]-u,g=(o-u)/h;return(s+g)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ye:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new N,s=[],r=[],o=[],a=new N,l=new ht;for(let g=0;g<=e;g++){let v=g/e;s[g]=this.getTangentAt(v,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let g=1;g<=e;g++){if(r[g]=r[g-1].clone(),o[g]=o[g-1].clone(),a.crossVectors(s[g-1],s[g]),a.length()>Number.EPSILON){a.normalize();let v=Math.acos(ot(s[g-1].dot(s[g]),-1,1));r[g].applyMatrix4(l.makeRotationAxis(a,v))}o[g].crossVectors(s[g],r[g])}if(t===!0){let g=Math.acos(ot(r[0].dot(r[e]),-1,1));g/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(g=-g);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(s[v],g*v)),o[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Lr=class extends qn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ye){let i=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,g=c-this.aY;l=h*u-g*d+this.aX,c=h*d+g*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Jl=class extends Lr{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};qf=new N,Xf=new N,mh=new Wh,gh=new Wh,xh=new Wh,qs=class extends qn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new N){let i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(Xf.subVectors(s[0],s[1]).add(s[0]),c=Xf);let d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(qf.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=qf),this.curveType==="centripetal"||this.curveType==="chordal"){let g=this.curveType==="chordal"?.5:.25,v=Math.pow(c.distanceToSquared(d),g),S=Math.pow(d.distanceToSquared(h),g),p=Math.pow(h.distanceToSquared(u),g);S<1e-4&&(S=1),v<1e-4&&(v=S),p<1e-4&&(p=S),mh.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,v,S,p),gh.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,v,S,p),xh.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,v,S,p)}else this.curveType==="catmullrom"&&(mh.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),gh.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),xh.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(mh.calc(l),gh.calc(l),xh.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Xo=class extends qn{constructor(e=new ye,t=new ye,i=new ye,s=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ye){let i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Co(e,s.x,r.x,o.x,a.x),Co(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Kl=class extends qn{constructor(e=new N,t=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new N){let i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Co(e,s.x,r.x,o.x,a.x),Co(e,s.y,r.y,o.y,a.y),Co(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},$o=class extends qn{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jl=class extends qn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yo=class extends qn{constructor(e=new ye,t=new ye,i=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ye){let i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(To(e,s.x,r.x,o.x),To(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zo=class extends qn{constructor(e=new N,t=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new N){let i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(To(e,s.x,r.x,o.x),To(e,s.y,r.y,o.y),To(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Jo=class extends qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){let i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set($f(a,l.x,c.x,u.x,d.x),$f(a,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new ye().fromArray(s))}return this}},wh=Object.freeze({__proto__:null,ArcCurve:Jl,CatmullRomCurve3:qs,CubicBezierCurve:Xo,CubicBezierCurve3:Kl,EllipseCurve:Lr,LineCurve:$o,LineCurve3:jl,QuadraticBezierCurve:Yo,QuadraticBezierCurve3:Zo,SplineCurve:Jo}),Ql=class extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wh[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(new wh[s.type]().fromJSON(s))}return this}},Ko=class extends Ql{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new $o(this.currentPoint.clone(),new ye(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){let r=new Yo(this.currentPoint.clone(),new ye(e,t),new ye(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){let a=new Xo(this.currentPoint.clone(),new ye(e,t),new ye(i,s),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Jo(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){let c=new Lr(e,t,i,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Nr=class extends Ko{constructor(e){super(e),this.uuid=Zi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(new Ko().fromJSON(s))}return this}};Ah=class{static triangulate(e,t,i=2){return Lx(e,t,i)}},Cr=class n{static area(e){let t=e.length,i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],s=[],r=[];Zf(e),Jf(i,e);let o=e.length;t.forEach(Zf);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Jf(i,t[l]);let a=Ah.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};Di=class n extends Dr{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Li=class n extends dt{constructor(e=[new ye(0,-.5),new ye(.5,0),new ye(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=ot(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],u=1/t,d=new N,h=new ye,g=new N,v=new N,S=new N,p=0,f=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:p=e[b+1].x-e[b].x,f=e[b+1].y-e[b].y,g.x=f*1,g.y=-p,g.z=f*0,S.copy(g),g.normalize(),l.push(g.x,g.y,g.z);break;case e.length-1:l.push(S.x,S.y,S.z);break;default:p=e[b+1].x-e[b].x,f=e[b+1].y-e[b].y,g.x=f*1,g.y=-p,g.z=f*0,v.copy(g),g.x+=S.x,g.y+=S.y,g.z+=S.z,g.normalize(),l.push(g.x,g.y,g.z),S.copy(v)}for(let b=0;b<=t;b++){let _=i+b*u*s,m=Math.sin(_),E=Math.cos(_);for(let x=0;x<=e.length-1;x++){d.x=e[x].x*m,d.y=e[x].y,d.z=e[x].x*E,o.push(d.x,d.y,d.z),h.x=b/t,h.y=x/(e.length-1),a.push(h.x,h.y);let w=l[3*x+0]*m,y=l[3*x+1],T=l[3*x+0]*E;c.push(w,y,T)}}for(let b=0;b<t;b++)for(let _=0;_<e.length-1;_++){let m=_+b*e.length,E=m,x=m+e.length,w=m+e.length+1,y=m+1;r.push(E,x,y),r.push(w,y,x)}this.setIndex(r),this.setAttribute("position",new et(o,3)),this.setAttribute("uv",new et(a,2)),this.setAttribute("normal",new et(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.points,e.segments,e.phiStart,e.phiLength)}},Ni=class n extends Dr{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},ni=class n extends dt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=e/a,h=t/l,g=[],v=[],S=[],p=[];for(let f=0;f<u;f++){let b=f*h-o;for(let _=0;_<c;_++){let m=_*d-r;v.push(m,-b,0),S.push(0,0,1),p.push(_/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<a;b++){let _=b+c*f,m=b+c*(f+1),E=b+1+c*(f+1),x=b+1+c*f;g.push(_,m,x),g.push(m,E,x)}this.setIndex(g),this.setAttribute("position",new et(v,3)),this.setAttribute("normal",new et(S,3)),this.setAttribute("uv",new et(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},ta=class n extends dt{constructor(e=new Nr([new ye(0,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new et(s,3)),this.setAttribute("normal",new et(r,3)),this.setAttribute("uv",new et(o,2));function c(u){let d=s.length/3,h=u.extractPoints(t),g=h.shape,v=h.holes;Cr.isClockWise(g)===!1&&(g=g.reverse());for(let p=0,f=v.length;p<f;p++){let b=v[p];Cr.isClockWise(b)===!0&&(v[p]=b.reverse())}let S=Cr.triangulateShape(g,v);for(let p=0,f=v.length;p<f;p++){let b=v[p];g=g.concat(b)}for(let p=0,f=g.length;p<f;p++){let b=g[p];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let p=0,f=S.length;p<f;p++){let b=S[p],_=b[0]+d,m=b[1]+d,E=b[2]+d;i.push(_,m,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Kx(t,e)}static fromJSON(e,t){let i=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];i.push(o)}return new n(i,e.curveSegments)}};hn=class n extends dt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,u=[],d=new N,h=new N,g=[],v=[],S=[],p=[];for(let f=0;f<=i;f++){let b=[],_=f/i,m=o+_*a,E=e*Math.cos(m),x=Math.sqrt(e*e-E*E),w=0;f===0&&o===0?w=.5/t:f===i&&l===Math.PI&&(w=-.5/t);for(let y=0;y<=t;y++){let T=y/t,I=s+T*r;d.x=-x*Math.cos(I),d.y=E,d.z=x*Math.sin(I),v.push(d.x,d.y,d.z),h.copy(d).normalize(),S.push(h.x,h.y,h.z),p.push(T+w,1-_),b.push(c++)}u.push(b)}for(let f=0;f<i;f++)for(let b=0;b<t;b++){let _=u[f][b+1],m=u[f][b],E=u[f+1][b],x=u[f+1][b+1];(f!==0||o>0)&&g.push(_,m,x),(f!==i-1||l<Math.PI)&&g.push(m,E,x)}this.setIndex(g),this.setAttribute("position",new et(v,3)),this.setAttribute("normal",new et(S,3)),this.setAttribute("uv",new et(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Qt=class n extends dt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],u=[],d=[],h=new N,g=new N,v=new N;for(let S=0;S<=i;S++){let p=o+S/i*a;for(let f=0;f<=s;f++){let b=f/s*r;g.x=(e+t*Math.cos(p))*Math.cos(b),g.y=(e+t*Math.cos(p))*Math.sin(b),g.z=t*Math.sin(p),c.push(g.x,g.y,g.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),v.subVectors(g,h).normalize(),u.push(v.x,v.y,v.z),d.push(f/s),d.push(S/i)}}for(let S=1;S<=i;S++)for(let p=1;p<=s;p++){let f=(s+1)*S+p-1,b=(s+1)*(S-1)+p-1,_=(s+1)*(S-1)+p,m=(s+1)*S+p;l.push(f,b,m),l.push(b,_,m)}this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},na=class n extends dt{constructor(e=1,t=.4,i=64,s=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:s,p:r,q:o},i=Math.floor(i),s=Math.floor(s);let a=[],l=[],c=[],u=[],d=new N,h=new N,g=new N,v=new N,S=new N,p=new N,f=new N;for(let _=0;_<=i;++_){let m=_/i*r*Math.PI*2;b(m,r,o,e,g),b(m+.01,r,o,e,v),p.subVectors(v,g),f.addVectors(v,g),S.crossVectors(p,f),f.crossVectors(S,p),S.normalize(),f.normalize();for(let E=0;E<=s;++E){let x=E/s*Math.PI*2,w=-t*Math.cos(x),y=t*Math.sin(x);d.x=g.x+(w*f.x+y*S.x),d.y=g.y+(w*f.y+y*S.y),d.z=g.z+(w*f.z+y*S.z),l.push(d.x,d.y,d.z),h.subVectors(d,g).normalize(),c.push(h.x,h.y,h.z),u.push(_/i),u.push(E/s)}}for(let _=1;_<=i;_++)for(let m=1;m<=s;m++){let E=(s+1)*(_-1)+(m-1),x=(s+1)*_+(m-1),w=(s+1)*_+m,y=(s+1)*(_-1)+m;a.push(E,x,y),a.push(x,w,y)}this.setIndex(a),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(c,3)),this.setAttribute("uv",new et(u,2));function b(_,m,E,x,w){let y=Math.cos(_),T=Math.sin(_),I=E/m*_,P=Math.cos(I);w.x=x*(2+P)*.5*y,w.y=x*(2+P)*T*.5,w.z=x*Math.sin(I)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},kr=class n extends dt{constructor(e=new Zo(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new N,l=new N,c=new ye,u=new N,d=[],h=[],g=[],v=[];S(),this.setIndex(v),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(g,2));function S(){for(let _=0;_<t;_++)p(_);p(r===!1?t:0),b(),f()}function p(_){u=e.getPointAt(_/t,u);let m=o.normals[_],E=o.binormals[_];for(let x=0;x<=s;x++){let w=x/s*Math.PI*2,y=Math.sin(w),T=-Math.cos(w);l.x=T*m.x+y*E.x,l.y=T*m.y+y*E.y,l.z=T*m.z+y*E.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function f(){for(let _=1;_<=t;_++)for(let m=1;m<=s;m++){let E=(s+1)*(_-1)+(m-1),x=(s+1)*_+(m-1),w=(s+1)*_+m,y=(s+1)*(_-1)+m;v.push(E,x,y),v.push(x,w,y)}}function b(){for(let _=0;_<=t;_++)for(let m=0;m<=s;m++)c.x=_/t,c.y=m/s,g.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new wh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};ns={clone:Ks,merge:En},Qx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ey=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ut=class extends yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qx,this.fragmentShader=ey,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=jx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new le().setHex(s.value);break;case"v2":this.uniforms[i].value=new ye().fromArray(s.value);break;case"v3":this.uniforms[i].value=new N().fromArray(s.value);break;case"v4":this.uniforms[i].value=new It().fromArray(s.value);break;case"m3":this.uniforms[i].value=new tt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ht().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Br=class extends ut{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},xn=class extends yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ma,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cn=class extends xn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ia=class extends yi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ma,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=gc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ec=class extends yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ep,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},tc=class extends yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};gs=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},nc=class extends gs{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vh,endingEnd:vh}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case bh:r=e,a=2*t-i;break;case Mh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case bh:o=e,l=2*i-t;break;case Mh:o=1,l=i+s[1]-s[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,g=this._weightNext,v=(i-t)/(s-t),S=v*v,p=S*v,f=-h*p+2*h*S-h*v,b=(1+h)*p+(-1.5-2*h)*S+(-.5+h)*v+1,_=(-1-g)*p+(1.5+g)*S+.5*v,m=g*p-g*S;for(let E=0;E!==a;++E)r[E]=f*o[u+E]+b*o[c+E]+_*o[l+E]+m*o[d+E];return r}},ic=class extends gs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}},sc=class extends gs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},rc=class extends gs{interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let v=(i-t)/(s-t),S=1-v;for(let p=0;p!==a;++p)r[p]=o[c+p]*S+o[l+p]*v;return r}let h=a*2,g=e-1;for(let v=0;v!==a;++v){let S=o[c+v],p=o[l+v],f=g*h+v*2,b=d[f],_=d[f+1],m=e*h+v*2,E=u[m],x=u[m+1],w=(i-t)/(s-t),y,T,I,P,L;for(let z=0;z<8;z++){y=w*w,T=y*w,I=1-w,P=I*I,L=P*I;let V=L*t+3*P*w*b+3*I*y*E+T*s-i;if(Math.abs(V)<1e-10)break;let X=3*P*(b-t)+6*I*w*(E-b)+3*y*(s-E);if(Math.abs(X)<1e-10)break;w=w-V/X,w=Math.max(0,Math.min(1,w))}r[v]=L*S+3*P*w*_+3*I*y*x+T*p}return r}},Xn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Al(t,this.TimeBufferType),this.values=Al(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Al(e.times,Array),values:Al(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new sc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ic(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new rc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ao:t=this.InterpolantFactoryMethodDiscrete;break;case Hl:t=this.InterpolantFactoryMethodLinear;break;case Il:t=this.InterpolantFactoryMethodSmooth;break;case _h:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return je("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ao;case this.InterpolantFactoryMethodLinear:return Hl;case this.InterpolantFactoryMethodSmooth:return Il;case this.InterpolantFactoryMethodBezier:return _h}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){Qe("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Qe("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&ox(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Qe("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Il,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*i,h=d-i,g=d+i;for(let v=0;v!==i;++v){let S=t[d+v];if(S!==t[h+v]||S!==t[g+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*i,h=o*i;for(let g=0;g!==i;++g)t[h+g]=t[d+g]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=Hl;xs=class extends Xn{constructor(e,t,i){super(e,t,i)}};xs.prototype.ValueTypeName="bool";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=Ao;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;oc=class extends Xn{constructor(e,t,i,s){super(e,t,i,s)}};oc.prototype.ValueTypeName="color";ac=class extends Xn{constructor(e,t,i,s){super(e,t,i,s)}};ac.prototype.ValueTypeName="number";lc=class extends gs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)In.slerpFlat(r,0,o,c-a,o,c,l);return r}},sa=class extends Xn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new lc(this.times,this.values,this.getValueSize(),e)}};sa.prototype.ValueTypeName="quaternion";sa.prototype.InterpolantFactoryMethodSmooth=void 0;ys=class extends Xn{constructor(e,t,i){super(e,t,i)}};ys.prototype.ValueTypeName="string";ys.prototype.ValueBufferType=Array;ys.prototype.DefaultInterpolation=Ao;ys.prototype.InterpolantFactoryMethodLinear=void 0;ys.prototype.InterpolantFactoryMethodSmooth=void 0;cc=class extends Xn{constructor(e,t,i,s){super(e,t,i,s)}};cc.prototype.ValueTypeName="vector";uc=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let g=c[d],v=c[d+1];if(g.global&&(g.lastIndex=0),g.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Gp=new uc,hc=class{constructor(e){this.manager=e!==void 0?e:Gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};hc.DEFAULT_MATERIAL_NAME="__DEFAULT";Or=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new le(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},$s=class extends Or{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},yh=new ht,jf=new N,Qf=new N,dc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pr,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;jf.setFromMatrixPosition(e.matrixWorld),t.position.copy(jf),Qf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qf),t.updateMatrixWorld(),yh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yh,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ar||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Rl=new N,Fl=new In,Ci=new N,ra=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Rl,Fl,Ci),Ci.x===1&&Ci.y===1&&Ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rl,Fl,Ci.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Rl,Fl,Ci),Ci.x===1&&Ci.y===1&&Ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rl,Fl,Ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ps=new N,ep=new ye,tp=new ye,nn=class extends ra{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(qu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vl*2*Math.atan(Math.tan(qu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ps.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ps.x,ps.y).multiplyScalar(-e/ps.z),ps.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ps.x,ps.y).multiplyScalar(-e/ps.z)}getViewSize(e,t){return this.getViewBounds(e,ep,tp),t.subVectors(tp,ep)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(qu*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Rh=class extends dc{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0}},Ys=class extends Or{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Rh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},_s=class extends ra{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fh=class extends dc{constructor(){super(new _s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},es=class extends Or{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new Fh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Er=-90,wr=1,fc=class extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(Er,wr,e,t);s.layers=this.layers,this.add(s);let r=new nn(Er,wr,e,t);r.layers=this.layers,this.add(r);let o=new nn(Er,wr,e,t);o.layers=this.layers,this.add(o);let a=new nn(Er,wr,e,t);a.layers=this.layers,this.add(a);let l=new nn(Er,wr,e,t);l.layers=this.layers,this.add(l);let c=new nn(Er,wr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===mi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ar)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,g),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},pc=class extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Zs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=ty.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};Xh="\\[\\]\\.:\\/",ny=new RegExp("["+Xh+"]","g"),$h="[^"+Xh+"]",iy="[^"+Xh.replace("\\.","")+"]",sy=/((?:WC+[\/:])*)/.source.replace("WC",$h),ry=/(WCOD+)?/.source.replace("WCOD",iy),oy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$h),ay=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$h),ly=new RegExp("^"+sy+ry+oy+ay+"$"),cy=["material","materials","bones","map"],Ih=class{constructor(e,t,i){let s=i||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Tt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ny,"")}static parseTrackName(e){let t=ly.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);cy.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){je("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Qe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=Ih;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];CE=new Float32Array(1),Ph=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185")});function hm(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function dy(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((g,v)=>g.start-v.start);let h=0;for(let g=1;g<d.length;g++){let v=d[h],S=d[g];S.start<=v.start+v.count+1?v.count=Math.max(v.count,S.start+S.count-v.start):(++h,d[h]=S)}d.length=h+1;for(let g=0,v=d.length;g<v;g++){let S=d[g];n.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}function Yv(n,e,t,i,s,r){let o=new le(0),a=s===!0?0:1,l,c,u=null,d=0,h=null;function g(b){let _=b.isScene===!0?b.background:null;if(_&&_.isTexture){let m=b.backgroundBlurriness>0;_=e.get(_,m)}return _}function v(b){let _=!1,m=g(b);m===null?p(o,a):m&&m.isColor&&(p(m,1),_=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(b,_){let m=g(_);m&&(m.isCubeTexture||m.mapping===pa)?(c===void 0&&(c=new Xe(new ti(1,1,1),new ut({name:"BackgroundCubeMaterial",uniforms:Ks(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,x,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=m,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4($v.makeRotationFromEuler(_.backgroundRotation)).transpose(),m.isCubeTexture&&m.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(dm),c.material.toneMapped=at.getTransfer(m.colorSpace)!==pt,(u!==m||d!==m.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=m,d=m.version,h=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):m&&m.isTexture&&(l===void 0&&(l=new Xe(new ni(2,2),new ut({name:"BackgroundMaterial",uniforms:Ks(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=m,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=at.getTransfer(m.colorSpace)!==pt,m.matrixAutoUpdate===!0&&m.updateMatrix(),l.material.uniforms.uvTransform.value.copy(m.matrix),(u!==m||d!==m.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=m,d=m.version,h=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,_){b.getRGB(su,qh(n)),t.buffers.color.setClear(su.r,su.g,su.b,_,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,_=1){o.set(b),a=_,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,p(o,a)},render:v,addToRenderList:S,dispose:f}}function Zv(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,o=!1;function a(P,L,z,$,V){let X=!1,B=d(P,$,z,L);r!==B&&(r=B,c(r.object)),X=g(P,$,z,V),X&&v(P,$,z,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,m(P,L,z,$),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function d(P,L,z,$){let V=$.wireframe===!0,X=i[L.id];X===void 0&&(X={},i[L.id]=X);let B=P.isInstancedMesh===!0?P.id:0,Q=X[B];Q===void 0&&(Q={},X[B]=Q);let he=Q[z.id];he===void 0&&(he={},Q[z.id]=he);let ae=he[V];return ae===void 0&&(ae=h(l()),he[V]=ae),ae}function h(P){let L=[],z=[],$=[];for(let V=0;V<t;V++)L[V]=0,z[V]=0,$[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:$,object:P,attributes:{},index:null}}function g(P,L,z,$){let V=r.attributes,X=L.attributes,B=0,Q=z.getAttributes();for(let he in Q)if(Q[he].location>=0){let W=V[he],ne=X[he];if(ne===void 0&&(he==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),he==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor)),W===void 0||W.attribute!==ne||ne&&W.data!==ne.data)return!0;B++}return r.attributesNum!==B||r.index!==$}function v(P,L,z,$){let V={},X=L.attributes,B=0,Q=z.getAttributes();for(let he in Q)if(Q[he].location>=0){let W=X[he];W===void 0&&(he==="instanceMatrix"&&P.instanceMatrix&&(W=P.instanceMatrix),he==="instanceColor"&&P.instanceColor&&(W=P.instanceColor));let ne={};ne.attribute=W,W&&W.data&&(ne.data=W.data),V[he]=ne,B++}r.attributes=V,r.attributesNum=B,r.index=$}function S(){let P=r.newAttributes;for(let L=0,z=P.length;L<z;L++)P[L]=0}function p(P){f(P,0)}function f(P,L){let z=r.newAttributes,$=r.enabledAttributes,V=r.attributeDivisors;z[P]=1,$[P]===0&&(n.enableVertexAttribArray(P),$[P]=1),V[P]!==L&&(n.vertexAttribDivisor(P,L),V[P]=L)}function b(){let P=r.newAttributes,L=r.enabledAttributes;for(let z=0,$=L.length;z<$;z++)L[z]!==P[z]&&(n.disableVertexAttribArray(z),L[z]=0)}function _(P,L,z,$,V,X,B){B===!0?n.vertexAttribIPointer(P,L,z,V,X):n.vertexAttribPointer(P,L,z,$,V,X)}function m(P,L,z,$){S();let V=$.attributes,X=z.getAttributes(),B=L.defaultAttributeValues;for(let Q in X){let he=X[Q];if(he.location>=0){let ae=V[Q];if(ae===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor)),ae!==void 0){let W=ae.normalized,ne=ae.itemSize,F=e.get(ae);if(F===void 0)continue;let J=F.buffer,Y=F.type,A=F.bytesPerElement,U=Y===n.INT||Y===n.UNSIGNED_INT||ae.gpuType===vc;if(ae.isInterleavedBufferAttribute){let O=ae.data,q=O.stride,H=ae.offset;if(O.isInstancedInterleavedBuffer){for(let te=0;te<he.locationSize;te++)f(he.location+te,O.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let te=0;te<he.locationSize;te++)p(he.location+te);n.bindBuffer(n.ARRAY_BUFFER,J);for(let te=0;te<he.locationSize;te++)_(he.location+te,ne/he.locationSize,Y,W,q*A,(H+ne/he.locationSize*te)*A,U)}else{if(ae.isInstancedBufferAttribute){for(let O=0;O<he.locationSize;O++)f(he.location+O,ae.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let O=0;O<he.locationSize;O++)p(he.location+O);n.bindBuffer(n.ARRAY_BUFFER,J);for(let O=0;O<he.locationSize;O++)_(he.location+O,ne/he.locationSize,Y,W,ne*A,ne/he.locationSize*O*A,U)}}else if(B!==void 0){let W=B[Q];if(W!==void 0)switch(W.length){case 2:n.vertexAttrib2fv(he.location,W);break;case 3:n.vertexAttrib3fv(he.location,W);break;case 4:n.vertexAttrib4fv(he.location,W);break;default:n.vertexAttrib1fv(he.location,W)}}}}b()}function E(){T();for(let P in i){let L=i[P];for(let z in L){let $=L[z];for(let V in $){let X=$[V];for(let B in X)u(X[B].object),delete X[B];delete $[V]}}delete i[P]}}function x(P){if(i[P.id]===void 0)return;let L=i[P.id];for(let z in L){let $=L[z];for(let V in $){let X=$[V];for(let B in X)u(X[B].object),delete X[B];delete $[V]}}delete i[P.id]}function w(P){for(let L in i){let z=i[L];for(let $ in z){let V=z[$];if(V[P.id]===void 0)continue;let X=V[P.id];for(let B in X)u(X[B].object),delete X[B];delete V[P.id]}}}function y(P){for(let L in i){let z=i[L],$=P.isInstancedMesh===!0?P.id:0,V=z[$];if(V!==void 0){for(let X in V){let B=V[X];for(let Q in B)u(B[Q].object),delete B[Q];delete V[X]}delete z[$],Object.keys(z).length===0&&delete i[L]}}}function T(){I(),o=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:x,releaseStatesOfObject:y,releaseStatesOfProgram:w,initAttributes:S,enableAttribute:p,disableUnusedAttributes:b}}function Jv(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let g=0;g<u;g++)h+=c[g];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Kv(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let w=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==ri&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let y=w===dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Sn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==si&&!y)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),m=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),x=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:v,maxTextureSize:S,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:b,maxVaryings:_,maxFragmentUniforms:m,maxSamples:E,samples:x}}function jv(n){let e=this,t=null,i=0,s=!1,r=!1,o=new Ai,a=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let g=d.length!==0||h||i!==0||s;return s=h,i=d.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,g){let v=d.clippingPlanes,S=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!s||v===null||v.length===0||r&&!p)r?u(null):c();else{let b=r?0:i,_=b*4,m=f.clippingState||null;l.value=m,m=u(v,h,_,g);for(let E=0;E!==_;++E)m[E]=t[E];f.clippingState=m,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,g,v){let S=d!==null?d.length:0,p=null;if(S!==0){if(p=l.value,v!==!0||p===null){let f=g+S*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<f)&&(p=new Float32Array(f));for(let _=0,m=g;_!==S;++_,m+=4)o.copy(d[_]).applyMatrix4(b,a),o.normal.toArray(p,m),p[m+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}function tb(n){let e=[],t=[],i=[],s=n,r=n-Es+1+Vp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Es?l=Vp[o-n+Es-1]:o===0&&(l=0),t.push(l);let c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],g=6,v=6,S=3,p=2,f=1,b=new Float32Array(S*v*g),_=new Float32Array(p*v*g),m=new Float32Array(f*v*g);for(let x=0;x<g;x++){let w=x%3*2/3-1,y=x>2?0:-1,T=[w,y,0,w+2/3,y,0,w+2/3,y+1,0,w,y,0,w+2/3,y+1,0,w,y+1,0];b.set(T,S*v*x),_.set(h,p*v*x);let I=[x,x,x,x,x,x];m.set(I,f*v*x)}let E=new dt;E.setAttribute("position",new lt(b,S)),E.setAttribute("uv",new lt(_,p)),E.setAttribute("faceIndex",new lt(m,f)),i.push(new Xe(E,null)),s>Es&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function qp(n,e,t){let i=new qt(n,e,t);return i.texture.mapping=pa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function nb(n,e,t){return new ut({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Qv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:au(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function ib(n,e,t){let i=new Float32Array(js),s=new N(0,1,0);return new ut({name:"SphericalGaussianBlur",defines:{n:js,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:au(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Xp(){return new ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:au(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function $p(){return new ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function au(){return`

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
	`}function sb(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,g=!1){return h==null?null:g?o(h):r(h)}function r(h){if(h&&h.isTexture){let g=h.mapping;if(g===xc||g===yc)if(e.has(h)){let v=e.get(h).texture;return a(v,h.mapping)}else{let v=h.image;if(v&&v.height>0){let S=new ou(v.height);return S.fromEquirectangularTexture(n,h),e.set(h,S),h.addEventListener("dispose",c),a(S.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let g=h.mapping,v=g===xc||g===yc,S=g===vs||g===Js;if(v||S){let p=t.get(h),f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new ws(n)),p=v?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let b=h.image;return v&&b&&b.height>0||S&&b&&l(b)?(i===null&&(i=new ws(n)),p=v?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function a(h,g){return g===xc?h.mapping=vs:g===yc&&(h.mapping=Js),h}function l(h){let g=0,v=6;for(let S=0;S<v;S++)h[S]!==void 0&&g++;return g===v}function c(h){let g=h.target;g.removeEventListener("dispose",c);let v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function u(h){let g=h.target;g.removeEventListener("dispose",u);let v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function rb(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&zs("WebGLRenderer: "+i+" extension not supported."),s}}}function ob(n,e,t,i){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",o),delete s[h.id];let g=r.get(h);g&&(e.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let g in h)e.update(h[g],n.ARRAY_BUFFER)}function c(d){let h=[],g=d.index,v=d.attributes.position,S=0;if(v===void 0)return;if(g!==null){let b=g.array;S=g.version;for(let _=0,m=b.length;_<m;_+=3){let E=b[_+0],x=b[_+1],w=b[_+2];h.push(E,x,x,w,w,E)}}else{let b=v.array;S=v.version;for(let _=0,m=b.length/3-1;_<m;_+=3){let E=_+0,x=_+1,w=_+2;h.push(E,x,x,w,w,E)}}let p=new(v.count>=65535?ko:Uo)(h,1);p.version=S;let f=r.get(d);f&&e.remove(f),r.set(d,p)}function u(d){let h=r.get(d);if(h){let g=d.index;g!==null&&h.version<g.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function ab(n,e,t){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*o),t.update(h,i,1)}function c(d,h,g){g!==0&&(n.drawElementsInstanced(i,h,r,d*o,g),t.update(h,i,g))}function u(d,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,g);let S=0;for(let p=0;p<g;p++)S+=h[p];t.update(S,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function lb(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Qe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function cb(n,e,t){let i=new WeakMap,s=new It;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==d){let T=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();let g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,S=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],_=0;g===!0&&(_=1),v===!0&&(_=2),S===!0&&(_=3);let m=a.attributes.position.count*_,E=1;m>e.maxTextureSize&&(E=Math.ceil(m/e.maxTextureSize),m=e.maxTextureSize);let x=new Float32Array(m*E*4*d),w=new Do(x,m,E,d);w.type=si,w.needsUpdate=!0;let y=_*4;for(let I=0;I<d;I++){let P=p[I],L=f[I],z=b[I],$=m*E*4*I;for(let V=0;V<P.count;V++){let X=V*y;g===!0&&(s.fromBufferAttribute(P,V),x[$+X+0]=s.x,x[$+X+1]=s.y,x[$+X+2]=s.z,x[$+X+3]=0),v===!0&&(s.fromBufferAttribute(L,V),x[$+X+4]=s.x,x[$+X+5]=s.y,x[$+X+6]=s.z,x[$+X+7]=0),S===!0&&(s.fromBufferAttribute(z,V),x[$+X+8]=s.x,x[$+X+9]=s.y,x[$+X+10]=s.z,x[$+X+11]=z.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new ye(m,E)},i.set(a,h),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let S=0;S<c.length;S++)g+=c[S];let v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function ub(n,e,t,i,s){let r=new WeakMap;function o(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let g=c.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return h}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}function db(n,e,t,i,s,r){let o=new qt(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Qi(e,t):void 0}),a=new qt(e,t,{type:dn,depthBuffer:!1,stencilBuffer:!1}),l=new dt;l.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new et([0,2,0,0,2,0],2));let c=new Br({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Xe(l,c),d=new _s(-1,1,1,-1,0,1),h=null,g=null,v=!1,S,p=null,f=[],b=!1;this.setSize=function(_,m){o.setSize(_,m),a.setSize(_,m);for(let E=0;E<f.length;E++){let x=f[E];x.setSize&&x.setSize(_,m)}},this.setEffects=function(_){f=_,b=f.length>0&&f[0].isRenderPass===!0;let m=o.width,E=o.height;for(let x=0;x<f.length;x++){let w=f[x];w.setSize&&w.setSize(m,E)}},this.begin=function(_,m){if(v||_.toneMapping===_i&&f.length===0)return!1;if(p=m,m!==null){let E=m.width,x=m.height;(o.width!==E||o.height!==x)&&this.setSize(E,x)}return b===!1&&_.setRenderTarget(o),S=_.toneMapping,_.toneMapping=_i,!0},this.hasRenderPass=function(){return b},this.end=function(_,m){_.toneMapping=S,v=!0;let E=o,x=a;for(let w=0;w<f.length;w++){let y=f[w];if(y.enabled!==!1&&(y.render(_,x,E,m),y.needsSwap!==!1)){let T=E;E=x,x=T}}if(h!==_.outputColorSpace||g!==_.toneMapping){h=_.outputColorSpace,g=_.toneMapping,c.defines={},at.getTransfer(h)===pt&&(c.defines.SRGB_TRANSFER="");let w=hb[g];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,_.setRenderTarget(p),_.render(u,d),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}function $r(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Yp[s];if(r===void 0&&(r=new Float32Array(s),Yp[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function rn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function on(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function lu(n,e){let t=Zp[e];t===void 0&&(t=new Int32Array(e),Zp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function fb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function pb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2fv(this.addr,e),on(t,e)}}function mb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;n.uniform3fv(this.addr,e),on(t,e)}}function gb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4fv(this.addr,e),on(t,e)}}function xb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(rn(t,i))return;jp.set(i),n.uniformMatrix2fv(this.addr,!1,jp),on(t,i)}}function yb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(rn(t,i))return;Kp.set(i),n.uniformMatrix3fv(this.addr,!1,Kp),on(t,i)}}function _b(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(rn(t,i))return;Jp.set(i),n.uniformMatrix4fv(this.addr,!1,Jp),on(t,i)}}function vb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2iv(this.addr,e),on(t,e)}}function Mb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3iv(this.addr,e),on(t,e)}}function Sb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4iv(this.addr,e),on(t,e)}}function Eb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function wb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2uiv(this.addr,e),on(t,e)}}function Tb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3uiv(this.addr,e),on(t,e)}}function Cb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4uiv(this.addr,e),on(t,e)}}function Ab(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(nd.compareFunction=t.isReversedDepthBuffer()?iu:nu,r=nd):r=fm,t.setTexture2D(e||r,s)}function Rb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||mm,s)}function Fb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||gm,s)}function Ib(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||pm,s)}function Pb(n){switch(n){case 5126:return fb;case 35664:return pb;case 35665:return mb;case 35666:return gb;case 35674:return xb;case 35675:return yb;case 35676:return _b;case 5124:case 35670:return vb;case 35667:case 35671:return bb;case 35668:case 35672:return Mb;case 35669:case 35673:return Sb;case 5125:return Eb;case 36294:return wb;case 36295:return Tb;case 36296:return Cb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ab;case 35679:case 36299:case 36307:return Rb;case 35680:case 36300:case 36308:case 36293:return Fb;case 36289:case 36303:case 36311:case 36292:return Ib}}function Db(n,e){n.uniform1fv(this.addr,e)}function Lb(n,e){let t=$r(e,this.size,2);n.uniform2fv(this.addr,t)}function Nb(n,e){let t=$r(e,this.size,3);n.uniform3fv(this.addr,t)}function Ub(n,e){let t=$r(e,this.size,4);n.uniform4fv(this.addr,t)}function kb(n,e){let t=$r(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Bb(n,e){let t=$r(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ob(n,e){let t=$r(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function zb(n,e){n.uniform1iv(this.addr,e)}function Hb(n,e){n.uniform2iv(this.addr,e)}function Gb(n,e){n.uniform3iv(this.addr,e)}function Vb(n,e){n.uniform4iv(this.addr,e)}function Wb(n,e){n.uniform1uiv(this.addr,e)}function qb(n,e){n.uniform2uiv(this.addr,e)}function Xb(n,e){n.uniform3uiv(this.addr,e)}function $b(n,e){n.uniform4uiv(this.addr,e)}function Yb(n,e,t){let i=this.cache,s=e.length,r=lu(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),on(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=nd:o=fm;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Zb(n,e,t){let i=this.cache,s=e.length,r=lu(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),on(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||mm,r[o])}function Jb(n,e,t){let i=this.cache,s=e.length,r=lu(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),on(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||gm,r[o])}function Kb(n,e,t){let i=this.cache,s=e.length,r=lu(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),on(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||pm,r[o])}function jb(n){switch(n){case 5126:return Db;case 35664:return Lb;case 35665:return Nb;case 35666:return Ub;case 35674:return kb;case 35675:return Bb;case 35676:return Ob;case 5124:case 35670:return zb;case 35667:case 35671:return Hb;case 35668:case 35672:return Gb;case 35669:case 35673:return Vb;case 5125:return Wb;case 36294:return qb;case 36295:return Xb;case 36296:return $b;case 35678:case 36198:case 36298:case 36306:case 35682:return Yb;case 35679:case 36299:case 36307:return Zb;case 35680:case 36300:case 36308:case 36293:return Jb;case 36289:case 36303:case 36311:case 36292:return Kb}}function Qp(n,e){n.seq.push(e),n.map[e.id]=e}function Qb(n,e,t){let i=n.name,s=i.length;for(ed.lastIndex=0;;){let r=ed.exec(i),o=ed.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Qp(t,c===void 0?new id(a,n,e):new sd(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new rd(a),Qp(t,d)),t=d}}}function em(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}function n1(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function i1(n){at._getMatrix(tm,at.workingColorSpace,n);let e=`mat3( ${tm.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case Fo:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function nm(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+n1(n.getShaderSource(e),a)}else return r}function s1(n,e){let t=i1(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function o1(n,e){let t=r1[e];return t===void 0?(je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function a1(){at.getLuminanceCoefficients(ru);let n=ru.x.toFixed(4),e=ru.y.toFixed(4),t=ru.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function l1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wa).join(`
`)}function c1(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function u1(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function wa(n){return n!==""}function im(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function od(n){return n.replace(h1,f1)}function f1(n,e){let t=it[e];if(t===void 0){let i=d1.get(e);if(i!==void 0)t=it[i],je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return od(t)}function rm(n){return n.replace(p1,m1)}function m1(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function om(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function x1(n){return g1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function _1(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":y1[n.envMapMode]||"ENVMAP_TYPE_CUBE"}function b1(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":v1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}function S1(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":M1[n.combine]||"ENVMAP_BLENDING_NONE"}function E1(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function w1(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=x1(t),c=_1(t),u=b1(t),d=S1(t),h=E1(t),g=l1(t),v=c1(r),S=s.createProgram(),p,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(wa).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(wa).join(`
`),f.length>0&&(f+=`
`)):(p=[om(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wa).join(`
`),f=[om(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?it.tonemapping_pars_fragment:"",t.toneMapping!==_i?o1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,s1("linearToOutputTexel",t.outputColorSpace),a1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wa).join(`
`)),o=od(o),o=im(o,t),o=sm(o,t),a=od(a),a=im(a,t),a=sm(a,t),o=rm(o),a=rm(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let _=b+p+o,m=b+f+a,E=em(s,s.VERTEX_SHADER,_),x=em(s,s.FRAGMENT_SHADER,m);s.attachShader(S,E),s.attachShader(S,x),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function w(P){if(n.debug.checkShaderErrors){let L=s.getProgramInfoLog(S)||"",z=s.getShaderInfoLog(E)||"",$=s.getShaderInfoLog(x)||"",V=L.trim(),X=z.trim(),B=$.trim(),Q=!0,he=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,E,x);else{let ae=nm(s,E,"vertex"),W=nm(s,x,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+ae+`
`+W)}else V!==""?je("WebGLProgram: Program Info Log:",V):(X===""||B==="")&&(he=!1);he&&(P.diagnostics={runnable:Q,programLog:V,vertexShader:{log:X,prefix:p},fragmentShader:{log:B,prefix:f}})}s.deleteShader(E),s.deleteShader(x),y=new qr(s,S),T=u1(s,S)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(S,e1)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=t1++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=E,this.fragmentShader=x,this}function C1(n){return n===Ss||n===va||n===ba}function A1(n,e,t,i,s,r){let o=new Lo,a=new ad,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function S(y,T,I,P,L,z){let $=P.fog,V=L.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Q=e.get(y.envMap||X,B),he=Q&&Q.mapping===pa?Q.image.height:null,ae=g[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&je("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let W=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ne=W!==void 0?W.length:0,F=0;V.morphAttributes.position!==void 0&&(F=1),V.morphAttributes.normal!==void 0&&(F=2),V.morphAttributes.color!==void 0&&(F=3);let J,Y,A,U;if(ae){let ze=ki[ae];J=ze.vertexShader,Y=ze.fragmentShader}else{J=y.vertexShader,Y=y.fragmentShader;let ze=a.getVertexShaderStage(y),Lt=a.getFragmentShaderStage(y);a.update(y,ze,Lt),A=ze.id,U=Lt.id}let O=n.getRenderTarget(),q=n.state.buffers.depth.getReversed(),H=L.isInstancedMesh===!0,te=L.isBatchedMesh===!0,K=!!y.map,de=!!y.matcap,be=!!Q,oe=!!y.aoMap,me=!!y.lightMap,we=!!y.bumpMap&&y.wireframe===!1,Se=!!y.normalMap,ge=!!y.displacementMap,Ae=!!y.emissiveMap,Le=!!y.metalnessMap,Ke=!!y.roughnessMap,G=y.anisotropy>0,Ze=y.clearcoat>0,Ne=y.dispersion>0,D=y.iridescence>0,M=y.sheen>0,C=y.transmission>0,k=G&&!!y.anisotropyMap,ee=Ze&&!!y.clearcoatMap,xe=Ze&&!!y.clearcoatNormalMap,pe=Ze&&!!y.clearcoatRoughnessMap,se=D&&!!y.iridescenceMap,ue=D&&!!y.iridescenceThicknessMap,Me=M&&!!y.sheenColorMap,Re=M&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,ve=!!y.specularColorMap,Ue=!!y.specularIntensityMap,Ge=C&&!!y.transmissionMap,Je=C&&!!y.thicknessMap,Z=!!y.gradientMap,Te=!!y.alphaMap,fe=y.alphaTest>0,Ce=!!y.alphaHash,De=!!y.extensions,_e=_i;y.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(_e=n.toneMapping);let Ve={shaderID:ae,shaderType:y.type,shaderName:y.name,vertexShader:J,fragmentShader:Y,defines:y.defines,customVertexShaderID:A,customFragmentShaderID:U,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:te,batchingColor:te&&L._colorsTexture!==null,instancing:H,instancingColor:H&&L.instanceColor!==null,instancingMorph:H&&L.morphTexture!==null,outputColorSpace:O===null?n.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:K,matcap:de,envMap:be,envMapMode:be&&Q.mapping,envMapCubeUVHeight:he,aoMap:oe,lightMap:me,bumpMap:we,normalMap:Se,displacementMap:ge,emissiveMap:Ae,normalMapObjectSpace:Se&&y.normalMapType===wp,normalMapTangentSpace:Se&&y.normalMapType===Ma,packedNormalMap:Se&&y.normalMapType===Ma&&C1(y.normalMap.format),metalnessMap:Le,roughnessMap:Ke,anisotropy:G,anisotropyMap:k,clearcoat:Ze,clearcoatMap:ee,clearcoatNormalMap:xe,clearcoatRoughnessMap:pe,dispersion:Ne,iridescence:D,iridescenceMap:se,iridescenceThicknessMap:ue,sheen:M,sheenColorMap:Me,sheenRoughnessMap:Re,specularMap:Ee,specularColorMap:ve,specularIntensityMap:Ue,transmission:C,transmissionMap:Ge,thicknessMap:Je,gradientMap:Z,opaque:y.transparent===!1&&y.blending===Ki&&y.alphaToCoverage===!1,alphaMap:Te,alphaTest:fe,alphaHash:Ce,combine:y.combine,mapUv:K&&v(y.map.channel),aoMapUv:oe&&v(y.aoMap.channel),lightMapUv:me&&v(y.lightMap.channel),bumpMapUv:we&&v(y.bumpMap.channel),normalMapUv:Se&&v(y.normalMap.channel),displacementMapUv:ge&&v(y.displacementMap.channel),emissiveMapUv:Ae&&v(y.emissiveMap.channel),metalnessMapUv:Le&&v(y.metalnessMap.channel),roughnessMapUv:Ke&&v(y.roughnessMap.channel),anisotropyMapUv:k&&v(y.anisotropyMap.channel),clearcoatMapUv:ee&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:xe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Re&&v(y.sheenRoughnessMap.channel),specularMapUv:Ee&&v(y.specularMap.channel),specularColorMapUv:ve&&v(y.specularColorMap.channel),specularIntensityMapUv:Ue&&v(y.specularIntensityMap.channel),transmissionMapUv:Ge&&v(y.transmissionMap.channel),thicknessMapUv:Je&&v(y.thicknessMap.channel),alphaMapUv:Te&&v(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Se||G),vertexNormals:!!V.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(K||Te),fog:!!$,useFog:y.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||V.attributes.normal===void 0&&Se===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:q,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:F,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:_e,decodeVideoTexture:K&&y.map.isVideoTexture===!0&&at.getTransfer(y.map.colorSpace)===pt,decodeVideoTextureEmissive:Ae&&y.emissiveMap.isVideoTexture===!0&&at.getTransfer(y.emissiveMap.colorSpace)===pt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ct,flipSided:y.side===Xt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:De&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&y.extensions.multiDraw===!0||te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ve.vertexUv1s=l.has(1),Ve.vertexUv2s=l.has(2),Ve.vertexUv3s=l.has(3),l.clear(),Ve}function p(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)T.push(I),T.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(f(T,y),b(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function f(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function b(y,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function _(y){let T=g[y.type],I;if(T){let P=ki[T];I=ns.clone(P.uniforms)}else I=y.uniforms;return I}function m(y,T){let I=u.get(T);return I!==void 0?++I.usedTimes:(I=new w1(n,T,y,s),c.push(I),u.set(T,I)),I}function E(y){if(--y.usedTimes===0){let T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function x(y){a.remove(y)}function w(){a.dispose()}return{getParameters:S,getProgramCacheKey:p,getUniforms:_,acquireProgram:m,releaseProgram:E,releaseShaderCache:x,programs:c,dispose:w}}function R1(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function F1(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function am(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function lm(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function a(h,g,v,S,p,f){let b=n[e];return b===void 0?(b={id:h.id,object:h,geometry:g,material:v,materialVariant:o(h),groupOrder:S,renderOrder:h.renderOrder,z:p,group:f},n[e]=b):(b.id=h.id,b.object=h,b.geometry=g,b.material=v,b.materialVariant=o(h),b.groupOrder=S,b.renderOrder=h.renderOrder,b.z=p,b.group=f),e++,b}function l(h,g,v,S,p,f){let b=a(h,g,v,S,p,f);v.transmission>0?i.push(b):v.transparent===!0?s.push(b):t.push(b)}function c(h,g,v,S,p,f){let b=a(h,g,v,S,p,f);v.transmission>0?i.unshift(b):v.transparent===!0?s.unshift(b):t.unshift(b)}function u(h,g,v){t.length>1&&t.sort(h||F1),i.length>1&&i.sort(g||am),s.length>1&&s.sort(g||am),v&&(t.reverse(),i.reverse(),s.reverse())}function d(){for(let h=e,g=n.length;h<g;h++){let v=n[h];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function I1(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new lm,n.set(i,[o])):s>=r.length?(o=new lm,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function P1(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new le};break;case"SpotLight":t={position:new N,direction:new N,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new le,groundColor:new le};break;case"RectAreaLight":t={color:new le,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function D1(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}function N1(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function U1(n){let e=new P1,t=D1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,r=new ht,o=new ht;function a(c){let u=0,d=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let g=0,v=0,S=0,p=0,f=0,b=0,_=0,m=0,E=0,x=0,w=0;c.sort(N1);for(let T=0,I=c.length;T<I;T++){let P=c[T],L=P.color,z=P.intensity,$=P.distance,V=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ss?V=P.shadow.map.texture:V=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=L.r*z,d+=L.g*z,h+=L.b*z;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],z);w++}else if(P.isDirectionalLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let B=P.shadow,Q=t.get(P);Q.shadowIntensity=B.intensity,Q.shadowBias=B.bias,Q.shadowNormalBias=B.normalBias,Q.shadowRadius=B.radius,Q.shadowMapSize=B.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=V,i.directionalShadowMatrix[g]=P.shadow.matrix,b++}i.directional[g]=X,g++}else if(P.isSpotLight){let X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(L).multiplyScalar(z),X.distance=$,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[S]=X;let B=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,B.updateMatrices(P),P.castShadow&&x++),i.spotLightMatrix[S]=B.matrix,P.castShadow){let Q=t.get(P);Q.shadowIntensity=B.intensity,Q.shadowBias=B.bias,Q.shadowNormalBias=B.normalBias,Q.shadowRadius=B.radius,Q.shadowMapSize=B.mapSize,i.spotShadow[S]=Q,i.spotShadowMap[S]=V,m++}S++}else if(P.isRectAreaLight){let X=e.get(P);X.color.copy(L).multiplyScalar(z),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[p]=X,p++}else if(P.isPointLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let B=P.shadow,Q=t.get(P);Q.shadowIntensity=B.intensity,Q.shadowBias=B.bias,Q.shadowNormalBias=B.normalBias,Q.shadowRadius=B.radius,Q.shadowMapSize=B.mapSize,Q.shadowCameraNear=B.camera.near,Q.shadowCameraFar=B.camera.far,i.pointShadow[v]=Q,i.pointShadowMap[v]=V,i.pointShadowMatrix[v]=P.shadow.matrix,_++}i.point[v]=X,v++}else if(P.isHemisphereLight){let X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(z),X.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[f]=X,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Fe.LTC_FLOAT_1,i.rectAreaLTC2=Fe.LTC_FLOAT_2):(i.rectAreaLTC1=Fe.LTC_HALF_1,i.rectAreaLTC2=Fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let y=i.hash;(y.directionalLength!==g||y.pointLength!==v||y.spotLength!==S||y.rectAreaLength!==p||y.hemiLength!==f||y.numDirectionalShadows!==b||y.numPointShadows!==_||y.numSpotShadows!==m||y.numSpotMaps!==E||y.numLightProbes!==w)&&(i.directional.length=g,i.spot.length=S,i.rectArea.length=p,i.point.length=v,i.hemi.length=f,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=m,i.spotShadowMap.length=m,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=m+E-x,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=x,i.numLightProbes=w,y.directionalLength=g,y.pointLength=v,y.spotLength=S,y.rectAreaLength=p,y.hemiLength=f,y.numDirectionalShadows=b,y.numPointShadows=_,y.numSpotShadows=m,y.numSpotMaps=E,y.numLightProbes=w,i.version=L1++)}function l(c,u){let d=0,h=0,g=0,v=0,S=0,p=u.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){let _=c[f];if(_.isDirectionalLight){let m=i.directional[d];m.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),m.direction.sub(s),m.direction.transformDirection(p),d++}else if(_.isSpotLight){let m=i.spot[g];m.position.setFromMatrixPosition(_.matrixWorld),m.position.applyMatrix4(p),m.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),m.direction.sub(s),m.direction.transformDirection(p),g++}else if(_.isRectAreaLight){let m=i.rectArea[v];m.position.setFromMatrixPosition(_.matrixWorld),m.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),m.halfWidth.set(_.width*.5,0,0),m.halfHeight.set(0,_.height*.5,0),m.halfWidth.applyMatrix4(o),m.halfHeight.applyMatrix4(o),v++}else if(_.isPointLight){let m=i.point[h];m.position.setFromMatrixPosition(_.matrixWorld),m.position.applyMatrix4(p),h++}else if(_.isHemisphereLight){let m=i.hemi[S];m.direction.setFromMatrixPosition(_.matrixWorld),m.direction.transformDirection(p),S++}}}return{setup:a,setupView:l,state:i}}function cm(n){let e=new U1(n),t=[],i=[],s=[];function r(h){d.camera=h,t.length=0,i.length=0,s.length=0}function o(h){t.push(h)}function a(h){i.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function k1(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new cm(n),e.set(s,[a])):r>=o.length?(a=new cm(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}function G1(n,e,t){let i=new Pr,s=new ye,r=new ye,o=new It,a=new ec,l=new tc,c={},u=t.maxTextureSize,d={[gi]:Xt,[Xt]:gi,[Ct]:Ct},h=new ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:B1,fragmentShader:O1}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let v=new dt;v.setAttribute("position",new lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new Xe(v,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa;let f=this.type;this.render=function(x,w,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||x.length===0)return;this.type===sp&&(je("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=oa);let T=n.getRenderTarget(),I=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),L=n.state;L.setBlending(ii),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let z=f!==this.type;z&&w.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(V=>V.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,V=x.length;$<V;$++){let X=x[$],B=X.shadow;if(B===void 0){je("WebGLShadowMap:",X,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);let Q=B.getFrameExtents();s.multiply(Q),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,B.mapSize.y=r.y));let he=n.state.buffers.depth.getReversed();if(B.camera._reversedDepth=he,B.map===null||z===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===zr){if(X.isPointLight){je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new qt(s.x,s.y,{format:Ss,type:dn,minFilter:wt,magFilter:wt,generateMipmaps:!1}),B.map.texture.name=X.name+".shadowMap",B.map.depthTexture=new Qi(s.x,s.y,si),B.map.depthTexture.name=X.name+".shadowMapDepth",B.map.depthTexture.format=Fi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=un,B.map.depthTexture.magFilter=un}else X.isPointLight?(B.map=new ou(s.x),B.map.depthTexture=new Zl(s.x,vi)):(B.map=new qt(s.x,s.y),B.map.depthTexture=new Qi(s.x,s.y,vi)),B.map.depthTexture.name=X.name+".shadowMap",B.map.depthTexture.format=Fi,this.type===oa?(B.map.depthTexture.compareFunction=he?iu:nu,B.map.depthTexture.minFilter=wt,B.map.depthTexture.magFilter=wt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=un,B.map.depthTexture.magFilter=un);B.camera.updateProjectionMatrix()}let ae=B.map.isWebGLCubeRenderTarget?6:1;for(let W=0;W<ae;W++){if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,W),n.clear();else{W===0&&(n.setRenderTarget(B.map),n.clear());let ne=B.getViewport(W);o.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),L.viewport(o)}if(X.isPointLight){let ne=B.camera,F=B.matrix,J=X.distance||ne.far;J!==ne.far&&(ne.far=J,ne.updateProjectionMatrix()),Ea.setFromMatrixPosition(X.matrixWorld),ne.position.copy(Ea),td.copy(ne.position),td.add(z1[W]),ne.up.copy(H1[W]),ne.lookAt(td),ne.updateMatrixWorld(),F.makeTranslation(-Ea.x,-Ea.y,-Ea.z),um.multiplyMatrices(ne.projectionMatrix,ne.matrixWorldInverse),B._frustum.setFromProjectionMatrix(um,ne.coordinateSystem,ne.reversedDepth)}else B.updateMatrices(X);i=B.getFrustum(),m(w,y,B.camera,X,this.type)}B.isPointLightShadow!==!0&&this.type===zr&&b(B,y),B.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(T,I,P)};function b(x,w){let y=e.update(S);h.defines.VSM_SAMPLES!==x.blurSamples&&(h.defines.VSM_SAMPLES=x.blurSamples,g.defines.VSM_SAMPLES=x.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new qt(s.x,s.y,{format:Ss,type:dn})),h.uniforms.shadow_pass.value=x.map.depthTexture,h.uniforms.resolution.value=x.mapSize,h.uniforms.radius.value=x.radius,n.setRenderTarget(x.mapPass),n.clear(),n.renderBufferDirect(w,null,y,h,S,null),g.uniforms.shadow_pass.value=x.mapPass.texture,g.uniforms.resolution.value=x.mapSize,g.uniforms.radius.value=x.radius,n.setRenderTarget(x.map),n.clear(),n.renderBufferDirect(w,null,y,g,S,null)}function _(x,w,y,T){let I=null,P=y.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(P!==void 0)I=P;else if(I=y.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let L=I.uuid,z=w.uuid,$=c[L];$===void 0&&($={},c[L]=$);let V=$[z];V===void 0&&(V=I.clone(),$[z]=V,w.addEventListener("dispose",E)),I=V}if(I.visible=w.visible,I.wireframe=w.wireframe,T===zr?I.side=w.shadowSide!==null?w.shadowSide:w.side:I.side=w.shadowSide!==null?w.shadowSide:d[w.side],I.alphaMap=w.alphaMap,I.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,I.map=w.map,I.clipShadows=w.clipShadows,I.clippingPlanes=w.clippingPlanes,I.clipIntersection=w.clipIntersection,I.displacementMap=w.displacementMap,I.displacementScale=w.displacementScale,I.displacementBias=w.displacementBias,I.wireframeLinewidth=w.wireframeLinewidth,I.linewidth=w.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let L=n.properties.get(I);L.light=y}return I}function m(x,w,y,T,I){if(x.visible===!1)return;if(x.layers.test(w.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&I===zr)&&(!x.frustumCulled||i.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,x.matrixWorld);let z=e.update(x),$=x.material;if(Array.isArray($)){let V=z.groups;for(let X=0,B=V.length;X<B;X++){let Q=V[X],he=$[Q.materialIndex];if(he&&he.visible){let ae=_(x,he,T,I);x.onBeforeShadow(n,x,w,y,z,ae,Q),n.renderBufferDirect(y,null,z,ae,x,Q),x.onAfterShadow(n,x,w,y,z,ae,Q)}}}else if($.visible){let V=_(x,$,T,I);x.onBeforeShadow(n,x,w,y,z,V,null),n.renderBufferDirect(y,null,z,V,x,null),x.onAfterShadow(n,x,w,y,z,V,null)}}let L=x.children;for(let z=0,$=L.length;z<$;z++)m(L[z],w,y,T,I)}function E(x){x.target.removeEventListener("dispose",E);for(let y in c){let T=c[y],I=x.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function V1(n,e){function t(){let Z=!1,Te=new It,fe=null,Ce=new It(0,0,0,0);return{setMask:function(De){fe!==De&&!Z&&(n.colorMask(De,De,De,De),fe=De)},setLocked:function(De){Z=De},setClear:function(De,_e,Ve,ze,Lt){Lt===!0&&(De*=ze,_e*=ze,Ve*=ze),Te.set(De,_e,Ve,ze),Ce.equals(Te)===!1&&(n.clearColor(De,_e,Ve,ze),Ce.copy(Te))},reset:function(){Z=!1,fe=null,Ce.set(-1,0,0,0)}}}function i(){let Z=!1,Te=!1,fe=null,Ce=null,De=null;return{setReversed:function(_e){if(Te!==_e){let Ve=e.get("EXT_clip_control");_e?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Te=_e;let ze=De;De=null,this.setClear(ze)}},getReversed:function(){return Te},setTest:function(_e){_e?O(n.DEPTH_TEST):q(n.DEPTH_TEST)},setMask:function(_e){fe!==_e&&!Z&&(n.depthMask(_e),fe=_e)},setFunc:function(_e){if(Te&&(_e=Np[_e]),Ce!==_e){switch(_e){case Dl:n.depthFunc(n.NEVER);break;case Ll:n.depthFunc(n.ALWAYS);break;case Nl:n.depthFunc(n.LESS);break;case Gs:n.depthFunc(n.LEQUAL);break;case Ul:n.depthFunc(n.EQUAL);break;case kl:n.depthFunc(n.GEQUAL);break;case Bl:n.depthFunc(n.GREATER);break;case Ol:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ce=_e}},setLocked:function(_e){Z=_e},setClear:function(_e){De!==_e&&(De=_e,Te&&(_e=1-_e),n.clearDepth(_e))},reset:function(){Z=!1,fe=null,Ce=null,De=null,Te=!1}}}function s(){let Z=!1,Te=null,fe=null,Ce=null,De=null,_e=null,Ve=null,ze=null,Lt=null;return{setTest:function(St){Z||(St?O(n.STENCIL_TEST):q(n.STENCIL_TEST))},setMask:function(St){Te!==St&&!Z&&(n.stencilMask(St),Te=St)},setFunc:function(St,Ei,wi){(fe!==St||Ce!==Ei||De!==wi)&&(n.stencilFunc(St,Ei,wi),fe=St,Ce=Ei,De=wi)},setOp:function(St,Ei,wi){(_e!==St||Ve!==Ei||ze!==wi)&&(n.stencilOp(St,Ei,wi),_e=St,Ve=Ei,ze=wi)},setLocked:function(St){Z=St},setClear:function(St){Lt!==St&&(n.clearStencil(St),Lt=St)},reset:function(){Z=!1,Te=null,fe=null,Ce=null,De=null,_e=null,Ve=null,ze=null,Lt=null}}}let r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},g=new WeakMap,v=[],S=null,p=!1,f=null,b=null,_=null,m=null,E=null,x=null,w=null,y=new le(0,0,0),T=0,I=!1,P=null,L=null,z=null,$=null,V=null,X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,Q=0,he=n.getParameter(n.VERSION);he.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(he)[1]),B=Q>=1):he.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(he)[1]),B=Q>=2);let ae=null,W={},ne=n.getParameter(n.SCISSOR_BOX),F=n.getParameter(n.VIEWPORT),J=new It().fromArray(ne),Y=new It().fromArray(F);function A(Z,Te,fe,Ce){let De=new Uint8Array(4),_e=n.createTexture();n.bindTexture(Z,_e),n.texParameteri(Z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ve=0;Ve<fe;Ve++)Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?n.texImage3D(Te,0,n.RGBA,1,1,Ce,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Te+Ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return _e}let U={};U[n.TEXTURE_2D]=A(n.TEXTURE_2D,n.TEXTURE_2D,1),U[n.TEXTURE_CUBE_MAP]=A(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[n.TEXTURE_2D_ARRAY]=A(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),U[n.TEXTURE_3D]=A(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),O(n.DEPTH_TEST),o.setFunc(Gs),we(!1),Se(Dh),O(n.CULL_FACE),oe(ii);function O(Z){u[Z]!==!0&&(n.enable(Z),u[Z]=!0)}function q(Z){u[Z]!==!1&&(n.disable(Z),u[Z]=!1)}function H(Z,Te){return h[Z]!==Te?(n.bindFramebuffer(Z,Te),h[Z]=Te,Z===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Te),Z===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Te),!0):!1}function te(Z,Te){let fe=v,Ce=!1;if(Z){fe=g.get(Te),fe===void 0&&(fe=[],g.set(Te,fe));let De=Z.textures;if(fe.length!==De.length||fe[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,Ve=De.length;_e<Ve;_e++)fe[_e]=n.COLOR_ATTACHMENT0+_e;fe.length=De.length,Ce=!0}}else fe[0]!==n.BACK&&(fe[0]=n.BACK,Ce=!0);Ce&&n.drawBuffers(fe)}function K(Z){return S!==Z?(n.useProgram(Z),S=Z,!0):!1}let de={[xi]:n.FUNC_ADD,[rp]:n.FUNC_SUBTRACT,[op]:n.FUNC_REVERSE_SUBTRACT};de[ap]=n.MIN,de[lp]=n.MAX;let be={[cp]:n.ZERO,[aa]:n.ONE,[up]:n.SRC_COLOR,[Pl]:n.SRC_ALPHA,[gp]:n.SRC_ALPHA_SATURATE,[pp]:n.DST_COLOR,[dp]:n.DST_ALPHA,[hp]:n.ONE_MINUS_SRC_COLOR,[Hs]:n.ONE_MINUS_SRC_ALPHA,[mp]:n.ONE_MINUS_DST_COLOR,[fp]:n.ONE_MINUS_DST_ALPHA,[xp]:n.CONSTANT_COLOR,[yp]:n.ONE_MINUS_CONSTANT_COLOR,[_p]:n.CONSTANT_ALPHA,[vp]:n.ONE_MINUS_CONSTANT_ALPHA};function oe(Z,Te,fe,Ce,De,_e,Ve,ze,Lt,St){if(Z===ii){p===!0&&(q(n.BLEND),p=!1);return}if(p===!1&&(O(n.BLEND),p=!0),Z!==mc){if(Z!==f||St!==I){if((b!==xi||E!==xi)&&(n.blendEquation(n.FUNC_ADD),b=xi,E=xi),St)switch(Z){case Ki:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ct:n.blendFunc(n.ONE,n.ONE);break;case Lh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Nh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",Z);break}else switch(Z){case Ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ct:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Lh:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nh:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",Z);break}_=null,m=null,x=null,w=null,y.set(0,0,0),T=0,f=Z,I=St}return}De=De||Te,_e=_e||fe,Ve=Ve||Ce,(Te!==b||De!==E)&&(n.blendEquationSeparate(de[Te],de[De]),b=Te,E=De),(fe!==_||Ce!==m||_e!==x||Ve!==w)&&(n.blendFuncSeparate(be[fe],be[Ce],be[_e],be[Ve]),_=fe,m=Ce,x=_e,w=Ve),(ze.equals(y)===!1||Lt!==T)&&(n.blendColor(ze.r,ze.g,ze.b,Lt),y.copy(ze),T=Lt),f=Z,I=!1}function me(Z,Te){Z.side===Ct?q(n.CULL_FACE):O(n.CULL_FACE);let fe=Z.side===Xt;Te&&(fe=!fe),we(fe),Z.blending===Ki&&Z.transparent===!1?oe(ii):oe(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),o.setFunc(Z.depthFunc),o.setTest(Z.depthTest),o.setMask(Z.depthWrite),r.setMask(Z.colorWrite);let Ce=Z.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(Z.stencilWriteMask),a.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),a.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Ae(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?O(n.SAMPLE_ALPHA_TO_COVERAGE):q(n.SAMPLE_ALPHA_TO_COVERAGE)}function we(Z){P!==Z&&(Z?n.frontFace(n.CW):n.frontFace(n.CCW),P=Z)}function Se(Z){Z!==np?(O(n.CULL_FACE),Z!==L&&(Z===Dh?n.cullFace(n.BACK):Z===ip?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):q(n.CULL_FACE),L=Z}function ge(Z){Z!==z&&(B&&n.lineWidth(Z),z=Z)}function Ae(Z,Te,fe){Z?(O(n.POLYGON_OFFSET_FILL),($!==Te||V!==fe)&&($=Te,V=fe,o.getReversed()&&(Te=-Te),n.polygonOffset(Te,fe))):q(n.POLYGON_OFFSET_FILL)}function Le(Z){Z?O(n.SCISSOR_TEST):q(n.SCISSOR_TEST)}function Ke(Z){Z===void 0&&(Z=n.TEXTURE0+X-1),ae!==Z&&(n.activeTexture(Z),ae=Z)}function G(Z,Te,fe){fe===void 0&&(ae===null?fe=n.TEXTURE0+X-1:fe=ae);let Ce=W[fe];Ce===void 0&&(Ce={type:void 0,texture:void 0},W[fe]=Ce),(Ce.type!==Z||Ce.texture!==Te)&&(ae!==fe&&(n.activeTexture(fe),ae=fe),n.bindTexture(Z,Te||U[Z]),Ce.type=Z,Ce.texture=Te)}function Ze(){let Z=W[ae];Z!==void 0&&Z.type!==void 0&&(n.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function Ne(){try{n.compressedTexImage2D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function M(){try{n.texSubImage2D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function C(){try{n.texSubImage3D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function ee(){try{n.compressedTexSubImage3D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function xe(){try{n.texStorage2D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function pe(){try{n.texStorage3D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function se(){try{n.texImage2D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function ue(){try{n.texImage3D(...arguments)}catch(Z){Qe("WebGLState:",Z)}}function Me(Z){return d[Z]!==void 0?d[Z]:n.getParameter(Z)}function Re(Z,Te){d[Z]!==Te&&(n.pixelStorei(Z,Te),d[Z]=Te)}function Ee(Z){J.equals(Z)===!1&&(n.scissor(Z.x,Z.y,Z.z,Z.w),J.copy(Z))}function ve(Z){Y.equals(Z)===!1&&(n.viewport(Z.x,Z.y,Z.z,Z.w),Y.copy(Z))}function Ue(Z,Te){let fe=c.get(Te);fe===void 0&&(fe=new WeakMap,c.set(Te,fe));let Ce=fe.get(Z);Ce===void 0&&(Ce=n.getUniformBlockIndex(Te,Z.name),fe.set(Z,Ce))}function Ge(Z,Te){let Ce=c.get(Te).get(Z);l.get(Te)!==Ce&&(n.uniformBlockBinding(Te,Ce,Z.__bindingPointIndex),l.set(Te,Ce))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ae=null,W={},h={},g=new WeakMap,v=[],S=null,p=!1,f=null,b=null,_=null,m=null,E=null,x=null,w=null,y=new le(0,0,0),T=0,I=!1,P=null,L=null,z=null,$=null,V=null,J.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:O,disable:q,bindFramebuffer:H,drawBuffers:te,useProgram:K,setBlending:oe,setMaterial:me,setFlipSided:we,setCullFace:Se,setLineWidth:ge,setPolygonOffset:Ae,setScissorTest:Le,activeTexture:Ke,bindTexture:G,unbindTexture:Ze,compressedTexImage2D:Ne,compressedTexImage3D:D,texImage2D:se,texImage3D:ue,pixelStorei:Re,getParameter:Me,updateUBOMapping:Ue,uniformBlockBinding:Ge,texStorage2D:xe,texStorage3D:pe,texSubImage2D:M,texSubImage3D:C,compressedTexSubImage2D:k,compressedTexSubImage3D:ee,scissor:Ee,viewport:ve,reset:Je}}function W1(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,u=new WeakMap,d=new Set,h,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(D,M){return v?new OffscreenCanvas(D,M):Io("canvas")}function p(D,M,C){let k=1,ee=Ne(D);if((ee.width>C||ee.height>C)&&(k=C/Math.max(ee.width,ee.height)),k<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let xe=Math.floor(k*ee.width),pe=Math.floor(k*ee.height);h===void 0&&(h=S(xe,pe));let se=M?S(xe,pe):h;return se.width=xe,se.height=pe,se.getContext("2d").drawImage(D,0,0,xe,pe),je("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+xe+"x"+pe+")."),se}else return"data"in D&&je("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),D;return D}function f(D){return D.generateMipmaps}function b(D){n.generateMipmap(D)}function _(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function m(D,M,C,k,ee,xe=!1){if(D!==null){if(n[D]!==void 0)return n[D];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let pe;k&&(pe=e.get("EXT_texture_norm16"),pe||je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=M;if(M===n.RED&&(C===n.FLOAT&&(se=n.R32F),C===n.HALF_FLOAT&&(se=n.R16F),C===n.UNSIGNED_BYTE&&(se=n.R8),C===n.UNSIGNED_SHORT&&pe&&(se=pe.R16_EXT),C===n.SHORT&&pe&&(se=pe.R16_SNORM_EXT)),M===n.RED_INTEGER&&(C===n.UNSIGNED_BYTE&&(se=n.R8UI),C===n.UNSIGNED_SHORT&&(se=n.R16UI),C===n.UNSIGNED_INT&&(se=n.R32UI),C===n.BYTE&&(se=n.R8I),C===n.SHORT&&(se=n.R16I),C===n.INT&&(se=n.R32I)),M===n.RG&&(C===n.FLOAT&&(se=n.RG32F),C===n.HALF_FLOAT&&(se=n.RG16F),C===n.UNSIGNED_BYTE&&(se=n.RG8),C===n.UNSIGNED_SHORT&&pe&&(se=pe.RG16_EXT),C===n.SHORT&&pe&&(se=pe.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(C===n.UNSIGNED_BYTE&&(se=n.RG8UI),C===n.UNSIGNED_SHORT&&(se=n.RG16UI),C===n.UNSIGNED_INT&&(se=n.RG32UI),C===n.BYTE&&(se=n.RG8I),C===n.SHORT&&(se=n.RG16I),C===n.INT&&(se=n.RG32I)),M===n.RGB_INTEGER&&(C===n.UNSIGNED_BYTE&&(se=n.RGB8UI),C===n.UNSIGNED_SHORT&&(se=n.RGB16UI),C===n.UNSIGNED_INT&&(se=n.RGB32UI),C===n.BYTE&&(se=n.RGB8I),C===n.SHORT&&(se=n.RGB16I),C===n.INT&&(se=n.RGB32I)),M===n.RGBA_INTEGER&&(C===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),C===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),C===n.UNSIGNED_INT&&(se=n.RGBA32UI),C===n.BYTE&&(se=n.RGBA8I),C===n.SHORT&&(se=n.RGBA16I),C===n.INT&&(se=n.RGBA32I)),M===n.RGB&&(C===n.UNSIGNED_SHORT&&pe&&(se=pe.RGB16_EXT),C===n.SHORT&&pe&&(se=pe.RGB16_SNORM_EXT),C===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),C===n.UNSIGNED_INT_10F_11F_11F_REV&&(se=n.R11F_G11F_B10F)),M===n.RGBA){let ue=xe?Fo:at.getTransfer(ee);C===n.FLOAT&&(se=n.RGBA32F),C===n.HALF_FLOAT&&(se=n.RGBA16F),C===n.UNSIGNED_BYTE&&(se=ue===pt?n.SRGB8_ALPHA8:n.RGBA8),C===n.UNSIGNED_SHORT&&pe&&(se=pe.RGBA16_EXT),C===n.SHORT&&pe&&(se=pe.RGBA16_SNORM_EXT),C===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),C===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function E(D,M){let C;return D?M===null||M===vi||M===Gr?C=n.DEPTH24_STENCIL8:M===si?C=n.DEPTH32F_STENCIL8:M===Hr&&(C=n.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===vi||M===Gr?C=n.DEPTH_COMPONENT24:M===si?C=n.DEPTH_COMPONENT32F:M===Hr&&(C=n.DEPTH_COMPONENT16),C}function x(D,M){return f(D)===!0||D.isFramebufferTexture&&D.minFilter!==un&&D.minFilter!==wt?Math.log2(Math.max(M.width,M.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?M.mipmaps.length:1}function w(D){let M=D.target;M.removeEventListener("dispose",w),T(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&d.delete(M)}function y(D){let M=D.target;M.removeEventListener("dispose",y),P(M)}function T(D){let M=i.get(D);if(M.__webglInit===void 0)return;let C=D.source,k=g.get(C);if(k){let ee=k[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&I(D),Object.keys(k).length===0&&g.delete(C)}i.remove(D)}function I(D){let M=i.get(D);n.deleteTexture(M.__webglTexture);let C=D.source,k=g.get(C);delete k[M.__cacheKey],o.memory.textures--}function P(D){let M=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(M.__webglFramebuffer[k]))for(let ee=0;ee<M.__webglFramebuffer[k].length;ee++)n.deleteFramebuffer(M.__webglFramebuffer[k][ee]);else n.deleteFramebuffer(M.__webglFramebuffer[k]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[k])}else{if(Array.isArray(M.__webglFramebuffer))for(let k=0;k<M.__webglFramebuffer.length;k++)n.deleteFramebuffer(M.__webglFramebuffer[k]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let k=0;k<M.__webglColorRenderbuffer.length;k++)M.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[k]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let C=D.textures;for(let k=0,ee=C.length;k<ee;k++){let xe=i.get(C[k]);xe.__webglTexture&&(n.deleteTexture(xe.__webglTexture),o.memory.textures--),i.remove(C[k])}i.remove(D)}let L=0;function z(){L=0}function $(){return L}function V(D){L=D}function X(){let D=L;return D>=s.maxTextures&&je("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),L+=1,D}function B(D){let M=[];return M.push(D.wrapS),M.push(D.wrapT),M.push(D.wrapR||0),M.push(D.magFilter),M.push(D.minFilter),M.push(D.anisotropy),M.push(D.internalFormat),M.push(D.format),M.push(D.type),M.push(D.generateMipmaps),M.push(D.premultiplyAlpha),M.push(D.flipY),M.push(D.unpackAlignment),M.push(D.colorSpace),M.join()}function Q(D,M){let C=i.get(D);if(D.isVideoTexture&&G(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&C.__version!==D.version){let k=D.image;if(k===null)je("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)je("WebGLRenderer: Texture marked for update but image is incomplete");else{q(C,D,M);return}}else D.isExternalTexture&&(C.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,C.__webglTexture,n.TEXTURE0+M)}function he(D,M){let C=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&C.__version!==D.version){q(C,D,M);return}else D.isExternalTexture&&(C.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,C.__webglTexture,n.TEXTURE0+M)}function ae(D,M){let C=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&C.__version!==D.version){q(C,D,M);return}t.bindTexture(n.TEXTURE_3D,C.__webglTexture,n.TEXTURE0+M)}function W(D,M){let C=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&C.__version!==D.version){H(C,D,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+M)}let ne={[Qn]:n.REPEAT,[jt]:n.CLAMP_TO_EDGE,[zl]:n.MIRRORED_REPEAT},F={[un]:n.NEAREST,[Sp]:n.NEAREST_MIPMAP_NEAREST,[ma]:n.NEAREST_MIPMAP_LINEAR,[wt]:n.LINEAR,[_c]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},J={[Tp]:n.NEVER,[Ip]:n.ALWAYS,[Cp]:n.LESS,[nu]:n.LEQUAL,[Ap]:n.EQUAL,[iu]:n.GEQUAL,[Rp]:n.GREATER,[Fp]:n.NOTEQUAL};function Y(D,M){if(M.type===si&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===wt||M.magFilter===_c||M.magFilter===ma||M.magFilter===bs||M.minFilter===wt||M.minFilter===_c||M.minFilter===ma||M.minFilter===bs)&&je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,ne[M.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,ne[M.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,ne[M.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,F[M.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,F[M.minFilter]),M.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,J[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===un||M.minFilter!==ma&&M.minFilter!==bs||M.type===si&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){let C=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function A(D,M){let C=!1;D.__webglInit===void 0&&(D.__webglInit=!0,M.addEventListener("dispose",w));let k=M.source,ee=g.get(k);ee===void 0&&(ee={},g.set(k,ee));let xe=B(M);if(xe!==D.__cacheKey){ee[xe]===void 0&&(ee[xe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,C=!0),ee[xe].usedTimes++;let pe=ee[D.__cacheKey];pe!==void 0&&(ee[D.__cacheKey].usedTimes--,pe.usedTimes===0&&I(M)),D.__cacheKey=xe,D.__webglTexture=ee[xe].texture}return C}function U(D,M,C){return Math.floor(Math.floor(D/C)/M)}function O(D,M,C,k){let xe=D.updateRanges;if(xe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,C,k,M.data);else{xe.sort((Re,Ee)=>Re.start-Ee.start);let pe=0;for(let Re=1;Re<xe.length;Re++){let Ee=xe[pe],ve=xe[Re],Ue=Ee.start+Ee.count,Ge=U(ve.start,M.width,4),Je=U(Ee.start,M.width,4);ve.start<=Ue+1&&Ge===Je&&U(ve.start+ve.count-1,M.width,4)===Ge?Ee.count=Math.max(Ee.count,ve.start+ve.count-Ee.start):(++pe,xe[pe]=ve)}xe.length=pe+1;let se=t.getParameter(n.UNPACK_ROW_LENGTH),ue=t.getParameter(n.UNPACK_SKIP_PIXELS),Me=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let Re=0,Ee=xe.length;Re<Ee;Re++){let ve=xe[Re],Ue=Math.floor(ve.start/4),Ge=Math.ceil(ve.count/4),Je=Ue%M.width,Z=Math.floor(Ue/M.width),Te=Ge,fe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(n.UNPACK_SKIP_ROWS,Z),t.texSubImage2D(n.TEXTURE_2D,0,Je,Z,Te,fe,C,k,M.data)}D.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,Me)}}function q(D,M,C){let k=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(k=n.TEXTURE_3D);let ee=A(D,M),xe=M.source;t.bindTexture(k,D.__webglTexture,n.TEXTURE0+C);let pe=i.get(xe);if(xe.version!==pe.__version||ee===!0){if(t.activeTexture(n.TEXTURE0+C),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let fe=at.getPrimaries(at.workingColorSpace),Ce=M.colorSpace===bi?null:at.getPrimaries(M.colorSpace),De=M.colorSpace===bi||fe===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let ue=p(M.image,!1,s.maxTextureSize);ue=Ze(M,ue);let Me=r.convert(M.format,M.colorSpace),Re=r.convert(M.type),Ee=m(M.internalFormat,Me,Re,M.normalized,M.colorSpace,M.isVideoTexture);Y(k,M);let ve,Ue=M.mipmaps,Ge=M.isVideoTexture!==!0,Je=pe.__version===void 0||ee===!0,Z=xe.dataReady,Te=x(M,ue);if(M.isDepthTexture)Ee=E(M.format===Ms,M.type),Je&&(Ge?t.texStorage2D(n.TEXTURE_2D,1,Ee,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ee,ue.width,ue.height,0,Me,Re,null));else if(M.isDataTexture)if(Ue.length>0){Ge&&Je&&t.texStorage2D(n.TEXTURE_2D,Te,Ee,Ue[0].width,Ue[0].height);for(let fe=0,Ce=Ue.length;fe<Ce;fe++)ve=Ue[fe],Ge?Z&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ve.width,ve.height,Me,Re,ve.data):t.texImage2D(n.TEXTURE_2D,fe,Ee,ve.width,ve.height,0,Me,Re,ve.data);M.generateMipmaps=!1}else Ge?(Je&&t.texStorage2D(n.TEXTURE_2D,Te,Ee,ue.width,ue.height),Z&&O(M,ue,Me,Re)):t.texImage2D(n.TEXTURE_2D,0,Ee,ue.width,ue.height,0,Me,Re,ue.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ge&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,Ee,Ue[0].width,Ue[0].height,ue.depth);for(let fe=0,Ce=Ue.length;fe<Ce;fe++)if(ve=Ue[fe],M.format!==ri)if(Me!==null)if(Ge){if(Z)if(M.layerUpdates.size>0){let De=Yh(ve.width,ve.height,M.format,M.type);for(let _e of M.layerUpdates){let Ve=ve.data.subarray(_e*De/ve.data.BYTES_PER_ELEMENT,(_e+1)*De/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,_e,ve.width,ve.height,1,Me,Ve)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,ve.width,ve.height,ue.depth,Me,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,Ee,ve.width,ve.height,ue.depth,0,ve.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?Z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,ve.width,ve.height,ue.depth,Me,Re,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,Ee,ve.width,ve.height,ue.depth,0,Me,Re,ve.data)}else{Ge&&Je&&t.texStorage2D(n.TEXTURE_2D,Te,Ee,Ue[0].width,Ue[0].height);for(let fe=0,Ce=Ue.length;fe<Ce;fe++)ve=Ue[fe],M.format!==ri?Me!==null?Ge?Z&&t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,ve.width,ve.height,Me,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,Ee,ve.width,ve.height,0,ve.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?Z&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ve.width,ve.height,Me,Re,ve.data):t.texImage2D(n.TEXTURE_2D,fe,Ee,ve.width,ve.height,0,Me,Re,ve.data)}else if(M.isDataArrayTexture)if(Ge){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,Ee,ue.width,ue.height,ue.depth),Z)if(M.layerUpdates.size>0){let fe=Yh(ue.width,ue.height,M.format,M.type);for(let Ce of M.layerUpdates){let De=ue.data.subarray(Ce*fe/ue.data.BYTES_PER_ELEMENT,(Ce+1)*fe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ce,ue.width,ue.height,1,Me,Re,De)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Me,Re,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,ue.width,ue.height,ue.depth,0,Me,Re,ue.data);else if(M.isData3DTexture)Ge?(Je&&t.texStorage3D(n.TEXTURE_3D,Te,Ee,ue.width,ue.height,ue.depth),Z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Me,Re,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,ue.width,ue.height,ue.depth,0,Me,Re,ue.data);else if(M.isFramebufferTexture){if(Je)if(Ge)t.texStorage2D(n.TEXTURE_2D,Te,Ee,ue.width,ue.height);else{let fe=ue.width,Ce=ue.height;for(let De=0;De<Te;De++)t.texImage2D(n.TEXTURE_2D,De,Ee,fe,Ce,0,Me,Re,null),fe>>=1,Ce>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){let fe=n.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),ue.parentNode!==fe){fe.appendChild(ue),d.add(M),fe.onpaint=Ce=>{let De=Ce.changedElements;for(let _e of d)De.includes(_e.image)&&(_e.needsUpdate=!0)},fe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ue);else{let De=n.RGBA,_e=n.RGBA,Ve=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,_e,Ve,ue)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ge&&Je){let fe=Ne(Ue[0]);t.texStorage2D(n.TEXTURE_2D,Te,Ee,fe.width,fe.height)}for(let fe=0,Ce=Ue.length;fe<Ce;fe++)ve=Ue[fe],Ge?Z&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Me,Re,ve):t.texImage2D(n.TEXTURE_2D,fe,Ee,Me,Re,ve);M.generateMipmaps=!1}else if(Ge){if(Je){let fe=Ne(ue);t.texStorage2D(n.TEXTURE_2D,Te,Ee,fe.width,fe.height)}Z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Re,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ee,Me,Re,ue);f(M)&&b(k),pe.__version=xe.version,M.onUpdate&&M.onUpdate(M)}D.__version=M.version}function H(D,M,C){if(M.image.length!==6)return;let k=A(D,M),ee=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+C);let xe=i.get(ee);if(ee.version!==xe.__version||k===!0){t.activeTexture(n.TEXTURE0+C);let pe=at.getPrimaries(at.workingColorSpace),se=M.colorSpace===bi?null:at.getPrimaries(M.colorSpace),ue=M.colorSpace===bi||pe===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Me=M.isCompressedTexture||M.image[0].isCompressedTexture,Re=M.image[0]&&M.image[0].isDataTexture,Ee=[];for(let _e=0;_e<6;_e++)!Me&&!Re?Ee[_e]=p(M.image[_e],!0,s.maxCubemapSize):Ee[_e]=Re?M.image[_e].image:M.image[_e],Ee[_e]=Ze(M,Ee[_e]);let ve=Ee[0],Ue=r.convert(M.format,M.colorSpace),Ge=r.convert(M.type),Je=m(M.internalFormat,Ue,Ge,M.normalized,M.colorSpace),Z=M.isVideoTexture!==!0,Te=xe.__version===void 0||k===!0,fe=ee.dataReady,Ce=x(M,ve);Y(n.TEXTURE_CUBE_MAP,M);let De;if(Me){Z&&Te&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,Je,ve.width,ve.height);for(let _e=0;_e<6;_e++){De=Ee[_e].mipmaps;for(let Ve=0;Ve<De.length;Ve++){let ze=De[Ve];M.format!==ri?Ue!==null?Z?fe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve,0,0,ze.width,ze.height,Ue,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve,Je,ze.width,ze.height,0,ze.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve,0,0,ze.width,ze.height,Ue,Ge,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve,Je,ze.width,ze.height,0,Ue,Ge,ze.data)}}}else{if(De=M.mipmaps,Z&&Te){De.length>0&&Ce++;let _e=Ne(Ee[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,Je,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Re){Z?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ee[_e].width,Ee[_e].height,Ue,Ge,Ee[_e].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Je,Ee[_e].width,Ee[_e].height,0,Ue,Ge,Ee[_e].data);for(let Ve=0;Ve<De.length;Ve++){let Lt=De[Ve].image[_e].image;Z?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve+1,0,0,Lt.width,Lt.height,Ue,Ge,Lt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve+1,Je,Lt.width,Lt.height,0,Ue,Ge,Lt.data)}}else{Z?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ue,Ge,Ee[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Je,Ue,Ge,Ee[_e]);for(let Ve=0;Ve<De.length;Ve++){let ze=De[Ve];Z?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve+1,0,0,Ue,Ge,ze.image[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ve+1,Je,Ue,Ge,ze.image[_e])}}}f(M)&&b(n.TEXTURE_CUBE_MAP),xe.__version=ee.version,M.onUpdate&&M.onUpdate(M)}D.__version=M.version}function te(D,M,C,k,ee,xe){let pe=r.convert(C.format,C.colorSpace),se=r.convert(C.type),ue=m(C.internalFormat,pe,se,C.normalized,C.colorSpace),Me=i.get(M),Re=i.get(C);if(Re.__renderTarget=M,!Me.__hasExternalTextures){let Ee=Math.max(1,M.width>>xe),ve=Math.max(1,M.height>>xe);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,xe,ue,Ee,ve,M.depth,0,pe,se,null):t.texImage2D(ee,xe,ue,Ee,ve,0,pe,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),Ke(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,ee,Re.__webglTexture,0,Le(M)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,ee,Re.__webglTexture,xe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function K(D,M,C){if(n.bindRenderbuffer(n.RENDERBUFFER,D),M.depthBuffer){let k=M.depthTexture,ee=k&&k.isDepthTexture?k.type:null,xe=E(M.stencilBuffer,ee),pe=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ke(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le(M),xe,M.width,M.height):C?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le(M),xe,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,xe,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,D)}else{let k=M.textures;for(let ee=0;ee<k.length;ee++){let xe=k[ee],pe=r.convert(xe.format,xe.colorSpace),se=r.convert(xe.type),ue=m(xe.internalFormat,pe,se,xe.normalized,xe.colorSpace);Ke(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le(M),ue,M.width,M.height):C?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le(M),ue,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ue,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function de(D,M,C){let k=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=i.get(M.depthTexture);if(ee.__renderTarget=M,(!ee.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),k){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,M.depthTexture.addEventListener("dispose",w)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),Y(n.TEXTURE_CUBE_MAP,M.depthTexture);let Me=r.convert(M.depthTexture.format),Re=r.convert(M.depthTexture.type),Ee;M.depthTexture.format===Fi?Ee=n.DEPTH_COMPONENT24:M.depthTexture.format===Ms&&(Ee=n.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,Ee,M.width,M.height,0,Me,Re,null)}}else Q(M.depthTexture,0);let xe=ee.__webglTexture,pe=Le(M),se=k?n.TEXTURE_CUBE_MAP_POSITIVE_X+C:n.TEXTURE_2D,ue=M.depthTexture.format===Ms?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===Fi)Ke(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,se,xe,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ue,se,xe,0);else if(M.depthTexture.format===Ms)Ke(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,se,xe,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ue,se,xe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function be(D){let M=i.get(D),C=D.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==D.depthTexture){let k=D.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),k){let ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,k.removeEventListener("dispose",ee)};k.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=k}if(D.depthTexture&&!M.__autoAllocateDepthBuffer)if(C)for(let k=0;k<6;k++)de(M.__webglFramebuffer[k],D,k);else{let k=D.texture.mipmaps;k&&k.length>0?de(M.__webglFramebuffer[0],D,0):de(M.__webglFramebuffer,D,0)}else if(C){M.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[k]),M.__webglDepthbuffer[k]===void 0)M.__webglDepthbuffer[k]=n.createRenderbuffer(),K(M.__webglDepthbuffer[k],D,!1);else{let ee=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=M.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,xe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,xe)}}else{let k=D.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),K(M.__webglDepthbuffer,D,!1);else{let ee=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,xe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,xe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(D,M,C){let k=i.get(D);M!==void 0&&te(k.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),C!==void 0&&be(D)}function me(D){let M=D.texture,C=i.get(D),k=i.get(M);D.addEventListener("dispose",y);let ee=D.textures,xe=D.isWebGLCubeRenderTarget===!0,pe=ee.length>1;if(pe||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=M.version,o.memory.textures++),xe){C.__webglFramebuffer=[];for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0){C.__webglFramebuffer[se]=[];for(let ue=0;ue<M.mipmaps.length;ue++)C.__webglFramebuffer[se][ue]=n.createFramebuffer()}else C.__webglFramebuffer[se]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){C.__webglFramebuffer=[];for(let se=0;se<M.mipmaps.length;se++)C.__webglFramebuffer[se]=n.createFramebuffer()}else C.__webglFramebuffer=n.createFramebuffer();if(pe)for(let se=0,ue=ee.length;se<ue;se++){let Me=i.get(ee[se]);Me.__webglTexture===void 0&&(Me.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Ke(D)===!1){C.__webglMultisampledFramebuffer=n.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let se=0;se<ee.length;se++){let ue=ee[se];C.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,C.__webglColorRenderbuffer[se]);let Me=r.convert(ue.format,ue.colorSpace),Re=r.convert(ue.type),Ee=m(ue.internalFormat,Me,Re,ue.normalized,ue.colorSpace,D.isXRRenderTarget===!0),ve=Le(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Ee,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,C.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(C.__webglDepthRenderbuffer=n.createRenderbuffer(),K(C.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(xe){t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Y(n.TEXTURE_CUBE_MAP,M);for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)te(C.__webglFramebuffer[se][ue],D,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,ue);else te(C.__webglFramebuffer[se],D,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);f(M)&&b(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let se=0,ue=ee.length;se<ue;se++){let Me=ee[se],Re=i.get(Me),Ee=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ee=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Re.__webglTexture),Y(Ee,Me),te(C.__webglFramebuffer,D,Me,n.COLOR_ATTACHMENT0+se,Ee,0),f(Me)&&b(Ee)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(se=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,k.__webglTexture),Y(se,M),M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)te(C.__webglFramebuffer[ue],D,M,n.COLOR_ATTACHMENT0,se,ue);else te(C.__webglFramebuffer,D,M,n.COLOR_ATTACHMENT0,se,0);f(M)&&b(se),t.unbindTexture()}D.depthBuffer&&be(D)}function we(D){let M=D.textures;for(let C=0,k=M.length;C<k;C++){let ee=M[C];if(f(ee)){let xe=_(D),pe=i.get(ee).__webglTexture;t.bindTexture(xe,pe),b(xe),t.unbindTexture()}}}let Se=[],ge=[];function Ae(D){if(D.samples>0){if(Ke(D)===!1){let M=D.textures,C=D.width,k=D.height,ee=n.COLOR_BUFFER_BIT,xe=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(D),se=M.length>1;if(se)for(let Me=0;Me<M.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let ue=D.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let Me=0;Me<M.length;Me++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[Me]);let Re=i.get(M[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Re,0)}n.blitFramebuffer(0,0,C,k,0,0,C,k,ee,n.NEAREST),l===!0&&(Se.length=0,ge.length=0,Se.push(n.COLOR_ATTACHMENT0+Me),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Se.push(xe),ge.push(xe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ge)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Se))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let Me=0;Me<M.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,pe.__webglColorRenderbuffer[Me]);let Re=i.get(M[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,Re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){let M=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Le(D){return Math.min(s.maxSamples,D.samples)}function Ke(D){let M=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function G(D){let M=o.render.frame;u.get(D)!==M&&(u.set(D,M),D.update())}function Ze(D,M){let C=D.colorSpace,k=D.format,ee=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||C!==Ro&&C!==bi&&(at.getTransfer(C)===pt?(k!==ri||ee!==Sn)&&je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",C)),M}function Ne(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=z,this.getTextureUnits=$,this.setTextureUnits=V,this.setTexture2D=Q,this.setTexture2DArray=he,this.setTexture3D=ae,this.setTextureCube=W,this.rebindTextures=oe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=te,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function q1(n,e){function t(i,s=bi){let r,o=at.getTransfer(s);if(i===Sn)return n.UNSIGNED_BYTE;if(i===bc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Oh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===zh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===kh)return n.BYTE;if(i===Bh)return n.SHORT;if(i===Hr)return n.UNSIGNED_SHORT;if(i===vc)return n.INT;if(i===vi)return n.UNSIGNED_INT;if(i===si)return n.FLOAT;if(i===dn)return n.HALF_FLOAT;if(i===Hh)return n.ALPHA;if(i===Gh)return n.RGB;if(i===ri)return n.RGBA;if(i===Fi)return n.DEPTH_COMPONENT;if(i===Ms)return n.DEPTH_STENCIL;if(i===Vr)return n.RED;if(i===Sc)return n.RED_INTEGER;if(i===Ss)return n.RG;if(i===Ec)return n.RG_INTEGER;if(i===wc)return n.RGBA_INTEGER;if(i===ga||i===xa||i===ya||i===_a)if(o===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===_a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Tc||i===Cc||i===Ac||i===Rc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Rc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fc||i===Ic||i===Pc||i===Dc||i===Lc||i===va||i===Nc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fc||i===Ic)return o===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Pc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Dc)return r.COMPRESSED_R11_EAC;if(i===Lc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===va)return r.COMPRESSED_RG11_EAC;if(i===Nc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Uc||i===kc||i===Bc||i===Oc||i===zc||i===Hc||i===Gc||i===Vc||i===Wc||i===qc||i===Xc||i===$c||i===Yc||i===Zc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Uc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Gc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$c)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jc||i===Kc||i===jc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Jc)return o===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qc||i===eu||i===ba||i===tu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Qc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===eu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}function Z1(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,qh(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,b,_,m){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),u(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&g(p,f,m)):f.isMeshMatcapMaterial?(r(p,f),v(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),S(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,b,_):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Xt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Xt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let b=e.get(f),_=b.envMap,m=b.envMapRotation;_&&(p.envMap.value=_,p.envMapRotation.value.setFromMatrix4(Y1.makeRotationFromEuler(m)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(xm),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,b,_){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*b,p.scale.value=_*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function g(p,f,b){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Xt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,f){f.matcap&&(p.matcap.value=f.matcap)}function S(p,f){let b=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function J1(n,e,t,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,E){let x=E.program;i.uniformBlockBinding(m,x)}function c(m,E){let x=s[m.id];x===void 0&&(p(m),x=u(m),s[m.id]=x,m.addEventListener("dispose",b));let w=E.program;i.updateUBOMapping(m,w);let y=e.render.frame;r[m.id]!==y&&(h(m),r[m.id]=y)}function u(m){let E=d();m.__bindingPointIndex=E;let x=n.createBuffer(),w=m.__size,y=m.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,w,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,x),x}function d(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(m){let E=s[m.id],x=m.uniforms,w=m.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let y=0,T=x.length;y<T;y++){let I=x[y];if(Array.isArray(I))for(let P=0,L=I.length;P<L;P++)g(I[P],y,P,w);else g(I,y,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(m,E,x,w){if(S(m,E,x,w)===!0){let y=m.__offset,T=m.value;if(Array.isArray(T)){let I=0;for(let P=0;P<T.length;P++){let L=T[P],z=f(L);v(L,m.__data,I),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(I+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(T,m.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,m.__data)}}function v(m,E,x){typeof m=="number"||typeof m=="boolean"?E[0]=m:m.isMatrix3?(E[0]=m.elements[0],E[1]=m.elements[1],E[2]=m.elements[2],E[3]=0,E[4]=m.elements[3],E[5]=m.elements[4],E[6]=m.elements[5],E[7]=0,E[8]=m.elements[6],E[9]=m.elements[7],E[10]=m.elements[8],E[11]=0):ArrayBuffer.isView(m)?E.set(new m.constructor(m.buffer,m.byteOffset,E.length)):m.toArray(E,x)}function S(m,E,x,w){let y=m.value,T=E+"_"+x;if(w[T]===void 0)return typeof y=="number"||typeof y=="boolean"?w[T]=y:ArrayBuffer.isView(y)?w[T]=y.slice():w[T]=y.clone(),!0;{let I=w[T];if(typeof y=="number"||typeof y=="boolean"){if(I!==y)return w[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(I.equals(y)===!1)return I.copy(y),!0}}return!1}function p(m){let E=m.uniforms,x=0,w=16;for(let T=0,I=E.length;T<I;T++){let P=Array.isArray(E[T])?E[T]:[E[T]];for(let L=0,z=P.length;L<z;L++){let $=P[L],V=Array.isArray($.value)?$.value:[$.value];for(let X=0,B=V.length;X<B;X++){let Q=V[X],he=f(Q),ae=x%w,W=ae%he.boundary,ne=ae+W;x+=W,ne!==0&&w-ne<he.storage&&(x+=w-ne),$.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=x,x+=he.storage}}}let y=x%w;return y>0&&(x+=w-y),m.__size=x,m.__cache={},this}function f(m){let E={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(E.boundary=4,E.storage=4):m.isVector2?(E.boundary=8,E.storage=8):m.isVector3||m.isColor?(E.boundary=16,E.storage=12):m.isVector4?(E.boundary=16,E.storage=16):m.isMatrix3?(E.boundary=48,E.storage=48):m.isMatrix4?(E.boundary=64,E.storage=64):m.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(E.boundary=16,E.storage=m.byteLength):je("WebGLRenderer: Unsupported uniform value type.",m),E}function b(m){let E=m.target;E.removeEventListener("dispose",b);let x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function _(){for(let m in s)n.deleteBuffer(s[m]);o=[],s={},r={}}return{bind:l,update:c,dispose:_}}function j1(){return Ui===null&&(Ui=new Vs(K1,16,16,Ss,dn),Ui.name="DFG_LUT",Ui.minFilter=wt,Ui.magFilter=wt,Ui.wrapS=jt,Ui.wrapT=jt,Ui.generateMipmaps=!1,Ui.needsUpdate=!0),Ui}var fy,py,my,gy,xy,yy,_y,vy,by,My,Sy,Ey,wy,Ty,Cy,Ay,Ry,Fy,Iy,Py,Dy,Ly,Ny,Uy,ky,By,Oy,zy,Hy,Gy,Vy,Wy,qy,Xy,$y,Yy,Zy,Jy,Ky,jy,Qy,e_,t_,n_,i_,s_,r_,o_,a_,l_,c_,u_,h_,d_,f_,p_,m_,g_,x_,y_,__,v_,b_,M_,S_,E_,w_,T_,C_,A_,R_,F_,I_,P_,D_,L_,N_,U_,k_,B_,O_,z_,H_,G_,V_,W_,q_,X_,$_,Y_,Z_,J_,K_,j_,Q_,ev,tv,nv,iv,sv,rv,ov,av,lv,cv,uv,hv,dv,fv,pv,mv,gv,xv,yv,_v,vv,bv,Mv,Sv,Ev,wv,Tv,Cv,Av,Rv,Fv,Iv,Pv,Dv,Lv,Nv,Uv,kv,Bv,Ov,zv,Hv,Gv,Vv,Wv,qv,Xv,it,Fe,ki,su,$v,dm,Es,Vp,js,Qv,Sa,Wp,Jh,Kh,jh,Qh,eb,ws,ou,hb,fm,nd,pm,mm,gm,Yp,Zp,Jp,Kp,jp,id,sd,rd,ed,qr,e1,t1,tm,r1,ru,h1,d1,p1,g1,y1,v1,M1,T1,ad,ld,L1,B1,O1,z1,H1,um,Ea,td,X1,$1,cd,ud,Y1,xm,K1,Ui,Xr,$t=Kn(()=>{Zh();Zh();fy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,py=`#ifdef USE_ALPHAHASH
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
#endif`,my=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_y=`#ifdef USE_AOMAP
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
#endif`,vy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,by=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,My=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ey=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ty=`#ifdef USE_IRIDESCENCE
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
#endif`,Cy=`#ifdef USE_BUMPMAP
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
#endif`,Ay=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ry=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Iy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Py=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ly=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ny=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Uy=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,ky=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,By=`vec3 transformedNormal = objectNormal;
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
#endif`,Oy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Xy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,$y=`#ifdef USE_ENVMAP
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
#endif`,Yy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ky=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,e_=`#ifdef USE_GRADIENTMAP
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
}`,t_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,n_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,i_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,s_=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif
#include <lightprobes_pars_fragment>`,r_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
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
#endif`,o_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,a_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,l_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,c_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,h_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,d_=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,f_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,p_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,m_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,g_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,__=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,b_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,S_=`#if defined( USE_POINTS_UV )
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
#endif`,E_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,w_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,A_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R_=`#ifdef USE_MORPHTARGETS
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
#endif`,F_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,P_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,D_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,U_=`#ifdef USE_NORMALMAP
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
#endif`,k_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,O_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,z_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,V_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,W_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,X_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,J_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,j_=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,Q_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ev=`#ifdef USE_SKINNING
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
#endif`,tv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nv=`#ifdef USE_SKINNING
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
#endif`,iv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ov=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,av=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lv=`#ifdef USE_TRANSMISSION
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
#endif`,cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pv=`uniform sampler2D t2D;
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
}`,mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_v=`#include <common>
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
}`,vv=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bv=`#define DISTANCE
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
}`,Mv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ev=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wv=`uniform float scale;
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
}`,Tv=`uniform vec3 diffuse;
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
}`,Cv=`#include <common>
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
}`,Av=`uniform vec3 diffuse;
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
}`,Rv=`#define LAMBERT
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
}`,Fv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Iv=`#define MATCAP
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
}`,Pv=`#define MATCAP
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
}`,Dv=`#define NORMAL
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
}`,Lv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nv=`#define PHONG
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
}`,Uv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,kv=`#define STANDARD
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
}`,Bv=`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Ov=`#define TOON
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
}`,zv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,Hv=`uniform float size;
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
}`,Gv=`uniform vec3 diffuse;
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
}`,Vv=`#include <common>
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
}`,Wv=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,qv=`uniform float rotation;
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
}`,Xv=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:fy,alphahash_pars_fragment:py,alphamap_fragment:my,alphamap_pars_fragment:gy,alphatest_fragment:xy,alphatest_pars_fragment:yy,aomap_fragment:_y,aomap_pars_fragment:vy,batching_pars_vertex:by,batching_vertex:My,begin_vertex:Sy,beginnormal_vertex:Ey,bsdfs:wy,iridescence_fragment:Ty,bumpmap_pars_fragment:Cy,clipping_planes_fragment:Ay,clipping_planes_pars_fragment:Ry,clipping_planes_pars_vertex:Fy,clipping_planes_vertex:Iy,color_fragment:Py,color_pars_fragment:Dy,color_pars_vertex:Ly,color_vertex:Ny,common:Uy,cube_uv_reflection_fragment:ky,defaultnormal_vertex:By,displacementmap_pars_vertex:Oy,displacementmap_vertex:zy,emissivemap_fragment:Hy,emissivemap_pars_fragment:Gy,colorspace_fragment:Vy,colorspace_pars_fragment:Wy,envmap_fragment:qy,envmap_common_pars_fragment:Xy,envmap_pars_fragment:$y,envmap_pars_vertex:Yy,envmap_physical_pars_fragment:r_,envmap_vertex:Zy,fog_vertex:Jy,fog_pars_vertex:Ky,fog_fragment:jy,fog_pars_fragment:Qy,gradientmap_pars_fragment:e_,lightmap_pars_fragment:t_,lights_lambert_fragment:n_,lights_lambert_pars_fragment:i_,lights_pars_begin:s_,lights_toon_fragment:o_,lights_toon_pars_fragment:a_,lights_phong_fragment:l_,lights_phong_pars_fragment:c_,lights_physical_fragment:u_,lights_physical_pars_fragment:h_,lights_fragment_begin:d_,lights_fragment_maps:f_,lights_fragment_end:p_,lightprobes_pars_fragment:m_,logdepthbuf_fragment:g_,logdepthbuf_pars_fragment:x_,logdepthbuf_pars_vertex:y_,logdepthbuf_vertex:__,map_fragment:v_,map_pars_fragment:b_,map_particle_fragment:M_,map_particle_pars_fragment:S_,metalnessmap_fragment:E_,metalnessmap_pars_fragment:w_,morphinstance_vertex:T_,morphcolor_vertex:C_,morphnormal_vertex:A_,morphtarget_pars_vertex:R_,morphtarget_vertex:F_,normal_fragment_begin:I_,normal_fragment_maps:P_,normal_pars_fragment:D_,normal_pars_vertex:L_,normal_vertex:N_,normalmap_pars_fragment:U_,clearcoat_normal_fragment_begin:k_,clearcoat_normal_fragment_maps:B_,clearcoat_pars_fragment:O_,iridescence_pars_fragment:z_,opaque_fragment:H_,packing:G_,premultiplied_alpha_fragment:V_,project_vertex:W_,dithering_fragment:q_,dithering_pars_fragment:X_,roughnessmap_fragment:$_,roughnessmap_pars_fragment:Y_,shadowmap_pars_fragment:Z_,shadowmap_pars_vertex:J_,shadowmap_vertex:K_,shadowmask_pars_fragment:j_,skinbase_vertex:Q_,skinning_pars_vertex:ev,skinning_vertex:tv,skinnormal_vertex:nv,specularmap_fragment:iv,specularmap_pars_fragment:sv,tonemapping_fragment:rv,tonemapping_pars_fragment:ov,transmission_fragment:av,transmission_pars_fragment:lv,uv_pars_fragment:cv,uv_pars_vertex:uv,uv_vertex:hv,worldpos_vertex:dv,background_vert:fv,background_frag:pv,backgroundCube_vert:mv,backgroundCube_frag:gv,cube_vert:xv,cube_frag:yv,depth_vert:_v,depth_frag:vv,distance_vert:bv,distance_frag:Mv,equirect_vert:Sv,equirect_frag:Ev,linedashed_vert:wv,linedashed_frag:Tv,meshbasic_vert:Cv,meshbasic_frag:Av,meshlambert_vert:Rv,meshlambert_frag:Fv,meshmatcap_vert:Iv,meshmatcap_frag:Pv,meshnormal_vert:Dv,meshnormal_frag:Lv,meshphong_vert:Nv,meshphong_frag:Uv,meshphysical_vert:kv,meshphysical_frag:Bv,meshtoon_vert:Ov,meshtoon_frag:zv,points_vert:Hv,points_frag:Gv,shadow_vert:Vv,shadow_frag:Wv,sprite_vert:qv,sprite_frag:Xv},Fe={common:{diffuse:{value:new le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new le(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},ki={basic:{uniforms:En([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:En([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new le(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:En([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:En([Fe.common,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.roughnessmap,Fe.metalnessmap,Fe.fog,Fe.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:En([Fe.common,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.gradientmap,Fe.fog,Fe.lights,{emissive:{value:new le(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:En([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:En([Fe.points,Fe.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:En([Fe.common,Fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:En([Fe.common,Fe.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:En([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:En([Fe.sprite,Fe.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:En([Fe.common,Fe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:En([Fe.lights,Fe.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};ki.physical={uniforms:En([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new le(0)},specularColor:{value:new le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};su={r:0,b:0,g:0},$v=new ht,dm=new tt;dm.set(-1,0,0,0,1,0,0,0,1);Es=4,Vp=[.125,.215,.35,.446,.526,.582],js=20,Qv=256,Sa=new _s,Wp=new le,Jh=null,Kh=0,jh=0,Qh=!1,eb=new N,ws=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=eb}=r;Jh=this._renderer.getRenderTarget(),Kh=this._renderer.getActiveCubeFace(),jh=this._renderer.getActiveMipmapLevel(),Qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$p(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Jh,Kh,jh),this._renderer.xr.enabled=Qh,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vs||e.mapping===Js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jh=this._renderer.getRenderTarget(),Kh=this._renderer.getActiveCubeFace(),jh=this._renderer.getActiveMipmapLevel(),Qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:dn,format:ri,colorSpace:Ro,depthBuffer:!1},s=qp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qp(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tb(r)),this._blurMaterial=ib(r,e,t),this._ggxMaterial=nb(r,e,t)}return s}_compileMaterial(e){let t=new Xe(new dt,e);this._renderer.compile(t,Sa)}_sceneToCubeUV(e,t,i,s,r){let l=new nn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,g=d.toneMapping;d.getClearColor(Wp),d.toneMapping=_i,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xe(new ti,new Ot({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,p=S.material,f=!1,b=e.background;b?b.isColor&&(p.color.copy(b),e.background=null,f=!0):(p.color.copy(Wp),f=!0);for(let _=0;_<6;_++){let m=_%3;m===0?(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[_],r.y,r.z)):m===1?(l.up.set(0,0,c[_]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[_],r.z)):(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[_]));let E=this._cubeSize;Wr(s,m*E,_>2?E:0,E,E),d.setRenderTarget(s),f&&d.render(S,l),d.render(e,l)}d.toneMapping=g,d.autoClear=h,e.background=b}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===vs||e.mapping===Js;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$p()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Wr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Sa)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,g=d*h,{_lodMax:v}=this,S=this._sizeLods[i],p=3*S*(i>v-Es?i-v+Es:0),f=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-t,Wr(r,p,f,3*S,2*S),s.setRenderTarget(r),s.render(a,Sa),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-i,Wr(e,p,f,3*S,2*S),s.setRenderTarget(e),s.render(a,Sa)}_blur(e,t,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[s];d.material=c;let h=c.uniforms,g=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*js-1),S=r/v,p=isFinite(r)?1+Math.floor(u*S):js;p>js&&je(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${js}`);let f=[],b=0;for(let w=0;w<js;++w){let y=w/S,T=Math.exp(-y*y/2);f.push(T),w===0?b+=T:w<p&&(b+=2*T)}for(let w=0;w<f.length;w++)f[w]=f[w]/b;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:_}=this;h.dTheta.value=v,h.mipInt.value=_-i;let m=this._sizeLods[s],E=3*m*(s>_-Es?s-_+Es:0),x=4*(this._cubeSize-m);Wr(t,E,x,3*m,2*m),l.setRenderTarget(t),l.render(d,Sa)}};ou=class extends qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Ho(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ti(5,5,5),r=new ut({name:"CubemapFromEquirect",uniforms:Ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:ii});r.uniforms.tEquirect.value=t;let o=new Xe(s,r),a=t.minFilter;return t.minFilter===bs&&(t.minFilter=wt),new fc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}};hb={[la]:"LINEAR_TONE_MAPPING",[ca]:"REINHARD_TONE_MAPPING",[ua]:"CINEON_TONE_MAPPING",[ts]:"ACES_FILMIC_TONE_MAPPING",[da]:"AGX_TONE_MAPPING",[fa]:"NEUTRAL_TONE_MAPPING",[ha]:"CUSTOM_TONE_MAPPING"};fm=new Tn,nd=new Qi(1,1),pm=new Do,mm=new Xl,gm=new Ho,Yp=[],Zp=[],Jp=new Float32Array(16),Kp=new Float32Array(9),jp=new Float32Array(4);id=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Pb(t.type)}},sd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jb(t.type)}},rd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},ed=/(\w+)(\])?(\[|\.)?/g;qr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Qb(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};e1=37297,t1=0;tm=new tt;r1={[la]:"Linear",[ca]:"Reinhard",[ua]:"Cineon",[ts]:"ACESFilmic",[da]:"AgX",[fa]:"Neutral",[ha]:"Custom"};ru=new N;h1=/^[ \t]*#include +<([\w\d./]+)>/gm;d1=new Map;p1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;g1={[oa]:"SHADOWMAP_TYPE_PCF",[zr]:"SHADOWMAP_TYPE_VSM"};y1={[vs]:"ENVMAP_TYPE_CUBE",[Js]:"ENVMAP_TYPE_CUBE",[pa]:"ENVMAP_TYPE_CUBE_UV"};v1={[Js]:"ENVMAP_MODE_REFRACTION"};M1={[gc]:"ENVMAP_BLENDING_MULTIPLY",[bp]:"ENVMAP_BLENDING_MIX",[Mp]:"ENVMAP_BLENDING_ADD"};T1=0,ad=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new ld(e),t.set(e,i)),i}},ld=class{constructor(e){this.id=T1++,this.code=e,this.usedTimes=0}};L1=0;B1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,z1=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],H1=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],um=new ht,Ea=new N,td=new N;X1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$1=`
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

}`,cd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Go(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ut({vertexShader:X1,fragmentShader:$1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Xe(new ni(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ud=class extends Ii{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,g=null,v=null,S=typeof XRWebGLBinding<"u",p=new cd,f={},b=t.getContextAttributes(),_=null,m=null,E=[],x=[],w=new ye,y=null,T=new nn;T.viewport=new It;let I=new nn;I.viewport=new It;let P=[T,I],L=new pc,z=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(A){let U=E[A];return U===void 0&&(U=new Ir,E[A]=U),U.getTargetRaySpace()},this.getControllerGrip=function(A){let U=E[A];return U===void 0&&(U=new Ir,E[A]=U),U.getGripSpace()},this.getHand=function(A){let U=E[A];return U===void 0&&(U=new Ir,E[A]=U),U.getHandSpace()};function V(A){let U=x.indexOf(A.inputSource);if(U===-1)return;let O=E[U];O!==void 0&&(O.update(A.inputSource,A.frame,c||o),O.dispatchEvent({type:A.type,data:A.inputSource}))}function X(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",B);for(let A=0;A<E.length;A++){let U=x[A];U!==null&&(x[A]=null,E[A].disconnect(U))}z=null,$=null,p.reset();for(let A in f)delete f[A];e.setRenderTarget(_),g=null,h=null,d=null,s=null,m=null,Y.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(A){r=A,i.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(A){a=A,i.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(A){c=A},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(A){if(s=A,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",X),s.addEventListener("inputsourceschange",B),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(w),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let O=null,q=null,H=null;b.depth&&(H=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,O=b.stencil?Ms:Fi,q=b.stencil?Gr:vi);let te={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(te),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),m=new qt(h.textureWidth,h.textureHeight,{format:ri,type:Sn,depthTexture:new Qi(h.textureWidth,h.textureHeight,q,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let O={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,O),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),m=new qt(g.framebufferWidth,g.framebufferHeight,{format:ri,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Y.setContext(s),Y.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function B(A){for(let U=0;U<A.removed.length;U++){let O=A.removed[U],q=x.indexOf(O);q>=0&&(x[q]=null,E[q].disconnect(O))}for(let U=0;U<A.added.length;U++){let O=A.added[U],q=x.indexOf(O);if(q===-1){for(let te=0;te<E.length;te++)if(te>=x.length){x.push(O),q=te;break}else if(x[te]===null){x[te]=O,q=te;break}if(q===-1)break}let H=E[q];H&&H.connect(O)}}let Q=new N,he=new N;function ae(A,U,O){Q.setFromMatrixPosition(U.matrixWorld),he.setFromMatrixPosition(O.matrixWorld);let q=Q.distanceTo(he),H=U.projectionMatrix.elements,te=O.projectionMatrix.elements,K=H[14]/(H[10]-1),de=H[14]/(H[10]+1),be=(H[9]+1)/H[5],oe=(H[9]-1)/H[5],me=(H[8]-1)/H[0],we=(te[8]+1)/te[0],Se=K*me,ge=K*we,Ae=q/(-me+we),Le=Ae*-me;if(U.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Le),A.translateZ(Ae),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),H[10]===-1)A.projectionMatrix.copy(U.projectionMatrix),A.projectionMatrixInverse.copy(U.projectionMatrixInverse);else{let Ke=K+Ae,G=de+Ae,Ze=Se-Le,Ne=ge+(q-Le),D=be*de/G*Ke,M=oe*de/G*Ke;A.projectionMatrix.makePerspective(Ze,Ne,D,M,Ke,G),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}}function W(A,U){U===null?A.matrixWorld.copy(A.matrix):A.matrixWorld.multiplyMatrices(U.matrixWorld,A.matrix),A.matrixWorldInverse.copy(A.matrixWorld).invert()}this.updateCamera=function(A){if(s===null)return;let U=A.near,O=A.far;p.texture!==null&&(p.depthNear>0&&(U=p.depthNear),p.depthFar>0&&(O=p.depthFar)),L.near=I.near=T.near=U,L.far=I.far=T.far=O,(z!==L.near||$!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),z=L.near,$=L.far),L.layers.mask=A.layers.mask|6,T.layers.mask=L.layers.mask&-5,I.layers.mask=L.layers.mask&-3;let q=A.parent,H=L.cameras;W(L,q);for(let te=0;te<H.length;te++)W(H[te],q);H.length===2?ae(L,T,I):L.projectionMatrix.copy(T.projectionMatrix),ne(A,L,q)};function ne(A,U,O){O===null?A.matrix.copy(U.matrixWorld):(A.matrix.copy(O.matrixWorld),A.matrix.invert(),A.matrix.multiply(U.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(U.projectionMatrix),A.projectionMatrixInverse.copy(U.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=Vl*2*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&g===null))return l},this.setFoveation=function(A){l=A,h!==null&&(h.fixedFoveation=A),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=A)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(A){return f[A]};let F=null;function J(A,U){if(u=U.getViewerPose(c||o),v=U,u!==null){let O=u.views;g!==null&&(e.setRenderTargetFramebuffer(m,g.framebuffer),e.setRenderTarget(m));let q=!1;O.length!==L.cameras.length&&(L.cameras.length=0,q=!0);for(let de=0;de<O.length;de++){let be=O[de],oe=null;if(g!==null)oe=g.getViewport(be);else{let we=d.getViewSubImage(h,be);oe=we.viewport,de===0&&(e.setRenderTargetTextures(m,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(m))}let me=P[de];me===void 0&&(me=new nn,me.layers.enable(de),me.viewport=new It,P[de]=me),me.matrix.fromArray(be.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(be.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(oe.x,oe.y,oe.width,oe.height),de===0&&(L.matrix.copy(me.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),q===!0&&L.cameras.push(me)}let H=s.enabledFeatures;if(H&&H.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=i.getBinding();let de=d.getDepthInformation(O[0]);de&&de.isValid&&de.texture&&p.init(de,s.renderState)}if(H&&H.includes("camera-access")&&S){e.state.unbindTexture(),d=i.getBinding();for(let de=0;de<O.length;de++){let be=O[de].camera;if(be){let oe=f[be];oe||(oe=new Go,f[be]=oe);let me=d.getCameraImage(be);oe.sourceTexture=me}}}}for(let O=0;O<E.length;O++){let q=x[O],H=E[O];q!==null&&H!==void 0&&H.update(q,U,c||o)}F&&F(A,U),U.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:U}),v=null}let Y=new hm;Y.setAnimationLoop(J),this.setAnimationLoop=function(A){F=A},this.dispose=function(){}}},Y1=new ht,xm=new tt;xm.set(-1,0,0,0,1,0,0,0,1);K1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ui=null;Xr=class{constructor(e={}){let{canvas:t=Pp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:g=Sn}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=o;let S=g,p=new Set([wc,Ec,Sc]),f=new Set([Sn,vi,Hr,Gr,bc,Mc]),b=new Uint32Array(4),_=new Int32Array(4),m=new N,E=null,x=null,w=[],y=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,P=!1,L=null,z=null,$=null,V=null;this._outputColorSpace=Kt;let X=0,B=0,Q=null,he=-1,ae=null,W=new It,ne=new It,F=null,J=new le(0),Y=0,A=t.width,U=t.height,O=1,q=null,H=null,te=new It(0,0,A,U),K=new It(0,0,A,U),de=!1,be=new Pr,oe=!1,me=!1,we=new ht,Se=new N,ge=new It,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Le=!1;function Ke(){return Q===null?O:1}let G=i;function Ze(R,j){return t.getContext(R,j)}try{let R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Lt,!1),t.addEventListener("webglcontextrestored",St,!1),t.addEventListener("webglcontextcreationerror",Ei,!1),G===null){let j="webgl2";if(G=Ze(j,R),G===null)throw Ze(j)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw Qe("WebGLRenderer: "+R.message),R}let Ne,D,M,C,k,ee,xe,pe,se,ue,Me,Re,Ee,ve,Ue,Ge,Je,Z,Te,fe,Ce,De,_e;function Ve(){Ne=new rb(G),Ne.init(),Ce=new q1(G,Ne),D=new Kv(G,Ne,e,Ce),M=new V1(G,Ne),D.reversedDepthBuffer&&h&&M.buffers.depth.setReversed(!0),z=G.createFramebuffer(),$=G.createFramebuffer(),V=G.createFramebuffer(),C=new lb(G),k=new R1,ee=new W1(G,Ne,M,k,D,Ce,C),xe=new sb(I),pe=new dy(G),De=new Zv(G,pe),se=new ob(G,pe,C,De),ue=new ub(G,se,pe,De,C),Z=new cb(G,D,ee),Ue=new jv(k),Me=new A1(I,xe,Ne,D,De,Ue),Re=new Z1(I,k),Ee=new I1,ve=new k1(Ne),Je=new Yv(I,xe,M,ue,v,l),Ge=new G1(I,ue,D),_e=new J1(G,C,D,M),Te=new Jv(G,Ne,C),fe=new ab(G,Ne,C),C.programs=Me.programs,I.capabilities=D,I.extensions=Ne,I.properties=k,I.renderLists=Ee,I.shadowMap=Ge,I.state=M,I.info=C}Ve(),S!==Sn&&(T=new db(S,t.width,t.height,a,s,r));let ze=new ud(I,G);this.xr=ze,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let R=Ne.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Ne.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(R){R!==void 0&&(O=R,this.setSize(A,U,!1))},this.getSize=function(R){return R.set(A,U)},this.setSize=function(R,j,ce=!0){if(ze.isPresenting){je("WebGLRenderer: Can't change size while VR device is presenting.");return}A=R,U=j,t.width=Math.floor(R*O),t.height=Math.floor(j*O),ce===!0&&(t.style.width=R+"px",t.style.height=j+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(A*O,U*O).floor()},this.setDrawingBufferSize=function(R,j,ce){A=R,U=j,O=ce,t.width=Math.floor(R*ce),t.height=Math.floor(j*ce),this.setViewport(0,0,R,j)},this.setEffects=function(R){if(S===Sn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let j=0;j<R.length;j++)if(R[j].isOutputPass===!0){je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(W)},this.getViewport=function(R){return R.copy(te)},this.setViewport=function(R,j,ce,ie){R.isVector4?te.set(R.x,R.y,R.z,R.w):te.set(R,j,ce,ie),M.viewport(W.copy(te).multiplyScalar(O).round())},this.getScissor=function(R){return R.copy(K)},this.setScissor=function(R,j,ce,ie){R.isVector4?K.set(R.x,R.y,R.z,R.w):K.set(R,j,ce,ie),M.scissor(ne.copy(K).multiplyScalar(O).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(R){M.setScissorTest(de=R)},this.setOpaqueSort=function(R){q=R},this.setTransparentSort=function(R){H=R},this.getClearColor=function(R){return R.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(R=!0,j=!0,ce=!0){let ie=0;if(R){let re=!1;if(Q!==null){let Pe=Q.texture.format;re=p.has(Pe)}if(re){let Pe=Q.texture.type,Be=f.has(Pe),Ie=Je.getClearColor(),He=Je.getClearAlpha(),We=Ie.r,nt=Ie.g,rt=Ie.b;Be?(b[0]=We,b[1]=nt,b[2]=rt,b[3]=He,G.clearBufferuiv(G.COLOR,0,b)):(_[0]=We,_[1]=nt,_[2]=rt,_[3]=He,G.clearBufferiv(G.COLOR,0,_))}else ie|=G.COLOR_BUFFER_BIT}j&&(ie|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ce&&(ie|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie!==0&&G.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),L=R},this.dispose=function(){t.removeEventListener("webglcontextlost",Lt,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",Ei,!1),Je.dispose(),Ee.dispose(),ve.dispose(),k.dispose(),xe.dispose(),ue.dispose(),De.dispose(),_e.dispose(),Me.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",gf),ze.removeEventListener("sessionend",xf),Ls.stop()};function Lt(R){R.preventDefault(),Po("WebGLRenderer: Context Lost."),P=!0}function St(){Po("WebGLRenderer: Context Restored."),P=!1;let R=C.autoReset,j=Ge.enabled,ce=Ge.autoUpdate,ie=Ge.needsUpdate,re=Ge.type;Ve(),C.autoReset=R,Ge.enabled=j,Ge.autoUpdate=ce,Ge.needsUpdate=ie,Ge.type=re}function Ei(R){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function wi(R){let j=R.target;j.removeEventListener("dispose",wi),Kg(j)}function Kg(R){jg(R),k.remove(R)}function jg(R){let j=k.get(R).programs;j!==void 0&&(j.forEach(function(ce){Me.releaseProgram(ce)}),R.isShaderMaterial&&Me.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,ce,ie,re,Pe){j===null&&(j=Ae);let Be=re.isMesh&&re.matrixWorld.determinantAffine()<0,Ie=tx(R,j,ce,ie,re);M.setMaterial(ie,Be);let He=ce.index,We=1;if(ie.wireframe===!0){if(He=se.getWireframeAttribute(ce),He===void 0)return;We=2}let nt=ce.drawRange,rt=ce.attributes.position,qe=nt.start*We,xt=(nt.start+nt.count)*We;Pe!==null&&(qe=Math.max(qe,Pe.start*We),xt=Math.min(xt,(Pe.start+Pe.count)*We)),He!==null?(qe=Math.max(qe,0),xt=Math.min(xt,He.count)):rt!=null&&(qe=Math.max(qe,0),xt=Math.min(xt,rt.count));let Vt=xt-qe;if(Vt<0||Vt===1/0)return;De.setup(re,ie,Ie,ce,He);let Nt,bt=Te;if(He!==null&&(Nt=pe.get(He),bt=fe,bt.setIndex(Nt)),re.isMesh)ie.wireframe===!0?(M.setLineWidth(ie.wireframeLinewidth*Ke()),bt.setMode(G.LINES)):bt.setMode(G.TRIANGLES);else if(re.isLine){let vn=ie.linewidth;vn===void 0&&(vn=1),M.setLineWidth(vn*Ke()),re.isLineSegments?bt.setMode(G.LINES):re.isLineLoop?bt.setMode(G.LINE_LOOP):bt.setMode(G.LINE_STRIP)}else re.isPoints?bt.setMode(G.POINTS):re.isSprite&&bt.setMode(G.TRIANGLES);if(re.isBatchedMesh)if(Ne.get("WEBGL_multi_draw"))bt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{let vn=re._multiDrawStarts,ke=re._multiDrawCounts,zn=re._multiDrawCount,ft=He?pe.get(He).bytesPerElement:1,Jn=k.get(ie).currentProgram.getUniforms();for(let Ti=0;Ti<zn;Ti++)Jn.setValue(G,"_gl_DrawID",Ti),bt.render(vn[Ti]/ft,ke[Ti])}else if(re.isInstancedMesh)bt.renderInstances(qe,Vt,re.count);else if(ce.isInstancedBufferGeometry){let vn=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,ke=Math.min(ce.instanceCount,vn);bt.renderInstances(qe,Vt,ke)}else bt.render(qe,Vt)};function mf(R,j,ce){R.transparent===!0&&R.side===Ct&&R.forceSinglePass===!1?(R.side=Xt,R.needsUpdate=!0,tl(R,j,ce),R.side=gi,R.needsUpdate=!0,tl(R,j,ce),R.side=Ct):tl(R,j,ce)}this.compile=function(R,j,ce=null){ce===null&&(ce=R),x=ve.get(ce),x.init(j),y.push(x),ce.traverseVisible(function(re){re.isLight&&re.layers.test(j.layers)&&(x.pushLight(re),re.castShadow&&x.pushShadow(re))}),R!==ce&&R.traverseVisible(function(re){re.isLight&&re.layers.test(j.layers)&&(x.pushLight(re),re.castShadow&&x.pushShadow(re))}),x.setupLights();let ie=new Set;return R.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;let Pe=re.material;if(Pe)if(Array.isArray(Pe))for(let Be=0;Be<Pe.length;Be++){let Ie=Pe[Be];mf(Ie,ce,re),ie.add(Ie)}else mf(Pe,ce,re),ie.add(Pe)}),x=y.pop(),ie},this.compileAsync=function(R,j,ce=null){let ie=this.compile(R,j,ce);return new Promise(re=>{function Pe(){if(ie.forEach(function(Be){k.get(Be).currentProgram.isReady()&&ie.delete(Be)}),ie.size===0){re(R);return}setTimeout(Pe,10)}Ne.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let Vu=null;function Qg(R){Vu&&Vu(R)}function gf(){Ls.stop()}function xf(){Ls.start()}let Ls=new hm;Ls.setAnimationLoop(Qg),typeof self<"u"&&Ls.setContext(self),this.setAnimationLoop=function(R){Vu=R,ze.setAnimationLoop(R),R===null?Ls.stop():Ls.start()},ze.addEventListener("sessionstart",gf),ze.addEventListener("sessionend",xf),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(R,j);let ce=ze.enabled===!0&&ze.isPresenting===!0,ie=T!==null&&(Q===null||ce)&&T.begin(I,Q);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(j),j=ze.getCamera()),R.isScene===!0&&R.onBeforeRender(I,R,j,Q),x=ve.get(R,y.length),x.init(j),x.state.textureUnits=ee.getTextureUnits(),y.push(x),we.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),be.setFromProjectionMatrix(we,mi,j.reversedDepth),me=this.localClippingEnabled,oe=Ue.init(this.clippingPlanes,me),E=Ee.get(R,w.length),E.init(),w.push(E),ze.enabled===!0&&ze.isPresenting===!0){let Be=I.xr.getDepthSensingMesh();Be!==null&&Wu(Be,j,-1/0,I.sortObjects)}Wu(R,j,0,I.sortObjects),E.finish(),I.sortObjects===!0&&E.sort(q,H,j.reversedDepth),Le=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,Le&&Je.addToRenderList(E,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&Ue.beginShadows();let re=x.state.shadowsArray;if(Ge.render(re,R,j),oe===!0&&Ue.endShadows(),(ie&&T.hasRenderPass())===!1){let Be=E.opaque,Ie=E.transmissive;if(x.setupLights(),j.isArrayCamera){let He=j.cameras;if(Ie.length>0)for(let We=0,nt=He.length;We<nt;We++){let rt=He[We];_f(Be,Ie,R,rt)}Le&&Je.render(R);for(let We=0,nt=He.length;We<nt;We++){let rt=He[We];yf(E,R,rt,rt.viewport)}}else Ie.length>0&&_f(Be,Ie,R,j),Le&&Je.render(R),yf(E,R,j)}Q!==null&&B===0&&(ee.updateMultisampleRenderTarget(Q),ee.updateRenderTargetMipmap(Q)),ie&&T.end(I),R.isScene===!0&&R.onAfterRender(I,R,j),De.resetDefaultState(),he=-1,ae=null,y.pop(),y.length>0?(x=y[y.length-1],ee.setTextureUnits(x.state.textureUnits),oe===!0&&Ue.setGlobalState(I.clippingPlanes,x.state.camera)):x=null,w.pop(),w.length>0?E=w[w.length-1]:E=null,L!==null&&L.renderEnd()};function Wu(R,j,ce,ie){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)ce=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLightProbeGrid)x.pushLightProbeGrid(R);else if(R.isLight)x.pushLight(R),R.castShadow&&x.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||be.intersectsSprite(R)){ie&&ge.setFromMatrixPosition(R.matrixWorld).applyMatrix4(we);let Be=ue.update(R),Ie=R.material;Ie.visible&&E.push(R,Be,Ie,ce,ge.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||be.intersectsObject(R))){let Be=ue.update(R),Ie=R.material;if(ie&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ge.copy(R.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),ge.copy(Be.boundingSphere.center)),ge.applyMatrix4(R.matrixWorld).applyMatrix4(we)),Array.isArray(Ie)){let He=Be.groups;for(let We=0,nt=He.length;We<nt;We++){let rt=He[We],qe=Ie[rt.materialIndex];qe&&qe.visible&&E.push(R,Be,qe,ce,ge.z,rt)}}else Ie.visible&&E.push(R,Be,Ie,ce,ge.z,null)}}let Pe=R.children;for(let Be=0,Ie=Pe.length;Be<Ie;Be++)Wu(Pe[Be],j,ce,ie)}function yf(R,j,ce,ie){let{opaque:re,transmissive:Pe,transparent:Be}=R;x.setupLightsView(ce),oe===!0&&Ue.setGlobalState(I.clippingPlanes,ce),ie&&M.viewport(W.copy(ie)),re.length>0&&el(re,j,ce),Pe.length>0&&el(Pe,j,ce),Be.length>0&&el(Be,j,ce),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function _f(R,j,ce,ie){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[ie.id]===void 0){let qe=Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float");x.state.transmissionRenderTarget[ie.id]=new qt(1,1,{generateMipmaps:!0,type:qe?dn:Sn,minFilter:bs,samples:Math.max(4,D.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace})}let Pe=x.state.transmissionRenderTarget[ie.id],Be=ie.viewport||W;Pe.setSize(Be.z*I.transmissionResolutionScale,Be.w*I.transmissionResolutionScale);let Ie=I.getRenderTarget(),He=I.getActiveCubeFace(),We=I.getActiveMipmapLevel();I.setRenderTarget(Pe),I.getClearColor(J),Y=I.getClearAlpha(),Y<1&&I.setClearColor(16777215,.5),I.clear(),Le&&Je.render(ce);let nt=I.toneMapping;I.toneMapping=_i;let rt=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),x.setupLightsView(ie),oe===!0&&Ue.setGlobalState(I.clippingPlanes,ie),el(R,ce,ie),ee.updateMultisampleRenderTarget(Pe),ee.updateRenderTargetMipmap(Pe),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let xt=0,Vt=j.length;xt<Vt;xt++){let Nt=j[xt],{object:bt,geometry:vn,material:ke,group:zn}=Nt;if(ke.side===Ct&&bt.layers.test(ie.layers)){let ft=ke.side;ke.side=Xt,ke.needsUpdate=!0,vf(bt,ce,ie,vn,ke,zn),ke.side=ft,ke.needsUpdate=!0,qe=!0}}qe===!0&&(ee.updateMultisampleRenderTarget(Pe),ee.updateRenderTargetMipmap(Pe))}I.setRenderTarget(Ie,He,We),I.setClearColor(J,Y),rt!==void 0&&(ie.viewport=rt),I.toneMapping=nt}function el(R,j,ce){let ie=j.isScene===!0?j.overrideMaterial:null;for(let re=0,Pe=R.length;re<Pe;re++){let Be=R[re],{object:Ie,geometry:He,group:We}=Be,nt=Be.material;nt.allowOverride===!0&&ie!==null&&(nt=ie),Ie.layers.test(ce.layers)&&vf(Ie,j,ce,He,nt,We)}}function vf(R,j,ce,ie,re,Pe){R.onBeforeRender(I,j,ce,ie,re,Pe),R.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),re.onBeforeRender(I,j,ce,ie,R,Pe),re.transparent===!0&&re.side===Ct&&re.forceSinglePass===!1?(re.side=Xt,re.needsUpdate=!0,I.renderBufferDirect(ce,j,ie,re,R,Pe),re.side=gi,re.needsUpdate=!0,I.renderBufferDirect(ce,j,ie,re,R,Pe),re.side=Ct):I.renderBufferDirect(ce,j,ie,re,R,Pe),R.onAfterRender(I,j,ce,ie,re,Pe)}function tl(R,j,ce){j.isScene!==!0&&(j=Ae);let ie=k.get(R),re=x.state.lights,Pe=x.state.shadowsArray,Be=re.state.version,Ie=Me.getParameters(R,re.state,Pe,j,ce,x.state.lightProbeGridArray),He=Me.getProgramCacheKey(Ie),We=ie.programs;ie.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?j.environment:null,ie.fog=j.fog;let nt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ie.envMap=xe.get(R.envMap||ie.environment,nt),ie.envMapRotation=ie.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,We===void 0&&(R.addEventListener("dispose",wi),We=new Map,ie.programs=We);let rt=We.get(He);if(rt!==void 0){if(ie.currentProgram===rt&&ie.lightsStateVersion===Be)return Mf(R,Ie),rt}else Ie.uniforms=Me.getUniforms(R),L!==null&&R.isNodeMaterial&&L.build(R,ce,Ie),R.onBeforeCompile(Ie,I),rt=Me.acquireProgram(Ie,He),We.set(He,rt),ie.uniforms=Ie.uniforms;let qe=ie.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(qe.clippingPlanes=Ue.uniform),Mf(R,Ie),ie.needsLights=ix(R),ie.lightsStateVersion=Be,ie.needsLights&&(qe.ambientLightColor.value=re.state.ambient,qe.lightProbe.value=re.state.probe,qe.directionalLights.value=re.state.directional,qe.directionalLightShadows.value=re.state.directionalShadow,qe.spotLights.value=re.state.spot,qe.spotLightShadows.value=re.state.spotShadow,qe.rectAreaLights.value=re.state.rectArea,qe.ltc_1.value=re.state.rectAreaLTC1,qe.ltc_2.value=re.state.rectAreaLTC2,qe.pointLights.value=re.state.point,qe.pointLightShadows.value=re.state.pointShadow,qe.hemisphereLights.value=re.state.hemi,qe.directionalShadowMatrix.value=re.state.directionalShadowMatrix,qe.spotLightMatrix.value=re.state.spotLightMatrix,qe.spotLightMap.value=re.state.spotLightMap,qe.pointShadowMatrix.value=re.state.pointShadowMatrix),ie.lightProbeGrid=x.state.lightProbeGridArray.length>0,ie.currentProgram=rt,ie.uniformsList=null,rt}function bf(R){if(R.uniformsList===null){let j=R.currentProgram.getUniforms();R.uniformsList=qr.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function Mf(R,j){let ce=k.get(R);ce.outputColorSpace=j.outputColorSpace,ce.batching=j.batching,ce.batchingColor=j.batchingColor,ce.instancing=j.instancing,ce.instancingColor=j.instancingColor,ce.instancingMorph=j.instancingMorph,ce.skinning=j.skinning,ce.morphTargets=j.morphTargets,ce.morphNormals=j.morphNormals,ce.morphColors=j.morphColors,ce.morphTargetsCount=j.morphTargetsCount,ce.numClippingPlanes=j.numClippingPlanes,ce.numIntersection=j.numClipIntersection,ce.vertexAlphas=j.vertexAlphas,ce.vertexTangents=j.vertexTangents,ce.toneMapping=j.toneMapping}function ex(R,j){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;m.setFromMatrixPosition(j.matrixWorld);for(let ce=0,ie=R.length;ce<ie;ce++){let re=R[ce];if(re.texture!==null&&re.boundingBox.containsPoint(m))return re}return null}function tx(R,j,ce,ie,re){j.isScene!==!0&&(j=Ae),ee.resetTextureUnits();let Pe=j.fog,Be=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial?j.environment:null,Ie=Q===null?I.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:at.workingColorSpace,He=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial&&!ie.envMap||ie.isMeshPhongMaterial&&!ie.envMap,We=xe.get(ie.envMap||Be,He),nt=ie.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,rt=!!ce.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),qe=!!ce.morphAttributes.position,xt=!!ce.morphAttributes.normal,Vt=!!ce.morphAttributes.color,Nt=_i;ie.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Nt=I.toneMapping);let bt=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,vn=bt!==void 0?bt.length:0,ke=k.get(ie),zn=x.state.lights;if(oe===!0&&(me===!0||R!==ae)){let Et=R===ae&&ie.id===he;Ue.setState(ie,R,Et)}let ft=!1;ie.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==zn.state.version||ke.outputColorSpace!==Ie||re.isBatchedMesh&&ke.batching===!1||!re.isBatchedMesh&&ke.batching===!0||re.isBatchedMesh&&ke.batchingColor===!0&&re.colorTexture===null||re.isBatchedMesh&&ke.batchingColor===!1&&re.colorTexture!==null||re.isInstancedMesh&&ke.instancing===!1||!re.isInstancedMesh&&ke.instancing===!0||re.isSkinnedMesh&&ke.skinning===!1||!re.isSkinnedMesh&&ke.skinning===!0||re.isInstancedMesh&&ke.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&ke.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&ke.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&ke.instancingMorph===!1&&re.morphTexture!==null||ke.envMap!==We||ie.fog===!0&&ke.fog!==Pe||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Ue.numPlanes||ke.numIntersection!==Ue.numIntersection)||ke.vertexAlphas!==nt||ke.vertexTangents!==rt||ke.morphTargets!==qe||ke.morphNormals!==xt||ke.morphColors!==Vt||ke.toneMapping!==Nt||ke.morphTargetsCount!==vn||!!ke.lightProbeGrid!=x.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,ke.__version=ie.version);let Jn=ke.currentProgram;ft===!0&&(Jn=tl(ie,j,re),L&&ie.isNodeMaterial&&L.onUpdateProgram(ie,Jn,ke));let Ti=!1,os=!1,ar=!1,Mt=Jn.getUniforms(),Wt=ke.uniforms;if(M.useProgram(Jn.program)&&(Ti=!0,os=!0,ar=!0),ie.id!==he&&(he=ie.id,os=!0),ke.needsLights){let Et=ex(x.state.lightProbeGridArray,re);ke.lightProbeGrid!==Et&&(ke.lightProbeGrid=Et,os=!0)}if(Ti||ae!==R){M.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Mt.setValue(G,"projectionMatrix",R.projectionMatrix),Mt.setValue(G,"viewMatrix",R.matrixWorldInverse);let ls=Mt.map.cameraPosition;ls!==void 0&&ls.setValue(G,Se.setFromMatrixPosition(R.matrixWorld)),D.logarithmicDepthBuffer&&Mt.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Mt.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),ae!==R&&(ae=R,os=!0,ar=!0)}if(ke.needsLights&&(zn.state.directionalShadowMap.length>0&&Mt.setValue(G,"directionalShadowMap",zn.state.directionalShadowMap,ee),zn.state.spotShadowMap.length>0&&Mt.setValue(G,"spotShadowMap",zn.state.spotShadowMap,ee),zn.state.pointShadowMap.length>0&&Mt.setValue(G,"pointShadowMap",zn.state.pointShadowMap,ee)),re.isSkinnedMesh){Mt.setOptional(G,re,"bindMatrix"),Mt.setOptional(G,re,"bindMatrixInverse");let Et=re.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),Mt.setValue(G,"boneTexture",Et.boneTexture,ee))}re.isBatchedMesh&&(Mt.setOptional(G,re,"batchingTexture"),Mt.setValue(G,"batchingTexture",re._matricesTexture,ee),Mt.setOptional(G,re,"batchingIdTexture"),Mt.setValue(G,"batchingIdTexture",re._indirectTexture,ee),Mt.setOptional(G,re,"batchingColorTexture"),re._colorsTexture!==null&&Mt.setValue(G,"batchingColorTexture",re._colorsTexture,ee));let as=ce.morphAttributes;if((as.position!==void 0||as.normal!==void 0||as.color!==void 0)&&Z.update(re,ce,Jn),(os||ke.receiveShadow!==re.receiveShadow)&&(ke.receiveShadow=re.receiveShadow,Mt.setValue(G,"receiveShadow",re.receiveShadow)),(ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial)&&ie.envMap===null&&j.environment!==null&&(Wt.envMapIntensity.value=j.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=j1()),os){if(Mt.setValue(G,"toneMappingExposure",I.toneMappingExposure),ke.needsLights&&nx(Wt,ar),Pe&&ie.fog===!0&&Re.refreshFogUniforms(Wt,Pe),Re.refreshMaterialUniforms(Wt,ie,O,U,x.state.transmissionRenderTarget[R.id]),ke.needsLights&&ke.lightProbeGrid){let Et=ke.lightProbeGrid;Wt.probesSH.value=Et.texture,Wt.probesMin.value.copy(Et.boundingBox.min),Wt.probesMax.value.copy(Et.boundingBox.max),Wt.probesResolution.value.copy(Et.resolution)}qr.upload(G,bf(ke),Wt,ee)}if(ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(qr.upload(G,bf(ke),Wt,ee),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Mt.setValue(G,"center",re.center),Mt.setValue(G,"modelViewMatrix",re.modelViewMatrix),Mt.setValue(G,"normalMatrix",re.normalMatrix),Mt.setValue(G,"modelMatrix",re.matrixWorld),ie.uniformsGroups!==void 0){let Et=ie.uniformsGroups;for(let ls=0,lr=Et.length;ls<lr;ls++){let Sf=Et[ls];_e.update(Sf,Jn),_e.bind(Sf,Jn)}}return Jn}function nx(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function ix(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(R,j,ce){let ie=k.get(R);ie.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),k.get(R.texture).__webglTexture=j,k.get(R.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:ce,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,j){let ce=k.get(R);ce.__webglFramebuffer=j,ce.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(R,j=0,ce=0){Q=R,X=j,B=ce;let ie=null,re=!1,Pe=!1;if(R){let Ie=k.get(R);if(Ie.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(G.FRAMEBUFFER,Ie.__webglFramebuffer),W.copy(R.viewport),ne.copy(R.scissor),F=R.scissorTest,M.viewport(W),M.scissor(ne),M.setScissorTest(F),he=-1;return}else if(Ie.__webglFramebuffer===void 0)ee.setupRenderTarget(R);else if(Ie.__hasExternalTextures)ee.rebindTextures(R,k.get(R.texture).__webglTexture,k.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let nt=R.depthTexture;if(Ie.__boundDepthTexture!==nt){if(nt!==null&&k.has(nt)&&(R.width!==nt.image.width||R.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(R)}}let He=R.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Pe=!0);let We=k.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(We[j])?ie=We[j][ce]:ie=We[j],re=!0):R.samples>0&&ee.useMultisampledRTT(R)===!1?ie=k.get(R).__webglMultisampledFramebuffer:Array.isArray(We)?ie=We[ce]:ie=We,W.copy(R.viewport),ne.copy(R.scissor),F=R.scissorTest}else W.copy(te).multiplyScalar(O).floor(),ne.copy(K).multiplyScalar(O).floor(),F=de;if(ce!==0&&(ie=z),M.bindFramebuffer(G.FRAMEBUFFER,ie)&&M.drawBuffers(R,ie),M.viewport(W),M.scissor(ne),M.setScissorTest(F),re){let Ie=k.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ie.__webglTexture,ce)}else if(Pe){let Ie=j;for(let He=0;He<R.textures.length;He++){let We=k.get(R.textures[He]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+He,We.__webglTexture,ce,Ie)}}else if(R!==null&&ce!==0){let Ie=k.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ie.__webglTexture,ce)}he=-1},this.readRenderTargetPixels=function(R,j,ce,ie,re,Pe,Be,Ie=0){if(!(R&&R.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=k.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Be!==void 0&&(He=He[Be]),He){M.bindFramebuffer(G.FRAMEBUFFER,He);try{let We=R.textures[Ie],nt=We.format,rt=We.type;if(R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ie),!D.textureFormatReadable(nt)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!D.textureTypeReadable(rt)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-ie&&ce>=0&&ce<=R.height-re&&G.readPixels(j,ce,ie,re,Ce.convert(nt),Ce.convert(rt),Pe)}finally{let We=Q!==null?k.get(Q).__webglFramebuffer:null;M.bindFramebuffer(G.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(R,j,ce,ie,re,Pe,Be,Ie=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=k.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Be!==void 0&&(He=He[Be]),He)if(j>=0&&j<=R.width-ie&&ce>=0&&ce<=R.height-re){M.bindFramebuffer(G.FRAMEBUFFER,He);let We=R.textures[Ie],nt=We.format,rt=We.type;if(R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ie),!D.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let qe=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,qe),G.bufferData(G.PIXEL_PACK_BUFFER,Pe.byteLength,G.STREAM_READ),G.readPixels(j,ce,ie,re,Ce.convert(nt),Ce.convert(rt),0);let xt=Q!==null?k.get(Q).__webglFramebuffer:null;M.bindFramebuffer(G.FRAMEBUFFER,xt);let Vt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Lp(G,Vt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,qe),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Pe),G.deleteBuffer(qe),G.deleteSync(Vt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,j=null,ce=0){let ie=Math.pow(2,-ce),re=Math.floor(R.image.width*ie),Pe=Math.floor(R.image.height*ie),Be=j!==null?j.x:0,Ie=j!==null?j.y:0;ee.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,ce,0,0,Be,Ie,re,Pe),M.unbindTexture()},this.copyTextureToTexture=function(R,j,ce=null,ie=null,re=0,Pe=0){let Be,Ie,He,We,nt,rt,qe,xt,Vt,Nt=R.isCompressedTexture?R.mipmaps[Pe]:R.image;if(ce!==null)Be=ce.max.x-ce.min.x,Ie=ce.max.y-ce.min.y,He=ce.isBox3?ce.max.z-ce.min.z:1,We=ce.min.x,nt=ce.min.y,rt=ce.isBox3?ce.min.z:0;else{let Wt=Math.pow(2,-re);Be=Math.floor(Nt.width*Wt),Ie=Math.floor(Nt.height*Wt),R.isDataArrayTexture?He=Nt.depth:R.isData3DTexture?He=Math.floor(Nt.depth*Wt):He=1,We=0,nt=0,rt=0}ie!==null?(qe=ie.x,xt=ie.y,Vt=ie.z):(qe=0,xt=0,Vt=0);let bt=Ce.convert(j.format),vn=Ce.convert(j.type),ke;j.isData3DTexture?(ee.setTexture3D(j,0),ke=G.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(ee.setTexture2DArray(j,0),ke=G.TEXTURE_2D_ARRAY):(ee.setTexture2D(j,0),ke=G.TEXTURE_2D),M.activeTexture(G.TEXTURE0),M.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,j.flipY),M.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),M.pixelStorei(G.UNPACK_ALIGNMENT,j.unpackAlignment);let zn=M.getParameter(G.UNPACK_ROW_LENGTH),ft=M.getParameter(G.UNPACK_IMAGE_HEIGHT),Jn=M.getParameter(G.UNPACK_SKIP_PIXELS),Ti=M.getParameter(G.UNPACK_SKIP_ROWS),os=M.getParameter(G.UNPACK_SKIP_IMAGES);M.pixelStorei(G.UNPACK_ROW_LENGTH,Nt.width),M.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Nt.height),M.pixelStorei(G.UNPACK_SKIP_PIXELS,We),M.pixelStorei(G.UNPACK_SKIP_ROWS,nt),M.pixelStorei(G.UNPACK_SKIP_IMAGES,rt);let ar=R.isDataArrayTexture||R.isData3DTexture,Mt=j.isDataArrayTexture||j.isData3DTexture;if(R.isDepthTexture){let Wt=k.get(R),as=k.get(j),Et=k.get(Wt.__renderTarget),ls=k.get(as.__renderTarget);M.bindFramebuffer(G.READ_FRAMEBUFFER,Et.__webglFramebuffer),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,ls.__webglFramebuffer);for(let lr=0;lr<He;lr++)ar&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,k.get(R).__webglTexture,re,rt+lr),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,k.get(j).__webglTexture,Pe,Vt+lr)),G.blitFramebuffer(We,nt,Be,Ie,qe,xt,Be,Ie,G.DEPTH_BUFFER_BIT,G.NEAREST);M.bindFramebuffer(G.READ_FRAMEBUFFER,null),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(re!==0||R.isRenderTargetTexture||k.has(R)){let Wt=k.get(R),as=k.get(j);M.bindFramebuffer(G.READ_FRAMEBUFFER,$),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,V);for(let Et=0;Et<He;Et++)ar?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Wt.__webglTexture,re,rt+Et):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Wt.__webglTexture,re),Mt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,as.__webglTexture,Pe,Vt+Et):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,as.__webglTexture,Pe),re!==0?G.blitFramebuffer(We,nt,Be,Ie,qe,xt,Be,Ie,G.COLOR_BUFFER_BIT,G.NEAREST):Mt?G.copyTexSubImage3D(ke,Pe,qe,xt,Vt+Et,We,nt,Be,Ie):G.copyTexSubImage2D(ke,Pe,qe,xt,We,nt,Be,Ie);M.bindFramebuffer(G.READ_FRAMEBUFFER,null),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Mt?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(ke,Pe,qe,xt,Vt,Be,Ie,He,bt,vn,Nt.data):j.isCompressedArrayTexture?G.compressedTexSubImage3D(ke,Pe,qe,xt,Vt,Be,Ie,He,bt,Nt.data):G.texSubImage3D(ke,Pe,qe,xt,Vt,Be,Ie,He,bt,vn,Nt):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Pe,qe,xt,Be,Ie,bt,vn,Nt.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Pe,qe,xt,Nt.width,Nt.height,bt,Nt.data):G.texSubImage2D(G.TEXTURE_2D,Pe,qe,xt,Be,Ie,bt,vn,Nt);M.pixelStorei(G.UNPACK_ROW_LENGTH,zn),M.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ft),M.pixelStorei(G.UNPACK_SKIP_PIXELS,Jn),M.pixelStorei(G.UNPACK_SKIP_ROWS,Ti),M.pixelStorei(G.UNPACK_SKIP_IMAGES,os),Pe===0&&j.generateMipmaps&&G.generateMipmap(ke),M.unbindTexture()},this.initRenderTarget=function(R){k.get(R).__webglFramebuffer===void 0&&ee.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ee.setTextureCube(R,0):R.isData3DTexture?ee.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ee.setTexture2DArray(R,0):ee.setTexture2D(R,0),M.unbindTexture()},this.resetState=function(){X=0,B=0,Q=null,M.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}});function Yr(n){return new ia({color:0,emissive:16777215,emissiveIntensity:n})}var Zr,hd=Kn(()=>{$t();Zr=class extends ji{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new ti;e.deleteAttribute("uv");let t=new xn({side:Xt}),i=new xn,s=new Ys(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Xe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Pn(e,i,6),a=new kt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Xe(e,Yr(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Xe(e,Yr(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new Xe(e,Yr(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new Xe(e,Yr(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new Xe(e,Yr(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let g=new Xe(e,Yr(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}}});function Dn(n,e){let t=_m.get(n);return t||(t=e(),_m.set(n,t)),t}function Ln(n,e){let t=document.createElement("canvas");return t.width=n,t.height=e??n,t}function Nn(n,{repeat:e=!1}={}){let t=new Ws(n);return t.colorSpace=Kt,t.anisotropy=4,e?(t.wrapS=Qn,t.wrapT=Qn):(t.wrapS=jt,t.wrapT=jt),t.needsUpdate=!0,t}function Un(n="#ffffff",e=2.6,t=256){return Dn(`glow:${n}:${e}:${t}`,()=>{let i=Ln(t),s=i.getContext("2d"),r=t/2,o=s.createImageData(t,t),a=new le(n),l=a.r*255,c=a.g*255,u=a.b*255;for(let d=0;d<t;d++)for(let h=0;h<t;h++){let g=(h-r)/r,v=(d-r)/r,S=Math.sqrt(g*g+v*v),p=S>=1?0:Math.pow(1-S,e),f=(d*t+h)*4;o.data[f]=l,o.data[f+1]=c,o.data[f+2]=u,o.data[f+3]=Math.round(p*255)}return s.putImageData(o,0,0),Nn(i)})}function Qs(n="#ffffff",e=128){return Dn(`bokeh:${n}:${e}`,()=>{let t=Ln(e),i=t.getContext("2d"),s=e/2,r=i.createRadialGradient(s,s,0,s,s,s);return r.addColorStop(0,Ye(n,.3)),r.addColorStop(.62,Ye(n,.36)),r.addColorStop(.86,Ye(n,.62)),r.addColorStop(.96,Ye(n,.18)),r.addColorStop(1,Ye(n,0)),i.fillStyle=r,i.beginPath(),i.arc(s,s,s,0,Math.PI*2),i.fill(),Nn(t)})}function vm(n="#ffffff",e=128){return Dn(`spark:${n}:${e}`,()=>{let t=Ln(e),i=t.getContext("2d"),s=e/2,r=i.createRadialGradient(s,s,0,s,s,s);r.addColorStop(0,Ye(n,.95)),r.addColorStop(.22,Ye(n,.42)),r.addColorStop(1,Ye(n,0)),i.fillStyle=r,i.fillRect(0,0,e,e),i.globalCompositeOperation="lighter";for(let o of[0,Math.PI/2]){i.save(),i.translate(s,s),i.rotate(o);let a=i.createLinearGradient(-s,0,s,0);a.addColorStop(0,Ye(n,0)),a.addColorStop(.5,Ye(n,.9)),a.addColorStop(1,Ye(n,0)),i.fillStyle=a,i.fillRect(-s,-e*.018,e,e*.036),i.restore()}return Nn(t)})}function bm(n=512){return Dn(`sun:${n}`,()=>{let e=Ln(n),t=e.getContext("2d"),i=n/2,s=t.createRadialGradient(i,i,0,i,i,i);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.11,"rgba(255,253,236,1)"),s.addColorStop(.18,"rgba(255,233,133,0.95)"),s.addColorStop(.3,"rgba(255,210,76,0.55)"),s.addColorStop(.52,"rgba(255,214,120,0.20)"),s.addColorStop(.78,"rgba(255,235,180,0.06)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,n,n),Nn(e)})}function Mm(n="#C9A9F0",e=128){return Dn(`flarering:${n}:${e}`,()=>{let t=Ln(e),i=t.getContext("2d"),s=e/2,r=i.createRadialGradient(s,s,0,s,s,s);return r.addColorStop(0,Ye(n,0)),r.addColorStop(.55,Ye(n,.05)),r.addColorStop(.76,Ye(n,.55)),r.addColorStop(.9,Ye(n,.22)),r.addColorStop(1,Ye(n,0)),i.fillStyle=r,i.fillRect(0,0,e,e),Nn(t)})}function Sm(n="#FFE985",e=512,t=64){return Dn(`streak:${n}:${e}x${t}`,()=>{let i=Ln(e,t),s=i.getContext("2d"),r=s.createLinearGradient(0,0,e,0);r.addColorStop(0,Ye(n,0)),r.addColorStop(.5,Ye(n,1)),r.addColorStop(1,Ye(n,0)),s.fillStyle=r,s.fillRect(0,0,e,t);let o=s.createLinearGradient(0,0,0,t);return o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(.5,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)"),s.globalCompositeOperation="destination-out",s.fillStyle=o,s.fillRect(0,0,e,t),Nn(i)})}function Em(n="#7FF3E4",e=256){return Dn(`stream:${n}:${e}`,()=>{let t=Ln(e),i=t.getContext("2d");i.fillStyle=Ye(n,.16),i.fillRect(0,0,e,e),i.globalCompositeOperation="lighter";let s=9;for(let l=0;l<s;l++){let c=l/s*e,u=e/s,d=i.createLinearGradient(0,c,0,c+u);d.addColorStop(0,Ye(n,0)),d.addColorStop(.45,Ye(n,.55+.35*Math.sin(l*2.1))),d.addColorStop(1,Ye(n,0)),i.fillStyle=d,i.fillRect(0,c,e,u)}let r=i.createLinearGradient(0,0,e,0);r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.5,"rgba(255,255,255,0.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.fillRect(0,0,e,e),i.globalCompositeOperation="destination-out";let o=i.createLinearGradient(0,0,e,0);o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(.22,"rgba(0,0,0,0)"),o.addColorStop(.78,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)"),i.fillStyle=o,i.fillRect(0,0,e,e);let a=Nn(t,{repeat:!0});return a.wrapS=jt,a.wrapT=Qn,a})}function wm(n=256){return Dn(`caustic:${n}`,()=>{let e=Ln(n),t=e.getContext("2d");t.fillStyle="rgba(0,0,0,1)",t.fillRect(0,0,n,n),t.globalCompositeOperation="lighter";for(let s=0;s<40;s++){let r=Math.random()*n,o=Math.random()*n,a=n*(.04+Math.random()*.1);for(let l=-1;l<=1;l++)for(let c=-1;c<=1;c++){let u=t.createRadialGradient(r+l*n,o+c*n,0,r+l*n,o+c*n,a);u.addColorStop(0,"rgba(255,255,255,0.5)"),u.addColorStop(.5,"rgba(255,255,255,0.14)"),u.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=u,t.fillRect(r+l*n-a,o+c*n-a,a*2,a*2)}}let i=Nn(e,{repeat:!0});return i.colorSpace=bi,i})}function Tm(n="#DFFBFF",e=64,t=256){return Dn(`shaft:${n}:${e}x${t}`,()=>{let i=Ln(e,t),s=i.getContext("2d"),r=s.createLinearGradient(0,0,0,t);r.addColorStop(0,Ye(n,0)),r.addColorStop(.14,Ye(n,.55)),r.addColorStop(.52,Ye(n,.2)),r.addColorStop(1,Ye(n,0)),s.fillStyle=r,s.fillRect(0,0,e,t),s.globalCompositeOperation="destination-out";let o=s.createLinearGradient(0,0,e,0);return o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(.5,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)"),s.fillStyle=o,s.fillRect(0,0,e,t),Nn(i)})}function Cm(n="#8CF0D0",e=512,t=128){return Dn(`aurora:${n}:${e}x${t}`,()=>{let i=Ln(e,t),s=i.getContext("2d"),r=s.createLinearGradient(0,0,0,t);r.addColorStop(0,Ye(n,0)),r.addColorStop(.35,Ye(n,.22)),r.addColorStop(.72,Ye(n,.48)),r.addColorStop(1,Ye(n,0)),s.fillStyle=r,s.fillRect(0,0,e,t),s.globalCompositeOperation="lighter";for(let a=0;a<26;a++){let l=a/26*e+Math.sin(a*1.7)*12,c=3+Math.abs(Math.sin(a*2.3))*9,u=s.createLinearGradient(l-c,0,l+c,0);u.addColorStop(0,Ye(n,0)),u.addColorStop(.5,Ye(n,.18+.16*Math.sin(a*.9))),u.addColorStop(1,Ye(n,0)),s.fillStyle=u,s.fillRect(l-c,t*.18,c*2,t*.82)}s.globalCompositeOperation="destination-out";let o=s.createLinearGradient(0,0,e,0);return o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(.18,"rgba(0,0,0,0)"),o.addColorStop(.82,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)"),s.fillStyle=o,s.fillRect(0,0,e,t),Nn(i)})}function Am(n="#B8F0FF",e=512){return Dn(`portal:${n}:${e}`,()=>{let t=Ln(e),i=t.getContext("2d"),s=e/2,r=i.createRadialGradient(s,s,0,s,s,s);r.addColorStop(0,Ye("#FFFFFF",.55)),r.addColorStop(.3,Ye(n,.34)),r.addColorStop(.72,Ye(n,.16)),r.addColorStop(1,Ye(n,0)),i.fillStyle=r,i.fillRect(0,0,e,e),i.globalCompositeOperation="lighter",i.lineWidth=e*.006;for(let a=0;a<34;a++){let l=a/34,c=s*(.14+l*.82),u=l*9.1,d=1.1+Math.sin(a*1.9)*.7;i.strokeStyle=Ye(a%3===0?"#FFFFFF":n,.3*(1-l*.55)),i.beginPath(),i.arc(s,s,c,u,u+d),i.stroke()}i.globalCompositeOperation="destination-in";let o=i.createRadialGradient(s,s,0,s,s,s);return o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(.86,"rgba(0,0,0,1)"),o.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=o,i.fillRect(0,0,e,e),Nn(t)})}function Jr(n="#CFEFFA",e=256){return Dn(`halo:${n}:${e}`,()=>{let t=Ln(e),i=t.getContext("2d"),s=e/2,r=i.createRadialGradient(s,s,0,s,s,s);return r.addColorStop(0,Ye(n,0)),r.addColorStop(.68,Ye(n,0)),r.addColorStop(.82,Ye(n,.85)),r.addColorStop(.9,Ye("#FFFFFF",.95)),r.addColorStop(.97,Ye(n,.16)),r.addColorStop(1,Ye(n,0)),i.fillStyle=r,i.fillRect(0,0,e,e),Nn(t)})}function Rm(n=256){return Dn(`prism:${n}`,()=>{let e=Ln(n),t=e.getContext("2d"),i=n/2,s=["#FFD9E8","#FFE9B8","#DCF6C8","#BFF0F5","#CFD8FA","#E8CFF6"];t.globalCompositeOperation="lighter";for(let a=0;a<s.length;a++){let l=a/s.length*Math.PI*2,c=(a+1.35)/s.length*Math.PI*2,u=t.createRadialGradient(i,i,i*.12,i,i,i);u.addColorStop(0,Ye(s[a],0)),u.addColorStop(.55,Ye(s[a],.42)),u.addColorStop(1,Ye(s[a],0)),t.fillStyle=u,t.beginPath(),t.moveTo(i,i),t.arc(i,i,i,l,c),t.closePath(),t.fill()}let r=t.createRadialGradient(i,i,0,i,i,i*.4);r.addColorStop(0,"rgba(255,255,255,0.7)"),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,0,n,n),t.globalCompositeOperation="destination-in";let o=t.createRadialGradient(i,i,0,i,i,i);return o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(.9,"rgba(0,0,0,1)"),o.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=o,t.fillRect(0,0,n,n),Nn(e)})}function Ta(n="#8CFFF0",e=256,t=64){return Dn(`band:${n}:${e}x${t}`,()=>{let i=Ln(e,t),s=i.getContext("2d");s.fillStyle=Ye(n,.18),s.fillRect(0,0,e,t),s.globalCompositeOperation="lighter";let r=6;for(let l=0;l<r;l++){let c=l/r*e,u=s.createLinearGradient(c,0,c+e/r,0);u.addColorStop(0,Ye(n,0)),u.addColorStop(.42,Ye("#FFFFFF",.75)),u.addColorStop(.58,Ye(n,.5)),u.addColorStop(1,Ye(n,0)),s.fillStyle=u,s.fillRect(c,0,e/r,t)}s.globalCompositeOperation="destination-out";let o=s.createLinearGradient(0,0,0,t);o.addColorStop(0,"rgba(0,0,0,0.85)"),o.addColorStop(.5,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,0.85)"),s.fillStyle=o,s.fillRect(0,0,e,t);let a=Nn(i,{repeat:!0});return a.wrapS=Qn,a.wrapT=jt,a})}function Ye(n,e){let t=new le(n);return`rgba(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)},${e})`}var _m,is=Kn(()=>{$t();_m=new Map});function fd(){let n=dd(),e=navigator.hardwareConcurrency||4,t=Math.min(window.innerWidth,window.innerHeight)<500;return n&&(e<=4||t)?"low":n||e<=4?"medium":"high"}var $e,st,ai,mt,Ts,Oe,fn,dd,zt=Kn(()=>{$e=(n,e,t)=>n<e?e:n>t?t:n,st=(n,e,t)=>n+(e-n)*t,ai=(n,e,t,i)=>st(n,e,1-Math.exp(-t*i)),mt=(n,e)=>n+Math.random()*(e-n),Ts=class{constructor(e,t){this.factory=e,this.onRelease=t,this.free=[],this.created=0}acquire(){let e=this.free.pop();return e||(this.created++,this.factory())}release(e){this.onRelease&&this.onRelease(e),this.free.push(e)}},Oe=n=>Math.floor(n).toLocaleString("en-US"),fn=n=>`${Math.floor(n).toLocaleString("en-US")} m`,dd=()=>"ontouchstart"in window||navigator.maxTouchPoints>0});function gt(n,e,t,i={}){return{name:n,surface:e,palette:{...md,...t},hazard:i.hazard||"cloud",decor:i.decor||"skybank"}}function nM(n){if(!n||!n.worldsUnlocked)return!1;let e=0;for(let t of pd)n.worldsUnlocked.includes(t.key)&&e++;return e>=Math.min(tM,pd.length)}function gd(n){let e=pd.map(t=>t.key);return nM(n)&&e.push(...eM.map(t=>t.key)),e}function xd(n){let e=n.length?n:["skyshore"];function t(u){let d=Math.max(0,u),h=Math.floor(d/At),g=Q1[e[h%e.length]]||li[0];return{index:h,loop:Math.floor(h/e.length),key:g.key,world:g,local:d-h*At}}function i(u){let{world:d,local:h}=t(u),[g,v]=d.strata,S=rM(Fm-Im,Fm+Im,h);return{a:g,b:v,t:S}}function s(u){let{a:d,b:h,t:g}=i(u);return st(d.surface,h.surface,g)}function r(u,d={}){let{a:h,b:g,t:v}=i(u);return oM(h.palette,g.palette,v,d)}function o(u){let{a:d,b:h,t:g}=i(u);return g>.5?h:d}function a(u){return t(u).world.signature||li[0].signature}function l(u){return(Math.floor(Math.max(0,u)/At)+1)*At}function c(u){return(u+1)*At}return{sequence:e,worldAt:t,strataAt:i,stratumAt:o,paletteAt:r,surfaceAmountAt:s,signatureAt:a,nextPortalDistance:l,portalDistance:c,get length(){return e.length}}}function yd(n,e){let t=0;for(let r of cu)t+=r.weight;let s=sM(n>>>0,(e+1)*2654435761)/4294967296*t;for(let r of cu)if(s-=r.weight,s<=0)return r;return cu[0]}function sM(n,e){let t=(n^Math.imul(e^e>>>16,73244475))>>>0;return t=Math.imul(t^t>>>16,73244475)>>>0,t=Math.imul(t^t>>>16,73244475)>>>0,(t^t>>>16)>>>0}function uu(n,e,t=1){if(!e||t<=0)return n;let i=typeof e=="string"?iM[e]:e;if(!i)return n;for(let s in i.mul)typeof n[s]=="number"&&(n[s]*=st(1,i.mul[s],t));if(i.tint)for(let s in i.tint){let[r,o]=i.tint[s];n[s]=Nm(n[s],r,o*t)}return n}function rM(n,e,t){let i=$e((t-n)/(e-n||1),0,1);return i*i*(3-2*i)}function oM(n,e,t,i={}){for(let s in n){let r=n[s],o=e[s];typeof r=="number"?i[s]=st(r,o===void 0?r:o,t):i[s]=Nm(r,o===void 0?r:o,t)}return i}function Dm(n){let e=Pm.get(n);if(e===void 0){let t=parseInt(n.slice(1),16);e=[t>>16&255,t>>8&255,t&255],Pm.set(n,e)}return e}function Nm(n,e,t){if(t<=0)return n;if(t>=1)return e;let i=Dm(n),s=Dm(e),r=Math.round(st(i[0],s[0],t)),o=Math.round(st(i[1],s[1],t)),a=Math.round(st(i[2],s[2],t));return`#${(1<<24|r<<16|o<<8|a).toString(16).slice(1)}`}var At,Fm,Im,Lm,md,li,Q1,pd,eM,tM,cu,iM,Pm,er=Kn(()=>{zt();At=2400,Fm=At/2,Im=220,Lm=300,md={skyTop:"#0F6099",skyMid:"#3AA9D8",skyHorizon:"#AEDFF2",skyGround:"#4394BE",fog:"#78BCDE",fogNear:380,fogFar:1100,sunColor:"#FFE58F",sunGlow:.86,hemiSky:"#B6E2F6",hemiGround:"#6AA6C0",hemiIntensity:.66,keyIntensity:.8,envIntensity:1,exposure:1,surfaceDeep:"#07515A",surfaceShallow:"#3FD1C0",surfaceWave:1,surfaceCaustic:1,surfaceFresnel:3.4,surfaceSpec:1.7,puffColor:"#D9ECF8",spireColor:"#BFF3EC",beadColor:"#DCF0F7",shardColor:"#DFF2FA",moteColor:"#CFF8FF",moteRise:4.8,moteSize:1,moteOpacity:.55,veilColor:"#DFFBFF",veilOpacity:1,veilTilt:-.29,veilWidth:1,veilHeight:1,accent:"#7FE0D2",streamColor:"#8CFFF0",gateColor:"#8CFFF0"};li=[{key:"skyshore",name:"Skyshore",tier:"base",blurb:"Open sky over a warm shallow sea.",signature:{gate:"round",orb:"bead",portal:"arch",weather:"bubbles"},strata:[gt("Sky",0,{},{hazard:"cloud",decor:"skybank"}),gt("Shore",1,{skyTop:"#065C7E",skyMid:"#1E9BAE",skyHorizon:"#96E4E0",skyGround:"#095F66",fog:"#48B4B8",fogNear:300,fogFar:980,sunColor:"#D8F6EF",sunGlow:.62,hemiSky:"#A0E8E0",hemiGround:"#0C666C",hemiIntensity:.74,keyIntensity:.68,envIntensity:1.14,surfaceDeep:"#07515A",surfaceShallow:"#3FD1C0",spireColor:"#BFF3EC",moteColor:"#CFF8FF",moteRise:4.8,accent:"#3FD1C0",streamColor:"#B6FFF0"},{hazard:"coral",decor:"coralbank"})]},{key:"verdant",name:"Verdant Circuit",tier:"base",blurb:"Living canopy threaded with humming chrome.",signature:{gate:"hex",orb:"droplet",portal:"lattice",weather:"pollen"},strata:[gt("Grove",0,{skyTop:"#186B5E",skyMid:"#4FB98F",skyHorizon:"#CDE8AE",skyGround:"#357E52",fog:"#7FC79E",fogNear:340,fogFar:1e3,sunColor:"#FBEB98",sunGlow:.8,hemiSky:"#C8ECB8",hemiGround:"#37704C",hemiIntensity:.68,keyIntensity:.8,puffColor:"#BFE8A8",spireColor:"#7FE0C8",beadColor:"#DCF7EC",shardColor:"#CFF5DC",moteColor:"#EAFFB8",moteRise:-1.6,moteSize:.8,moteOpacity:.5,veilColor:"#EFFFD0",veilOpacity:1,veilTilt:-.16,accent:"#7FE8B4",streamColor:"#A8FFD0",gateColor:"#A8FFC8"},{hazard:"leaf",decor:"grovebank"}),gt("Circuit",.85,{skyTop:"#0E6E74",skyMid:"#2FB6B0",skyHorizon:"#C6F7E8",skyGround:"#14807A",fog:"#63CFC0",fogNear:320,fogFar:960,sunColor:"#E8FFF0",sunGlow:.74,hemiSky:"#BFF7EC",hemiGround:"#116E70",hemiIntensity:.74,keyIntensity:.76,envIntensity:1.2,surfaceDeep:"#0A5A56",surfaceShallow:"#59E8D0",surfaceWave:.28,surfaceCaustic:.5,surfaceFresnel:4.6,surfaceSpec:2.6,puffColor:"#A8E0C0",spireColor:"#8CF0DC",beadColor:"#E4FBF4",shardColor:"#BFF6E8",moteColor:"#B8FFE8",moteRise:2.6,veilColor:"#D8FFF0",veilTilt:-.22,accent:"#4FE8C8",streamColor:"#8CFFE0",gateColor:"#8CFFE0"},{hazard:"pylon",decor:"circuitbank"})]},{key:"aurora",name:"Aurora Reach",tier:"base",blurb:"Pastel twilight over a mirror-still sea.",signature:{gate:"ripple",orb:"star",portal:"monolith",weather:"none"},strata:[gt("Dusk",0,{skyTop:"#3A4E96",skyMid:"#7B86D0",skyHorizon:"#F0C9E0",skyGround:"#4A4E86",fog:"#A6A8DC",fogNear:340,fogFar:1050,sunColor:"#FFD8E8",sunGlow:.78,hemiSky:"#D8D2F5",hemiGround:"#4E4E86",hemiIntensity:.72,keyIntensity:.72,envIntensity:1.1,exposure:1.06,puffColor:"#D6CFF0",spireColor:"#B9C6F0",beadColor:"#EAE6FA",shardColor:"#D8D0F6",moteColor:"#FFEAF6",moteRise:.9,moteSize:.7,moteOpacity:.7,veilColor:"#D6C4F0",veilOpacity:.8,accent:"#C9A9F0",streamColor:"#D8C0FF",gateColor:"#D8C0FF"},{hazard:"cloud",decor:"skybank"}),gt("Aurora",.92,{skyTop:"#2C4488",skyMid:"#6E92D8",skyHorizon:"#CFF2EC",skyGround:"#33478E",fog:"#8FA8DC",fogNear:320,fogFar:1e3,sunColor:"#CFF6FF",sunGlow:.6,hemiSky:"#C6E4FA",hemiGround:"#33478E",hemiIntensity:.76,keyIntensity:.62,envIntensity:1.18,exposure:1.08,surfaceDeep:"#1B2A5E",surfaceShallow:"#7FD8E8",surfaceWave:.36,surfaceCaustic:.35,surfaceFresnel:5.2,surfaceSpec:2.3,puffColor:"#C6D6F2",spireColor:"#9CC8F0",shardColor:"#CFE8FA",moteColor:"#FFFFFF",moteRise:.35,moteSize:.55,moteOpacity:.85,veilColor:"#8CF0D0",veilOpacity:1.5,veilTilt:1.42,veilWidth:2.1,veilHeight:.5,accent:"#8CF0D8",streamColor:"#B8F0FF",gateColor:"#B8F0FF"},{hazard:"shard",decor:"auroraband"})]},{key:"crystal",name:"Crystal Atrium",tier:"base",blurb:"A sunlit conservatory of geode glass.",signature:{gate:"diamond",orb:"cube",portal:"lattice",weather:"sparks"},strata:[gt("Atrium",0,{skyTop:"#4A90AC",skyMid:"#8FC8DC",skyHorizon:"#F2E2C2",skyGround:"#74A8B6",fog:"#B6D8DC",fogNear:380,fogFar:1150,sunColor:"#FFEBB8",sunGlow:.88,hemiSky:"#F4E8D2",hemiGround:"#86AAB4",hemiIntensity:.7,keyIntensity:.8,envIntensity:1.15,exposure:.86,puffColor:"#E8F2F0",spireColor:"#DCF2F8",beadColor:"#F4FAFC",shardColor:"#EAF6FF",moteColor:"#FFF4D8",moteRise:1.2,moteSize:.6,moteOpacity:.6,veilColor:"#FFF0D0",veilOpacity:.9,veilTilt:-.08,accent:"#FFD8A8",streamColor:"#FFE8C0",gateColor:"#FFE0B0"},{hazard:"crystal",decor:"atriumbank"}),gt("Prism",.8,{skyTop:"#5F72C4",skyMid:"#9CBEE0",skyHorizon:"#F0C8DE",skyGround:"#7E8EC4",fog:"#BCB8DC",fogNear:360,fogFar:1100,sunColor:"#FFF4FA",sunGlow:.94,hemiSky:"#E2D8F6",hemiGround:"#7A88C0",hemiIntensity:.74,keyIntensity:.8,envIntensity:1.25,exposure:.86,surfaceDeep:"#6A7AB8",surfaceShallow:"#CFE8FF",surfaceWave:.14,surfaceCaustic:.7,surfaceFresnel:5.8,surfaceSpec:3,puffColor:"#F0E4F8",spireColor:"#E4D8FA",shardColor:"#FFF0FA",moteColor:"#FFE4F4",moteRise:1.6,moteSize:.7,veilColor:"#FFD8F0",veilOpacity:1.1,accent:"#F0A8D8",streamColor:"#E8C0FF",gateColor:"#F0C0F0"},{hazard:"crystal",decor:"prismbank"})]},{key:"lumen",name:"Lumen Shallows",tier:"base",blurb:"A sunlit lagoon, and the glowing deep beneath it.",signature:{gate:"ripple",orb:"droplet",portal:"bloom",weather:"rain"},strata:[gt("Shallows",1,{skyTop:"#1B8FB8",skyMid:"#5FC9DC",skyHorizon:"#DFF6E4",skyGround:"#2FA0A8",fog:"#8FE0D8",fogNear:260,fogFar:860,sunColor:"#EAFFE0",sunGlow:.7,hemiSky:"#CFF6E8",hemiGround:"#1E8C90",hemiIntensity:.86,keyIntensity:.62,envIntensity:1.22,exposure:.88,surfaceDeep:"#0B6E74",surfaceShallow:"#7FF0D8",surfaceWave:.7,surfaceCaustic:2,surfaceFresnel:2.6,surfaceSpec:1.4,puffColor:"#CFF2D8",spireColor:"#9CEFC8",beadColor:"#E8FFF0",shardColor:"#D8FBE8",moteColor:"#EAFFF4",moteRise:6.4,moteSize:.9,moteOpacity:.6,veilColor:"#E8FFE0",veilOpacity:1.2,veilTilt:-.06,veilWidth:.7,veilHeight:1.4,accent:"#5FE8C0",streamColor:"#A8FFDC",gateColor:"#9CFFD0"},{hazard:"kelp",decor:"kelpbank"}),gt("Deepglow",.45,{skyTop:"#12558F",skyMid:"#2E93C4",skyHorizon:"#8FE8E0",skyGround:"#155F86",fog:"#4FA8C8",fogNear:200,fogFar:760,sunColor:"#BFFAF0",sunGlow:.44,hemiSky:"#8FE0F0",hemiGround:"#134F7A",hemiIntensity:.92,keyIntensity:.44,envIntensity:1.3,exposure:1.04,surfaceDeep:"#062C4E",surfaceShallow:"#3FD8E8",surfaceWave:.45,surfaceCaustic:1.6,surfaceFresnel:4.4,surfaceSpec:2,puffColor:"#8FE8E8",spireColor:"#5FD8E0",beadColor:"#DFFCFF",shardColor:"#A8ECFA",moteColor:"#B8FFF0",moteRise:5.2,moteSize:1.15,moteOpacity:.7,veilColor:"#8CF0FF",veilOpacity:1.3,veilTilt:-.04,veilWidth:.55,veilHeight:1.6,accent:"#4FE0FF",streamColor:"#7FF0FF",gateColor:"#7FE8FF"},{hazard:"jelly",decor:"jellybank"})]},{key:"zephyr",name:"Zephyr Terrace",tier:"base",blurb:"Warm banded stone, then nothing but lift.",signature:{gate:"blade",orb:"petal",portal:"sunwheel",weather:"petals"},strata:[gt("Terrace",.35,{skyTop:"#3E86C8",skyMid:"#8FC4E8",skyHorizon:"#FFE6C4",skyGround:"#C89A72",fog:"#E0C4A8",fogNear:420,fogFar:1400,sunColor:"#FFEFC0",sunGlow:.92,hemiSky:"#DCEBFA",hemiGround:"#C09068",hemiIntensity:.66,keyIntensity:.96,envIntensity:1.05,exposure:.9,surfaceDeep:"#2E7E88",surfaceShallow:"#8FE8E0",surfaceWave:.22,surfaceCaustic:.6,surfaceFresnel:5,surfaceSpec:2.4,puffColor:"#FFE8CC",spireColor:"#E8C49C",beadColor:"#FFF4E0",shardColor:"#F2D8B8",moteColor:"#FFE8C0",moteRise:3,moteSize:.7,moteOpacity:.45,veilColor:"#FFE4B8",veilOpacity:.7,veilTilt:-.62,veilWidth:1.4,veilHeight:.8,accent:"#FFC98C",streamColor:"#FFD9A0",gateColor:"#FFCE94"},{hazard:"obelisk",decor:"duneband"}),gt("Updraft",0,{skyTop:"#1E63B8",skyMid:"#6FB0EC",skyHorizon:"#EAF4FF",skyGround:"#B8D8F0",fog:"#CFE6FA",fogNear:520,fogFar:1700,sunColor:"#FFFAE0",sunGlow:1.05,hemiSky:"#EAF6FF",hemiGround:"#A8CCEC",hemiIntensity:.62,keyIntensity:1.02,envIntensity:1.1,exposure:.88,puffColor:"#F4FAFF",spireColor:"#DCEEFF",beadColor:"#F0F8FF",shardColor:"#E4F2FF",moteColor:"#FFFFFF",moteRise:9.5,moteSize:.85,moteOpacity:.5,veilColor:"#EAF2FF",veilOpacity:.6,veilTilt:-.9,veilWidth:.8,veilHeight:1.5,accent:"#8CC8FF",streamColor:"#BFE4FF",gateColor:"#A8DCFF"},{hazard:"driftwood",decor:"skybank"})]},{key:"mycelia",name:"Mycelia Hollow",tier:"base",blurb:"Warm hollow under enormous caps, then out on top of them.",signature:{gate:"round",orb:"droplet",portal:"bloom",weather:"pollen"},strata:[gt("Hollow",.55,{skyTop:"#7A5C9E",skyMid:"#C48FB8",skyHorizon:"#FFD8C0",skyGround:"#8E6AA0",fog:"#D8A8B8",fogNear:240,fogFar:820,sunColor:"#FFD9B8",sunGlow:.66,hemiSky:"#F0C8D8",hemiGround:"#7A5A88",hemiIntensity:.88,keyIntensity:.54,envIntensity:1.16,exposure:1.02,surfaceDeep:"#4A3A6E",surfaceShallow:"#E8B0C8",surfaceWave:.18,surfaceCaustic:1.1,surfaceFresnel:5.4,surfaceSpec:2.2,puffColor:"#F2C8D8",spireColor:"#FFC0A8",beadColor:"#FFE8E0",shardColor:"#E8CCF0",moteColor:"#FFE0C0",moteRise:-.8,moteSize:1.1,moteOpacity:.62,veilColor:"#FFC8B0",veilOpacity:1.1,veilTilt:.1,veilWidth:.5,veilHeight:1.5,accent:"#FF9EC0",streamColor:"#FFC0D8",gateColor:"#FFB0C8"},{hazard:"spore",decor:"sporebank"}),gt("Canopy",0,{skyTop:"#2E8E82",skyMid:"#7FD0B0",skyHorizon:"#FFE8C8",skyGround:"#4E9E7A",fog:"#A8DCC0",fogNear:360,fogFar:1120,sunColor:"#FFF2C8",sunGlow:.88,hemiSky:"#DFF4D8",hemiGround:"#3E8A6E",hemiIntensity:.72,keyIntensity:.86,envIntensity:1.08,exposure:.96,puffColor:"#FFC8B0",spireColor:"#B8E8A8",beadColor:"#FFF0DC",shardColor:"#D8F0C8",moteColor:"#FFEFC0",moteRise:-2.4,moteSize:1.25,moteOpacity:.55,veilColor:"#EFFFC8",veilOpacity:.9,veilTilt:-.2,veilWidth:1.1,veilHeight:1.2,accent:"#FFB08C",streamColor:"#CFFFB8",gateColor:"#B8F0A0"},{hazard:"bloom",decor:"bloombank"})]},{key:"meridian",name:"Meridian Works",tier:"base",blurb:"Cool chrome, warm brass, and steam off a mirrored floor.",signature:{gate:"hex",orb:"ember",portal:"monolith",weather:"sparks"},strata:[gt("Works",.7,{skyTop:"#3A6E9E",skyMid:"#8FB4C8",skyHorizon:"#FFE0B0",skyGround:"#6E7E8E",fog:"#BACFE0",fogNear:300,fogFar:940,sunColor:"#FFDCA0",sunGlow:.8,hemiSky:"#DFEAF0",hemiGround:"#5E6E7E",hemiIntensity:.7,keyIntensity:.9,envIntensity:1.35,exposure:.9,surfaceDeep:"#26485E",surfaceShallow:"#8FC8D8",surfaceWave:.1,surfaceCaustic:.4,surfaceFresnel:6,surfaceSpec:3.2,puffColor:"#E0E8EC",spireColor:"#FFC98C",beadColor:"#F0F6F8",shardColor:"#CFE0E8",moteColor:"#FFE4B8",moteRise:5.6,moteSize:.65,moteOpacity:.5,veilColor:"#FFE0B0",veilOpacity:.85,veilTilt:-.44,veilWidth:.9,veilHeight:1.1,accent:"#FFB861",streamColor:"#FFD08C",gateColor:"#FFC070"},{hazard:"gear",decor:"gearbank"}),gt("Foundry",.95,{skyTop:"#25506E",skyMid:"#5E90A8",skyHorizon:"#FFCE8C",skyGround:"#3E5E70",fog:"#9CB4BE",fogNear:260,fogFar:860,sunColor:"#FFC878",sunGlow:1.05,hemiSky:"#CFE0E4",hemiGround:"#3A5A6E",hemiIntensity:.66,keyIntensity:.98,envIntensity:1.42,exposure:.92,surfaceDeep:"#1A3648",surfaceShallow:"#FFB870",surfaceWave:.3,surfaceCaustic:1.3,surfaceFresnel:3.2,surfaceSpec:3.4,puffColor:"#D8E4E8",spireColor:"#FFB068",beadColor:"#FFE0B8",shardColor:"#BFD8E0",moteColor:"#FFC070",moteRise:8.2,moteSize:.55,moteOpacity:.7,veilColor:"#FFBE78",veilOpacity:1.25,veilTilt:-.52,veilWidth:.75,veilHeight:1.3,accent:"#FF9E4C",streamColor:"#FFC482",gateColor:"#FFB45C"},{hazard:"ember",decor:"emberbank"})]},{key:"cascade",name:"Cascade Steps",tier:"base",blurb:"Water falling all the way down, lit from behind.",signature:{gate:"ripple",orb:"bead",portal:"arch",weather:"rain"},strata:[gt("Spray",.3,{skyTop:"#2E7FBC",skyMid:"#7FC8E4",skyHorizon:"#E4F6E0",skyGround:"#5AA898",fog:"#B4E0D4",fogNear:320,fogFar:940,sunColor:"#FFF4D0",sunGlow:1.02,hemiSky:"#DCF4EC",hemiGround:"#4A8E80",hemiIntensity:.8,keyIntensity:.86,envIntensity:1.14,exposure:.9,surfaceDeep:"#1E6E6E",surfaceShallow:"#BFF4E4",surfaceWave:.9,surfaceCaustic:1.5,surfaceFresnel:3,surfaceSpec:2.2,puffColor:"#EAF8F0",spireColor:"#9CD8B8",beadColor:"#F0FFF8",shardColor:"#DCF4EC",moteColor:"#F0FFFA",moteRise:6.8,moteSize:.8,moteOpacity:.5,veilColor:"#E8FFD8",veilOpacity:1.2,veilTilt:-.12,veilWidth:1.2,veilHeight:1.3,accent:"#7FE8B0",streamColor:"#CFFFE8",gateColor:"#A8F0D8"},{hazard:"driftwood",decor:"grovebank"}),gt("Basin",1,{skyTop:"#1E6E8E",skyMid:"#4FA8B0",skyHorizon:"#CFF0C8",skyGround:"#2E7E6E",fog:"#7FC4B0",fogNear:260,fogFar:860,sunColor:"#EAFFD8",sunGlow:.72,hemiSky:"#C8EFD0",hemiGround:"#206458",hemiIntensity:.86,keyIntensity:.64,envIntensity:1.2,exposure:.96,surfaceDeep:"#084A48",surfaceShallow:"#4FD8A8",surfaceWave:.34,surfaceCaustic:1.7,surfaceFresnel:4.6,surfaceSpec:2.4,puffColor:"#CFEFD8",spireColor:"#6FD0A8",beadColor:"#E8FFEC",shardColor:"#C8EEDC",moteColor:"#E8FFF0",moteRise:5.6,moteSize:1,moteOpacity:.6,veilColor:"#CFFFD8",veilOpacity:1.1,veilTilt:-.02,veilWidth:.6,veilHeight:1.5,accent:"#4FE0A8",streamColor:"#8CFFC8",gateColor:"#7FF0C0"},{hazard:"kelp",decor:"kelpbank"})]},{key:"windward",name:"Windward Blue",tier:"base",blurb:"Deep blue, a long swell, and no land in any direction.",signature:{gate:"blade",orb:"droplet",portal:"monolith",weather:"sparks"},strata:[gt("Tradewind",.6,{skyTop:"#0B4FA8",skyMid:"#2E90DC",skyHorizon:"#CFEFFF",skyGround:"#1C6EB0",fog:"#8FC8EC",fogNear:440,fogFar:1300,sunColor:"#FFF8D8",sunGlow:1,hemiSky:"#CFE8FF",hemiGround:"#1E6AA8",hemiIntensity:.66,keyIntensity:1,envIntensity:1.08,exposure:.9,surfaceDeep:"#04356E",surfaceShallow:"#46B8E8",surfaceWave:1.3,surfaceCaustic:.7,surfaceFresnel:3,surfaceSpec:2.2,puffColor:"#FFFFFF",spireColor:"#BFE4FF",beadColor:"#EAF8FF",shardColor:"#CFE8FF",moteColor:"#FFFFFF",moteRise:3.6,moteSize:.8,moteOpacity:.45,veilColor:"#DFF2FF",veilOpacity:.8,veilTilt:-.46,veilWidth:1.3,veilHeight:1.1,accent:"#4FC8FF",streamColor:"#A8E4FF",gateColor:"#8CD8FF"},{hazard:"cloud",decor:"skybank"}),gt("Swell",1,{skyTop:"#063F92",skyMid:"#2079C8",skyHorizon:"#A8E8F0",skyGround:"#0E5A9E",fog:"#6FB0DC",fogNear:380,fogFar:1150,sunColor:"#FFF0C0",sunGlow:1.08,hemiSky:"#B8E4FA",hemiGround:"#0B4F86",hemiIntensity:.7,keyIntensity:.96,envIntensity:1.16,exposure:.92,surfaceDeep:"#02264F",surfaceShallow:"#2FD8DC",surfaceWave:1.6,surfaceCaustic:1.1,surfaceFresnel:2.4,surfaceSpec:2,puffColor:"#F0F8FF",spireColor:"#8FD8F0",beadColor:"#E0F6FF",shardColor:"#BFE8FA",moteColor:"#FFFFFF",moteRise:7.2,moteSize:.95,moteOpacity:.55,veilColor:"#CFEEFF",veilOpacity:.9,veilTilt:-.74,veilWidth:1.5,veilHeight:.9,accent:"#2FD8D8",streamColor:"#7FF0F0",gateColor:"#5FE4EC"},{hazard:"jelly",decor:"jellybank"})]},{key:"nacre",name:"Nacre Drift",tier:"base",blurb:"Shell-light, and everything one film thick.",signature:{gate:"petal",orb:"bead",portal:"bloom",weather:"bubbles"},strata:[gt("Film",.2,{skyTop:"#6E96C8",skyMid:"#B4CCE4",skyHorizon:"#FFE4DC",skyGround:"#B8A8CC",fog:"#DCD0E4",fogNear:340,fogFar:1e3,sunColor:"#FFF0E0",sunGlow:.92,hemiSky:"#F4E8F0",hemiGround:"#A898C0",hemiIntensity:.82,keyIntensity:.7,envIntensity:1.28,exposure:.88,surfaceDeep:"#7A88B8",surfaceShallow:"#FFDCE8",surfaceWave:.12,surfaceCaustic:.9,surfaceFresnel:6.6,surfaceSpec:3,puffColor:"#FFE8F0",spireColor:"#C8F0E0",beadColor:"#FFF4EC",shardColor:"#DCE8FF",moteColor:"#FFEAF4",moteRise:2.4,moteSize:1.3,moteOpacity:.6,veilColor:"#C8F0DC",veilOpacity:1,veilTilt:-.36,veilWidth:1.6,veilHeight:1,accent:"#FFB8D0",streamColor:"#C8F0E8",gateColor:"#E8C8F0"},{hazard:"shard",decor:"prismbank"}),gt("Pearl",.75,{skyTop:"#9C8CC0",skyMid:"#D8C0D0",skyHorizon:"#FFF0D8",skyGround:"#C8A8B8",fog:"#E8D0D0",fogNear:300,fogFar:920,sunColor:"#FFF6D8",sunGlow:1,hemiSky:"#FFEEE0",hemiGround:"#A890B0",hemiIntensity:.86,keyIntensity:.66,envIntensity:1.36,exposure:.88,surfaceDeep:"#6E6EA8",surfaceShallow:"#FFE8C8",surfaceWave:.08,surfaceCaustic:.6,surfaceFresnel:7,surfaceSpec:3.4,puffColor:"#FFEEE4",spireColor:"#BFF0E8",beadColor:"#FFF8EC",shardColor:"#E8DCFF",moteColor:"#FFFFFF",moteRise:1.6,moteSize:.9,moteOpacity:.75,veilColor:"#A8F0E0",veilOpacity:1.15,veilTilt:1.05,veilWidth:1.8,veilHeight:.6,accent:"#FFC8A8",streamColor:"#FFE0C8",gateColor:"#FFD8E8"},{hazard:"bloom",decor:"bloombank"})]},{key:"halcyon",name:"Halcyon Court",tier:"base",blurb:"White stone, cyan glass, and fountains that never stop.",signature:{gate:"round",orb:"star",portal:"lattice",weather:"sparks"},strata:[gt("Concourse",.45,{skyTop:"#1E7ABF",skyMid:"#6FB8E4",skyHorizon:"#EAF6FF",skyGround:"#9CC8DC",fog:"#C8E4F2",fogNear:400,fogFar:1200,sunColor:"#FFF8E4",sunGlow:.96,hemiSky:"#EAF6FF",hemiGround:"#9CBCCC",hemiIntensity:.72,keyIntensity:.92,envIntensity:1.22,exposure:.88,surfaceDeep:"#2E7E9E",surfaceShallow:"#A8ECF4",surfaceWave:.12,surfaceCaustic:.8,surfaceFresnel:6,surfaceSpec:3.2,puffColor:"#F4FBFF",spireColor:"#A8E4F0",beadColor:"#F8FDFF",shardColor:"#CFEEFA",moteColor:"#FFFFFF",moteRise:4.2,moteSize:.6,moteOpacity:.55,veilColor:"#E8F8FF",veilOpacity:.85,veilTilt:-.3,veilWidth:.8,veilHeight:1.3,accent:"#4FD8F0",streamColor:"#A8F0FF",gateColor:"#7FE8FF"},{hazard:"pylon",decor:"atriumbank"}),gt("Fountain",.95,{skyTop:"#1466B0",skyMid:"#4FA8E0",skyHorizon:"#DFF4F0",skyGround:"#2E86AE",fog:"#A8DCEC",fogNear:340,fogFar:1050,sunColor:"#FFFAEC",sunGlow:1.06,hemiSky:"#DFF4FF",hemiGround:"#2E7E9E",hemiIntensity:.78,keyIntensity:.88,envIntensity:1.3,exposure:.9,surfaceDeep:"#0E5A7E",surfaceShallow:"#7FE8F0",surfaceWave:.45,surfaceCaustic:1.6,surfaceFresnel:4.2,surfaceSpec:3,puffColor:"#EAFAFF",spireColor:"#CFF4FA",beadColor:"#FAFEFF",shardColor:"#DFF6FF",moteColor:"#FFFFFF",moteRise:6.6,moteSize:.55,moteOpacity:.62,veilColor:"#EAFFFC",veilOpacity:1.1,veilTilt:-.1,veilWidth:.7,veilHeight:1.4,accent:"#2FD0E8",streamColor:"#8CF4FF",gateColor:"#5FE0F8"},{hazard:"crystal",decor:"monolithbank"})]},{key:"solarbloom",name:"Solar Bloom",tier:"realm",blurb:"Endless golden hour. Molten chrome, heavy flare.",signature:{gate:"round",orb:"ember",portal:"sunwheel",weather:"embers"},strata:[gt("Gold",0,{skyTop:"#B85E20",skyMid:"#F0A048",skyHorizon:"#FFEBC0",skyGround:"#C87838",fog:"#F0C088",fogNear:360,fogFar:1080,sunColor:"#FFF0B0",sunGlow:1.25,hemiSky:"#FFE8B8",hemiGround:"#B06A30",hemiIntensity:.72,keyIntensity:.92,envIntensity:1.2,exposure:.88,puffColor:"#FFDCA8",spireColor:"#FFC878",beadColor:"#FFEED0",shardColor:"#FFE0B0",moteColor:"#FFE0A0",moteRise:2.2,veilColor:"#FFDFA0",veilOpacity:1.4,veilTilt:-.34,accent:"#FFC24C",streamColor:"#FFDE8C",gateColor:"#FFD470"},{hazard:"cloud",decor:"skybank"}),gt("Ember",.9,{skyTop:"#A8481E",skyMid:"#F08850",skyHorizon:"#FFE0B0",skyGround:"#B85A28",fog:"#E8A468",fogNear:320,fogFar:1e3,sunColor:"#FFF4C8",sunGlow:1.35,hemiSky:"#FFDCA0",hemiGround:"#9C4A1E",hemiIntensity:.74,keyIntensity:.88,envIntensity:1.28,exposure:.86,surfaceDeep:"#8A3A18",surfaceShallow:"#FFC070",surfaceWave:.55,surfaceCaustic:.8,surfaceFresnel:4,surfaceSpec:2.8,puffColor:"#FFCE90",spireColor:"#FFB060",shardColor:"#FFD8A0",moteColor:"#FFCE80",moteRise:3.4,veilColor:"#FFCE88",veilOpacity:1.2,accent:"#FF9E3C",streamColor:"#FFC868",gateColor:"#FFBC50"},{hazard:"crystal",decor:"emberbank"})]},{key:"glacies",name:"Glacier Veil",tier:"realm",blurb:"Pale cold light, a rose horizon, and a lake that stopped moving.",signature:{gate:"hex",orb:"star",portal:"arch",weather:"snow"},strata:[gt("Veil",.25,{skyTop:"#5A88C8",skyMid:"#A4CBEC",skyHorizon:"#F6DFE8",skyGround:"#8FB4D8",fog:"#D2E4F4",fogNear:300,fogFar:1300,sunColor:"#FFEAF2",sunGlow:.72,hemiSky:"#E8F2FF",hemiGround:"#8CAECC",hemiIntensity:.8,keyIntensity:.7,envIntensity:1.18,exposure:.84,surfaceDeep:"#2E6E9E",surfaceShallow:"#B8ECFA",surfaceWave:.16,surfaceCaustic:.9,surfaceFresnel:6.2,surfaceSpec:2.6,puffColor:"#EAF4FF",spireColor:"#BFE6FA",beadColor:"#F4FAFF",shardColor:"#DCEEFF",moteColor:"#FFFFFF",moteRise:-3.6,moteSize:.9,moteOpacity:.68,veilColor:"#DCE8FF",veilOpacity:.75,veilTilt:-1.02,veilWidth:1.6,veilHeight:.7,accent:"#8CD8F0",streamColor:"#CFF0FF",gateColor:"#BFE8FF"},{hazard:"monolith",decor:"monolithbank"}),gt("Frost",.75,{skyTop:"#3E6EB8",skyMid:"#7FB0E0",skyHorizon:"#DFF6F0",skyGround:"#5E8CC0",fog:"#B0D8E8",fogNear:340,fogFar:1500,sunColor:"#EAF8FF",sunGlow:.58,hemiSky:"#DFF4FF",hemiGround:"#5A88B8",hemiIntensity:.84,keyIntensity:.66,envIntensity:1.3,exposure:.86,surfaceDeep:"#1C4E86",surfaceShallow:"#A8F0EC",surfaceWave:.06,surfaceCaustic:.3,surfaceFresnel:7,surfaceSpec:3.4,puffColor:"#DCEEFA",spireColor:"#A8E8F0",beadColor:"#EAFAFF",shardColor:"#C8ECFF",moteColor:"#EAFCFF",moteRise:-1.2,moteSize:.6,moteOpacity:.8,veilColor:"#BFEFEA",veilOpacity:1.15,veilTilt:1.24,veilWidth:1.9,veilHeight:.55,accent:"#6FE0DC",streamColor:"#A8F4FF",gateColor:"#8CEEF0"},{hazard:"shard",decor:"prismbank"})]},{key:"nocturne",name:"Nocturne Bloom",tier:"realm",blurb:"A lantern garden that opens after the light goes.",signature:{gate:"petal",orb:"ember",portal:"bloom",weather:"petals"},strata:[gt("Dusklight",.5,{skyTop:"#2A2F6E",skyMid:"#5F63AC",skyHorizon:"#F2BCC8",skyGround:"#3A3B78",fog:"#8E86C0",fogNear:260,fogFar:900,sunColor:"#FFC8D8",sunGlow:.9,hemiSky:"#C4BCEC",hemiGround:"#3E3C7C",hemiIntensity:.78,keyIntensity:.56,envIntensity:1.16,exposure:1.1,surfaceDeep:"#1C1E52",surfaceShallow:"#8E82D8",surfaceWave:.24,surfaceCaustic:.6,surfaceFresnel:5.6,surfaceSpec:2.9,puffColor:"#D8C4E8",spireColor:"#F0B0C8",beadColor:"#FFE0EC",shardColor:"#CFC0F0",moteColor:"#FFD8B0",moteRise:1.8,moteSize:.9,moteOpacity:.72,veilColor:"#C8A8F0",veilOpacity:.9,veilTilt:-.24,veilWidth:1.2,veilHeight:1.2,accent:"#FFAECF",streamColor:"#FFC8E8",gateColor:"#FFBCDC"},{hazard:"bloom",decor:"lanternbank"}),gt("Lantern",.95,{skyTop:"#1E2A5E",skyMid:"#3E5A96",skyHorizon:"#FFD8A8",skyGround:"#26356E",fog:"#6E7CB0",fogNear:220,fogFar:820,sunColor:"#FFDCA0",sunGlow:1.1,hemiSky:"#A8B8E8",hemiGround:"#28376E",hemiIntensity:.82,keyIntensity:.48,envIntensity:1.24,exposure:1.12,surfaceDeep:"#101A46",surfaceShallow:"#FFC890",surfaceWave:.12,surfaceCaustic:.5,surfaceFresnel:6.4,surfaceSpec:3.3,puffColor:"#C8C0E8",spireColor:"#FFC08C",beadColor:"#FFE8C8",shardColor:"#BFC8F0",moteColor:"#FFD08C",moteRise:2.6,moteSize:1.15,moteOpacity:.85,veilColor:"#FFC08C",veilOpacity:1,veilTilt:.06,veilWidth:.6,veilHeight:1.4,accent:"#FFB874",streamColor:"#FFD8A0",gateColor:"#FFC888"},{hazard:"lantern",decor:"bloombank"})]}],Q1=Object.fromEntries(li.map(n=>[n.key,n])),pd=li.filter(n=>n.tier==="base"),eM=li.filter(n=>n.tier==="realm"),tM=6;cu=[{key:"clear",name:"Clear",weight:3,mul:{}},{key:"golden",name:"Golden",weight:2,mul:{sunGlow:1.38,fogFar:1.12,exposure:.96,keyIntensity:1.08},tint:{sunColor:["#FFD98C",.42],fog:["#F2CE9A",.22]}},{key:"misty",name:"Misty",weight:2,mul:{fogNear:.42,fogFar:.6,sunGlow:.62,hemiIntensity:1.14,keyIntensity:.86},tint:{fog:["#E8F4F8",.3]}},{key:"crisp",name:"Crisp",weight:2,mul:{fogNear:1.45,fogFar:1.38,envIntensity:1.12,keyIntensity:1.1,exposure:.97}},{key:"bloom",name:"Radiant",weight:1,mul:{sunGlow:1.22,envIntensity:1.18,exposure:1.05,hemiIntensity:1.08},tint:{sunColor:["#FFFFFF",.3]}},{key:"glassy",name:"Glassy",weight:2,mul:{surfaceWave:.32,surfaceCaustic:.72,surfaceFresnel:1.22,surfaceSpec:1.35,envIntensity:1.1,fogFar:1.06}},{key:"windborne",name:"Windborne",weight:2,mul:{moteRise:1.85,moteSize:1.18,moteOpacity:1.12,veilWidth:1.3,veilHeight:.82,fogNear:.88}},{key:"afterglow",name:"Afterglow",weight:1,mul:{sunGlow:1.14,keyIntensity:.86,hemiIntensity:.94,exposure:1.06,fogNear:.86},tint:{sunColor:["#FFC0D8",.34],fog:["#E8B8D0",.22],skyHorizon:["#FFD0DC",.2]}}],iM=Object.fromEntries(cu.map(n=>[n.key,n]));Pm=new Map});function Um(n,{pixelRatioCap:e=2,antialias:t=!0}={}){let i=new Xr({canvas:n,antialias:t,powerPreference:"high-performance",stencil:!1});i.setPixelRatio(Math.min(window.devicePixelRatio||1,e)),i.setSize(window.innerWidth,window.innerHeight,!1),i.outputColorSpace=Kt,i.toneMapping=ts,i.toneMappingExposure=hu;let s=new ji;s.fog=new No(new le(Yt.fog),Yt.fogNear,Yt.fogFar);let r=new nn(64,window.innerWidth/Math.max(1,window.innerHeight),.5,_d*1.6);r.position.set(0,3,14),s.add(r);let o=new ws(i);o.compileEquirectangularShader();let a=o.fromScene(new Zr,.04);s.environment=a.texture,s.environmentIntensity=Yt.envIntensity,o.dispose();let l=new $s(new le(Yt.hemiSky),new le(Yt.hemiGround),Yt.hemiIntensity);s.add(l);let c=new es(new le("#FFF6DC"),Yt.keyIntensity);c.position.copy(Ca).multiplyScalar(120),s.add(c);let u=new es(new le("#8FD8F2"),.24);u.position.set(-60,-30,70),s.add(u);let d={uTop:{value:new le(Yt.skyTop)},uMid:{value:new le(Yt.skyMid)},uHorizon:{value:new le(Yt.skyHorizon)},uGround:{value:new le(Yt.skyGround)},uSunColor:{value:new le(Yt.sunColor)},uSunDir:{value:Ca.clone()},uSunGlow:{value:Yt.sunGlow}},h=new Xe(new hn(_d,32,20),new ut({uniforms:d,vertexShader:aM,fragmentShader:lM,side:Xt,depthWrite:!1,fog:!1}));h.renderOrder=-1e3,h.frustumCulled=!1,s.add(h);let g=new Bt(new Dt({map:bm(),color:16777215,blending:ct,depthTest:!1,depthWrite:!1,transparent:!0,fog:!1}));g.scale.setScalar(190),g.renderOrder=-900,g.frustumCulled=!1,s.add(g);let v=cM(r),S=hM(r),p=new N,f=new N,b={...Yt},_=!0;function m(X,B=1){B>=1?(d.uTop.value.set(X.skyTop),d.uMid.value.set(X.skyMid),d.uHorizon.value.set(X.skyHorizon),d.uGround.value.set(X.skyGround),d.uSunColor.value.set(X.sunColor),s.fog.color.set(X.fog),l.color.set(X.hemiSky),l.groundColor.set(X.hemiGround),d.uSunGlow.value=X.sunGlow,s.fog.near=X.fogNear,s.fog.far=X.fogFar,l.intensity=X.hemiIntensity,c.intensity=X.keyIntensity,s.environmentIntensity=X.envIntensity,x=X.exposure??1):(d.uTop.value.lerp(I(X.skyTop),B),d.uMid.value.lerp(I(X.skyMid),B),d.uHorizon.value.lerp(I(X.skyHorizon),B),d.uGround.value.lerp(I(X.skyGround),B),d.uSunColor.value.lerp(I(X.sunColor),B),s.fog.color.lerp(I(X.fog),B),l.color.lerp(I(X.hemiSky),B),l.groundColor.lerp(I(X.hemiGround),B),d.uSunGlow.value=st(d.uSunGlow.value,X.sunGlow,B),s.fog.near=st(s.fog.near,X.fogNear,B),s.fog.far=st(s.fog.far,X.fogFar,B),l.intensity=st(l.intensity,X.hemiIntensity,B),c.intensity=st(c.intensity,X.keyIntensity,B),s.environmentIntensity=st(s.environmentIntensity,X.envIntensity,B),x=st(x,X.exposure??1,B)),w(),Object.assign(b,X)}let E=1,x=1;function w(){i.toneMappingExposure=hu*E*x}function y(X){E=$e(X,.5,1.6),w()}let T=new le;function I(X){return T.set(X)}function P(X,B){h.position.copy(r.position),p.copy(Ca).multiplyScalar(_d*.7).add(r.position),g.position.copy(p),uM(v,r,p,f),_&&dM(S,B)}function L(){let X=window.innerWidth,B=Math.max(1,window.innerHeight);r.aspect=X/B,r.updateProjectionMatrix(),i.setSize(X,B,!1)}function z(X){i.setPixelRatio(Math.min(window.devicePixelRatio||1,X)),i.setSize(window.innerWidth,window.innerHeight,!1)}function $(X){_=X,S.group.visible=X}function V(){a.dispose(),h.geometry.dispose(),h.material.dispose(),i.dispose()}return{renderer:i,scene:s,camera:r,sky:h,sun:g,hemi:l,key:c,rim:u,palette:b,applyPalette:m,setExposure:y,update:P,resize:L,setPixelRatioCap:z,setBokehEnabled:$,dispose:V,get exposure(){return i.toneMappingExposure}}}function cM(n){let e=new Ut;e.frustumCulled=!1,n.add(e);let i=[{k:-.22,size:.34,color:"#FFE985",tex:"ring",op:.34},{k:.28,size:.2,color:"#C9A9F0",tex:"ring",op:.3},{k:.52,size:.42,color:"#8CD867",tex:"ring",op:.2},{k:.78,size:.26,color:"#4FC3E8",tex:"glow",op:.3},{k:1.08,size:.58,color:"#FFD24C",tex:"ring",op:.16},{k:1.42,size:.3,color:"#C9A9F0",tex:"glow",op:.18}].map(r=>{let o=r.tex==="ring"?Mm(r.color):Qs(r.color),a=new Bt(new Dt({map:o,color:new le(r.color),blending:ct,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0,fog:!1}));return a.frustumCulled=!1,a.renderOrder=4e3,e.add(a),{sprite:a,spec:r}}),s=new Bt(new Dt({map:Sm("#FFE985"),color:new le("#FFF3C4"),blending:ct,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0,fog:!1}));return s.frustumCulled=!1,s.renderOrder=4001,e.add(s),{group:e,ghosts:i,streak:s}}function uM(n,e,t,i){i.copy(t).project(e);let s=i.z>1,r=Math.hypot(i.x,i.y),o=s?0:$e(1.25-r*.62,0,1);if(o<=.001){for(let{sprite:u}of n.ghosts)u.material.opacity=0;n.streak.material.opacity=0;return}let a=12,l=2*Math.tan(e.fov*Math.PI/360)*a,c=l*e.aspect;for(let{sprite:u,spec:d}of n.ghosts){u.position.set(-i.x*d.k*c/2,-i.y*d.k*l/2,-a);let h=d.size*l*.16;u.scale.set(h,h,1),u.material.opacity=d.op*o}n.streak.position.set(i.x*c/2,i.y*l/2,-a),n.streak.scale.set(c*.72,l*.045,1),n.streak.material.opacity=.15*o}function hM(n){let e=new Ut;e.frustumCulled=!1,n.add(e);let t=["#FFFFFF","#FFE985","#C9A9F0","#3FD1C0","#A9E4F5"],i=[];for(let s=0;s<14;s++){let r=t[s%t.length],o=new Bt(new Dt({map:Qs(r),color:new le(r),blending:ct,transparent:!0,depthTest:!1,depthWrite:!1,opacity:.05+Math.random()*.07,fog:!1}));o.frustumCulled=!1,o.renderOrder=3900;let a=.7+Math.random()*2.4;o.scale.set(a,a,1),e.add(o),i.push({sprite:o,ax:(Math.random()-.5)*9,ay:(Math.random()-.5)*6,sx:.03+Math.random()*.07,sy:.02+Math.random()*.06,px:Math.random()*Math.PI*2,py:Math.random()*Math.PI*2,z:-6-Math.random()*5})}return{group:e,discs:i}}function dM(n,e){for(let t of n.discs)t.sprite.position.set(t.ax+Math.sin(e*t.sx+t.px)*2.2,t.ay+Math.cos(e*t.sy+t.py)*1.6,t.z)}function Kr({color:n="#F2F6F8",cheap:e=!1,opacity:t=.42}={}){return e?new xn({color:new le(n),metalness:.1,roughness:.18,transparent:!0,opacity:t,envMapIntensity:1.4}):new Cn({color:new le(n),metalness:0,roughness:.08,transmission:1,thickness:.5,ior:1.4,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.5,transparent:!0,opacity:1})}function An({color:n="#EAF2F6",roughness:e=.09}={}){return new Cn({color:new le(n),metalness:1,roughness:e,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.6})}function vd({color:n="#4FC3E8",emissive:e="#0B4763",emissiveIntensity:t=.12}={}){return new Cn({color:new le(n),metalness:0,roughness:.3,clearcoat:1,clearcoatRoughness:.1,emissive:new le(e),emissiveIntensity:t,envMapIntensity:1.1})}var Ca,_d,aM,lM,Yt,hu,tr=Kn(()=>{$t();hd();is();zt();er();Ca=new N(.34,.42,-1).normalize(),_d=1600,aM=`
  varying vec3 vDir;
  void main() {
    // The dome is a unit-ish sphere centred on the camera each frame, so the
    // local vertex position doubles as the view direction.
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,lM=`
  uniform vec3  uTop;       // zenith
  uniform vec3  uMid;       // the dominant blue most of the screen sees
  uniform vec3  uHorizon;   // bright pale band right at eye level
  uniform vec3  uGround;    // below the horizon (cloud sea / deep water)
  uniform vec3  uSunColor;
  uniform vec3  uSunDir;
  uniform float uSunGlow;
  varying vec3  vDir;

  void main() {
    float h = vDir.y; // -1 (straight down) .. +1 (straight up)

    // Above the horizon the pale band has to stay *narrow*. Spreading it
    // across the upper hemisphere is what turns the whole frame into milk \u2014
    // the blue needs to take over within a few degrees of eye level.
    vec3 up = mix(uHorizon, uMid, smoothstep(0.010, 0.115, h));
    up = mix(up, uTop, smoothstep(0.11, 0.72, h));

    // Below it, sink from the same glow into the denser ground tone.
    vec3 dn = mix(uHorizon, uGround, smoothstep(0.0, -0.28, h));

    // Narrow cross-fade keeps a crisp horizon without an aliased hard edge.
    vec3 col = mix(dn, up, smoothstep(-0.014, 0.014, h));

    // Sun halo: a tight core plus two progressively wider skirts. Layering
    // three powers gives the bloomy "backlit haze" of a 2000s sky render
    // without needing an actual light-scattering model.
    float d = max(dot(vDir, normalize(uSunDir)), 0.0);
    float halo = pow(d, 350.0) * 3.2 + pow(d, 30.0) * 0.34 + pow(d, 7.0) * 0.05;
    col += uSunColor * halo * uSunGlow;

    gl_FragColor = vec4(col, 1.0);
  }
`,Yt={...md},hu=.86});var Gt={};nl(Gt,{DEFAULT_SAVE:()=>As,DROPLET_RATES:()=>Bi,EPIC_PRISM_CHANCE:()=>Sd,MAX_LEVEL:()=>Fa,canAfford:()=>kn,clearSave:()=>Td,earnDroplets:()=>_u,earnPrisms:()=>Ad,levelFromXp:()=>pn,levelProgress:()=>Ia,loadMeta:()=>Rt,loadSave:()=>wd,settleRun:()=>Rd,spend:()=>Cd,unlockRealm:()=>bM,unlockWorld:()=>Fd,writeSave:()=>yu,xpForLevel:()=>xu,xpForRun:()=>zm});function xu(n){return n<=1?0:Math.round(mM*Math.pow(n-1,gM))}function pn(n){let e=1;for(;e<Fa&&n>=xu(e+1);)e++;return e}function Ia(n){let e=pn(n);if(e>=Fa)return{level:e,into:1,need:1,frac:1};let t=xu(e),i=xu(e+1),s=n-t,r=i-t;return{level:e,into:s,need:r,frac:r>0?s/r:1}}function zm({distance:n=0,droplets:e=0}={}){return Math.floor(n/10)+Math.floor(e*.5)}function Zt(n){Rt.repairs.push(n)}function wd(){Rt.source="defaults",Rt.storage="unknown",Rt.rawBytes=0,Rt.keys=[],Rt.repairs=[],Rt.parseError="";let n=null;try{let t=localStorage.getItem(Ed);if(Rt.storage="ok",t){Rt.rawBytes=t.length;try{n=JSON.parse(t),Rt.source="v2"}catch(i){Rt.parseError=String(i.message).slice(0,120),console.warn("[aerodrift] v2 save did not parse, falling back",i)}}}catch(t){Rt.storage="blocked",console.warn("[aerodrift] localStorage unreachable, using defaults",t)}if(!n){let t=yM();t&&(n=t,Rt.source="v1-migration")}Rt.keys=n?Object.keys(n):[];let e=Gm(xM(),n||{});return e.playerId||(e.playerId=vM()),_M(e),e}function yM(){let n=null;try{let t=localStorage.getItem(Hm);t&&(n=JSON.parse(t))}catch{return null}if(!n)return null;let e=["trail_chrome","skin_dew","aura_none"];for(let t of n.unlocked||[]){let i=`trail_${t}`;e.includes(i)||e.push(i)}return console.info("[aerodrift] migrating a v1 save forward"),{bestScore:n.bestScore||0,bestCombo:n.bestCombo||1,lifetimeDistance:n.lifetimeDistance||0,cycleDistance:n.lifetimeDistance||0,runs:n.runs||0,ownedCosmetics:e,equipped:{trail:n.trail?`trail_${n.trail}`:"trail_chrome",skin:"skin_dew",aura:"aura_none"},xp:Math.floor((n.lifetimeDistance||0)/10),settings:n.settings||{}}}function Gm(n,e){if(!e||typeof e!="object")return n;for(let[t,i]of Object.entries(e)){if(i===void 0)continue;let s=n[t],r=s!==null&&typeof s=="object"&&!Array.isArray(s),o=Array.isArray(s);if(r){i!==null&&typeof i=="object"&&!Array.isArray(i)&&Gm(s,i);continue}if(o){Array.isArray(i)&&(n[t]=i);continue}typeof s=="number"&&typeof i!="number"||typeof s=="boolean"&&typeof i!="boolean"||typeof s=="string"&&typeof i!="string"||(n[t]=i)}return n}function _M(n){if(!ss(n.stats))n.stats={...As.stats},Zt("stats replaced");else for(let[e,t]of Object.entries(As.stats))Number.isFinite(n.stats[e])||(n.stats[e]=t,Zt(`stats.${e}`));ss(n.daily)||(n.daily={...As.daily},Zt("daily replaced")),ss(n.quests)||(n.quests={},Zt("quests replaced")),ss(n.season)||(n.season={},Zt("season replaced")),Array.isArray(n.purchases)||(n.purchases=[],Zt("purchases replaced")),ss(n.streak)||(n.streak={},Zt("streak replaced")),ss(n.collection)||(n.collection={},Zt("collection replaced")),Array.isArray(n.loadouts)||(n.loadouts=[],Zt("loadouts replaced")),ss(n.equipped)||(n.equipped={...As.equipped},Zt("equipped replaced")),ss(n.settings)||(n.settings={...As.settings},Zt("settings replaced")),Array.isArray(n.achievements)||(n.achievements=[],Zt("achievements")),Array.isArray(n.realmsUnlocked)||(n.realmsUnlocked=[],Zt("realmsUnlocked")),(!Array.isArray(n.ownedCosmetics)||!n.ownedCosmetics.length)&&(n.ownedCosmetics=["trail_chrome","skin_dew","aura_none","tint_none"],Zt("ownedCosmetics reset"));for(let e of["trail_chrome","skin_dew","aura_none","tint_none"])n.ownedCosmetics.includes(e)||(n.ownedCosmetics.push(e),Zt(`ownedCosmetics += ${e}`));if((!Array.isArray(n.worldsUnlocked)||!n.worldsUnlocked.length)&&(n.worldsUnlocked=["skyshore"],Zt("worldsUnlocked reset")),!Array.isArray(n.evolution))n.evolution=[],Zt("evolution replaced");else{let e=new Set,t=[];for(let i of n.evolution){if(typeof i!="string"||e.has(i)){Zt(`evolution.${i} dropped`);continue}e.add(i),t.push(i)}t.length!==n.evolution.length&&(n.evolution=t)}ss(n.upgrades)||(n.upgrades={},Zt("upgrades replaced"));for(let e of Object.keys(n.upgrades)){let t=Math.floor(Number(n.upgrades[e]));!Number.isFinite(t)||t<=0?(delete n.upgrades[e],Zt(`upgrades.${e} dropped`)):n.upgrades[e]=t}for(let e of["droplets","prisms","xp","rebirthCount","lifetimeDistance","lifetimeDroplets","cycleDistance","cycleDroplets","bestScore","bestCombo","bestDistance","runs"])(!Number.isFinite(n[e])||n[e]<0)&&(n[e]=As[e]??0,Zt(e))}function yu(n){try{return localStorage.setItem(Ed,JSON.stringify(n)),!0}catch{return!1}}function Td(){try{localStorage.removeItem(Ed),localStorage.removeItem(Hm)}catch{}}function vM(){return globalThis.crypto?.randomUUID?globalThis.crypto.randomUUID():`p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function kn(n,e){return e?!(e.prisms&&n.prisms<e.prisms||e.droplets&&n.droplets<e.droplets):!0}function Cd(n,e){return kn(n,e)?(e.droplets&&(n.droplets-=e.droplets),e.prisms&&(n.prisms-=e.prisms),!0):!1}function _u(n,e){let t=Math.max(0,Math.floor(e));return n.droplets+=t,n.lifetimeDroplets+=t,n.cycleDroplets+=t,t}function Ad(n,e){let t=Math.max(0,Math.floor(e));return n.prisms+=t,t}function Rd(n,e){_u(n,e.droplets);let t=pn(n.xp),i=e.score>n.bestScore,s=e.distance>n.bestDistance;n.bestScore=Math.max(n.bestScore,Math.floor(e.score)),n.bestCombo=Math.max(n.bestCombo,e.bestCombo),n.bestDistance=Math.max(n.bestDistance,Math.floor(e.distance)),n.lifetimeDistance=Math.floor(n.lifetimeDistance+e.distance),n.cycleDistance=Math.floor(n.cycleDistance+e.distance),n.runs+=1;let r=zm({distance:e.distance,droplets:e.droplets});n.xp+=r;let o=pn(n.xp);return{xpGain:r,levelBefore:t,levelAfter:o,leveledUp:o>t,isNewBestScore:i,isNewBestDistance:s}}function Fd(n,e){return!e||n.worldsUnlocked.includes(e)?!1:(n.worldsUnlocked.push(e),!0)}function bM(n,e){return!e||n.realmsUnlocked.includes(e)?!1:(n.realmsUnlocked.push(e),!0)}var Bi,Sd,mM,gM,Fa,Ed,Hm,As,xM,Rt,ss,mn=Kn(()=>{Bi={orb:1,orbBig:4,ring:6,streamPerSecond:2,checkpointMinor:25,checkpointMajor:90,checkpointEpic:320,portal:180},Sd=.34,mM=420,gM=1.55,Fa=60;Ed="aerodrift.cehc.save.v2",Hm="aerodrift.cehc.save.v1",As={version:2,playerId:"",displayName:"",droplets:0,prisms:0,xp:0,rebirthCount:0,cycleDistance:0,cycleDroplets:0,upgrades:{},evolution:[],ownedCosmetics:["trail_chrome","skin_dew","aura_none","tint_none"],equipped:{trail:"trail_chrome",skin:"skin_dew",aura:"aura_none",tint:"tint_none"},worldsUnlocked:["skyshore"],realmsUnlocked:[],bestScore:0,bestCombo:1,bestDistance:0,lifetimeDistance:0,lifetimeDroplets:0,runs:0,achievements:[],stats:{orbs:0,rings:0,checkpoints:0,portals:0,hits:0,cleanRuns:0,bestNoHitDistance:0,photos:0},daily:{key:"",score:0,distance:0,played:!1},quests:{},season:{},purchases:[],streak:{},collection:{},loadouts:[],mode:"standard",settings:{exposure:.86,bloom:.1,volume:.7,muted:!1,quality:"auto",ghosts:!0,photoHud:!0,flashIntensity:1,shakeIntensity:1,largeText:!1}},xM=()=>JSON.parse(JSON.stringify(As)),Rt={source:"none",storage:"unknown",rawBytes:0,keys:[],repairs:[],parseError:""};ss=n=>n!==null&&typeof n=="object"&&!Array.isArray(n)});function MM(n){let e=String(n).replace("#","").trim(),t=e.length===3?e.split("").map(s=>s+s).join(""):e,i=parseInt(t,16);return Number.isFinite(i)?{r:(i>>16&255)/255,g:(i>>8&255)/255,b:(i&255)/255}:{r:1,g:1,b:1}}function SM({r:n,g:e,b:t}){let i=s=>Math.round(Math.min(1,Math.max(0,s))*255).toString(16).padStart(2,"0");return`#${i(n)}${i(e)}${i(t)}`.toUpperCase()}function EM({r:n,g:e,b:t}){let i=Math.max(n,e,t),s=Math.min(n,e,t),r=(i+s)/2;if(i===s)return{h:0,s:0,l:r};let o=i-s,a=r>.5?o/(2-i-s):o/(i+s),l;return i===n?l=((e-t)/o+(e<t?6:0))/6:i===e?l=((t-n)/o+2)/6:l=((n-e)/o+4)/6,{h:l,s:a,l:r}}function wM({h:n,s:e,l:t}){if(e===0)return{r:t,g:t,b:t};let i=t<.5?t*(1+e):t+e-t*e,s=2*t-i,r=o=>{let a=o;return a<0&&(a+=1),a>1&&(a-=1),a<1/6?s+(i-s)*6*a:a<1/2?i:a<2/3?s+(i-s)*(2/3-a)*6:s};return{r:r(n+1/3),g:r(n),b:r(n-1/3)}}function AM({h:n,s:e,l:t}){let i=Math.min(1,Math.max(CM,t)),s=1-Math.abs(2*i-1),r=s>1e-6?Math.min(1,TM/s):1;return{h:(n%1+1)%1,s:Math.min(r,Math.max(0,e)),l:i}}function RM(n,e,t){let i=e-n;return i>.5&&(i-=1),i<-.5&&(i+=1),n+i*t}function vu(n,e){if(!e||e.identity)return String(n).toUpperCase();let t=EM(MM(n)),i=Math.max(t.s,e.floor??0),s=e.target===void 0?t.h:RM(t.h,e.target/360,e.strength??.75),r=AM({h:s,s:i*(e.sat??1),l:t.l+(e.light||0)});return SM(wM(r))}function Mi(n,e){return!n||!e||e.identity?n:{...n,core:vu(n.core,e),glow:vu(n.glow,e),trail:vu(n.trail,e),shell:vu(n.shell,e)}}var TM,CM,Id,fA,Pa=Kn(()=>{TM=.7,CM=.34;Id={tint_none:{name:"Natural",tier:0,cost:null,identity:!0,swatch:"#EAF4FA"},tint_cool:{name:"Cool",tier:1,cost:{droplets:700},target:205,strength:.9,sat:1.06,light:.02,floor:.3,swatch:"#9FD8F2"},tint_warm:{name:"Warm",tier:1,cost:{droplets:700},target:32,strength:.9,sat:1.05,light:.03,floor:.3,swatch:"#FFCB94"},tint_rose:{name:"Rose",tier:2,cost:{droplets:1400},reqLevel:4,target:335,strength:.9,sat:1.02,light:.04,floor:.32,swatch:"#F7B6D2"},tint_verdant:{name:"Verdant",tier:2,cost:{droplets:1400},reqLevel:4,target:104,strength:.88,sat:1,light:.02,floor:.3,swatch:"#A9E08A"},tint_violet:{name:"Violet",tier:3,cost:{droplets:2600},reqLevel:8,target:268,strength:.9,sat:1.04,light:0,floor:.32,swatch:"#C2A9F0"},tint_mono:{name:"Monochrome",tier:3,cost:{droplets:2600},reqLevel:8,sat:.1,light:.06,swatch:"#D8E2E8"},tint_lumen:{name:"Lumen",tier:4,cost:{prisms:8},sat:1.4,light:.05,floor:.36,swatch:"#FFE9A8"}},fA=Object.keys(Id)});function en(n){for(let e of Da)if(Oi[e][n])return{type:e,id:n,...Oi[e][n]};return null}function Rs(n,e){return n.ownedCosmetics.includes(e)}function Vm(n,e){let t=en(e);return t?t.source&&t.source!=="shop"?t.source==="season"?"Season reward":"Not for sale":t.reqRebirth&&(n.rebirthCount||0)<t.reqRebirth?`Rebirth ${t.reqRebirth}`:t.reqLevel&&pn(n.xp)<t.reqLevel?`Level ${t.reqLevel}`:null:"Unknown"}function Wm(n,e,t){let i=en(e);return!i||Rs(n,e)||Vm(n,e)||i.cost&&!t.spend(n,i.cost)?!1:(n.ownedCosmetics.push(e),!0)}function La(n,e){let t=en(e);return!t||!Rs(n,e)?!1:(n.equipped[t.type]=e,!0)}function Rn(n,e){let t={trail:"trail_chrome",skin:"skin_dew",aura:"aura_none",tint:"tint_none"}[e],i=n.equipped?.[e];return i&&Oi[e][i]&&Rs(n,i)?{id:i,...Oi[e][i]}:{id:t,...Oi[e][t]}}function qm(n,e){return Object.entries(Oi[e]).map(([t,i])=>({id:t,type:e,...i,owned:Rs(n,t),equipped:n.equipped?.[e]===t,locked:Vm(n,t)}))}var bu,Mu,eo,Oi,Da,Si=Kn(()=>{mn();Pa();bu={trail_chrome:{name:"Chrome",tier:0,cost:null,core:"#FFFFFF",glow:"#CFE6F2",trail:"#EAF4FA",shell:"#EAF6FB"},trail_aqua:{name:"Aqua",tier:1,cost:{droplets:600},core:"#EAFFFC",glow:"#3FD1C0",trail:"#7FF3E4",shell:"#DBFFFA"},trail_mint:{name:"Mint",tier:1,cost:{droplets:950},core:"#F6FFEC",glow:"#8CD867",trail:"#BFF29A",shell:"#EDFCE0"},trail_sunset:{name:"Sunset",tier:2,cost:{droplets:1500},reqLevel:3,core:"#FFF6DE",glow:"#FFB36B",trail:"#FFD24C",shell:"#FFEFD2"},trail_lagoon:{name:"Lagoon",tier:2,cost:{droplets:2400},reqLevel:5,core:"#E4FBFF",glow:"#2FA8C8",trail:"#63D8F0",shell:"#CDF2FB"},trail_blossom:{name:"Blossom",tier:3,cost:{droplets:3600},reqLevel:8,core:"#FFF2F8",glow:"#F09ACB",trail:"#FFC3E2",shell:"#FFE6F2"},trail_citrus:{name:"Citrus",tier:3,cost:{droplets:5200},reqLevel:11,core:"#FCFFE8",glow:"#D6E84A",trail:"#EEF88C",shell:"#F7FFD6"},trail_iridescent:{name:"Iridescent",tier:4,cost:{prisms:8},core:"#FFFFFF",glow:"#9AD8F0",trail:"#CFE9FA",shell:"#EAF6FB",shift:{speed:.13,ramp:["#8CE0F0","#B7A9F0","#F0A9D2","#8CE8C8"]}},trail_aurora:{name:"Aurora",tier:4,cost:{prisms:14},reqRebirth:1,core:"#F4FFFB",glow:"#7FE0D2",trail:"#B9F5E6",shell:"#E6FFF8",shift:{speed:.08,ramp:["#7FE0D2","#9CC8FF","#C9A9F0","#8CFFE0"]}},trail_glacier:{name:"Glacier",tier:2,cost:null,source:"season",core:"#FFFFFF",glow:"#8FC7E8",trail:"#C4E6F7",shell:"#E8F5FC"},trail_koi:{name:"Koi",tier:2,cost:null,source:"season",core:"#FFF6EC",glow:"#F58A4B",trail:"#FFB784",shell:"#FFE6D2"},trail_verdant:{name:"Verdant",tier:3,cost:null,source:"season",core:"#F4FFF0",glow:"#4E9B3D",trail:"#8FD97A",shell:"#DCF7D0"},trail_static:{name:"Static",tier:3,cost:null,source:"season",core:"#FBF4FF",glow:"#9B6BE0",trail:"#C9A9F0",shell:"#EEE2FC",shift:{speed:.21,ramp:["#9B6BE0","#7FA9F0","#C9A9F0","#B77FE8"]}},trail_solstice:{name:"Solstice",tier:4,cost:null,source:"season",core:"#FFFBEF",glow:"#FF9E6B",trail:"#FFD08A",shell:"#FFF0DC",shift:{speed:.1,ramp:["#FF9E6B","#FFD08A","#F0A98C","#FFC07F"]}},trail_meridian:{name:"Meridian",tier:4,cost:{prisms:9},core:"#FFFDF4",glow:"#E8B84C",trail:"#F7DC94",shell:"#FFF6DC"},trail_abyssal:{name:"Abyssal",tier:4,cost:{prisms:10},core:"#E8FBFF",glow:"#1E7FA8",trail:"#5FBCD8",shell:"#CDECF7"},trail_seafoam:{name:"Seafoam",tier:4,cost:{prisms:11},reqLevel:14,core:"#F4FFFB",glow:"#54D8B0",trail:"#9CEFD4",shell:"#DCFCF2"},trail_verdigris:{name:"Verdigris",tier:4,cost:{prisms:15},reqRebirth:1,core:"#F6FFF8",glow:"#4FBF98",trail:"#8FE0BC",shell:"#DCF7EA",shift:{speed:.11,ramp:["#4FBF98","#7FD0B8","#A8CF7F","#5FC8A8"]}}},Mu={skin_dew:{name:"Dew Drop",tier:0,cost:null,core:"sphere",coreScale:1,shellScale:1,shellOpacity:1,emissive:2.15,halos:2,glow:1,metal:0,pulse:3.4},skin_bubble:{name:"Bubble",tier:1,cost:{droplets:800},core:"sphere",coreScale:.62,shellScale:1.34,shellOpacity:1.25,emissive:1.5,halos:0,glow:1.15,metal:0,pulse:2.1},skin_lantern:{name:"Paper Lantern",tier:1,cost:{droplets:1200},core:"lantern",coreScale:.92,shellScale:1.02,shellOpacity:.55,emissive:2.4,halos:0,glow:1.2,metal:0,pulse:1.4,rimPower:2.6},skin_chrome:{name:"Chrome Bead",tier:2,cost:{droplets:1800},reqLevel:4,core:"gyro",coreScale:1,shellScale:.9,shellOpacity:.5,emissive:.8,halos:0,glow:.8,metal:1,pulse:2.6,rough:.08,spin:1.15},skin_shard:{name:"Glass Shard",tier:2,cost:{droplets:2800},reqLevel:7,core:"facet",coreScale:1.12,shellScale:1.06,shellOpacity:.9,emissive:1.9,halos:1,glow:.95,metal:.25,pulse:1.7},skin_medusa:{name:"Medusa",tier:3,cost:{droplets:3400},reqLevel:8,core:"jelly",coreScale:.86,shellScale:1.2,shellOpacity:.75,emissive:1.75,halos:0,glow:1.15,metal:0,pulse:1.2,squash:.72,rimPower:1.9},skin_firefly:{name:"Firefly",tier:3,cost:{droplets:4400},reqLevel:10,core:"sphere",coreScale:.5,shellScale:.72,shellOpacity:0,emissive:3.4,halos:0,glow:1.7,metal:0,pulse:6.2,rimScale:1.3},skin_knot:{name:"Ribbon Knot",tier:3,cost:{droplets:5600},reqLevel:12,core:"knot",coreScale:1,shellScale:1.1,shellOpacity:.6,emissive:2.3,halos:0,glow:1.05,metal:0,pulse:2.2,spin:.85},skin_prism:{name:"Prism Core",tier:4,cost:{prisms:10},core:"cluster",coreScale:1,shellScale:1.16,shellOpacity:1.1,emissive:2.6,halos:2,glow:1.3,metal:.1,pulse:3},skin_skimmer:{name:"Skimmer",tier:4,cost:{prisms:14},reqRebirth:1,core:"saucer",coreScale:.82,shellScale:1.24,shellOpacity:.45,emissive:1.6,halos:0,glow:.9,metal:.85,pulse:1.9,squash:.42,rough:.12,rimPower:3},skin_spark:{name:"Spark",tier:1,cost:null,source:"season",core:"sphere",coreScale:.34,shellScale:1.12,shellOpacity:.42,emissive:3.4,halos:1,glow:1.9,metal:0,pulse:5.2},skin_bloom:{name:"Bloom",tier:2,cost:null,source:"season",core:"jelly",coreScale:1.18,shellScale:1.16,shellOpacity:.62,emissive:1.7,halos:0,glow:1.45,metal:0,pulse:1.1,rimPower:2.2},skin_orbit:{name:"Orbit",tier:3,cost:null,source:"season",core:"gyro",coreScale:.88,shellScale:1.06,shellOpacity:.34,emissive:.6,halos:1,glow:.7,metal:1,pulse:2,rough:.04,spin:1.9},skin_monolith:{name:"Monolith",tier:4,cost:null,source:"season",core:"facet",coreScale:1.22,shellScale:.82,shellOpacity:.22,emissive:.42,halos:0,glow:.55,metal:1,pulse:.8,rough:.02,spin:.4},skin_shoal:{name:"Shoal",tier:4,cost:{prisms:10},core:"cluster",coreScale:.72,shellScale:1.26,shellOpacity:.3,emissive:2.6,halos:0,glow:1.55,metal:0,pulse:4.2},skin_discus:{name:"Discus",tier:4,cost:{prisms:12},reqLevel:14,core:"saucer",coreScale:1.34,shellScale:.74,shellOpacity:.22,emissive:.9,halos:2,glow:.85,metal:1,pulse:1.6,rough:.06,spin:2.4},skin_reliquary:{name:"Reliquary",tier:4,cost:{prisms:13},core:"knot",coreScale:1.02,shellScale:1.18,shellOpacity:.86,emissive:1.2,halos:1,glow:1,metal:.35,pulse:.7,rimPower:3.2,spin:.35},skin_beacon:{name:"Beacon",tier:4,cost:{prisms:16},reqRebirth:1,core:"lantern",coreScale:1.16,shellScale:.92,shellOpacity:.18,emissive:3.8,halos:2,glow:2.1,metal:0,pulse:2.8,rimPower:1.8}},eo={aura_none:{name:"None",tier:0,cost:null,mode:"none"},aura_halo:{name:"Halo",tier:1,cost:{droplets:900},mode:"halo",color:"#CFEFFA",size:3,speed:1.4},aura_motes:{name:"Motes",tier:2,cost:{droplets:1900},reqLevel:5,mode:"motes",color:"#FFE985",size:1,speed:1.1,count:10},aura_dew:{name:"Dewfall",tier:2,cost:{droplets:3e3},reqLevel:9,mode:"motes",color:"#9BE9F5",size:1.5,speed:.55,count:7},aura_prism:{name:"Prism Bloom",tier:4,cost:{prisms:8},mode:"prism",color:"#FFFFFF",size:3.6,speed:.7},aura_tide:{name:"Tide",tier:2,cost:null,source:"season",mode:"motes",color:"#7FE3F0",size:1.2,speed:.42,count:14},aura_ember:{name:"Ember",tier:3,cost:null,source:"season",mode:"motes",color:"#FFAE6B",size:.8,speed:1.9,count:6},aura_corona:{name:"Corona",tier:4,cost:null,source:"season",mode:"halo",color:"#FFD9A0",size:4.2,speed:.9},aura_shoalfire:{name:"Shoalfire",tier:4,cost:{prisms:8},mode:"motes",color:"#8CF0D8",size:.7,speed:2.4,count:16},aura_meridian:{name:"Meridian Ring",tier:4,cost:{prisms:12},reqLevel:14,mode:"halo",color:"#F7DC94",size:3.4,speed:.55}},Oi={trail:bu,skin:Mu,aura:eo,tint:Id},Da=["trail","skin","aura","tint"]});var Jm={};nl(Jm,{CORRIDOR:()=>yn,createPlayer:()=>Ld,createWispRig:()=>Zm});function Zm({cheapGlass:n=!1}={}){let e=new Ut,t=[],i=[];function s(A){return t.push(A),A}function r(A){return i.push(A),A}function o(A,U){return new Xe(s(A),U)}let a=r(new xn({color:new le(ci.shell),emissive:new le(ci.core),emissiveIntensity:1.55,roughness:.22,metalness:0,envMapIntensity:1.35})),l=r(An({roughness:.05}));l.emissive=new le(ci.glow),l.emissiveIntensity=.18;let c={};function u(A,U){let O=new Ut;O.visible=!1,e.add(O),c[A]={group:O,spin:U(O)||null}}u("sphere",A=>(A.add(o(new hn(.6,26,20),a)),U=>{A.rotation.y+=U*.9})),u("facet",A=>(A.add(o(new Di(.72,0),a)),U=>{A.rotation.y+=U*.8,A.rotation.z+=U*.35})),u("lantern",A=>{A.add(o(new ms(.44,.62,6,20),a));for(let U of[-.34,0,.34]){let O=o(new Qt(.455,.026,8,30),l);O.rotation.x=Math.PI*.5,O.position.y=U,A.add(O)}for(let U of[.76,-.76]){let O=o(new Wn(.13,.2,.12,14),l);O.position.y=U,A.add(O)}return(U,O)=>{A.rotation.y+=U*.55,A.rotation.z=Math.sin(O*1.15)*.09}}),u("jelly",A=>{let U=o(new hn(.82,24,14,0,Pd,0,Math.PI*.55),a);U.rotation.x=-Math.PI*.5,A.add(U);let O=o(new Qt(.79,.032,8,34),l);O.position.z=.12,A.add(O);let q=[];for(let H=0;H<6;H++){let te=H/6*Pd,K=o(new ms(.042,.95,4,8),a);K.position.set(Math.cos(te)*.5,Math.sin(te)*.5,.78),K.rotation.x=Math.PI*.5,A.add(K),q.push({mesh:K,phase:te})}return(H,te)=>{A.rotation.z+=H*.22;for(let K of q)K.mesh.rotation.x=Math.PI*.5+Math.sin(te*1.9+K.phase)*.17}}),u("knot",A=>(A.add(o(new na(.56,.155,110,14,2,3),a)),U=>{A.rotation.x+=U*.62,A.rotation.y+=U*.94})),u("cluster",A=>{let U=[[0,.08,0,.44],[.5,.3,-.2,.27],[-.46,.34,.24,.25],[.22,-.44,.42,.23],[-.3,-.38,-.36,.21],[.38,.54,.44,.18],[-.56,-.08,.46,.16],[.06,.62,-.5,.15]];for(let[O,q,H,te]of U){let K=o(new Ni(te,0),a);K.position.set(O,q,H),K.rotation.set(O*3.1,q*2.7,H*2.3),A.add(K)}return O=>{A.rotation.y+=O*.5,A.rotation.x+=O*.19}}),u("gyro",A=>{A.add(o(new hn(.3,20,14),a));let U=[],O=[[.86,.045,0,0,0],[1.06,.036,Math.PI*.5,0,0],[1.26,.028,0,Math.PI*.5,.4]];for(let[q,H,te,K,de]of O){let be=o(new Qt(q,H,10,44),l);be.rotation.set(te,K,de),A.add(be),U.push(be)}return(q,H,te)=>{let K=1+te*1.6;U[0].rotation.z+=q*1.5*K,U[1].rotation.y+=q*1.1*K,U[2].rotation.x+=q*.8*K}}),u("saucer",A=>{let U=o(new Wn(1,.7,.15,34),l);A.add(U);let O=o(new Qt(1.01,.052,10,44),l);O.rotation.x=Math.PI*.5,A.add(O);let q=o(new hn(.4,22,12,0,Pd,0,Math.PI*.5),a);q.position.y=.07,A.add(q);let H=o(new hn(.24,14,10),a);return H.position.y=-.13,A.add(H),(te,K)=>{A.rotation.y+=te*1.35,A.rotation.z=Math.sin(K*.8)*.11}});let d=c.sphere;d.group.visible=!0;let h=r(Kr({color:ci.shell,cheap:n,opacity:.38}));h.depthWrite=!1;let g=o(new hn(.98,28,20),h);g.renderOrder=1,e.add(g);let v=r(new ut({uniforms:{uColor:{value:new le(ci.rim)},uPower:{value:2.2},uStrength:{value:1}},vertexShader:kM,fragmentShader:BM,transparent:!0,depthWrite:!1,blending:Ki})),S=o(new hn(1,30,22),v);S.renderOrder=2,e.add(S);let p=o(new Qt(1.35,.055,12,48),r(An({roughness:.06})));p.rotation.x=Math.PI*.5,e.add(p);let f=o(new Qt(1.62,.03,10,44),r(An({color:"#DCEBF3",roughness:.12})));f.rotation.set(Math.PI*.5,.6,.3),e.add(f);let b=new Bt(r(new Dt({map:Un("#ffffff",2.4),color:new le(ci.glow),blending:ct,transparent:!0,depthWrite:!1,opacity:.26,fog:!1})));b.scale.setScalar(2.2),b.renderOrder=3,e.add(b);let _=new Ys(new le(ci.glow),26,46,2);e.add(_);let m=new Bt(r(new Dt({map:Jr("#FFFFFF"),color:new le("#CFEFFA"),blending:ct,transparent:!0,depthWrite:!1,opacity:0,fog:!1})));m.visible=!1,m.renderOrder=4,e.add(m);let E=new Bt(r(new Dt({map:Rm(),color:new le("#FFFFFF"),blending:ct,transparent:!0,depthWrite:!1,opacity:0,fog:!1})));E.visible=!1,E.renderOrder=4,e.add(E);let x=12,w=[];for(let A=0;A<x;A++){let U=new Bt(r(new Dt({map:Un("#FFFFFF",2.2),color:new le("#FFE985"),blending:ct,transparent:!0,depthWrite:!1,opacity:0,fog:!1})));U.visible=!1,U.renderOrder=4,U.scale.setScalar(.5),e.add(U),w.push({sprite:U,phase:A/x*Math.PI*2,radius:1.7+A%3*.42,tilt:A%4*.5,rate:.8+A%5*.16})}let y=ci,T=Su,I=eo.aura_none,P=0,L=null,z=new le,$=new le,V=new le,X=new le,B=1.45;function Q(A){v.uniforms.uColor.value.copy(A).multiplyScalar(B)}function he(A){let U=y.shift;if(!U)return;P+=A*U.speed;let O=U.ramp,H=(P%1+1)%1*O.length,te=Math.floor(H)%O.length,K=H-Math.floor(H);z.set(O[te]),$.set(O[(te+1)%O.length]),V.copy(z).lerp($,K),a.emissive.copy(V),b.material.color.copy(V),_.color.copy(V),Q(V),m.material.color.copy(V),L?.(V)}function ae(A){y=A||ci,a.emissive.set(y.core),a.color.set(y.shell),b.material.color.set(y.glow),_.color.set(y.glow),h.color.set(y.shell),l.emissive.set(y.glow),Q(X.set(y.rim||y.glow)),m.material.color.set(y.glow),P=0}function W(A){T=A||Su;let U=c[T.core]||c.sphere;U!==d&&(d.group.visible=!1,d=U,d.group.visible=!0),d.group.scale.setScalar(T.coreScale),a.metalness=T.metal,a.roughness=T.rough??.22,a.needsUpdate=!0;let O=T.squash??1;g.visible=T.shellOpacity>.02,g.scale.set(T.shellScale,T.shellScale*O,T.shellScale);let q=T.rimScale??1.12,H=g.visible?Math.max(q,T.shellScale*1.05):q;S.scale.set(H,H*O,H),v.uniforms.uPower.value=T.rimPower??2.2,p.visible=T.halos>=1,f.visible=T.halos>=2}function ne(A){I=A||eo.aura_none;let U=I.mode;m.visible=U==="halo",E.visible=U==="prism";let O=U==="motes"&&I.count||0;for(let q=0;q<w.length;q++){let H=w[q];H.sprite.visible=q<O,q<O&&(H.sprite.material.color.set(I.color),H.sprite.scale.setScalar(.42*(I.size||1)))}U==="halo"&&m.material.color.set(I.color),U==="prism"&&E.material.color.set(I.color)}function F(A,U,O){switch(I.mode){case"halo":{let q=Math.sin(U*I.speed);m.scale.setScalar(I.size*(1+q*.09+O*.2)),m.material.opacity=.22+q*.07+O*.14;break}case"prism":{E.material.rotation+=A*I.speed,E.scale.setScalar(I.size*(1+O*.24)),E.material.opacity=.18+Math.sin(U*.9)*.05+O*.12;break}case"motes":{for(let q of w){if(!q.sprite.visible)continue;let H=U*I.speed*q.rate+q.phase;q.sprite.position.set(Math.cos(H)*q.radius,Math.sin(H)*q.radius*Math.cos(q.tilt),Math.sin(H)*q.radius*Math.sin(q.tilt)),q.sprite.material.opacity=.5+Math.sin(H*2)*.2+O*.2}break}default:break}}function J(A,U,O=0,{exposed:q=!1,flash:H=0}={}){p.rotation.z+=A*(1.1+O*2.6),f.rotation.x+=A*.7,f.rotation.y+=A*(.9+O*1.8);let te=1+Math.sin(U*T.pulse)*.045+O*.16;d.group.scale.setScalar(te*T.coreScale),d.spin?.(A*(T.spin??1),U,O);let K=y.gain??1,de=T.emissive*K+O*.7*K,be=(.24+O*.2)*T.glow,oe=(T.rim??1)*(1+O*.35);if(q){let me=.5+Math.sin(U*7.5)*.5;de+=me*1.1*K,be+=me*.22,oe+=me*.35}if(a.emissiveIntensity=de,b.scale.setScalar(2.2*T.glow*(1+O*.55)*(1+Math.sin(U*2.1)*.03)),b.material.opacity=be,v.uniforms.uStrength.value=oe,_.intensity=22+O*26,g.visible){let me=n?.38*T.shellOpacity:Math.min(1,T.shellOpacity);h.opacity=H>0?st(me,.72,$e(H,0,1)):me}he(A),F(A,U,O)}function Y(){for(let A of t)A.dispose();for(let A of i)A.dispose();t.length=0,i.length=0,e.clear()}return ae(ci),W(Su),ne(eo.aura_none),{group:e,setTrail:ae,setSkin:W,setAura:ne,update:J,dispose:Y,_onTrailColor(A){L=A}}}function Ld(n,{trailCount:e=260,cheapGlass:t=!1}={}){let{scene:i,camera:s}=n,r=Zm({cheapGlass:t}),o=r.group;i.add(o);let a=new Dd(i,e,ci.trail);r._onTrailColor(W=>{a.material.uniforms.uColor.value.copy(W).multiplyScalar(1.35)});let l={pos:new N(0,2,0),target:new ye(0,2),vel:new ye(0,0),speed:to,boost:.35,boosting:!1,boostHeld:!1,riding:!1,hitTimer:0,invuln:0,distance:0,enabled:!1},c={pos:new N(0,5,14),look:new N(0,2,-20),shake:0,bobPhase:0,fov:64},u=new N,d={exposed:!1,flash:0},h=new Set,g="pointer",v=null,S={x:0,y:0};function p(W,ne){let F=W/window.innerWidth*2-1,J=-(ne/window.innerHeight*2-1);l.target.x=F*yn.x*.94,l.target.y=st(yn.yMin,yn.yMax,(J+1)*.5)*.94,f()}function f(){l.target.x=$e(l.target.x,-yn.x,yn.x),l.target.y=$e(l.target.y,yn.yMin,yn.yMax)}function b(W){!l.enabled||W.pointerType==="touch"||(g="pointer",p(W.clientX,W.clientY))}function _(W){let ne=W.key.toLowerCase();if(["arrowup","arrowdown","arrowleft","arrowright"," ","w","a","s","d"].includes(ne)&&l.enabled&&W.preventDefault(),ne===" "){l.boostHeld=!0;return}["arrowup","arrowdown","arrowleft","arrowright","w","a","s","d"].includes(ne)&&(h.add(ne),g="key")}function m(W){let ne=W.key.toLowerCase();if(ne===" "){l.boostHeld=!1;return}h.delete(ne)}function E(W){if(!l.enabled)return;let ne=W.changedTouches[0];ne.target&&ne.target.closest&&ne.target.closest("button")||(v=ne.identifier,S={x:ne.clientX,y:ne.clientY},g="touch")}function x(W){if(!(!l.enabled||v===null))for(let ne of W.changedTouches)ne.identifier===v&&(l.target.x+=(ne.clientX-S.x)*Ym,l.target.y-=(ne.clientY-S.y)*Ym,S={x:ne.clientX,y:ne.clientY},f(),W.preventDefault())}function w(W){for(let ne of W.changedTouches)ne.identifier===v&&(v=null)}window.addEventListener("pointermove",b,{passive:!0}),window.addEventListener("keydown",_),window.addEventListener("keyup",m),window.addEventListener("touchstart",E,{passive:!0}),window.addEventListener("touchmove",x,{passive:!1}),window.addEventListener("touchend",w,{passive:!0}),window.addEventListener("touchcancel",w,{passive:!0}),window.addEventListener("blur",()=>{h.clear(),l.boostHeld=!1});let y=new ye;function T(W,ne,F={}){if(h.size){let H=(h.has("arrowright")||h.has("d")?1:0)-(h.has("arrowleft")||h.has("a")?1:0),te=(h.has("arrowup")||h.has("w")?1:0)-(h.has("arrowdown")||h.has("s")?1:0);if(H||te){g="key";let K=Math.hypot(H,te)||1;l.target.x+=H/K*$m*W,l.target.y+=te/K*$m*W,f()}}let J=l.boostHeld&&l.boost>LM;l.boosting=J,l.boosting&&(l.boost=$e(l.boost-DM*(F.boostDrain??1)*W,0,1)),l.hitTimer=Math.max(0,l.hitTimer-W),l.invuln=Math.max(0,l.invuln-W);let Y=to;l.boosting&&(Y*=FM),l.riding&&(Y*=IM),Y*=1+Math.min(.22,l.distance/26e3),l.hitTimer>0&&(Y*=PM),F.speedScale&&(Y*=F.speedScale);let A=Y<l.speed?9:2.6;l.speed=ai(l.speed,Y,A,W),y.set(l.pos.x,l.pos.y),l.pos.z-=l.speed*W,l.distance+=l.speed*W,l.pos.x=ai(l.pos.x,l.target.x,Xm,W),l.pos.y=ai(l.pos.y,l.target.y,Xm,W);let U=(l.pos.x-y.x)/Math.max(W,1e-4),O=(l.pos.y-y.y)/Math.max(W,1e-4);l.vel.x=ai(l.vel.x,U,9,W),l.vel.y=ai(l.vel.y,O,9,W),o.position.copy(l.pos);let q=$e((l.speed-to)/(to*.7),0,1);return o.rotation.z=ai(o.rotation.z,$e(-l.vel.x*.022,-.7,.7),8,W),o.rotation.x=ai(o.rotation.x,$e(-l.vel.y*.012,-.4,.4),8,W),d.exposed=!!F.exposed,d.flash=l.invuln>0?1:0,r.update(W,ne,q,d),a.update(W,l.pos,q,!0),I(W,ne,q,F.shakeScale??1),q}function I(W,ne,F,J=1){let Y=13.2+F*2.6,A=3+F*.5;c.pos.z=ai(c.pos.z,l.pos.z+Y,14,W),c.pos.x=ai(c.pos.x,l.pos.x*.82,4,W),c.pos.y=ai(c.pos.y,l.pos.y+A,4.6,W),c.bobPhase+=W*.9;let U=Math.sin(c.bobPhase)*.26,O=Math.cos(c.bobPhase*.73)*.2;c.shake=Math.max(0,c.shake-W*1.9);let q=c.shake*c.shake*J,H=(Math.random()-.5)*q*2.6,te=(Math.random()-.5)*q*2.6;s.position.set(c.pos.x+O+H,c.pos.y+U+te,c.pos.z),u.set(l.pos.x*.55+l.vel.x*.05,l.pos.y*.7+1.2+l.vel.y*.03,l.pos.z-26),c.look.lerp(u,1-Math.exp(-7*W)),s.lookAt(c.look),s.rotation.z+=$e(-l.vel.x*.0016,-.1,.1)+q*.05;let K=64+F*11;c.fov=ai(c.fov,K,4,W),Math.abs(s.fov-c.fov)>.01&&(s.fov=c.fov,s.updateProjectionMatrix())}function P(W){l.boost=$e(l.boost+W,0,1)}function L(W=1){return l.invuln>0?!1:(l.hitTimer=.85*W,l.invuln=1.15,l.speed*=.72,c.shake=Math.min(1.15,c.shake+.62*W),!0)}function z(W){c.shake=Math.min(1.4,c.shake+W)}function $(W){let ne=W||ci;r.setTrail(ne),a.setColor(ne.trail)}function V(W){r.setSkin(W||Su)}function X(W){r.setAura(W||eo.aura_none)}function B(){l.pos.set(0,2,0),l.target.set(0,2),l.vel.set(0,0),l.speed=to,l.boost=.35,l.boosting=!1,l.boostHeld=!1,l.riding=!1,l.hitTimer=0,l.invuln=0,l.distance=0,c.pos.set(0,5,14),c.look.set(0,2,-20),c.shake=0,c.fov=64,s.fov=64,s.updateProjectionMatrix(),o.position.copy(l.pos),o.rotation.set(0,0,0),a.clear(),h.clear()}function Q(W){l.enabled=W,W||(h.clear(),l.boostHeld=!1,v=null)}function he(){a.setScale(window.innerHeight)}function ae(){window.removeEventListener("pointermove",b),window.removeEventListener("keydown",_),window.removeEventListener("keyup",m),window.removeEventListener("touchstart",E),window.removeEventListener("touchmove",x),window.removeEventListener("touchend",w),window.removeEventListener("touchcancel",w),r.dispose()}return{group:o,state:l,trail:a,camRig:c,update:T,reset:B,knock:L,shake:z,addBoost:P,setEnabled:Q,onResize:he,dispose:ae,setTrail:$,setSkin:V,setAura:X,get position(){return l.pos},set boostHeld(W){l.boostHeld=W},get baseSpeed(){return to}}}var yn,to,FM,IM,PM,Xm,$m,Ym,DM,LM,ci,Su,Pd,NM,UM,Dd,kM,BM,Eu=Kn(()=>{$t();zt();is();tr();Si();yn={x:30,yMin:-15,yMax:18},to=52,FM=1.62,IM=1.34,PM=.54,Xm=5.2,$m=42,Ym=.085,DM=.34,LM=.06,ci=bu.trail_chrome,Su=Mu.skin_dew,Pd=Math.PI*2,NM=`
  attribute float aSize;
  attribute float aAlpha;
  uniform float uScale;      // renderer height * 0.5, for perspective sizing
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Perspective sizing, but hard-capped: the wisp outruns its own sparks, so
    // they stream past the camera, and an uncapped 1/z blows a single particle
    // up to fill the screen as it passes.
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 54.0);
    gl_Position = projectionMatrix * mv;
  }
`,UM=`
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    // uColor is deliberately allowed above 1.0 so the trail lands over the
    // bloom threshold and actually glows.
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
  }
`,Dd=class{constructor(e,t,i){this.count=t,this.cursor=0;let s=new Float32Array(t*3),r=new Float32Array(t),o=new Float32Array(t);for(let l=0;l<t;l++)s[l*3+1]=-9999;let a=new dt;a.setAttribute("position",new lt(s,3).setUsage(_t)),a.setAttribute("aSize",new lt(r,1).setUsage(_t)),a.setAttribute("aAlpha",new lt(o,1).setUsage(_t)),a.boundingSphere=new sn(new N,1e6),this.material=new ut({uniforms:{uMap:{value:vm("#ffffff")},uColor:{value:new le(i).multiplyScalar(1.35)},uScale:{value:window.innerHeight*.5}},vertexShader:NM,fragmentShader:UM,transparent:!0,depthWrite:!1,blending:ct}),this.points=new Vn(a,this.material),this.points.frustumCulled=!1,this.points.renderOrder=50,e.add(this.points),this.life=new Float32Array(t),this.maxLife=new Float32Array(t),this.vel=new Float32Array(t*3),this.baseSize=new Float32Array(t),this.emitAcc=0}setColor(e){this.material.uniforms.uColor.value.set(e).multiplyScalar(1.35)}setScale(e){this.material.uniforms.uScale.value=e*.5}spawn(e,t,i,s){let r=this.cursor;this.cursor=(this.cursor+1)%this.count;let o=this.points.geometry.attributes.position.array;o[r*3]=e+mt(-.34,.34),o[r*3+1]=t+mt(-.34,.34),o[r*3+2]=i+mt(-.2,.2),this.vel[r*3]=mt(-1.6,1.6),this.vel[r*3+1]=mt(-1,1.8),this.vel[r*3+2]=mt(3,11)*(.6+s),this.maxLife[r]=mt(.38,.82),this.life[r]=this.maxLife[r],this.baseSize[r]=mt(4,11)*(.8+s*.5)}update(e,t,i,s){if(s){let l=62+i*90;for(this.emitAcc+=e*l;this.emitAcc>=1;)this.emitAcc-=1,this.spawn(t.x,t.y,t.z,i)}else this.emitAcc=0;let r=this.points.geometry.attributes.position.array,o=this.points.geometry.attributes.aSize.array,a=this.points.geometry.attributes.aAlpha.array;for(let l=0;l<this.count;l++){if(this.life[l]<=0){a[l]=0;continue}this.life[l]-=e;let c=$e(this.life[l]/this.maxLife[l],0,1);r[l*3]+=this.vel[l*3]*e,r[l*3+1]+=this.vel[l*3+1]*e,r[l*3+2]+=this.vel[l*3+2]*e,a[l]=c*c,o[l]=this.baseSize[l]*(.35+c*.65)}this.points.geometry.attributes.position.needsUpdate=!0,this.points.geometry.attributes.aSize.needsUpdate=!0,this.points.geometry.attributes.aAlpha.needsUpdate=!0}clear(){let e=this.points.geometry.attributes.aAlpha.array;for(let t=0;t<this.count;t++)this.life[t]=0,e[t]=0;this.points.geometry.attributes.aAlpha.needsUpdate=!0}},kM=`
  varying vec3 vNrm;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNrm = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,BM=`
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uStrength;
  varying vec3 vNrm;
  varying vec3 vView;
  void main() {
    float f = 1.0 - abs(dot(normalize(vNrm), normalize(vView)));
    f = pow(clamp(f, 0.0, 1.0), uPower);
    gl_FragColor = vec4(uColor, clamp(f * uStrength, 0.0, 1.0));
  }
`});var dg={};nl(dg,{createWispPreview:()=>JS});function JS(n,{cheapGlass:e=!1}={}){let t=null,i=null,s=null,r=null,o=null,a=null,l=[],c=0,u=!1,d=!1,h=!1,g=!1,v=0,S=0,p=0,f=0,b={trail:null,skin:null,aura:null},_=new N(0,.05,0),m=new le,E=new le,x={exposed:!1,preview:!0};function w(){if(g)return;g=!0;let Y=n.getBoundingClientRect();p=Math.round(Y.width)||ug,f=Math.round(Y.height)||ug,(!Y.width||!Y.height)&&(n.style.width=`${p}px`,n.style.height=`${f}px`)}async function y(){try{let Y=await Promise.resolve().then(()=>(Eu(),Jm));return typeof Y.createWispRig!="function"?null:Y.createWispRig({cheapGlass:e})}catch(Y){return console.warn("[wispPreview] wisp rig unavailable",Y),null}}async function T(){if(!(d||h||t)){d=!0;try{w(),t=new Xr({canvas:n,antialias:!0,alpha:!0,powerPreference:"low-power",stencil:!1}),t.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.setClearAlpha(0),t.outputColorSpace=Kt,t.toneMapping=ts,t.toneMappingExposure=hu,n.addEventListener("webglcontextlost",ne,!1),i=new ji,s=new nn(ag,1,.5,120),s.position.set(0,lg,cf),i.add(s),I(),P(),L(),z(),ae(),a=await y(),!h&&i&&a?.group&&(i.add(a.group),a.setSize?.(p,f)),h||X()}catch(Y){console.warn("[wispPreview] preview unavailable",Y),h=!0,F()}d=!1,u&&!h&&(S=performance.now()/1e3,$())}}function I(){let Y=new ws(t);Y.compileEquirectangularShader(),r=Y.fromScene(new Zr,.04),i.environment=r.texture,i.environmentIntensity=Yt.envIntensity,Y.dispose()}function P(){let Y=new $s(new le(Yt.hemiSky),new le(Yt.hemiGround),Yt.hemiIntensity);i.add(Y);let A=new es(new le("#FFF6DC"),Yt.keyIntensity);A.position.copy(Ca).multiplyScalar(120),i.add(A);let U=new es(new le("#8FD8F2"),.24);U.position.set(-60,-30,70),i.add(U)}function L(){let Y=KS(256);o=new Xe(new ni(1,1),new Ot({map:Y,depthTest:!1,depthWrite:!1,fog:!1})),o.position.set(0,0,-cg),o.renderOrder=-1e3,o.frustumCulled=!1,s.add(o)}function z(){let Y=["#FFFFFF","#FFE985","#C9A9F0","#8CE0F0"];for(let A=0;A<YS;A++){let U=Y[A%Y.length],O=new Bt(new Dt({map:Qs(U),color:new le(U),blending:ct,transparent:!0,depthWrite:!1,opacity:.06+Math.random()*.08,fog:!1})),q=1.2+Math.random()*2.4;O.scale.set(q,q,1),O.renderOrder=-900,O.frustumCulled=!1,s.add(O),l.push({sprite:O,ax:(Math.random()-.5)*9,ay:(Math.random()-.5)*7,sx:.05+Math.random()*.09,sy:.04+Math.random()*.08,px:Math.random()*Math.PI*2,py:Math.random()*Math.PI*2,z:-13-Math.random()*7})}}function $(){if(c=requestAnimationFrame($),!t)return;let Y=performance.now()/1e3,A=Math.min(ZS,Math.max(0,Y-S));S=Y,v+=A;let U=v*$S;s.position.set(Math.sin(U)*cf,lg+Math.sin(U*.7)*.34,Math.cos(U)*cf),s.lookAt(_);for(let q of l)q.sprite.position.set(q.ax+Math.sin(v*q.sx+q.px)*2,q.ay+Math.cos(v*q.sy+q.py)*1.5,q.z);let O=.22+Math.sin(v*.8)*.14;a?.update?.(A,v,O,x),t.render(i,s)}function V(Y={}){Y.trail&&(b.trail=Y.trail),Y.skin&&(b.skin=Y.skin),Y.aura&&(b.aura=Y.aura),X()}function X(){b.trail&&(a?.setTrail?.(b.trail),o&&(E.set(b.trail.glow||"#FFFFFF"),o.material.color.copy(m.set("#FFFFFF").lerp(E,.18)))),b.skin&&a?.setSkin?.(b.skin),b.aura&&a?.setAura?.(b.aura)}function B(){if(!(h||u)){if(u=!0,!t){T();return}S=performance.now()/1e3,$()}}function Q(){u=!1,c&&(cancelAnimationFrame(c),c=0)}function he(Y,A){!(Y>0)||!(A>0)||(p=Math.round(Y),f=Math.round(A),g=!0,t&&ae())}function ae(){t.setSize(p,f,!1),s.aspect=p/f,s.updateProjectionMatrix(),W(),a?.setSize?.(p,f)}function W(){if(!o)return;let Y=2*Math.tan(ag*Math.PI/360)*cg;o.scale.set(Y*s.aspect*1.06,Y*1.06,1)}function ne(){console.warn("[wispPreview] WebGL context lost"),h=!0,Q()}function F(){n.removeEventListener("webglcontextlost",ne,!1),a?.dispose?.(),a=null;for(let Y of l)Y.sprite.material.dispose();if(l.length=0,o&&(o.geometry.dispose(),o.material.map?.dispose(),o.material.dispose(),o=null),r?.dispose(),r=null,t){t.dispose();try{t.forceContextLoss()}catch{}t=null}i=null,s=null}function J(){Q(),h=!0,F()}return{setCosmetics:V,start:B,stop:Q,setSize:he,dispose:J}}function KS(n){let e=document.createElement("canvas");e.width=n,e.height=n;let t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,n);i.addColorStop(0,"#F6FCFF"),i.addColorStop(.38,"#DCEFFA"),i.addColorStop(.72,"#C3E7EE"),i.addColorStop(1,"#ADDBD6"),t.fillStyle=i,t.fillRect(0,0,n,n);let s=t.createRadialGradient(n*.5,n*.42,0,n*.5,n*.42,n*.6);s.addColorStop(0,"rgba(255,255,255,0.62)"),s.addColorStop(.55,"rgba(255,255,255,0.20)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,n,n),hg(t,n,.18,.86,.46,"201,169,240",.16),hg(t,n,.86,.14,.4,"255,233,133",.14);let r=new Ws(e);return r.colorSpace=Kt,r.minFilter=wt,r.magFilter=wt,r.generateMipmaps=!1,r.needsUpdate=!0,r}function hg(n,e,t,i,s,r,o){let a=n.createRadialGradient(e*t,e*i,0,e*t,e*i,e*s);a.addColorStop(0,`rgba(${r},${o})`),a.addColorStop(1,`rgba(${r},0)`),n.fillStyle=a,n.fillRect(0,0,e,e)}var ag,cf,$S,lg,cg,YS,ug,ZS,fg=Kn(()=>{$t();hd();is();tr();ag=38,cf=8.4,$S=.28,lg=1.05,cg=30,YS=7,ug=240,ZS=.05});$t();function ym(n){if(!new URLSearchParams(location.search).has("showcase"))return;document.body.classList.add("is-showcase");let e=document.getElementById("showcase-finish"),t=document.getElementById("showcase-hint"),i="",s;document.getElementById("showcase-help").addEventListener("click",()=>{n.probe().state==="playing"&&n.pauseRun(),n.ui.openModal("how")}),e.addEventListener("click",()=>n.endRun()),document.getElementById("showcase-fullscreen").addEventListener("click",async o=>{try{document.fullscreenElement?await document.exitFullscreen():document.documentElement.requestFullscreen?await document.documentElement.requestFullscreen():o.currentTarget.textContent="Use browser full screen"}catch{o.currentTarget.textContent="Use browser full screen"}});function r(){let o=n.probe().state;o!==i&&(e.hidden=!["playing","pause"].includes(o),o==="playing"&&i!=="pause"?(t.hidden=!1,clearTimeout(s),s=setTimeout(()=>{t.hidden=!0},7e3)):o!=="playing"&&(t.hidden=!0),i=o),requestAnimationFrame(r)}r()}tr();$t();$t();var jr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};$t();$t();var $n=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},fM=new _s(-1,1,1,-1,0,1),bd=class extends dt{constructor(){super(),this.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new et([0,2,0,0,2,0],2))}},pM=new bd,Cs=class{constructor(e){this._mesh=new Xe(pM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,fM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var du=class extends $n{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ns.clone(e.uniforms),this.material=new ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Cs(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Aa=class extends $n{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},fu=class extends $n{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var pu=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new ye);this._width=i.width,this._height=i.height,t=new qt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new du(jr),this.copyPass.material.blending=ii,this.timer=new Zs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Aa!==void 0&&(o instanceof Aa?i=!0:o instanceof fu&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ye);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};$t();var mu=class extends $n{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new le}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};$t();$t();var km={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new le(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Qr=class n extends $n{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new ye(e.x,e.y):new ye(256,256),this.clearColor=new le(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new qt(r,o,{type:dn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new qt(r,o,{type:dn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let h=new qt(r,o,{type:dn});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),o=Math.round(o/2)}let a=km;this.highPassUniforms=ns.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ut({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ye(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ns.clone(jr.uniforms),this.blendMaterial=new ut({uniforms:this.copyUniforms,vertexShader:jr.vertexShader,fragmentShader:jr.fragmentShader,premultipliedAlpha:!0,blending:ct,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new le,this._oldClearAlpha=1,this._basic=new Ot,this._fsQuad=new Cs(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ye(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new ut({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ye(.5,.5)},direction:{value:new ye(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new ut({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Qr.BlurDirectionX=new ye(1,0);Qr.BlurDirectionY=new ye(0,1);$t();var Ra={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var gu=class extends $n{constructor(){super(),this.isOutputPass=!0,this.uniforms=ns.clone(Ra.uniforms),this.material=new Br({name:Ra.name,uniforms:this.uniforms,vertexShader:Ra.vertexShader,fragmentShader:Ra.fragmentShader}),this._fsQuad=new Cs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===la?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ca?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ua?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ts?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===da?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===fa?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ha&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};zt();var Ht={low:{label:"Low",pixelRatio:1,bloomScale:.5,bloomStrength:.48,msaa:0,chunksAhead:4,trailCount:70,motes:70,cheapGlass:!0,surfaceSegments:40,cloudDetail:0,veils:3,weather:260,bokeh:!1},medium:{label:"Medium",pixelRatio:1.5,bloomScale:.7,bloomStrength:.55,msaa:0,chunksAhead:5,trailCount:150,motes:140,cheapGlass:!1,surfaceSegments:72,cloudDetail:1,veils:6,weather:550,bokeh:!0},high:{label:"High",pixelRatio:2,bloomScale:1,bloomStrength:.62,msaa:4,chunksAhead:7,trailCount:260,motes:230,cheapGlass:!1,surfaceSegments:112,cloudDetail:2,veils:9,weather:900,bokeh:!0}},Md=["low","medium","high"];function Bm(n,e="high"){let{renderer:t,scene:i,camera:s}=n,r=Ht[e]?e:"high",o=new ye;t.getSize(o);let a=new qt(o.x,o.y,{type:dn,minFilter:wt,magFilter:wt,samples:Ht[r].msaa}),l=new pu(t,a);l.setPixelRatio(t.getPixelRatio()),l.setSize(window.innerWidth,window.innerHeight);let c=new mu(i,s);l.addPass(c);let u=new Qr(new ye(o.x*Ht[r].bloomScale,o.y*Ht[r].bloomScale),Ht[r].bloomStrength,.52,1.02);l.addPass(u);let d=new gu;l.addPass(d);let h=1;function g(){u.strength=Ht[r].bloomStrength*h}function v(_){h=$e(_,0,2),g()}function S(_,m){l.setPixelRatio(t.getPixelRatio()),l.setSize(_,m);let E=t.getPixelRatio();u.setSize(_*E*Ht[r].bloomScale,m*E*Ht[r].bloomScale)}function p(_){if(!Ht[_]||_===r)return Ht[r];r=_;let m=Ht[r];return n.setPixelRatioCap(m.pixelRatio),n.setBokehEnabled(m.bokeh),g(),S(window.innerWidth,window.innerHeight),m}function f(){l.render()}function b(){l.dispose(),a.dispose()}return{composer:l,bloomPass:u,renderPass:c,render:f,setSize:S,setTier:p,setBloomScale:v,dispose:b,get tierName(){return r},get tier(){return Ht[r]}}}function Om({onStepDown:n,windowSeconds:e=3,threshold:t=44}){let i=0,s=0,r=0,o=!0,a=2.5;function l(){i=0,s=0,r=0,a=2.5}function c(u){if(!o)return;if(a>0){a-=u;return}if(i+=u,s++,i<e)return;let d=s/i;i=0,s=0,d<t?(r++,r>=2&&(r=0,n(Math.round(d)))):r=0}return{update:c,reset:l,setEnabled(u){o=u,u&&l()}}}Eu();$t();zt();is();tr();var OM=10,zM=35,HM=150,Km=2.4,GM=3.1,VM=.05,WM=.11,qM=.12,jm=3.6,Qm=300,XM=["round","hex","petal","diamond","blade","ripple"],Ud=["bead","droplet","star","cube","petal","ember"];function $M(){return new hn(.62,14,10)}function YM(){let n=[];for(let t=0;t<=14;t++){let i=t/14*Math.PI,s=Math.pow(.5+.5*Math.cos(i),.42);n.push(new ye(Math.sin(i)*.8*s,-Math.cos(i)*.72))}return new Li(n,16)}function ZM(){let n=new Ni(.52,1),e=n.attributes.position,t=new N;for(let i=0;i<e.count;i++){t.fromBufferAttribute(e,i);let s=t.length()||1,r=Math.max(Math.abs(t.x),Math.abs(t.y),Math.abs(t.z))/s;t.multiplyScalar(r>.95?1.5:.5),e.setXYZ(i,t.x,t.y,t.z)}return n.computeVertexNormals(),n}function JM(){let n=new ti(.86,.86,.86,3,3,3),e=n.attributes.position,t=new N,i=new N;for(let s=0;s<e.count;s++)t.fromBufferAttribute(e,s),i.copy(t).normalize().multiplyScalar(.63),t.lerp(i,.3),e.setXYZ(s,t.x,t.y,t.z);return n.computeVertexNormals(),n}function KM(){let n=new hn(.6,20,12),e=n.attributes.position,t=new N;for(let i=0;i<e.count;i++){t.fromBufferAttribute(e,i);let s=Math.atan2(t.z,t.x),r=.72+.42*Math.abs(Math.cos(s*2.5));t.x*=r,t.z*=r,t.y*=.52,e.setXYZ(i,t.x,t.y,t.z)}return n.computeVertexNormals(),n}function jM(){let n=new Ni(.5,0);return n.scale(.78,1.75,.78),n.computeVertexNormals(),n}var QM={bead:$M,droplet:YM,star:ZM,cube:JM,petal:KM,ember:jM},eS=`
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aAlpha;
  uniform float uScale;
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 220.0);
    gl_Position = projectionMatrix * mv;
  }
`,tS=`
  uniform sampler2D uMap;
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor * t.rgb, t.a * vAlpha);
  }
`;function nS(n,e){let t=new Float32Array(e*3),i=new Float32Array(e),s=new Float32Array(e*3),r=new Float32Array(e),o=new dt;o.setAttribute("position",new lt(t,3).setUsage(_t)),o.setAttribute("aSize",new lt(i,1).setUsage(_t)),o.setAttribute("aColor",new lt(s,3).setUsage(_t)),o.setAttribute("aAlpha",new lt(r,1).setUsage(_t)),o.boundingSphere=new sn(new N,1e6);let a=new ut({uniforms:{uMap:{value:Un("#ffffff",2.2)},uScale:{value:window.innerHeight*.5}},vertexShader:eS,fragmentShader:tS,transparent:!0,depthWrite:!1,blending:ct}),l=new Vn(o,a);return l.frustumCulled=!1,l.renderOrder=20,n.add(l),{points:l,geo:o,material:a,positions:t,sizes:i,colors:s,alphas:r}}var kd=class{constructor(e,t){this.capacity=t;let i=new xn({color:new le("#FFFFFF"),emissive:new le("#FFE985"),emissiveIntensity:2.4,roughness:.25,metalness:0});this.material=i,this.meshes=Ud.map(s=>{let r=new Pn(QM[s](),i,t);return r.instanceMatrix.setUsage(_t),r.frustumCulled=!1,r.count=0,e.add(r),r}),this.mesh=this.meshes[0],this.halo=nS(e,t),this.active=new Uint8Array(t),this.px=new Float32Array(t),this.py=new Float32Array(t),this.pz=new Float32Array(t),this.phase=new Float32Array(t),this.big=new Uint8Array(t),this.pop=new Float32Array(t),this.shape=new Uint8Array(t),this.freeList=[];for(let s=t-1;s>=0;s--)this.freeList.push(s);this._hi=new Int32Array(Ud.length),this._m=new ht,this._q=new In,this._p=new N,this._s=new N,this._colorNormal=new le("#FFE985"),this._colorBig=new le("#C9A9F0"),this.count=0}spawn(e,t,i,s=!1,r=null,o=0){let a=this.freeList.pop();return a===void 0?-1:(this.active[a]=1,this.px[a]=e,this.py[a]=t,this.pz[a]=i,this.phase[a]=(r?r.float():Math.random())*Math.PI*2,this.big[a]=s?1:0,this.pop[a]=0,this.shape[a]=o,this.count++,a)}release(e){e<0||!this.active[e]||(this.active[e]=0,this.pop[e]=0,this.count--,this.freeList.push(e),this._m.makeScale(0,0,0),this.meshes[this.shape[e]].setMatrixAt(e,this._m),this.halo.alphas[e]=0)}releaseAll(){for(let e=0;e<this.capacity;e++)this.active[e]&&this.release(e)}startPop(e){this.pop[e]=.001}update(e,t){let{positions:i,sizes:s,colors:r,alphas:o}=this.halo,a=this._hi;a.fill(-1);for(let l=0;l<this.capacity;l++){if(!this.active[l]){o[l]=0;continue}let c=this.big[l]?1.55:1,u=1;if(this.pop[l]>0){this.pop[l]+=e;let S=$e(this.pop[l]/.28,0,1);if(c*=1+S*1.9,u=1-S,S>=1){this.release(l);continue}}let d=Math.sin(t*1.9+this.phase[l])*.42,h=this.py[l]+d;this._p.set(this.px[l],h,this.pz[l]),this._q.setFromAxisAngle(iS,t*1.4+this.phase[l]),this._s.setScalar(c),this._m.compose(this._p,this._q,this._s);let g=this.shape[l];this.meshes[g].setMatrixAt(l,this._m),l>a[g]&&(a[g]=l),i[l*3]=this._p.x,i[l*3+1]=this._p.y,i[l*3+2]=this._p.z,s[l]=(this.big[l]?15:10)*c;let v=this.big[l]?this._colorBig:this._colorNormal;r[l*3]=v.r,r[l*3+1]=v.g,r[l*3+2]=v.b,o[l]=u*(.75+Math.sin(t*3.1+this.phase[l])*.12)}for(let l=0;l<this.meshes.length;l++){let c=this.meshes[l];if(a[l]<0){c.count=0;continue}c.count=a[l]+1,c.instanceMatrix.needsUpdate=!0}this.halo.geo.attributes.position.needsUpdate=!0,this.halo.geo.attributes.aSize.needsUpdate=!0,this.halo.geo.attributes.aColor.needsUpdate=!0,this.halo.geo.attributes.aAlpha.needsUpdate=!0}setHaloScale(e){this.halo.material.uniforms.uScale.value=e*.5}},iS=new N(0,1,0),Bd=7;function e0(n,e){let t=Math.PI*2/e,i=n%t;return i<0&&(i+=t),1/Math.cos(i-t*.5)}var t0={round:{samples:48,segments:56,r:()=>1},hex:{samples:120,segments:84,r:n=>e0(n,6)},diamond:{samples:120,segments:84,r:n=>e0(n,4)},petal:{samples:144,segments:108,r:n=>1+.34*(1+Math.cos(n*6))*.5},blade:{samples:144,segments:108,r:n=>1+.52*Math.pow(Math.abs(Math.cos(n)),3)},ripple:{samples:180,segments:132,r:n=>1+.18*(1+Math.cos(n*10))*.5}};function Nd(n,e,t){let i=[];for(let r=0;r<n.samples;r++){let o=r/n.samples*Math.PI*2,a=Bd*n.r(o);i.push(new N(Math.cos(o)*a,Math.sin(o)*a,0))}let s=new qs(i,!0,"centripetal",.5);return new kr(s,n.segments,e,t,!0)}function n0(n,{capacityOrbs:e=300,cheapGlass:t=!1}={}){let{scene:i}=n,s=new kd(i,e),r={};for(let P of XM){let L=t0[P];r[P]={glass:Nd(L,.62,16),chrome:Nd(L,.2,12),glow:Nd(L,.34,8)}}let o=new Ts(()=>{let P=new Ut,L=new Xe(r.round.glass,Kr({color:"#E8F7FD",cheap:t,opacity:.4}));P.add(L);let z=new Xe(r.round.chrome,An({roughness:.07}));z.scale.setScalar(1.055),P.add(z);let $=new xn({color:new le("#FFFFFF"),emissive:new le("#7FE0D2"),emissiveIntensity:2.2,roughness:.4,transparent:!0,opacity:.9}),V=new Xe(r.round.glow,$);return V.scale.setScalar(.94),P.add(V),P.userData={glass:L,chrome:z,glow:V,glowMat:$},i.add(P),P},P=>{P.visible=!1}),a=[],l=[{ax:9,fx:1.2,px:0,ay:4.5,fy:.8,py:1.1},{ax:14,fx:.8,px:1.7,ay:3,fy:1.4,py:.3},{ax:6,fx:1.8,px:.6,ay:6.5,fy:1,py:2.2},{ax:18,fx:.6,px:2.4,ay:2,fy:1.7,py:.9}];function c(P,L,z){return z.set(P.ax*Math.sin(L*P.fx*Math.PI*2+P.px),P.ay*Math.sin(L*P.fy*Math.PI*2+P.py),-L*Qm)}let u=l.map(P=>{let L=[],z=new N;for(let V=0;V<=40;V++)L.push(c(P,V/40,z).clone());let $=new qs(L);return new kr($,90,2.5,10,!1)}),d=new Ts(()=>{let P=Em("#8CFFF0"),L=new Ot({map:P,color:new le("#8CFFF0").multiplyScalar(.8),transparent:!0,opacity:.6,blending:ct,depthWrite:!1,side:Ct,fog:!0}),z=new Xe(u[0],L);return z.frustumCulled=!1,z.renderOrder=15,i.add(z),z},P=>{P.visible=!1}),h=[],g="round",v=0;function S(P){let L=P||{};g=t0[L.gate]?L.gate:"round";let z=Ud.indexOf(L.orb);v=z>=0?z:0}function p(P,L,z,$=!1,V=null){return s.spawn(P,L,z,$,V,v)}function f(P,L,z,{radius:$=7,tilt:V=0,accent:X="#7FE0D2",rng:B=null}={}){let Q=o.acquire(),he=r[g];Q.userData.glass.geometry=he.glass,Q.userData.chrome.geometry=he.chrome,Q.userData.glow.geometry=he.glow,Q.visible=!0,Q.position.set(P,L,z),Q.rotation.set(0,0,V),Q.scale.setScalar($/Bd),Q.userData.glowMat.emissive.set(X);let ae=B?B.range(-.5,.5):mt(-.5,.5),W={g:Q,x:P,y:L,z,radius:$,shape:g,passed:!1,spin:ae,flash:0};return a.push(W),W}function b(P,L,z,$="#8CFFF0",V=null){let B=(V?V.float():Math.random())*l.length|0,Q=d.acquire();Q.geometry=u[B],Q.visible=!0,Q.position.set(P,L,z),Q.material.map.offset.y=V?V.float():Math.random(),Q.material.color.set($).multiplyScalar(.8);let he={mesh:Q,variant:l[B],x:P,y:L,z,length:Qm};return h.push(he),he}function _(P){let L=a.indexOf(P);L>=0&&a.splice(L,1),o.release(P.g)}function m(P){let L=h.indexOf(P);L>=0&&h.splice(L,1),d.release(P.mesh)}function E(P){s.release(P)}function x(){s.releaseAll();for(let P of a.slice())_(P);for(let P of h.slice())m(P)}let w=new N,y=[];function T(P,L,z,$,V={}){y.length=0;let X=z.state.pos.x,B=z.state.pos.y,Q=z.state.pos.z,he=$.x,ae=$.y,W=$.z,ne=W-Q,F=V.magnet||0;if(F>0){let A=F+Km,U=1-Math.exp(-3.4*P);for(let O=0;O<s.capacity;O++){if(!s.active[O]||s.pop[O]>0)continue;let q=s.pz[O];if(q>Q||q<Q-60)continue;let H=X-s.px[O],te=B-s.py[O];H*H+te*te>A*A||(s.px[O]+=H*U,s.py[O]+=te*U)}}s.update(P,L);for(let A=0;A<s.capacity;A++){if(!s.active[A]||s.pop[A]>0)continue;let U=s.pz[A];if(U>W+2||U<Q-2)continue;let O=ne>1e-4?$e((W-U)/ne,0,1):1,q=st(he,X,O),H=st(ae,B,O),te=s.big[A]?GM:Km,K=Math.sin(L*1.9+s.phase[A])*.42,de=s.px[A]-q,be=s.py[A]+K-H;de*de+be*be<=te*te&&(s.startPop(A),y.push({type:"orb",big:!!s.big[A],value:s.big[A]?zM:OM,boost:s.big[A]?WM:VM,x:s.px[A],y:s.py[A]+K,z:U}))}for(let A of a){if(A.g.rotation.z+=A.spin*P*.35,A.flash>0){A.flash=Math.max(0,A.flash-P*2.4),A.g.userData.glowMat.emissiveIntensity=2.2+A.flash*9;let U=A.radius/Bd*(1+A.flash*.1);A.g.scale.setScalar(U)}if(!A.passed&&Q<=A.z){A.passed=!0;let U=ne>1e-4?$e((W-A.z)/ne,0,1):1,O=st(he,X,U),q=st(ae,B,U),H=O-A.x,te=q-A.y;Math.hypot(H,te)<=A.radius*.95?(A.flash=1,y.push({type:"ring",value:HM,boost:qM,x:A.x,y:A.y,z:A.z})):y.push({type:"ringMiss",x:A.x,y:A.y,z:A.z})}}let J=!1,Y=null;for(let A of h){A.mesh.material.map.offset.y-=P*.55;let U=Q-A.z;if(U>2||U<-A.length-2)continue;let O=$e(-U/A.length,0,1);c(A.variant,O,w);let q=X-(A.x+w.x),H=B-(A.y+w.y);q*q+H*H<=jm*jm&&(J=!0,Y=A)}return J&&y.push({type:"stream",rec:Y}),y}function I(){s.setHaloScale(window.innerHeight)}return{orbs:s,rings:a,streams:h,spawnOrb:p,spawnRing:f,spawnStream:b,releaseOrb:E,releaseRing:_,releaseStream:m,setSignature:S,update:T,reset:x,onResize:I,streamPoint:c,get orbCount(){return s.count}}}$t();zt();tr();var Na={cloud:{radius:2.5,bob:[.25,.7],parts:[{field:"puff",n:[4,7],off:[1.5,.7,1.6],sx:[1.4,2.6],sy:[.85,1.5],sz:[1.4,2.6],tumble:!0,spin:[-.09,.09]}]},coral:{radius:2.6,bob:[.1,.35],parts:[{field:"spire",n:[3,6],off:[1.6,1.2,1.6],sx:[.7,1.3],sy:[1.3,2.8],sz:[.7,1.3],lean:.8,spin:[-.05,.05]},{field:"bead",n:[2,2],off:[1.5,1,1.5],sx:[.4,.8],spin:[-.5,.5]}]},leaf:{radius:2.4,bob:[.3,.8],parts:[{field:"puff",n:[5,8],off:[1.8,.5,1.8],sx:[1.6,3],sy:[.45,.9],sz:[1.6,3],tumble:!0,spin:[-.13,.13]},{field:"spire",n:[1,2],off:[.9,.8,.9],sx:[.3,.55],sy:[1,1.9],sz:[.3,.55],lean:.5}]},pylon:{radius:2.5,bob:[.05,.18],parts:[{field:"spire",n:[2,3],off:[1.2,1.5,1.2],sx:[.5,.85],sy:[2,3.6],sz:[.5,.85],lean:.14,spin:[-.02,.02]},{field:"bead",n:[3,4],off:[1.3,1.6,1.3],sx:[.3,.6],spin:[-.9,.9]}]},shard:{radius:2.6,bob:[.15,.5],parts:[{field:"shard",n:[3,6],off:[1.5,1.3,1.5],sx:[.8,1.6],sy:[1.1,2.4],sz:[.8,1.6],tumble:!0,spin:[-.28,.28]},{field:"bead",n:[1,2],off:[1.2,1,1.2],sx:[.35,.7],spin:[-.6,.6]}]},crystal:{radius:2.6,bob:[.08,.3],parts:[{field:"shard",n:[2,4],off:[1.2,1.4,1.2],sx:[.9,1.5],sy:[1.6,3],sz:[.9,1.5],lean:.42,spin:[-.12,.12]},{field:"spire",n:[2,3],off:[1.4,1.2,1.4],sx:[.6,1.1],sy:[1.4,2.6],sz:[.6,1.1],lean:.55}]},bloom:{radius:2.5,bob:[.2,.6],parts:[{field:"petal",n:[5,6],radial:.95,off:[.14,.12,.14],sx:[1,1.4],sy:[.9,1.3],sz:[1,1.4],tilt:-.5},{field:"bead",n:[1,1],off:[.12,.12,.12],sx:[.4,.6],spin:[-.4,.4]},{field:"pillar",n:[1,1],y0:-1.6,off:[.06,.12,.06],sx:[.14,.22],sy:[1.2,1.8],sz:[.14,.22],lean:.12}]},kelp:{radius:2.4,bob:[.2,.55],parts:[{field:"blade",n:[4,6],stack:1.15,off:[.4,.12,.4],sx:[.75,1.15],sy:[.6,.95],lean:.4,spin:[-.07,.07]},{field:"pillar",n:[1,1],off:[.1,.2,.1],sx:[.1,.16],sy:[1.8,2.8],sz:[.1,.16],lean:.16},{field:"pod",n:[1,2],off:[.8,1.5,.8],sx:[.2,.38],sy:[.25,.45],sz:[.2,.38],lean:.5}]},jelly:{radius:2.6,bob:[.35,.9],parts:[{field:"bell",n:[1,1],y0:.9,off:[.15,.2,.15],sx:[1.5,2.1],sy:[1.1,1.7],sz:[1.5,2.1],lean:.12},{field:"blade",n:[4,6],y0:-1.5,off:[.6,.7,.6],sx:[.16,.3],sy:[1.3,2.2],lean:.18,spin:[-.05,.05]},{field:"bead",n:[1,2],y0:.5,off:[.5,.25,.5],sx:[.18,.3],spin:[-.7,.7]}]},monolith:{radius:2.6,bob:[.03,.12],parts:[{field:"pillar",n:[2,3],stack:1.7,off:[.14,.06,.14],sx:[.85,1.15],sy:[.75,1],sz:[.85,1.15],lean:.05},{field:"prism",n:[1,1],y0:2.6,off:[.12,.16,.12],sx:[.7,1],sy:[.55,.85],sz:[.7,1],spin:[-.14,.14]},{field:"ring",n:[1,1],y0:.2,off:[.1,.5,.1],sx:[1.3,1.7],sy:[1.3,1.7],sz:[.7,1.1],upright:!0,tilt:Math.PI*.5}]},lantern:{radius:2.5,bob:[.3,.8],parts:[{field:"pod",n:[1,2],off:[.6,.6,.6],sx:[1,1.5],sy:[1.1,1.7],sz:[1,1.5],lean:.14,spin:[-.05,.05]},{field:"ring",n:[1,2],y0:1.5,off:[.4,.35,.4],sx:[.75,1.05],sy:[.75,1.05],sz:[.6,.9],upright:!0,tilt:Math.PI*.5},{field:"bead",n:[1,2],y0:-1.4,off:[.4,.35,.4],sx:[.2,.36],spin:[-.6,.6]}]},gear:{radius:2.6,bob:[.02,.1],parts:[{field:"ring",n:[2,3],off:[1,1,.4],sx:[1.2,1.9],sy:[1.2,1.9],sz:[.9,1.4],upright:!0,spin:[-.5,.5]},{field:"pillar",n:[2,3],off:[.9,.9,.5],sx:[.14,.24],sy:[1,1.7],sz:[.14,.24],upright:!0,tilt:Math.PI*.5},{field:"bead",n:[1,2],off:[1.1,1.1,.5],sx:[.22,.4],spin:[-1.2,1.2]}]},spore:{radius:2.5,bob:[.15,.45],parts:[{field:"bell",n:[1,2],y0:1,off:[.55,.35,.55],sx:[1.4,2.2],sy:[.75,1.2],sz:[1.4,2.2],lean:.14},{field:"pillar",n:[1,2],y0:-.9,off:[.5,.25,.5],sx:[.18,.3],sy:[.85,1.35],sz:[.18,.3],lean:.16},{field:"pod",n:[2,3],off:[1.5,1.6,1.5],sx:[.15,.28],sy:[.18,.34],sz:[.15,.28],tumble:!0,spin:[-.4,.4]}]},obelisk:{radius:2.5,bob:[.02,.1],parts:[{field:"pillar",n:[1,1],off:[.1,.2,.1],sx:[.5,.75],sy:[2,3.2],sz:[.5,.75],upright:!0},{field:"prism",n:[1,1],y0:3.2,off:[.08,.12,.08],sx:[.5,.8],sy:[.85,1.3],sz:[.5,.8],spin:[-.1,.1]},{field:"ring",n:[2,3],stack:1.5,y0:-.4,off:[.08,.12,.08],sx:[.9,1.15],sy:[.9,1.15],sz:[.4,.7],upright:!0,tilt:Math.PI*.5}]},driftwood:{radius:2.5,bob:[.25,.7],parts:[{field:"pillar",n:[2,3],off:[1,.6,1],sx:[.34,.58],sy:[1.6,2.8],sz:[.34,.58],tilt:Math.PI*.5,lean:.3},{field:"blade",n:[2,3],off:[1.2,.7,1.2],sx:[.5,.85],sy:[.7,1.3],tumble:!0,spin:[-.1,.1]},{field:"pod",n:[1,2],off:[1.1,.7,1.1],sx:[.28,.5],sy:[.3,.55],sz:[.28,.5],tilt:Math.PI*.5,lean:.4}]},ember:{radius:2.6,bob:[.3,.85],parts:[{field:"prism",n:[3,4],off:[1.5,1.3,1.5],sx:[.5,1],sy:[.5,1],sz:[.5,1],tumble:!0,spin:[-.45,.45]},{field:"pod",n:[2,3],off:[1.4,1.2,1.4],sx:[.32,.6],sy:[.4,.8],sz:[.32,.6],lean:.6,spin:[-.25,.25]},{field:"puff",n:[1,2],off:[1.2,.7,1.2],sx:[1.2,2],sy:[.7,1.2],sz:[1.2,2],tumble:!0,spin:[-.06,.06]}]},skybank:{radius:3,bob:[.2,.6],place:[{count:2,flank:[62,150],y:[-14,30],size:[2.4,4.8]},{count:1,spread:220,y:[-104,-74],size:[4,8]}],parts:[{field:"puff",n:[5,5],off:[1.5,.7,1.6],sx:[1.4,2.6],sy:[.85,1.5],sz:[1.4,2.6],tumble:!0}]},coralbank:{radius:3,bob:[.1,.3],place:[{count:3,flank:[40,110],y:[-24,4],size:[2,4.2]}],parts:[{field:"spire",n:[4,6],off:[1.6,1.2,1.6],sx:[.7,1.3],sy:[1.6,3.2],sz:[.7,1.3],lean:.6},{field:"bead",n:[1,2],off:[1.5,1,1.5],sx:[.4,.8]}]},grovebank:{radius:3,bob:[.3,.7],place:[{count:3,flank:[46,130],y:[-20,26],size:[2.6,5.4]},{count:1,spread:200,y:[-96,-66],size:[4,8]}],parts:[{field:"puff",n:[5,6],off:[2,.6,2],sx:[1.8,3.2],sy:[.5,1],sz:[1.8,3.2],tumble:!0},{field:"spire",n:[1,2],off:[.6,1.4,.6],sx:[.35,.6],sy:[2.2,3.6],sz:[.35,.6]}]},circuitbank:{radius:3,bob:[.03,.12],place:[{count:3,flank:[44,120],y:[-26,10],size:[2.2,4.6]}],parts:[{field:"spire",n:[2,4],off:[1.2,1.8,1.2],sx:[.4,.8],sy:[2.6,5],sz:[.4,.8],lean:.1},{field:"bead",n:[2,4],off:[1.4,2,1.4],sx:[.3,.65],spin:[-1.1,1.1]}]},auroraband:{radius:3,bob:[.1,.4],place:[{count:2,flank:[56,140],y:[-16,34],size:[2.4,5]},{count:1,spread:210,y:[-98,-70],size:[4,8]}],parts:[{field:"shard",n:[4,6],off:[1.8,1.6,1.8],sx:[1,2],sy:[1.4,3.4],sz:[1,2],tumble:!0,spin:[-.1,.1]}]},atriumbank:{radius:3,bob:[.05,.2],place:[{count:3,flank:[48,128],y:[-28,18],size:[2.4,5.2]}],parts:[{field:"shard",n:[3,5],off:[1.4,1.8,1.4],sx:[1,1.8],sy:[2.2,4.4],sz:[1,1.8],lean:.3},{field:"spire",n:[2,3],off:[1.6,1.4,1.6],sx:[.7,1.2],sy:[1.8,3.4],sz:[.7,1.2],lean:.4}]},prismbank:{radius:3,bob:[.05,.2],place:[{count:3,flank:[44,124],y:[-26,22],size:[2.2,4.8]},{count:1,spread:190,y:[-92,-64],size:[3.5,7]}],parts:[{field:"shard",n:[4,7],off:[1.6,1.8,1.6],sx:[.9,1.9],sy:[1.8,4],sz:[.9,1.9],tumble:!0,spin:[-.16,.16]}]},emberbank:{radius:3,bob:[.15,.5],place:[{count:2,flank:[58,144],y:[-18,30],size:[2.6,5.2]},{count:1,spread:210,y:[-100,-72],size:[4,8]}],parts:[{field:"puff",n:[4,5],off:[1.7,.8,1.7],sx:[1.6,2.8],sy:[.9,1.6],sz:[1.6,2.8],tumble:!0},{field:"shard",n:[1,2],off:[1.2,1,1.2],sx:[.6,1.1],sy:[1.2,2.2],sz:[.6,1.1],tumble:!0}]},bloombank:{radius:3,bob:[.15,.5],place:[{count:3,flank:[46,128],y:[-22,24],size:[2.4,5]},{count:1,spread:200,y:[-96,-66],size:[4,8]}],parts:[{field:"petal",n:[5,6],radial:.95,off:[.16,.14,.16],sx:[1,1.5],sy:[.9,1.3],sz:[1,1.5],tilt:-.5},{field:"pillar",n:[1,2],y0:-1.7,off:[.3,.3,.3],sx:[.14,.24],sy:[1.3,2.1],sz:[.14,.24],lean:.16}]},kelpbank:{radius:3,bob:[.15,.45],place:[{count:3,flank:[42,116],y:[-32,-2],size:[2.2,4.6]}],parts:[{field:"blade",n:[5,6],stack:1.15,off:[.5,.14,.5],sx:[.8,1.25],sy:[.65,1],lean:.42,spin:[-.06,.06]},{field:"pillar",n:[1,1],off:[.12,.25,.12],sx:[.1,.18],sy:[2,3.2],sz:[.1,.18],lean:.14}]},jellybank:{radius:3,bob:[.3,.85],place:[{count:3,flank:[50,134],y:[-20,30],size:[2.2,4.4]},{count:1,spread:210,y:[-90,-62],size:[4,7]}],parts:[{field:"bell",n:[1,2],y0:.9,off:[.5,.5,.5],sx:[1.5,2.2],sy:[1.1,1.8],sz:[1.5,2.2],lean:.14},{field:"blade",n:[4,5],y0:-1.5,off:[.7,.8,.7],sx:[.16,.32],sy:[1.4,2.4],lean:.2,spin:[-.04,.04]}]},monolithbank:{radius:3,bob:[.02,.08],place:[{count:3,flank:[44,120],y:[-34,-6],size:[2.6,5.4]}],parts:[{field:"pillar",n:[2,3],stack:1.7,off:[.16,.08,.16],sx:[.9,1.2],sy:[.75,1],sz:[.9,1.2],lean:.06},{field:"prism",n:[1,1],y0:2.7,off:[.14,.2,.14],sx:[.7,1.1],sy:[.6,.9],sz:[.7,1.1],spin:[-.1,.1]}]},lanternbank:{radius:3,bob:[.25,.75],place:[{count:3,flank:[52,140],y:[-14,34],size:[2,4]},{count:1,spread:190,y:[-88,-60],size:[3.5,7]}],parts:[{field:"pod",n:[2,3],off:[1.2,1.4,1.2],sx:[.9,1.5],sy:[1,1.7],sz:[.9,1.5],lean:.16},{field:"ring",n:[1,2],y0:1.5,off:[.8,.5,.8],sx:[.7,1],sy:[.7,1],sz:[.6,.9],upright:!0,tilt:Math.PI*.5}]},gearbank:{radius:3,bob:[.02,.08],place:[{count:3,flank:[46,124],y:[-28,12],size:[2.2,4.6]}],parts:[{field:"ring",n:[2,3],off:[1.2,1.4,.5],sx:[1.2,2],sy:[1.2,2],sz:[.9,1.4],upright:!0,spin:[-.35,.35]},{field:"pillar",n:[2,3],off:[1,1.6,1],sx:[.16,.3],sy:[1.4,2.6],sz:[.16,.3],lean:.08}]},sporebank:{radius:3,bob:[.12,.4],place:[{count:3,flank:[44,118],y:[-26,6],size:[2.4,5]},{count:1,spread:200,y:[-92,-64],size:[4,7]}],parts:[{field:"bell",n:[2,3],y0:1,off:[.9,.5,.9],sx:[1.4,2.4],sy:[.75,1.25],sz:[1.4,2.4],lean:.16},{field:"pillar",n:[2,3],y0:-.9,off:[.8,.3,.8],sx:[.18,.32],sy:[.9,1.5],sz:[.18,.32],lean:.18}]},duneband:{radius:3,bob:[.04,.16],place:[{count:2,flank:[60,150],y:[-34,-6],size:[3,6]},{count:1,spread:220,y:[-100,-70],size:[5,9]}],parts:[{field:"puff",n:[3,4],off:[2.4,.22,2.4],sx:[2.6,4.6],sy:[.32,.65],sz:[2.6,4.6],lean:.05},{field:"blade",n:[3,4],y0:.55,off:[2,.35,2],sx:[.22,.45],sy:[.8,1.5],lean:.55,spin:[-.05,.05]}]}},Yn=class{constructor(e,t,i,s){this.capacity=s,this.mesh=new Pn(t,i,s),this.mesh.instanceMatrix.setUsage(_t),this.mesh.frustumCulled=!1,this.mesh.count=0,e.add(this.mesh),this.free=[];for(let r=s-1;r>=0;r--)this.free.push(r);this._m=new ht,this._zero=new ht().makeScale(0,0,0);for(let r=0;r<s;r++)this.mesh.setMatrixAt(r,this._zero);this.mesh.instanceMatrix.needsUpdate=!0,this._high=0}acquire(){if(!this.free.length)return-1;let e=this.free.pop();return e>=this._high&&(this._high=e+1),e}release(e){e<0||(this.mesh.setMatrixAt(e,this._zero),this.free.push(e))}set(e,t,i,s){this._m.compose(t,i,s),this.mesh.setMatrixAt(e,this._m)}flush(){this.free.length===this.capacity&&(this._high=0),this.mesh.count=this._high,this.mesh.instanceMatrix.needsUpdate=!0}};function i0(n,{cloudDetail:e=1,capacity:t=420}={}){let{scene:i}=n,s=new xn({color:new le("#D9ECF8"),roughness:.94,metalness:0,transparent:!0,opacity:.88,flatShading:e===0,envMapIntensity:.7}),r=new Cn({color:new le("#BFF3EC"),roughness:.12,metalness:.15,clearcoat:1,clearcoatRoughness:.08,transparent:!0,opacity:.82,envMapIntensity:1.5}),o=An({color:"#DCF0F7",roughness:.1}),a=new Cn({color:new le("#DFF2FA"),roughness:.05,metalness:.05,clearcoat:1,clearcoatRoughness:.04,transparent:!0,opacity:.7,envMapIntensity:1.9,flatShading:!0}),l=new Cn({color:new le("#BFF3EC"),roughness:.16,metalness:.05,clearcoat:1,clearcoatRoughness:.1,transparent:!0,opacity:.76,side:Ct,envMapIntensity:1.4}),c=An({color:"#DCF0F7",roughness:.06});c.iridescence=1,c.iridescenceIOR=1.3,c.iridescenceThicknessRange=[120,420];let u=new xn({color:new le("#BFF3EC"),roughness:.55,metalness:.06,envMapIntensity:.9}),d=new Cn({color:new le("#D9ECF8"),roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.12,transparent:!0,opacity:.58,side:Ct,envMapIntensity:1.2}),h=new Cn({color:new le("#D9ECF8"),roughness:.62,metalness:0,sheen:1,sheenRoughness:.4,sheenColor:new le("#FFFFFF"),transparent:!0,opacity:.92,side:Ct,envMapIntensity:.8}),g=new Cn({color:new le("#DFF2FA"),roughness:.04,metalness:.08,clearcoat:1,clearcoatRoughness:.03,transparent:!0,opacity:.82,envMapIntensity:2.1,flatShading:!0}),v=new Cn({color:new le("#DCF0F7"),roughness:.22,metalness:.05,clearcoat:1,clearcoatRoughness:.08,emissive:new le("#DCF0F7"),emissiveIntensity:.22,transparent:!0,opacity:.9,envMapIntensity:1.3}),S=e>0,p=new Nr;p.moveTo(0,-1),p.quadraticCurveTo(.58,-.2,.06,1),p.quadraticCurveTo(-.58,-.2,0,-1);let f=[];for(let B=0;B<=8;B++){let Q=B/8,he=Q*Math.PI*.5;f.push(new ye(Math.max(Math.sin(he)*(1+Q*Q*.14),1e-4),Math.cos(he)-.35))}let b=[];for(let B=0;B<=6;B++){let Q=B/6;b.push(new ye(Math.max(Q*1.05,1e-4),.1-Q*Q*.34))}let _=Math.floor(t*.4),m={puff:new Yn(i,new Di(1,e),s,t),spire:new Yn(i,new Wo(1,2.6,7,1),r,t),bead:new Yn(i,new Di(1,1),o,Math.floor(t*.6)),shard:new Yn(i,new Ni(1,0),a,Math.floor(t*.7)),blade:new Yn(i,new ta(p,S?5:3),l,Math.floor(t*.5)),petal:new Yn(i,new Li(b,S?10:7,-Math.PI*.45,Math.PI*.9),h,Math.floor(t*.5)),ring:new Yn(i,new Qt(.72,.22,S?8:6,S?18:12),c,_),pillar:new Yn(i,new Wn(.82,1,2,S?10:7,1),u,Math.floor(t*.45)),bell:new Yn(i,new Li(f,S?14:9),d,Math.floor(t*.35)),prism:new Yn(i,new qo(1,0),g,_),pod:new Yn(i,new ms(.6,.9,S?4:3,S?12:8),v,_)},E=[],x=new N,w=new In,y=new ei,T=new N;function I(B,Q,he,ae,W=1,ne,{collides:F=!0}={}){let J=Na[B]||Na.cloud,Y=[];for(let U of J.parts){let O=m[U.field];if(!O)continue;let q=ne.int(U.n[0],U.n[1]),H=U.radial||0,te=U.stack||0,K=U.tilt||0,de=U.lean||0,be=(U.y0||0)*W,oe=K||H?"YXZ":"XYZ",me=H?ne.range(0,Math.PI*2):0;for(let we=0;we<q;we++){let Se=O.acquire();if(Se<0)break;let ge=U.sx||[1,1],Ae=U.sy||ge,Le=U.sz||ge,Ke=U.spin||[0,0],G=me+we/q*Math.PI*2,Ze=te?(we-(q-1)/2)*te*W:0;Y.push({slot:Se,field:O,order:oe,ox:(H?Math.cos(G)*H*W:0)+ne.range(-U.off[0],U.off[0])*W,oy:be+Ze+ne.range(-U.off[1],U.off[1])*W,oz:(H?Math.sin(G)*H*W:0)+ne.range(-U.off[2],U.off[2])*W,sx:ne.range(ge[0],ge[1])*W,sy:ne.range(Ae[0],Ae[1])*W,sz:ne.range(Le[0],Le[1])*W,rx:U.upright?K:K+(U.tumble?ne.range(0,Math.PI):ne.range(-de,de)),ry:U.upright?0:H?Math.PI*.5-G:ne.range(0,Math.PI*2),rz:U.upright?0:U.tumble?ne.range(0,Math.PI):ne.range(-de,de),spin:ne.range(Ke[0],Ke[1])})}}if(!Y.length)return null;let A={style:B,x:Q,y:he,z:ae,parts:Y,collides:F,radius:J.radius*W,phase:ne.range(0,Math.PI*2),bob:ne.range(J.bob[0],J.bob[1])};return E.push(A),A}function P(B){let Q=E.indexOf(B);Q>=0&&E.splice(Q,1);for(let he of B.parts)he.field.release(he.slot)}function L(){for(let B of E.slice())P(B);z()}function z(){for(let B in m)m[B].flush()}function $(B){s.color.set(B.puffColor),r.color.set(B.spireColor),o.color.set(B.beadColor),a.color.set(B.shardColor),l.color.set(B.spireColor),u.color.set(B.spireColor),c.color.set(B.beadColor),v.color.set(B.beadColor),v.emissive.set(B.beadColor),d.color.set(B.puffColor),h.color.set(B.puffColor),g.color.set(B.shardColor)}let V=1;function X(B,Q,he,ae){for(let A of E){let U=Math.sin(Q*.55+A.phase)*A.bob;for(let O of A.parts)O.rz+=O.spin*B,x.set(A.x+O.ox,A.y+O.oy+U,A.z+O.oz),y.set(O.rx,O.ry,O.rz,O.order),w.setFromEuler(y),T.set(O.sx,O.sy,O.sz),O.field.set(O.slot,x,w,T)}z();let W=he.state.pos.x,ne=he.state.pos.y,F=he.state.pos.z,J=ae.z-F,Y=null;for(let A of E){if(!A.collides||A.z>ae.z+A.radius||A.z<F-A.radius)continue;let U=J>1e-4?$e((ae.z-A.z)/J,0,1):1,O=st(ae.x,W,U),q=st(ae.y,ne,U),H=Math.sin(Q*.55+A.phase)*A.bob,te=O-A.x,K=q-(A.y+H),de=A.radius+V;if(te*te+K*K<=de*de){Y=A;break}}return Y}return{spawn:I,release:P,reset:L,update:X,flush:z,applyPalette:$,list:E,fields:m,STYLES:Na,materials:{puffMat:s,spireMat:r,beadMat:o,shardMat:a,bladeMat:l,ringMat:c,pillarMat:u,bellMat:d,petalMat:h,prismMat:g,podMat:v},get count(){return E.length}}}$t();zt();function Od(n){let e=n>>>0;return function(){e=e+1831565813>>>0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function zd(n,e){let t=(n^Math.imul(e^e>>>16,73244475))>>>0;return t=Math.imul(t^t>>>16,73244475)>>>0,t=Math.imul(t^t>>>16,73244475)>>>0,(t^t>>>16)>>>0}function Fs(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619)>>>0;return e>>>0}var zi=class n{constructor(e=1){this.seed=e>>>0,this.next=Od(this.seed)}reset(){this.next=Od(this.seed)}reseed(e){this.seed=e>>>0,this.next=Od(this.seed)}fork(e){return new n(zd(this.seed,e>>>0))}float(){return this.next()}range(e,t){return e+this.next()*(t-e)}int(e,t){return Math.floor(this.range(e,t+1))}chance(e){return this.next()<e}pick(e){return e[this.next()*e.length|0]}sign(){return this.next()<.5?-1:1}weighted(e,t){let i=0;for(let r of t)i+=r;let s=this.next()*i;for(let r=0;r<e.length;r++)if(s-=t[r],s<=0)return e[r];return e[e.length-1]}};function no(n){return(n>>>0).toString(36).toUpperCase().padStart(6,"0")}function s0(n){if(n==null)return null;let e=String(n).trim();if(!e)return null;if(/^[0-9a-z]{1,7}$/i.test(e)){let t=parseInt(e,36);if(Number.isFinite(t)&&t>0)return t>>>0}return Fs(e)}function Hd(){return Math.random()*4294967295>>>0}function r0(n=new Date){let e=`${n.getUTCFullYear()}-${n.getUTCMonth()+1}-${n.getUTCDate()}`;return Fs(`aerodrift-daily-${e}`)}function gn(n=new Date){let e=t=>String(t).padStart(2,"0");return`${n.getUTCFullYear()}-${e(n.getUTCMonth()+1)}-${e(n.getUTCDate())}`}is();Eu();$t();zt();is();var o0=["none","rain","snow","petals","embers","bubbles","pollen","sparks"],Vd=["moteColor","veilColor","accent"],Gd=6;function Is(n,e){return{key:n,density:e.density,srcIndex:Vd.indexOf(e.src),tint:new le(e.tint),tintMix:e.tintMix,box:e.box,size:e.size,alpha:e.alpha,vx:e.vx??Hi,vy:e.vy??Hi,vz:e.vz??Hi,speed:e.speed??Hi,amp:e.amp??Hi,freq:e.freq??a0,swayY:e.swayY??0,spin:e.spin??Hi,rot:e.rot??Hi,thin:e.thin??a0,flutter:e.flutter??0,aim:e.aim??0,life:e.life??Hi,envIn:e.envIn??.14,envOut:e.envOut??.3,flicker:e.flicker??0,flickHz:e.flickHz??sS,pop:e.pop??0,rim:e.rim??0,light:e.light??0}}var Hi=[0,0],a0=[1,1],sS=[6,12],io=[Is("none",{density:0,src:"moteColor",tint:"#FFFFFF",tintMix:0,box:[1,1,1,0],size:Hi,alpha:Hi}),Is("rain",{density:1,src:"veilColor",tint:"#F4FEFF",tintMix:.62,box:[30,22,42,24],size:[5,11],alpha:[.3,.46],vy:[-78,-58],vz:[-14,-4],rot:[.1,.17],thin:[5.5,7.5]}),Is("snow",{density:.8,src:"moteColor",tint:"#FFF7EC",tintMix:.6,box:[36,26,52,30],size:[4,9],alpha:[.55,.82],vy:[-11,-6],amp:[1.8,4.2],freq:[.4,1.1],swayY:.5,spin:[-1.1,1.1],flutter:.45,thin:[1,1.35]}),Is("petals",{density:.55,src:"accent",tint:"#FFE2EE",tintMix:.5,box:[40,28,58,32],size:[6,13],alpha:[.62,.9],vy:[-13,-7],amp:[3.5,7],freq:[.7,1.6],swayY:1.4,spin:[-4.2,4.2],flutter:1,thin:[1.5,1.9]}),Is("embers",{density:.6,src:"accent",tint:"#FFCE72",tintMix:.72,box:[44,30,64,34],size:[3,7],alpha:[.6,.95],vy:[5,14],amp:[1,2.6],freq:[.5,1.4],life:[2.6,5.2],envIn:.12,envOut:.42,flicker:.55,flickHz:[5,13],light:1}),Is("bubbles",{density:.65,src:"moteColor",tint:"#EAFEFF",tintMix:.45,box:[34,26,50,28],size:[4,10],alpha:[.4,.7],vy:[13,24],amp:[1.6,3.4],freq:[1.6,3.6],life:[2.2,4.6],envIn:.1,envOut:.12,pop:1,rim:1,light:1}),Is("pollen",{density:.9,src:"accent",tint:"#FFF6C0",tintMix:.5,box:[40,26,58,32],size:[2.5,6],alpha:[.28,.5],vx:[-2.4,2.4],vy:[-.5,.7],amp:[2.2,4.5],freq:[.2,.55],swayY:.6,flicker:.22,flickHz:[.6,1.8],light:1}),Is("sparks",{density:.4,src:"accent",tint:"#FFF4CC",tintMix:.62,box:[44,28,62,34],size:[4,10],alpha:[.7,1],speed:[26,50],vz:[-12,12],life:[.5,1.3],envIn:.08,envOut:.55,thin:[4,6.5],aim:1,light:1})],rS=`
  attribute vec3 aColor;
  attribute vec4 aShape;
  attribute vec2 aMix;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  varying vec2 vRot;
  varying float vThin;
  varying vec2 vMix;
  void main() {
    vColor = aColor;
    vRot = vec2(cos(aShape.z), sin(aShape.z));
    vThin = aShape.w;
    vMix = aMix;

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = -mv.z;
    // The second half of the never-on-the-lens rule: placement keeps particles
    // out of the bubble, this fades out anything that drifts in. A point sprite
    // a metre from the camera is a full-frame wash, whatever its size.
    vAlpha = aShape.y * smoothstep(1.5, 6.5, depth);

    gl_PointSize = min(aShape.x * (uScale / max(0.001, depth)), 150.0);
    gl_Position = projectionMatrix * mv;
  }
`,oS=`
  uniform sampler2D uMap;
  uniform sampler2D uRim;
  varying vec3 vColor;
  varying float vAlpha;
  varying vec2 vRot;
  varying float vThin;
  varying vec2 vMix;
  void main() {
    // Rotate the sample coordinate, then squeeze it across x. Squeezing the
    // *lookup* rather than the sprite is what lets one round texture serve as a
    // dot, a flake and a rain streak, with thinness as an interpolable scalar.
    vec2 p = gl_PointCoord - 0.5;
    p = vec2(p.x * vRot.x - p.y * vRot.y, p.x * vRot.y + p.y * vRot.x);
    p.x *= vThin;

    // Both source textures are transparent at their borders and clamp to edge,
    // so coordinates pushed outside the sprite by the squeeze simply vanish.
    vec2 uv = p + 0.5;
    vec4 t = mix(texture2D(uMap, uv), texture2D(uRim, uv), vMix.x);

    float a = t.a * vAlpha;
    if (a < 0.003) discard;

    // Premultiplied: alpha 1 is matter, alpha 0 is light, between is a
    // cross-fade from one to the other in a single blend state.
    gl_FragColor = vec4(vColor * t.rgb * a, a * (1.0 - vMix.y));
  }
`;function l0(n,{capacity:e=900}={}){let{scene:t}=n,i=new Float32Array(e*3),s=new Float32Array(e*3),r=new Float32Array(e*4),o=new Float32Array(e*2),a=new dt;a.setAttribute("position",new lt(i,3).setUsage(_t)),a.setAttribute("aColor",new lt(s,3).setUsage(_t)),a.setAttribute("aShape",new lt(r,4).setUsage(_t)),a.setAttribute("aMix",new lt(o,2).setUsage(_t)),a.boundingSphere=new sn(new N,1e6),a.setDrawRange(0,0);let l=new ut({uniforms:{uMap:{value:Un("#FFFFFF",2.1)},uRim:{value:Qs("#FFFFFF")},uScale:{value:window.innerHeight*.5}},vertexShader:rS,fragmentShader:oS,transparent:!0,depthWrite:!1,blending:mc,blendEquation:xi,blendSrc:aa,blendDst:Hs,blendEquationAlpha:xi,blendSrcAlpha:aa,blendDstAlpha:Hs,fog:!1}),c=new Vn(a,l);c.frustumCulled=!1,c.renderOrder=19,c.visible=!1,t.add(c);let u=new Uint8Array(e),d=new Float32Array(e),h=new Float32Array(e),g=new Float32Array(e),v=new Float32Array(e),S=new Float32Array(e),p=new Float32Array(e),f=new Float32Array(e),b=new Float32Array(e),_=new Float32Array(e),m=new Float32Array(e),E=new Float32Array(e),x=new Float32Array(e),w=new Float32Array(e),y=new Float32Array(e),T=new Float32Array(e),I=new Float32Array(e),P=new Float32Array(e),L=new Float32Array(e);for(let H=0;H<e;H++)h[H]=1/mt(.28,.55),g[H]=1/mt(.3,.62);let z=[new le,new le,new le],$=["","",""],V=io.map(()=>new le(1,1,1));function X(H){let te=!1;for(let K=0;K<Vd.length;K++){let de=H[Vd[K]];typeof de!="string"||de===$[K]||($[K]=de,z[K].set(de),te=!0)}if(te)for(let K=1;K<io.length;K++){let de=io[K];V[K].copy(z[de.srcIndex]).lerp(de.tint,de.tintMix)}}function B(H,te,K){let de=H-te;if(de<=K&&de>=-K)return H;let be=K*2;return H-Math.floor((de+K)/be)*be+(de-de)}let Q=0,he=0,ae=0;function W(H,te){let K=io[te],de=K.box,be=Q+mt(-de[0],de[0]),oe=he+mt(-de[1],de[1]),me=ae-de[3]+mt(-de[2],de[2]),we=be-Q,Se=oe-he,ge=me-ae;if(we*we+Se*Se+ge*ge<Gd*Gd&&(me-=Gd*2.5),i[H*3]=be,i[H*3+1]=oe,i[H*3+2]=me,v[H]=mt(K.vx[0],K.vx[1]),S[H]=mt(K.vy[0],K.vy[1]),p[H]=mt(K.vz[0],K.vz[1]),f[H]=mt(K.amp[0],K.amp[1]),b[H]=mt(K.freq[0],K.freq[1]),_[H]=Math.random()*Math.PI*2,m[H]=Math.random()*Math.PI*2,E[H]=mt(K.spin[0],K.spin[1]),w[H]=mt(K.thin[0],K.thin[1]),y[H]=mt(K.size[0],K.size[1]),T[H]=mt(K.alpha[0],K.alpha[1]),L[H]=mt(K.flickHz[0],K.flickHz[1]),P[H]=K.life[1]>0?mt(K.life[0],K.life[1]):0,I[H]=0,K.aim!==0){let Ae=Math.random()*Math.PI*2,Le=mt(K.speed[0],K.speed[1]);v[H]=Math.cos(Ae)*Le,S[H]=Math.sin(Ae)*Le,x[H]=Math.atan2(v[H],-S[H])}else x[H]=mt(K.rot[0],K.rot[1])}let ne=0,F=1,J=1,Y=e,A=0,U=!0;function O(H,te=1){let K=o0.indexOf(H);ne=K<0?0:K,F=$e(te,0,1)}function q(H,te,K,de){if(!K||!de)return;let be=io[ne];J+=(F-J)*(1-Math.exp(-4*H));let oe=ne===0?0:$e(Math.round(Y*be.density*J),0,e);if(U&&oe===0){c.visible&&(c.visible=!1,a.setDrawRange(0,0));return}X(de),Q=K.x,he=K.y,ae=K.z;let me=.55+.45*J,we=Math.max(oe,A),Se=-1;for(let ge=0;ge<we;ge++){let Ae=ge<oe?ne:0,Le=u[ge];Le===Ae?d[ge]<1&&(d[ge]=Math.min(1,d[ge]+H*h[ge])):(d[ge]-=H*g[ge],d[ge]<=0&&(d[ge]=0,u[ge]=Le=Ae,Le!==0&&W(ge,Le)));let Ke=ge*4;if(Le===0){r[Ke]=0,r[Ke+1]=0;continue}let G=io[Le];P[ge]>0&&(I[ge]+=H,I[ge]>=P[ge]&&W(ge,Le));let Ze=_[ge],Ne=b[ge],D=Math.sin(te*Ne+Ze),M=i[ge*3]+(v[ge]+D*f[ge])*H,C=i[ge*3+1]+S[ge]*H,k=i[ge*3+2]+p[ge]*H;G.swayY!==0&&(C+=Math.cos(te*Ne*.7+Ze)*G.swayY*H);let ee=G.box;M=B(M,Q,ee[0]),C=B(C,he,ee[1]),k=B(k,ae-ee[3],ee[2]);let xe=y[ge],pe=T[ge]*d[ge]*me;if(P[ge]>0){let ve=I[ge]/P[ge];if(pe*=Math.min(1,ve/G.envIn)*Math.min(1,(1-ve)/G.envOut),G.pop!==0){let Ue=ve*ve,Ge=Ue*Ue;xe*=1+G.pop*Ge*Ge*1.5}}G.flicker!==0&&(pe*=1-G.flicker*(.5+.5*Math.sin(te*L[ge]+Ze)));let se=x[ge],ue=w[ge];if(E[ge]!==0){let ve=m[ge]+=E[ge]*H;se+=ve,G.flutter!==0&&(ue/=1-G.flutter*(1-Math.abs(Math.cos(ve)))*.86)}i[ge*3]=M,i[ge*3+1]=C,i[ge*3+2]=k,r[Ke]=xe,r[Ke+1]=pe,r[Ke+2]=se,r[Ke+3]=ue;let Me=ge*2;o[Me]=G.rim,o[Me+1]=G.light;let Re=V[Le],Ee=ge*3;s[Ee]=Re.r,s[Ee+1]=Re.g,s[Ee+2]=Re.b,Se=ge}A=Math.max(oe,Se+1),U=Se<0,c.visible=!U,a.setDrawRange(0,A),a.attributes.position.needsUpdate=!0,a.attributes.aColor.needsUpdate=!0,a.attributes.aShape.needsUpdate=!0,a.attributes.aMix.needsUpdate=!0}return{setKind:O,update:q,setBudget(H){Y=$e(Math.round(H),0,e)},reset(){u.fill(0),d.fill(0),r.fill(0),A=0,U=!0,J=F,c.visible=!1,a.setDrawRange(0,0)},onResize(){l.uniforms.uScale.value=window.innerHeight*.5},dispose(){t.remove(c),a.dispose(),l.dispose()},get kind(){return o0[ne]}}}er();var so=140,aS=-26,c0=70,lS=`
  uniform float uTime;
  uniform float uWave;
  uniform sampler2D uAmtLut;
  uniform float uLutStart;
  uniform float uLutSpan;

  varying vec3  vWorldPos;
  varying vec3  vNrm;
  varying float vAmt;

  // One directional sine, returning its height and accumulating its XZ gradient
  // so the normal is derived analytically rather than from neighbour samples.
  float wave(vec2 p, vec2 dir, float len, float speed, float amp, inout vec2 grad) {
    float k = 6.2831853 / len;
    float f = dot(dir, p) * k + uTime * speed;
    grad += dir * (k * amp * cos(f));
    return amp * sin(f);
  }

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);

    // Wave phase is driven by *world* XZ, so the surface stays put in the world
    // as the plane is dragged along behind the player. Local UVs would make the
    // whole ocean swim forward with the camera.
    vec2 p = wp.xz;
    vec2 grad = vec2(0.0);
    float h = 0.0;
    h += wave(p, normalize(vec2(1.0, 0.28)),  62.0, 1.15, 1.15 * uWave, grad);
    h += wave(p, normalize(vec2(-0.55, 1.0)), 34.0, 1.65, 0.62 * uWave, grad);
    h += wave(p, normalize(vec2(0.35, -0.85)), 21.0, 2.30, 0.28 * uWave, grad);
    wp.y += h;

    vWorldPos = wp.xyz;
    vNrm = normalize(vec3(-grad.x, 1.0, -grad.y));

    // Distance travelled is -z, because the wisp flies toward negative Z.
    float u = clamp((-wp.z - uLutStart) / uLutSpan, 0.0, 1.0);
    vAmt = texture2D(uAmtLut, vec2(u, 0.5)).r;

    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,cS=`
  uniform vec3  uDeep;
  uniform vec3  uShallow;
  uniform vec3  uSkyTint;
  uniform vec3  uSunColor;
  uniform vec3  uSunDir;
  uniform vec3  uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;
  uniform float uFresnel;
  uniform float uSpec;
  uniform float uCaustic;
  uniform sampler2D uCausticMap;

  varying vec3  vWorldPos;
  varying vec3  vNrm;
  varying float vAmt;

  void main() {
    if (vAmt <= 0.003) discard;

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 N = normalize(vNrm);

    // Schlick-ish Fresnel: glancing angles mirror the sky, steep angles show
    // the body colour. This one term is most of what makes water read as water,
    // and raising the exponent is what turns an ocean into a mirror floor.
    float fres = pow(1.0 - max(dot(N, V), 0.0), uFresnel);
    fres = mix(0.04, 0.86, fres);

    vec3 body = mix(uDeep, uShallow, clamp(N.y * 0.55 + 0.15, 0.0, 1.0));
    vec3 col = mix(body, uSkyTint, fres);

    // Tight specular glint off the sun.
    //
    // Clamped, and deliberately so. The wave normals spread this highlight over
    // a wide band of the surface, and every pixel of that band sits above the
    // bloom threshold \u2014 unclamped it becomes one enormous white smear across
    // the horizon that swallows the orbs and gates in front of it. Capping the
    // term keeps a bright, wet glint without letting it take the frame.
    vec3 H = normalize(normalize(uSunDir) + V);
    float glint = pow(max(dot(N, H), 0.0), 320.0) * uSpec;
    col += uSunColor * min(glint, 1.6);

    // Two counter-scrolling caustic samples multiplied together \u2014 the product
    // gives moving cells rather than two obvious sliding layers.
    if (uCaustic > 0.001) {
      vec2 cuv = vWorldPos.xz * 0.011;
      float c1 = texture2D(uCausticMap, cuv + vec2(uTime * 0.011, uTime * 0.007)).r;
      float c2 = texture2D(uCausticMap, cuv * 1.7 - vec2(uTime * 0.008, uTime * 0.013)).r;
      col += uShallow * (c1 * c2) * 0.45 * uCaustic;
    }

    // Manual linear fog: this is a ShaderMaterial, so three's fog chunks are
    // not wired in and the surface must match the scene fog by hand.
    float d = length(cameraPosition - vWorldPos);
    float f = clamp((d - uFogNear) / max(1.0, uFogFar - uFogNear), 0.0, 1.0);
    col = mix(col, uFogColor, f);

    gl_FragColor = vec4(col, vAmt * (1.0 - f * 0.35));
  }
`,wu=256,uS=400,Wd=2200;function u0(n,e,t,i={}){let{scene:s}=n,{chunksAhead:r=7,moteCount:o=230,veilCount:a=9,weatherCount:l=900,surfaceSegments:c=112}=i,u=new ni(1900,1500,c,c);u.rotateX(-Math.PI/2);let d=new Uint8Array(wu),h=new Vs(d,wu,1,Vr,Sn);h.minFilter=wt,h.magFilter=wt,h.wrapS=jt,h.wrapT=jt,h.needsUpdate=!0;let g=new ut({uniforms:{uTime:{value:0},uWave:{value:1},uAmtLut:{value:h},uLutStart:{value:0},uLutSpan:{value:Wd},uDeep:{value:new le("#07515A")},uShallow:{value:new le("#3FD1C0")},uSkyTint:{value:new le("#22A8BC")},uSunColor:{value:new le("#FFFFFF")},uSunDir:{value:new N(.34,.42,-1).normalize()},uFogColor:{value:new le("#8FE0DC")},uFogNear:{value:150},uFogFar:{value:780},uFresnel:{value:3.4},uSpec:{value:3},uCaustic:{value:1},uCausticMap:{value:wm()}},vertexShader:lS,fragmentShader:cS,transparent:!0,depthWrite:!1,side:gi}),v=new Xe(u,g);v.frustumCulled=!1,v.renderOrder=-50,v.position.y=aS,s.add(v);let S=fS(s,o),p=pS(s,a),f=l0(n,{capacity:l}),b=new Map,_=0,m=r,E=1,x=null,w=null,y=180;function T(ae,W){return $e(ae/6e3,0,1)+W*.35}function I(ae){let W=ae%At;return W<c0||W>At-c0}function P(ae){let W=new zi(zd(E,ae+1)),ne=-ae*so,F=ne-so,J=ae*so,Y=J+so*.5,A=x.worldAt(Y),U=x.stratumAt(Y),O=U.palette,q=T(J,A.loop);e.setSignature(x.signatureAt(Y));let H={index:ae,zStart:ne,zEnd:F,orbs:[],rings:[],streams:[],obstacles:[]},te=ae<2?1:W.int(1,2);for(let me=0;me<te;me++)be(H,W.range(ne-12,F+40),W);if(ae>=1&&W.chance(.55)){let me=W.range(6,9),we=W.range(-16,16),Se=W.range(-6,10),ge=W.range(ne-40,F+30);H.rings.push(e.spawnRing(we,Se,ge,{radius:me,tilt:W.range(-.35,.35),accent:O.accent,rng:W}));for(let Ae=1;Ae<=5;Ae++){let Le=Ae/6;H.orbs.push(e.spawnOrb(st(we,we*.6,Le)+Math.sin(Le*3)*.6,st(Se,Se*.7,Le),ge+26*Le,!1,W))}}ae>=3&&W.chance(.2)&&H.streams.push(e.spawnStream(W.range(-14,14),W.range(-4,8),ne,O.streamColor,W));let de=ae<3||I(J)||I(J+so)?0:W.int(1,Math.round(st(2,5,Math.min(1,q)))+Math.floor(A.loop));for(let me=0;me<de;me++){let we=t.spawn(U.hazard,W.range(-yn.x+4,yn.x-4),W.range(yn.yMin+3,yn.yMax-2),W.range(ne,F),W.range(.9,1.7),W);we&&H.obstacles.push(we)}return oe(H,U.decor,W),H;function be(me,we,Se){let ge=Se.pick(["line","wave","arc","helix","cluster"]),Ae=Se.range(-20,20),Le=Se.range(-8,12),Ke=Se.chance(.22),G=(Ze,Ne,D,M=!1)=>{let C=e.spawnOrb($e(Ze,-yn.x+2,yn.x-2),$e(Ne,yn.yMin+2,yn.yMax-2),D,M,Se);C>=0&&me.orbs.push(C)};switch(ge){case"line":{let Ze=Se.int(5,9),Ne=Se.range(-.5,.5);for(let D=0;D<Ze;D++)G(Ae+D*Ne,Le,we-D*7,Ke&&D===Ze-1);break}case"wave":{let Ze=Se.int(7,12),Ne=Se.range(3,7),D=Se.range(.5,1.1);for(let M=0;M<Ze;M++)G(Ae,Le+Math.sin(M*D)*Ne,we-M*6.5);break}case"arc":{let Ze=Se.int(6,10),Ne=Se.range(6,11),D=Se.range(0,Math.PI*2);for(let M=0;M<Ze;M++){let C=D+M/Ze*Math.PI*1.1;G(Ae+Math.cos(C)*Ne,Le+Math.sin(C)*Ne,we-M*6)}break}case"helix":{let Ze=Se.int(9,15),Ne=Se.range(3.5,7);for(let D=0;D<Ze;D++){let M=D*.7;G(Ae+Math.cos(M)*Ne,Le+Math.sin(M)*Ne,we-D*5.5)}break}default:{G(Ae,Le,we,!0);let Ze=Se.int(4,7);for(let Ne=0;Ne<Ze;Ne++){let D=Ne/Ze*Math.PI*2;G(Ae+Math.cos(D)*3.4,Le+Math.sin(D)*3.4,we-Se.range(-3,3))}break}}}function oe(me,we,Se){let ge=Na[we];if(!(!ge||!ge.place))for(let Ae of ge.place)for(let Le=0;Le<Ae.count;Le++){let Ke=Ae.flank?Se.sign()*Se.range(Ae.flank[0],Ae.flank[1]):Se.range(-Ae.spread,Ae.spread),G=t.spawn(we,Ke,Se.range(Ae.y[0],Ae.y[1]),Se.range(ne,F),Se.range(Ae.size[0],Ae.size[1]),Se,{collides:!1});G&&me.obstacles.push(G)}}}function L(ae){for(let W of ae.orbs)e.releaseOrb(W);for(let W of ae.rings)e.releaseRing(W);for(let W of ae.streams)e.releaseStream(W);for(let W of ae.obstacles)t.release(W);ae.orbs.length=0,ae.rings.length=0,ae.streams.length=0,ae.obstacles.length=0}let z={};function $(ae,W,ne,F){let J=ne.z,A=Math.max(0,Math.floor(-J/so))+m;for(;_<=A;)b.set(_,P(_)),_++;for(let[de,be]of b)J<be.zEnd-110&&(L(be),b.delete(de));x.paletteAt(F,z);let U=Math.floor(Math.max(0,F)/At),O=Math.max(0,F)-U*At;w=yd(E,U);let q=At-y;if(O>q){let de=(O-q)/y;uu(z,w,1-de),uu(z,yd(E,U+1),de)}else uu(z,w,1);let H=x.surfaceAmountAt(F);t.applyPalette(z);let te=Math.floor((F-uS)/16)*16;for(let de=0;de<wu;de++){let be=te+de/(wu-1)*Wd;d[de]=Math.round($e(x.surfaceAmountAt(be),0,1)*255)}h.needsUpdate=!0;let K=g.uniforms;return K.uTime.value=W,K.uLutStart.value=te,K.uLutSpan.value=Wd,K.uFogColor.value.set(z.fog),K.uFogNear.value=z.fogNear,K.uFogFar.value=z.fogFar,K.uSkyTint.value.set(z.skyMid),K.uDeep.value.set(z.surfaceDeep),K.uShallow.value.set(z.surfaceShallow),K.uWave.value=z.surfaceWave,K.uFresnel.value=z.surfaceFresnel,K.uSpec.value=z.surfaceSpec,K.uCaustic.value=z.surfaceCaustic,v.position.z=J-520,v.visible=H>.002||x.surfaceAmountAt(F+900)>.002,S.update(ae,W,J,z),p.update(ae,W,J,z),f.setKind(x.signatureAt(F).weather),f.update(ae,W,ne,z),{palette:z,surfaceAmount:H,condition:w}}function V(ae,W){ae!==void 0&&(E=ae>>>0),W&&(x=W);for(let ne of b.values())L(ne);b.clear(),_=0,S.reset(),p.reset(),f.reset()}function X(){u.dispose(),g.dispose(),h.dispose(),S.dispose(),p.dispose(),f.dispose()}function B(ae){m=Math.max(2,Math.round(ae))}function Q(ae,W,ne=ae*4){S.setActive(ae),p.setActive(W),f.setBudget(ne)}function he(){S.setScale(window.innerHeight),f.onResize()}return{update:$,reset:V,dispose:X,surface:v,setChunksAhead:B,setParticleBudget:Q,onResize:he,get chunkCount(){return b.size},get seed(){return E},get condition(){return w},get weatherKind(){return f.kind}}}var hS=`
  attribute float aSize;
  attribute float aAlpha;
  uniform float uScale;
  uniform float uSizeScale;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * uSizeScale * (uScale / max(0.001, -mv.z)), 90.0);
    gl_Position = projectionMatrix * mv;
  }
`,dS=`
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
  }
`;function fS(n,e){let t=new Float32Array(e*3),i=new Float32Array(e),s=new Float32Array(e),r=new Float32Array(e),o=new Float32Array(e);for(let S=0;S<e;S++)t[S*3+1]=-9999;let a=new dt;a.setAttribute("position",new lt(t,3).setUsage(_t)),a.setAttribute("aSize",new lt(i,1).setUsage(_t)),a.setAttribute("aAlpha",new lt(s,1).setUsage(_t)),a.boundingSphere=new sn(new N,1e6);let l=new ut({uniforms:{uMap:{value:Un("#FFFFFF",1.7)},uColor:{value:new le("#CFF8FF")},uScale:{value:window.innerHeight*.5},uSizeScale:{value:1}},vertexShader:hS,fragmentShader:dS,transparent:!0,depthWrite:!1,blending:ct}),c=new Vn(a,l);c.frustumCulled=!1,c.renderOrder=18,n.add(c);let u=!1,d=e;function h(S,p,f){t[S*3]=Bn(-70,70),t[S*3+1]=f?Bn(-24,20):Bn(-26,22),t[S*3+2]=p-Bn(20,620),i[S]=Bn(3,12),r[S]=Math.random()*Math.PI*2,o[S]=Bn(.55,1.6)}function g(S,p,f){h(S,p,!1),t[S*3+1]=f>=0?Bn(-28,-20):Bn(20,28)}function v(S,p,f,b){let _=b.moteOpacity;if(c.visible=_>.01,!c.visible){u=!1;return}l.uniforms.uColor.value.set(b.moteColor),l.uniforms.uSizeScale.value=b.moteSize;let m=b.moteRise;if(!u){for(let E=0;E<e;E++)h(E,f,!0);u=!0}for(let E=0;E<d;E++){t[E*3+1]+=m*o[E]*S,t[E*3]+=Math.sin(p*1.4+r[E])*S*1.6;let x=t[E*3+1],w=t[E*3+2]>f+40,y=m>=0?x>26:x<-28;(w||y)&&g(E,f,m),s[E]=_}a.attributes.position.needsUpdate=!0,a.attributes.aSize.needsUpdate=!0,a.attributes.aAlpha.needsUpdate=!0}return{update:v,reset(){u=!1,c.visible=!1},setScale(S){l.uniforms.uScale.value=S*.5},setActive(S){d=$e(Math.round(S),0,e),a.setDrawRange(0,d)},dispose(){a.dispose(),l.dispose()}}}function pS(n,e){let t=new Ut;t.frustumCulled=!1,n.add(t);let i=new ni(1,1),s=[],r=u=>new Ot({map:u,color:new le("#FFFFFF"),transparent:!0,opacity:0,depthWrite:!1,blending:ct,side:Ct,fog:!1});for(let u=0;u<e;u++){let d=r(Tm("#FFFFFF")),h=r(Cm("#FFFFFF")),g=new Xe(i,d),v=new Xe(i,h);for(let S of[g,v])S.frustumCulled=!1,S.renderOrder=12,t.add(S);s.push({shaft:g,ribbon:v,shaftMat:d,ribbonMat:h,phase:Math.random()*Math.PI*2,w:1,h:1})}function o(u,d){u.w=Bn(14,40),u.h=Bn(90,160);let h=Bn(-90,90),g=Bn(6,30),v=d-Bn(220,760);u.shaft.position.set(h,g,v),u.ribbon.position.set(h,g+26,v),u.yaw=Bn(-.5,.5),u.phase=Math.random()*Math.PI*2}let a=!1,l=e;function c(u,d,h,g){let v=g.veilOpacity;if(t.visible=v>.01,!t.visible){a=!1;return}if(!a){for(let p of s)o(p,h);a=!0}let S=$e((Math.abs(g.veilTilt)-.6)/.5,0,1);for(let p=0;p<s.length;p++){let f=s[p],b=p<l;if(f.shaft.visible=b,f.ribbon.visible=b,!b)continue;f.shaft.position.z>h+60&&o(f,h);let _=.045+Math.sin(d*.5+f.phase)*.022+.028,m=f.w*g.veilWidth,E=f.h*g.veilHeight,x=$e((h-f.shaft.position.z)/200,0,1);f.shaft.scale.set(m,E,1),f.shaft.rotation.set(0,f.yaw,g.veilTilt),f.shaftMat.color.set(g.veilColor),f.shaftMat.opacity=v*_*(1-S)*x,f.ribbon.scale.set(m*5.5,E*.55,1),f.ribbon.rotation.set(0,f.yaw*.3,g.veilTilt-Math.PI*.5),f.ribbonMat.color.set(g.veilColor),f.ribbonMat.opacity=v*(.05+Math.sin(d*.33+f.phase)*.028)*S*x,f.shaft.position.x+=Math.sin(d*.25+f.phase)*u*1.2,f.ribbon.position.x=f.shaft.position.x,f.ribbon.position.z=f.shaft.position.z}}return{update:c,reset(){a=!1,t.visible=!1},setActive(u){l=$e(Math.round(u),0,e)},dispose(){i.dispose();for(let u of s)u.shaftMat.dispose(),u.ribbonMat.dispose()}}}function Bn(n,e){return n+Math.random()*(e-n)}$t();zt();is();tr();er();var h0=200,mS=800,gS=950,xS=90,d0={minor:{radius:34,tube:.2,bandOpacity:.55,glow:26,label:null,shake:0,outer:0,band2:0,flare:0,crown:0,posts:0,fins:4,finLen:1.7,finW:.9},major:{radius:34,tube:.34,bandOpacity:.85,glow:40,label:"CHECKPOINT",shake:.1,outer:1.075,band2:0,flare:0,crown:1,posts:2,fins:8,finLen:3.4,finW:1.3},epic:{radius:34,tube:.52,bandOpacity:1.15,glow:60,label:"WORLD'S EDGE",shake:.22,outer:1.13,band2:1.058,flare:1,crown:1.9,posts:4,fins:16,finLen:5.6,finW:1.6}},Xd=19,yS=3.6,Ua=-28,_S=Xd+3.2,qd=7.5,vS=16,bS=24,Tu=12,MS=32,Cu={arch:{spoke:.11,iris:!1,chrome:"#EAF2F6",stone:"#F4F8FA",hull:"#DFF4FF"},monolith:{spoke:.17,iris:!1,chrome:"#E7EDF0",stone:"#EFF3F5",hull:"#E4EEF4"},bloom:{spoke:-.14,iris:!0,chrome:"#F6EEF4",stone:"#FBF2F6",hull:"#FFEFF8"},lattice:{spoke:.1,iris:!1,chrome:"#E2F0FA",stone:"#EEF6FC",hull:"#E6F6FF"},sunwheel:{spoke:.5,iris:!1,chrome:"#F8F0E0",stone:"#FCF5E8",hull:"#FFF4DC"}};function SS(n){let e=n&&n.signature&&n.signature.portal||"arch";return Cu[e]?e:"arch"}function ES(){let n=[];for(let e=h0;e<At;e+=h0)n.push({local:e,tier:e%mS===0?"major":"minor"});return n.push({local:At-Lm,tier:"epic"}),n.sort((e,t)=>e.local-t.local),n}var ro=new kt,wS=new le("#FFFFFF");function vt(n,e,t,i,s,r,o,a,l,c){ro.position.set(t,i,s),ro.rotation.set(0,0,r),o&&ro.rotateX(o),ro.scale.set(a,l,c),ro.updateMatrix(),n.setMatrixAt(e,ro.matrix)}function ui(n,e,t,i,s,r,o,a,l=0){vt(n,e,Math.cos(t)*i,Math.sin(t)*i,s,t,l,r,o,a)}var TS=`
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3  aColor;
  uniform float uScale;
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 120.0);
    gl_Position = projectionMatrix * mv;
  }
`,CS=`
  uniform sampler2D uMap;
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor * t.rgb, t.a * vAlpha);
  }
`;function AS(n,e=220){let t=new Float32Array(e*3),i=new Float32Array(e),s=new Float32Array(e),r=new Float32Array(e*3),o=new Float32Array(e*3),a=new Float32Array(e),l=new Float32Array(e);for(let f=0;f<e;f++)t[f*3+1]=-9999;let c=new dt;c.setAttribute("position",new lt(t,3).setUsage(_t)),c.setAttribute("aSize",new lt(i,1).setUsage(_t)),c.setAttribute("aAlpha",new lt(s,1).setUsage(_t)),c.setAttribute("aColor",new lt(r,3).setUsage(_t)),c.boundingSphere=new sn(new N,1e6);let u=new ut({uniforms:{uMap:{value:Un("#ffffff",2)},uScale:{value:window.innerHeight*.5}},vertexShader:TS,fragmentShader:CS,transparent:!0,depthWrite:!1,blending:ct}),d=new Vn(c,u);d.frustumCulled=!1,d.renderOrder=60,n.add(d);let h=0,g=new le;function v(f,b,_,m,E,x=1){g.set(E);for(let w=0;w<m;w++){let y=h;h=(h+1)%e;let T=w/m*Math.PI*2+Math.random()*.4,I=(7+Math.random()*16)*x;t[y*3]=f+Math.cos(T)*1.5,t[y*3+1]=b+Math.sin(T)*1.5,t[y*3+2]=_+(Math.random()-.5)*2,o[y*3]=Math.cos(T)*I,o[y*3+1]=Math.sin(T)*I,o[y*3+2]=6+Math.random()*16,l[y]=.5+Math.random()*.7,a[y]=l[y],i[y]=(5+Math.random()*12)*x,r[y*3]=g.r,r[y*3+1]=g.g,r[y*3+2]=g.b}}function S(f){for(let b=0;b<e;b++){if(a[b]<=0){s[b]=0;continue}a[b]-=f;let _=$e(a[b]/l[b],0,1);t[b*3]+=o[b*3]*f,t[b*3+1]+=o[b*3+1]*f,t[b*3+2]+=o[b*3+2]*f;let m=Math.exp(-2.4*f);o[b*3]*=m,o[b*3+1]*=m,s[b]=_*_}c.attributes.position.needsUpdate=!0,c.attributes.aSize.needsUpdate=!0,c.attributes.aAlpha.needsUpdate=!0,c.attributes.aColor.needsUpdate=!0}function p(){for(let f=0;f<e;f++)a[f]=0,s[f]=0;c.attributes.aAlpha.needsUpdate=!0}return{emit:v,update:S,clear:p,setScale(f){u.uniforms.uScale.value=f*.5},dispose(){c.dispose(),u.dispose()}}}function f0(n,{cheapGlass:e=!1}={}){let{scene:t}=n,i=AS(t),s=Xd,r=yS,o=new ti(1,1,1),a=new Wn(.5,.58,1,28),l=new Qt(1,.02,10,64),c=new Qt(1,.05,8,72),u=new Qt(1,.035,8,56),d={thin:new Qt(s+.9,.75,12,64),mid:new Qt(s+1.4,1.3,14,64),thick:new Qt(s+2.1,2,16,72)},h=new Qt(s+.55,.42,12,64),g=new Wn(s+1.05,s+1.05,1,48,1,!0),v=new Wn(s-.25,s-.25,1,40,1,!0),S=new Vo(s*.97,48),p=new ni(1,1),f=new Di(1,2),b=[];for(let F=0;F<=12;F++){let J=F/12;b.push(new ye(Math.sin(J*Math.PI)*.3+.012,J-.5))}let _=new Li(b,12),m=new Ts(()=>{let F=new Ut,J=new Xe(l,An({roughness:.07}));F.add(J);let Y=new Xe(u,An({roughness:.05}));F.add(Y);let A=new Pn(o,An({roughness:.12}),MS);A.frustumCulled=!1,A.count=0,F.add(A);let U=new Ot({map:Ta("#8CFFF0"),color:new le("#8CFFF0"),transparent:!0,opacity:.6,blending:ct,depthWrite:!1,side:Ct,fog:!0}),O=new Xe(c,U);F.add(O);let q=Ta("#8CFFF0").clone();q.needsUpdate=!0;let H=new Ot({map:q,color:new le("#8CFFF0"),transparent:!0,opacity:.5,blending:ct,depthWrite:!1,side:Ct,fog:!0}),te=new Xe(c,H);F.add(te);let K=new Bt(new Dt({map:Jr("#8CFFF0"),color:new le("#8CFFF0"),blending:ct,transparent:!0,depthWrite:!1,opacity:0,fog:!1}));K.renderOrder=40,F.add(K);let de=new Bt(new Dt({map:Jr("#8CFFF0"),color:new le("#8CFFF0"),blending:ct,transparent:!0,depthWrite:!1,opacity:0,fog:!1}));return de.renderOrder=38,F.add(de),F.userData={arch:J,outer:Y,struts:A,band:O,bandMat:U,band2:te,band2Mat:H,glow:K,flare:de,tint:null},t.add(F),F},F=>{F.visible=!1});function E(F,J){let Y=J.radius;F.arch.scale.set(Y,Y,J.tube/.02),F.band.scale.set(Y*1.012,Y*1.012,J.tube/.05),F.glow.scale.setScalar(J.glow),F.bandMat.opacity=J.bandOpacity,F.outer.visible=J.outer>0,J.outer&&F.outer.scale.set(Y*J.outer,Y*J.outer,J.tube/.035*.75),F.band2.visible=J.band2>0,J.band2&&F.band2.scale.set(Y*J.band2,Y*J.band2,J.tube/.05*.62),F.flare.visible=J.flare>0,J.flare&&F.flare.scale.setScalar(J.glow*2.6);let A=0;for(let U=0;U<J.fins;U++){let O=U/J.fins*Math.PI*2+Math.PI/J.fins;ui(F.struts,A++,O,Y+J.finLen*.5+.5,0,J.finLen,J.finW,J.tube*5+1)}for(let U=0;U<J.posts;U++){let O=U%2?1:-1,q=U<2?Y+3.6:Y+11,H=U<2?9:3;vt(F.struts,A++,O*q,(H-30)*.5,0,0,0,2.8,H+30,4.2),vt(F.struts,A++,O*q,-29.2,0,0,0,6.4,2.8,8.2)}J.crown&&(ui(F.struts,A++,Math.PI*.5,Y+2.2*J.crown,0,4.2*J.crown,6.4*J.crown,5),J.crown>1.4&&(ui(F.struts,A++,Math.PI*.4,Y+1.5,0,2.8,5.4,4.6),ui(F.struts,A++,Math.PI*.6,Y+1.5,0,2.8,5.4,4.6))),F.struts.count=A,F.struts.visible=A>0,F.struts.instanceMatrix.needsUpdate=!0}let x=new Ts(()=>{let F=new Ut,J=An({roughness:.05}),Y=An({color:"#F2F6F8",roughness:.26}),A=Kr({color:"#EAF8FF",cheap:e,opacity:.5}),U=vd({color:"#DFF4FF",emissive:"#2E7E9E",emissiveIntensity:.34});U.side=Xt;let O=vd({color:"#FFF2FA",emissive:"#B06898",emissiveIntensity:.26});O.side=Ct;let q=new Xe(g,U);q.rotation.x=Math.PI*.5,F.add(q);let H=new Xe(d.mid,J),te=new Xe(d.mid,J);F.add(H,te);let K=new Xe(h,A);F.add(K);let de=new Pn(o,J,vS);de.frustumCulled=!1,de.count=0,F.add(de);let be=new Pn(o,J,bS);be.frustumCulled=!1,be.count=0,F.add(be);let oe=new Pn(_,O,Tu);oe.frustumCulled=!1,oe.instanceMatrix.setUsage(_t),oe.count=0,F.add(oe);let me=new Xe(o,Y),we=new Xe(o,Y);F.add(me,we);let Se=new Ot({color:new le("#FFFFFF"),transparent:!0,opacity:.8,depthWrite:!1,fog:!1}),ge=new Xe(f,Se);ge.renderOrder=5,F.add(ge);let Ae=new Ot({map:Am("#B8F0FF"),color:new le("#B8F0FF"),transparent:!0,opacity:.66,blending:ct,depthWrite:!1,side:Ct,fog:!1}),Le=new Xe(S,Ae);Le.renderOrder=37,F.add(Le);let Ke=Ta("#FFFFFF").clone();Ke.wrapS=Qn,Ke.repeat.set(2,1),Ke.needsUpdate=!0;let G=new Ot({map:Ke,color:new le("#B8F0FF"),transparent:!0,opacity:.6,blending:ct,depthWrite:!1,side:Ct,fog:!1}),Ze=new Xe(p,G);Ze.renderOrder=37,F.add(Ze);let Ne=Ta("#FFFFFF").clone();Ne.wrapS=Qn,Ne.wrapT=jt,Ne.repeat.set(2,1),Ne.needsUpdate=!0;let D=new Ot({map:Ne,color:new le("#B8F0FF"),transparent:!0,opacity:.45,blending:ct,depthWrite:!1,side:Ct,fog:!1}),M=new Xe(v,D);M.rotation.x=Math.PI*.5,M.renderOrder=36,F.add(M);let C=new Bt(new Dt({map:Jr("#FFFFFF"),color:new le("#B8F0FF"),blending:ct,transparent:!0,depthWrite:!1,opacity:0,fog:!1}));C.renderOrder=38,F.add(C);let k=new Bt(new Dt({map:Un("#ffffff",1.9),color:new le("#B8F0FF"),blending:ct,transparent:!0,depthWrite:!1,opacity:.5,fog:!1}));return k.scale.setScalar(90),k.renderOrder=39,F.add(k),F.userData={hull:q,hullMat:U,ringF:H,ringB:te,gasket:K,frame:de,spokes:be,petals:oe,plinth:me,steps:we,beacon:ge,beaconMat:Se,membrane:Le,membraneMat:Ae,curtain:Ze,curtainMat:G,throat:M,throatMat:D,halo:C,haloMat:C.material,core:k,coreMat:k.material,chromeMat:J,stoneMat:Y,petalMat:O,family:"arch",tint:null},t.add(F),F},F=>{F.visible=!1});function w(F){F.hull.visible=!1,F.hull.scale.set(1,r*2,1),F.ringF.visible=!1,F.ringB.visible=!1,F.ringF.scale.setScalar(1),F.ringB.scale.setScalar(1),F.gasket.visible=!1,F.gasket.scale.setScalar(1),F.gasket.position.set(0,0,0),F.frame.count=0,F.frame.visible=!1,F.spokes.count=0,F.spokes.visible=!1,F.spokes.rotation.z=0,F.petals.count=0,F.petals.visible=!1,F.petals.rotation.z=0,F.plinth.visible=!1,F.plinth.geometry=o,F.steps.visible=!1,F.steps.geometry=o,F.beacon.visible=!0,F.membrane.visible=!1,F.membrane.scale.setScalar(1),F.curtain.visible=!1,F.throat.visible=!1,F.throat.scale.set(1,r*2,1),F.halo.visible=!0,F.core.visible=!0}let y={arch(F){F.hull.visible=!0,F.ringF.geometry=d.mid,F.ringB.geometry=d.mid,F.ringF.position.set(0,0,r+.6),F.ringB.position.set(0,0,-r-.6),F.ringF.visible=F.ringB.visible=!0,F.gasket.visible=!0;let J=0;vt(F.frame,J++,-(s+3.2),-10.4,0,0,0,3.4,20.8,r*2+1.6),vt(F.frame,J++,s+3.2,-10.4,0,0,0,3.4,20.8,r*2+1.6),ui(F.frame,J++,Math.PI*.5,s+3.4,0,5,6.6,r*2+2.4);let Y=[25,45,65,115,135,155];for(let A=0;A<Y.length;A++)ui(F.frame,J++,Y[A]*Math.PI/180,s+2.4,0,3,4.2,r*2+1.2);vt(F.frame,J++,-(s+3.2),-20.2,0,0,0,6.6,3,r*2+4),vt(F.frame,J++,s+3.2,-20.2,0,0,0,6.6,3,r*2+4),F.frame.count=J;for(let A=0;A<12;A++)ui(F.spokes,A,A/12*Math.PI*2,s+1.05,0,1.7,1.15,r*1.6);F.spokes.count=12,F.plinth.position.set(0,-24.25,0),F.plinth.scale.set(2*(s+8),7.5,r*2+10),F.steps.position.set(0,Ua+.6,0),F.steps.scale.set(2*(s+13),2.2,r*2+18),F.beacon.position.set(0,0,-r-11),F.beacon.scale.setScalar(2.6),F.membrane.visible=!0,F.throat.visible=!0,F.halo.scale.setScalar(s*3.1),F.core.scale.setScalar(88)},monolith(F){let J=0;vt(F.frame,J++,-(s+4.4),3,r,0,0,6.6,50,5.4),vt(F.frame,J++,s+4.4,3,r,0,0,6.6,50,5.4),vt(F.frame,J++,-(s+6.2),-1,-r,0,0,5.4,42,4.6),vt(F.frame,J++,s+6.2,-1,-r,0,0,5.4,42,4.6),vt(F.frame,J++,-(s+4.4),29.6,r,.045,0,8.6,3.2,6.8),vt(F.frame,J++,s+4.4,29.6,r,-.045,0,8.6,3.2,6.8),vt(F.frame,J++,0,-20.4,r,0,0,2*(s+4),3.2,5.4),vt(F.frame,J++,0,-20.8,-r,0,0,2*(s+6),2.6,4.6),F.frame.count=J;for(let Y=0;Y<8;Y++){let A=Y/8*Math.PI*2;ui(F.spokes,Y,A,s+2.2,(Y%2?1:-1)*r*.55,2.6,1.4,1.4,.7)}F.spokes.count=8,F.plinth.position.set(0,-25.2,0),F.plinth.scale.set(2*(s+14),6.4,r*2+14),F.steps.position.set(0,Ua+.4,0),F.steps.scale.set(2*(s+19),2.4,r*2+22),F.curtain.visible=!0,F.curtain.position.set(0,-1.5,0),F.curtain.scale.set(2*s+3,2*s+16,1),F.beacon.position.set(0,0,-r-13),F.beacon.scale.setScalar(3),F.halo.scale.setScalar(s*3.4),F.core.scale.setScalar(96)},bloom(F){F.hull.visible=!0,F.hull.scale.set(1,r*1.6,1),F.throat.scale.set(1,r*1.6,1),F.ringF.geometry=d.thin,F.ringB.geometry=d.thin,F.ringF.position.set(0,0,r*.85),F.ringB.position.set(0,0,-r*.95),F.ringF.visible=F.ringB.visible=!0,F.gasket.visible=!0;let J=0;vt(F.frame,J++,-8.5,-24.4,0,.16,0,2.6,12.4,2.6),vt(F.frame,J++,8.5,-24.4,0,-.16,0,2.6,12.4,2.6),vt(F.frame,J++,0,-24,-6,0,.14,2.4,12.4,2.4),vt(F.frame,J++,0,-18.6,0,0,0,13,3.2,13),F.frame.count=J;for(let Y=0;Y<10;Y++)ui(F.spokes,Y,Y/10*Math.PI*2,s+2.6,0,3.6,1.5,2.2);F.spokes.count=10,F.petals.count=Tu,F.petals.visible=!0,F.plinth.geometry=a,F.plinth.position.set(0,-25.6,0),F.plinth.scale.set(26,6,26),F.steps.geometry=a,F.steps.position.set(0,Ua+.7,0),F.steps.scale.set(38,2.6,38),F.beacon.position.set(0,0,-r-6),F.beacon.scale.setScalar(3.4),F.membrane.visible=!0,F.throat.visible=!0,F.halo.scale.setScalar(s*3.6),F.core.scale.setScalar(92)},lattice(F){F.ringF.geometry=d.thin,F.ringB.geometry=d.thin,F.ringF.position.set(0,0,r+.4),F.ringB.position.set(0,0,-r-.4),F.ringF.visible=F.ringB.visible=!0;let J=0;vt(F.frame,J++,-(s+7),-24.2,0,.2,0,2.6,12.5,2.6),vt(F.frame,J++,s+7,-24.2,0,-.2,0,2.6,12.5,2.6),vt(F.frame,J++,0,-24.2,-(r+5),0,-.18,2.6,12.5,2.6),vt(F.frame,J++,0,-19.6,0,0,0,2*(s+7),2.4,r*2+3),F.frame.count=J;for(let Y=0;Y<18;Y++){let A=Y/18*Math.PI*2,U=Y%2?1:-1;ui(F.spokes,Y,A,s+1.9,U*r*.28,1.05,15.5,3,U*.62)}F.spokes.count=18,F.plinth.geometry=a,F.plinth.position.set(0,-25.3,0),F.plinth.scale.set(30,5.6,30),F.steps.position.set(0,Ua+.6,0),F.steps.scale.set(2*(s+16),2.4,r*2+22),F.beacon.position.set(0,0,-r-10),F.beacon.scale.setScalar(2.8),F.membrane.visible=!0,F.throat.visible=!0,F.halo.scale.setScalar(s*3.2),F.core.scale.setScalar(86)},sunwheel(F){F.hull.visible=!0,F.ringF.geometry=d.thick,F.ringB.geometry=d.thick,F.ringF.position.set(0,0,r),F.ringB.position.set(0,0,-r),F.ringF.visible=F.ringB.visible=!0,F.gasket.visible=!0,F.gasket.scale.setScalar(1.18);let J=0;vt(F.frame,J++,0,-24.6,0,0,0,11,8.6,r*2+6),vt(F.frame,J++,-11.8,-19.4,0,.58,0,3,15,5),vt(F.frame,J++,11.8,-19.4,0,-.58,0,3,15,5),vt(F.frame,J++,0,s+4.6,0,0,0,7.4,3,r*2+2),F.frame.count=J;for(let Y=0;Y<16;Y++)ui(F.spokes,Y,Y/16*Math.PI*2,s+5.4,0,9.4,2.8,1,.52);for(let Y=0;Y<4;Y++)ui(F.spokes,16+Y,Y*Math.PI*.5+Math.PI*.25,s+10.5,0,19,1.9,2.6);F.spokes.count=20,F.plinth.position.set(0,-25,0),F.plinth.scale.set(2*(s-1),6.6,r*2+11),F.steps.position.set(0,Ua+.6,0),F.steps.scale.set(2*(s+9),2.4,r*2+16),F.beacon.position.set(0,0,-r-8),F.beacon.scale.setScalar(4.2),F.membrane.visible=!0,F.throat.visible=!0,F.halo.scale.setScalar(s*3.3),F.core.scale.setScalar(100)}};function T(F,J){let Y=_S+qd*Math.cos(J),A=qd*Math.sin(J);for(let U=0;U<Tu;U++){let O=U/Tu*Math.PI*2;vt(F.petals,U,Math.cos(O)*Y,Math.sin(O)*Y,A,O+Math.PI*.5,J,9,qd*2,2.6)}F.petals.instanceMatrix.needsUpdate=!0}let I=[],P=-1,L=ES(),z=[];function $(F,J){let Y=d0[J],A=m.acquire();A.visible=!0,A.position.set(0,2,-F),A.rotation.set(0,0,0),A.userData.tint=null,E(A.userData,Y),I.push({kind:"checkpoint",tier:J,g:A,distance:F,x:0,y:2,z:-F,radius:Y.radius,passed:!1,flash:0,scroll:0})}function V(F,J,Y){let A=x.acquire(),U=A.userData,O=SS(Y),q=Cu[O];w(U),y[O](U),U.frame.visible=U.frame.count>0,U.frame.instanceMatrix.needsUpdate=!0,U.spokes.visible=U.spokes.count>0,U.spokes.instanceMatrix.needsUpdate=!0,U.chromeMat.color.set(q.chrome),U.stoneMat.color.set(q.stone),U.hullMat.color.set(q.hull),U.family=O,U.tint=null,A.visible=!0,A.position.set(0,2,-F),A.rotation.set(0,0,0),I.push({kind:"portal",g:A,distance:F,worldIndex:J,nextWorld:Y,family:O,x:0,y:2,z:-F,radius:Xd,passed:!1,flash:0,spin:0})}function X(F){let J=I.indexOf(F);J>=0&&I.splice(J,1),F.kind==="portal"?x.release(F.g):m.release(F.g)}function B(F,J){let Y=F+gS,A=Math.max(0,Math.floor(Math.max(0,P)/At)),U=Math.floor(Y/At);for(let O=A;O<=U;O++){let q=O*At;for(let te of L){let K=q+te.local;K<=P||K>Y||$(K,te.tier)}let H=q+At;if(H>P&&H<=Y){let te=J.worldAt(H+1);V(H,O,te.world)}}P=Math.max(P,Y)}function Q(F,J){F.tint!==J&&(F.tint=J,F.membraneMat.color.set(J),F.curtainMat.color.set(J),F.throatMat.color.set(J),F.haloMat.color.set(J),F.coreMat.color.set(J),F.hullMat.emissive.set(J),F.beaconMat.color.set(J).lerp(wS,.7))}function he(F,J){F.tint!==J&&(F.tint=J,F.bandMat.color.set(J),F.band2Mat.color.set(J),F.glow.material.color.set(J),F.flare.material.color.set(J))}function ae(F,J,Y,A,U,O,q){z.length=0,i.update(F),B(U,O);let H=Y.state.pos.x,te=Y.state.pos.y,K=Y.state.pos.z,de=A.z-K;for(let be=I.length-1;be>=0;be--){let oe=I[be];if(K<oe.z-xS){X(oe);continue}let me=oe.g.userData,we=$e((K-oe.z)/90,0,1),Se=.12+.88*we,ge=.08+.92*we;if(oe.kind==="checkpoint"){let Ae=d0[oe.tier];if(oe.scroll-=F*.35,me.bandMat.map.offset.x=oe.scroll,Ae.band2&&(me.band2Mat.map.offset.x=-oe.scroll*.62),oe.flash>0?(oe.flash=Math.max(0,oe.flash-F*1.8),me.glow.material.opacity=oe.flash*.85*Se,me.bandMat.opacity=Ae.bandOpacity*(1+oe.flash*2.4),me.glow.scale.setScalar(Ae.glow*(1+oe.flash*.7))):me.glow.material.opacity=(.1+Math.sin(J*1.6+oe.distance)*.04)*Se,Ae.band2&&(me.band2Mat.opacity=Ae.bandOpacity*.55*(1+oe.flash*1.8)*Se),Ae.flare&&(me.flare.material.opacity=(.055+Math.sin(J*.9+oe.distance)*.02+oe.flash*.3)*Se),he(me,q.gateColor),!oe.passed&&K<=oe.z){oe.passed=!0,oe.flash=1;let Le=de>1e-4?$e((A.z-oe.z)/de,0,1):1,Ke=st(A.x,H,Le),G=st(A.y,te,Le),Ze=Math.hypot(Ke-oe.x,G-oe.y)<=oe.radius*.96,Ne=oe.tier==="epic"?96:oe.tier==="major"?54:22,D=oe.tier==="epic"?1.9:oe.tier==="major"?1.3:.85;i.emit(oe.x,oe.y,oe.z,Ze?Ne:Math.round(Ne*.4),q.gateColor,Ze?D:D*.5),z.push({type:"checkpoint",tier:oe.tier,through:Ze,distance:oe.distance,x:oe.x,y:oe.y,z:oe.z,shake:Ae.shake,label:Ae.label})}}else{let Ae=Cu[oe.family]||Cu.arch;if(oe.spin+=F*.22,me.membrane.rotation.z=oe.spin,me.membraneMat.map.offset.x=oe.spin*.1,me.spokes.rotation.z=oe.spin*(Ae.spoke/.22),Ae.iris){let Le=Math.max(.02,.34+Math.sin(J*.55+oe.distance*.01)*.2-oe.flash*.3);me.petals.rotation.z=oe.spin*.4,T(me,Le)}if(me.throatMat.map.offset.x=-oe.spin*.35,me.curtainMat.map.offset.x=oe.spin*.55,Q(me,q.gateColor),me.coreMat.opacity=(.3+Math.sin(J*1.1)*.07+oe.flash*.6)*Se,me.haloMat.opacity=(.34+Math.sin(J*.8+1.7)*.07+oe.flash*.5)*Se,me.membraneMat.opacity=.66*ge,me.curtainMat.opacity=.62*ge,me.throatMat.opacity=.5*ge*ge,me.beaconMat.opacity=.3+.55*we,oe.flash>0&&(oe.flash=Math.max(0,oe.flash-F*1.4),me.membrane.scale.setScalar(1+oe.flash*.22)),!oe.passed&&K<=oe.z){oe.passed=!0,oe.flash=1;let Le=de>1e-4?$e((A.z-oe.z)/de,0,1):1,Ke=st(A.x,H,Le),G=st(A.y,te,Le),Ze=Math.hypot(Ke-oe.x,G-oe.y)<=oe.radius*.96;i.emit(oe.x,oe.y,oe.z,Ze?130:44,q.gateColor,Ze?2.2:1),z.push({type:"portal",through:Ze,worldIndex:oe.worldIndex,nextWorld:oe.nextWorld,distance:oe.distance,x:oe.x,y:oe.y,z:oe.z})}}}return z}function W(){for(let F of I.slice())X(F);i.clear(),P=-1}function ne(){i.setScale(window.innerHeight)}return{update:ae,reset:W,onResize:ne,gates:I,burst:i,get count(){return I.length}}}function p0(){let n={pips:3,max:3,clean:0,regenSeconds:18,exposed:0,hits:0};function e(s={}){n.max=Math.max(1,Math.round(s.shieldMax??3)),n.regenSeconds=Math.max(4,s.shieldRegen??18),n.pips=n.max,n.clean=0,n.exposed=0,n.hits=0}function t(){return n.hits++,n.clean=0,n.pips<=0?{fatal:!0,pips:0,wasExposed:!0}:(n.pips--,n.pips===0&&(n.exposed=0),{fatal:!1,pips:n.pips,wasExposed:!1})}function i(s){return n.pips===0&&(n.exposed+=s),n.pips>=n.max?(n.clean=0,!1):(n.clean+=s,n.clean>=n.regenSeconds?(n.clean=0,n.pips++,n.pips>0&&(n.exposed=0),!0):!1)}return{state:n,reset:e,hit:t,update:i,get regenFraction(){return n.pips>=n.max?0:Math.min(1,n.clean/n.regenSeconds)},get exposed(){return n.pips===0}}}zt();var _n=n=>440*Math.pow(2,(n-69)/12),m0=[[50,57,62,66,69,76],[45,57,61,64,69,73],[47,54,59,62,66,71],[43,55,59,62,66,69]],Au=7.5;function g0(n={}){let e=null,t=null,i=null,s=null,r=null,o=null,a=null,l=null,c=null,u=!1,d=$e(n.volume??.7,0,1),h=!!n.muted,g=0,v=0,S=null;function p(){let q=window.AudioContext||window.webkitAudioContext;if(!q)return!1;e=new q,t=e.createGain(),t.gain.value=h?0:d;let H=e.createDynamicsCompressor();H.threshold.value=-14,H.knee.value=26,H.ratio.value=5,H.attack.value=.006,H.release.value=.28,t.connect(H),H.connect(e.destination),a=e.createConvolver(),a.buffer=f(e,2.6,2.4),l=e.createGain(),l.gain.value=.42,a.connect(l),l.connect(t),i=e.createGain(),i.gain.value=.26,i.connect(t),i.connect(a),s=e.createGain(),s.gain.value=0,s.connect(t),s.connect(a),r=e.createGain(),r.gain.value=0,r.connect(t),r.connect(a),o=e.createGain(),o.gain.value=.55,o.connect(t);let te=e.createGain();return te.gain.value=.3,o.connect(te),te.connect(a),c=b(e,2),!0}function f(q,H,te){let K=q.sampleRate,de=Math.floor(K*H),be=q.createBuffer(2,de,K);for(let oe=0;oe<2;oe++){let me=be.getChannelData(oe);for(let we=0;we<de;we++)me[we]=(Math.random()*2-1)*Math.pow(1-we/de,te)}return be}function b(q,H){let te=Math.floor(q.sampleRate*H),K=q.createBuffer(1,te,q.sampleRate),de=K.getChannelData(0);for(let be=0;be<te;be++)de[be]=Math.random()*2-1;return K}function _(q){let H=m0[g%m0.length];g++;let te=2.4,K=Au,de=3.4;H.forEach((be,oe)=>{for(let me of[-6,6]){let we=e.createOscillator();we.type=oe<2?"triangle":"sawtooth",we.frequency.value=_n(be),we.detune.value=me;let Se=e.createBiquadFilter();Se.type="lowpass",Se.Q.value=.7,Se.frequency.setValueAtTime(420,q),Se.frequency.linearRampToValueAtTime(1500+oe*260,q+K*.55),Se.frequency.linearRampToValueAtTime(500,q+K+de);let ge=e.createGain(),Ae=.16/(1+oe*.35);ge.gain.setValueAtTime(1e-4,q),ge.gain.exponentialRampToValueAtTime(Ae,q+te),ge.gain.setValueAtTime(Ae,q+K),ge.gain.exponentialRampToValueAtTime(1e-4,q+K+de),we.connect(Se),Se.connect(ge),ge.connect(i),we.start(q),we.stop(q+K+de+.1)}}),m(q,H),E(q,H)}function m(q,H){let te=Au/12;for(let K=0;K<12;K++){let de=H[(K*2+1)%H.length]+12,be=q+K*te,oe=e.createOscillator();oe.type="triangle",oe.frequency.value=_n(de);let me=e.createGain();me.gain.setValueAtTime(1e-4,be),me.gain.exponentialRampToValueAtTime(.09,be+.02),me.gain.exponentialRampToValueAtTime(1e-4,be+te*1.6),oe.connect(me),me.connect(s),oe.start(be),oe.stop(be+te*1.7)}}function E(q,H){let te=Au;for(let K of H.slice(-2)){let de=e.createOscillator();de.type="sine",de.frequency.value=_n(K+24);let be=e.createGain();be.gain.setValueAtTime(1e-4,q),be.gain.exponentialRampToValueAtTime(.05,q+2.6),be.gain.exponentialRampToValueAtTime(1e-4,q+te+2.4),de.connect(be),be.connect(r),de.start(q),de.stop(q+te+2.6)}}function x(q){if(!e||!s)return;let H=$e((q-5)/7,0,1),te=$e((q-12)/8,0,1);s.gain.setTargetAtTime(H*.45,e.currentTime,.9),r.gain.setTargetAtTime(te*.4,e.currentTime,1.4)}function w(){if(!e)return;let q=e.currentTime+2;for(;v<q;)_(v),v+=Au-1.2}function y(q,{type:H="sine",freq:te=660,dur:K=.3,peak:de=.3,sweepTo:be=null,delay:oe=0}){if(!e)return;let me=e.currentTime+oe,we=e.createOscillator();we.type=H,we.frequency.setValueAtTime(te,me),be&&we.frequency.exponentialRampToValueAtTime(be,me+K);let Se=e.createGain();Se.gain.setValueAtTime(1e-4,me),Se.gain.exponentialRampToValueAtTime(de,me+.008),Se.gain.exponentialRampToValueAtTime(1e-4,me+K),we.connect(Se),Se.connect(q),we.start(me),we.stop(me+K+.05)}function T(q,{dur:H=.4,peak:te=.25,type:K="bandpass",f0:de=400,f1:be=2400,q:oe=1.2,delay:me=0}){if(!e||!c)return;let we=e.currentTime+me,Se=e.createBufferSource();Se.buffer=c,Se.loop=!0;let ge=e.createBiquadFilter();ge.type=K,ge.Q.value=oe,ge.frequency.setValueAtTime(de,we),ge.frequency.exponentialRampToValueAtTime(Math.max(40,be),we+H);let Ae=e.createGain();Ae.gain.setValueAtTime(1e-4,we),Ae.gain.exponentialRampToValueAtTime(te,we+H*.18),Ae.gain.exponentialRampToValueAtTime(1e-4,we+H),Se.connect(ge),ge.connect(Ae),Ae.connect(q),Se.start(we),Se.stop(we+H+.05)}function I(q=1,H=!1){if(!u||!e)return;let te=[0,2,4,7,9,12,14,16,19,21,24],K=te[Math.min(te.length-1,Math.max(0,q-1))],de=_n(74+K);y(o,{type:"triangle",freq:de,dur:H?.5:.32,peak:H?.3:.2}),y(o,{type:"sine",freq:de*2,dur:.22,peak:.1}),H&&y(o,{type:"sine",freq:de*3,dur:.4,peak:.07,delay:.04})}function P(){if(!u||!e)return;let q=78;[0,4,7,11,14].forEach((H,te)=>{y(o,{type:"sine",freq:_n(q+H),dur:.55,peak:.15,delay:te*.035})}),T(o,{dur:.6,peak:.09,f0:1800,f1:7e3,q:.9})}function L(){!u||!e||(T(o,{dur:.75,peak:.2,f0:260,f1:3600,q:1.6}),y(o,{type:"sawtooth",freq:110,sweepTo:440,dur:.6,peak:.1}))}function z(){!u||!e||(T(o,{dur:.9,peak:.1,f0:900,f1:3200,q:2.4}),y(o,{type:"sine",freq:_n(81),dur:.7,peak:.1}))}function $(){!u||!e||(T(o,{dur:.32,peak:.16,type:"lowpass",f0:900,f1:160,q:.8}),y(o,{type:"sine",freq:180,sweepTo:70,dur:.28,peak:.14}))}function V(){!u||!e||y(o,{type:"sine",freq:920,dur:.09,peak:.13})}function X(){!u||!e||[0,4,7,12].forEach((q,H)=>{y(o,{type:"triangle",freq:_n(69+q),dur:1.3,peak:.17,delay:H*.13})})}function B(q="minor"){if(!u||!e)return;if(q==="minor"){y(o,{type:"sine",freq:_n(81),dur:.28,peak:.13}),y(o,{type:"sine",freq:_n(88),dur:.22,peak:.08,delay:.05});return}(q==="epic"?[0,4,7,11,14,19]:[0,5,9,12]).forEach((te,K)=>{y(o,{type:"triangle",freq:_n(76+te),dur:q==="epic"?1.1:.7,peak:q==="epic"?.18:.14,delay:K*.055})}),T(o,{dur:q==="epic"?1.2:.7,peak:q==="epic"?.12:.08,f0:1400,f1:8e3,q:.8})}function Q(){!u||!e||(T(o,{dur:1.5,peak:.16,f0:300,f1:6500,q:1.1}),[0,7,12,16,19].forEach((q,H)=>{y(o,{type:"sine",freq:_n(69+q),dur:1.6,peak:.15,delay:H*.07})}),y(o,{type:"triangle",freq:_n(45),sweepTo:_n(69),dur:1.1,peak:.11}))}function he(){!u||!e||(y(o,{type:"sine",freq:320,sweepTo:140,dur:.55,peak:.2}),T(o,{dur:.5,peak:.13,type:"lowpass",f0:1600,f1:220,q:.7}))}function ae(){!u||!e||(y(o,{type:"sine",freq:_n(76),sweepTo:_n(83),dur:.4,peak:.11}),y(o,{type:"sine",freq:_n(88),dur:.3,peak:.06,delay:.08}))}function W(){!u||!e||[0,4,7,12,16].forEach((q,H)=>{y(o,{type:"triangle",freq:_n(72+q),dur:1.1,peak:.16,delay:H*.1})})}async function ne(){if(u)return!0;if(!e&&!p())return!1;try{e.state==="suspended"&&await e.resume()}catch{return!1}return u=!0,v=e.currentTime+.15,w(),S=setInterval(w,500),!0}function F(q){d=$e(q,0,1),t&&t.gain.setTargetAtTime(h?0:d,e.currentTime,.04)}function J(q){h=!!q,t&&t.gain.setTargetAtTime(h?0:d,e.currentTime,.04)}function Y(q){i&&e&&i.gain.setTargetAtTime(q,e.currentTime,.3)}function A(){e&&e.state==="running"&&e.suspend().catch(()=>{})}function U(){u&&e&&e.state==="suspended"&&e.resume().catch(()=>{})}function O(){S&&clearInterval(S),e&&e.close().catch(()=>{}),e=null,u=!1}return{start:ne,dispose:O,suspend:A,resume:U,setVolume:F,setMuted:J,setPadLevel:Y,setIntensity:x,collect:I,ring:P,boost:L,stream:z,bump:$,click:V,chime:X,checkpoint:B,portal:Q,shieldBreak:he,shieldRegen:ae,levelUp:W,get started(){return u},get volume(){return d},get muted(){return h}}}zt();Si();zt();mn();mn();mn();var ka={radiance:{name:"Radiance",blurb:"Everything you touch is worth more.",color:"#FFD24C",glow:"#FFB36B"},momentum:{name:"Momentum",blurb:"Faster, and rewarded for it.",color:"#63D8F0",glow:"#2FA8C8"},resilience:{name:"Resilience",blurb:"Mistakes stop costing you runs.",color:"#8CD867",glow:"#3FD1C0"},confluence:{name:"Confluence",blurb:"Rewards for refusing to specialise.",color:"#F09ACB",glow:"#C9A7F0"}},Ft={evo_spark:{name:"Spark",blurb:"Where every wisp begins.",branch:"radiance",tier:0,root:!0,cost:null,requires:[],add:{},mul:{}},evo_gleam:{name:"Gleam",blurb:"Light orbs are worth more.",detail:"+8% orb score",branch:"radiance",tier:1,cost:{droplets:500},requires:["evo_spark"],add:{orbValue:.08},mul:{}},evo_facet:{name:"Facet",blurb:"The multiplier hangs on longer between pickups.",detail:"+0.8s combo grace",branch:"radiance",tier:2,cost:{droplets:1200},requires:["evo_gleam"],add:{comboGrace:.8},mul:{}},evo_lumen:{name:"Lumen",blurb:"Violet orbs pay out considerably more.",detail:"+25% big-orb score",branch:"radiance",tier:2,cost:{droplets:1400},requires:["evo_gleam"],add:{bigOrbValue:.25},mul:{}},evo_refract:{name:"Refraction",blurb:"Ring gates carry more score through the combo.",detail:"+15% ring score",branch:"radiance",tier:3,cost:{droplets:2800},requires:["evo_facet","evo_lumen"],add:{ringValue:.15},mul:{}},evo_brilliance:{name:"Brilliance",blurb:"A flat multiplier over the whole run.",detail:"\xD71.12 all score",branch:"radiance",tier:4,cost:{droplets:6e3},reqLevel:12,requires:["evo_refract"],add:{},mul:{scoreMultiplier:1.12}},evo_prism_form:{name:"Prism Form",blurb:"The wisp crystallises. Light bends around it.",detail:"\xD71.25 all score \xB7 new form",branch:"radiance",tier:5,form:"prism",capstone:!0,cost:{prisms:7},reqRebirth:1,requires:["evo_brilliance"],add:{},mul:{scoreMultiplier:1.25}},evo_glide:{name:"Glide",blurb:"A higher cruising speed.",detail:"+4% base speed",branch:"momentum",tier:1,cost:{droplets:500},requires:["evo_spark"],add:{},mul:{speedScale:1.04}},evo_draft:{name:"Draft",blurb:"Boost lasts noticeably longer.",detail:"10% slower boost drain",branch:"momentum",tier:2,cost:{droplets:1200},requires:["evo_glide"],add:{},mul:{boostDrain:.9}},evo_current:{name:"Current Affinity",blurb:"Riding a stream is worth more.",detail:"+0.12 stream multiplier",branch:"momentum",tier:2,cost:{droplets:1400},requires:["evo_glide"],add:{streamMultiplier:.12},mul:{}},evo_slipstream:{name:"Slipstream",blurb:"Orbs put more back into the tank.",detail:"+20% boost refill",branch:"momentum",tier:3,cost:{droplets:2800},requires:["evo_draft","evo_current"],add:{},mul:{boostRefill:1.2}},evo_velocity:{name:"Terminal Velocity",blurb:"Much faster \u2014 and the speed itself now pays.",detail:"+9% speed \xB7 \xD71.10 score",branch:"momentum",tier:4,cost:{droplets:6e3},reqLevel:12,requires:["evo_slipstream"],add:{},mul:{speedScale:1.09,scoreMultiplier:1.1}},evo_comet_form:{name:"Comet Form",blurb:"The trail ignites. You stop gliding and start burning.",detail:"+15% speed \xB7 new form",branch:"momentum",tier:5,form:"comet",capstone:!0,cost:{prisms:7},reqRebirth:1,requires:["evo_velocity"],add:{},mul:{speedScale:1.15}},evo_ward:{name:"Ward",blurb:"One more pip of integrity.",detail:"+1 shield pip",branch:"resilience",tier:1,cost:{droplets:500},requires:["evo_spark"],add:{shieldMax:1},mul:{}},evo_mend:{name:"Mend",blurb:"Clean flying restores a pip sooner.",detail:"2s faster regen",branch:"resilience",tier:2,cost:{droplets:1200},requires:["evo_ward"],add:{shieldRegen:-2},mul:{}},evo_draw:{name:"Draw",blurb:"Orbs come to you from further out.",detail:"+2.2m magnet",branch:"resilience",tier:2,cost:{droplets:1400},requires:["evo_ward"],add:{magnet:2.2},mul:{}},evo_temper:{name:"Temper",blurb:"A brush with an obstacle no longer breaks your combo \u2014 though it still costs speed, and only once every 20 seconds.",detail:"combo survives one hit / 20s",branch:"resilience",tier:3,cost:{droplets:2800},requires:["evo_mend","evo_draw"],add:{comboArmor:1},mul:{}},evo_aegis:{name:"Aegis",blurb:"Another pip, and checkpoints pay better.",detail:"+1 pip \xB7 +15% checkpoint yield",branch:"resilience",tier:4,cost:{droplets:6e3},reqLevel:12,requires:["evo_temper"],add:{shieldMax:1},mul:{checkpointBonus:1.15}},evo_bastion_form:{name:"Bastion Form",blurb:"Armoured, ringed, and very hard to stop.",detail:"+2 pips \xB7 one revive per run \xB7 new form",branch:"resilience",tier:5,form:"bastion",capstone:!0,cost:{prisms:7},reqRebirth:1,requires:["evo_aegis"],add:{shieldMax:2,revives:1},mul:{}},evo_sheen:{name:"Sheen",blurb:"A gentle gloss over everything you score.",detail:"\xD71.05 all score",branch:"radiance",tier:2,cost:{droplets:1600},requires:["evo_gleam"],add:{},mul:{scoreMultiplier:1.05}},evo_caustics:{name:"Caustics",blurb:"The chain holds longer, and every orb in it is worth a little more.",detail:"+0.7s combo grace \xB7 +5% orb score",branch:"radiance",tier:3,cost:{droplets:2700},requires:["evo_facet","evo_sheen"],add:{comboGrace:.7,orbValue:.05},mul:{}},evo_dewfall:{name:"Dewfall",blurb:"Droplets bead on the wisp and come off richer.",detail:"+8% Droplets earned",branch:"radiance",tier:4,cost:{droplets:6e3},reqLevel:12,requires:["evo_lumen","evo_refract"],add:{},mul:{dropletGain:1.08}},evo_updraft:{name:"Updraft",blurb:"Passing orbs top the boost tank up as you go.",detail:"+12% boost refill",branch:"momentum",tier:2,cost:{droplets:1300},requires:["evo_glide"],add:{},mul:{boostRefill:1.12}},evo_tailwind:{name:"Tailwind",blurb:"Streams carry you further, and a touch faster.",detail:"+0.10 stream multiplier \xB7 +3% speed",branch:"momentum",tier:3,cost:{droplets:2600},requires:["evo_current"],add:{streamMultiplier:.1},mul:{speedScale:1.03}},evo_haven:{name:"Haven",blurb:"Checkpoint gates hand back more for reaching them.",detail:"+10% checkpoint yield",branch:"resilience",tier:2,cost:{droplets:1400},requires:["evo_ward"],add:{},mul:{checkpointBonus:1.1}},evo_undertow:{name:"Undertow",blurb:"Orbs drift in from wider, so the chain keeps itself alive.",detail:"+1.6m magnet \xB7 +0.4s combo grace",branch:"resilience",tier:3,cost:{droplets:2900},requires:["evo_draw","evo_haven"],add:{magnet:1.6,comboGrace:.4},mul:{}},evo_keel:{name:"Keel",blurb:"Steadier in the air, and it mends itself sooner.",detail:"+1 pip \xB7 3s faster regen",branch:"resilience",tier:4,cost:{droplets:5800},reqLevel:12,requires:["evo_temper","evo_undertow"],add:{shieldMax:1,shieldRegen:-3},mul:{}},evo_harmony:{name:"Harmony",blurb:"Balance across two disciplines pays a dividend.",detail:"+6% Droplets earned",branch:"confluence",tier:4,cost:{droplets:3500},requiresAll:[],requiresBranches:2,requiresTier:3,add:{},mul:{dropletGain:1.06}},evo_apex:{name:"Apex",blurb:"All three disciplines, mastered. Very few wisps get here.",detail:"\xD71.30 score \xB7 \xD71.20 Droplets",branch:"confluence",tier:5,capstone:!0,cost:{prisms:16},reqRebirth:2,requiresAll:["evo_brilliance","evo_velocity","evo_aegis"],add:{},mul:{scoreMultiplier:1.3,dropletGain:1.2}}},Zn=Object.keys(Ft),ZA=Zn.filter(n=>Ft[n].root),$d=n=>Array.isArray(n.evolution)?n.evolution:[];function an(n,e){return Ft[e]?.root===!0||$d(n).includes(e)}function x0(n,e){let t=new Set;for(let i of $d(n)){let s=Ft[i];s&&!s.root&&s.branch!=="confluence"&&s.tier>=e&&t.add(s.branch)}return t.size}function RS(n,e){let t=Ft[e];return t?t.root?!0:!(Array.isArray(t.requiresAll)&&t.requiresAll.length&&!t.requiresAll.every(i=>an(n,i))||t.requiresBranches&&x0(n,t.requiresTier||1)<t.requiresBranches||Array.isArray(t.requires)&&t.requires.length&&!t.requires.some(i=>an(n,i))):!1}function FS(n,e){let t=Ft[e];return!(!t||t.reqLevel&&pn(n.xp)<t.reqLevel||t.reqRebirth&&(n.rebirthCount||0)<t.reqRebirth)}function ir(n,e){return!an(n,e)&&RS(n,e)&&FS(n,e)}function y0(n,e){let t=Ft[e];if(!t)return"Unknown node";if(an(n,e))return null;if(t.reqRebirth&&(n.rebirthCount||0)<t.reqRebirth)return`Requires Rebirth ${t.reqRebirth}`;if(t.reqLevel&&pn(n.xp)<t.reqLevel)return`Requires Level ${t.reqLevel}`;if(Array.isArray(t.requiresAll)&&t.requiresAll.length){let i=t.requiresAll.filter(s=>!an(n,s));if(i.length)return`Requires ${i.map(s=>Ft[s].name).join(", ")}`}return t.requiresBranches&&x0(n,t.requiresTier||1)<t.requiresBranches?`Requires tier-${t.requiresTier} nodes in ${t.requiresBranches} branches`:Array.isArray(t.requires)&&t.requires.length&&!t.requires.some(i=>an(n,i))?`Requires ${t.requires.map(i=>Ft[i].name).join(" or ")}`:null}function Ba(n,e){return an(n,e)?null:Ft[e]?.cost||null}function oo(n){let e=null;for(let t of Zn){let i=Ft[t];!i.form||!an(n,t)||(!e||i.tier>Ft[e].tier)&&(e=t)}return e?Ft[e].form:"spark"}function Ru(n){let e=Object.create(null),t=Object.create(null);for(let i of $d(n)){let s=Ft[i];if(s){for(let[r,o]of Object.entries(s.add||{}))Number.isFinite(o)&&(e[r]=(e[r]||0)+o);for(let[r,o]of Object.entries(s.mul||{}))Number.isFinite(o)&&(t[r]=(t[r]??1)*o)}}return{add:e,mul:t}}function _0(n,e,t){if(!ir(n,e))return!1;let i=Ba(n,e);return!i||!t.spend(n,i)?!1:(Array.isArray(n.evolution)||(n.evolution=[]),n.evolution.push(e),!0)}function v0(n){let e=null,t=null;for(let i of Zn){if(!ir(n,i))continue;let s=Ft[i].cost;if(!s)continue;let r=!!s.prisms,o=s.droplets||0;!r&&(n.droplets||0)>=o&&(!e||o<Ft[e].cost.droplets)&&(e=i),r||(!t||o<Ft[t].cost.droplets)&&(t=i)}return e||t||null}function b0(n){if(!Array.isArray(n.evolution))return n.evolution=[],0;let e=0,t=[];for(let i of n.evolution){let s=Ft[i];if(s){if(s.cost?.prisms){t.push(i);continue}e+=s.cost?.droplets||0}}return n.evolution=t,n.droplets=(n.droplets||0)+e,e}function M0(n){if(!Array.isArray(n.evolution)){n.evolution=[];return}n.evolution=n.evolution.filter(e=>!!Ft[e]?.cost?.prisms)}var IS=1e4,PS=6e3;function Zd(n){return IS+(n.rebirthCount||0)*PS}function Fu(n){return n.cycleDistance>=Zd(n)}function DS(n){return Math.min(1,n.cycleDistance/Zd(n))}function S0(n){let e=Math.floor(Math.sqrt(n.cycleDroplets/260)),t=Math.floor(n.cycleDistance/25e3);return Math.max(1,e+t)}function Yd(n){return 1+n*.12}function E0(n){return{eligible:Fu(n),requirement:Zd(n),progress:DS(n),prisms:S0(n),nextCount:(n.rebirthCount||0)+1,multiplierNow:Yd(n.rebirthCount||0),multiplierNext:Yd((n.rebirthCount||0)+1),resets:[`${Math.floor(n.droplets).toLocaleString("en-US")} Droplets`,"All purchased upgrades","Droplet nodes on the Evolution Tree","Cycle progress"],keeps:["Every cosmetic you own",`Level ${pn(n.xp)} and all XP`,"Worlds and Realms reached","All lifetime records",`${n.prisms} Prisms`,"Evolution Forms (Prism nodes)"]}}function w0(n){if(!Fu(n))return null;let e=S0(n);return n.prisms+=e,n.rebirthCount=(n.rebirthCount||0)+1,n.droplets=0,n.upgrades={},M0(n),n.cycleDistance=0,n.cycleDroplets=0,{prisms:e,count:n.rebirthCount,multiplier:Yd(n.rebirthCount)}}er();mn();var C0=[{id:"q_orbs_run",scope:"run",tier:1,text:n=>`Collect ${n} light orbs in a single run`,targets:[80,120,170],read:n=>n.orbs||0,reward:n=>({droplets:Math.round(n*3.2),seasonXp:90})},{id:"q_rings_run",scope:"run",tier:1,text:n=>`Fly through ${n} ring gates in a single run`,targets:[12,20,28],read:n=>n.rings||0,reward:n=>({droplets:Math.round(n*22),seasonXp:100})},{id:"q_distance_run",scope:"run",tier:1,text:n=>`Reach ${n.toLocaleString("en-US")} m in a single run`,targets:[2500,4e3,6e3],read:n=>Math.floor(n.distance||0),reward:n=>({droplets:Math.round(n*.16),seasonXp:110})},{id:"q_combo",scope:"run",tier:2,text:n=>`Reach a \xD7${n} combo`,targets:[8,12,16],read:n=>n.bestCombo||1,reward:n=>({droplets:n*90,seasonXp:130})},{id:"q_clean",scope:"run",tier:2,text:n=>`Fly ${n.toLocaleString("en-US")} m without touching anything`,targets:[900,1500,2200],read:n=>Math.floor(Math.max(n.bestCleanDistance||0,n.cleanDistance||0)),reward:n=>({droplets:Math.round(n*.5),seasonXp:160})},{id:"q_checkpoints",scope:"run",tier:2,text:n=>`Pass ${n} checkpoints in a single run`,targets:[4,7,10],read:n=>n.checkpoints||0,reward:n=>({droplets:n*130,seasonXp:120})},{id:"q_score_run",scope:"run",tier:3,text:n=>`Score ${n.toLocaleString("en-US")} in a single run`,targets:[2e4,45e3,8e4],read:n=>Math.floor(n.score||0),reward:n=>({droplets:Math.round(n*.03),seasonXp:180})},{id:"q_portal",scope:"run",tier:3,text:n=>`Pass ${n} Portal${n>1?"s":""} in a single run`,targets:[1,2,3],read:n=>n.portals||0,reward:n=>({droplets:n*420,seasonXp:200})},{id:"q_orbs_total",scope:"stats",tier:1,text:n=>`Collect ${n.toLocaleString("en-US")} light orbs`,targets:[400,700,1100],read:(n,e)=>e.stats?.orbs||0,reward:n=>({droplets:Math.round(n*1.1),seasonXp:100})},{id:"q_rings_total",scope:"stats",tier:2,text:n=>`Fly through ${n} ring gates`,targets:[60,110,170],read:(n,e)=>e.stats?.rings||0,reward:n=>({droplets:n*14,seasonXp:120})}],A0=Object.fromEntries(C0.map(n=>[n.id,n])),T0=3,Iu=1;function R0(n=gn(),e=0){let t=new zi(Fs(`aerodrift-quests-${n}-${e}`)),i=[...C0],s=[];for(let r of[1,2,3]){let o=i.filter(l=>l.tier===r);if(!o.length)continue;let a=t.pick(o);if(s.push(a),i.splice(i.indexOf(a),1),s.length>=T0)break}for(;s.length<T0&&i.length;){let r=t.pick(i);s.push(r),i.splice(i.indexOf(r),1)}return s.map(r=>{let o=t.pick(r.targets);return{id:r.id,target:o,reward:r.reward(o)}})}function Oa(n,e=gn()){(!n.quests||typeof n.quests!="object")&&(n.quests={});let t=n.quests;return t.key!==e&&(t.key=e,t.salt=0,t.rerolls=0,t.claimed=[],t.best={}),Array.isArray(t.claimed)||(t.claimed=[]),(!t.best||typeof t.best!="object")&&(t.best={}),Number.isFinite(t.salt)||(t.salt=0),Number.isFinite(t.rerolls)||(t.rerolls=0),t}function Jd(n,e=null){let t=Oa(n);return R0(t.key,t.salt).map(s=>{let r=A0[s.id],o=r&&e?r.read(e,n):0,a=t.best[s.id]||0,l=r?.scope==="stats"?r.read(null,n)||0:Math.max(o,a),c=Math.min(1,l/s.target);return{id:s.id,text:r?r.text(s.target):s.id,target:s.target,value:Math.min(l,s.target),progress:c,complete:l>=s.target,claimed:t.claimed.includes(s.id),reward:s.reward}})}function F0(n,e){let t=Oa(n);for(let i of R0(t.key,t.salt)){let s=A0[i.id];if(!s||s.scope!=="run")continue;let r=s.read(e,n)||0;r>(t.best[i.id]||0)&&(t.best[i.id]=r)}}function I0(n,e,t){let i=Oa(n);if(i.claimed.includes(e))return null;let s=Jd(n).find(r=>r.id===e);return!s||!s.complete?null:(i.claimed.push(e),s.reward.droplets&&t.earnDroplets(n,s.reward.droplets),s.reward)}function P0(n){return Oa(n).rerolls<Iu}function D0(n){let e=Oa(n);return e.rerolls>=Iu?!1:(e.rerolls+=1,e.salt+=1,e.claimed=[],e.best={},!0)}var Wa={};nl(Wa,{PRISMS_PER_TIER:()=>U0,SEASON:()=>On,TIER_BUY_STEPS:()=>tf,TRACK:()=>za,XP_PER_TIER:()=>hi,addXp:()=>Ga,buyTiers:()=>co,claim:()=>Pu,claimAll:()=>ef,ensureSeason:()=>sr,pendingClaims:()=>Qd,pendingCount:()=>Ha,rewardState:()=>ao,seasonCosmetics:()=>US,seasonState:()=>ln,tierCost:()=>Du,tiersRemaining:()=>lo,unlockPremium:()=>Va,xpForTier:()=>LS});Si();var On={id:"S1",name:"Tidewater",blurb:"Cold light on deep water.",tiers:70},hi=2143;function LS(n){return Math.max(0,n)*hi}var Kd={16:"trail_glacier",48:"skin_spark"},jd={4:"aura_ember",11:"skin_bloom",19:"trail_verdant",25:"aura_tide",32:"skin_orbit",38:"trail_koi",45:"trail_static",55:"aura_corona",63:"skin_monolith",70:"trail_solstice"},L0={35:1,70:1},N0={7:1,14:1,21:1,28:1,35:2,42:1,49:1,56:2,65:1,68:1};function NS(n){let e=null;Kd[n]?e={kind:"cosmetic",id:Kd[n]}:L0[n]?e={kind:"prisms",amount:L0[n]}:n%3===0&&(e={kind:"droplets",amount:370+Math.floor(n/10)*98});let t;return jd[n]?t={kind:"cosmetic",id:jd[n]}:N0[n]?t={kind:"prisms",amount:N0[n]}:t={kind:"droplets",amount:770+Math.floor(n/5)*112},{free:e,premium:t}}var za=Array.from({length:On.tiers},(n,e)=>{let t=e+1,{free:i,premium:s}=NS(t);return{tier:t,free:i,premium:s}});function sr(n){(!n.season||typeof n.season!="object")&&(n.season={});let e=n.season;return e.id!==On.id&&(e.id=On.id,e.xp=0,e.premium=!1,e.claimedFree=[],e.claimedPremium=[]),(!Number.isFinite(e.xp)||e.xp<0)&&(e.xp=0),typeof e.premium!="boolean"&&(e.premium=!1),Array.isArray(e.claimedFree)||(e.claimedFree=[]),Array.isArray(e.claimedPremium)||(e.claimedPremium=[]),e}function ln(n){let e=sr(n),t=Math.min(On.tiers,Math.floor(e.xp/hi)),i=e.xp-t*hi,s=t>=On.tiers;return{id:e.id,name:On.name,xp:e.xp,tier:t,maxTier:On.tiers,complete:s,intoTier:s?hi:i,forNext:hi,frac:s?1:i/hi,premium:e.premium}}function ao(n,e,t){let i=sr(n),s=ln(n),r=za[e-1];if(!r)return{exists:!1};let o=t==="premium"?r.premium:r.free;if(!o)return{exists:!1};let a=t==="premium"?i.claimedPremium:i.claimedFree,l=t==="premium"?i.premium:!0;return{exists:!0,reward:o,reached:s.tier>=e,laneOpen:l,claimed:a.includes(e),claimable:s.tier>=e&&l&&!a.includes(e)}}function Qd(n){let e=[];for(let t of za)for(let i of["free","premium"])ao(n,t.tier,i).claimable&&e.push({tier:t.tier,lane:i});return e}function Ha(n){return Qd(n).length}function Ga(n,e){let t=sr(n);if(!Number.isFinite(e)||e<=0)return 0;let i=ln(n).tier;return t.xp=Math.min(t.xp+Math.round(e),On.tiers*hi),ln(n).tier-i}function Pu(n,e,t,i){let s=ao(n,e,t);if(!s.exists||!s.claimable)return null;let r=sr(n),o=s.reward;return o.kind==="droplets"?i.earnDroplets(n,o.amount):o.kind==="prisms"?i.earnPrisms(n,o.amount):o.kind==="cosmetic"&&(n.ownedCosmetics.includes(o.id)||n.ownedCosmetics.push(o.id)),(t==="premium"?r.claimedPremium:r.claimedFree).push(e),o}function ef(n,e){let t=[];for(let{tier:i,lane:s}of Qd(n)){let r=Pu(n,i,s,e);r&&t.push({tier:i,lane:s,reward:r})}return t}var U0=3,tf=[1,5,10];function lo(n){return Math.max(0,On.tiers-ln(n).tier)}function Du(n){return{prisms:Math.max(0,Math.floor(n))*U0}}function co(n,e,t){let i=Math.min(Math.floor(e),lo(n));if(i<=0)return null;let s=Du(i);if(!t.spend(n,s))return null;let r=ln(n).tier,o=sr(n);return o.xp=Math.min((r+i)*hi,On.tiers*hi),{tiers:i,cost:s,tier:ln(n).tier}}function Va(n){let e=sr(n);return e.premium?!1:(e.premium=!0,!0)}function US(){return[...Object.values(Kd),...Object.values(jd)].map(e=>({id:e,...en(e)||{}})).filter(e=>e.name)}var qa=7,kS=[{day:1,kind:"droplets",amount:400},{day:2,kind:"droplets",amount:650},{day:3,kind:"droplets",amount:900},{day:4,kind:"seasonXp",amount:15e3},{day:5,kind:"droplets",amount:1400},{day:6,kind:"droplets",amount:1900},{day:7,kind:"prisms",amount:4}],BS=.35,OS=4;function k0(n){let e=Math.max(1,Math.floor(n)),t=(e-1)%qa,i=Math.min(OS,Math.floor((e-1)/qa)),s=kS[t],r=1+i*BS;return{day:t+1,cycle:i+1,kind:s.kind,amount:s.kind==="prisms"?s.amount:Math.round(s.amount*r)}}function B0(n){let e=Xa(n),t=Math.floor(Math.max(0,e.streak-1)/qa)*qa;return Array.from({length:qa},(i,s)=>{let r=t+s+1;return{...k0(r),streakDay:r,claimed:e.streak>=r&&!(e.pending&&e.streak===r),today:e.streak===r&&e.pending}})}function Lu(n){(!n.streak||typeof n.streak!="object")&&(n.streak={});let e=n.streak;return typeof e.last!="string"&&(e.last=""),typeof e.claimed!="string"&&(e.claimed=""),(!Number.isFinite(e.streak)||e.streak<0)&&(e.streak=0),(!Number.isFinite(e.best)||e.best<0)&&(e.best=0),e}function zS(n,e){let t=Date.parse(`${n}T00:00:00Z`),i=Date.parse(`${e}T00:00:00Z`);return!Number.isFinite(t)||!Number.isFinite(i)?1/0:Math.round((i-t)/864e5)}function Xa(n,e=gn()){let t=Lu(n),i=t.last?zS(t.last,e):1/0,s;return t.last?i<=0?s=Math.max(1,t.streak):i<=2?s=t.streak+1:s=1:s=1,{streak:s,best:t.best,pending:t.claimed!==e,claimedToday:t.claimed===e,usedGrace:i===2,reward:k0(s)}}var O0=(n,e=gn())=>Xa(n,e).pending;function z0(n,e,t=null,i=gn()){let s=Xa(n,i);if(!s.pending)return null;let r=Lu(n);r.streak=s.streak,r.last=i,r.claimed=i,r.best=Math.max(r.best,r.streak);let o=s.reward;return o.kind==="droplets"?e.earnDroplets(n,o.amount):o.kind==="prisms"?e.earnPrisms(n,o.amount):o.kind==="seasonXp"&&t&&t.addXp(n,o.amount),{...o,streak:r.streak,usedGrace:s.usedGrace}}Si();var GS=[{id:"set_trails",name:"Every Trail",blurb:"One of each palette.",match:(n,e)=>e.type==="trail",reward:{prisms:4}},{id:"set_skins",name:"Every Form",blurb:"One of each silhouette.",match:(n,e)=>e.type==="skin",reward:{prisms:4}},{id:"set_auras",name:"Every Aura",blurb:"The full halo.",match:(n,e)=>e.type==="aura",reward:{prisms:2}},{id:"set_tints",name:"Every Tint",blurb:"The whole spectrum, curated.",match:(n,e)=>e.type==="tint",reward:{prisms:2}},{id:"set_season",name:"Tidewater",blurb:"Everything this season handed out.",match:(n,e)=>e.source==="season",reward:{prisms:5}},{id:"set_prism",name:"Prism Tier",blurb:"Every item that costs Prisms.",match:(n,e)=>!!e.cost?.prisms,reward:{prisms:3}},{id:"set_all",name:"Completionist",blurb:"Every cosmetic in the game.",match:()=>!0,reward:{prisms:12}}];function H0(){let n=[];for(let e of Da)for(let[t,i]of Object.entries(Oi[e]))n.push({id:t,type:e,...i});return n}var Nu=null;function G0(){if(Nu)return Nu;let n=H0();return Nu=GS.map(e=>({...e,members:n.filter(t=>e.match(t.id,t)).map(t=>t.id)})).filter(e=>e.members.length>0),Nu}var VS=()=>Object.fromEntries(G0().map(n=>[n.id,n]));function V0(n){return(!n.collection||typeof n.collection!="object")&&(n.collection={}),Array.isArray(n.collection.claimed)||(n.collection.claimed=[]),n.collection}var W0=n=>Array.isArray(n.ownedCosmetics)?n.ownedCosmetics:[];function nf(n,e){let t=VS()[e];if(!t)return null;let i=W0(n),s=t.members.filter(r=>i.includes(r));return{id:t.id,name:t.name,blurb:t.blurb,reward:t.reward,have:s.length,total:t.members.length,frac:t.members.length?s.length/t.members.length:0,complete:s.length===t.members.length,claimed:V0(n).claimed.includes(t.id),missing:t.members.filter(r=>!i.includes(r))}}function rr(n){return G0().map(e=>nf(n,e.id))}function q0(n){return rr(n).filter(e=>e.complete&&!e.claimed)}var Uu=n=>q0(n).length;function Ps(n){let e=H0(),t=W0(n),i=e.filter(s=>t.includes(s.id)).length;return{have:i,total:e.length,frac:e.length?i/e.length:0}}function X0(n,e){let t=nf(n,e);if(!t||t.complete)return null;let i=null;for(let s of t.missing){let r=en(s);if(!r?.cost||r.source&&r.source!=="shop")continue;let o=r.cost.droplets??(r.cost.prisms??0)*1e3;(!i||o<i.price)&&(i={id:s,item:r,price:o})}return i?.item?{id:i.id,...i.item}:null}function sf(n,e,t){let i=nf(n,e);if(!i||!i.complete||i.claimed)return null;let s=V0(n);return i.reward.prisms&&t.earnPrisms(n,i.reward.prisms),i.reward.droplets&&t.earnDroplets(n,i.reward.droplets),s.claimed.push(e),i.reward}function $0(n,e){let t=[];for(let i of q0(n)){let s=sf(n,i.id,e);s&&t.push({id:i.id,name:i.name,reward:s})}return t}var rs={drift:{id:"drift",name:"Drift",blurb:"Slower, no obstacles, nothing to lose. Fly to look at it.",tagline:"Endless. No fail state.",speed:.62,obstacles:!1,invulnerable:!0,checkpointsMatter:!1,accelPer1000m:0,accelMax:1,rewardScale:.55},standard:{id:"standard",name:"Standard",blurb:"Faster and faster. Contact or a missed checkpoint costs Integrity.",tagline:"Ends when your Integrity runs out.",speed:1,obstacles:!0,invulnerable:!1,checkpointsMatter:!0,accelPer1000m:.04,accelMax:1.9,rewardScale:1}},Y0=Object.keys(rs),qS="standard";function rf(n){return rs[n?.mode]||rs[qS]}function Z0(n,e){return rs[e]?(n.mode=e,!0):!1}function J0(n,e){let t=typeof n=="string"?rs[n]:n;if(!t)return 1;if(!t.accelPer1000m)return t.speed;let i=Math.max(0,e)/1e3*t.accelPer1000m;return t.speed*Math.min(t.accelMax,1+i)}function ku(n,e){let t=rf(n),i={...e};return i.speedScale=(i.speedScale??1)*t.speed,i.invulnerable=!!t.invulnerable,i.spawnObstacles=t.obstacles!==!1,i.checkpointsMatter=t.checkpointsMatter!==!1,i.rewardScale=t.rewardScale??1,i.modeId=t.id,i.accelPer1000m=t.accelPer1000m,i.accelMax=t.accelMax,i}mn();function K0({el:n,save:e,audio:t,onPersist:i}){function s(){let S=Oe(e.droplets),p=Oe(e.prisms),f=Ia(e.xp);Gi(n.walDroplets,S),Gi(n.walPrisms,p),Gi(n.walLevel,String(f.level)),n.walXp&&(n.walXp.style.width=`${Math.round(f.frac*100)}%`),Gi(n.shopDroplets,S),Gi(n.shopPrisms,p),Gi(n.upgDroplets,S),Gi(n.upgLevel,String(f.level))}function r(){Gi(n.statBest,Oe(e.bestScore)),Gi(n.statBestDist,fn(e.bestDistance)),Gi(n.statLifetime,fn(e.lifetimeDistance))}let o=3;function a(){if(!n.worldRow)return;n.worldRow.innerHTML="";let S=li.filter(f=>e.worldsUnlocked.includes(f.key)),p=Math.min(li.length,Math.max(o,S.length+1));for(let f=0;f<p;f++){let b=S[f],_=document.createElement("span");b?(_.className=`world-chip is-reached${b.tier==="realm"?" is-realm":""}`,_.textContent=b.name,_.title=b.blurb):(_.className="world-chip is-unknown",_.textContent="???",_.title="Somewhere you have not been yet"),n.worldRow.appendChild(_)}}function l(){if(n.btnRebirth&&n.btnRebirth.classList.toggle("is-disabled",!Fu(e)),n.btnDaily){let S=e.daily.key===gn()&&e.daily.played;n.btnDaily.textContent=S?"Daily \u2713":"Daily"}}function c(){let S=n.questList;if(S){S.innerHTML="";for(let p of Jd(e)){let f=document.createElement("div");f.className="quest",p.complete&&f.classList.add("is-complete"),p.claimed&&f.classList.add("is-claimed");let b=document.createElement("span");b.className="quest-text",b.textContent=p.text;let _=document.createElement("div");_.className="quest-bar";let m=document.createElement("i");m.style.width=`${Math.round(p.progress*100)}%`,_.appendChild(m);let E=document.createElement("span");E.className="quest-count",E.textContent=`${Oe(p.value)} / ${Oe(p.target)}`;let x=document.createElement("span");if(x.className="quest-action",p.claimed)x.textContent="Claimed",x.classList.add("is-done");else if(p.complete){let w=document.createElement("button");w.className="gel gel--tiny gel--claim",w.textContent=`Claim ${Oe(p.reward.droplets)}`,w.addEventListener("click",()=>{let y=I0(e,p.id,Gt);if(!y){t?.bump();return}y.seasonXp&&Ga(e,y.seasonXp),t?.chime(),i?.(),v()}),x.appendChild(w)}else{let w=document.createElement("span");w.className="quest-reward",w.textContent=`+${Oe(p.reward.droplets)}`,x.appendChild(w)}f.append(b,_,E,x),S.appendChild(f)}if(n.questReroll){let p=Iu-(e.quests?.rerolls||0);n.questReroll.textContent=p>0?`Reroll (${p})`:"Reroll",n.questReroll.classList.toggle("is-disabled",!P0(e))}}}n.questReroll?.addEventListener("click",()=>{if(!D0(e)){t?.bump();return}t?.click(),i?.(),v()});function u(){let S=n.modePick;if(!S)return;let p=rf(e);S.innerHTML="";for(let f of Y0){let b=rs[f],_=document.createElement("button");_.type="button",_.className=`mode-btn${b.id===p.id?" is-on":""}`,_.dataset.mode=f,_.textContent=b.name,_.setAttribute("role","radio"),_.setAttribute("aria-checked",String(b.id===p.id)),_.title=b.blurb,_.addEventListener("click",()=>{Z0(e,f)&&(t?.click?.(),i?.(),u())}),S.appendChild(_)}n.modeBlurb&&(n.modeBlurb.textContent=p.blurb)}function d(S,p){if(!S)return;let f=S.querySelector(".menu-badge");if(!p){f?.remove();return}f||(f=document.createElement("span"),f.className="menu-badge",S.appendChild(f)),f.textContent=p>9?"9+":String(p)}function h(){let S=n.streakRow;if(!S)return;let p=Xa(e),f=B0(e);n.streakCount&&(n.streakCount.textContent=p.pending?`Day ${p.streak} ready`:`Day ${p.streak}`),S.innerHTML="";for(let b of f){let _=document.createElement("div");_.className="streak-day",b.claimed&&_.classList.add("is-claimed"),b.today&&_.classList.add("is-today");let m=document.createElement("span");m.className="streak-day-n",m.textContent=String(b.day);let E=document.createElement("span");E.className=`streak-day-amt is-${b.kind}`,E.textContent=b.kind==="prisms"?`${b.amount}\u25C6`:b.kind==="seasonXp"?`${Oe(b.amount)}xp`:Oe(b.amount),_.append(m,E),S.appendChild(_)}n.streakClaim&&(n.streakClaim.classList.toggle("is-disabled",!p.pending),n.streakClaim.textContent=p.pending?"Claim":"Claimed today")}n.streakClaim?.addEventListener("click",()=>{if(!z0(e,Gt,Wa)){t?.bump();return}t?.chime(),i?.(),v()});function g(){d(n.btnSeason,Ha(e));let S=0;for(let p of Zn){if(!ir(e,p))continue;let f=Ba(e,p);f&&kn(e,f)&&S++}d(n.btnEvolution,S),d(n.btnCollection,Uu(e)),d(n.btnStreak,O0(e)?1:0)}function v(){s(),r(),a(),l(),c(),h(),u(),g()}return{refresh:v,refreshWallet:s,refreshQuests:c,refreshBadges:g,refreshStreak:h}}function Gi(n,e){n&&(n.textContent=e)}zt();mn();Si();mn();var of=[{id:"shieldCapacity",name:"Shield Capacity",blurb:"More integrity pips before a run can end.",detail:n=>`${3+n} pips`,icon:"shield",maxLevel:3,reqLevel:1,baseCost:900,growth:2.6,value:n=>3+n},{id:"shieldRegen",name:"Shield Regen",blurb:"Clean flying restores a pip sooner.",detail:n=>`${(18-n*1.9).toFixed(1)}s of clean flight`,icon:"regen",maxLevel:4,reqLevel:3,baseCost:700,growth:2.2,value:n=>18-n*1.9},{id:"magnet",name:"Magnet Radius",blurb:"Nearby orbs drift toward the wisp.",detail:n=>n?`${(n*1.7).toFixed(1)} m pull`:"none",icon:"magnet",maxLevel:5,reqLevel:2,baseCost:420,growth:1.95,value:n=>n*1.7},{id:"boostTank",name:"Boost Efficiency",blurb:"Boost drains slower and orbs refill more.",detail:n=>`${Math.round(n*11)}% slower drain`,icon:"boost",maxLevel:5,reqLevel:2,baseCost:520,growth:2,value:n=>1-n*.11},{id:"comboHold",name:"Combo Hold",blurb:"The multiplier survives longer without a pickup.",detail:n=>`${(5+n*1.1).toFixed(1)}s grace`,icon:"combo",maxLevel:5,reqLevel:4,baseCost:640,growth:2.05,value:n=>5+n*1.1},{id:"streamTune",name:"Stream Tuning",blurb:"Riding a current is worth more.",detail:n=>`\xD7${(1.5+n*.14).toFixed(2)} while riding`,icon:"stream",maxLevel:5,reqLevel:6,baseCost:780,growth:2.1,value:n=>1.5+n*.14},{id:"checkpointBonus",name:"Checkpoint Yield",blurb:"Checkpoint gates pay out more Droplets.",detail:n=>`+${Math.round(n*12)}%`,icon:"gate",maxLevel:5,reqLevel:8,baseCost:950,growth:2.15,value:n=>1+n*.12}],$a=Object.fromEntries(of.map(n=>[n.id,n]));function Ya(n,e){return Math.max(0,Math.min($a[e]?.maxLevel??0,n.upgrades?.[e]||0))}function af(n,e){let t=$a[e];if(!t)return null;let i=Ya(n,e);return i>=t.maxLevel?null:{droplets:Math.round(t.baseCost*Math.pow(t.growth,i))}}function lf(n,e){let t=$a[e];return t?pn(n.xp)>=t.reqLevel:!1}function Bu(n){let e=o=>Ya(n,o),t=o=>$a[o].value(e(o)),i=Ru(n),s=o=>i.add[o]||0,r=o=>i.mul[o]??1;return{shieldMax:t("shieldCapacity")+s("shieldMax"),shieldRegen:Math.max(4,t("shieldRegen")+s("shieldRegen")),magnet:t("magnet")+s("magnet"),boostDrain:t("boostTank")*r("boostDrain"),boostRefill:(1+e("boostTank")*.09)*r("boostRefill"),comboGrace:t("comboHold")+s("comboGrace"),streamMultiplier:t("streamTune")+s("streamMultiplier"),checkpointBonus:t("checkpointBonus")*r("checkpointBonus"),scoreMultiplier:(1+(n.rebirthCount||0)*.12)*r("scoreMultiplier"),orbValue:1+s("orbValue"),bigOrbValue:1+s("bigOrbValue"),ringValue:1+s("ringValue"),dropletGain:r("dropletGain"),speedScale:r("speedScale"),comboArmor:s("comboArmor"),revives:s("revives")}}function j0(n,e,t){if(!$a[e]||!lf(n,e))return!1;let s=af(n,e);return!s||!t.spend(n,s)?!1:(n.upgrades[e]=Ya(n,e)+1,!0)}Pa();Si();var uo=6,Za=["trail","skin","aura","tint"],Q0=18;function Ja(n){Array.isArray(n.loadouts)||(n.loadouts=[]),n.loadouts.length=uo;for(let e=0;e<uo;e++){let t=n.loadouts[e];if(!t||typeof t!="object"){n.loadouts[e]=null;continue}let i={name:typeof t.name=="string"?t.name.slice(0,Q0):""},s=!1;for(let r of Za)typeof t[r]=="string"&&en(t[r])&&(i[r]=t[r],s=!0);n.loadouts[e]=s?i:null}return n.loadouts}function or(n,e){return Ja(n)[e]??null}function eg(n){let e={};for(let t of Za)e[t]=Rn(n,t).id;return e}function tg(n,e){let t=or(n,e);if(!t)return!1;let i=eg(n);return Za.every(s=>!t[s]||t[s]===i[s])}function ng(n,e){let t=or(n,e);return t?Za.filter(i=>t[i]&&!Rs(n,t[i])).map(i=>({slot:i,id:t[i],name:en(t[i])?.name||t[i]})):[]}function ig(n,e,t=""){if(e<0||e>=uo)return null;Ja(n);let i={name:String(t).slice(0,Q0),...eg(n)};return n.loadouts[e]=i,i}function sg(n,e){let t=or(n,e);if(!t)return null;let i=[],s=[];for(let r of Za){let o=t[r];o&&(La(n,o)?i.push(r):s.push(r))}return{applied:i,skipped:s}}function rg(n,e){return e<0||e>=uo||(Ja(n),!n.loadouts[e])?!1:(n.loadouts[e]=null,!0)}function og(n,e){let t=or(n,e);if(!t)return`Slot ${e+1}`;if(t.name)return t.name;let i=t.trail&&en(t.trail);return i?i.name:`Slot ${e+1}`}Si();function mg({el:n,save:e,audio:t,onChange:i,onEquip:s}){let r="skin",o=null,a=!1,l=null,c=!1;async function u(){if(!(o||a||!n.wispPreview)){a=!0;try{o=(await Promise.resolve().then(()=>(fg(),dg))).createWispPreview(n.wispPreview,{})}catch(x){console.warn("[aerodrift] wisp preview unavailable",x),o=null}finally{a=!1,c&&o?.start?.(),h()}}}function d(){let x={trail:Rn(e,"trail"),skin:Rn(e,"skin"),aura:Rn(e,"aura"),tint:Rn(e,"tint")};return l&&(x[l.type]=l),{...x,trail:Mi(x.trail,x.tint)}}function h(){let x=d();o?.setCosmetics?.(x);let w=l||x.skin;n.wispName&&(n.wispName.textContent=w?.name||""),n.wispBlurb&&(n.wispBlurb.textContent=w?.blurb||"")}function g(){c=!0,u(),l=null,o?.start?.(),_(r),S(),h()}function v(){c=!1,l=null,o?.stop?.()}function S(){let x=n.loadoutRow;if(x){Ja(e),x.innerHTML="";for(let w=0;w<uo;w++){let y=or(e,w),T=document.createElement("button");if(T.type="button",T.className="loadout-slot",T.dataset.slot=String(w),!y)T.classList.add("is-empty"),T.textContent="+",T.title="Save what you are wearing into this slot";else{tg(e,w)&&T.classList.add("is-active");let I=y.trail&&en(y.trail),P=y.tint&&en(y.tint),L=document.createElement("i");if(L.className="loadout-dot",I){let V=P?Mi(I,P):I;L.style.background=`linear-gradient(135deg, ${V.core}, ${V.glow})`}let z=document.createElement("span");z.className="loadout-name",z.textContent=og(e,w),T.append(L,z);let $=ng(e,w);$.length&&(T.classList.add("is-partial"),T.title=`Missing: ${$.map(V=>V.name).join(", ")}`)}T.addEventListener("click",()=>{or(e,w)?sg(e,w):ig(e,w),t?.click?.(),s?.("trail"),i?.(),S(),b(),h()}),T.addEventListener("contextmenu",I=>{I.preventDefault(),rg(e,w)&&(t?.bump?.(),i?.(),S())}),x.appendChild(T)}}}function p(x){let w=Rn(e,"tint");if(x.type==="tint"){let y=Mi(Rn(e,"trail"),x);return`radial-gradient(circle at 34% 28%, #FFFFFF 0%, ${y.core} 26%, ${y.glow} 62%, ${y.trail} 100%)`}if(x.type==="trail"){let y=Mi(x,w);return`radial-gradient(circle at 34% 28%, #FFFFFF 0%, ${y.core} 26%, ${y.glow} 62%, ${y.trail} 100%)`}if(x.type==="skin"){let y=Mi(Rn(e,"trail"),w);return x.core==="facet"?`conic-gradient(from 20deg, ${y.glow}, #FFFFFF 25%, ${y.trail} 50%, ${y.glow} 75%, #FFFFFF 100%)`:`radial-gradient(circle at 36% 26%, #FFFFFF 0%, ${y.core} ${Math.round(x.coreScale*24)}%, ${y.glow} 66%, ${y.shell} 100%)`}return x.mode==="none"?"radial-gradient(circle at 40% 30%, #FFFFFF, #CFE0E8)":x.mode==="prism"?"conic-gradient(#FFD9E8, #FFE9B8, #DCF6C8, #BFF0F5, #CFD8FA, #E8CFF6, #FFD9E8)":`radial-gradient(circle at 50% 50%, transparent 38%, ${x.color} 52%, transparent 74%), radial-gradient(circle at 40% 30%, #FFFFFF, #CFE0E8)`}function f(x,w){let y=document.createElement("span");if(y.className=`price${w?"":" is-poor"}`,!x)return y.textContent="Free",y;let T=document.createElement("i");T.className=`coin-icon ${x.prisms?"icon-prism":"icon-droplet"}`,y.appendChild(T);let I=document.createElement("span");return I.textContent=Oe(x.prisms||x.droplets),y.appendChild(I),y}function b(){S();let x=n.shopGrid;x.innerHTML="";for(let w of qm(e,r)){let y=document.createElement("button");y.type="button",y.className="card",w.equipped&&y.classList.add("is-equipped"),w.locked&&y.classList.add("is-locked");let T=document.createElement("div");T.className="card-head";let I=document.createElement("span");I.className="card-swatch",I.style.background=p(w);let P=document.createElement("span");P.className="card-name",P.textContent=w.name,T.append(I,P);let L=document.createElement("div");if(L.className="card-foot",w.locked?L.appendChild(Ka("tag-locked",w.locked)):w.equipped?L.appendChild(Ka("tag-equipped","Equipped")):w.owned?L.appendChild(Ka("tag-owned","Tap to equip")):L.appendChild(f(w.cost,kn(e,w.cost))),w.blurb){let V=document.createElement("div");V.className="card-blurb",V.textContent=w.blurb,y.append(T,V,L)}else y.append(T,L);let z=()=>{l=w,h()},$=()=>{l=null,h()};y.addEventListener("pointerenter",z),y.addEventListener("focus",z),y.addEventListener("pointerleave",$),y.addEventListener("blur",$),y.addEventListener("click",()=>{if(w.locked){t?.bump();return}if(w.owned){if(w.equipped)return;La(e,w.id),t?.ring(),s?.(w.type)}else{if(!kn(e,w.cost)){t?.bump();return}if(!Wm(e,w.id,Gt)){t?.bump();return}La(e,w.id),t?.chime(),s?.(w.type)}i?.(),b(),h()}),x.appendChild(y)}h()}function _(x){r=x;for(let w of n.shopTabs.querySelectorAll(".seg-btn"))w.classList.toggle("is-on",w.dataset.tab===r);b()}n.shopTabs?.addEventListener("click",x=>{let w=x.target.closest(".seg-btn");w&&(t?.click(),_(w.dataset.tab))});function m(){let x=n.upgradeGrid;x.innerHTML="";for(let w of of){let y=Ya(e,w.id),T=af(e,w.id),I=lf(e,w.id),P=y>=w.maxLevel,L=document.createElement("button");L.type="button",L.className="card",I||L.classList.add("is-locked"),P&&L.classList.add("is-maxed");let z=document.createElement("div");z.className="card-head";let $=document.createElement("span");$.className="card-name",$.textContent=w.name,z.appendChild($);let V=document.createElement("div");V.className="card-blurb",V.textContent=w.blurb;let X=document.createElement("div");X.className="card-detail",X.textContent=P?`Maxed \u2014 ${w.detail(y)}`:`${w.detail(y)} \u2192 ${w.detail(y+1)}`;let B=document.createElement("div");B.className="lv-row";for(let he=0;he<w.maxLevel;he++){let ae=document.createElement("span");ae.className=`lv-pip${he<y?" is-on":""}`,B.appendChild(ae)}let Q=document.createElement("div");Q.className="card-foot",Q.appendChild(B),I?P?Q.appendChild(Ka("tag-owned","Max")):Q.appendChild(f(T,kn(e,T))):Q.appendChild(Ka("tag-locked",`Level ${w.reqLevel}`)),L.append(z,V,X,Q),L.addEventListener("click",()=>{if(!I||P){t?.bump();return}if(!j0(e,w.id,Gt)){t?.bump();return}t?.chime(),i?.(),m()}),x.appendChild(L)}}function E(){let x=E0(e);n.rebProgress.style.width=`${Math.round(x.progress*100)}%`,n.rebProgressLabel.textContent=`${fn(e.cycleDistance)} / ${fn(x.requirement)} this cycle`,pg(n.rebKeeps,x.keeps),pg(n.rebResets,x.resets),n.rebPrisms.textContent=x.eligible?`+${x.prisms}`:"\u2014",n.rebMult.textContent=`\xD7${x.multiplierNow.toFixed(2)} \u2192 \xD7${x.multiplierNext.toFixed(2)} score`,n.rebConfirm.disabled=!x.eligible,n.rebConfirm.classList.toggle("is-disabled",!x.eligible),n.rebConfirm.textContent=x.eligible?"Ascend":`${fn(x.requirement-e.cycleDistance)} to go`}return{renderCosmetics:b,renderUpgrades:m,renderRebirth:E,setTab:_,enter:g,exit:v,get tab(){return r}}}function Ka(n,e){let t=document.createElement("span");return t.className=`card-tag ${n}`,t.textContent=e,t}function pg(n,e){if(n){n.innerHTML="";for(let t of e){let i=document.createElement("li");i.textContent=t,n.appendChild(i)}}}zt();mn();var gg=["radiance","momentum","resilience","confluence"],jS=5;function xg({el:n,save:e,audio:t,onChange:i}){let s=null;function r(){let v=new Map(gg.map(p=>[p,new Map])),S=null;for(let p of Zn){let f=Ft[p];if(f.root){S=p;continue}let b=v.get(f.branch);b&&(b.has(f.tier)||b.set(f.tier,[]),b.get(f.tier).push(p))}return{rows:v,root:S}}function o(v,S){let p=Ft[v],f=an(e,v),b=ir(e,v),_=Ba(e,v),m=_?kn(e,_):!0,E=y0(e,v),x=document.createElement("button");x.type="button",x.className="evo-node",x.dataset.node=v,x.dataset.branch=p.branch,x.style.setProperty("--evo-color",ka[p.branch].color),x.style.setProperty("--evo-glow",ka[p.branch].glow),f?x.classList.add("is-owned"):b&&m?x.classList.add("is-ready"):b?x.classList.add("is-available"):x.classList.add("is-locked"),p.capstone&&x.classList.add("is-capstone"),p.root&&x.classList.add("is-root"),v===S&&x.classList.add("is-goal");let w=document.createElement("span");if(w.className="evo-name",w.textContent=p.name,x.appendChild(w),p.detail){let T=document.createElement("span");T.className="evo-detail",T.textContent=p.detail,x.appendChild(T)}let y=document.createElement("span");if(y.className="evo-foot",f)y.textContent=p.form?"FORM ACTIVE":"Owned",y.classList.add("is-owned-tag");else if(!b&&E)y.textContent=E,y.classList.add("is-reason");else if(_){let T=document.createElement("i");T.className=`coin-icon ${_.prisms?"icon-prism":"icon-droplet"}`,y.appendChild(T);let I=document.createElement("span");I.textContent=Oe(_.prisms||_.droplets),y.appendChild(I),m||y.classList.add("is-poor")}return x.appendChild(y),x.title=p.blurb,x.addEventListener("click",()=>{if(an(e,v)){t?.bump();return}if(!ir(e,v)){t?.bump();return}if(!_0(e,v,Gt)){t?.bump();return}t?.chime(),i?.(),a()}),x}function a(){let v=n.evoTree;if(!v)return;v.innerHTML="";let{rows:S,root:p}=r(),f=v0(e);s=document.createElementNS("http://www.w3.org/2000/svg","svg"),s.setAttribute("class","evo-wires"),s.setAttribute("aria-hidden","true"),v.appendChild(s);let b=document.createElement("div");b.className="evo-grid",v.appendChild(b);let _=document.createElement("div");_.className="evo-col evo-col--root",p&&_.appendChild(o(p,f)),b.appendChild(_);let m=document.createElement("div");m.className="evo-lanes",b.appendChild(m);for(let E of gg){let x=ka[E],w=document.createElement("div");w.className="evo-lane",w.dataset.branch=E,w.style.setProperty("--evo-color",x.color);let y=document.createElement("div");y.className="evo-lane-label";let T=document.createElement("span");T.className="evo-lane-name",T.textContent=x.name;let I=document.createElement("span");I.className="evo-lane-blurb",I.textContent=x.blurb,y.append(T,I),w.appendChild(y);let P=document.createElement("div");P.className="evo-track";for(let L=1;L<=jS;L++){let z=S.get(E)?.get(L)||[],$=document.createElement("div");$.className="evo-cell";for(let V of z)$.appendChild(o(V,f));P.appendChild($)}w.appendChild(P),m.appendChild(w)}u(),l(),requestAnimationFrame(l)}function l(){let v=n.evoTree;if(!v||!s)return;let S=v.getBoundingClientRect();for(s.setAttribute("viewBox",`0 0 ${S.width} ${S.height}`),s.setAttribute("width",String(S.width)),s.setAttribute("height",String(S.height));s.firstChild;)s.removeChild(s.firstChild);let p=f=>{let b=v.querySelector(`[data-node="${f}"]`);if(!b)return null;let _=b.getBoundingClientRect();return{left:{x:_.left-S.left,y:_.top-S.top+_.height/2},right:{x:_.right-S.left,y:_.top-S.top+_.height/2}}};for(let f of Zn){let b=Ft[f],_=[...b.requires||[],...b.requiresAll||[]],m=p(f);if(m)for(let E of _){let x=p(E);if(!x)continue;let w=an(e,E)&&an(e,f),y=an(e,E)&&!an(e,f),T=document.createElementNS("http://www.w3.org/2000/svg","path"),I=x.right.x,P=x.right.y,L=m.left.x,z=m.left.y,$=(I+L)/2;T.setAttribute("d",`M ${I} ${P} C ${$} ${P}, ${$} ${z}, ${L} ${z}`),T.setAttribute("class",`evo-wire${w?" is-lit":""}${y?" is-half":""}`),T.setAttribute("stroke",ka[b.branch].color),s.appendChild(T)}}}let c={scoreMultiplier:["Score",v=>`\xD7${v.toFixed(2)}`],speedScale:["Speed",v=>`+${Math.round((v-1)*100)}%`],dropletGain:["Droplets",v=>`+${Math.round((v-1)*100)}%`],boostDrain:["Boost drain",v=>`\u2212${Math.round((1-v)*100)}%`],boostRefill:["Boost refill",v=>`+${Math.round((v-1)*100)}%`],checkpointBonus:["Checkpoints",v=>`+${Math.round((v-1)*100)}%`],orbValue:["Orbs",v=>`+${Math.round(v*100)}%`],bigOrbValue:["Big orbs",v=>`+${Math.round(v*100)}%`],ringValue:["Rings",v=>`+${Math.round(v*100)}%`],shieldMax:["Integrity",v=>`+${v}`],magnet:["Magnet",v=>`+${v.toFixed(1)}m`],comboGrace:["Combo grace",v=>`+${v.toFixed(1)}s`],streamMultiplier:["Streams",v=>`+${v.toFixed(2)}`],shieldRegen:["Regen",v=>`${v.toFixed(1)}s`],comboArmor:["Temper",()=>"active"],revives:["Revives",v=>`${v}/run`]};function u(){let v=n.evoSummary;if(!v)return;v.innerHTML="";let{add:S,mul:p}=Ru(e),f=oo(e),b=(e.evolution||[]).length,_=document.createElement("div");_.className="evo-summary-head",_.innerHTML="";let m=document.createElement("span");m.className=`evo-form-tag is-${f}`,m.textContent=f==="spark"?"Spark":`${f} Form`;let E=document.createElement("span");E.className="muted small",E.textContent=`${b} node${b===1?"":"s"} grown`,_.append(m,E),v.appendChild(_);let x=document.createElement("div");x.className="evo-stats";let w=(y,T)=>{let I=c[y];if(!I)return;let[P,L]=I,z=document.createElement("span");z.className="evo-stat",z.innerHTML="";let $=document.createElement("em");$.textContent=P;let V=document.createElement("b");V.textContent=L(T),z.append($,V),x.appendChild(z)};for(let[y,T]of Object.entries(p))T!==1&&w(y,T);for(let[y,T]of Object.entries(S))T!==0&&w(y,T);if(x.childNodes.length)v.appendChild(x);else{let y=document.createElement("p");y.className="muted small",y.textContent="No nodes grown yet. Pick a branch and start.",v.appendChild(y)}}n.evoRespec?.addEventListener("click",()=>{if(!(e.evolution||[]).filter(p=>Ft[p]?.cost?.droplets).reduce((p,f)=>p+Ft[f].cost.droplets,0)){t?.bump();return}let S=b0(e);t?.chime(),i?.(),a(),n.evoRespecNote&&(n.evoRespecNote.textContent=`Refunded ${Oe(S)} Droplets.`)});let d=null;function h(){a(),d=()=>requestAnimationFrame(l),window.addEventListener("resize",d)}function g(){d&&window.removeEventListener("resize",d),d=null}return{render:a,enter:h,exit:g}}zt();mn();Si();var QS="\xA37.99 / 800 credits";function yg({el:n,save:e,audio:t,onChange:i}){function s(c,u){let d=document.createElement("div");if(d.className="sp-reward",!c)return d.classList.add("is-empty"),d;u.claimed?d.classList.add("is-claimed"):u.claimable?d.classList.add("is-claimable"):u.reached?u.laneOpen||d.classList.add("is-shut"):d.classList.add("is-future");let h=document.createElement("i"),g=document.createElement("span");if(g.className="sp-reward-label",c.kind==="droplets")h.className="coin-icon icon-droplet",g.textContent=Oe(c.amount);else if(c.kind==="prisms")h.className="coin-icon icon-prism",g.textContent=Oe(c.amount);else{let v=en(c.id);d.classList.add("is-cosmetic"),h.className="sp-swatch",v?.type==="trail"?h.style.background=`linear-gradient(135deg, ${v.core}, ${v.glow})`:v?.type==="skin"?h.style.background="linear-gradient(135deg, #EAF6FB, #A9B7BF)":h.style.background="linear-gradient(135deg, #FFF3D0, #C9A9F0)",g.textContent=v?.name||c.id}if(d.append(h,g),u.claimed){let v=document.createElement("span");v.className="sp-tick",v.textContent="\u2713",d.appendChild(v)}return d}function r(){let c=n.seasonTrack;if(!c)return;c.innerHTML="";let u=ln(e),d=document.createElement("div");d.className="sp-col sp-col--labels";let h=document.createElement("span");h.className="sp-lane-name",h.textContent="Free";let g=document.createElement("span");g.className="sp-tier-num",g.textContent="";let v=document.createElement("span");v.className="sp-lane-name is-premium",v.textContent="Premium",d.append(h,g,v),c.appendChild(d);for(let S of za){let p=document.createElement("div");p.className="sp-col",S.tier===u.tier+1&&p.classList.add("is-next"),S.tier<=u.tier&&p.classList.add("is-reached");let f=ao(e,S.tier,"free"),b=ao(e,S.tier,"premium"),_=s(S.free,f),m=document.createElement("div");m.className="sp-tier-num",m.textContent=String(S.tier);let E=s(S.premium,b);for(let[x,w,y]of[[_,"free",f],[E,"premium",b]])y.claimable&&(x.setAttribute("role","button"),x.addEventListener("click",()=>{if(!Pu(e,S.tier,w,Gt)){t?.bump();return}t?.chime(),i?.(),l()}));p.append(_,m,E),c.appendChild(p)}}function o(){let c=ln(e),u=Ha(e);n.seasonName&&(n.seasonName.textContent=`Season 1 \u2014 ${On.name}`),n.seasonBlurb&&(n.seasonBlurb.textContent=On.blurb),n.seasonTier&&(n.seasonTier.textContent=String(c.tier)),n.seasonBar&&(n.seasonBar.style.width=`${Math.round(c.frac*100)}%`),n.seasonXpLabel&&(n.seasonXpLabel.textContent=c.complete?"Track complete":`${Oe(c.intoTier)} / ${Oe(hi)} to tier ${c.tier+1}`),n.seasonClaimAll&&(n.seasonClaimAll.textContent=u?`Claim All (${u})`:"Claim All",n.seasonClaimAll.classList.toggle("is-disabled",u===0)),n.seasonUnlock&&(n.seasonUnlock.classList.toggle("is-hidden",c.premium),n.seasonUnlock.textContent=`Unlock Premium \u2014 ${QS}`),a(c),n.seasonPremiumTag&&n.seasonPremiumTag.classList.toggle("is-hidden",!c.premium)}function a(c){let u=n.seasonTierBuy;if(!u)return;u.innerHTML="";let d=lo(e);if(d<=0){u.classList.add("is-hidden");return}u.classList.remove("is-hidden");let h=document.createElement("span");h.className="sp-buy-label",h.textContent="Skip ahead",u.appendChild(h);for(let g of tf){let v=Math.min(g,d);if(v<=0)continue;let S=Du(v),p=document.createElement("button");p.className="gel gel--tiny gel--buy sp-buy",p.innerHTML=`+${v} <i class="coin-icon icon-prism"></i>${S.prisms}`,p.classList.toggle("is-disabled",!kn(e,S)),p.title=`${v} tier${v>1?"s":""} for ${S.prisms} Prisms`,p.addEventListener("click",()=>{if(!co(e,v,Gt)){t?.bump();return}t?.chime(),i?.(),l()}),u.appendChild(p)}}n.seasonClaimAll?.addEventListener("click",()=>{if(!ef(e,Gt).length){t?.bump();return}t?.chime(),i?.(),l()}),n.seasonUnlock?.addEventListener("click",()=>{if(!Va(e)){t?.bump();return}console.warn("[aerodrift] premium lane unlocked WITHOUT payment \u2014 stub rail"),t?.levelUp?.()||t?.chime(),i?.(),l()});function l(){o(),r()}return{render:l,enter:l}}zt();mn();Si();Si();var ja=[{id:"drops_s",name:"Handful",base:5e3,bonus:0,pence:199,robux:99},{id:"drops_m",name:"Pouch",base:14e3,bonus:1e3,pence:499,robux:249,popular:!0},{id:"drops_l",name:"Flask",base:3e4,bonus:4500,pence:999,robux:499},{id:"drops_xl",name:"Reservoir",base:65e3,bonus:15e3,pence:1999,robux:999,bestValue:!0}],Ou=[{id:"prism_s",name:"Prism Shard",base:5,bonus:0,pence:299,robux:149},{id:"prism_m",name:"Prism Cluster",base:14,bonus:2,pence:799,robux:399,popular:!0},{id:"prism_l",name:"Prism Vault",base:32,bonus:8,pence:1699,robux:849,bestValue:!0}],_g=[{id:"tiers_5",name:"5 Tiers",tiers:5,pence:399,robux:199},{id:"tiers_15",name:"15 Tiers",tiers:15,pence:999,robux:499,popular:!0},{id:"tiers_30",name:"30 Tiers",tiers:30,pence:1799,robux:899,bestValue:!0}],vg=n=>n.base+n.bonus,bg=[{id:"pass_premium",name:"Premium",blurb:"The premium lane, all 70 tiers.",pence:799,robux:399,tiers:0},{id:"pass_premium_plus",name:"Premium+",blurb:"The premium lane, and a 25-tier head start.",pence:1999,robux:999,tiers:25,bestValue:!0}];function ho(n){return vg(n)/(n.pence/100)}var fo={bundle_starter:{name:"Starter Bundle",blurb:"A running start \u2014 once only.",pence:499,oncePerAccount:!0,minRuns:2,grants:[{kind:"droplets",amount:18e3},{kind:"prisms",amount:6},{kind:"cosmetic",id:"trail_lagoon"}]},bundle_evolution:{name:"Evolutionist",blurb:"Prisms enough for a Form, and the Droplets to reach it.",pence:1299,grants:[{kind:"droplets",amount:4e4},{kind:"prisms",amount:18}]},bundle_collector:{name:"Collector",blurb:"Three premium cosmetics, together.",pence:999,grants:[{kind:"cosmetic",id:"trail_iridescent"},{kind:"cosmetic",id:"skin_prism"},{kind:"cosmetic",id:"aura_prism"}]}};function eE(n){let e=0;for(let t of n.grants)if(t.kind==="droplets"){let i=ja.reduce((s,r)=>ho(r)>ho(s)?r:s);e+=Math.round(t.amount/ho(i)*100)}else if(t.kind==="prisms"){let i=Ou.reduce((s,r)=>ho(r)>ho(s)?r:s);e+=Math.round(t.amount/ho(i)*100)}return e}function tE(n){return n.grants.filter(e=>e.kind==="cosmetic").map(e=>({id:e.id,...en(e.id)||{}})).filter(e=>e.name)}function nE(n){let e=eE(n);return e<=n.pence?0:Math.round((1-n.pence/e)*100)}var iE=3,uf=2;function sE(n=new Date){let e=gn(n),t=Math.floor(Date.parse(`${e}T00:00:00Z`)/864e5);return Math.floor(t/uf)}function Mg(n=new Date){let e=gn(n),t=Math.floor(Date.parse(`${e}T00:00:00Z`)/864e5);return uf-t%uf}function Sg(n=new Date){let e=[];for(let o of Da)for(let[a,l]of Object.entries(Oi[o]))l.cost&&(l.source&&l.source!=="shop"||e.push({id:a,type:o,...l}));e.sort((o,a)=>o.id<a.id?-1:1);let t=new zi(Fs(`aerodrift-featured-${sE(n)}`)),i=[],s=new Set,r=0;for(;i.length<Math.min(iE,e.length)&&r++<500;){let o=e[t.int(0,e.length-1)];s.has(o.id)||(s.add(o.id),i.push(o))}return i}var hf=.25;function Eg(n){if(!n.cost)return null;let e={};for(let[t,i]of Object.entries(n.cost))e[t]=Math.max(1,Math.round(i*(1-hf)));return e}function wg(n,e){let t=fo[e];return!(!t||t.oncePerAccount&&(n.purchases||[]).includes(e)||t.minRuns&&(n.runs||0)<t.minRuns)}function Tg(n){return Object.keys(fo).filter(e=>wg(n,e)).map(e=>({id:e,...fo[e],discount:nE(fo[e]),cosmetics:tE(fo[e])}))}function Cg(n,e,t,{recordId:i=null}={}){let s=[];for(let r of e)r.kind==="droplets"?(t.earnDroplets(n,r.amount),s.push(r)):r.kind==="prisms"?(t.earnPrisms(n,r.amount),s.push(r)):r.kind==="cosmetic"&&(n.ownedCosmetics.includes(r.id)||n.ownedCosmetics.push(r.id),s.push(r));return i&&(Array.isArray(n.purchases)||(n.purchases=[]),n.purchases.includes(i)||n.purchases.push(i)),s}function Ag(n,e,t){let i=[...ja,...Ou].find(l=>l.id===e);if(!i)return null;let s=ja.includes(i)?"droplets":"prisms",r=ff(n),o=vg(i)*(r?df:1),a=Cg(n,[{kind:s,amount:o}],t,{recordId:null});return aE(n,e),a?{granted:a,doubled:r,amount:o}:null}function Rg(n,e,t){return wg(n,e)?Cg(n,fo[e].grants,t,{recordId:e}):null}function zu(n){return`\xA3${(n/100).toFixed(2)}`}function rE(n){return`R$${Math.round(n)}`}var oE="web";function Hu(n){return oE==="roblox"?rE(n.robux):zu(n.pence)}var df=2;function ff(n){return!(n.purchases||[]).some(e=>String(e).startsWith("paid:"))}function aE(n,e){Array.isArray(n.purchases)||(n.purchases=[]);let t=`paid:${e}`;n.purchases.includes(t)||n.purchases.push(t)}Pa();function Fg({el:n,save:e,audio:t,onChange:i}){function s(p,f){console.warn(`[aerodrift] STUB PURCHASE "${p}" \u2014 granted without payment`),f(),t?.chime(),i?.(),S()}function r(p){if(p.type==="tint"){let f=Mi(Rn(e,"trail"),p);return`linear-gradient(135deg, ${f.core}, ${f.glow})`}if(p.type==="trail"){let f=Mi(p,Rn(e,"tint"));return`linear-gradient(135deg, ${f.core}, ${f.glow})`}return p.type==="skin"?"linear-gradient(135deg, #EAF6FB, #A9B7BF)":"linear-gradient(135deg, #FFF3D0, #C9A9F0)"}function o(){let p=n.storeFeatured;if(!p)return;p.innerHTML="";let f=Sg(),b=Mg();n.storeRotation&&(n.storeRotation.textContent=b===1?"New selection tomorrow":`New selection in ${b} days`);for(let _ of f){let m=Rs(e,_.id),E=Eg(_),x=kn(e,E),w=document.createElement("div");w.className="st-card st-card--featured",m&&w.classList.add("is-owned");let y=document.createElement("div");y.className="st-swatch",y.style.background=r(_);let T=document.createElement("div");T.className="st-name",T.textContent=_.name;let I=document.createElement("div");I.className="st-kind",I.textContent=_.type;let P=document.createElement("span");P.className="st-tag st-tag--off",P.textContent=`\u2212${Math.round(hf*100)}%`;let L=document.createElement("button");if(L.className="gel gel--sm st-buy",m)L.textContent="Owned",L.classList.add("is-disabled");else{let[z,$]=Object.entries(E)[0],V=_.cost[z];L.innerHTML=`<s>${Oe(V)}</s> ${Oe($)}`,L.classList.toggle("is-disabled",!x),L.addEventListener("click",()=>{if(!Cd(e,E)){t?.bump();return}e.ownedCosmetics.includes(_.id)||e.ownedCosmetics.push(_.id),t?.chime(),i?.(),S()})}w.append(P,y,T,I,L),p.appendChild(w)}}function a(p){let f=document.createElement("div");f.className="st-grant";let b=document.createElement("i"),_=document.createElement("span");if(p.kind==="droplets")b.className="coin-icon icon-droplet",_.textContent=Oe(p.amount);else if(p.kind==="prisms")b.className="coin-icon icon-prism",_.textContent=Oe(p.amount);else{let m=en(p.id);b.className="st-swatch st-swatch--tiny",b.style.background=m?r(m):"linear-gradient(135deg, #FFF3D0, #C9A9F0)",_.textContent=m?.name||p.id}return f.append(b,_),f}function l(){let p=n.storeBundles;if(!p)return;p.innerHTML="";let f=Tg(e);if(!f.length){let b=document.createElement("p");b.className="muted small",b.textContent="No bundles available right now.",p.appendChild(b);return}for(let b of f){let _=document.createElement("div");if(_.className="st-card st-card--bundle",b.discount>0){let y=document.createElement("span");y.className="st-tag st-tag--save",y.textContent=`Save ${b.discount}%`,_.appendChild(y)}if(b.oncePerAccount){let y=document.createElement("span");y.className="st-tag st-tag--once",y.textContent="Once only",_.appendChild(y)}let m=document.createElement("div");m.className="st-name st-name--lg",m.textContent=b.name;let E=document.createElement("div");E.className="st-blurb",E.textContent=b.blurb;let x=document.createElement("div");x.className="st-grants";for(let y of b.grants)x.appendChild(a(y));let w=document.createElement("button");w.className="gel gel--sm gel--buy",w.textContent=zu(b.pence),w.addEventListener("click",()=>{s(b.name,()=>Rg(e,b.id,Gt))}),_.append(m,E,x,w),p.appendChild(_)}}function c(p,f,b){if(p){p.innerHTML="";for(let _ of f){let m=document.createElement("div");if(m.className="st-card st-card--pack",_.bestValue){let I=document.createElement("span");I.className="st-tag st-tag--best",I.textContent="Best value",m.appendChild(I)}else if(_.popular){let I=document.createElement("span");I.className="st-tag st-tag--pop",I.textContent="Popular",m.appendChild(I)}let E=document.createElement("i");E.className=`coin-icon ${b} st-pack-icon`;let x=document.createElement("div");x.className="st-amount",x.textContent=Oe(_.base);let w=document.createElement("div");w.className="st-bonus",w.textContent=_.bonus>0?`+${Oe(_.bonus)} bonus`:"\xA0";let y=document.createElement("div");y.className="st-kind",y.textContent=_.name;let T=document.createElement("button");T.className="gel gel--sm gel--buy",T.textContent=zu(_.pence),T.addEventListener("click",()=>{s(_.name,()=>Ag(e,_.id,Gt))}),m.append(E,x,w,y,T),p.appendChild(m)}}}function u(){n.storeDroplets&&(n.storeDroplets.textContent=Oe(Math.floor(e.droplets))),n.storePrisms&&(n.storePrisms.textContent=Oe(e.prisms))}function d(){let p=n.storePasses;if(!p)return;p.innerHTML="";let f=ln(e).premium;for(let b of bg){let _=document.createElement("div");if(_.className="st-card st-card--bundle",b.bestValue){let w=document.createElement("span");w.className="st-tag st-tag--best",w.textContent="Best value",_.appendChild(w)}let m=document.createElement("div");m.className="st-name st-name--lg",m.textContent=b.name;let E=document.createElement("div");E.className="st-blurb",E.textContent=b.blurb;let x=document.createElement("button");x.className="gel gel--sm gel--buy",f?(x.textContent=b.tiers?`${Hu(b)} \u2014 tiers only`:"Owned",x.classList.toggle("is-disabled",!b.tiers)):x.textContent=Hu(b),x.addEventListener("click",()=>{if(f&&!b.tiers){t?.bump();return}s(b.name,()=>{f||Va(e),b.tiers&&co(e,b.tiers,h)})}),_.append(m,E,x),p.appendChild(_)}}let h={spend:()=>!0};function g(){let p=n.storeTierPacks;if(!p)return;p.innerHTML="";let f=lo(e);for(let b of _g){let _=document.createElement("div");if(_.className="st-card st-card--pack",b.bestValue){let w=document.createElement("span");w.className="st-tag st-tag--best",w.textContent="Best value",_.appendChild(w)}else if(b.popular){let w=document.createElement("span");w.className="st-tag st-tag--pop",w.textContent="Popular",_.appendChild(w)}let m=document.createElement("div");m.className="st-amount",m.textContent=`+${b.tiers}`;let E=document.createElement("div");E.className="st-kind",E.textContent="Tiers";let x=document.createElement("button");x.className="gel gel--sm gel--buy",x.textContent=Hu(b),x.classList.toggle("is-disabled",f<=0),x.addEventListener("click",()=>{if(f<=0){t?.bump();return}s(b.name,()=>co(e,b.tiers,h))}),_.append(m,E,x),p.appendChild(_)}}function v(){let p=n.storeFirstBuy;if(!p)return;let f=ff(e);p.classList.toggle("is-hidden",!f),f&&(p.textContent=`Your first purchase is doubled \u2014 ${df}\xD7 on whatever you buy first.`)}function S(){u(),v(),o(),d(),g(),l(),c(n.storeDropletPacks,ja,"icon-droplet"),c(n.storePrismPacks,Ou,"icon-prism")}return{render:S,enter:S}}zt();mn();function Ig({el:n,save:e,audio:t,onChange:i}){function s(){let l=Ps(e);if(n.colHave&&(n.colHave.textContent=String(l.have)),n.colTotal&&(n.colTotal.textContent=String(l.total)),n.colBar&&(n.colBar.style.width=`${Math.round(l.frac*100)}%`),n.colPct&&(n.colPct.textContent=`${Math.round(l.frac*100)}%`),n.colClaimAll){let c=Uu(e);n.colClaimAll.textContent=c?`Claim All (${c})`:"Claim All",n.colClaimAll.classList.toggle("is-disabled",c===0)}}function r(l){let c=[];return l.prisms&&c.push(`${l.prisms}\u25C6`),l.droplets&&c.push(Oe(l.droplets)),c.join(" + ")}function o(){let l=n.colSets;if(l){l.innerHTML="";for(let c of rr(e)){let u=document.createElement("div");u.className="col-set",c.complete&&u.classList.add("is-complete"),c.claimed&&u.classList.add("is-claimed");let d=document.createElement("div");d.className="col-set-head";let h=document.createElement("span");h.className="col-set-name",h.textContent=c.name;let g=document.createElement("span");g.className="col-set-count",g.textContent=`${c.have} / ${c.total}`,d.append(h,g);let v=document.createElement("div");v.className="progress-tube col-set-tube";let S=document.createElement("i");S.style.width=`${Math.round(c.frac*100)}%`,v.appendChild(S);let p=document.createElement("div");if(p.className="col-set-foot",c.claimed)p.textContent="Claimed",p.classList.add("is-done");else if(c.complete){let f=document.createElement("button");f.className="gel gel--tiny gel--claim",f.textContent=`Claim ${r(c.reward)}`,f.addEventListener("click",()=>{if(!sf(e,c.id,Gt)){t?.bump();return}t?.chime(),i?.(),a()}),p.appendChild(f)}else{let f=X0(e,c.id),b=document.createElement("span");if(b.className="col-set-next",f){let _=f.cost?.prisms?`${f.cost.prisms}\u25C6`:Oe(f.cost?.droplets||0);b.textContent=`Next: ${f.name} \xB7 ${_}`}else b.textContent=`${c.total-c.have} to go \xB7 ${r(c.reward)}`;p.appendChild(b)}u.append(d,v,p),l.appendChild(u)}}}n.colClaimAll?.addEventListener("click",()=>{if(!$0(e,Gt).length){t?.bump();return}t?.chime(),i?.(),a()});function a(){s(),o()}return{render:a,enter:a}}zt();mn();mn();var po=[{id:"first_flight",name:"First Light",desc:"Finish your first run.",reward:120,check:n=>n.runs>=1},{id:"combo_10",name:"Chain of Ten",desc:"Reach a \xD710 combo.",reward:200,check:n=>n.bestCombo>=10},{id:"combo_25",name:"Perfect Chain",desc:"Reach the \xD725 combo cap.",reward:900,check:n=>n.bestCombo>=25},{id:"dist_2k",name:"Out of Sight",desc:"Fly 2,000 m in one run.",reward:180,check:n=>n.bestDistance>=2e3},{id:"dist_5k",name:"Long Haul",desc:"Fly 5,000 m in one run.",reward:420,check:n=>n.bestDistance>=5e3},{id:"dist_12k",name:"Horizon Chaser",desc:"Fly 12,000 m in one run.",reward:1400,check:n=>n.bestDistance>=12e3},{id:"dist_25k",name:"No Fixed Address",desc:"Fly 25,000 m in one run.",reward:4e3,check:n=>n.bestDistance>=25e3},{id:"score_5k",name:"Getting Somewhere",desc:"Score 5,000 in a run.",reward:200,check:n=>n.bestScore>=5e3},{id:"score_25k",name:"Bright Streak",desc:"Score 25,000 in a run.",reward:800,check:n=>n.bestScore>=25e3},{id:"score_100k",name:"Six Figures of Light",desc:"Score 100,000 in a run.",reward:3200,check:n=>n.bestScore>=1e5},{id:"clean_1500",name:"Not a Scratch",desc:"Fly 1,500 m in one run without a single contact.",reward:700,check:n=>n.stats.bestNoHitDistance>=1500},{id:"clean_4000",name:"Frictionless",desc:"Fly 4,000 m in one run without a single contact.",reward:2400,check:n=>n.stats.bestNoHitDistance>=4e3},{id:"world_verdant",name:"Into the Green",desc:"Reach Verdant Circuit.",reward:320,check:n=>n.worldsUnlocked.includes("verdant")},{id:"world_aurora",name:"Under the Curtain",desc:"Reach Aurora Reach.",reward:640,check:n=>n.worldsUnlocked.includes("aurora")},{id:"world_crystal",name:"Through the Glass",desc:"Reach Crystal Atrium.",reward:1100,check:n=>n.worldsUnlocked.includes("crystal")},{id:"world_realm",name:"Golden Hour",desc:"Reach the Solar Bloom realm.",reward:2600,check:n=>n.worldsUnlocked.includes("solarbloom")},{id:"portals_10",name:"Threshold Habit",desc:"Pass 10 Portals.",reward:380,check:n=>n.stats.portals>=10},{id:"checkpoints_150",name:"Milestone Collector",desc:"Pass 150 checkpoint gates.",reward:520,check:n=>n.stats.checkpoints>=150},{id:"rings_500",name:"Ringmaster",desc:"Thread 500 ring gates.",reward:900,check:n=>n.stats.rings>=500},{id:"orbs_5000",name:"Light Hoarder",desc:"Collect 5,000 light orbs.",reward:1500,check:n=>n.stats.orbs>=5e3},{id:"level_10",name:"Seasoned",desc:"Reach account Level 10.",reward:600,check:n=>pn(n.xp)>=10},{id:"level_25",name:"Veteran Drifter",desc:"Reach account Level 25.",reward:2800,check:n=>pn(n.xp)>=25},{id:"rebirth_1",name:"Ascendant",desc:"Rebirth for the first time.",reward:800,check:n=>(n.rebirthCount||0)>=1},{id:"rebirth_5",name:"Cycle Runner",desc:"Rebirth five times.",reward:5e3,check:n=>(n.rebirthCount||0)>=5},{id:"daily_1",name:"Same Sky",desc:"Finish a Daily Challenge run.",reward:300,check:n=>!!n.daily.played},{id:"photo_1",name:"Postcard",desc:"Save a photo from Photo Mode.",reward:240,check:n=>n.stats.photos>=1},{id:"evo_first",name:"First Branch",desc:"Grow your first Evolution node.",reward:260,check:n=>(n.evolution||[]).length>=1},{id:"evo_five",name:"Taking Shape",desc:"Grow five Evolution nodes.",reward:900,check:n=>(n.evolution||[]).length>=5},{id:"evo_form",name:"Transfigured",desc:"Reach a capstone Form.",reward:3e3,check:n=>oo(n)!=="spark"},{id:"evo_whole",name:"Fully Grown",desc:"Own every node on the Evolution Tree at once.",reward:9e3,check:n=>Zn.every(e=>an(n,e))},{id:"season_10",name:"Tidewater Regular",desc:"Reach season tier 10.",reward:500,check:n=>ln(n).tier>=10},{id:"season_50",name:"High Water",desc:"Finish a season track.",reward:4200,check:n=>ln(n).complete},{id:"col_quarter",name:"Magpie",desc:"Own a quarter of the catalogue.",reward:700,check:n=>Ps(n).frac>=.25},{id:"col_half",name:"Discerning",desc:"Own half the catalogue.",reward:2200,check:n=>Ps(n).frac>=.5},{id:"col_set",name:"Matching Set",desc:"Complete any collection set.",reward:1200,check:n=>rr(n).some(e=>e.complete)},{id:"col_all",name:"Completionist",desc:"Own every cosmetic in the game.",reward:12e3,check:n=>Ps(n).frac>=1},{id:"streak_7",name:"A Week of Sky",desc:"Hold a seven-day streak.",reward:900,check:n=>(n.streak?.best||0)>=7},{id:"streak_30",name:"Habitual",desc:"Hold a thirty-day streak.",reward:5200,check:n=>(n.streak?.best||0)>=30}],$2=Object.fromEntries(po.map(n=>[n.id,n]));function Pg(n,e,t){let i=[];for(let s of po){if(n.achievements.includes(s.id))continue;let r=!1;try{r=!!s.check(n,e)}catch{r=!1}r&&(n.achievements.push(s.id),t.earnDroplets(n,s.reward),i.push(s))}return i}function Dg(n){return po.map(e=>({...e,earned:n.achievements.includes(e.id)}))}function Lg(n){return{earned:n.achievements.length,total:po.length}}er();var cE={spark:"Spark",prism:"Prism Form",comet:"Comet Form",bastion:"Bastion Form"};function Ng({el:n,save:e}){let t=(r,o=Oe)=>r>0?o(r):"\u2014";function i(){let r=e.stats||{},o=Ia(e.xp),a=Ps(e),l=ln(e),c=Lu(e),u=e.runs||0,d=Zn.filter(v=>an(e,v)).length,h=rr(e),g=h.filter(v=>v.complete).length;return[{title:"Distance",rows:[["Lifetime",fn(e.lifetimeDistance||0)],["Best run",fn(e.bestDistance||0)],["Average run",u?fn((e.lifetimeDistance||0)/u):"\u2014"],["Longest clean stretch",t(r.bestNoHitDistance||0,fn)],["Runs flown",Oe(u)]]},{title:"Flying",rows:[["Best score",t(e.bestScore||0)],["Best combo",e.bestCombo>1?`\xD7${e.bestCombo}`:"\u2014"],["Light orbs",Oe(r.orbs||0)],["Ring gates",Oe(r.rings||0)],["Checkpoints",Oe(r.checkpoints||0)],["Portals",Oe(r.portals||0)],["Contacts",Oe(r.hits||0)],["Flawless runs",Oe(r.cleanRuns||0)]]},{title:"Progression",rows:[["Level",`${o.level} / ${Fa}`],["Lifetime XP",Oe(Math.floor(e.xp||0))],["Rebirths",Oe(e.rebirthCount||0)],["Lifetime Droplets",Oe(Math.floor(e.lifetimeDroplets||0))],["Prisms held",Oe(e.prisms||0)],["Evolution nodes",`${d} / ${Zn.length}`],["Current Form",cE[oo(e)]||"Spark"]]},{title:"Collection",rows:[["Cosmetics owned",`${a.have} / ${a.total}`],["Sets completed",`${g} / ${h.length}`],["Milestones",`${(e.achievements||[]).length} / ${po.length}`],["Worlds reached",`${(e.worldsUnlocked||[]).length} / ${li.length}`],["Photos saved",Oe(r.photos||0)]]},{title:"Commitment",rows:[["Season tier",`${l.tier} / ${l.maxTier}`],["Season lane",l.premium?"Premium":"Free"],["Current streak",c.streak?`${c.streak} days`:"\u2014"],["Longest streak",c.best?`${c.best} days`:"\u2014"],["Daily challenge",e.daily?.played?"Played today":"Not played today"]]}]}function s(){let r=n.statsBody;if(r){r.innerHTML="";for(let o of i()){let a=document.createElement("div");a.className="rec-group";let l=document.createElement("h3");l.className="rec-group-title",l.textContent=o.title,a.appendChild(l);for(let[c,u]of o.rows){let d=document.createElement("div");d.className="rec-row",u==="\u2014"&&d.classList.add("is-empty");let h=document.createElement("span");h.className="rec-label",h.textContent=c;let g=document.createElement("span");g.className="rec-value",g.textContent=u,d.append(h,g),a.appendChild(d)}r.appendChild(a)}}}return{render:s,enter:s}}zt();function Ug({el:n,save:e,api:t}){let i="global";function s(c,u=""){n.netState.textContent=c,n.netState.className=`net-state${u?` ${u}`:""}`}async function r(){if(!t.base){s("No server configured \u2014 playing entirely offline.","is-offline"),n.boardList.innerHTML="",a("Leaderboards need the optional backend. See server/README.md.");return}s("Contacting the server\u2026");let c=await t.leaderboard(i,i==="daily"?gn():"",25);if(!c){s(`Offline \u2014 no server at ${t.base}. All progress is saved locally.`,"is-offline"),n.boardList.innerHTML="",a("Start it with: node server/server.js");return}s(i==="daily"?`Daily challenge \u2014 ${gn()}`:"Global \u2014 all seeds","is-online"),o(c)}function o(c){if(n.boardList.innerHTML="",!c.length){a(i==="daily"?"Nobody has flown today yet. Be first.":"No runs submitted yet.");return}c.forEach((u,d)=>{let h=document.createElement("li");h.className=`board-row${u.playerId===e.playerId?" is-me":""}`,h.append(mo("board-rank",`${d+1}`),mo("board-name",u.name||"Anonymous Drifter"),mo("board-score",Oe(u.score)),mo("board-dist",fn(u.distance))),n.boardList.appendChild(h)})}function a(c){let u=document.createElement("li");u.className="board-row",u.style.gridTemplateColumns="1fr",u.textContent=c,n.boardList.appendChild(u)}n.boardTabs?.addEventListener("click",c=>{let u=c.target.closest(".seg-btn");if(u){i=u.dataset.board;for(let d of n.boardTabs.querySelectorAll(".seg-btn"))d.classList.toggle("is-on",d.dataset.board===i);r()}});function l(){let c=Lg(e);n.achProgress.textContent=`${c.earned} / ${c.total} earned`,n.achList.innerHTML="";let u=Dg(e).sort((d,h)=>(h.earned?1:0)-(d.earned?1:0));for(let d of u){let h=document.createElement("div");h.className=`ach-item${d.earned?" is-earned":""}`;let g=document.createElement("span");g.className="ach-mark",g.textContent=d.earned?"\u2713":"";let v=document.createElement("div");v.appendChild(mo("ach-name",d.name)),v.appendChild(mo("ach-desc",d.desc));let S=document.createElement("span");S.className="ach-reward";let p=document.createElement("i");p.className="coin-icon icon-droplet",S.append(p,document.createTextNode(Oe(d.reward))),h.append(g,v,S),n.achList.appendChild(h)}}return{refresh:r,renderAchievements:l,get board(){return i}}}function mo(n,e){let t=document.createElement("span");return t.className=n,t.textContent=e,t}mn();var uE=["boot","hub","how","pause","results","settings","shop","upgrades","evolution","season","store","collection","stats","streak","more","rebirth","leaderboard","achievements","offline"];function kg(n){let{save:e,audio:t,api:i,onPlay:s,onDaily:r,onResume:o,onEndRun:a,onHome:l,onSettingsChange:c,onEquip:u,onRebirth:d,onResetProgress:h,onPersist:g,onPhotoEnter:v,onPhotoExit:S,onPhotoSave:p,onPhotoChange:f,onReportIssue:b}=n,_=C=>document.getElementById(C),m={screens:Object.fromEntries(uE.map(C=>[C,_(`screen-${C}`)])),hud:_("hud"),score:_("hud-score"),combo:_("hud-combo"),mult:_("hud-mult"),distance:_("hud-distance"),next:_("hud-next"),progress:_("hud-progress"),boostGauge:_("boost-gauge"),boostFill:_("boost-fill"),biome:_("hud-biome"),toast:_("hud-toast"),popups:_("popups"),flash:_("flash"),boostPad:_("boost-pad"),pauseBtn:_("pause-btn"),shieldChip:_("hud-shield"),pipRow:_("pip-row"),regenFill:_("regen-fill"),hudDroplets:_("hud-droplets"),hudObjectives:_("hud-objectives"),objList:_("obj-list"),ghostChip:_("hud-ghost"),ghostDelta:_("ghost-delta"),walDroplets:_("wal-droplets"),walPrisms:_("wal-prisms"),walLevel:_("wal-level"),walXp:_("wal-xp"),statBest:_("stat-best"),statBestDist:_("stat-bestdist"),statLifetime:_("stat-lifetime"),worldRow:_("world-row"),questList:_("quest-list"),questReroll:_("quest-reroll"),btnRebirth:_("btn-rebirth"),btnDaily:_("btn-daily"),shopGrid:_("shop-grid"),shopTabs:_("shop-tabs"),wispPreview:_("wisp-preview"),wispName:_("wisp-name"),wispBlurb:_("wisp-blurb"),shopDroplets:_("shop-droplets"),shopPrisms:_("shop-prisms"),upgradeGrid:_("upgrade-grid"),upgDroplets:_("upg-droplets"),upgLevel:_("upg-level"),evoTree:_("evo-tree"),evoSummary:_("evo-summary"),evoRespec:_("evo-respec"),evoRespecNote:_("evo-respec-note"),loadoutRow:_("loadout-row"),statsBody:_("stats-body"),colHave:_("col-have"),colTotal:_("col-total"),colBar:_("col-bar"),colPct:_("col-pct"),colSets:_("col-sets"),colClaimAll:_("col-claim-all"),streakPanel:_("streak-panel"),streakCount:_("streak-count"),streakRow:_("streak-row"),streakClaim:_("streak-claim"),btnSeason:document.querySelector('[data-action="season"]'),btnEvolution:document.querySelector('[data-action="evolution"]'),btnCollection:document.querySelector('[data-action="collection"]'),btnStreak:document.querySelector('[data-action="streak"]'),modePick:_("mode-pick"),modeBlurb:_("mode-blurb"),storeDroplets:_("store-droplets"),storePrisms:_("store-prisms"),storeRotation:_("store-rotation"),storeFeatured:_("store-featured"),storePasses:_("store-passes"),storeTierPacks:_("store-tier-packs"),storeFirstBuy:_("store-first-buy"),storeBundles:_("store-bundles"),storeDropletPacks:_("store-droplet-packs"),storePrismPacks:_("store-prism-packs"),seasonName:_("season-name"),seasonBlurb:_("season-blurb"),seasonTier:_("season-tier"),seasonBar:_("season-bar"),seasonXpLabel:_("season-xp-label"),seasonTrack:_("season-track"),seasonClaimAll:_("season-claim-all"),seasonUnlock:_("season-unlock"),seasonTierBuy:_("season-tier-buy"),seasonPremiumTag:_("season-premium-tag"),evoDroplets:_("evo-droplets"),evoPrisms:_("evo-prisms"),evoLevel:_("evo-level"),rebProgress:_("reb-progress"),rebProgressLabel:_("reb-progress-label"),rebKeeps:_("reb-keeps"),rebResets:_("reb-resets"),rebPrisms:_("reb-prisms"),rebMult:_("reb-mult"),rebConfirm:_("reb-confirm"),netState:_("net-state"),boardList:_("board-list"),boardTabs:_("board-tabs"),setName:_("set-name"),achList:_("ach-list"),achProgress:_("ach-progress"),resTitle:_("res-title"),resCause:_("res-cause"),resScore:_("res-score"),resDistance:_("res-distance"),resCombo:_("res-combo"),resWorlds:_("res-worlds"),resDroplets:_("res-droplets"),resPrisms:_("res-prisms"),resPrismWrap:_("res-prism-wrap"),resXp:_("res-xp"),resLevelup:_("res-levelup"),resBadge:_("result-badge"),resUnlocks:_("res-unlocks"),resSeed:_("res-seed"),pauseSeed:_("pause-seed"),setExposure:_("set-exposure"),setBloom:_("set-bloom"),setVolume:_("set-volume"),setMute:_("set-mute"),setGhosts:_("set-ghosts"),setQuality:_("set-quality"),setFlash:_("set-flash"),setShake:_("set-shake"),setLargeText:_("set-large-text"),valFlash:_("val-flash"),valShake:_("val-shake"),valExposure:_("val-exposure"),valBloom:_("val-bloom"),valVolume:_("val-volume"),qualityNote:_("quality-note"),photoBar:_("photo-bar"),photoOrbit:_("photo-orbit"),photoHeight:_("photo-height"),photoZoom:_("photo-zoom"),photoExposure:_("photo-exposure"),valOrbit:_("val-orbit"),valHeight:_("val-height"),valZoom:_("val-zoom"),valPhotoExp:_("val-photo-exp")},E="boot",x="hub",w=K0({el:m,save:e,audio:t,onPersist:()=>g?.()}),y=mg({el:m,save:e,audio:t,onChange:()=>{w.refresh(),g?.()},onEquip:C=>{u?.(C)}}),T=xg({el:m,save:e,audio:t,onChange:()=>{w.refresh(),V(),g?.()}}),I=yg({el:m,save:e,audio:t,onChange:()=>{w.refresh(),g?.()}}),P=Fg({el:m,save:e,audio:t,onChange:()=>{w.refresh(),g?.()}}),L=Ig({el:m,save:e,audio:t,onChange:()=>{w.refresh(),g?.()}}),z=Ng({el:m,save:e}),$=Ug({el:m,save:e,api:i});function V(){m.evoDroplets&&(m.evoDroplets.textContent=Oe(Math.floor(e.droplets))),m.evoPrisms&&(m.evoPrisms.textContent=Oe(e.prisms)),m.evoLevel&&(m.evoLevel.textContent=String(pn(e.xp)))}function X(C){E==="shop"&&C!=="shop"&&y.exit();for(let[k,ee]of Object.entries(m.screens))ee&&ee.classList.toggle("is-active",k===C);m.hud.classList.toggle("is-active",C==="playing"),m.hud.setAttribute("aria-hidden",C==="playing"?"false":"true"),E=C,t&&t.setPadLevel(C==="playing"?.26:.17)}function B(C){switch((E==="hub"||E==="pause")&&(x=E),C){case"shop":y.enter(),w.refreshWallet();break;case"upgrades":y.renderUpgrades(),w.refreshWallet();break;case"evolution":T.enter(),V();break;case"season":I.enter();break;case"store":P.enter();break;case"collection":L.enter();break;case"stats":z.enter();break;case"streak":w.refreshStreak();break;case"rebirth":y.renderRebirth();break;case"leaderboard":$.refresh();break;case"achievements":$.renderAchievements();break;default:break}X(C)}function Q(){E==="evolution"&&T.exit(),x==="hub"&&he(),X(x)}function he(){w.refresh()}let ae=1,W=null,ne=-1,F=-1,J="";function Y(C,k){let ee=m.objList,xe=m.hudObjectives;if(!ee||!xe)return;if(!Array.isArray(C)||!C.length){xe.hidden=!0;return}xe.hidden=!1;let pe=C.map(ue=>`${ue.id}:${ue.done?1:0}`).join("|");if(pe!==J){J=pe,ee.innerHTML="";for(let ue of C){let Me=document.createElement("div");Me.className="obj-row",ue.done&&Me.classList.add("is-done"),Me.dataset.id=ue.id;let Re=document.createElement("span");Re.className="obj-text",Re.textContent=ue.text;let Ee=document.createElement("div");Ee.className="obj-tube";let ve=document.createElement("i");Ee.appendChild(ve),Me.append(Re,Ee),ee.appendChild(Me)}}if(!Array.isArray(k))return;let se=ee.children;for(let ue=0;ue<se.length&&ue<k.length;ue++){let Me=se[ue].querySelector(".obj-tube > i");Me&&(Me.style.width=`${$e(k[ue],0,1)*100}%`)}}function A(C){m.score.textContent=Oe(C.score),m.distance.textContent=fn(C.distance),m.progress.style.width=`${$e(C.worldProgress,0,1)*100}%`,m.next.textContent=`Portal in ${fn(C.toPortal)}`,m.hudDroplets.textContent=Oe(C.droplets),C.combo!==ae&&(m.combo.textContent=`\xD7${C.combo}`,m.combo.classList.toggle("is-hot",C.combo>=8),m.combo.classList.add("is-pulse"),clearTimeout(W),W=setTimeout(()=>m.combo.classList.remove("is-pulse"),130),ae=C.combo),C.runMult>0?(m.mult.hidden=!1,m.mult.textContent=`+${C.runMult}`):m.mult.hidden=!0,Y(C.objectives,C.objectiveProgress),U(C.pips,C.maxPips,C.regen,C.exposed),m.boostFill.style.width=`${$e(C.boost,0,1)*100}%`,m.boostGauge.classList.toggle("is-ready",C.boost>.35&&!C.boosting),m.boostGauge.classList.toggle("is-firing",!!C.boosting)}function U(C,k,ee,xe){if(k!==F){m.pipRow.innerHTML="";for(let pe=0;pe<k;pe++){let se=document.createElement("i");se.className="pip",m.pipRow.appendChild(se)}F=k,ne=-1}if(C!==ne){let pe=m.pipRow.children;for(let se=0;se<pe.length;se++){let ue=se<C;pe[se].classList.toggle("is-full",ue),ue&&ne>=0&&se>=ne&&(pe[se].classList.remove("is-popping"),pe[se].offsetWidth,pe[se].classList.add("is-popping"))}ne=C}m.regenFill.style.width=`${$e(ee,0,1)*100}%`,m.shieldChip.classList.toggle("is-exposed",!!xe)}function O(C){if(C==null){m.ghostChip.hidden=!0;return}m.ghostChip.hidden=!1;let k=C<0;m.ghostDelta.textContent=`${k?"+":"\u2212"}${Math.abs(Math.round(C))} m`,m.ghostChip.classList.toggle("is-ahead",k),m.ghostChip.classList.toggle("is-behind",!k)}let q=null;function H(C){m.biome.textContent=C,m.biome.classList.remove("is-shown"),m.biome.offsetWidth,m.biome.classList.add("is-shown"),clearTimeout(q),q=setTimeout(()=>m.biome.classList.remove("is-shown"),3300)}let te=null;function K(C){m.toast.textContent=C,m.toast.classList.remove("is-shown"),m.toast.offsetWidth,m.toast.classList.add("is-shown"),clearTimeout(te),te=setTimeout(()=>m.toast.classList.remove("is-shown"),1900)}let de=14;function be(C,k,ee,xe=""){m.popups.childElementCount>=de&&m.popups.removeChild(m.popups.firstChild);let pe=document.createElement("div");pe.className=`popup${xe?` popup--${xe}`:""}`,pe.textContent=C,pe.style.left=`${k}px`,pe.style.top=`${ee}px`,m.popups.appendChild(pe),pe.addEventListener("animationend",()=>pe.remove(),{once:!0})}let oe=null;function me(C=1){let k=e.settings?.flashIntensity??1;if(k<=0)return;let ee=C*k;m.flash.style.setProperty("--flash-alpha",String(Math.min(1,ee))),m.flash.classList.add("is-lit"),clearTimeout(oe),oe=setTimeout(()=>m.flash.classList.remove("is-lit"),60+ee*40)}function we(C){m.resTitle.textContent=C.fatal?"Run Ended":"Run Complete",m.resCause.textContent=C.cause||"",m.resScore.textContent=Oe(C.score),m.resDistance.textContent=fn(C.distance),m.resCombo.textContent=`\xD7${C.bestCombo}`,m.resWorlds.textContent=String(C.worldsVisited),m.resDroplets.textContent=`+${Oe(C.droplets)}`,m.resXp.textContent=`+${Oe(C.xp)}`,m.resSeed.textContent=`Seed ${no(C.seed)}${C.daily?" \xB7 Daily":""}`,m.resPrismWrap.hidden=!C.prisms,m.resPrisms.textContent=`+${C.prisms||0}`,m.resBadge.hidden=!C.isNewBest,C.leveledUp?(m.resLevelup.hidden=!1,m.resLevelup.textContent=`Level ${C.levelAfter} reached`):m.resLevelup.hidden=!0,m.resUnlocks.innerHTML="";for(let k of C.toasts||[]){let ee=document.createElement("div");ee.className="unlock-toast",ee.textContent=k,m.resUnlocks.appendChild(ee)}X("results")}function Se(C,k){m.pauseSeed.textContent=`Seed ${no(C)}${k?" \xB7 Daily Challenge":""}`}function ge(){let C=e.settings;m.setExposure.value=String(Math.round(C.exposure*100)),m.valExposure.textContent=`${Math.round(C.exposure*100)}%`,m.setBloom.value=String(Math.round(C.bloom*100)),m.valBloom.textContent=`${Math.round(C.bloom*100)}%`,m.setVolume.value=String(Math.round(C.volume*100)),m.valVolume.textContent=`${Math.round(C.volume*100)}%`,m.setMute.checked=!!C.muted,m.setFlash&&(m.setFlash.value=String(Math.round((C.flashIntensity??1)*100)),m.valFlash.textContent=`${Math.round((C.flashIntensity??1)*100)}%`),m.setShake&&(m.setShake.value=String(Math.round((C.shakeIntensity??1)*100)),m.valShake.textContent=`${Math.round((C.shakeIntensity??1)*100)}%`),m.setLargeText&&(m.setLargeText.checked=!!C.largeText),Le(),m.setGhosts.checked=C.ghosts!==!1,m.setName.value=e.displayName||"";for(let k of m.setQuality.querySelectorAll(".seg-btn"))k.classList.toggle("is-on",k.dataset.q===C.quality)}function Ae(C){m.qualityNote.textContent=C}function Le(){document.documentElement.classList.toggle("is-large-text",!!e.settings.largeText)}m.setFlash?.addEventListener("input",()=>{e.settings.flashIntensity=Number(m.setFlash.value)/100,m.valFlash.textContent=`${m.setFlash.value}%`,c("flashIntensity",e.settings.flashIntensity)}),m.setShake?.addEventListener("input",()=>{e.settings.shakeIntensity=Number(m.setShake.value)/100,m.valShake.textContent=`${m.setShake.value}%`,c("shakeIntensity",e.settings.shakeIntensity)}),m.setLargeText?.addEventListener("change",()=>{e.settings.largeText=!!m.setLargeText.checked,Le(),t&&t.click(),c("largeText",e.settings.largeText)}),m.setExposure.addEventListener("input",()=>{e.settings.exposure=Number(m.setExposure.value)/100,m.valExposure.textContent=`${m.setExposure.value}%`,c("exposure",e.settings.exposure)}),m.setBloom.addEventListener("input",()=>{e.settings.bloom=Number(m.setBloom.value)/100,m.valBloom.textContent=`${m.setBloom.value}%`,c("bloom",e.settings.bloom)}),m.setVolume.addEventListener("input",()=>{e.settings.volume=Number(m.setVolume.value)/100,m.valVolume.textContent=`${m.setVolume.value}%`,c("volume",e.settings.volume)}),m.setMute.addEventListener("change",()=>{e.settings.muted=m.setMute.checked,c("muted",e.settings.muted)}),m.setGhosts.addEventListener("change",()=>{e.settings.ghosts=m.setGhosts.checked,c("ghosts",e.settings.ghosts)}),m.setName.addEventListener("change",()=>{e.displayName=m.setName.value.trim().slice(0,18),c("displayName",e.displayName)}),m.setQuality.addEventListener("click",C=>{let k=C.target.closest(".seg-btn");k&&(e.settings.quality=k.dataset.q,ge(),t&&t.click(),c("quality",e.settings.quality))});function Ke(){return{orbit:Number(m.photoOrbit.value)*Math.PI/180,height:Number(m.photoHeight.value),zoom:Number(m.photoZoom.value),exposure:Number(m.photoExposure.value)/100}}function G(){m.valOrbit.textContent=`${m.photoOrbit.value}\xB0`,m.valHeight.textContent=m.photoHeight.value,m.valZoom.textContent=m.photoZoom.value,m.valPhotoExp.textContent=`${m.photoExposure.value}%`}for(let C of[m.photoOrbit,m.photoHeight,m.photoZoom,m.photoExposure])C.addEventListener("input",()=>{G(),f?.(Ke())});function Ze(C){document.body.classList.toggle("is-photo",C),m.photoBar.hidden=!C,C&&(G(),f?.(Ke()))}document.addEventListener("click",C=>{let k=C.target.closest("[data-action]");if(!k)return;let ee=k.dataset.action;if(k.disabled||k.classList.contains("is-disabled")){t&&t.bump();return}switch(t&&ee!=="reload"&&t.click(),ee){case"play":s();break;case"daily":r();break;case"resume":o();break;case"end-run":a();break;case"home":l();break;case"how":B("how");break;case"settings":B("settings");break;case"shop":B("shop");break;case"upgrades":B("upgrades");break;case"evolution":B("evolution");break;case"season":B("season");break;case"store":B("store");break;case"collection":B("collection");break;case"stats":B("stats");break;case"streak":B("streak");break;case"more":B("more");break;case"rebirth":B("rebirth");break;case"leaderboard":B("leaderboard");break;case"achievements":B("achievements");break;case"close-modal":Q();break;case"refresh-board":i.refresh().then(()=>$.refresh());break;case"do-rebirth":d?.();break;case"reset-progress":D(k);break;case"report-issue":b?.();break;case"photo":v?.();break;case"photo-exit":S?.();break;case"photo-save":p?.();break;default:break}});let Ne=0;function D(C){let k=Date.now();if(Ne&&k-Ne<4e3){Ne=0,C.textContent="Reset progress",h?.();return}Ne=k,C.textContent="Tap again to erase everything",setTimeout(()=>{Ne&&(Ne=0,C.textContent="Reset progress")},4e3)}function M(C){document.body.classList.toggle("is-touch",C)}return{el:m,hub:w,shopUI:y,boardUI:$,show:X,openModal:B,closeModal:Q,setHud:A,setGhost:O,showBiome:H,showToast:K,popup:be,flash:me,refreshHub:he,showResults:we,setPauseSeed:Se,syncSettingsUI:ge,setQualityNote:Ae,setTouch:M,setPhotoMode:Ze,readPhoto:Ke,equipped:C=>Rn(e,C),get current(){return E}}}function hE(){if(new URLSearchParams(location.search).has("showcase"))return null;try{let n=new URLSearchParams(location.search).get("api");if(n)return n.replace(/\/$/,"");let e=localStorage.getItem("aerodrift.api");if(e)return e.replace(/\/$/,"")}catch{}return location.protocol==="file:"?null:`${location.protocol}//${location.hostname}:8787`}function Bg(){let n=hE(),e={status:n?"unknown":"offline",lastFailure:0,version:null};function t(){return!(!n||e.status==="offline"&&Date.now()-e.lastFailure<2e4)}function i(){e.status="offline",e.lastFailure=Date.now()}async function s(c,{method:u="GET",body:d=null}={}){if(!t())return null;let h=new AbortController,g=setTimeout(()=>h.abort(),2500);try{let v=await fetch(`${n}${c}`,{method:u,signal:h.signal,headers:d?{"Content-Type":"application/json"}:void 0,body:d?JSON.stringify(d):void 0});if(!v.ok)return i(),null;let S=await v.json();return e.status="online",S}catch{return i(),null}finally{clearTimeout(g)}}async function r(){let c=await s("/api/health");return c&&(e.version=c.version||null),!!c}async function o(c="global",u="",d=25){let h=new URLSearchParams({board:c,limit:String(d)});return u&&h.set("key",u),(await s(`/api/leaderboard?${h}`))?.entries||null}async function a(c){return s("/api/runs",{method:"POST",body:c})}async function l(c){return(await s(`/api/ghost?seed=${c>>>0}`))?.run||null}return{health:r,leaderboard:o,submitRun:a,ghostForSeed:l,get base(){return n},get status(){return e.status},get online(){return e.status==="online"},async refresh(){return e.lastFailure=0,r()}}}$t();zt();is();var Qa=.25,dE=2400;function Og(){let n=[],e=0,t=!1;function i(){n=[],e=Qa,t=!0}function s(){t=!1}function r(o,a){!t||n.length>=dE*3||(e+=o,!(e<Qa)&&(e-=Qa,n.push(Math.round(a.x*10)/10,Math.round(a.y*10)/10,Math.round(a.z*10)/10)))}return{start:i,stop:s,update:r,get path(){return n},get sampleCount(){return n.length/3},get duration(){return n.length/3*Qa}}}function zg(n){let{scene:e}=n,t=new Ut;t.visible=!1,e.add(t);let i=new Xe(new hn(.7,18,14),new Ot({color:new le("#D6E8FF"),transparent:!0,opacity:.28,depthWrite:!1}));t.add(i);let s=new Bt(new Dt({map:Un("#FFFFFF",2.4),color:new le("#C9D8FF"),blending:ct,transparent:!0,depthWrite:!1,opacity:.3,fog:!1}));s.scale.setScalar(2.6),t.add(s);let r=null,o=null,a=0;function l(S){return!S||!Array.isArray(S.path)||S.path.length<6?(c(),!1):(r=S.path,o=S,a=0,t.visible=!0,!0)}function c(){r=null,o=null,t.visible=!1}function u(){a=0,t.visible=!!r}function d(S,p){if(!r)return;a=p;let f=r.length/3,b=a/Qa,_=Math.floor(b);if(_>=f-1){let w=$e((b-(f-1))/4,0,1);i.material.opacity=.28*(1-w),s.material.opacity=.3*(1-w),w>=1&&(t.visible=!1);return}let m=b-_,E=_*3,x=E+3;t.position.set(st(r[E],r[x],m),st(r[E+1],r[x+1],m),st(r[E+2],r[x+2],m))}function h(S){return!r||!t.visible?null:t.position.z-S}function g(S){t.visible=S&&!!r}function v(){i.geometry.dispose(),i.material.dispose(),s.material.dispose()}return{group:t,load:l,clear:c,reset:u,update:d,leadOver:h,setEnabled:g,dispose:v,get active(){return!!r&&t.visible},get name(){return o?.name||"Ghost"},get score(){return o?.score||0}}}var Ds={version:"2.0.0",commit:"7923b43",branch:"claude/aerodrift-frutiger-aero-yl2m4v",commitDate:"2026-08-15T07:45:42+00:00",dirty:!0,stampedAt:"2026-08-15T08:09:05.086Z"},Gu=`${Ds.version}+${Ds.commit}${Ds.dirty?"-dirty":""}`;mn();var Fn={frames:0,worst:0,acc:0,window:0,fps:0,longFrames:0};function Hg(n){Fn.frames++,Fn.acc+=n,Fn.window+=n,n>Fn.worst&&(Fn.worst=n),n>.1&&Fn.longFrames++,Fn.window>=2&&(Fn.fps=Math.round(Fn.frames/Fn.window),Fn.frames=0,Fn.window=0)}function Gg(n){let e=globalThis.__AERO_DIAG;return globalThis.__AERO_BUILD_ID=Gu,e?(e.mark("booted",Gu),e.provider=()=>fE(n),{open:()=>e.open(!1),noteFrame:Hg}):(console.warn("[aerodrift] diagnostic core missing; index.html may be stale"),{open:()=>{},noteFrame:Hg})}function fE(n){let e=[],t=(s,r)=>e.push(`  ${s}: ${r}`);e.push("[build detail]"),t("build",Gu),t("branch",Ds.branch),t("commit date",Ds.commitDate||"unknown"),t("stamped",Ds.stampedAt),Ds.dirty&&t("note","stamped from a DIRTY working tree \u2014 local edits present"),e.push(""),e.push("[game state]");let i=null;try{i=n.probe()}catch(s){t("probe",`threw: ${s.message}`)}i&&(t("state",i.state),t("screen",i.screen),t("world",`${i.world} (condition: ${i.condition||"n/a"})`),t("seed",`${i.seedText} (${i.seed})`),t("distance",`${i.distance} m`),t("score",i.score),t("combo",`x${i.combo}  checkpoint mult x${i.checkpointMult}`),t("integrity",`${i.pips}/${i.maxPips}${i.exposed?" (EXPOSED)":""}  hits: ${i.hits}`),t("quality tier",i.tier),t("live objects",`chunks ${i.chunks}, orbs ${i.orbs}, rings ${i.rings}, streams ${i.streams}, obstacles ${i.obstacles}, gates ${i.gates}`),t("worlds unlocked",i.worlds.join(", "))),e.push(""),e.push("[renderer]");try{let s=n.sceneCore.renderer,r=s.info;t("fps (2s avg)",Fn.fps||"measuring"),t("worst frame",`${Math.round(Fn.worst*1e3)}ms`),t("hitches >100ms",Fn.longFrames),t("pixel ratio",s.getPixelRatio()),t("draw calls",r.render.calls),t("triangles",r.render.triangles),t("geometries",r.memory.geometries),t("textures",r.memory.textures),t("programs",r.programs?r.programs.length:"?"),t("exposure",n.sceneCore.exposure.toFixed(3)),t("context lost",s.getContext().isContextLost())}catch(s){t("renderer",`unavailable: ${s.message}`)}e.push(""),e.push("[save]"),t("load source",Rt.source),t("storage",Rt.storage),t("stored bytes",Rt.rawBytes),Rt.parseError&&t("parse error",Rt.parseError),t("keys present",Rt.keys.length?Rt.keys.join(", "):"(none \u2014 fresh profile)"),t("repairs on load",Rt.repairs.length?Rt.repairs.join(", "):"none");try{let s=n.save;t("writable",n.writeProbe()),t("progress",`droplets ${s.droplets}, prisms ${s.prisms}, xp ${s.xp}, runs ${s.runs}, rebirths ${s.rebirthCount}`),t("equipped",`${s.equipped.trail} / ${s.equipped.skin} / ${s.equipped.aura}`),t("settings",JSON.stringify(s.settings))}catch(s){t("save",`unreadable: ${s.message}`)}e.push(""),e.push("[network]");try{t("navigator.onLine",navigator.onLine),t("api base",n.api.base||"(none configured)"),t("api status",n.api.status);let s=navigator.connection;s&&t("connection",`${s.effectiveType||"?"} downlink ${s.downlink||"?"}Mb rtt ${s.rtt||"?"}ms${s.saveData?" save-data":""}`)}catch(s){t("network",`unavailable: ${s.message}`)}e.push(""),e.push("[audio]");try{t("started",n.audio.started),t("muted",n.audio.muted),t("volume",n.audio.volume)}catch(s){t("audio",`unavailable: ${s.message}`)}return e.join(`
`)}mn();var pf=[{id:"o_orbs",text:n=>`Collect ${n} orbs`,targets:[45,80,130],read:n=>n.orbs||0,droplets:n=>Math.round(n*.34)},{id:"o_rings",text:n=>`Pass ${n} rings`,targets:[6,11,17],read:n=>n.rings||0,droplets:n=>Math.round(n*2.24)},{id:"o_combo",text:n=>`Reach a \xD7${n} combo`,targets:[5,9,14],read:n=>n.bestCombo||1,droplets:n=>Math.round(n*6)},{id:"o_distance",text:n=>`Fly ${n.toLocaleString("en-US")} m`,targets:[1200,2400,4200],read:n=>Math.floor(n.distance||0),droplets:n=>Math.round(n*.0156)},{id:"o_clean",text:n=>`Fly ${n.toLocaleString("en-US")} m without a scratch`,targets:[500,950,1600],read:n=>Math.floor(Math.max(n.cleanDistance||0,n.bestCleanDistance||0)),droplets:n=>Math.round(n*.048)},{id:"o_checkpoints",text:n=>`Pass ${n} checkpoint${n>1?"s":""}`,targets:[2,4,6],read:n=>n.checkpoints||0,droplets:n=>Math.round(n*13.6)},{id:"o_score",text:n=>`Score ${n.toLocaleString("en-US")}`,targets:[7e3,18e3,38e3],read:n=>Math.floor(n.score||0),droplets:n=>Math.round(n*.0032)}],Vg=Object.fromEntries(pf.map(n=>[n.id,n])),pE=3,mE=95;function gE(n){let e=n?.bestDistance||0;return e>=4500?2:e>=2e3?1:0}function Wg(n,e){let t=new zi(Fs(`aerodrift-objectives-${n>>>0}`)),i=gE(e),s=[...pf],r=[];for(;r.length<Math.min(pE,pf.length)&&s.length;){let o=s.splice(t.int(0,s.length-1),1)[0],a=o.targets[Math.min(i,o.targets.length-1)];r.push({id:o.id,target:a,text:o.text(a),droplets:o.droplets(a),seasonXp:mE,done:!1})}return r}function xE(n,e){let t=Vg[n.id];return t?Math.min(n.target,t.read(e)):0}function qg(n,e){return n.target>0?xE(n,e)/n.target:0}function Xg(n){let e=n.objectives;if(!Array.isArray(e))return null;let t=null;for(let i of e){if(i.done)continue;let s=Vg[i.id];if(!s){i.done=!0;continue}s.read(n)>=i.target&&(i.done=!0,(t||(t=[])).push(i))}return t}function $g(n){return Array.isArray(n.objectives)?n.objectives.filter(e=>e.done).length:0}function Yg(n){if(!Array.isArray(n.objectives)||!n.objectives.length||!n.objectives.every(t=>t.done))return 0;let e=n.objectives.reduce((t,i)=>t+i.droplets,0);return Math.round(e*.5)}Pa();er();zt();var _E=25,Zg=1.2,vE=18,bE=10,ME=35,Jg=150,SE=20,tn={BOOT:"boot",HUB:"hub",PLAYING:"playing",PAUSED:"pause",RESULTS:"results"},EE={cloud:"a cloud bank",coral:"a coral cluster",leaf:"a canopy bough",pylon:"a circuit pylon",shard:"a drifting shard",crystal:"a crystal spire"};wE().catch(n=>{console.error("[aerodrift] fatal during boot",n),document.querySelectorAll(".screen").forEach(e=>e.classList.remove("is-active")),document.getElementById("screen-offline")?.classList.add("is-active")});async function wE(){let n=wd(),e=new URLSearchParams(location.search);e.has("showcase")&&(n.mode=e.get("mode")==="standard"?"standard":"drift",n.settings.quality="auto");let t=dd(),i=Bg(),s=n.settings.quality==="auto",r=s?fd():n.settings.quality;Ht[r]||(r="medium");let o=Ht[r],a=document.getElementById("gl"),l=Um(a,{pixelRatioCap:o.pixelRatio,antialias:o.msaa>0}),c=Bm(l,r);l.setBokehEnabled(o.bokeh),l.setExposure(n.settings.exposure);let u=Ld(l,{trailCount:Ht.high.trailCount,cheapGlass:o.cheapGlass}),d=n0(l,{capacityOrbs:320,cheapGlass:o.cheapGlass}),h=i0(l,{cloudDetail:o.cloudDetail,capacity:460}),g=u0(l,d,h,{chunksAhead:o.chunksAhead,moteCount:Ht.high.motes,veilCount:Ht.high.veils,weatherCount:Ht.high.weather,surfaceSegments:o.surfaceSegments}),v=f0(l,{cheapGlass:o.cheapGlass}),S=p0(),p=zg(l),f=Og(),b=g0(n.settings),_=tn.BOOT,m=0,E=ku(n,Bu(n)),x=w();function w(){return{seed:0,daily:!1,plan:xd(gd(n)),score:0,combo:1,bestCombo:1,checkpointMult:1,distance:0,droplets:0,prisms:0,orbs:0,rings:0,checkpoints:0,portals:0,hits:0,cleanDistance:0,bestCleanDistance:0,sincePickup:0,decayAcc:0,armorCooldown:0,revivesLeft:0,riding:!1,wasRiding:!1,worldAnnounced:-1,stratumAnnounced:"",time:0,fatal:!1,cause:""}}let y=kg({save:n,audio:b,api:i,onPlay:()=>B({daily:!1}),onDaily:()=>B({daily:!0}),onResume:()=>ae(),onEndRun:()=>W({fatal:!1}),onHome:()=>X(),onSettingsChange:(M,C)=>P(M,C),onEquip:()=>{V(),J()},onPersist:()=>J(),onRebirth:()=>F(),onResetProgress:()=>{Td(),location.reload()},onPhotoEnter:()=>A(),onPhotoExit:()=>U(),onPhotoSave:()=>{Y.capture=!0},onPhotoChange:M=>Object.assign(Y,M),onReportIssue:()=>T.open()}),T=Gg({probe:()=>window.__aerodrift.probe(),sceneCore:l,save:n,api:i,audio:b,writeProbe:()=>yu(n)});y.setTouch(t),y.syncSettingsUI(),V(),c.setBloomScale(n.settings.bloom),L(r,{silent:!0});let I=()=>{b.start().then(M=>{M&&(b.setVolume(n.settings.volume),b.setMuted(n.settings.muted))}),window.removeEventListener("pointerdown",I),window.removeEventListener("keydown",I),window.removeEventListener("touchstart",I)};window.addEventListener("pointerdown",I),window.addEventListener("keydown",I),window.addEventListener("touchstart",I),i.health();function P(M,C){switch(M){case"exposure":l.setExposure(C);break;case"bloom":c.setBloomScale(C);break;case"volume":b.setVolume(C);break;case"muted":b.setMuted(C);break;case"ghosts":p.setEnabled(C);break;case"displayName":break;case"quality":C==="auto"?($.setEnabled(!0),L(fd())):($.setEnabled(!1),L(C));break;default:break}J()}function L(M,{silent:C=!1}={}){if(!Ht[M])return;r=M;let k=Ht[M];c.setTier(M),g.setChunksAhead(k.chunksAhead),g.setParticleBudget(k.motes,k.veils,k.weather),z(k.cheapGlass),C||y.setQualityNote(n.settings.quality==="auto"?`Auto \u2014 currently ${k.label}.`:"Auto steps quality down if the framerate dips.")}function z(M){l.scene.traverse(C=>{let k=C.material;if(!k||!k.isMeshPhysicalMaterial||k.transmission===void 0)return;let ee=M?0:1;k.transmission!==ee&&(k.transmission=ee,k.opacity=M?.42:1,k.transparent=!0,k.needsUpdate=!0)})}let $=Om({threshold:44,onStepDown:M=>{let C=Md.indexOf(r);if(C<=0)return;let k=Md[C-1];console.info(`[aerodrift] ${M}fps \u2014 stepping quality down to ${k}`),L(k),y.setQualityNote(`Auto \u2014 stepped down to ${Ht[k].label} (${M}fps).`)}});$.setEnabled(s);function V(){u.setTrail(Mi(y.equipped("trail"),y.equipped("tint"))),u.setSkin(y.equipped("skin")),u.setAura(y.equipped("aura"))}function X(){_=tn.HUB,Object.assign(x,w()),g.reset(Hd(),x.plan),d.reset(),h.reset(),v.reset(),u.reset(),u.setEnabled(!1),p.clear(),f.stop(),b.setIntensity(1),y.refreshHub(),y.show("hub")}function B({daily:M=!1,seed:C=null}={}){let k=s0(new URLSearchParams(location.search).get("seed")),ee=M?r0():C??k??Hd();Object.assign(x,w()),x.seed=ee>>>0,x.daily=M,x.plan=xd(gd(n)),E=ku(n,Bu(n)),S.reset(E),x.revivesLeft=E.revives||0,x.objectives=Wg(x.seed,n),g.reset(x.seed,x.plan),d.reset(),h.reset(),v.reset(),u.reset(),V(),u.setEnabled(!0),$.reset(),f.start(),p.clear(),n.settings.ghosts!==!1&&Q(x.seed),_=tn.PLAYING,y.show("playing"),y.setPauseSeed(x.seed,x.daily),Le(0,!0)}async function Q(M){let C=await i.ghostForSeed(M);!C||x.seed!==M||_!==tn.PLAYING||p.load(C)&&console.info(`[aerodrift] racing ghost: ${C.name||"anonymous"}`)}function he(){_===tn.PLAYING&&(_=tn.PAUSED,u.setEnabled(!1),y.show("pause"))}function ae(){_===tn.PAUSED&&(Y.active&&U(),_=tn.PLAYING,u.setEnabled(!0),y.show("playing"))}function W({fatal:M=!1,cause:C=""}={}){if(_!==tn.PLAYING&&_!==tn.PAUSED)return;_=tn.RESULTS,u.setEnabled(!1),f.stop(),Y.active&&U(),b.setIntensity(1),x.fatal=M,x.cause=C,x.bestCleanDistance=Math.max(x.bestCleanDistance,x.cleanDistance);let k=n.stats;if(k.orbs+=x.orbs,k.rings+=x.rings,k.checkpoints+=x.checkpoints,k.portals+=x.portals,k.hits+=x.hits,x.hits===0&&x.distance>0&&(k.cleanRuns+=1),k.bestNoHitDistance=Math.max(k.bestNoHitDistance,Math.floor(x.bestCleanDistance)),x.daily){let Ue=gn();n.daily.key!==Ue&&(n.daily={key:Ue,score:0,distance:0,played:!1}),n.daily.played=!0,n.daily.score=Math.max(n.daily.score,Math.floor(x.score)),n.daily.distance=Math.max(n.daily.distance,Math.floor(x.distance))}E.dropletGain&&E.dropletGain!==1&&(x.droplets=Math.round(x.droplets*E.dropletGain)),F0(n,x),E.rewardScale&&E.rewardScale!==1&&(x.droplets=Math.round(x.droplets*E.rewardScale),x.score=Math.round(x.score*E.rewardScale));let ee=Yg(x);ee>0&&(x.droplets+=ee,x.objectiveBonus=ee);let xe=Math.round(x.distance/12+x.score/150)+(x.objectiveXp||0),pe=Ga(n,xe),se=Rd(n,x),ue=Pg(n,x,Gt);J();let Me=4,Re=ue.slice(0,Me).map(Ue=>`Milestone \u2014 ${Ue.name}`);if(ue.length>Me&&Re.push(`\u2026and ${ue.length-Me} more milestones`),ue.length){let Ue=ue.reduce((Ge,Je)=>Ge+Je.reward,0);Re.push(`+${Oe(Ue)} Droplets from milestones`)}let Ee=$g(x),ve=x.objectives?.length||0;ve&&Re.push(Ee===ve?`All ${ve} objectives cleared`:`${Ee} of ${ve} objectives cleared`),ee>0&&Re.push(`+${Oe(ee)} Droplets \u2014 clear bonus`),pe>0&&Re.push(pe===1?`Season tier ${ln(n).tier} reached`:`${pe} season tiers reached`),b.chime(),se.leveledUp&&setTimeout(()=>b.levelUp(),500),y.showResults({fatal:M,cause:C,score:x.score,distance:x.distance,bestCombo:x.bestCombo,worldsVisited:Math.floor(x.distance/At)+1,droplets:x.droplets,prisms:x.prisms,xp:se.xpGain,leveledUp:se.leveledUp,levelAfter:se.levelAfter,isNewBest:se.isNewBestScore,seed:x.seed,daily:x.daily,toasts:Re}),ne()}function ne(){!i.base||x.distance<200||i.submitRun({playerId:n.playerId,name:n.displayName||"",seed:x.seed,score:Math.floor(x.score),distance:Math.floor(x.distance),world:x.plan.worldAt(x.distance).key,daily:x.daily?gn():"",path:f.path})}function F(){if(!w0(n)){b.bump();return}E=ku(n,Bu(n)),J(),b.levelUp(),y.refreshHub(),y.shopUI.renderRebirth(),y.show("hub")}function J(){yu(n)}let Y={active:!1,capture:!1,orbit:0,height:4,zoom:14,exposure:1};function A(){_===tn.PAUSED&&(Y.active=!0,y.setPhotoMode(!0))}function U(){Y.active=!1,Y.capture=!1,y.setPhotoMode(!1),l.setExposure(n.settings.exposure),_===tn.PAUSED&&y.show("pause")}function O(){let M=u.state.pos,C=l.camera;C.position.set(M.x+Math.sin(Y.orbit)*Y.zoom,M.y+Y.height,M.z+Math.cos(Y.orbit)*Y.zoom),C.lookAt(M.x,M.y,M.z),l.setExposure(n.settings.exposure*Y.exposure)}function q(){Y.capture=!1;try{let M=l.renderer.domElement.toDataURL("image/png"),C=document.createElement("a");C.href=M,C.download=`aerodrift-${no(x.seed)}-${Math.floor(x.distance)}m.png`,document.body.appendChild(C),C.click(),C.remove(),n.stats.photos+=1,J(),b.ring()}catch(M){console.warn("[aerodrift] photo capture failed",M)}}window.addEventListener("keydown",M=>{M.key==="Escape"&&(Y.active?U():_===tn.PLAYING?he():_===tn.PAUSED?ae():y.current!=="hub"&&y.current!=="results"&&y.closeModal()),(M.key==="p"||M.key==="P")&&_===tn.PAUSED&&(Y.active?U():A())}),y.el.pauseBtn?.addEventListener("click",()=>he());let H=y.el.boostPad;if(H){let M=k=>{k.preventDefault(),u.boostHeld=!0},C=()=>{u.boostHeld=!1};H.addEventListener("pointerdown",M),H.addEventListener("pointerup",C),H.addEventListener("pointercancel",C),H.addEventListener("pointerleave",C)}document.addEventListener("visibilitychange",()=>{document.hidden?(_===tn.PLAYING&&he(),b.suspend()):b.resume()});let te=0;function K(){cancelAnimationFrame(te),te=requestAnimationFrame(()=>{l.resize(),c.setSize(window.innerWidth,window.innerHeight),u.onResize(),d.onResize(),g.onResize(),v.onResize()})}window.addEventListener("resize",K),window.addEventListener("orientationchange",K);let de=new N;function be(M,C,k){return de.set(M,C,k).project(l.camera),de.z>1?null:{x:(de.x*.5+.5)*window.innerWidth,y:(-de.y*.5+.5)*window.innerHeight}}function oe(){return x.combo*x.checkpointMult*(x.riding?E.streamMultiplier:1)*E.scoreMultiplier}function me(){x.combo=Math.min(_E,x.combo+1),x.bestCombo=Math.max(x.bestCombo,x.combo),b.setIntensity(x.combo)}function we(){x.combo=1,x.decayAcc=0,x.sincePickup=0,b.setIntensity(1)}function Se(M){for(let C of M)switch(C.type){case"orb":{let ee=(C.big?ME:bE)*(C.big?E.bigOrbValue:E.orbValue)*oe();if(x.score+=ee,x.orbs++,x.sincePickup=0,x.decayAcc=0,_u(n,0),x.droplets+=C.big?Bi.orbBig:Bi.orb,u.addBoost(C.boost*E.boostRefill),b.collect(x.combo,C.big),C.big){let xe=be(C.x,C.y,C.z);xe&&y.popup(`+${Oe(ee)}`,xe.x,xe.y)}break}case"ring":{x.score+=Jg*E.ringValue*x.checkpointMult*E.scoreMultiplier,x.rings++,x.droplets+=Bi.ring,x.sincePickup=0,x.decayAcc=0,me(),u.addBoost(C.boost*E.boostRefill),b.ring(),y.flash(.5);let k=be(C.x,C.y,C.z);k&&y.popup(`+${Oe(Jg)}  \xD7${x.combo}`,k.x,k.y,"ring");break}case"ringMiss":we();break;case"stream":x.riding=!0;break;default:break}}function ge(M){for(let C of M)if(C.type==="checkpoint"){if(!C.through&&E.checkpointsMatter!==!1){x.checkpoints++,we(),x.bestCleanDistance=Math.max(x.bestCleanDistance,x.cleanDistance),x.cleanDistance=0;let pe=E.invulnerable?{fatal:!1}:S.hit();if(b.bump(),y.flash(.5),u.shake(.5),y.showToast("Missed the gate"),pe.fatal){W({fatal:!0,cause:"You flew past a checkpoint with no integrity left."});return}continue}x.checkpoints++;let k={minor:Bi.checkpointMinor,major:Bi.checkpointMajor,epic:Bi.checkpointEpic}[C.tier],ee=Math.round(k*E.checkpointBonus);x.droplets+=ee,C.tier==="major"?(x.checkpointMult+=1,y.showToast(`Checkpoint  \xD7${x.checkpointMult}`)):C.tier==="epic"&&(y.showToast(C.label),Math.random()<Sd&&(x.prisms+=1,Ad(n,1))),C.shake&&u.shake(C.shake),C.tier!=="minor"&&y.flash(C.tier==="epic"?1:.6),b.checkpoint(C.tier);let xe=be(C.x,C.y,C.z);xe&&y.popup(`+${Oe(ee)}`,xe.x,xe.y,C.tier==="minor"?"":"ring")}else C.type==="portal"&&(x.portals++,C.through&&(x.droplets+=Math.round(Bi.portal*E.checkpointBonus),x.score+=400*x.checkpointMult*E.scoreMultiplier),Fd(n,C.nextWorld.key)&&J(),u.shake(.3),y.flash(.55),b.portal(),Le(C.worldIndex+1,!0),y.showToast(C.through?"Portal \u2014 clean pass":"Portal"))}function Ae(M){if(x.sincePickup+=M,x.combo>1&&x.sincePickup>E.comboGrace){for(x.decayAcc+=M;x.decayAcc>=Zg&&x.combo>1;)x.decayAcc-=Zg,x.combo--;b.setIntensity(x.combo)}}function Le(M,C=!1){if(!C&&M===x.worldAnnounced)return;x.worldAnnounced=M;let k=x.plan.worldAt(M*At);y.showBiome(k.world.name),x.stratumAnnounced=k.world.strata[0].name}let Ke=new Zs;Ke.connect(document);let G=new N,Ze=!1;function Ne(M){m+=M;let C=_===tn.PLAYING,k=_===tn.HUB||_===tn.RESULTS;if(!C&&!k)return;G.copy(u.state.pos),k&&(u.state.target.x=Math.sin(m*.31)*17,u.state.target.y=2+Math.sin(m*.22+1.1)*6.5),u.state.riding=x.riding;let ee=u.state.distance,xe=rs[E.modeId]?.speed??1;u.update(M,m,{...E,speedScale:(E.speedScale??1)/xe*J0(E.modeId,ee),exposed:C&&S.exposed,shakeScale:n.settings?.shakeIntensity??1}),x.riding=!1;let pe=u.state.distance;C&&(x.distance=pe,x.time+=M,x.cleanDistance+=u.state.speed*M);let se=g.update(M,m,u.state.pos,pe);l.applyPalette(se.palette,1-Math.exp(-6*M));let ue=d.update(M,m,u,G,E),Me=h.update(M,m,u,G),Re=E.spawnObstacles===!1?null:Me,Ee=v.update(M,m,u,G,pe,x.plan,se.palette);if(!C)return;if(Se(ue),ge(Ee),Re&&u.knock(1)){if(x.hits++,x.bestCleanDistance=Math.max(x.bestCleanDistance,x.cleanDistance),x.cleanDistance=0,E.comboArmor>0&&x.armorCooldown<=0?(x.armorCooldown=SE,y.showToast("Temper held your combo")):we(),(E.invulnerable?{fatal:!1,pips:S.state.pips,wasExposed:!1}:S.hit()).fatal)if(x.revivesLeft>0)x.revivesLeft--,S.reset(E),b.shieldRegen(),y.flash(1),y.showToast(x.revivesLeft?`Bastion revived you \u2014 ${x.revivesLeft} left`:"Bastion revived you \u2014 last one");else{b.bump(),W({fatal:!0,cause:`You flew into ${EE[Re.style]||"an obstacle"} with no integrity left.`});return}b.bump(),b.shieldBreak(),y.flash(.5)}S.update(M)&&b.shieldRegen(),x.armorCooldown>0&&(x.armorCooldown-=M),x.riding&&!x.wasRiding&&b.stream(),x.wasRiding=x.riding,x.riding&&(x.score+=vE*oe()*M,x.droplets+=Bi.streamPerSecond*M,x.sincePickup=0),Ae(M),u.state.boosting&&!Ze&&(b.boost(),y.flash(1)),Ze=u.state.boosting,f.update(M,u.state.pos),p.update(M,x.time),y.setGhost(p.active?p.leadOver(u.state.pos.z):null);let ve=x.plan.stratumAt(pe);ve.name!==x.stratumAnnounced&&(x.stratumAnnounced=ve.name,y.showBiome(ve.name),y.flash(.4));let Ue=Xg(x);if(Ue)for(let Je of Ue)x.droplets+=Je.droplets,x.objectiveXp=(x.objectiveXp||0)+Je.seasonXp,y.showToast(`${Je.text} \u2713  +${Oe(Je.droplets)}`),b.chime?.()??b.ring(),y.flash(.45);let Ge=pe%At;y.setHud({score:x.score,combo:x.combo,runMult:x.checkpointMult-1,distance:x.distance,droplets:Math.floor(x.droplets),worldProgress:Ge/At,toPortal:At-Ge,boost:u.state.boost,boosting:u.state.boosting,pips:S.state.pips,maxPips:S.state.max,regen:S.regenFraction,exposed:S.exposed,objectives:x.objectives,objectiveProgress:x.objectives?.map(Je=>qg(Je,x))}),$.update(M)}function D(){requestAnimationFrame(D),Ke.update();let M=Ke.getDelta(),C=Math.min(M,.05);T.noteFrame(M),Ne(C),l.update(C,m),Y.active&&O(),c.render(),Y.capture&&q()}window.__AERODRIFT_BOOTED=!0,X(),requestAnimationFrame(D),window.__aerodrift={probe:()=>({state:_,tier:r,seed:x.seed,seedText:no(x.seed),score:Math.floor(x.score),combo:x.combo,checkpointMult:x.checkpointMult,distance:Math.floor(x.distance),speed:Math.round(u.state.speed),boost:Number(u.state.boost.toFixed(2)),pips:S.state.pips,maxPips:S.state.max,exposed:S.exposed,hits:x.hits,chunks:g.chunkCount,orbs:d.orbCount,rings:d.rings.length,streams:d.streams.length,obstacles:h.count,gates:v.count,world:x.plan.worldAt(x.distance).key,condition:g.condition?.key||null,signature:x.plan.signatureAt(x.distance),weather:g.weatherKind,surface:Number(x.plan.surfaceAmountAt(x.distance).toFixed(3)),screen:y.current,droplets:n.droplets,prisms:n.prisms,xp:n.xp,best:n.bestScore,lifetime:n.lifetimeDistance,worlds:n.worldsUnlocked.slice(),net:i.status}),startRun:B,pauseRun:he,resumeRun:ae,endRun:W,goHub:X,doRebirth:F,setTier:L,step:(M=1/60,C=1)=>{for(let k=0;k<C;k++)Ne(M)},player:u,world:g,collect:d,obstacles:h,gates:v,shield:S,sceneCore:l,fx:c,save:n,audio:b,ui:y,api:i,economy:Gt,WORLDS:li},ym(window.__aerodrift)}
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
