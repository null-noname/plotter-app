(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var jd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},nI=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Xp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,u=l?n[i+2]:0,d=s>>2,p=(s&3)<<4|c>>4;let g=(c&15)<<2|u>>6,I=u&63;l||(I=64,o||(g=64)),r.push(t[d],t[p],t[g],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Yp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):nI(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||u==null||p==null)throw new rI;const g=s<<2|c>>4;if(r.push(g),u!==64){const I=c<<4&240|u>>2;if(r.push(I),p!==64){const S=u<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const iI=function(n){const e=Yp(n);return Xp.encodeByteArray(e,!0)},ma=function(n){return iI(n).replace(/\./g,"")},Zp=function(n){try{return Xp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function ga(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!sI(t)||(n[t]=ga(n[t],e[t]));return n}function sI(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI=()=>em().__FIREBASE_DEFAULTS__,aI=()=>{if(typeof process>"u"||typeof jd>"u")return;const n=jd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},cI=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Zp(n[1]);return e&&JSON.parse(e)},su=()=>{try{return oI()||aI()||cI()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},tm=()=>{var n;return(n=su())===null||n===void 0?void 0:n.config},lI=n=>{var e;return(e=su())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ma(JSON.stringify(t)),ma(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function hI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function ou(){var n;const e=(n=su())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dI(){return typeof window<"u"||rm()}function rm(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function fI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function im(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function au(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function sm(){const n=me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function om(){return!ou()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ps(){try{return typeof indexedDB=="object"}catch{return!1}}function pI(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI="FirebaseError";class Je extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=mI,Object.setPrototypeOf(this,Je.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,br.prototype.create)}}class br{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?gI(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Je(i,c,r)}}function gI(n,e){return n.replace(_I,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const _I=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function yI(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ks(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Gd(s)&&Gd(o)){if(!ks(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Gd(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Jr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function ls(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function am(n,e){const t=new vI(n,e);return t.subscribe.bind(t)}class vI{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");II(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Jc),i.error===void 0&&(i.error=Jc),i.complete===void 0&&(i.complete=Jc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function II(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Jc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(n){return n&&n._delegate?n._delegate:n}class Et{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new uI;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(TI(e))try{this.getOrInitializeService({instanceIdentifier:Qn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Qn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qn){return this.instances.has(e)}getOptions(e=Qn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:EI(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Qn){return this.component?this.component.multipleInstances?e:Qn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function EI(n){return n===Qn?void 0:n}function TI(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new wI(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=[];var J;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(J||(J={}));const lm={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},bI=J.INFO,AI={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},RI=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=AI[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ba{constructor(e){this.name=e,this._logLevel=bI,this._logHandler=RI,this._userLogHandler=null,cu.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?lm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}}function SI(n){cu.forEach(e=>{e.setLogLevel(n)})}function PI(n,e){for(const t of cu){let r=null;e&&e.level&&(r=lm[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(i,s,...o)=>{const c=o.map(l=>{if(l==null)return null;if(typeof l=="string")return l;if(typeof l=="number"||typeof l=="boolean")return l.toString();if(l instanceof Error)return l.message;try{return JSON.stringify(l)}catch{return null}}).filter(l=>l).join(" ");s>=(r??i.logLevel)&&n({level:J[s].toLowerCase(),message:c,args:o,type:i.name})}}}const kI=(n,e)=>e.some(t=>n instanceof t);let Kd,Hd;function CI(){return Kd||(Kd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xI(){return Hd||(Hd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const um=new WeakMap,ml=new WeakMap,hm=new WeakMap,Yc=new WeakMap,lu=new WeakMap;function DI(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(An(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&um.set(t,n)}).catch(()=>{}),lu.set(e,n),e}function NI(n){if(ml.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});ml.set(n,e)}let gl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ml.get(n);if(e==="objectStoreNames")return n.objectStoreNames||hm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return An(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function VI(n){gl=n(gl)}function OI(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Xc(this),e,...t);return hm.set(r,e.sort?e.sort():[e]),An(r)}:xI().includes(n)?function(...e){return n.apply(Xc(this),e),An(um.get(this))}:function(...e){return An(n.apply(Xc(this),e))}}function LI(n){return typeof n=="function"?OI(n):(n instanceof IDBTransaction&&NI(n),kI(n,CI())?new Proxy(n,gl):n)}function An(n){if(n instanceof IDBRequest)return DI(n);if(Yc.has(n))return Yc.get(n);const e=LI(n);return e!==n&&(Yc.set(n,e),lu.set(e,n)),e}const Xc=n=>lu.get(n);function MI(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=An(o);return r&&o.addEventListener("upgradeneeded",l=>{r(An(o.result),l.oldVersion,l.newVersion,An(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const FI=["get","getKey","getAll","getAllKeys","count"],UI=["put","add","delete","clear"],Zc=new Map;function Qd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Zc.get(e))return Zc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=UI.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||FI.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),i&&l.done]))[0]};return Zc.set(e,s),s}VI(n=>({...n,get:(e,t,r)=>Qd(e,t)||n.get(e,t,r),has:(e,t)=>!!Qd(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(qI(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function qI(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const _a="@firebase/app",_l="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new Ba("@firebase/app"),$I="@firebase/app-compat",zI="@firebase/analytics-compat",jI="@firebase/analytics",WI="@firebase/app-check-compat",GI="@firebase/app-check",KI="@firebase/auth",HI="@firebase/auth-compat",QI="@firebase/database",JI="@firebase/data-connect",YI="@firebase/database-compat",XI="@firebase/functions",ZI="@firebase/functions-compat",ew="@firebase/installations",tw="@firebase/installations-compat",nw="@firebase/messaging",rw="@firebase/messaging-compat",iw="@firebase/performance",sw="@firebase/performance-compat",ow="@firebase/remote-config",aw="@firebase/remote-config-compat",cw="@firebase/storage",lw="@firebase/storage-compat",uw="@firebase/firestore",hw="@firebase/vertexai-preview",dw="@firebase/firestore-compat",fw="firebase",pw="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn="[DEFAULT]",mw={[_a]:"fire-core",[$I]:"fire-core-compat",[jI]:"fire-analytics",[zI]:"fire-analytics-compat",[GI]:"fire-app-check",[WI]:"fire-app-check-compat",[KI]:"fire-auth",[HI]:"fire-auth-compat",[QI]:"fire-rtdb",[JI]:"fire-data-connect",[YI]:"fire-rtdb-compat",[XI]:"fire-fn",[ZI]:"fire-fn-compat",[ew]:"fire-iid",[tw]:"fire-iid-compat",[nw]:"fire-fcm",[rw]:"fire-fcm-compat",[iw]:"fire-perf",[sw]:"fire-perf-compat",[ow]:"fire-rc",[aw]:"fire-rc-compat",[cw]:"fire-gcs",[lw]:"fire-gcs-compat",[uw]:"fire-fst",[dw]:"fire-fst-compat",[hw]:"fire-vertex","fire-js":"fire-js",[fw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=new Map,si=new Map,oi=new Map;function Cs(n,e){try{n.container.addComponent(e)}catch(t){Zt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function dm(n,e){n.container.addOrOverwriteComponent(e)}function en(n){const e=n.name;if(oi.has(e))return Zt.debug(`There were multiple attempts to register component ${e}.`),!1;oi.set(e,n);for(const t of Pn.values())Cs(t,n);for(const t of si.values())Cs(t,n);return!0}function fm(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function gw(n,e,t=Sn){fm(n,e).clearInstance(t)}function pm(n){return n.options!==void 0}function ve(n){return n.settings!==void 0}function _w(){oi.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},wt=new br("app","Firebase",yw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mm=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Et("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw wt.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw extends mm{constructor(e,t,r,i){const s=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!1,o={name:r,automaticDataCollectionEnabled:s};if(e.apiKey!==void 0)super(e,o,i);else{const c=e;super(c.options,o,i)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:s},t),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,pt(_a,_l,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){hu(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw wt.create("server-app-deleted")}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn=pw;function uu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Sn,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw wt.create("bad-app-name",{appName:String(i)});if(t||(t=tm()),!t)throw wt.create("no-options");const s=Pn.get(i);if(s){if(ks(t,s.options)&&ks(r,s.config))return s;throw wt.create("duplicate-app",{appName:i})}const o=new cm(i);for(const l of oi.values())o.addComponent(l);const c=new mm(t,r,o);return Pn.set(i,c),c}function Iw(n,e){if(dI()&&!rm())throw wt.create("invalid-server-app-environment");e.automaticDataCollectionEnabled===void 0&&(e.automaticDataCollectionEnabled=!1);let t;pm(n)?t=n.options:t=n;const r=Object.assign(Object.assign({},e),t);r.releaseOnDeref!==void 0&&delete r.releaseOnDeref;const i=u=>[...u].reduce((d,p)=>Math.imul(31,d)+p.charCodeAt(0)|0,0);if(e.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw wt.create("finalization-registry-not-supported",{});const s=""+i(JSON.stringify(r)),o=si.get(s);if(o)return o.incRefCount(e.releaseOnDeref),o;const c=new cm(s);for(const u of oi.values())c.addComponent(u);const l=new vw(t,e,s,c);return si.set(s,l),l}function ww(n=Sn){const e=Pn.get(n);if(!e&&n===Sn&&tm())return uu();if(!e)throw wt.create("no-app",{appName:n});return e}function Ew(){return Array.from(Pn.values())}async function hu(n){let e=!1;const t=n.name;Pn.has(t)?(e=!0,Pn.delete(t)):si.has(t)&&n.decRefCount()<=0&&(si.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(r=>r.delete())),n.isDeleted=!0)}function pt(n,e,t){var r;let i=(r=mw[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Zt.warn(c.join(" "));return}en(new Et(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function gm(n,e){if(n!==null&&typeof n!="function")throw wt.create("invalid-log-argument");PI(n,e)}function _m(n){SI(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tw="firebase-heartbeat-database",bw=1,xs="firebase-heartbeat-store";let el=null;function ym(){return el||(el=MI(Tw,bw,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xs)}catch(t){console.warn(t)}}}}).catch(n=>{throw wt.create("idb-open",{originalErrorMessage:n.message})})),el}async function Aw(n){try{const t=(await ym()).transaction(xs),r=await t.objectStore(xs).get(vm(n));return await t.done,r}catch(e){if(e instanceof Je)Zt.warn(e.message);else{const t=wt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Zt.warn(t.message)}}}async function Jd(n,e){try{const r=(await ym()).transaction(xs,"readwrite");await r.objectStore(xs).put(e,vm(n)),await r.done}catch(t){if(t instanceof Je)Zt.warn(t.message);else{const r=wt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Zt.warn(r.message)}}}function vm(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rw=1024,Sw=30*24*60*60*1e3;class Pw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Cw(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Yd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=Sw}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Zt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Yd(),{heartbeatsToSend:r,unsentEntries:i}=kw(this._heartbeatsCache.heartbeats),s=ma(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Zt.warn(t),""}}}function Yd(){return new Date().toISOString().substring(0,10)}function kw(n,e=Rw){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Xd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Xd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Cw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ps()?pI().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Aw(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Jd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Jd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Xd(n){return ma(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xw(n){en(new Et("platform-logger",e=>new BI(e),"PRIVATE")),en(new Et("heartbeat",e=>new Pw(e),"PRIVATE")),pt(_a,_l,n),pt(_a,_l,"esm2017"),pt("fire-js","")}xw("");const Dw=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:Je,SDK_VERSION:sn,_DEFAULT_ENTRY_NAME:Sn,_addComponent:Cs,_addOrOverwriteComponent:dm,_apps:Pn,_clearComponents:_w,_components:oi,_getProvider:fm,_isFirebaseApp:pm,_isFirebaseServerApp:ve,_registerComponent:en,_removeServiceInstance:gw,_serverApps:si,deleteApp:hu,getApp:ww,getApps:Ew,initializeApp:uu,initializeServerApp:Iw,onLog:gm,registerVersion:pt,setLogLevel:_m},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e,t){this._delegate=e,this.firebase=t,Cs(e,new Et("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),hu(this._delegate)))}_getService(e,t=Sn){var r;this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&((r=i.getComponent())===null||r===void 0?void 0:r.instantiationMode)==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:t})}_removeServiceInstance(e,t=Sn){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){Cs(this._delegate,e)}_addOrOverwriteComponent(e){dm(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},Zd=new br("app-compat","Firebase",Vw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ow(n){const e={},t={__esModule:!0,initializeApp:s,app:i,registerVersion:pt,setLogLevel:_m,onLog:gm,apps:null,SDK_VERSION:sn,INTERNAL:{registerComponent:c,removeApp:r,useAsService:l,modularAPIs:Dw}};t.default=t,Object.defineProperty(t,"apps",{get:o});function r(u){delete e[u]}function i(u){if(u=u||Sn,!Wd(e,u))throw Zd.create("no-app",{appName:u});return e[u]}i.App=n;function s(u,d={}){const p=uu(u,d);if(Wd(e,p.name))return e[p.name];const g=new n(p,t);return e[p.name]=g,g}function o(){return Object.keys(e).map(u=>e[u])}function c(u){const d=u.name,p=d.replace("-compat","");if(en(u)&&u.type==="PUBLIC"){const g=(I=i())=>{if(typeof I[p]!="function")throw Zd.create("invalid-app-argument",{appName:d});return I[p]()};u.serviceProps!==void 0&&ga(g,u.serviceProps),t[p]=g,n.prototype[p]=function(...I){return this._getService.bind(this,d).apply(this,u.multipleInstances?I:[])}}return u.type==="PUBLIC"?t[p]:null}function l(u,d){return d==="serverAuth"?null:d}return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Im(){const n=Ow(Nw);n.INTERNAL=Object.assign(Object.assign({},n.INTERNAL),{createFirebaseNamespace:Im,extendNamespace:e,createSubscribe:am,ErrorFactory:br,deepExtend:ga});function e(t){ga(n,t)}return n}const Lw=Im();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=new Ba("@firebase/app-compat"),Mw="@firebase/app-compat",Fw="0.2.43";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uw(n){pt(Mw,Fw,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */try{const n=em();if(n.firebase!==void 0){ef.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=n.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&ef.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const mt=Lw;Uw();var Bw="firebase",qw="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mt.registerVersion(Bw,qw,"app-compat");function du(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}const es={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},Ur={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $w(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}}function wm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zw=$w,jw=wm,Em=new br("auth","Firebase",wm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=new Ba("@firebase/auth");function Ww(n,...e){ya.logLevel<=J.WARN&&ya.warn(`Auth (${sn}): ${n}`,...e)}function ta(n,...e){ya.logLevel<=J.ERROR&&ya.error(`Auth (${sn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(n,...e){throw pu(n,...e)}function Ce(n,...e){return pu(n,...e)}function fu(n,e,t){const r=Object.assign(Object.assign({},jw()),{[e]:t});return new br("auth","Firebase",r).create(e,{appName:n.name})}function Me(n){return fu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ti(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&$e(n,"argument-error"),fu(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function pu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Em.create(n,...e)}function V(n,e,...t){if(!n)throw pu(e,...t)}function Dt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ta(e),new Error(e)}function St(n,e){n||Dt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function mu(){return tf()==="http:"||tf()==="https:"}function tf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(mu()||im()||"connection"in navigator)?navigator.onLine:!0}function Kw(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t){this.shortDelay=e,this.longDelay=t,St(t>e,"Short delay should be less than long delay!"),this.isMobile=hI()||au()}get(){return Gw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n,e){St(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Dt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Dt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Dt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qw=new Xs(3e4,6e4);function Te(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function be(n,e,t,r,i={}){return bm(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=Ei(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const u=Object.assign({method:e,headers:l},s);return fI()||(u.referrerPolicy="no-referrer"),Tm.fetch()(Am(n,n.config.apiHost,t,c),u)})}async function bm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Hw),e);try{const i=new Yw(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw us(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw us(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw us(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw us(n,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw fu(n,d,u);$e(n,d)}}catch(i){if(i instanceof Je)throw i;$e(n,"network-request-failed",{message:String(i)})}}async function on(n,e,t,r,i={}){const s=await be(n,e,t,r,i);return"mfaPendingCredential"in s&&$e(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Am(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?gu(n.config,i):`${n.config.apiScheme}://${i}`}function Jw(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Yw{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ce(this.auth,"network-request-failed")),Qw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function us(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Ce(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(n){return n!==void 0&&n.getResponse!==void 0}function rf(n){return n!==void 0&&n.enterprise!==void 0}class Xw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Jw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zw(n){return(await be(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function eE(n,e){return be(n,"GET","/v2/recaptchaConfig",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tE(n,e){return be(n,"POST","/v1/accounts:delete",e)}async function nE(n,e){return be(n,"POST","/v1/accounts:update",e)}async function Rm(n,e){return be(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rE(n,e=!1){const t=$(n),r=await t.getIdToken(e),i=qa(r);V(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:gs(tl(i.auth_time)),issuedAtTime:gs(tl(i.iat)),expirationTime:gs(tl(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function tl(n){return Number(n)*1e3}function qa(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ta("JWT malformed, contained fewer than 3 sections"),null;try{const i=Zp(t);return i?JSON.parse(i):(ta("Failed to decode base64 JWT payload"),null)}catch(i){return ta("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function sf(n){const e=qa(n);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Je&&iE(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function iE({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=gs(this.lastLoginAt),this.creationTime=gs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ns(n){var e;const t=n.auth,r=await n.getIdToken(),i=await tn(n,Rm(t,{idToken:r}));V(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Sm(s.providerUserInfo):[],c=aE(n.providerData,o),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),d=l?u:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new yl(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function oE(n){const e=$(n);await Ns(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function aE(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Sm(n){return n.map(e=>{var{providerId:t}=e,r=du(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cE(n,e){const t=await bm(n,{},async()=>{const r=Ei({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Am(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Tm.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lE(n,e){return be(n,"POST","/v2/accounts:revokeToken",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):sf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){V(e.length!==0,"internal-error");const t=sf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(V(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await cE(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Yr;return r&&(V(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(V(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(V(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yr,this.toJSON())}_performRefresh(){return Dt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(n,e){V(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Gt{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=du(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new sE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new yl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await tn(this,this.stsTokenManager.getToken(this.auth,e));return V(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rE(this,e)}reload(){return oE(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Gt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ns(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ve(this.auth.app))return Promise.reject(Me(this.auth));const e=await this.getIdToken();return await tn(this,tE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,l,u,d;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(i=t.email)!==null&&i!==void 0?i:void 0,I=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,S=(o=t.photoURL)!==null&&o!==void 0?o:void 0,x=(c=t.tenantId)!==null&&c!==void 0?c:void 0,C=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,U=(u=t.createdAt)!==null&&u!==void 0?u:void 0,z=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:F,emailVerified:W,isAnonymous:Q,providerData:G,stsTokenManager:w}=t;V(F&&w,e,"internal-error");const _=Yr.fromJSON(this.name,w);V(typeof F=="string",e,"internal-error"),gn(p,e.name),gn(g,e.name),V(typeof W=="boolean",e,"internal-error"),V(typeof Q=="boolean",e,"internal-error"),gn(I,e.name),gn(S,e.name),gn(x,e.name),gn(C,e.name),gn(U,e.name),gn(z,e.name);const v=new Gt({uid:F,auth:e,email:g,emailVerified:W,displayName:p,isAnonymous:Q,photoURL:S,phoneNumber:I,tenantId:x,stsTokenManager:_,createdAt:U,lastLoginAt:z});return G&&Array.isArray(G)&&(v.providerData=G.map(E=>Object.assign({},E))),C&&(v._redirectEventId=C),v}static async _fromIdTokenResponse(e,t,r=!1){const i=new Yr;i.updateFromServerResponse(t);const s=new Gt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ns(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];V(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Sm(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Yr;c.updateFromIdToken(r);const l=new Gt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new yl(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of=new Map;function ft(n){St(n instanceof Function,"Expected a class definition");let e=of.get(n);return e?(St(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,of.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Pm.type="NONE";const ai=Pm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(n,e,t){return`firebase:${n}:${e}:${t}`}class Xr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=sr(this.userKey,i.apiKey,s),this.fullPersistenceKey=sr("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Gt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Xr(ft(ai),e,r);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||ft(ai);const o=sr(r,e.config.apiKey,e.name);let c=null;for(const u of t)try{const d=await u._get(o);if(d){const p=Gt._fromJSON(e,d);u!==s&&(c=p),s=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Xr(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Xr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Dm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(km(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nm(e))return"Blackberry";if(Vm(e))return"Webos";if(Cm(e))return"Safari";if((e.includes("chrome/")||xm(e))&&!e.includes("edge/"))return"Chrome";if(Zs(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function km(n=me()){return/firefox\//i.test(n)}function Cm(n=me()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xm(n=me()){return/crios\//i.test(n)}function Dm(n=me()){return/iemobile/i.test(n)}function Zs(n=me()){return/android/i.test(n)}function Nm(n=me()){return/blackberry/i.test(n)}function Vm(n=me()){return/webos/i.test(n)}function eo(n=me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function uE(n=me()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(n)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(n)}function hE(n=me()){var e;return eo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function dE(){return sm()&&document.documentMode===10}function Om(n=me()){return eo(n)||Zs(n)||Vm(n)||Nm(n)||/windows phone/i.test(n)||Dm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lm(n,e=[]){let t;switch(n){case"Browser":t=af(me());break;case"Worker":t=`${af(me())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${sn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pE(n,e={}){return be(n,"GET","/v2/passwordPolicy",Te(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mE=6;class gE{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:mE,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cf(this),this.idTokenSubscription=new cf(this),this.beforeStateQueue=new fE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Em,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ft(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Xr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Rm(this,{idToken:e}),r=await Gt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ve(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ns(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Kw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ve(this.app))return Promise.reject(Me(this));const t=e?$(e):null;return t&&V(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ve(this.app)?Promise.reject(Me(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ve(this.app)?Promise.reject(Me(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ft(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pE(this),t=new gE(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new br("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await lE(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ft(e)||this._popupRedirectResolver;V(t,this,"argument-error"),this.redirectPersistenceManager=await Xr.create(this,[ft(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(V(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Lm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Ww(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ie(n){return $(n)}class cf{constructor(e){this.auth=e,this.observer=null,this.addObserver=am(t=>this.observer=t)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let to={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yE(n){to=n}function _u(n){return to.loadJS(n)}function vE(){return to.recaptchaV2Script}function IE(){return to.recaptchaEnterpriseScript}function wE(){return to.gapiScript}function Mm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const EE="recaptcha-enterprise",TE="NO_RECAPTCHA";class bE{constructor(e){this.type=EE,this.auth=Ie(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{eE(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const u=new Xw(l);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(l=>{c(l)})})}function i(s,o,c){const l=window.grecaptcha;rf(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(TE)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&rf(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=IE();l.length!==0&&(l+=c),_u(l).then(()=>{i(c,s,o)}).catch(u=>{o(u)})}}).catch(c=>{o(c)})})}}async function lf(n,e,t,r=!1){const i=new bE(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Vs(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await lf(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await lf(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}function AE(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ft);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function RE(n,e,t){const r=Ie(n);V(r._canInitEmulator,r,"emulator-config-failed"),V(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=Fm(e),{host:o,port:c}=SE(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||PE()}function Fm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function SE(n){const e=Fm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:uf(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:uf(o)}}}function uf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function PE(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Dt("not implemented")}_getIdTokenResponse(e){return Dt("not implemented")}_linkToIdToken(e,t){return Dt("not implemented")}_getReauthenticationResolver(e){return Dt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Um(n,e){return be(n,"POST","/v1/accounts:resetPassword",Te(n,e))}async function kE(n,e){return be(n,"POST","/v1/accounts:update",e)}async function CE(n,e){return be(n,"POST","/v1/accounts:signUp",e)}async function xE(n,e){return be(n,"POST","/v1/accounts:update",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DE(n,e){return on(n,"POST","/v1/accounts:signInWithPassword",Te(n,e))}async function $a(n,e){return be(n,"POST","/v1/accounts:sendOobCode",Te(n,e))}async function NE(n,e){return $a(n,e)}async function VE(n,e){return $a(n,e)}async function OE(n,e){return $a(n,e)}async function LE(n,e){return $a(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ME(n,e){return on(n,"POST","/v1/accounts:signInWithEmailLink",Te(n,e))}async function FE(n,e){return on(n,"POST","/v1/accounts:signInWithEmailLink",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends bi{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Os(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Os(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Vs(e,t,"signInWithPassword",DE);case"emailLink":return ME(e,{email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Vs(e,r,"signUpPassword",CE);case"emailLink":return FE(e,{idToken:t,email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yt(n,e){return on(n,"POST","/v1/accounts:signInWithIdp",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UE="http://localhost";class Ft extends bi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ft(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=du(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Ft(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Yt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yt(e,t)}buildRequest(){const e={requestUri:UE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ei(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BE(n,e){return be(n,"POST","/v1/accounts:sendVerificationCode",Te(n,e))}async function qE(n,e){return on(n,"POST","/v1/accounts:signInWithPhoneNumber",Te(n,e))}async function $E(n,e){const t=await on(n,"POST","/v1/accounts:signInWithPhoneNumber",Te(n,e));if(t.temporaryProof)throw us(n,"account-exists-with-different-credential",t);return t}const zE={USER_NOT_FOUND:"user-not-found"};async function jE(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return on(n,"POST","/v1/accounts:signInWithPhoneNumber",Te(n,t),zE)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends bi{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new or({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new or({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return qE(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return $E(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return jE(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new or({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WE(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function GE(n){const e=Jr(ls(n)).link,t=e?Jr(ls(e)).deep_link_id:null,r=Jr(ls(n)).deep_link_id;return(r?Jr(ls(r)).link:null)||r||t||e||n}class za{constructor(e){var t,r,i,s,o,c;const l=Jr(ls(e)),u=(t=l.apiKey)!==null&&t!==void 0?t:null,d=(r=l.oobCode)!==null&&r!==void 0?r:null,p=WE((i=l.mode)!==null&&i!==void 0?i:null);V(u&&d&&p,"argument-error"),this.apiKey=u,this.operation=p,this.code=d,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=GE(e);try{return new za(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.providerId=Fn.PROVIDER_ID}static credential(e,t){return Os._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=za.parseLink(t);return V(r,"argument-error"),Os._fromEmailAndCode(e,r.code,r.tenantId)}}Fn.PROVIDER_ID="password";Fn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Fn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends an{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Zr extends Ai{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return V("providerId"in t&&"signInMethod"in t,"argument-error"),Ft._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return V(e.idToken||e.accessToken,"argument-error"),Ft._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Zr.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Zr.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:c}=e;if(!r&&!i&&!t&&!s||!c)return null;try{return new Zr(c)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends Ai{constructor(){super("facebook.com")}static credential(e){return Ft._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pt.credential(e.oauthAccessToken)}catch{return null}}}Pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Ai{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ft._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Rt.credential(t,r)}catch{return null}}}Rt.GOOGLE_SIGN_IN_METHOD="google.com";Rt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends Ai{constructor(){super("github.com")}static credential(e){return Ft._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kt.credential(e.oauthAccessToken)}catch{return null}}}kt.GITHUB_SIGN_IN_METHOD="github.com";kt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE="http://localhost";class ci extends bi{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return Yt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yt(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new ci(r,s)}static _create(e,t){return new ci(e,t)}buildRequest(){return{requestUri:KE,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HE="saml.";class va extends an{constructor(e){V(e.startsWith(HE),"argument-error"),super(e)}static credentialFromResult(e){return va.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return va.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=ci.fromJSON(e);return V(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return ci._create(r,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends Ai{constructor(){super("twitter.com")}static credential(e,t){return Ft._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ct.credential(t,r)}catch{return null}}}Ct.TWITTER_SIGN_IN_METHOD="twitter.com";Ct.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bm(n,e){return on(n,"POST","/v1/accounts:signUp",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Gt._fromIdTokenResponse(e,r,i),o=hf(r);return new Tt({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=hf(r);return new Tt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function hf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QE(n){var e;if(ve(n.app))return Promise.reject(Me(n));const t=Ie(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Tt({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Bm(t,{returnSecureToken:!0}),i=await Tt._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia extends Je{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ia.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Ia(e,t,r,i)}}function qm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ia._fromErrorAndOperation(n,s,e,r):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JE(n,e){const t=$(n);await ja(!0,t,e);const{providerUserInfo:r}=await nE(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=$m(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function yu(n,e,t=!1){const r=await tn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Tt._forOperation(n,"link",r)}async function ja(n,e,t){await Ns(e);const r=$m(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";V(r.has(t)===n,e.auth,i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zm(n,e,t=!1){const{auth:r}=n;if(ve(r.app))return Promise.reject(Me(r));const i="reauthenticate";try{const s=await tn(n,qm(r,i,e,n),t);V(s.idToken,r,"internal-error");const o=qa(s.idToken);V(o,r,"internal-error");const{sub:c}=o;return V(n.uid===c,r,"user-mismatch"),Tt._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&$e(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jm(n,e,t=!1){if(ve(n.app))return Promise.reject(Me(n));const r="signIn",i=await qm(n,r,e),s=await Tt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Wa(n,e){return jm(Ie(n),e)}async function Wm(n,e){const t=$(n);return await ja(!1,t,e.providerId),yu(t,e)}async function Gm(n,e){return zm($(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YE(n,e){return on(n,"POST","/v1/accounts:signInWithCustomToken",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XE(n,e){if(ve(n.app))return Promise.reject(Me(n));const t=Ie(n),r=await YE(t,{token:e,returnSecureToken:!0}),i=await Tt._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?vu._fromServerResponse(e,t):"totpInfo"in t?Iu._fromServerResponse(e,t):$e(e,"internal-error")}}class vu extends no{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new vu(t)}}class Iu extends no{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Iu(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n,e,t){var r;V(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),V(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(V(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(V(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wu(n){const e=Ie(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function ZE(n,e,t){const r=Ie(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Ga(r,i,t),await Vs(r,i,"getOobCode",VE)}async function eT(n,e,t){await Um($(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&wu(n),r})}async function tT(n,e){await xE($(n),{oobCode:e})}async function Km(n,e){const t=$(n),r=await Um(t,{oobCode:e}),i=r.requestType;switch(V(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":V(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":V(r.mfaInfo,t,"internal-error");default:V(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=no._fromServerResponse(Ie(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function nT(n,e){const{data:t}=await Km($(n),e);return t.email}async function rT(n,e,t){if(ve(n.app))return Promise.reject(Me(n));const r=Ie(n),o=await Vs(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Bm).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&wu(n),l}),c=await Tt._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function iT(n,e,t){return ve(n.app)?Promise.reject(Me(n)):Wa($(n),Fn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&wu(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sT(n,e,t){const r=Ie(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,c){V(c.handleCodeInApp,r,"argument-error"),c&&Ga(r,o,c)}s(i,t),await Vs(r,i,"getOobCode",OE)}function oT(n,e){const t=za.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function aT(n,e,t){if(ve(n.app))return Promise.reject(Me(n));const r=$(n),i=Fn.credentialWithLink(e,t||Ds());return V(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Wa(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cT(n,e){return be(n,"POST","/v1/accounts:createAuthUri",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lT(n,e){const t=mu()?Ds():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await cT($(n),r);return i||[]}async function uT(n,e){const t=$(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Ga(t.auth,i,e);const{email:s}=await NE(t.auth,i);s!==n.email&&await n.reload()}async function hT(n,e,t){const r=$(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Ga(r.auth,s,t);const{email:o}=await LE(r.auth,s);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dT(n,e){return be(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fT(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=$(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await tn(r,dT(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function pT(n,e){const t=$(n);return ve(t.auth.app)?Promise.reject(Me(t.auth)):Hm(t,e,null)}function mT(n,e){return Hm($(n),null,e)}async function Hm(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await tn(n,kE(r,s));await n._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gT(n){var e,t;if(!n)return null;const{providerId:r}=n,i=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},s=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(n!=null&&n.idToken)){const o=(t=(e=qa(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const c=o!=="anonymous"&&o!=="custom"?o:null;return new ei(s,c)}}if(!r)return null;switch(r){case"facebook.com":return new _T(s,i);case"github.com":return new yT(s,i);case"google.com":return new vT(s,i);case"twitter.com":return new IT(s,i,n.screenName||null);case"custom":case"anonymous":return new ei(s,null);default:return new ei(s,r,i)}}class ei{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class Qm extends ei{constructor(e,t,r,i){super(e,t,r),this.username=i}}class _T extends ei{constructor(e,t){super(e,"facebook.com",t)}}class yT extends Qm{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class vT extends ei{constructor(e,t){super(e,"google.com",t)}}class IT extends Qm{constructor(e,t,r){super(e,"twitter.com",t,r)}}function wT(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:gT(t)}function ET(n,e,t,r){return $(n).onAuthStateChanged(e,t,r)}function TT(n){return $(n).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new nr("enroll",e,t)}static _fromMfaPendingCredential(e){return new nr("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,r;if(e!=null&&e.multiFactorSession){if(!((t=e.multiFactorSession)===null||t===void 0)&&t.pendingCredential)return nr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return nr._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=Ie(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(c=>no._fromServerResponse(r,c));V(i.mfaPendingCredential,r,"internal-error");const o=nr._fromMfaPendingCredential(i.mfaPendingCredential);return new Eu(o,s,async c=>{const l=await c._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const u=Object.assign(Object.assign({},i),{idToken:l.idToken,refreshToken:l.refreshToken});switch(t.operationType){case"signIn":const d=await Tt._fromIdTokenResponse(r,t.operationType,u);return await r._updateCurrentUser(d.user),d;case"reauthenticate":return V(t.user,r,"internal-error"),Tt._forOperation(t.user,t.operationType,u);default:$e(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function bT(n,e){var t;const r=$(n),i=e;return V(e.customData.operationType,r,"argument-error"),V((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,r,"argument-error"),Eu._fromError(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:start",Te(n,e))}function RT(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:finalize",Te(n,e))}function ST(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:withdraw",Te(n,e))}class Tu{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>no._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Tu(e)}async getSession(){return nr._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await tn(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await tn(this.user,ST(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const nl=new WeakMap;function PT(n){const e=$(n);return nl.has(e)||nl.set(e,Tu._fromUser(e)),nl.get(e)}const wa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(wa,"1"),this.storage.removeItem(wa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=1e3,CT=10;class Ym extends Jm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Om(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);dE()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,CT):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},kT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ym.type="LOCAL";const bu=Ym;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm extends Jm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xm.type="SESSION";const ur=Xm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Ka(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async u=>u(t.origin,s)),l=await xT(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ka.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const u=ro("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const g=p;if(g.data.eventId===u)switch(g.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(g.data.response);break;default:clearTimeout(d),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(){return window}function NT(n){ke().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(){return typeof ke().WorkerGlobalScope<"u"&&typeof ke().importScripts=="function"}async function VT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function OT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function LT(){return Au()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm="firebaseLocalStorageDb",MT=1,Ea="firebaseLocalStorage",eg="fbase_key";class io{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ha(n,e){return n.transaction([Ea],e?"readwrite":"readonly").objectStore(Ea)}function FT(){const n=indexedDB.deleteDatabase(Zm);return new io(n).toPromise()}function vl(){const n=indexedDB.open(Zm,MT);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ea,{keyPath:eg})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ea)?e(r):(r.close(),await FT(),e(await vl()))})})}async function df(n,e,t){const r=Ha(n,!0).put({[eg]:e,value:t});return new io(r).toPromise()}async function UT(n,e){const t=Ha(n,!1).get(e),r=await new io(t).toPromise();return r===void 0?null:r.value}function ff(n,e){const t=Ha(n,!0).delete(e);return new io(t).toPromise()}const BT=800,qT=3;class tg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>qT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Au()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ka._getInstance(LT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await VT(),!this.activeServiceWorker)return;this.sender=new DT(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||OT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await vl();return await df(e,wa,"1"),await ff(e,wa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>df(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>UT(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ff(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Ha(i,!1).getAll();return new io(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),BT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tg.type="LOCAL";const Ls=tg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:start",Te(n,e))}function zT(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:finalize",Te(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jT=500,WT=6e4,Bo=1e12;class GT{constructor(e){this.auth=e,this.counter=Bo,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new KT(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||Bo;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||Bo;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||Bo;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class KT{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;V(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=HT(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},WT)},jT))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function HT(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=Mm("rcb"),QT=new Xs(3e4,6e4);class JT{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=ke().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return V(YT(t),e,"argument-error"),this.shouldResolveImmediately(t)&&nf(ke().grecaptcha)?Promise.resolve(ke().grecaptcha):new Promise((r,i)=>{const s=ke().setTimeout(()=>{i(Ce(e,"network-request-failed"))},QT.get());ke()[rl]=()=>{ke().clearTimeout(s),delete ke()[rl];const c=ke().grecaptcha;if(!c||!nf(c)){i(Ce(e,"internal-error"));return}const l=c.render;c.render=(u,d)=>{const p=l(u,d);return this.counter++,p},this.hostLanguage=t,r(c)};const o=`${vE()}?${Ei({onload:rl,render:"explicit",hl:t})}`;_u(o).catch(()=>{clearTimeout(s),i(Ce(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=ke().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function YT(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class XT{async load(e){return new GT(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng="recaptcha",ZT={theme:"light",type:"image"};let eb=class{constructor(e,t,r=Object.assign({},ZT)){this.parameters=r,this.type=ng,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Ie(e),this.isInvisible=this.parameters.size==="invisible",V(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;V(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new XT:new JT,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){V(!this.parameters.sitekey,this.auth,"argument-error"),V(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),V(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=ke()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){V(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){V(mu()&&!Au(),this.auth,"internal-error"),await tb(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Zw(this.auth);V(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return V(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function tb(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=or._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function nb(n,e,t){if(ve(n.app))return Promise.reject(Me(n));const r=Ie(n),i=await Qa(r,e,$(t));return new Ru(i,s=>Wa(r,s))}async function rb(n,e,t){const r=$(n);await ja(!1,r,"phone");const i=await Qa(r.auth,e,$(t));return new Ru(i,s=>Wm(r,s))}async function ib(n,e,t){const r=$(n);if(ve(r.auth.app))return Promise.reject(Me(r.auth));const i=await Qa(r.auth,e,$(t));return new Ru(i,s=>Gm(r,s))}async function Qa(n,e,t){var r;const i=await t.verify();try{V(typeof i=="string",n,"argument-error"),V(t.type===ng,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return V(o.type==="enroll",n,"internal-error"),(await AT(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{V(o.type==="signin",n,"internal-error");const c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return V(c,n,"missing-multi-factor-info"),(await $T(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await BE(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}async function sb(n,e){const t=$(n);if(ve(t.auth.app))return Promise.reject(Me(t.auth));await yu(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hr=class na{constructor(e){this.providerId=na.PROVIDER_ID,this.auth=Ie(e)}verifyPhoneNumber(e,t){return Qa(this.auth,e,$(t))}static credential(e,t){return or._fromVerification(e,t)}static credentialFromResult(e){const t=e;return na.credentialFromTaggedObject(t)}static credentialFromError(e){return na.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?or._fromTokenResponse(t,r):null}};hr.PROVIDER_ID="phone";hr.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(n,e){return e?ft(e):(V(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su extends bi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ob(n){return jm(n.auth,new Su(n),n.bypassAuthState)}function ab(n){const{auth:e,user:t}=n;return V(t,e,"internal-error"),zm(t,new Su(n),n.bypassAuthState)}async function cb(n){const{auth:e,user:t}=n;return V(t,e,"internal-error"),yu(t,new Su(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ob;case"linkViaPopup":case"linkViaRedirect":return cb;case"reauthViaPopup":case"reauthViaRedirect":return ab;default:$e(this.auth,"internal-error")}}resolve(e){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lb=new Xs(2e3,1e4);async function ig(n,e,t){if(ve(n.app))return Promise.reject(Ce(n,"operation-not-supported-in-this-environment"));const r=Ie(n);Ti(n,e,an);const i=Ar(r,t);return new Kt(r,"signInViaPopup",e,i).executeNotNull()}async function ub(n,e,t){const r=$(n);if(ve(r.auth.app))return Promise.reject(Ce(r.auth,"operation-not-supported-in-this-environment"));Ti(r.auth,e,an);const i=Ar(r.auth,t);return new Kt(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function hb(n,e,t){const r=$(n);Ti(r.auth,e,an);const i=Ar(r.auth,t);return new Kt(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class Kt extends rg{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Kt.currentPopupAction&&Kt.currentPopupAction.cancel(),Kt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){St(this.filter.length===1,"Popup operations only handle one event");const e=ro();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ce(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ce(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ce(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lb.get())};e()}}Kt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const db="pendingRedirect",_s=new Map;class fb extends rg{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=_s.get(this.auth._key());if(!e){try{const r=await pb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}_s.set(this.auth._key(),e)}return this.bypassAuthState||_s.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pb(n,e){const t=og(e),r=sg(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function Pu(n,e){return sg(n)._set(og(e),"true")}function mb(){_s.clear()}function ku(n,e){_s.set(n._key(),e)}function sg(n){return ft(n._redirectPersistence)}function og(n){return sr(db,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gb(n,e,t){return _b(n,e,t)}async function _b(n,e,t){if(ve(n.app))return Promise.reject(Me(n));const r=Ie(n);Ti(n,e,an),await r._initializationPromise;const i=Ar(r,t);return await Pu(i,r),i._openRedirect(r,e,"signInViaRedirect")}function yb(n,e,t){return vb(n,e,t)}async function vb(n,e,t){const r=$(n);if(Ti(r.auth,e,an),ve(r.auth.app))return Promise.reject(Me(r.auth));await r.auth._initializationPromise;const i=Ar(r.auth,t);await Pu(i,r.auth);const s=await ag(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function Ib(n,e,t){return wb(n,e,t)}async function wb(n,e,t){const r=$(n);Ti(r.auth,e,an),await r.auth._initializationPromise;const i=Ar(r.auth,t);await ja(!1,r,e.providerId),await Pu(i,r.auth);const s=await ag(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function Eb(n,e){return await Ie(n)._initializationPromise,Ja(n,e,!1)}async function Ja(n,e,t=!1){if(ve(n.app))return Promise.reject(Me(n));const r=Ie(n),i=Ar(r,e),o=await new fb(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function ag(n){const e=ro(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb=10*60*1e3;class cg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!lg(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ce(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Tb&&this.cachedEventUids.clear(),this.cachedEventUids.has(pf(e))}saveEventToCache(e){this.cachedEventUids.add(pf(e)),this.lastProcessedEventTime=Date.now()}}function pf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function lg({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function bb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return lg(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ug(n,e={}){return be(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ab=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Rb=/^https?/;async function Sb(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ug(n);for(const t of e)try{if(Pb(t))return}catch{}$e(n,"unauthorized-domain")}function Pb(n){const e=Ds(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Rb.test(t))return!1;if(Ab.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kb=new Xs(3e4,6e4);function mf(){const n=ke().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Cb(n){return new Promise((e,t)=>{var r,i,s;function o(){mf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{mf(),t(Ce(n,"network-request-failed"))},timeout:kb.get()})}if(!((i=(r=ke().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ke().gapi)===null||s===void 0)&&s.load)o();else{const c=Mm("iframefcb");return ke()[c]=()=>{gapi.load?o():t(Ce(n,"network-request-failed"))},_u(`${wE()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw ra=null,e})}let ra=null;function xb(n){return ra=ra||Cb(n),ra}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Db=new Xs(5e3,15e3),Nb="__/auth/iframe",Vb="emulator/auth/iframe",Ob={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Lb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Mb(n){const e=n.config;V(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?gu(e,Vb):`https://${n.config.authDomain}/${Nb}`,r={apiKey:e.apiKey,appName:n.name,v:sn},i=Lb.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ei(r).slice(1)}`}async function Fb(n){const e=await xb(n),t=ke().gapi;return V(t,n,"internal-error"),e.open({where:document.body,url:Mb(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ob,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Ce(n,"network-request-failed"),c=ke().setTimeout(()=>{s(o)},Db.get());function l(){ke().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ub={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bb=500,qb=600,$b="_blank",zb="http://localhost";class gf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function jb(n,e,t,r=Bb,i=qb){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Ub),{width:r.toString(),height:i.toString(),top:s,left:o}),u=me().toLowerCase();t&&(c=xm(u)?$b:t),km(u)&&(e=e||zb,l.scrollbars="yes");const d=Object.entries(l).reduce((g,[I,S])=>`${g}${I}=${S},`,"");if(hE(u)&&c!=="_self")return Wb(e||"",c),new gf(null);const p=window.open(e||"",c,d);V(p,n,"popup-blocked");try{p.focus()}catch{}return new gf(p)}function Wb(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb="__/auth/handler",Kb="emulator/auth/handler",Hb=encodeURIComponent("fac");async function Il(n,e,t,r,i,s){V(n.config.authDomain,n,"auth-domain-config-required"),V(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:sn,eventId:i};if(e instanceof an){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",yI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(s||{}))o[d]=p}if(e instanceof Ai){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const l=await n._getAppCheckToken(),u=l?`#${Hb}=${encodeURIComponent(l)}`:"";return`${Qb(n)}?${Ei(c).slice(1)}${u}`}function Qb({config:n}){return n.emulator?gu(n,Kb):`https://${n.authDomain}/${Gb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="webStorageSupport";class Jb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ur,this._completeRedirectFn=Ja,this._overrideRedirectResult=ku}async _openPopup(e,t,r,i){var s;St((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Il(e,t,r,Ds(),i);return jb(e,o,ro())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Il(e,t,r,Ds(),i);return NT(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(St(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Fb(e),r=new cg(e);return t.register("authEvent",i=>(V(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(il,{type:il},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[il];o!==void 0&&t(!!o),$e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Sb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Om()||Cm()||eo()}}const Yb=Jb;class Xb{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Dt("unexpected MultiFactorSessionType")}}}class Cu extends Xb{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Cu(e)}_finalizeEnroll(e,t,r){return RT(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return zT(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class hg{constructor(){}static assertion(e){return Cu._fromCredential(e)}}hg.FACTOR_ID="phone";var _f="@firebase/auth",yf="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tA(n){en(new Et("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;V(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Lm(n)},u=new _E(r,i,s,l);return AE(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),en(new Et("auth-internal",e=>{const t=Ie(e.getProvider("auth").getImmediate());return(r=>new Zb(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(_f,yf,eA(n)),pt(_f,yf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nA=5*60;lI("authIdTokenMaxAge");function rA(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}yE({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Ce("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",rA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tA("Browser");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(){return window}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iA=2e3;async function sA(n,e,t){var r;const{BuildInfo:i}=dr();St(e.sessionId,"AuthEvent did not contain a session ID");const s=await uA(e.sessionId),o={};return eo()?o.ibi=i.packageName:Zs()?o.apn=i.packageName:$e(n,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=s,Il(n,t,e.type,void 0,(r=e.eventId)!==null&&r!==void 0?r:void 0,o)}async function oA(n){const{BuildInfo:e}=dr(),t={};eo()?t.iosBundleId=e.packageName:Zs()?t.androidPackageName=e.packageName:$e(n,"operation-not-supported-in-this-environment"),await ug(n,t)}function aA(n){const{cordova:e}=dr();return new Promise(t=>{e.plugins.browsertab.isAvailable(r=>{let i=null;r?e.plugins.browsertab.openUrl(n):i=e.InAppBrowser.open(n,uE()?"_blank":"_system","location=yes"),t(i)})})}async function cA(n,e,t){const{cordova:r}=dr();let i=()=>{};try{await new Promise((s,o)=>{let c=null;function l(){var p;s();const g=(p=r.plugins.browsertab)===null||p===void 0?void 0:p.close;typeof g=="function"&&g(),typeof(t==null?void 0:t.close)=="function"&&t.close()}function u(){c||(c=window.setTimeout(()=>{o(Ce(n,"redirect-cancelled-by-user"))},iA))}function d(){(document==null?void 0:document.visibilityState)==="visible"&&u()}e.addPassiveListener(l),document.addEventListener("resume",u,!1),Zs()&&document.addEventListener("visibilitychange",d,!1),i=()=>{e.removePassiveListener(l),document.removeEventListener("resume",u,!1),document.removeEventListener("visibilitychange",d,!1),c&&window.clearTimeout(c)}})}finally{i()}}function lA(n){var e,t,r,i,s,o,c,l,u,d;const p=dr();V(typeof((e=p==null?void 0:p.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),V(typeof((t=p==null?void 0:p.BuildInfo)===null||t===void 0?void 0:t.packageName)<"u",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),V(typeof((s=(i=(r=p==null?void 0:p.cordova)===null||r===void 0?void 0:r.plugins)===null||i===void 0?void 0:i.browsertab)===null||s===void 0?void 0:s.openUrl)=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),V(typeof((l=(c=(o=p==null?void 0:p.cordova)===null||o===void 0?void 0:o.plugins)===null||c===void 0?void 0:c.browsertab)===null||l===void 0?void 0:l.isAvailable)=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),V(typeof((d=(u=p==null?void 0:p.cordova)===null||u===void 0?void 0:u.InAppBrowser)===null||d===void 0?void 0:d.open)=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function uA(n){const e=hA(n),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(i=>i.toString(16).padStart(2,"0")).join("")}function hA(n){if(St(/[0-9a-zA-Z]+/.test(n),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(n);const e=new ArrayBuffer(n.length),t=new Uint8Array(e);for(let r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dA=20;class fA extends cg{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInitialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInitialized(),this.passiveListeners.forEach(t=>t(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function pA(n,e,t=null){return{type:e,eventId:t,urlResponse:null,sessionId:_A(),postBody:null,tenantId:n.tenantId,error:Ce(n,"no-auth-event")}}function mA(n,e){return wl()._set(El(n),e)}async function vf(n){const e=await wl()._get(El(n));return e&&await wl()._remove(El(n)),e}function gA(n,e){var t,r;const i=vA(e);if(i.includes("/__/auth/callback")){const s=ia(i),o=s.firebaseError?yA(decodeURIComponent(s.firebaseError)):null,c=(r=(t=o==null?void 0:o.code)===null||t===void 0?void 0:t.split("auth/"))===null||r===void 0?void 0:r[1],l=c?Ce(c):null;return l?{type:n.type,eventId:n.eventId,tenantId:n.tenantId,error:l,urlResponse:null,sessionId:null,postBody:null}:{type:n.type,eventId:n.eventId,tenantId:n.tenantId,sessionId:n.sessionId,urlResponse:i,postBody:null}}return null}function _A(){const n=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let t=0;t<dA;t++){const r=Math.floor(Math.random()*e.length);n.push(e.charAt(r))}return n.join("")}function wl(){return ft(bu)}function El(n){return sr("authEvent",n.config.apiKey,n.name)}function yA(n){try{return JSON.parse(n)}catch{return null}}function vA(n){const e=ia(n),t=e.link?decodeURIComponent(e.link):void 0,r=ia(t).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return ia(i).link||i||r||t||n}function ia(n){if(!(n!=null&&n.includes("?")))return{};const[e,...t]=n.split("?");return Jr(t.join("?"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IA=500;class wA{constructor(){this._redirectPersistence=ur,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=Ja,this._overrideRedirectResult=ku}async _initialize(e){const t=e._key();let r=this.eventManagers.get(t);return r||(r=new fA(e),this.eventManagers.set(t,r),this.attachCallbackListeners(e,r)),r}_openPopup(e){$e(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,t,r,i){lA(e);const s=await this._initialize(e);await s.initialized(),s.resetRedirect(),mb(),await this._originValidation(e);const o=pA(e,r,i);await mA(e,o);const c=await sA(e,o,t),l=await aA(c);return cA(e,s,l)}_isIframeWebStorageSupported(e,t){throw new Error("Method not implemented.")}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=oA(e)),this.originValidationPromises[t]}attachCallbackListeners(e,t){const{universalLinks:r,handleOpenURL:i,BuildInfo:s}=dr(),o=setTimeout(async()=>{await vf(e),t.onEvent(If())},IA),c=async d=>{clearTimeout(o);const p=await vf(e);let g=null;p&&(d!=null&&d.url)&&(g=gA(p,d.url)),t.onEvent(g||If())};typeof r<"u"&&typeof r.subscribe=="function"&&r.subscribe(null,c);const l=i,u=`${s.packageName.toLowerCase()}://`;dr().handleOpenURL=async d=>{if(d.toLowerCase().startsWith(u)&&c({url:d}),typeof l=="function")try{l(d)}catch(p){console.error(p)}}}}const EA=wA;function If(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Ce("no-auth-event")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TA(n,e){Ie(n)._logFramework(e)}var bA="@firebase/auth-compat",AA="0.5.14";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA=1e3;function ys(){var n;return((n=self==null?void 0:self.location)===null||n===void 0?void 0:n.protocol)||null}function SA(){return ys()==="http:"||ys()==="https:"}function dg(n=me()){return!!((ys()==="file:"||ys()==="ionic:"||ys()==="capacitor:")&&n.toLowerCase().match(/iphone|ipad|ipod|android/))}function PA(){return au()||ou()}function kA(){return sm()&&(document==null?void 0:document.documentMode)===11}function CA(n=me()){return/Edge\/\d+/.test(n)}function xA(n=me()){return kA()||CA(n)}function fg(){try{const n=self.localStorage,e=ro();if(n)return n.setItem(e,"1"),n.removeItem(e),xA()?Ps():!0}catch{return xu()&&Ps()}return!1}function xu(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function sl(){return(SA()||im()||dg())&&!PA()&&fg()&&!xu()}function pg(){return dg()&&typeof document<"u"}async function DA(){return pg()?new Promise(n=>{const e=setTimeout(()=>{n(!1)},RA);document.addEventListener("deviceready",()=>{clearTimeout(e),n(!0)})}):!1}function NA(){return typeof window<"u"?window:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt={LOCAL:"local",NONE:"none",SESSION:"session"},ts=V,mg="persistence";function VA(n,e){if(ts(Object.values(dt).includes(e),n,"invalid-persistence-type"),au()){ts(e!==dt.SESSION,n,"unsupported-persistence-type");return}if(ou()){ts(e===dt.NONE,n,"unsupported-persistence-type");return}if(xu()){ts(e===dt.NONE||e===dt.LOCAL&&Ps(),n,"unsupported-persistence-type");return}ts(e===dt.NONE||fg(),n,"unsupported-persistence-type")}async function Tl(n){await n._initializationPromise;const e=gg(),t=sr(mg,n.config.apiKey,n.name);e&&e.setItem(t,n._getPersistence())}function OA(n,e){const t=gg();if(!t)return[];const r=sr(mg,n,e);switch(t.getItem(r)){case dt.NONE:return[ai];case dt.LOCAL:return[Ls,ur];case dt.SESSION:return[ur];default:return[]}}function gg(){var n;try{return((n=NA())===null||n===void 0?void 0:n.sessionStorage)||null}catch{return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA=V;class En{constructor(){this.browserResolver=ft(Yb),this.cordovaResolver=ft(EA),this.underlyingResolver=null,this._redirectPersistence=ur,this._completeRedirectFn=Ja,this._overrideRedirectResult=ku}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,r,i)}async _openRedirect(e,t,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,r,i)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return pg()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return LA(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await DA();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _g(n){return n.unwrap()}function MA(n){return n.wrapped()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FA(n){return yg(n)}function UA(n,e){var t;const r=(t=e.customData)===null||t===void 0?void 0:t._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const i=e;i.resolver=new BA(n,bT(n,e))}else if(r){const i=yg(e),s=e;i&&(s.credential=i,s.tenantId=r.tenantId||void 0,s.email=r.email||void 0,s.phoneNumber=r.phoneNumber||void 0)}}function yg(n){const{_tokenResponse:e}=n instanceof Je?n.customData:n;if(!e)return null;if(!(n instanceof Je)&&"temporaryProof"in e&&"phoneNumber"in e)return hr.credentialFromResult(n);const t=e.providerId;if(!t||t===es.PASSWORD)return null;let r;switch(t){case es.GOOGLE:r=Rt;break;case es.FACEBOOK:r=Pt;break;case es.GITHUB:r=kt;break;case es.TWITTER:r=Ct;break;default:const{oauthIdToken:i,oauthAccessToken:s,oauthTokenSecret:o,pendingToken:c,nonce:l}=e;return!s&&!o&&!i&&!c?null:c?t.startsWith("saml.")?ci._create(t,c):Ft._fromParams({providerId:t,signInMethod:t,pendingToken:c,idToken:i,accessToken:s}):new Zr(t).credential({idToken:i,accessToken:s,rawNonce:l})}return n instanceof Je?r.credentialFromError(n):r.credentialFromResult(n)}function ot(n,e){return e.catch(t=>{throw t instanceof Je&&UA(n,t),t}).then(t=>{const r=t.operationType,i=t.user;return{operationType:r,credential:FA(t),additionalUserInfo:wT(t),user:Ya.getOrCreate(i)}})}async function bl(n,e){const t=await e;return{verificationId:t.verificationId,confirm:r=>ot(n,t.confirm(r))}}class BA{constructor(e,t){this.resolver=t,this.auth=MA(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return ot(_g(this.auth),this.resolver.resolveSignIn(e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ya=class hs{constructor(e){this._delegate=e,this.multiFactor=PT(e)}static getOrCreate(e){return hs.USER_MAP.has(e)||hs.USER_MAP.set(e,new hs(e)),hs.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return ot(this.auth,Wm(this._delegate,e))}async linkWithPhoneNumber(e,t){return bl(this.auth,rb(this._delegate,e,t))}async linkWithPopup(e){return ot(this.auth,hb(this._delegate,e,En))}async linkWithRedirect(e){return await Tl(Ie(this.auth)),Ib(this._delegate,e,En)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return ot(this.auth,Gm(this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return bl(this.auth,ib(this._delegate,e,t))}reauthenticateWithPopup(e){return ot(this.auth,ub(this._delegate,e,En))}async reauthenticateWithRedirect(e){return await Tl(Ie(this.auth)),yb(this._delegate,e,En)}sendEmailVerification(e){return uT(this._delegate,e)}async unlink(e){return await JE(this._delegate,e),this}updateEmail(e){return pT(this._delegate,e)}updatePassword(e){return mT(this._delegate,e)}updatePhoneNumber(e){return sb(this._delegate,e)}updateProfile(e){return fT(this._delegate,e)}verifyBeforeUpdateEmail(e,t){return hT(this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}};Ya.USER_MAP=new WeakMap;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ns=V;class Al{constructor(e,t){if(this.app=e,t.isInitialized()){this._delegate=t.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:r}=e.options;ns(r,"invalid-api-key",{appName:e.name}),ns(r,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?En:void 0;this._delegate=t.initialize({options:{persistence:qA(r,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(zw),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?Ya.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){RE(this._delegate,e,t)}applyActionCode(e){return tT(this._delegate,e)}checkActionCode(e){return Km(this._delegate,e)}confirmPasswordReset(e,t){return eT(this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return ot(this._delegate,rT(this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return lT(this._delegate,e)}isSignInWithEmailLink(e){return oT(this._delegate,e)}async getRedirectResult(){ns(sl(),this._delegate,"operation-not-supported-in-this-environment");const e=await Eb(this._delegate,En);return e?ot(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){TA(this._delegate,e)}onAuthStateChanged(e,t,r){const{next:i,error:s,complete:o}=wf(e,t,r);return this._delegate.onAuthStateChanged(i,s,o)}onIdTokenChanged(e,t,r){const{next:i,error:s,complete:o}=wf(e,t,r);return this._delegate.onIdTokenChanged(i,s,o)}sendSignInLinkToEmail(e,t){return sT(this._delegate,e,t)}sendPasswordResetEmail(e,t){return ZE(this._delegate,e,t||void 0)}async setPersistence(e){VA(this._delegate,e);let t;switch(e){case dt.SESSION:t=ur;break;case dt.LOCAL:t=await ft(Ls)._isAvailable()?Ls:bu;break;case dt.NONE:t=ai;break;default:return $e("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return ot(this._delegate,QE(this._delegate))}signInWithCredential(e){return ot(this._delegate,Wa(this._delegate,e))}signInWithCustomToken(e){return ot(this._delegate,XE(this._delegate,e))}signInWithEmailAndPassword(e,t){return ot(this._delegate,iT(this._delegate,e,t))}signInWithEmailLink(e,t){return ot(this._delegate,aT(this._delegate,e,t))}signInWithPhoneNumber(e,t){return bl(this._delegate,nb(this._delegate,e,t))}async signInWithPopup(e){return ns(sl(),this._delegate,"operation-not-supported-in-this-environment"),ot(this._delegate,ig(this._delegate,e,En))}async signInWithRedirect(e){return ns(sl(),this._delegate,"operation-not-supported-in-this-environment"),await Tl(this._delegate),gb(this._delegate,e,En)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return nT(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}Al.Persistence=dt;function wf(n,e,t){let r=n;typeof n!="function"&&({next:r,error:e,complete:t}=n);const i=r;return{next:o=>i(o&&Ya.getOrCreate(o)),error:e,complete:t}}function qA(n,e){const t=OA(n,e);if(typeof self<"u"&&!t.includes(Ls)&&t.push(Ls),typeof window<"u")for(const r of[bu,ur])t.includes(r)||t.push(r);return t.includes(ai)||t.push(ai),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(){this.providerId="phone",this._delegate=new hr(_g(mt.auth()))}static credential(e,t){return hr.credential(e,t)}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}Du.PHONE_SIGN_IN_METHOD=hr.PHONE_SIGN_IN_METHOD;Du.PROVIDER_ID=hr.PROVIDER_ID;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $A=V;class zA{constructor(e,t,r=mt.app()){var i;$A((i=r.options)===null||i===void 0?void 0:i.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new eb(r.auth(),e,t),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA="auth-compat";function WA(n){n.INTERNAL.registerComponent(new Et(jA,e=>{const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth");return new Al(t,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:Ur.EMAIL_SIGNIN,PASSWORD_RESET:Ur.PASSWORD_RESET,RECOVER_EMAIL:Ur.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:Ur.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:Ur.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:Ur.VERIFY_EMAIL}},EmailAuthProvider:Fn,FacebookAuthProvider:Pt,GithubAuthProvider:kt,GoogleAuthProvider:Rt,OAuthProvider:Zr,SAMLAuthProvider:va,PhoneAuthProvider:Du,PhoneMultiFactorGenerator:hg,RecaptchaVerifier:zA,TwitterAuthProvider:Ct,Auth:Al,AuthCredential:bi,Error:Je}).setInstantiationMode("LAZY").setMultipleInstances(!1)),n.registerVersion(bA,AA)}WA(mt);var Ef=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ar,vg;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function v(){}v.prototype=_.prototype,w.D=_.prototype,w.prototype=new v,w.prototype.constructor=w,w.C=function(E,b,T){for(var y=Array(arguments.length-2),_e=2;_e<arguments.length;_e++)y[_e-2]=arguments[_e];return _.prototype[b].apply(E,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,_,v){v||(v=0);var E=Array(16);if(typeof _=="string")for(var b=0;16>b;++b)E[b]=_.charCodeAt(v++)|_.charCodeAt(v++)<<8|_.charCodeAt(v++)<<16|_.charCodeAt(v++)<<24;else for(b=0;16>b;++b)E[b]=_[v++]|_[v++]<<8|_[v++]<<16|_[v++]<<24;_=w.g[0],v=w.g[1],b=w.g[2];var T=w.g[3],y=_+(T^v&(b^T))+E[0]+3614090360&4294967295;_=v+(y<<7&4294967295|y>>>25),y=T+(b^_&(v^b))+E[1]+3905402710&4294967295,T=_+(y<<12&4294967295|y>>>20),y=b+(v^T&(_^v))+E[2]+606105819&4294967295,b=T+(y<<17&4294967295|y>>>15),y=v+(_^b&(T^_))+E[3]+3250441966&4294967295,v=b+(y<<22&4294967295|y>>>10),y=_+(T^v&(b^T))+E[4]+4118548399&4294967295,_=v+(y<<7&4294967295|y>>>25),y=T+(b^_&(v^b))+E[5]+1200080426&4294967295,T=_+(y<<12&4294967295|y>>>20),y=b+(v^T&(_^v))+E[6]+2821735955&4294967295,b=T+(y<<17&4294967295|y>>>15),y=v+(_^b&(T^_))+E[7]+4249261313&4294967295,v=b+(y<<22&4294967295|y>>>10),y=_+(T^v&(b^T))+E[8]+1770035416&4294967295,_=v+(y<<7&4294967295|y>>>25),y=T+(b^_&(v^b))+E[9]+2336552879&4294967295,T=_+(y<<12&4294967295|y>>>20),y=b+(v^T&(_^v))+E[10]+4294925233&4294967295,b=T+(y<<17&4294967295|y>>>15),y=v+(_^b&(T^_))+E[11]+2304563134&4294967295,v=b+(y<<22&4294967295|y>>>10),y=_+(T^v&(b^T))+E[12]+1804603682&4294967295,_=v+(y<<7&4294967295|y>>>25),y=T+(b^_&(v^b))+E[13]+4254626195&4294967295,T=_+(y<<12&4294967295|y>>>20),y=b+(v^T&(_^v))+E[14]+2792965006&4294967295,b=T+(y<<17&4294967295|y>>>15),y=v+(_^b&(T^_))+E[15]+1236535329&4294967295,v=b+(y<<22&4294967295|y>>>10),y=_+(b^T&(v^b))+E[1]+4129170786&4294967295,_=v+(y<<5&4294967295|y>>>27),y=T+(v^b&(_^v))+E[6]+3225465664&4294967295,T=_+(y<<9&4294967295|y>>>23),y=b+(_^v&(T^_))+E[11]+643717713&4294967295,b=T+(y<<14&4294967295|y>>>18),y=v+(T^_&(b^T))+E[0]+3921069994&4294967295,v=b+(y<<20&4294967295|y>>>12),y=_+(b^T&(v^b))+E[5]+3593408605&4294967295,_=v+(y<<5&4294967295|y>>>27),y=T+(v^b&(_^v))+E[10]+38016083&4294967295,T=_+(y<<9&4294967295|y>>>23),y=b+(_^v&(T^_))+E[15]+3634488961&4294967295,b=T+(y<<14&4294967295|y>>>18),y=v+(T^_&(b^T))+E[4]+3889429448&4294967295,v=b+(y<<20&4294967295|y>>>12),y=_+(b^T&(v^b))+E[9]+568446438&4294967295,_=v+(y<<5&4294967295|y>>>27),y=T+(v^b&(_^v))+E[14]+3275163606&4294967295,T=_+(y<<9&4294967295|y>>>23),y=b+(_^v&(T^_))+E[3]+4107603335&4294967295,b=T+(y<<14&4294967295|y>>>18),y=v+(T^_&(b^T))+E[8]+1163531501&4294967295,v=b+(y<<20&4294967295|y>>>12),y=_+(b^T&(v^b))+E[13]+2850285829&4294967295,_=v+(y<<5&4294967295|y>>>27),y=T+(v^b&(_^v))+E[2]+4243563512&4294967295,T=_+(y<<9&4294967295|y>>>23),y=b+(_^v&(T^_))+E[7]+1735328473&4294967295,b=T+(y<<14&4294967295|y>>>18),y=v+(T^_&(b^T))+E[12]+2368359562&4294967295,v=b+(y<<20&4294967295|y>>>12),y=_+(v^b^T)+E[5]+4294588738&4294967295,_=v+(y<<4&4294967295|y>>>28),y=T+(_^v^b)+E[8]+2272392833&4294967295,T=_+(y<<11&4294967295|y>>>21),y=b+(T^_^v)+E[11]+1839030562&4294967295,b=T+(y<<16&4294967295|y>>>16),y=v+(b^T^_)+E[14]+4259657740&4294967295,v=b+(y<<23&4294967295|y>>>9),y=_+(v^b^T)+E[1]+2763975236&4294967295,_=v+(y<<4&4294967295|y>>>28),y=T+(_^v^b)+E[4]+1272893353&4294967295,T=_+(y<<11&4294967295|y>>>21),y=b+(T^_^v)+E[7]+4139469664&4294967295,b=T+(y<<16&4294967295|y>>>16),y=v+(b^T^_)+E[10]+3200236656&4294967295,v=b+(y<<23&4294967295|y>>>9),y=_+(v^b^T)+E[13]+681279174&4294967295,_=v+(y<<4&4294967295|y>>>28),y=T+(_^v^b)+E[0]+3936430074&4294967295,T=_+(y<<11&4294967295|y>>>21),y=b+(T^_^v)+E[3]+3572445317&4294967295,b=T+(y<<16&4294967295|y>>>16),y=v+(b^T^_)+E[6]+76029189&4294967295,v=b+(y<<23&4294967295|y>>>9),y=_+(v^b^T)+E[9]+3654602809&4294967295,_=v+(y<<4&4294967295|y>>>28),y=T+(_^v^b)+E[12]+3873151461&4294967295,T=_+(y<<11&4294967295|y>>>21),y=b+(T^_^v)+E[15]+530742520&4294967295,b=T+(y<<16&4294967295|y>>>16),y=v+(b^T^_)+E[2]+3299628645&4294967295,v=b+(y<<23&4294967295|y>>>9),y=_+(b^(v|~T))+E[0]+4096336452&4294967295,_=v+(y<<6&4294967295|y>>>26),y=T+(v^(_|~b))+E[7]+1126891415&4294967295,T=_+(y<<10&4294967295|y>>>22),y=b+(_^(T|~v))+E[14]+2878612391&4294967295,b=T+(y<<15&4294967295|y>>>17),y=v+(T^(b|~_))+E[5]+4237533241&4294967295,v=b+(y<<21&4294967295|y>>>11),y=_+(b^(v|~T))+E[12]+1700485571&4294967295,_=v+(y<<6&4294967295|y>>>26),y=T+(v^(_|~b))+E[3]+2399980690&4294967295,T=_+(y<<10&4294967295|y>>>22),y=b+(_^(T|~v))+E[10]+4293915773&4294967295,b=T+(y<<15&4294967295|y>>>17),y=v+(T^(b|~_))+E[1]+2240044497&4294967295,v=b+(y<<21&4294967295|y>>>11),y=_+(b^(v|~T))+E[8]+1873313359&4294967295,_=v+(y<<6&4294967295|y>>>26),y=T+(v^(_|~b))+E[15]+4264355552&4294967295,T=_+(y<<10&4294967295|y>>>22),y=b+(_^(T|~v))+E[6]+2734768916&4294967295,b=T+(y<<15&4294967295|y>>>17),y=v+(T^(b|~_))+E[13]+1309151649&4294967295,v=b+(y<<21&4294967295|y>>>11),y=_+(b^(v|~T))+E[4]+4149444226&4294967295,_=v+(y<<6&4294967295|y>>>26),y=T+(v^(_|~b))+E[11]+3174756917&4294967295,T=_+(y<<10&4294967295|y>>>22),y=b+(_^(T|~v))+E[2]+718787259&4294967295,b=T+(y<<15&4294967295|y>>>17),y=v+(T^(b|~_))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(b+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+b&4294967295,w.g[3]=w.g[3]+T&4294967295}r.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var v=_-this.blockSize,E=this.B,b=this.h,T=0;T<_;){if(b==0)for(;T<=v;)i(this,w,T),T+=this.blockSize;if(typeof w=="string"){for(;T<_;)if(E[b++]=w.charCodeAt(T++),b==this.blockSize){i(this,E),b=0;break}}else for(;T<_;)if(E[b++]=w[T++],b==this.blockSize){i(this,E),b=0;break}}this.h=b,this.o+=_},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var v=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=v&255,v/=256;for(this.u(w),w=Array(16),_=v=0;4>_;++_)for(var E=0;32>E;E+=8)w[v++]=this.g[_]>>>E&255;return w};function s(w,_){var v=c;return Object.prototype.hasOwnProperty.call(v,w)?v[w]:v[w]=_(w)}function o(w,_){this.h=_;for(var v=[],E=!0,b=w.length-1;0<=b;b--){var T=w[b]|0;E&&T==_||(v[b]=T,E=!1)}this.g=v}var c={};function l(w){return-128<=w&&128>w?s(w,function(_){return new o([_|0],0>_?-1:0)}):new o([w|0],0>w?-1:0)}function u(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return C(u(-w));for(var _=[],v=1,E=0;w>=v;E++)_[E]=w/v|0,v*=4294967296;return new o(_,0)}function d(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return C(d(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=u(Math.pow(_,8)),E=p,b=0;b<w.length;b+=8){var T=Math.min(8,w.length-b),y=parseInt(w.substring(b,b+T),_);8>T?(T=u(Math.pow(_,T)),E=E.j(T).add(u(y))):(E=E.j(v),E=E.add(u(y)))}return E}var p=l(0),g=l(1),I=l(16777216);n=o.prototype,n.m=function(){if(x(this))return-C(this).m();for(var w=0,_=1,v=0;v<this.g.length;v++){var E=this.i(v);w+=(0<=E?E:4294967296+E)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(x(this))return"-"+C(this).toString(w);for(var _=u(Math.pow(w,6)),v=this,E="";;){var b=W(v,_).g;v=U(v,b.j(_));var T=((0<v.g.length?v.g[0]:v.h)>>>0).toString(w);if(v=b,S(v))return T+E;for(;6>T.length;)T="0"+T;E=T+E}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function x(w){return w.h==-1}n.l=function(w){return w=U(this,w),x(w)?-1:S(w)?0:1};function C(w){for(var _=w.g.length,v=[],E=0;E<_;E++)v[E]=~w.g[E];return new o(v,~w.h).add(g)}n.abs=function(){return x(this)?C(this):this},n.add=function(w){for(var _=Math.max(this.g.length,w.g.length),v=[],E=0,b=0;b<=_;b++){var T=E+(this.i(b)&65535)+(w.i(b)&65535),y=(T>>>16)+(this.i(b)>>>16)+(w.i(b)>>>16);E=y>>>16,T&=65535,y&=65535,v[b]=y<<16|T}return new o(v,v[v.length-1]&-2147483648?-1:0)};function U(w,_){return w.add(C(_))}n.j=function(w){if(S(this)||S(w))return p;if(x(this))return x(w)?C(this).j(C(w)):C(C(this).j(w));if(x(w))return C(this.j(C(w)));if(0>this.l(I)&&0>w.l(I))return u(this.m()*w.m());for(var _=this.g.length+w.g.length,v=[],E=0;E<2*_;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var b=0;b<w.g.length;b++){var T=this.i(E)>>>16,y=this.i(E)&65535,_e=w.i(b)>>>16,$t=w.i(b)&65535;v[2*E+2*b]+=y*$t,z(v,2*E+2*b),v[2*E+2*b+1]+=T*$t,z(v,2*E+2*b+1),v[2*E+2*b+1]+=y*_e,z(v,2*E+2*b+1),v[2*E+2*b+2]+=T*_e,z(v,2*E+2*b+2)}for(E=0;E<_;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=_;E<2*_;E++)v[E]=0;return new o(v,0)};function z(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function F(w,_){this.g=w,this.h=_}function W(w,_){if(S(_))throw Error("division by zero");if(S(w))return new F(p,p);if(x(w))return _=W(C(w),_),new F(C(_.g),C(_.h));if(x(_))return _=W(w,C(_)),new F(C(_.g),_.h);if(30<w.g.length){if(x(w)||x(_))throw Error("slowDivide_ only works with positive integers.");for(var v=g,E=_;0>=E.l(w);)v=Q(v),E=Q(E);var b=G(v,1),T=G(E,1);for(E=G(E,2),v=G(v,2);!S(E);){var y=T.add(E);0>=y.l(w)&&(b=b.add(v),T=y),E=G(E,1),v=G(v,1)}return _=U(w,b.j(_)),new F(b,_)}for(b=p;0<=w.l(_);){for(v=Math.max(1,Math.floor(w.m()/_.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),T=u(v),y=T.j(_);x(y)||0<y.l(w);)v-=E,T=u(v),y=T.j(_);S(T)&&(T=g),b=b.add(T),w=U(w,y)}return new F(b,w)}n.A=function(w){return W(this,w).h},n.and=function(w){for(var _=Math.max(this.g.length,w.g.length),v=[],E=0;E<_;E++)v[E]=this.i(E)&w.i(E);return new o(v,this.h&w.h)},n.or=function(w){for(var _=Math.max(this.g.length,w.g.length),v=[],E=0;E<_;E++)v[E]=this.i(E)|w.i(E);return new o(v,this.h|w.h)},n.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),v=[],E=0;E<_;E++)v[E]=this.i(E)^w.i(E);return new o(v,this.h^w.h)};function Q(w){for(var _=w.g.length+1,v=[],E=0;E<_;E++)v[E]=w.i(E)<<1|w.i(E-1)>>>31;return new o(v,w.h)}function G(w,_){var v=_>>5;_%=32;for(var E=w.g.length-v,b=[],T=0;T<E;T++)b[T]=0<_?w.i(T+v)>>>_|w.i(T+v+1)<<32-_:w.i(T+v);return new o(b,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,vg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,ar=o}).apply(typeof Ef<"u"?Ef:typeof self<"u"?self:typeof window<"u"?window:{});var qo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ig,ds,wg,sa,Rl,Eg,Tg,bg;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,f){return a==Array.prototype||a==Object.prototype||(a[h]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof qo=="object"&&qo];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in f))break e;f=f[A]}a=a[a.length-1],m=f[a],h=h(m),h!=m&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}function s(a,h){a instanceof String&&(a+="");var f=0,m=!1,A={next:function(){if(!m&&f<a.length){var k=f++;return{value:h(k,a[k]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(a){return a||function(){return s(this,function(h,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function d(a,h,f){return a.call.apply(a.bind,arguments)}function p(a,h,f){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),a.apply(h,A)}}return function(){return a.apply(h,arguments)}}function g(a,h,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,g.apply(null,arguments)}function I(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function S(a,h){function f(){}f.prototype=h.prototype,a.aa=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(m,A,k){for(var O=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)O[ie-2]=arguments[ie];return h.prototype[A].apply(m,O)}}function x(a){const h=a.length;if(0<h){const f=Array(h);for(let m=0;m<h;m++)f[m]=a[m];return f}return[]}function C(a,h){for(let f=1;f<arguments.length;f++){const m=arguments[f];if(l(m)){const A=a.length||0,k=m.length||0;a.length=A+k;for(let O=0;O<k;O++)a[A+O]=m[O]}else a.push(m)}}class U{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function z(a){return/^[\s\xa0]*$/.test(a)}function F(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function W(a){return W[" "](a),a}W[" "]=function(){};var Q=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function G(a,h,f){for(const m in a)h.call(f,a[m],m,a)}function w(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function _(a){const h={};for(const f in a)h[f]=a[f];return h}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,h){let f,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(f in m)a[f]=m[f];for(let k=0;k<v.length;k++)f=v[k],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function b(a){var h=1;a=a.split(":");const f=[];for(;0<h&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function T(a){c.setTimeout(()=>{throw a},0)}function y(){var a=Rc;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class _e{constructor(){this.h=this.g=null}add(h,f){const m=$t.get();m.set(h,f),this.h?this.h.next=m:this.g=m,this.h=m}}var $t=new U(()=>new Vr,a=>a.reset());class Vr{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Fi,Ui=!1,Rc=new _e,jh=()=>{const a=c.Promise.resolve(void 0);Fi=()=>{a.then(Ev)}};var Ev=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(f){T(f)}var h=$t;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}Ui=!1};function dn(){this.s=this.s,this.C=this.C}dn.prototype.s=!1,dn.prototype.ma=function(){this.s||(this.s=!0,this.N())},dn.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function je(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}je.prototype.h=function(){this.defaultPrevented=!0};var Tv=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,h),c.removeEventListener("test",f,h)}catch{}return a}();function Bi(a,h){if(je.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(Q){e:{try{W(h.nodeName);var A=!0;break e}catch{}A=!1}A||(h=null)}}else f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement);this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:bv[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Bi.aa.h.call(this)}}S(Bi,je);var bv={2:"touch",3:"pen",4:"mouse"};Bi.prototype.h=function(){Bi.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var wo="closure_listenable_"+(1e6*Math.random()|0),Av=0;function Rv(a,h,f,m,A){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!m,this.ha=A,this.key=++Av,this.da=this.fa=!1}function Eo(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function To(a){this.src=a,this.g={},this.h=0}To.prototype.add=function(a,h,f,m,A){var k=a.toString();a=this.g[k],a||(a=this.g[k]=[],this.h++);var O=Pc(a,h,m,A);return-1<O?(h=a[O],f||(h.fa=!1)):(h=new Rv(h,this.src,k,!!m,A),h.fa=f,a.push(h)),h};function Sc(a,h){var f=h.type;if(f in a.g){var m=a.g[f],A=Array.prototype.indexOf.call(m,h,void 0),k;(k=0<=A)&&Array.prototype.splice.call(m,A,1),k&&(Eo(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Pc(a,h,f,m){for(var A=0;A<a.length;++A){var k=a[A];if(!k.da&&k.listener==h&&k.capture==!!f&&k.ha==m)return A}return-1}var kc="closure_lm_"+(1e6*Math.random()|0),Cc={};function Wh(a,h,f,m,A){if(Array.isArray(h)){for(var k=0;k<h.length;k++)Wh(a,h[k],f,m,A);return null}return f=Hh(f),a&&a[wo]?a.K(h,f,u(m)?!!m.capture:!1,A):Sv(a,h,f,!1,m,A)}function Sv(a,h,f,m,A,k){if(!h)throw Error("Invalid event type");var O=u(A)?!!A.capture:!!A,ie=Dc(a);if(ie||(a[kc]=ie=new To(a)),f=ie.add(h,f,m,O,k),f.proxy)return f;if(m=Pv(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)Tv||(A=O),A===void 0&&(A=!1),a.addEventListener(h.toString(),m,A);else if(a.attachEvent)a.attachEvent(Kh(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Pv(){function a(f){return h.call(a.src,a.listener,f)}const h=kv;return a}function Gh(a,h,f,m,A){if(Array.isArray(h))for(var k=0;k<h.length;k++)Gh(a,h[k],f,m,A);else m=u(m)?!!m.capture:!!m,f=Hh(f),a&&a[wo]?(a=a.i,h=String(h).toString(),h in a.g&&(k=a.g[h],f=Pc(k,f,m,A),-1<f&&(Eo(k[f]),Array.prototype.splice.call(k,f,1),k.length==0&&(delete a.g[h],a.h--)))):a&&(a=Dc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Pc(h,f,m,A)),(f=-1<a?h[a]:null)&&xc(f))}function xc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[wo])Sc(h.i,a);else{var f=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(f,m,a.capture):h.detachEvent?h.detachEvent(Kh(f),m):h.addListener&&h.removeListener&&h.removeListener(m),(f=Dc(h))?(Sc(f,a),f.h==0&&(f.src=null,h[kc]=null)):Eo(a)}}}function Kh(a){return a in Cc?Cc[a]:Cc[a]="on"+a}function kv(a,h){if(a.da)a=!0;else{h=new Bi(h,this);var f=a.listener,m=a.ha||a.src;a.fa&&xc(a),a=f.call(m,h)}return a}function Dc(a){return a=a[kc],a instanceof To?a:null}var Nc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Hh(a){return typeof a=="function"?a:(a[Nc]||(a[Nc]=function(h){return a.handleEvent(h)}),a[Nc])}function We(){dn.call(this),this.i=new To(this),this.M=this,this.F=null}S(We,dn),We.prototype[wo]=!0,We.prototype.removeEventListener=function(a,h,f,m){Gh(this,a,h,f,m)};function Ye(a,h){var f,m=a.F;if(m)for(f=[];m;m=m.F)f.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new je(h,a);else if(h instanceof je)h.target=h.target||a;else{var A=h;h=new je(m,a),E(h,A)}if(A=!0,f)for(var k=f.length-1;0<=k;k--){var O=h.g=f[k];A=bo(O,m,!0,h)&&A}if(O=h.g=a,A=bo(O,m,!0,h)&&A,A=bo(O,m,!1,h)&&A,f)for(k=0;k<f.length;k++)O=h.g=f[k],A=bo(O,m,!1,h)&&A}We.prototype.N=function(){if(We.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var f=a.g[h],m=0;m<f.length;m++)Eo(f[m]);delete a.g[h],a.h--}}this.F=null},We.prototype.K=function(a,h,f,m){return this.i.add(String(a),h,!1,f,m)},We.prototype.L=function(a,h,f,m){return this.i.add(String(a),h,!0,f,m)};function bo(a,h,f,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var A=!0,k=0;k<h.length;++k){var O=h[k];if(O&&!O.da&&O.capture==f){var ie=O.listener,Fe=O.ha||O.src;O.fa&&Sc(a.i,O),A=ie.call(Fe,m)!==!1&&A}}return A&&!m.defaultPrevented}function Qh(a,h,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function Jh(a){a.g=Qh(()=>{a.g=null,a.i&&(a.i=!1,Jh(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Cv extends dn{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Jh(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qi(a){dn.call(this),this.h=a,this.g={}}S(qi,dn);var Yh=[];function Xh(a){G(a.g,function(h,f){this.g.hasOwnProperty(f)&&xc(h)},a),a.g={}}qi.prototype.N=function(){qi.aa.N.call(this),Xh(this)},qi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Vc=c.JSON.stringify,xv=c.JSON.parse,Dv=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Oc(){}Oc.prototype.h=null;function Zh(a){return a.h||(a.h=a.i())}function ed(){}var $i={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Lc(){je.call(this,"d")}S(Lc,je);function Mc(){je.call(this,"c")}S(Mc,je);var jn={},td=null;function Ao(){return td=td||new We}jn.La="serverreachability";function nd(a){je.call(this,jn.La,a)}S(nd,je);function zi(a){const h=Ao();Ye(h,new nd(h))}jn.STAT_EVENT="statevent";function rd(a,h){je.call(this,jn.STAT_EVENT,a),this.stat=h}S(rd,je);function Xe(a){const h=Ao();Ye(h,new rd(h,a))}jn.Ma="timingevent";function id(a,h){je.call(this,jn.Ma,a),this.size=h}S(id,je);function ji(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function Wi(){this.g=!0}Wi.prototype.xa=function(){this.g=!1};function Nv(a,h,f,m,A,k){a.info(function(){if(a.g)if(k)for(var O="",ie=k.split("&"),Fe=0;Fe<ie.length;Fe++){var te=ie[Fe].split("=");if(1<te.length){var Ge=te[0];te=te[1];var Ke=Ge.split("_");O=2<=Ke.length&&Ke[1]=="type"?O+(Ge+"="+te+"&"):O+(Ge+"=redacted&")}}else O=null;else O=k;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+h+`
`+f+`
`+O})}function Vv(a,h,f,m,A,k,O){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+h+`
`+f+`
`+k+" "+O})}function Or(a,h,f,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Lv(a,f)+(m?" "+m:"")})}function Ov(a,h){a.info(function(){return"TIMEOUT: "+h})}Wi.prototype.info=function(){};function Lv(a,h){if(!a.g)return h;if(!h)return null;try{var f=JSON.parse(h);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var m=f[a];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var k=A[0];if(k!="noop"&&k!="stop"&&k!="close")for(var O=1;O<A.length;O++)A[O]=""}}}}return Vc(f)}catch{return h}}var Ro={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},sd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Fc;function So(){}S(So,Oc),So.prototype.g=function(){return new XMLHttpRequest},So.prototype.i=function(){return{}},Fc=new So;function fn(a,h,f,m){this.j=a,this.i=h,this.l=f,this.R=m||1,this.U=new qi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new od}function od(){this.i=null,this.g="",this.h=!1}var ad={},Uc={};function Bc(a,h,f){a.L=1,a.v=xo(zt(h)),a.m=f,a.P=!0,cd(a,null)}function cd(a,h){a.F=Date.now(),Po(a),a.A=zt(a.v);var f=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),Ed(f.i,"t",m),a.C=0,f=a.j.J,a.h=new od,a.g=Bd(a.j,f?h:null,!a.m),0<a.O&&(a.M=new Cv(g(a.Y,a,a.g),a.O)),h=a.U,f=a.g,m=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(Yh[0]=A.toString()),A=Yh);for(var k=0;k<A.length;k++){var O=Wh(f,A[k],m||h.handleEvent,!1,h.h||h);if(!O)break;h.g[O.key]=O}h=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),zi(),Nv(a.i,a.u,a.A,a.l,a.R,a.m)}fn.prototype.ca=function(a){a=a.target;const h=this.M;h&&jt(a)==3?h.j():this.Y(a)},fn.prototype.Y=function(a){try{if(a==this.g)e:{const Ke=jt(this.g);var h=this.g.Ba();const Fr=this.g.Z();if(!(3>Ke)&&(Ke!=3||this.g&&(this.h.h||this.g.oa()||kd(this.g)))){this.J||Ke!=4||h==7||(h==8||0>=Fr?zi(3):zi(2)),qc(this);var f=this.g.Z();this.X=f;t:if(ld(this)){var m=kd(this.g);a="";var A=m.length,k=jt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Wn(this),Gi(this);var O="";break t}this.h.i=new c.TextDecoder}for(h=0;h<A;h++)this.h.h=!0,a+=this.h.i.decode(m[h],{stream:!(k&&h==A-1)});m.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=f==200,Vv(this.i,this.u,this.A,this.l,this.R,Ke,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Fe=this.g;if((ie=Fe.g?Fe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(ie)){var te=ie;break t}}te=null}if(f=te)Or(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,$c(this,f);else{this.o=!1,this.s=3,Xe(12),Wn(this),Gi(this);break e}}if(this.P){f=!0;let At;for(;!this.J&&this.C<O.length;)if(At=Mv(this,O),At==Uc){Ke==4&&(this.s=4,Xe(14),f=!1),Or(this.i,this.l,null,"[Incomplete Response]");break}else if(At==ad){this.s=4,Xe(15),Or(this.i,this.l,O,"[Invalid Chunk]"),f=!1;break}else Or(this.i,this.l,At,null),$c(this,At);if(ld(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ke!=4||O.length!=0||this.h.h||(this.s=1,Xe(16),f=!1),this.o=this.o&&f,!f)Or(this.i,this.l,O,"[Invalid Chunked Response]"),Wn(this),Gi(this);else if(0<O.length&&!this.W){this.W=!0;var Ge=this.j;Ge.g==this&&Ge.ba&&!Ge.M&&(Ge.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Hc(Ge),Ge.M=!0,Xe(11))}}else Or(this.i,this.l,O,null),$c(this,O);Ke==4&&Wn(this),this.o&&!this.J&&(Ke==4?Ld(this.j,this):(this.o=!1,Po(this)))}else eI(this.g),f==400&&0<O.indexOf("Unknown SID")?(this.s=3,Xe(12)):(this.s=0,Xe(13)),Wn(this),Gi(this)}}}catch{}finally{}};function ld(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Mv(a,h){var f=a.C,m=h.indexOf(`
`,f);return m==-1?Uc:(f=Number(h.substring(f,m)),isNaN(f)?ad:(m+=1,m+f>h.length?Uc:(h=h.slice(m,m+f),a.C=m+f,h)))}fn.prototype.cancel=function(){this.J=!0,Wn(this)};function Po(a){a.S=Date.now()+a.I,ud(a,a.I)}function ud(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ji(g(a.ba,a),h)}function qc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}fn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Ov(this.i,this.A),this.L!=2&&(zi(),Xe(17)),Wn(this),this.s=2,Gi(this)):ud(this,this.S-a)};function Gi(a){a.j.G==0||a.J||Ld(a.j,a)}function Wn(a){qc(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Xh(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function $c(a,h){try{var f=a.j;if(f.G!=0&&(f.g==a||zc(f.h,a))){if(!a.K&&zc(f.h,a)&&f.G==3){try{var m=f.Da.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)Mo(f),Oo(f);else break e;Kc(f),Xe(18)}}else f.za=A[1],0<f.za-f.T&&37500>A[2]&&f.F&&f.v==0&&!f.C&&(f.C=ji(g(f.Za,f),6e3));if(1>=fd(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Kn(f,11)}else if((a.K||f.g==a)&&Mo(f),!z(h))for(A=f.Da.g.parse(h),h=0;h<A.length;h++){let te=A[h];if(f.T=te[0],te=te[1],f.G==2)if(te[0]=="c"){f.K=te[1],f.ia=te[2];const Ge=te[3];Ge!=null&&(f.la=Ge,f.j.info("VER="+f.la));const Ke=te[4];Ke!=null&&(f.Aa=Ke,f.j.info("SVER="+f.Aa));const Fr=te[5];Fr!=null&&typeof Fr=="number"&&0<Fr&&(m=1.5*Fr,f.L=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const At=a.g;if(At){const Uo=At.g?At.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Uo){var k=m.h;k.g||Uo.indexOf("spdy")==-1&&Uo.indexOf("quic")==-1&&Uo.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(jc(k,k.h),k.h=null))}if(m.D){const Qc=At.g?At.g.getResponseHeader("X-HTTP-Session-Id"):null;Qc&&(m.ya=Qc,oe(m.I,m.D,Qc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),m=f;var O=a;if(m.qa=Ud(m,m.J?m.ia:null,m.W),O.K){pd(m.h,O);var ie=O,Fe=m.L;Fe&&(ie.I=Fe),ie.B&&(qc(ie),Po(ie)),m.g=O}else Vd(m);0<f.i.length&&Lo(f)}else te[0]!="stop"&&te[0]!="close"||Kn(f,7);else f.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?Kn(f,7):Gc(f):te[0]!="noop"&&f.l&&f.l.ta(te),f.v=0)}}zi(4)}catch{}}var Fv=class{constructor(a,h){this.g=a,this.map=h}};function hd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function dd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function fd(a){return a.h?1:a.g?a.g.size:0}function zc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function jc(a,h){a.g?a.g.add(h):a.h=h}function pd(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}hd.prototype.cancel=function(){if(this.i=md(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function md(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.D);return h}return x(a.i)}function Uv(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var h=[],f=a.length,m=0;m<f;m++)h.push(a[m]);return h}h=[],f=0;for(m in a)h[f++]=a[m];return h}function Bv(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var h=[];a=a.length;for(var f=0;f<a;f++)h.push(f);return h}h=[],f=0;for(const m in a)h[f++]=m;return h}}}function gd(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var f=Bv(a),m=Uv(a),A=m.length,k=0;k<A;k++)h.call(void 0,m[k],f&&f[k],a)}var _d=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function qv(a,h){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var m=a[f].indexOf("="),A=null;if(0<=m){var k=a[f].substring(0,m);A=a[f].substring(m+1)}else k=a[f];h(k,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Gn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Gn){this.h=a.h,ko(this,a.j),this.o=a.o,this.g=a.g,Co(this,a.s),this.l=a.l;var h=a.i,f=new Qi;f.i=h.i,h.g&&(f.g=new Map(h.g),f.h=h.h),yd(this,f),this.m=a.m}else a&&(h=String(a).match(_d))?(this.h=!1,ko(this,h[1]||"",!0),this.o=Ki(h[2]||""),this.g=Ki(h[3]||"",!0),Co(this,h[4]),this.l=Ki(h[5]||"",!0),yd(this,h[6]||"",!0),this.m=Ki(h[7]||"")):(this.h=!1,this.i=new Qi(null,this.h))}Gn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Hi(h,vd,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Hi(h,vd,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Hi(f,f.charAt(0)=="/"?jv:zv,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Hi(f,Gv)),a.join("")};function zt(a){return new Gn(a)}function ko(a,h,f){a.j=f?Ki(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Co(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function yd(a,h,f){h instanceof Qi?(a.i=h,Kv(a.i,a.h)):(f||(h=Hi(h,Wv)),a.i=new Qi(h,a.h))}function oe(a,h,f){a.i.set(h,f)}function xo(a){return oe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ki(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Hi(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,$v),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function $v(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var vd=/[#\/\?@]/g,zv=/[#\?:]/g,jv=/[#\?]/g,Wv=/[#\?@]/g,Gv=/#/g;function Qi(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function pn(a){a.g||(a.g=new Map,a.h=0,a.i&&qv(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=Qi.prototype,n.add=function(a,h){pn(this),this.i=null,a=Lr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function Id(a,h){pn(a),h=Lr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function wd(a,h){return pn(a),h=Lr(a,h),a.g.has(h)}n.forEach=function(a,h){pn(this),this.g.forEach(function(f,m){f.forEach(function(A){a.call(h,A,m,this)},this)},this)},n.na=function(){pn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),f=[];for(let m=0;m<h.length;m++){const A=a[m];for(let k=0;k<A.length;k++)f.push(h[m])}return f},n.V=function(a){pn(this);let h=[];if(typeof a=="string")wd(this,a)&&(h=h.concat(this.g.get(Lr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)h=h.concat(a[f])}return h},n.set=function(a,h){return pn(this),this.i=null,a=Lr(this,a),wd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Ed(a,h,f){Id(a,h),0<f.length&&(a.i=null,a.g.set(Lr(a,h),x(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var f=0;f<h.length;f++){var m=h[f];const k=encodeURIComponent(String(m)),O=this.V(m);for(m=0;m<O.length;m++){var A=k;O[m]!==""&&(A+="="+encodeURIComponent(String(O[m]))),a.push(A)}}return this.i=a.join("&")};function Lr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Kv(a,h){h&&!a.j&&(pn(a),a.i=null,a.g.forEach(function(f,m){var A=m.toLowerCase();m!=A&&(Id(this,m),Ed(this,A,f))},a)),a.j=h}function Hv(a,h){const f=new Wi;if(c.Image){const m=new Image;m.onload=I(mn,f,"TestLoadImage: loaded",!0,h,m),m.onerror=I(mn,f,"TestLoadImage: error",!1,h,m),m.onabort=I(mn,f,"TestLoadImage: abort",!1,h,m),m.ontimeout=I(mn,f,"TestLoadImage: timeout",!1,h,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function Qv(a,h){const f=new Wi,m=new AbortController,A=setTimeout(()=>{m.abort(),mn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(k=>{clearTimeout(A),k.ok?mn(f,"TestPingServer: ok",!0,h):mn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(A),mn(f,"TestPingServer: error",!1,h)})}function mn(a,h,f,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(f)}catch{}}function Jv(){this.g=new Dv}function Yv(a,h,f){const m=f||"";try{gd(a,function(A,k){let O=A;u(A)&&(O=Vc(A)),h.push(m+k+"="+encodeURIComponent(O))})}catch(A){throw h.push(m+"type="+encodeURIComponent("_badmap")),A}}function Do(a){this.l=a.Ub||null,this.j=a.eb||!1}S(Do,Oc),Do.prototype.g=function(){return new No(this.l,this.j)},Do.prototype.i=function(a){return function(){return a}}({});function No(a,h){We.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(No,We),n=No.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Yi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ji(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Yi(this)),this.g&&(this.readyState=3,Yi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Td(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Td(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ji(this):Yi(this),this.readyState==3&&Td(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ji(this))},n.Qa=function(a){this.g&&(this.response=a,Ji(this))},n.ga=function(){this.g&&Ji(this)};function Ji(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Yi(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function Yi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(No.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function bd(a){let h="";return G(a,function(f,m){h+=m,h+=":",h+=f,h+=`\r
`}),h}function Wc(a,h,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=bd(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):oe(a,h,f))}function ye(a){We.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(ye,We);var Xv=/^https?$/i,Zv=["POST","PUT"];n=ye.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Fc.g(),this.v=this.o?Zh(this.o):Zh(Fc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(k){Ad(this,k);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)f.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const k of m.keys())f.set(k,m.get(k));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(k=>k.toLowerCase()=="content-type"),A=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Zv,h,void 0))||m||A||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,O]of f)this.g.setRequestHeader(k,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Pd(this),this.u=!0,this.g.send(a),this.u=!1}catch(k){Ad(this,k)}};function Ad(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Rd(a),Vo(a)}function Rd(a){a.A||(a.A=!0,Ye(a,"complete"),Ye(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ye(this,"complete"),Ye(this,"abort"),Vo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Vo(this,!0)),ye.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Sd(this):this.bb())},n.bb=function(){Sd(this)};function Sd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||jt(a)!=4||a.Z()!=2)){if(a.u&&jt(a)==4)Qh(a.Ea,0,a);else if(Ye(a,"readystatechange"),jt(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var m;if(m=O===0){var A=String(a.D).match(_d)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),m=!Xv.test(A?A.toLowerCase():"")}f=m}if(f)Ye(a,"complete"),Ye(a,"success");else{a.m=6;try{var k=2<jt(a)?a.g.statusText:""}catch{k=""}a.l=k+" ["+a.Z()+"]",Rd(a)}}finally{Vo(a)}}}}function Vo(a,h){if(a.g){Pd(a);const f=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||Ye(a,"ready");try{f.onreadystatechange=m}catch{}}}function Pd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function jt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<jt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),xv(h)}};function kd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function eI(a){const h={};a=(a.g&&2<=jt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(z(a[m]))continue;var f=b(a[m]);const A=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const k=h[A]||[];h[A]=k,k.push(f)}w(h,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xi(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Cd(a){this.Aa=0,this.i=[],this.j=new Wi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xi("baseRetryDelayMs",5e3,a),this.cb=Xi("retryDelaySeedMs",1e4,a),this.Wa=Xi("forwardChannelMaxRetries",2,a),this.wa=Xi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new hd(a&&a.concurrentRequestLimit),this.Da=new Jv,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Cd.prototype,n.la=8,n.G=1,n.connect=function(a,h,f,m){Xe(0),this.W=a,this.H=h||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.I=Ud(this,null,this.W),Lo(this)};function Gc(a){if(xd(a),a.G==3){var h=a.U++,f=zt(a.I);if(oe(f,"SID",a.K),oe(f,"RID",h),oe(f,"TYPE","terminate"),Zi(a,f),h=new fn(a,a.j,h),h.L=2,h.v=xo(zt(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=h.v,f=!0),f||(h.g=Bd(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Po(h)}Fd(a)}function Oo(a){a.g&&(Hc(a),a.g.cancel(),a.g=null)}function xd(a){Oo(a),a.u&&(c.clearTimeout(a.u),a.u=null),Mo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Lo(a){if(!dd(a.h)&&!a.s){a.s=!0;var h=a.Ga;Fi||jh(),Ui||(Fi(),Ui=!0),Rc.add(h,a),a.B=0}}function tI(a,h){return fd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ji(g(a.Ga,a,h),Md(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new fn(this,this.j,a);let k=this.o;if(this.S&&(k?(k=_(k),E(k,this.S)):k=this.S),this.m!==null||this.O||(A.H=k,k=null),this.P)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,4096<h){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Nd(this,A,h),f=zt(this.I),oe(f,"RID",a),oe(f,"CVER",22),this.D&&oe(f,"X-HTTP-Session-Id",this.D),Zi(this,f),k&&(this.O?h="headers="+encodeURIComponent(String(bd(k)))+"&"+h:this.m&&Wc(f,this.m,k)),jc(this.h,A),this.Ua&&oe(f,"TYPE","init"),this.P?(oe(f,"$req",h),oe(f,"SID","null"),A.T=!0,Bc(A,f,null)):Bc(A,f,h),this.G=2}}else this.G==3&&(a?Dd(this,a):this.i.length==0||dd(this.h)||Dd(this))};function Dd(a,h){var f;h?f=h.l:f=a.U++;const m=zt(a.I);oe(m,"SID",a.K),oe(m,"RID",f),oe(m,"AID",a.T),Zi(a,m),a.m&&a.o&&Wc(m,a.m,a.o),f=new fn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Nd(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),jc(a.h,f),Bc(f,m,h)}function Zi(a,h){a.H&&G(a.H,function(f,m){oe(h,m,f)}),a.l&&gd({},function(f,m){oe(h,m,f)})}function Nd(a,h,f){f=Math.min(a.i.length,f);var m=a.l?g(a.l.Na,a.l,a):null;e:{var A=a.i;let k=-1;for(;;){const O=["count="+f];k==-1?0<f?(k=A[0].g,O.push("ofs="+k)):k=0:O.push("ofs="+k);let ie=!0;for(let Fe=0;Fe<f;Fe++){let te=A[Fe].g;const Ge=A[Fe].map;if(te-=k,0>te)k=Math.max(0,A[Fe].g-100),ie=!1;else try{Yv(Ge,O,"req"+te+"_")}catch{m&&m(Ge)}}if(ie){m=O.join("&");break e}}}return a=a.i.splice(0,f),h.D=a,m}function Vd(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;Fi||jh(),Ui||(Fi(),Ui=!0),Rc.add(h,a),a.v=0}}function Kc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ji(g(a.Fa,a),Md(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Od(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ji(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Xe(10),Oo(this),Od(this))};function Hc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Od(a){a.g=new fn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=zt(a.qa);oe(h,"RID","rpc"),oe(h,"SID",a.K),oe(h,"AID",a.T),oe(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&oe(h,"TO",a.ja),oe(h,"TYPE","xmlhttp"),Zi(a,h),a.m&&a.o&&Wc(h,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=xo(zt(h)),f.m=null,f.P=!0,cd(f,a)}n.Za=function(){this.C!=null&&(this.C=null,Oo(this),Kc(this),Xe(19))};function Mo(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Ld(a,h){var f=null;if(a.g==h){Mo(a),Hc(a),a.g=null;var m=2}else if(zc(a.h,h))f=h.D,pd(a.h,h),m=1;else return;if(a.G!=0){if(h.o)if(m==1){f=h.m?h.m.length:0,h=Date.now()-h.F;var A=a.B;m=Ao(),Ye(m,new id(m,f)),Lo(a)}else Vd(a);else if(A=h.s,A==3||A==0&&0<h.X||!(m==1&&tI(a,h)||m==2&&Kc(a)))switch(f&&0<f.length&&(h=a.h,h.i=h.i.concat(f)),A){case 1:Kn(a,5);break;case 4:Kn(a,10);break;case 3:Kn(a,6);break;default:Kn(a,2)}}}function Md(a,h){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*h}function Kn(a,h){if(a.j.info("Error code "+h),h==2){var f=g(a.fb,a),m=a.Xa;const A=!m;m=new Gn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ko(m,"https"),xo(m),A?Hv(m.toString(),f):Qv(m.toString(),f)}else Xe(2);a.G=0,a.l&&a.l.sa(h),Fd(a),xd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Xe(2)):(this.j.info("Failed to ping google.com"),Xe(1))};function Fd(a){if(a.G=0,a.ka=[],a.l){const h=md(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ka,h),C(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function Ud(a,h,f){var m=f instanceof Gn?zt(f):new Gn(f);if(m.g!="")h&&(m.g=h+"."+m.g),Co(m,m.s);else{var A=c.location;m=A.protocol,h=h?h+"."+A.hostname:A.hostname,A=+A.port;var k=new Gn(null);m&&ko(k,m),h&&(k.g=h),A&&Co(k,A),f&&(k.l=f),m=k}return f=a.D,h=a.ya,f&&h&&oe(m,f,h),oe(m,"VER",a.la),Zi(a,m),m}function Bd(a,h,f){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new ye(new Do({eb:f})):new ye(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function qd(){}n=qd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Fo(){}Fo.prototype.g=function(a,h){return new ht(a,h)};function ht(a,h){We.call(this),this.g=new Cd(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!z(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!z(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Mr(this)}S(ht,We),ht.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ht.prototype.close=function(){Gc(this.g)},ht.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Vc(a),a=f);h.i.push(new Fv(h.Ya++,a)),h.G==3&&Lo(h)},ht.prototype.N=function(){this.g.l=null,delete this.j,Gc(this.g),delete this.g,ht.aa.N.call(this)};function $d(a){Lc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}S($d,Lc);function zd(){Mc.call(this),this.status=1}S(zd,Mc);function Mr(a){this.g=a}S(Mr,qd),Mr.prototype.ua=function(){Ye(this.g,"a")},Mr.prototype.ta=function(a){Ye(this.g,new $d(a))},Mr.prototype.sa=function(a){Ye(this.g,new zd)},Mr.prototype.ra=function(){Ye(this.g,"b")},Fo.prototype.createWebChannel=Fo.prototype.g,ht.prototype.send=ht.prototype.o,ht.prototype.open=ht.prototype.m,ht.prototype.close=ht.prototype.close,bg=function(){return new Fo},Tg=function(){return Ao()},Eg=jn,Rl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ro.NO_ERROR=0,Ro.TIMEOUT=8,Ro.HTTP_ERROR=6,sa=Ro,sd.COMPLETE="complete",wg=sd,ed.EventType=$i,$i.OPEN="a",$i.CLOSE="b",$i.ERROR="c",$i.MESSAGE="d",We.prototype.listen=We.prototype.K,ds=ed,ye.prototype.listenOnce=ye.prototype.L,ye.prototype.getLastError=ye.prototype.Ka,ye.prototype.getLastErrorCode=ye.prototype.Ba,ye.prototype.getStatus=ye.prototype.Z,ye.prototype.getResponseJson=ye.prototype.Oa,ye.prototype.getResponseText=ye.prototype.oa,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Ha,Ig=ye}).apply(typeof qo<"u"?qo:typeof self<"u"?self:typeof window<"u"?window:{});const Tf="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ve.UNAUTHENTICATED=new Ve(null),Ve.GOOGLE_CREDENTIALS=new Ve("google-credentials-uid"),Ve.FIRST_PARTY=new Ve("first-party-uid"),Ve.MOCK_USER=new Ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ri="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=new Ba("@firebase/firestore");function Wr(){return kn.logLevel}function GA(n){kn.setLogLevel(n)}function N(n,...e){if(kn.logLevel<=J.DEBUG){const t=e.map(Nu);kn.debug(`Firestore (${Ri}): ${n}`,...t)}}function Ae(n,...e){if(kn.logLevel<=J.ERROR){const t=e.map(Nu);kn.error(`Firestore (${Ri}): ${n}`,...t)}}function Ut(n,...e){if(kn.logLevel<=J.WARN){const t=e.map(Nu);kn.warn(`Firestore (${Ri}): ${n}`,...t)}}function Nu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n="Unexpected state"){const e=`FIRESTORE (${Ri}) INTERNAL ASSERTION FAILED: `+n;throw Ae(e),new Error(e)}function q(n,e){n||B()}function KA(n,e){n||B()}function M(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Je{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class HA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ve.UNAUTHENTICATED))}shutdown(){}}class QA{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class JA{constructor(e){this.t=e,this.currentUser=Ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new qe;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new qe,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new qe)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string"),new Ag(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string"),new Ve(e)}}class YA{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Ve.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class XA{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new YA(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ZA{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class eR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){q(this.o===void 0);const r=s=>{s.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(q(typeof t.token=="string"),this.R=t.token,new ZA(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tR(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=tR(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function K(n,e){return n<e?-1:n>e?1:0}function li(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function Sg(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return de.fromMillis(Date.now())}static fromDate(e){return de.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new de(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.timestamp=e}static fromTimestamp(e){return new j(e)}static min(){return new j(new de(0,0))}static max(){return new j(new de(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(),r===void 0?r=e.length-t:r>e.length-t&&B(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ms.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ms?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Y extends Ms{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const nR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ue extends Ms{construct(e,t,r){return new ue(e,t,r)}static isValidIdentifier(e){return nR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ue.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ue(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new D(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new D(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new D(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ue(t)}static emptyPath(){return new ue([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Y.fromString(e))}static fromName(e){return new L(Y.fromString(e).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Y(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Sl(n){return n.fields.find(e=>e.kind===2)}function Jn(n){return n.fields.filter(e=>e.kind!==2)}Ta.UNKNOWN_ID=-1;class oa{constructor(e,t){this.fieldPath=e,this.kind=t}}class Fs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Fs(0,gt.min())}}function Pg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=j.fromTimestamp(r===1e9?new de(t+1,0):new de(t,r));return new gt(i,L.empty(),e)}function kg(n){return new gt(n.readTime,n.key,-1)}class gt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new gt(j.min(),L.empty(),-1)}static max(){return new gt(j.max(),L.empty(),-1)}}function Vu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class xg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Cg)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(i=>i?R.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new R((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let l=0;l<s;l++){const u=l;t(e[u]).next(d=>{o[u]=d,++c,c===s&&r(o)},d=>i(d))}})}static doWhile(e,t){return new R((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new qe,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new vs(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=Ou(r.target.error);this.V.reject(new vs(e,i))}}static open(e,t,r,i){try{return new Xa(t,e.transaction(i,r))}catch(s){throw new vs(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(N("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new iR(t)}}class Ot{constructor(e,t,r){this.name=e,this.version=t,this.p=r,Ot.S(me())===12.2&&Ae("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return N("SimpleDb","Removing database:",e),Yn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Ps())return!1;if(Ot.v())return!0;const e=me(),t=Ot.S(e),r=0<t&&t<10,i=Dg(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(N("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new vs(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new D(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new D(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new vs(e,o))},i.onupgradeneeded=s=>{N("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{N("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const c=Xa.open(this.db,e,s?"readonly":"readwrite",r),l=i(c).next(u=>(c.g(),u)).catch(u=>(c.abort(u),R.reject(u))).toPromise();return l.catch(()=>{}),await c.m,l}catch(c){const l=c,u=l.name!=="FirebaseError"&&o<3;if(N("SimpleDb","Transaction failed with error:",l.message,"Retrying:",u),this.close(),!u)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Dg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class rR{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Yn(this.B.delete())}}class vs extends D{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Bn(n){return n.name==="IndexedDbTransactionError"}class iR{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(N("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(N("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Yn(r)}add(e){return N("SimpleDb","ADD",this.store.name,e,e),Yn(this.store.add(e))}get(e){return Yn(this.store.get(e)).next(t=>(t===void 0&&(t=null),N("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return N("SimpleDb","DELETE",this.store.name,e),Yn(this.store.delete(e))}count(){return N("SimpleDb","COUNT",this.store.name),Yn(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new R((o,c)=>{s.onerror=l=>{c(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.W(s,(c,l)=>{o.push(l)}).next(()=>o)}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new R((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,t){N("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new R((r,i)=>{t.onerror=s=>{const o=Ou(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}W(e,t){const r=[];return new R((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const l=new rR(c),u=t(c.primaryKey,c.value,l);if(u instanceof R){const d=u.catch(p=>(l.done(),R.reject(p)));r.push(d)}l.isDone?i():l.K===null?c.continue():c.continue(l.K)}}).next(()=>R.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Yn(n){return new R((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Ou(r.target.error);t(i)}})}let bf=!1;function Ou(n){const e=Ot.S(me());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return bf||(bf=!0,setTimeout(()=>{throw r},0)),r}}return n}class sR{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){N("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{N("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Bn(t)?N("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Un(t)}await this.X(6e4)})}}class oR{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const r=new Set;let i=t,s=!0;return R.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return N("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(N("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=kg(s);Vu(o,r)>0&&(r=o)}),new gt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}ct.oe=-1;function so(n){return n==null}function Us(n){return n===0&&1/n==-1/0}function Ng(n){return typeof n=="number"&&Number.isInteger(n)&&!Us(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Af(e)),e=aR(n.get(t),e);return Af(e)}function aR(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Af(n){return n+""}function Nt(n){const e=n.length;if(q(e>=2),e===2)return q(n.charAt(0)===""&&n.charAt(1)===""),Y.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&B(),n.charAt(o+1)){case"":const c=n.substring(s,o);let l;i.length===0?l=c:(i+=c,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:B()}s=o+2}return new Y(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n,e){return[n,rt(e)]}function Vg(n,e,t){return[n,rt(e),t]}const cR={},lR=["prefixPath","collectionGroup","readTime","documentId"],uR=["prefixPath","collectionGroup","documentId"],hR=["collectionGroup","readTime","prefixPath","documentId"],dR=["canonicalId","targetId"],fR=["targetId","path"],pR=["path","targetId"],mR=["collectionId","parent"],gR=["indexId","uid"],_R=["uid","sequenceNumber"],yR=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],vR=["indexId","uid","orderedDocumentKey"],IR=["userId","collectionPath","documentId"],wR=["userId","collectionPath","largestBatchId"],ER=["userId","collectionGroup","largestBatchId"],Og=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],TR=[...Og,"documentOverlays"],Lg=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Mg=Lg,Lu=[...Mg,"indexConfiguration","indexState","indexEntries"],bR=Lu,AR=[...Lu,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl extends xg{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function De(n,e){const t=M(n);return Ot.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Rr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Fg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||Ue.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ue.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ue.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $o(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $o(this.root,e,this.comparator,!1)}getReverseIterator(){return new $o(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $o(this.root,e,this.comparator,!0)}}class $o{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ue{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Ue.RED,this.left=i??Ue.EMPTY,this.right=s??Ue.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Ue(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ue.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ue.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ue.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ue.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();const e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}}Ue.EMPTY=null,Ue.RED=!0,Ue.BLACK=!1;Ue.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ue(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Pf(this.data.getIterator())}getIteratorFrom(e){return new Pf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class Pf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Br(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.fields=e,e.sort(ue.comparator)}static empty(){return new lt([])}unionWith(e){let t=new re(ue.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new lt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return li(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RR(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ug("Invalid base64 string: "+s):s}}(e);return new we(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new we(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}we.EMPTY_BYTE_STRING=new we("");const SR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nn(n){if(q(!!n),typeof n=="string"){let e=0;const t=SR.exec(n);if(q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:le(n.seconds),nanos:le(n.nanos)}}function le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Cn(n){return typeof n=="string"?we.fromBase64String(n):we.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Mu(n){const e=n.mapValue.fields.__previous_value__;return Za(e)?Mu(e):e}function Bs(n){const e=nn(n.mapValue.fields.__local_write_time__.timestampValue);return new de(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PR{constructor(e,t,r,i,s,o,c,l,u){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u}}class xn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new xn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof xn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},ca={nullValue:"NULL_VALUE"};function fr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Za(n)?4:Bg(n)?9007199254740991:ec(n)?10:11:B()}function Bt(n,e){if(n===e)return!0;const t=fr(n);if(t!==fr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Bs(n).isEqual(Bs(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=nn(i.timestampValue),c=nn(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Cn(i.bytesValue).isEqual(Cn(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return le(i.geoPointValue.latitude)===le(s.geoPointValue.latitude)&&le(i.geoPointValue.longitude)===le(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return le(i.integerValue)===le(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=le(i.doubleValue),c=le(s.doubleValue);return o===c?Us(o)===Us(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return li(n.arrayValue.values||[],e.arrayValue.values||[],Bt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Sf(o)!==Sf(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Bt(o[l],c[l])))return!1;return!0}(n,e);default:return B()}}function qs(n,e){return(n.values||[]).find(t=>Bt(t,e))!==void 0}function Dn(n,e){if(n===e)return 0;const t=fr(n),r=fr(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=le(s.integerValue||s.doubleValue),l=le(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return kf(n.timestampValue,e.timestampValue);case 4:return kf(Bs(n),Bs(e));case 5:return K(n.stringValue,e.stringValue);case 6:return function(s,o){const c=Cn(s),l=Cn(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const d=K(c[u],l[u]);if(d!==0)return d}return K(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=K(le(s.latitude),le(o.latitude));return c!==0?c:K(le(s.longitude),le(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Cf(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,l,u,d;const p=s.fields||{},g=o.fields||{},I=(c=p.value)===null||c===void 0?void 0:c.arrayValue,S=(l=g.value)===null||l===void 0?void 0:l.arrayValue,x=K(((u=I==null?void 0:I.values)===null||u===void 0?void 0:u.length)||0,((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0);return x!==0?x:Cf(I,S)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===Tn.mapValue&&o===Tn.mapValue)return 0;if(s===Tn.mapValue)return 1;if(o===Tn.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),u=o.fields||{},d=Object.keys(u);l.sort(),d.sort();for(let p=0;p<l.length&&p<d.length;++p){const g=K(l[p],d[p]);if(g!==0)return g;const I=Dn(c[l[p]],u[d[p]]);if(I!==0)return I}return K(l.length,d.length)}(n.mapValue,e.mapValue);default:throw B()}}function kf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=nn(n),r=nn(e),i=K(t.seconds,r.seconds);return i!==0?i:K(t.nanos,r.nanos)}function Cf(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Dn(t[i],r[i]);if(s)return s}return K(t.length,r.length)}function ui(n){return kl(n)}function kl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=nn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Cn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=kl(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${kl(t.fields[o])}`;return i+"}"}(n.mapValue):B()}function pr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Cl(n){return!!n&&"integerValue"in n}function $s(n){return!!n&&"arrayValue"in n}function xf(n){return!!n&&"nullValue"in n}function Df(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function la(n){return!!n&&"mapValue"in n}function ec(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Is(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Rr(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Is(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Is(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Bg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const qg={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function kR(n){return"nullValue"in n?ca:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?pr(xn.empty(),L.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ec(n)?qg:{mapValue:{}}:B()}function CR(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?pr(xn.empty(),L.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?qg:"mapValue"in n?ec(n)?{mapValue:{}}:Tn:B()}function Nf(n,e){const t=Dn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Vf(n,e){const t=Dn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.value=e}static empty(){return new Be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!la(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Is(t)}setAll(e){let t=ue.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Is(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());la(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];la(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Rr(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Be(Is(this.value))}}function $g(n){const e=[];return Rr(n.fields,(t,r)=>{const i=new ue([t]);if(la(r)){const s=$g(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new lt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ae(e,0,j.min(),j.min(),j.min(),Be.empty(),0)}static newFoundDocument(e,t,r,i){return new ae(e,1,t,j.min(),r,i,0)}static newNoDocument(e,t){return new ae(e,2,t,j.min(),j.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new ae(e,3,t,j.min(),j.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e,t){this.position=e,this.inclusive=t}}function Of(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),t.key):r=Dn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Lf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Bt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t="asc"){this.field=e,this.dir=t}}function xR(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{}class X extends zg{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new DR(e,t,r):t==="array-contains"?new OR(e,r):t==="in"?new Qg(e,r):t==="not-in"?new LR(e,r):t==="array-contains-any"?new MR(e,r):new X(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new NR(e,r):new VR(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Dn(t,this.value)):t!==null&&fr(this.value)===fr(t)&&this.matchesComparison(Dn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends zg{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ne(e,t)}matches(e){return hi(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function hi(n){return n.op==="and"}function xl(n){return n.op==="or"}function Fu(n){return jg(n)&&hi(n)}function jg(n){for(const e of n.filters)if(e instanceof ne)return!1;return!0}function Dl(n){if(n instanceof X)return n.field.canonicalString()+n.op.toString()+ui(n.value);if(Fu(n))return n.filters.map(e=>Dl(e)).join(",");{const e=n.filters.map(t=>Dl(t)).join(",");return`${n.op}(${e})`}}function Wg(n,e){return n instanceof X?function(r,i){return i instanceof X&&r.op===i.op&&r.field.isEqual(i.field)&&Bt(r.value,i.value)}(n,e):n instanceof ne?function(r,i){return i instanceof ne&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Wg(o,i.filters[c]),!0):!1}(n,e):void B()}function Gg(n,e){const t=n.filters.concat(e);return ne.create(t,n.op)}function Kg(n){return n instanceof X?function(t){return`${t.field.canonicalString()} ${t.op} ${ui(t.value)}`}(n):n instanceof ne?function(t){return t.op.toString()+" {"+t.getFilters().map(Kg).join(" ,")+"}"}(n):"Filter"}class DR extends X{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class NR extends X{constructor(e,t){super(e,"in",t),this.keys=Hg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class VR extends X{constructor(e,t){super(e,"not-in",t),this.keys=Hg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Hg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class OR extends X{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return $s(t)&&qs(t.arrayValue,this.value)}}class Qg extends X{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&qs(this.value.arrayValue,t)}}class LR extends X{constructor(e,t){super(e,"not-in",t)}matches(e){if(qs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!qs(this.value.arrayValue,t)}}class MR extends X{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!$s(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>qs(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FR{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}}function Nl(n,e=null,t=[],r=[],i=null,s=null,o=null){return new FR(n,e,t,r,i,s,o)}function mr(n){const e=M(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Dl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),so(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ui(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ui(r)).join(",")),e.ue=t}return e.ue}function oo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!xR(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Wg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Lf(n.startAt,e.startAt)&&Lf(n.endAt,e.endAt)}function ba(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Aa(n,e){return n.filters.filter(t=>t instanceof X&&t.field.isEqual(e))}function Mf(n,e,t){let r=ca,i=!0;for(const s of Aa(n,e)){let o=ca,c=!0;switch(s.op){case"<":case"<=":o=kR(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=ca}Nf({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];Nf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function Ff(n,e,t){let r=Tn,i=!0;for(const s of Aa(n,e)){let o=Tn,c=!0;switch(s.op){case">=":case">":o=CR(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Tn}Vf({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];Vf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Jg(n,e,t,r,i,s,o,c){return new cn(n,e,t,r,i,s,o,c)}function Si(n){return new cn(n)}function Uf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Uu(n){return n.collectionGroup!==null}function ti(n){const e=M(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new re(ue.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new zs(s,r))}),t.has(ue.keyField().canonicalString())||e.ce.push(new zs(ue.keyField(),r))}return e.ce}function it(n){const e=M(n);return e.le||(e.le=UR(e,ti(n))),e.le}function UR(n,e){if(n.limitType==="F")return Nl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new zs(i.field,s)});const t=n.endAt?new Nn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Nn(n.startAt.position,n.startAt.inclusive):null;return Nl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Vl(n,e){const t=n.filters.concat([e]);return new cn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ra(n,e,t){return new cn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ao(n,e){return oo(it(n),it(e))&&n.limitType===e.limitType}function Yg(n){return`${mr(it(n))}|lt:${n.limitType}`}function Gr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Kg(i)).join(", ")}]`),so(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>ui(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>ui(i)).join(",")),`Target(${r})`}(it(n))}; limitType=${n.limitType})`}function co(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):L.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of ti(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){const u=Of(o,c,l);return o.inclusive?u<=0:u<0}(r.startAt,ti(r),i)||r.endAt&&!function(o,c,l){const u=Of(o,c,l);return o.inclusive?u>=0:u>0}(r.endAt,ti(r),i))}(n,e)}function Xg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Zg(n){return(e,t)=>{let r=!1;for(const i of ti(n)){const s=BR(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function BR(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),u=c.data.field(s);return l!==null&&u!==null?Dn(l,u):B()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Rr(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Fg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qR=new se(L.comparator);function ut(){return qR}const e_=new se(L.comparator);function fs(...n){let e=e_;for(const t of n)e=e.insert(t.key,t);return e}function t_(n){let e=e_;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Vt(){return ws()}function n_(){return ws()}function ws(){return new qn(n=>n.toString(),(n,e)=>n.isEqual(e))}const $R=new se(L.comparator),zR=new re(L.comparator);function H(...n){let e=zR;for(const t of n)e=e.add(t);return e}const jR=new re(K);function Bu(){return jR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Us(e)?"-0":e}}function r_(n){return{integerValue:""+n}}function i_(n,e){return Ng(e)?r_(e):qu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(){this._=void 0}}function WR(n,e,t){return n instanceof di?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Za(s)&&(s=Mu(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof gr?o_(n,e):n instanceof _r?a_(n,e):function(i,s){const o=s_(i,s),c=Bf(o)+Bf(i.Pe);return Cl(o)&&Cl(i.Pe)?r_(c):qu(i.serializer,c)}(n,e)}function GR(n,e,t){return n instanceof gr?o_(n,e):n instanceof _r?a_(n,e):t}function s_(n,e){return n instanceof fi?function(r){return Cl(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class di extends tc{}class gr extends tc{constructor(e){super(),this.elements=e}}function o_(n,e){const t=c_(e);for(const r of n.elements)t.some(i=>Bt(i,r))||t.push(r);return{arrayValue:{values:t}}}class _r extends tc{constructor(e){super(),this.elements=e}}function a_(n,e){let t=c_(e);for(const r of n.elements)t=t.filter(i=>!Bt(i,r));return{arrayValue:{values:t}}}class fi extends tc{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Bf(n){return le(n.integerValue||n.doubleValue)}function c_(n){return $s(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e,t){this.field=e,this.transform=t}}function KR(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof gr&&i instanceof gr||r instanceof _r&&i instanceof _r?li(r.elements,i.elements,Bt):r instanceof fi&&i instanceof fi?Bt(r.Pe,i.Pe):r instanceof di&&i instanceof di}(n.transform,e.transform)}class HR{constructor(e,t){this.version=e,this.transformResults=t}}class he{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new he}static exists(e){return new he(void 0,e)}static updateTime(e){return new he(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ua(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class nc{}function l_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ki(n.key,he.none()):new Pi(n.key,n.data,he.none());{const t=n.data,r=Be.empty();let i=new re(ue.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new ln(n.key,r,new lt(i.toArray()),he.none())}}function QR(n,e,t){n instanceof Pi?function(i,s,o){const c=i.value.clone(),l=$f(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof ln?function(i,s,o){if(!ua(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=$f(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(u_(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Es(n,e,t,r){return n instanceof Pi?function(s,o,c,l){if(!ua(s.precondition,o))return c;const u=s.value.clone(),d=zf(s.fieldTransforms,l,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(n,e,t,r):n instanceof ln?function(s,o,c,l){if(!ua(s.precondition,o))return c;const u=zf(s.fieldTransforms,l,o),d=o.data;return d.setAll(u_(s)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,o,c){return ua(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function JR(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=s_(r.transform,i||null);s!=null&&(t===null&&(t=Be.empty()),t.set(r.field,s))}return t||null}function qf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&li(r,i,(s,o)=>KR(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Pi extends nc{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ln extends nc{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function u_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function $f(n,e,t){const r=new Map;q(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,GR(o,c,t[i]))}return r}function zf(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,WR(s,o,e))}return r}class ki extends nc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class $u extends nc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&QR(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Es(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Es(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=n_();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=l_(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(j.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),H())}isEqual(e){return this.batchId===e.batchId&&li(this.mutations,e.mutations,(t,r)=>qf(t,r))&&li(this.baseMutations,e.baseMutations,(t,r)=>qf(t,r))}}class ju{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){q(e.mutations.length===r.length);let i=function(){return $R}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new ju(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YR{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe,Z;function h_(n){switch(n){default:return B();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function d_(n){if(n===void 0)return Ae("GRPC error has no .code"),P.UNKNOWN;switch(n){case Pe.OK:return P.OK;case Pe.CANCELLED:return P.CANCELLED;case Pe.UNKNOWN:return P.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return P.INTERNAL;case Pe.UNAVAILABLE:return P.UNAVAILABLE;case Pe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Pe.NOT_FOUND:return P.NOT_FOUND;case Pe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Pe.ABORTED:return P.ABORTED;case Pe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Pe.DATA_LOSS:return P.DATA_LOSS;default:return B()}}(Z=Pe||(Pe={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XR=new ar([4294967295,4294967295],0);function jf(n){const e=f_().encode(n),t=new vg;return t.update(e),new Uint8Array(t.digest())}function Wf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ar([t,r],0),new ar([i,s],0)]}class Gu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ps(`Invalid padding: ${t}`);if(r<0)throw new ps(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ps(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ps(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=ar.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(ar.fromNumber(r)));return i.compare(XR)===1&&(i=new ar([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=jf(e),[r,i]=Wf(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Gu(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;const t=jf(e),[r,i]=Wf(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ps extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,ho.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new uo(j.min(),i,new se(K),ut(),H())}}class ho{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ho(r,t,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class p_{constructor(e,t){this.targetId=e,this.me=t}}class m_{constructor(e,t,r=we.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Gf{constructor(){this.fe=0,this.ge=Hf(),this.pe=we.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=H(),t=H(),r=H();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:B()}}),new ho(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=Hf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ZR{constructor(e){this.Le=e,this.Be=new Map,this.ke=ut(),this.qe=Kf(),this.Qe=new se(K)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:B()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(ba(s))if(r===0){const o=new L(s.path);this.Ue(t,o,ae.newNoDocument(o,j.min()))}else q(r===1);else{const o=this.Ye(t);if(o!==r){const c=this.Ze(e),l=c?this.Xe(c,e,o):1;if(l!==0){this.je(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,u)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=Cn(r).toUint8Array()}catch(l){if(l instanceof Ug)return Ut("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Gu(o,i,s)}catch(l){return Ut(l instanceof ps?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const c=this.Je(o);if(c){if(s.current&&ba(c.target)){const l=new L(c.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,ae.newNoDocument(l,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let r=H();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.Je(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new uo(e,t,this.Qe,this.ke,r);return this.ke=ut(),this.qe=Kf(),this.Qe=new se(K),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Gf,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new re(K),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Gf),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Kf(){return new se(L.comparator)}function Hf(){return new se(L.comparator)}const eS={asc:"ASCENDING",desc:"DESCENDING"},tS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nS={and:"AND",or:"OR"};class rS{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ol(n,e){return n.useProto3Json||so(e)?e:{value:e}}function pi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function g_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function iS(n,e){return pi(n,e.toTimestamp())}function Re(n){return q(!!n),j.fromTimestamp(function(t){const r=nn(t);return new de(r.seconds,r.nanos)}(n))}function Ku(n,e){return Ll(n,e).canonicalString()}function Ll(n,e){const t=function(i){return new Y(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function __(n){const e=Y.fromString(n);return q(S_(e)),e}function js(n,e){return Ku(n.databaseId,e.path)}function Lt(n,e){const t=__(e);if(t.get(1)!==n.databaseId.projectId)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(I_(t))}function y_(n,e){return Ku(n.databaseId,e)}function v_(n){const e=__(n);return e.length===4?Y.emptyPath():I_(e)}function Ml(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function I_(n){return q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Qf(n,e,t){return{name:js(n,e),fields:t.value.mapValue.fields}}function w_(n,e,t){const r=Lt(n,e.name),i=Re(e.updateTime),s=e.createTime?Re(e.createTime):j.min(),o=new Be({mapValue:{fields:e.fields}}),c=ae.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function sS(n,e){return"found"in e?function(r,i){q(!!i.found),i.found.name,i.found.updateTime;const s=Lt(r,i.found.name),o=Re(i.found.updateTime),c=i.found.createTime?Re(i.found.createTime):j.min(),l=new Be({mapValue:{fields:i.found.fields}});return ae.newFoundDocument(s,o,c,l)}(n,e):"missing"in e?function(r,i){q(!!i.missing),q(!!i.readTime);const s=Lt(r,i.missing),o=Re(i.readTime);return ae.newNoDocument(s,o)}(n,e):B()}function oS(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:B()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(u,d){return u.useProto3Json?(q(d===void 0||typeof d=="string"),we.fromBase64String(d||"")):(q(d===void 0||d instanceof Buffer||d instanceof Uint8Array),we.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const d=u.code===void 0?P.UNKNOWN:d_(u.code);return new D(d,u.message||"")}(o);t=new m_(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Lt(n,r.document.name),s=Re(r.document.updateTime),o=r.document.createTime?Re(r.document.createTime):j.min(),c=new Be({mapValue:{fields:r.document.fields}}),l=ae.newFoundDocument(i,s,o,c),u=r.targetIds||[],d=r.removedTargetIds||[];t=new ha(u,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Lt(n,r.document),s=r.readTime?Re(r.readTime):j.min(),o=ae.newNoDocument(i,s),c=r.removedTargetIds||[];t=new ha([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Lt(n,r.document),s=r.removedTargetIds||[];t=new ha([],s,i,null)}else{if(!("filter"in e))return B();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new YR(i,s),c=r.targetId;t=new p_(c,o)}}return t}function Ws(n,e){let t;if(e instanceof Pi)t={update:Qf(n,e.key,e.value)};else if(e instanceof ki)t={delete:js(n,e.key)};else if(e instanceof ln)t={update:Qf(n,e.key,e.data),updateMask:dS(e.fieldMask)};else{if(!(e instanceof $u))return B();t={verify:js(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof di)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof gr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof _r)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof fi)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw B()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:iS(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:B()}(n,e.precondition)),t}function Fl(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?he.updateTime(Re(s.updateTime)):s.exists!==void 0?he.exists(s.exists):he.none()}(e.currentDocument):he.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let l=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME"),l=new di;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];l=new gr(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];l=new _r(d)}else"increment"in c?l=new fi(o,c.increment):B();const u=ue.fromServerFormat(c.fieldPath);return new lo(u,l)}(n,i)):[];if(e.update){e.update.name;const i=Lt(n,e.update.name),s=new Be({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const u=l.fieldPaths||[];return new lt(u.map(d=>ue.fromServerFormat(d)))}(e.updateMask);return new ln(i,s,o,t,r)}return new Pi(i,s,t,r)}if(e.delete){const i=Lt(n,e.delete);return new ki(i,t)}if(e.verify){const i=Lt(n,e.verify);return new $u(i,t)}return B()}function aS(n,e){return n&&n.length>0?(q(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Re(i.updateTime):Re(s);return o.isEqual(j.min())&&(o=Re(s)),new HR(o,i.transformResults||[])}(t,e))):[]}function E_(n,e){return{documents:[y_(n,e.path)]}}function T_(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=y_(n,i);const s=function(u){if(u.length!==0)return R_(ne.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(u){if(u.length!==0)return u.map(d=>function(g){return{field:Kr(g.field),direction:lS(g.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Ol(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:t,parent:i}}function b_(n){let e=v_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){q(r===1);const d=t.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];t.where&&(s=function(p){const g=A_(p);return g instanceof ne&&Fu(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(g=>function(S){return new zs(Hr(S.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,so(g)?null:g}(t.limit));let l=null;t.startAt&&(l=function(p){const g=!!p.before,I=p.values||[];return new Nn(I,g)}(t.startAt));let u=null;return t.endAt&&(u=function(p){const g=!p.before,I=p.values||[];return new Nn(I,g)}(t.endAt)),Jg(e,i,o,s,c,"F",l,u)}function cS(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function A_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Hr(t.unaryFilter.field);return X.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Hr(t.unaryFilter.field);return X.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Hr(t.unaryFilter.field);return X.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Hr(t.unaryFilter.field);return X.create(o,"!=",{nullValue:"NULL_VALUE"});default:return B()}}(n):n.fieldFilter!==void 0?function(t){return X.create(Hr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ne.create(t.compositeFilter.filters.map(r=>A_(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return B()}}(t.compositeFilter.op))}(n):B()}function lS(n){return eS[n]}function uS(n){return tS[n]}function hS(n){return nS[n]}function Kr(n){return{fieldPath:n.canonicalString()}}function Hr(n){return ue.fromServerFormat(n.fieldPath)}function R_(n){return n instanceof X?function(t){if(t.op==="=="){if(Df(t.value))return{unaryFilter:{field:Kr(t.field),op:"IS_NAN"}};if(xf(t.value))return{unaryFilter:{field:Kr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Df(t.value))return{unaryFilter:{field:Kr(t.field),op:"IS_NOT_NAN"}};if(xf(t.value))return{unaryFilter:{field:Kr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kr(t.field),op:uS(t.op),value:t.value}}}(n):n instanceof ne?function(t){const r=t.getFilters().map(i=>R_(i));return r.length===1?r[0]:{compositeFilter:{op:hS(t.op),filters:r}}}(n):B()}function dS(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function S_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t,r,i,s=j.min(),o=j.min(),c=we.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Ht(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e){this.ct=e}}function fS(n,e){let t;if(e.document)t=w_(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=L.fromSegments(e.noDocument.path),i=vr(e.noDocument.readTime);t=ae.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return B();{const r=L.fromSegments(e.unknownDocument.path),i=vr(e.unknownDocument.version);t=ae.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new de(i[0],i[1]);return j.fromTimestamp(s)}(e.readTime)),t}function Jf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Sa(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:js(s,o.key),fields:o.data.value.mapValue.fields,updateTime:pi(s,o.version.toTimestamp()),createTime:pi(s,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:yr(e.version)};else{if(!e.isUnknownDocument())return B();r.unknownDocument={path:t.path.toArray(),version:yr(e.version)}}return r}function Sa(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function yr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function vr(n){const e=new de(n.seconds,n.nanoseconds);return j.fromTimestamp(e)}function Xn(n,e){const t=(e.baseMutations||[]).map(s=>Fl(n.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>Fl(n.ct,s)),i=de.fromMillis(e.localWriteTimeMs);return new zu(e.batchId,i,t,r)}function ms(n){const e=vr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?vr(n.lastLimboFreeSnapshotVersion):j.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return q(s.documents.length===1),it(Si(v_(s.documents[0])))}(n.query):function(s){return it(b_(s))}(n.query),new Ht(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,we.fromBase64String(n.resumeToken))}function k_(n,e){const t=yr(e.snapshotVersion),r=yr(e.lastLimboFreeSnapshotVersion);let i;i=ba(e.target)?E_(n.ct,e.target):T_(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:mr(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Hu(n){const e=b_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ra(e,e.limit,"L"):e}function ol(n,e){return new Wu(e.largestBatchId,Fl(n.ct,e.overlayMutation))}function Yf(n,e){const t=e.path.lastSegment();return[n,rt(e.path.popLast()),t]}function Xf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:yr(r.readTime),documentKey:rt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pS{getBundleMetadata(e,t){return Zf(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:vr(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return Zf(e).put(function(i){return{bundleId:i.id,createTime:yr(Re(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return ep(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:Hu(s.bundledQuery),readTime:vr(s.readTime)}}(r)})}saveNamedQuery(e,t){return ep(e).put(function(i){return{name:i.name,readTime:yr(Re(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function Zf(n){return De(n,"bundles")}function ep(n){return De(n,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new rc(e,r)}getOverlay(e,t){return rs(e).get(Yf(this.userId,t)).next(r=>r?ol(this.serializer,r):null)}getOverlays(e,t){const r=Vt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const c=new Wu(t,o);i.push(this.ht(e,c))}),R.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(rt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(rs(e).j("collectionPathOverlayIndex",c))}),R.waitFor(s)}getOverlaysForCollection(e,t,r){const i=Vt(),s=rt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return rs(e).U("collectionPathOverlayIndex",o).next(c=>{for(const l of c){const u=ol(this.serializer,l);i.set(u.getKey(),u)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=Vt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return rs(e).J({index:"collectionGroupOverlayIndex",range:c},(l,u,d)=>{const p=ol(this.serializer,u);s.size()<i||p.largestBatchId===o?(s.set(p.getKey(),p),o=p.largestBatchId):d.done()}).next(()=>s)}ht(e,t){return rs(e).put(function(i,s,o){const[c,l,u]=Yf(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:u,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ws(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function rs(n){return De(n,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mS{Pt(e){return De(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?we.fromUint8Array(r):we.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(le(e.integerValue));else if("doubleValue"in e){const r=le(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),Us(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=nn(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Cn(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?Bg(e)?this.dt(t,Number.MAX_SAFE_INTEGER):ec(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):B()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",c=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(le(c)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),L.fromName(e).path.forEach(r=>{this.dt(t,60),this.Dt(r,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}Zn.vt=new Zn;function gS(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function tp(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=gS(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class _S{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=tp(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=tp(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class yS{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class vS{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class is{constructor(){this.jt=new _S,this.Ht=new yS(this.jt),this.Jt=new vS(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new er(this.indexId,this.documentKey,this.arrayValue,r)}}function _n(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=np(n.arrayValue,e.arrayValue),t!==0?t:(t=np(n.directionalValue,e.directionalValue),t!==0?t:L.comparator(n.documentKey,e.documentKey)))}function np(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e){this.Xt=new re((t,r)=>ue.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(q(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Sl(e);if(t!==void 0&&!this.sn(t))return!1;const r=Jn(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const c=this.Xt.getIterator().getNext();if(!i.has(c.field.canonicalString())){const l=r[s];if(!this.on(c,l)||!this._n(this.en[o++],l))return!1}++s}for(;s<r.length;++s){const c=r[s];if(o>=this.en.length||!this._n(this.en[o++],c))return!1}return!0}an(){if(this.nn)return null;let e=new re(ue.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new oa(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new oa(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new oa(r.field,r.dir==="asc"?0:1)));return new Ta(Ta.UNKNOWN_ID,this.collectionId,t,Fs.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C_(n){var e,t;if(q(n instanceof X||n instanceof ne),n instanceof X){if(n instanceof Qg){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>X.create(n.field,"==",s)))||[];return ne.create(i,"or")}return n}const r=n.filters.map(i=>C_(i));return ne.create(r,n.op)}function IS(n){if(n.getFilters().length===0)return[];const e=ql(C_(n));return q(x_(e)),Ul(e)||Bl(e)?[e]:e.getFilters()}function Ul(n){return n instanceof X}function Bl(n){return n instanceof ne&&Fu(n)}function x_(n){return Ul(n)||Bl(n)||function(t){if(t instanceof ne&&xl(t)){for(const r of t.getFilters())if(!Ul(r)&&!Bl(r))return!1;return!0}return!1}(n)}function ql(n){if(q(n instanceof X||n instanceof ne),n instanceof X)return n;if(n.filters.length===1)return ql(n.filters[0]);const e=n.filters.map(r=>ql(r));let t=ne.create(e,n.op);return t=Pa(t),x_(t)?t:(q(t instanceof ne),q(hi(t)),q(t.filters.length>1),t.filters.reduce((r,i)=>Qu(r,i)))}function Qu(n,e){let t;return q(n instanceof X||n instanceof ne),q(e instanceof X||e instanceof ne),t=n instanceof X?e instanceof X?function(i,s){return ne.create([i,s],"and")}(n,e):ip(n,e):e instanceof X?ip(e,n):function(i,s){if(q(i.filters.length>0&&s.filters.length>0),hi(i)&&hi(s))return Gg(i,s.getFilters());const o=xl(i)?i:s,c=xl(i)?s:i,l=o.filters.map(u=>Qu(u,c));return ne.create(l,"or")}(n,e),Pa(t)}function ip(n,e){if(hi(e))return Gg(e,n.getFilters());{const t=e.filters.map(r=>Qu(n,r));return ne.create(t,"or")}}function Pa(n){if(q(n instanceof X||n instanceof ne),n instanceof X)return n;const e=n.getFilters();if(e.length===1)return Pa(e[0]);if(jg(n))return n;const t=e.map(i=>Pa(i)),r=[];return t.forEach(i=>{i instanceof X?r.push(i):i instanceof ne&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ne.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wS{constructor(){this.un=new Ju}addToCollectionParentIndex(e,t){return this.un.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(gt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(gt.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class Ju{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new re(Y.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new re(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo=new Uint8Array(0);class ES{constructor(e,t){this.databaseId=t,this.cn=new Ju,this.ln=new qn(r=>mr(r),(r,i)=>oo(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:r,parent:rt(i)};return sp(e).put(s)}return R.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[Sg(t),""],!1,!0);return sp(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(Nt(o.parent))}return r})}addFieldIndex(e,t){const r=ss(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=$r(e);return s.next(c=>{o.put(Xf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=ss(e),i=$r(e),s=qr(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=ss(e),r=qr(e),i=$r(e);return t.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,t){return R.forEach(this.hn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new rp(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=qr(e);let i=!0;const s=new Map;return R.forEach(this.hn(t),o=>this.Pn(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=H();const c=[];return R.forEach(s,(l,u)=>{N("IndexedDbIndexManager",`Using index ${function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map(W=>`${W.fieldPath}:${W.kind}`).join(",")}`}(l)} to execute ${mr(t)}`);const d=function(F,W){const Q=Sl(W);if(Q===void 0)return null;for(const G of Aa(F,Q.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null}(u,l),p=function(F,W){const Q=new Map;for(const G of Jn(W))for(const w of Aa(F,G.fieldPath))switch(w.op){case"==":case"in":Q.set(G.fieldPath.canonicalString(),w.value);break;case"not-in":case"!=":return Q.set(G.fieldPath.canonicalString(),w.value),Array.from(Q.values())}return null}(u,l),g=function(F,W){const Q=[];let G=!0;for(const w of Jn(W)){const _=w.kind===0?Mf(F,w.fieldPath,F.startAt):Ff(F,w.fieldPath,F.startAt);Q.push(_.value),G&&(G=_.inclusive)}return new Nn(Q,G)}(u,l),I=function(F,W){const Q=[];let G=!0;for(const w of Jn(W)){const _=w.kind===0?Ff(F,w.fieldPath,F.endAt):Mf(F,w.fieldPath,F.endAt);Q.push(_.value),G&&(G=_.inclusive)}return new Nn(Q,G)}(u,l),S=this.In(l,u,g),x=this.In(l,u,I),C=this.Tn(l,u,p),U=this.En(l.indexId,d,S,g.inclusive,x,I.inclusive,C);return R.forEach(U,z=>r.G(z,t.limit).next(F=>{F.forEach(W=>{const Q=L.fromSegments(W.documentKey);o.has(Q)||(o=o.add(Q),c.push(Q))})}))}).next(()=>c)}return R.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=IS(ne.create(e.filters,"and")).map(r=>Nl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,r,i,s,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),u=l/(t!=null?t.length:1),d=[];for(let p=0;p<l;++p){const g=t?this.dn(t[p/u]):zo,I=this.An(e,g,r[p%u],i),S=this.Rn(e,g,s[p%u],o),x=c.map(C=>this.An(e,g,C,!0));d.push(...this.createRange(I,S,x))}return d}An(e,t,r,i){const s=new er(e,L.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new er(e,L.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new rp(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)r.rn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const i=this.hn(t);return R.forEach(i,s=>this.Pn(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let u=new re(ue.comparator),d=!1;for(const p of l.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?d=!0:u=u.add(g.field));for(const p of l.orderBy)p.field.isKeyField()||(u=u.add(p.field));return u.size+(d?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}Vn(e,t){const r=new is;for(const i of Jn(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);Zn.vt.It(s,o)}return r.zt()}dn(e){const t=new is;return Zn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new is;return Zn.vt.It(pr(this.databaseId,t),r.Yt(function(s){const o=Jn(s);return o.length===0?0:o[o.length-1].kind}(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new is);let s=0;for(const o of Jn(e)){const c=r[s++];for(const l of i)if(this.fn(t,o.fieldPath)&&$s(c))i=this.gn(i,o,c);else{const u=l.Yt(o.kind);Zn.vt.It(c,u)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const c of i){const l=new is;l.seed(c.zt()),Zn.vt.It(o,l.Yt(t.kind)),s.push(l)}return s}fn(e,t){return!!e.filters.find(r=>r instanceof X&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=ss(e),i=$r(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next(s=>{const o=[];return R.forEach(s,c=>i.get([c.indexId,this.uid]).next(l=>{o.push(function(d,p){const g=p?new Fs(p.sequenceNumber,new gt(vr(p.readTime),new L(Nt(p.documentKey)),p.largestBatchId)):Fs.empty(),I=d.fields.map(([S,x])=>new oa(ue.fromServerFormat(S),x));return new Ta(d.indexId,d.collectionGroup,I,g)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:K(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=ss(e),s=$r(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>R.forEach(c,l=>s.put(Xf(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return R.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?R.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),R.forEach(c,l=>this.wn(e,i,l).next(u=>{const d=this.Sn(s,l);return u.isEqual(d)?R.resolve():this.bn(e,s,l,u,d)}))))})}Dn(e,t,r,i){return qr(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return qr(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=qr(e);let s=new re(_n);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},(o,c)=>{s=s.add(new er(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Sn(e,t){let r=new re(_n);const i=this.Vn(t,e);if(i==null)return r;const s=Sl(t);if(s!=null){const o=e.data.field(s.fieldPath);if($s(o))for(const c of o.arrayValue.values||[])r=r.add(new er(t.indexId,e.key,this.dn(c),i))}else r=r.add(new er(t.indexId,e.key,zo,i));return r}bn(e,t,r,i,s){N("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(l,u,d,p,g){const I=l.getIterator(),S=u.getIterator();let x=Br(I),C=Br(S);for(;x||C;){let U=!1,z=!1;if(x&&C){const F=d(x,C);F<0?z=!0:F>0&&(U=!0)}else x!=null?z=!0:U=!0;U?(p(C),C=Br(S)):z?(g(x),x=Br(I)):(x=Br(I),C=Br(S))}}(i,s,_n,c=>{o.push(this.Dn(e,t,r,c))},c=>{o.push(this.vn(e,t,r,c))}),R.waitFor(o)}yn(e){let t=1;return $r(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>_n(o,c)).filter((o,c,l)=>!c||_n(o,l[c-1])!==0);const i=[];i.push(e);for(const o of r){const c=_n(o,e),l=_n(o,t);if(c===0)i[0]=e.Zt();else if(c>0&&l<0)i.push(o),i.push(o.Zt());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,zo,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,zo,[]];s.push(IDBKeyRange.bound(c,l))}return s}Cn(e,t){return _n(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(op)}getMinOffset(e,t){return R.mapArray(this.hn(t),r=>this.Pn(e,r).next(i=>i||B())).next(op)}}function sp(n){return De(n,"collectionParents")}function qr(n){return De(n,"indexEntries")}function ss(n){return De(n,"indexConfiguration")}function $r(n){return De(n,"indexState")}function op(n){q(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Vu(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new gt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class at{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new at(e,at.DEFAULT_COLLECTION_PERCENTILE,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.J({range:o},(d,p,g)=>(c++,g.delete()));s.push(l.next(()=>{q(c===1)}));const u=[];for(const d of t.mutations){const p=Vg(e,d.key.path,t.batchId);s.push(i.delete(p)),u.push(d.key)}return R.waitFor(s).next(()=>u)}function ka(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw B();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */at.DEFAULT_COLLECTION_PERCENTILE=10,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,at.DEFAULT=new at(41943040,at.DEFAULT_COLLECTION_PERCENTILE,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),at.DISABLED=new at(-1,0,0);class ic{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new ic(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=Qr(e),o=yn(e);return o.add({}).next(c=>{q(typeof c=="number");const l=new zu(c,t,r,i),u=function(I,S,x){const C=x.baseMutations.map(z=>Ws(I.ct,z)),U=x.mutations.map(z=>Ws(I.ct,z));return{userId:S,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:C,mutations:U}}(this.serializer,this.userId,l),d=[];let p=new re((g,I)=>K(g.canonicalString(),I.canonicalString()));for(const g of i){const I=Vg(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),d.push(o.put(u)),d.push(s.put(I,cR))}return p.forEach(g=>{d.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Fn[c]=l.keys()}),R.waitFor(d).next(()=>l)})}lookupMutationBatch(e,t){return yn(e).get(t).next(r=>r?(q(r.userId===this.userId),Xn(this.serializer,r)):null)}Mn(e,t){return this.Fn[t]?R.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return yn(e).J({index:"userMutationsIndex",range:i},(o,c,l)=>{c.userId===this.userId&&(q(c.batchId>=r),s=Xn(this.serializer,c)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return yn(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).U("userMutationsIndex",t).next(r=>r.map(i=>Xn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=aa(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Qr(e).J({range:i},(o,c,l)=>{const[u,d,p]=o,g=Nt(d);if(u===this.userId&&t.path.isEqual(g))return yn(e).get(p).next(I=>{if(!I)throw B();q(I.userId===this.userId),s.push(Xn(this.serializer,I))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new re(K);const i=[];return t.forEach(s=>{const o=aa(this.userId,s.path),c=IDBKeyRange.lowerBound(o),l=Qr(e).J({range:c},(u,d,p)=>{const[g,I,S]=u,x=Nt(I);g===this.userId&&s.path.isEqual(x)?r=r.add(S):p.done()});i.push(l)}),R.waitFor(i).next(()=>this.xn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=aa(this.userId,r),o=IDBKeyRange.lowerBound(s);let c=new re(K);return Qr(e).J({range:o},(l,u,d)=>{const[p,g,I]=l,S=Nt(g);p===this.userId&&r.isPrefixOf(S)?S.length===i&&(c=c.add(I)):d.done()}).next(()=>this.xn(e,c))}xn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(yn(e).get(s).next(o=>{if(o===null)throw B();q(o.userId===this.userId),r.push(Xn(this.serializer,o))}))}),R.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return D_(e._e,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),R.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return R.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Qr(e).J({range:r},(s,o,c)=>{if(s[0]===this.userId){const l=Nt(s[1]);i.push(l)}else c.done()}).next(()=>{q(i.length===0)})})}containsKey(e,t){return N_(e,this.userId,t)}Nn(e){return V_(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function N_(n,e,t){const r=aa(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Qr(n).J({range:s,H:!0},(c,l,u)=>{const[d,p,g]=c;d===e&&p===i&&(o=!0),u.done()}).next(()=>o)}function yn(n){return De(n,"mutations")}function Qr(n){return De(n,"documentMutations")}function V_(n){return De(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ir(0)}static kn(){return new Ir(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const r=new Ir(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>j.fromTimestamp(new de(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>zr(e).delete(t.targetId)).next(()=>this.qn(e)).next(r=>(q(r.targetCount>0),r.targetCount-=1,this.Qn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return zr(e).J((o,c)=>{const l=ms(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>R.waitFor(s)).next(()=>i)}forEachTarget(e,t){return zr(e).J((r,i)=>{const s=ms(i);t(s)})}qn(e){return cp(e).get("targetGlobalKey").next(t=>(q(t!==null),t))}Qn(e,t){return cp(e).put("targetGlobalKey",t)}Kn(e,t){return zr(e).put(k_(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=mr(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return zr(e).J({range:i,index:"queryTargetsIndex"},(o,c,l)=>{const u=ms(c);oo(t,u.target)&&(s=u,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=vn(e);return t.forEach(o=>{const c=rt(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),R.waitFor(i)}removeMatchingKeys(e,t,r){const i=vn(e);return R.forEach(t,s=>{const o=rt(s.path);return R.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=vn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=vn(e);let s=H();return i.J({range:r,H:!0},(o,c,l)=>{const u=Nt(o[1]),d=new L(u);s=s.add(d)}).next(()=>s)}containsKey(e,t){const r=rt(t.path),i=IDBKeyRange.bound([r],[Sg(r)],!1,!0);let s=0;return vn(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],l,u)=>{o!==0&&(s++,u.done())}).next(()=>s>0)}ot(e,t){return zr(e).get(t).next(r=>r?ms(r):null)}}function zr(n){return De(n,"targets")}function cp(n){return De(n,"targetGlobal")}function vn(n){return De(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp([n,e],[t,r]){const i=K(n,t);return i===0?K(e,r):i}class bS{constructor(e){this.Un=e,this.buffer=new re(lp),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();lp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class AS{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){N("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Bn(t)?N("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Un(t)}await this.Hn(3e5)})}}class RS{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(ct.oe);const r=new bS(t);return this.Jn.forEachTarget(e,i=>r.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>r.zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(ap)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ap):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,c,l,u;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(u=Date.now(),Wr()<=J.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(u-l)+`ms
Total Duration: ${u-d}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function SS(n,e){return new RS(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PS{constructor(e,t){this.db=e,this.garbageCollector=SS(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(r,i)=>t(i))}addReference(e,t,r){return jo(e,r)}removeReference(e,t,r){return jo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return jo(e,t)}nr(e,t){return function(i,s){let o=!1;return V_(i).Y(c=>N_(i,c,s).next(l=>(l&&(o=!0),R.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,c)=>{if(c<=t){const l=this.nr(e,o).next(u=>{if(!u)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,j.min()),vn(e).delete(function(p){return[0,rt(p.path)]}(o))))});i.push(l)}}).next(()=>R.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return jo(e,t)}tr(e,t){const r=vn(e);let i,s=ct.oe;return r.J({index:"documentTargetsIndex"},([o,c],{path:l,sequenceNumber:u})=>{o===0?(s!==ct.oe&&t(new L(Nt(i)),s),s=u,i=l):s=ct.oe}).next(()=>{s!==ct.oe&&t(new L(Nt(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function jo(n,e){return vn(n).put(function(r,i){return{targetId:0,path:rt(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(){this.changes=new qn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kS{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Hn(e).put(r)}removeEntry(e,t,r){return Hn(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Sa(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.rr(e,r)))}getEntry(e,t){let r=ae.newInvalidDocument(t);return Hn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(os(t))},(i,s)=>{r=this.ir(t,s)}).next(()=>r)}sr(e,t){let r={size:0,document:ae.newInvalidDocument(t)};return Hn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(os(t))},(i,s)=>{r={document:this.ir(t,s),size:ka(s)}}).next(()=>r)}getEntries(e,t){let r=ut();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)}).next(()=>r)}ar(e,t){let r=ut(),i=new se(L.comparator);return this._r(e,t,(s,o)=>{const c=this.ir(s,o);r=r.insert(s,c),i=i.insert(s,ka(o))}).next(()=>({documents:r,ur:i}))}_r(e,t,r){if(t.isEmpty())return R.resolve();let i=new re(dp);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(os(i.first()),os(i.last())),o=i.getIterator();let c=o.getNext();return Hn(e).J({index:"documentKeyIndex",range:s},(l,u,d)=>{const p=L.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;c&&dp(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,u),c=o.hasNext()?o.getNext():null),c?d.$(os(c)):d.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Sa(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Hn(e).U(IDBKeyRange.bound(c,l,!0)).next(u=>{s==null||s.incrementDocumentReadCount(u.length);let d=ut();for(const p of u){const g=this.ir(L.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(co(t,g)||i.has(g.key))&&(d=d.insert(g.key,g))}return d})}getAllFromCollectionGroup(e,t,r,i){let s=ut();const o=hp(t,r),c=hp(t,gt.max());return Hn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(l,u,d)=>{const p=this.ir(L.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);s=s.insert(p.key,p),s.size===i&&d.done()}).next(()=>s)}newChangeBuffer(e){return new CS(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return up(e).get("remoteDocumentGlobalKey").next(t=>(q(!!t),t))}rr(e,t){return up(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=fS(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(j.min())))return r}return ae.newInvalidDocument(e)}}function L_(n){return new kS(n)}class CS extends O_{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new qn(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new re((s,o)=>K(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,c.readTime)),o.isValidDocument()){const l=Jf(this.cr.serializer,o);i=i.add(s.path.popLast());const u=ka(l);r+=u-c.size,t.push(this.cr.addEntry(e,s,l))}else if(r-=c.size,this.trackRemovals){const l=Jf(this.cr.serializer,o.convertToNoDocument(j.min()));t.push(this.cr.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,r)),R.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:r,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function up(n){return De(n,"remoteDocumentGlobal")}function Hn(n){return De(n,"remoteDocumentsV14")}function os(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function hp(n,e){const t=e.documentKey.path.toArray();return[n,Sa(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function dp(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=K(t[s],r[s]),i)return i;return i=K(t.length,r.length),i||(i=K(t[t.length-2],r[r.length-2]),i||K(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Es(r.mutation,i,lt.empty(),de.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,H()).next(()=>r))}getLocalViewOfDocuments(e,t,r=H()){const i=Vt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=fs();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Vt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,H()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=ut();const o=ws(),c=function(){return ws()}();return t.forEach((l,u)=>{const d=r.get(u.key);i.has(u.key)&&(d===void 0||d.mutation instanceof ln)?s=s.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),Es(d.mutation,u,d.mutation.getFieldMask(),de.now())):o.set(u.key,lt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((u,d)=>o.set(u,d)),t.forEach((u,d)=>{var p;return c.set(u,new xS(d,(p=o.get(u))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=ws();let i=new se((o,c)=>o-c),s=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=t.get(l);if(u===null)return;let d=r.get(l)||lt.empty();d=c.applyToLocalView(u,d),r.set(l,d);const p=(i.get(c.batchId)||H()).add(l);i=i.insert(c.batchId,p)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,d=l.value,p=n_();d.forEach(g=>{if(!s.has(g)){const I=l_(t.get(g),r.get(g));I!==null&&p.set(g,I),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return R.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Uu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):R.resolve(Vt());let c=-1,l=s;return o.next(u=>R.forEach(u,(d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(d)?R.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{l=l.insert(d,g)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,l,u,H())).next(d=>({batchId:c,changes:t_(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let i=fs();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=fs();return this.indexManager.getCollectionParents(e,s).next(c=>R.forEach(c,l=>{const u=function(p,g){return new cn(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r,i).next(d=>{d.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,ae.newInvalidDocument(d)))});let c=fs();return o.forEach((l,u)=>{const d=s.get(l);d!==void 0&&Es(d.mutation,u,lt.empty(),de.now()),co(t,u)&&(c=c.insert(l,u))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DS{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return R.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Re(i.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:Hu(i.bundledQuery),readTime:Re(i.readTime)}}(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(){this.overlays=new se(L.comparator),this.Ir=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Vt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const i=Vt(),s=t.length+1,o=new L(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return R.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new se((u,d)=>u-d);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let d=s.get(u.largestBatchId);d===null&&(d=Vt(),s=s.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const c=Vt(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,d)=>c.set(u,d)),!(c.size()>=i)););return R.resolve(c)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Wu(t,r));let s=this.Ir.get(t);s===void 0&&(s=H(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VS{constructor(){this.sessionToken=we.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(){this.Tr=new re(Ne.Er),this.dr=new re(Ne.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new Ne(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new Ne(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new L(new Y([])),r=new Ne(t,e),i=new Ne(t,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new Y([])),r=new Ne(t,e),i=new Ne(t,e+1);let s=H();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Ne(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ne{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||K(e.wr,t.wr)}static Ar(e,t){return K(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new re(Ne.Er)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new zu(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.br=this.br.add(new Ne(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(e,t){return R.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return R.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ne(t,0),i=new Ne(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const c=this.Dr(o.wr);s.push(c)}),R.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new re(K);return t.forEach(i=>{const s=new Ne(i,0),o=new Ne(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],c=>{r=r.add(c.wr)})}),R.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;L.isDocumentKey(s)||(s=s.child(""));const o=new Ne(new L(s),0);let c=new re(K);return this.br.forEachWhile(l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===i&&(c=c.add(l.wr)),!0)},o),R.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return R.forEach(t.mutations,i=>{const s=new Ne(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new Ne(t,0),i=this.br.firstAfterOrEqual(r);return R.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LS{constructor(e){this.Mr=e,this.docs=function(){return new se(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():ae.newInvalidDocument(t))}getEntries(e,t){let r=ut();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ae.newInvalidDocument(i))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=ut();const o=t.path,c=new L(o.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:d}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||Vu(kg(d),r)<=0||(i.has(d.key)||co(t,d))&&(s=s.insert(d.key,d.mutableCopy()))}return R.resolve(s)}getAllFromCollectionGroup(e,t,r,i){B()}Or(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new MS(this)}getSize(e){return R.resolve(this.size)}}class MS extends O_{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(e){this.persistence=e,this.Nr=new qn(t=>mr(t),oo),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Yu,this.targetCount=0,this.kr=Ir.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),R.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Ir(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Kn(t),R.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),R.waitFor(s).next(()=>i)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),R.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,t){this.qr={},this.overlays={},this.Qr=new ct(0),this.Kr=!1,this.Kr=!0,this.$r=new VS,this.referenceDelegate=e(this),this.Ur=new FS(this),this.indexManager=new wS,this.remoteDocumentCache=function(i){return new LS(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new P_(t),this.Gr=new DS(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new NS,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new OS(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const i=new US(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return R.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class US extends xg{constructor(e){super(),this.currentSequenceNumber=e}}class sc{constructor(e){this.persistence=e,this.Jr=new Yu,this.Yr=null}static Zr(e){return new sc(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),R.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.Xr,r=>{const i=L.fromPath(r);return this.ei(e,i).next(s=>{s||t.removeEntry(i,j.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return R.or([()=>R.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BS{constructor(e){this.serializer=e}O(e,t,r,i){const s=new Xa("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Rf,{unique:!0}),l.createObjectStore("documentMutations")}(e),fp(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=R.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),fp(e)),o=o.next(()=>function(l){const u=l.store("targetGlobal"),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:j.min().toTimestamp(),targetCount:0};return u.put("targetGlobalKey",d)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,u){return u.store("mutations").U().next(d=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Rf,{unique:!0});const p=u.store("mutations"),g=d.map(I=>p.put(I));return R.waitFor(g)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.ni(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),r<7&&i>=7&&(o=o.next(()=>this.ii(s))),r<8&&i>=8&&(o=o.next(()=>this.si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.oi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const u=l.createObjectStore("documentOverlays",{keyPath:IR});u.createIndex("collectionPathOverlayIndex",wR,{unique:!1}),u.createIndex("collectionGroupOverlayIndex",ER,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const u=l.createObjectStore("remoteDocumentsV14",{keyPath:lR});u.createIndex("documentKeyIndex",uR),u.createIndex("collectionGroupIndex",hR)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:gR}).createIndex("sequenceNumberIndex",_R,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:yR}).createIndex("documentKeyIndex",vR,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((r,i)=>{t+=ka(i)}).next(()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next(i=>R.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(c=>R.forEach(c,l=>{q(l.userId===s.userId);const u=Xn(this.serializer,l);return D_(e,s.userId,u).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.J((o,c)=>{const l=new Y(o),u=function(p){return[0,rt(p)]}(l);s.push(t.get(u).next(d=>d?R.resolve():(p=>t.put({targetId:0,path:rt(p),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>R.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:mR});const r=t.store("collectionParents"),i=new Ju,s=o=>{if(i.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:rt(l)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{const l=new Y(o);return s(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,l],u)=>{const d=Nt(c);return s(d.popLast())}))}oi(e){const t=e.store("targets");return t.J((r,i)=>{const s=ms(i),o=k_(this.serializer,s);return t.put(o)})}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J((s,o)=>{const c=t.store("remoteDocumentsV14"),l=function(p){return p.document?new L(Y.fromString(p.document.name).popFirst(5)):p.noDocument?L.fromSegments(p.noDocument.path):p.unknownDocument?L.fromSegments(p.unknownDocument.path):B()}(o).path.toArray(),u={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(u))}).next(()=>R.waitFor(i))}ai(e,t){const r=t.store("mutations"),i=L_(this.serializer),s=new F_(sc.Zr,this.serializer.ct);return r.U().next(o=>{const c=new Map;return o.forEach(l=>{var u;let d=(u=c.get(l.userId))!==null&&u!==void 0?u:H();Xn(this.serializer,l).keys().forEach(p=>d=d.add(p)),c.set(l.userId,d)}),R.forEach(c,(l,u)=>{const d=new Ve(u),p=rc.lt(this.serializer,d),g=s.getIndexManager(d),I=ic.lt(d,this.serializer,g,s.referenceDelegate);return new M_(i,I,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Pl(t,ct.oe),l).next()})})}}function fp(n){n.createObjectStore("targetDocuments",{keyPath:fR}).createIndex("documentTargetsIndex",pR,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",dR,{unique:!0}),n.createObjectStore("targetGlobal")}const al="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Xu{constructor(e,t,r,i,s,o,c,l,u,d,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=c,this.ci=u,this.li=d,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=g=>Promise.resolve(),!Xu.D())throw new D(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new PS(this,i),this.Ai=t+"main",this.serializer=new P_(l),this.Ri=new Ot(this.Ai,this.hi,new BS(this.serializer)),this.$r=new mS,this.Ur=new TS(this.referenceDelegate,this.serializer),this.remoteDocumentCache=L_(this.serializer),this.Gr=new pS,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,d===!1&&Ae("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,al);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new ct(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Wo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(Bn(e))return N("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return as(e).get("owner").next(t=>R.resolve(this.vi(t)))}Ci(e){return Wo(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=De(t,"clientMetadata");return r.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return R.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?R.resolve(!0):as(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,al);return!1}}return!(!this.networkEnabled||!this.inForeground)||Wo(e).U().next(r=>this.xi(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&N("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new Pl(e,ct.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Wo(e).U().next(t=>this.xi(t,18e5).map(r=>r.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return ic.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new ES(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return rc.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){N("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?AR:l===16?bR:l===15?Lu:l===14?Mg:l===13?Lg:l===12?TR:l===11?Og:void B()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,c=>(o=new Pl(c,this.Qr?this.Qr.next():ct.oe),t==="readwrite-primary"?this.wi(o).next(l=>!!l||this.Si(o)).next(l=>{if(!l)throw Ae(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new D(P.FAILED_PRECONDITION,Cg);return r(o)}).next(l=>this.Di(o).next(()=>l)):this.Ki(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ki(e){return as(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(P.FAILED_PRECONDITION,al)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return as(e).put("owner",t)}static D(){return Ot.D()}bi(e){const t=as(e);return t.get("owner").next(r=>this.vi(r)?(N("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):R.resolve())}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ae(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;om()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return N("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Ae("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Ae("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function as(n){return De(n,"owner")}function Wo(n){return De(n,"clientMetadata")}function Zu(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=H(),i=H();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new eh(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return om()?8:Dg(me())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new qS;return this.Xi(e,t,o).next(c=>{if(s.result=c,this.zi)return this.es(e,t,o,c.size)})}).next(()=>s.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(Wr()<=J.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Gr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),R.resolve()):(Wr()<=J.DEBUG&&N("QueryEngine","Query:",Gr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Wr()<=J.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Gr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,it(t))):R.resolve())}Yi(e,t){if(Uf(t))return R.resolve(null);let r=it(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Ra(t,null,"F"),r=it(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=H(...s);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const u=this.ts(t,c);return this.ns(t,u,o,l.readTime)?this.Yi(e,Ra(t,null,"F")):this.rs(e,u,t,l)}))})))}Zi(e,t,r,i){return Uf(t)||i.isEqual(j.min())?R.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?R.resolve(null):(Wr()<=J.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Gr(t)),this.rs(e,o,t,Pg(i,-1)).next(c=>c))})}ts(e,t){let r=new re(Zg(e));return t.forEach((i,s)=>{co(e,s)&&(r=r.add(s))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return Wr()<=J.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Gr(t)),this.Ji.getDocumentsMatchingQuery(e,t,gt.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $S{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new se(K),this._s=new qn(s=>mr(s),oo),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new M_(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function B_(n,e,t,r){return new $S(n,e,t,r)}async function q_(n,e){const t=M(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let l=H();for(const u of i){o.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}for(const u of s){c.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}return t.localDocuments.getDocuments(r,l).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:c}))})})}function zS(n,e){const t=M(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,l,u,d){const p=u.batch,g=p.keys();let I=R.resolve();return g.forEach(S=>{I=I.next(()=>d.getEntry(l,S)).next(x=>{const C=u.docVersions.get(S);q(C!==null),x.version.compareTo(C)<0&&(p.applyToRemoteDocument(x,u),x.isValidDocument()&&(x.setReadTime(u.commitVersion),d.addEntry(x)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=H();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function $_(n){const e=M(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function jS(n,e){const t=M(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const c=[];e.targetChanges.forEach((d,p)=>{const g=i.get(p);if(!g)return;c.push(t.Ur.removeMatchingKeys(s,d.removedDocuments,p).next(()=>t.Ur.addMatchingKeys(s,d.addedDocuments,p)));let I=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?I=I.withResumeToken(we.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):d.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(d.resumeToken,r)),i=i.insert(p,I),function(x,C,U){return x.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(g,I,d)&&c.push(t.Ur.updateTargetData(s,I))});let l=ut(),u=H();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,d))}),c.push(z_(s,o,e.documentUpdates).next(d=>{l=d.Ps,u=d.Is})),!r.isEqual(j.min())){const d=t.Ur.getLastRemoteSnapshotVersion(s).next(p=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(d)}return R.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,u)).next(()=>l)}).then(s=>(t.os=i,s))}function z_(n,e,t){let r=H(),i=H();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=ut();return t.forEach((c,l)=>{const u=s.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(j.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):N("LocalStore","Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Ps:o,Is:i}})}function WS(n,e){const t=M(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function mi(n,e){const t=M(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Ur.getTargetData(r,e).next(s=>s?(i=s,R.resolve(i)):t.Ur.allocateTargetId(r).next(o=>(i=new Ht(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function gi(n,e,t){const r=M(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Bn(o))throw o;N("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Ca(n,e,t){const r=M(n);let i=j.min(),s=H();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,d){const p=M(l),g=p._s.get(d);return g!==void 0?R.resolve(p.os.get(g)):p.Ur.getTargetData(u,d)}(r,o,it(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:j.min(),t?s:H())).next(c=>(G_(r,Xg(e),c),{documents:c,Ts:s})))}function j_(n,e){const t=M(n),r=M(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function W_(n,e){const t=M(n),r=t.us.get(e)||j.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,Pg(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(G_(t,e,i),i))}function G_(n,e,t){let r=n.us.get(e)||j.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.us.set(e,r)}async function GS(n,e,t,r){const i=M(n);let s=H(),o=ut();for(const u of t){const d=e.Es(u.metadata.name);u.document&&(s=s.add(d));const p=e.ds(u);p.setReadTime(e.As(u.metadata.readTime)),o=o.insert(d,p)}const c=i.cs.newChangeBuffer({trackRemovals:!0}),l=await mi(i,function(d){return it(Si(Y.fromString(`__bundle__/docs/${d}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",u=>z_(u,c,o).next(d=>(c.apply(u),d)).next(d=>i.Ur.removeMatchingKeysForTargetId(u,l.targetId).next(()=>i.Ur.addMatchingKeys(u,s,l.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(u,d.Ps,d.Is)).next(()=>d.Ps)))}async function KS(n,e,t=H()){const r=await mi(n,it(Hu(e.bundledQuery))),i=M(n);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=Re(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const c=r.withResumeToken(we.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(c.targetId,c),i.Ur.updateTargetData(s,c).next(()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId)).next(()=>i.Ur.addMatchingKeys(s,t,r.targetId)).next(()=>i.Gr.saveNamedQuery(s,e))})}function pp(n,e){return`firestore_clients_${n}_${e}`}function mp(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function cl(n,e){return`firestore_targets_${n}_${e}`}class xa{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new D(i.error.code,i.error.message))),o?new xa(e,t,i.state,s):(Ae("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ts{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new D(r.error.code,r.error.message))),s?new Ts(e,r.state,i):(Ae("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Da{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Bu();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=Ng(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new Da(e,s):(Ae("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class th{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new th(t.clientId,t.onlineState):(Ae("SharedClientState",`Failed to parse online state: ${e}`),null)}}class $l{constructor(){this.activeTargetIds=Bu()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ll{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new se(K),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=pp(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new $l),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(pp(this.persistenceKey,r));if(i){const s=Da.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(cl(this.persistenceKey,e));if(i){const s=Ts.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(cl(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N("SharedClientState","READ",e,t),t}setItem(e,t){N("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){N("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(N("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void Ae("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=function(s){let o=ct.oe;if(s!=null)try{const c=JSON.parse(s);q(typeof c=="number"),o=c}catch(c){Ae("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==ct.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new xa(this.currentUser,e,t,r),s=mp(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=mp(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=cl(this.persistenceKey,e),s=new Ts(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return Da.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return xa.Rs(new Ve(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return Ts.Rs(i,t)}Ls(e){return th.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);N("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],c=[];return s.forEach(l=>{i.has(l)||o.push(l)}),i.forEach(l=>{s.has(l)||c.push(l)}),this.syncEngine.io(o,c).then(()=>{this.Ss=r})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=Bu();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class K_{constructor(){this.so=new $l,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new $l,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Go=null;function ul(){return Go===null?Go=function(){return 268435456+Math.round(2147483648*Math.random())}():Go++,"0x"+Go.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="WebChannelConnection";class YS extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const c=ul(),l=this.xo(t,r.toUriEncodedString());N("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,s,o),this.No(t,l,u,i).then(d=>(N("RestConnection",`Received RPC '${t}' ${c}: `,d),d),d=>{throw Ut("RestConnection",`RPC '${t}' ${c} failed with error: `,d,"url: ",l,"request:",i),d})}Lo(t,r,i,s,o,c){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ri}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,r){const i=QS[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=ul();return new Promise((o,c)=>{const l=new Ig;l.setWithCredentials(!0),l.listenOnce(wg.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case sa.NO_ERROR:const d=l.getResponseJson();N(He,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(d)),o(d);break;case sa.TIMEOUT:N(He,`RPC '${e}' ${s} timed out`),c(new D(P.DEADLINE_EXCEEDED,"Request time out"));break;case sa.HTTP_ERROR:const p=l.getStatus();if(N(He,`RPC '${e}' ${s} failed with status:`,p,"response text:",l.getResponseText()),p>0){let g=l.getResponseJson();Array.isArray(g)&&(g=g[0]);const I=g==null?void 0:g.error;if(I&&I.status&&I.message){const S=function(C){const U=C.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(U)>=0?U:P.UNKNOWN}(I.status);c(new D(S,I.message))}else c(new D(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new D(P.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{N(He,`RPC '${e}' ${s} completed.`)}});const u=JSON.stringify(i);N(He,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",u,r,15)})}Bo(e,t,r){const i=ul(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=bg(),c=Tg(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const d=s.join("");N(He,`Creating RPC '${e}' stream ${i}: ${d}`,l);const p=o.createWebChannel(d,l);let g=!1,I=!1;const S=new JS({Io:C=>{I?N(He,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(g||(N(He,`Opening RPC '${e}' stream ${i} transport.`),p.open(),g=!0),N(He,`RPC '${e}' stream ${i} sending:`,C),p.send(C))},To:()=>p.close()}),x=(C,U,z)=>{C.listen(U,F=>{try{z(F)}catch(W){setTimeout(()=>{throw W},0)}})};return x(p,ds.EventType.OPEN,()=>{I||(N(He,`RPC '${e}' stream ${i} transport opened.`),S.yo())}),x(p,ds.EventType.CLOSE,()=>{I||(I=!0,N(He,`RPC '${e}' stream ${i} transport closed`),S.So())}),x(p,ds.EventType.ERROR,C=>{I||(I=!0,Ut(He,`RPC '${e}' stream ${i} transport errored:`,C),S.So(new D(P.UNAVAILABLE,"The operation could not be completed")))}),x(p,ds.EventType.MESSAGE,C=>{var U;if(!I){const z=C.data[0];q(!!z);const F=z,W=F.error||((U=F[0])===null||U===void 0?void 0:U.error);if(W){N(He,`RPC '${e}' stream ${i} received error:`,W);const Q=W.status;let G=function(v){const E=Pe[v];if(E!==void 0)return d_(E)}(Q),w=W.message;G===void 0&&(G=P.INTERNAL,w="Unknown error status: "+Q+" with message "+W.message),I=!0,S.So(new D(G,w)),p.close()}else N(He,`RPC '${e}' stream ${i} received:`,z),S.bo(z)}}),x(c,Eg.STAT_EVENT,C=>{C.stat===Rl.PROXY?N(He,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===Rl.NOPROXY&&N(He,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(){return typeof window<"u"?window:null}function da(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(n){return new rS(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,t,r,i,s,o,c,l){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new nh(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Ae(t.toString()),Ae("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new D(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return N("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class XS extends Q_{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=oS(this.serializer,e),r=function(s){if(!("targetChange"in s))return j.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?j.min():o.readTime?Re(o.readTime):j.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Ml(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=ba(l)?{documents:E_(s,l)}:{query:T_(s,l)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=g_(s,o.resumeToken);const u=Ol(s,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(j.min())>0){c.readTime=pi(s,o.snapshotVersion.toTimestamp());const u=Ol(s,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const r=cS(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Ml(this.serializer),t.removeTarget=e,this.a_(t)}}class ZS extends Q_{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return q(!!e.streamToken),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=aS(e.writeResults,e.commitTime),r=Re(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Ml(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Ws(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,Ll(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new D(P.UNKNOWN,s.toString())})}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,Ll(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(P.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class tP{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ae(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nP{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{$n(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(l){const u=M(l);u.L_.add(4),await Ci(u),u.q_.set("Unknown"),u.L_.delete(4),await po(u)}(this))})}),this.q_=new tP(r,i)}}async function po(n){if($n(n))for(const e of n.B_)await e(!0)}async function Ci(n){for(const e of n.B_)await e(!1)}function oc(n,e){const t=M(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),sh(t)?ih(t):Di(t).r_()&&rh(t,e))}function _i(n,e){const t=M(n),r=Di(t);t.N_.delete(e),r.r_()&&J_(t,e),t.N_.size===0&&(r.r_()?r.o_():$n(t)&&t.q_.set("Unknown"))}function rh(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Di(n).A_(e)}function J_(n,e){n.Q_.xe(e),Di(n).R_(e)}function ih(n){n.Q_=new ZR({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Di(n).start(),n.q_.v_()}function sh(n){return $n(n)&&!Di(n).n_()&&n.N_.size>0}function $n(n){return M(n).L_.size===0}function Y_(n){n.Q_=void 0}async function rP(n){n.q_.set("Online")}async function iP(n){n.N_.forEach((e,t)=>{rh(n,e)})}async function sP(n,e){Y_(n),sh(n)?(n.q_.M_(e),ih(n)):n.q_.set("Unknown")}async function oP(n,e,t){if(n.q_.set("Online"),e instanceof m_&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.N_.delete(c),i.Q_.removeTarget(c))}(n,e)}catch(r){N("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Na(n,r)}else if(e instanceof ha?n.Q_.Ke(e):e instanceof p_?n.Q_.He(e):n.Q_.We(e),!t.isEqual(j.min()))try{const r=await $_(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.Q_.rt(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const d=s.N_.get(u);d&&s.N_.set(u,d.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const d=s.N_.get(l);if(!d)return;s.N_.set(l,d.withResumeToken(we.EMPTY_BYTE_STRING,d.snapshotVersion)),J_(s,l);const p=new Ht(d.target,l,u,d.sequenceNumber);rh(s,p)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){N("RemoteStore","Failed to raise snapshot:",r),await Na(n,r)}}async function Na(n,e,t){if(!Bn(e))throw e;n.L_.add(1),await Ci(n),n.q_.set("Offline"),t||(t=()=>$_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await po(n)})}function X_(n,e){return e().catch(t=>Na(n,t,e))}async function xi(n){const e=M(n),t=Vn(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;aP(e);)try{const i=await WS(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,cP(e,i)}catch(i){await Na(e,i)}Z_(e)&&ey(e)}function aP(n){return $n(n)&&n.O_.length<10}function cP(n,e){n.O_.push(e);const t=Vn(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Z_(n){return $n(n)&&!Vn(n).n_()&&n.O_.length>0}function ey(n){Vn(n).start()}async function lP(n){Vn(n).p_()}async function uP(n){const e=Vn(n);for(const t of n.O_)e.m_(t.mutations)}async function hP(n,e,t){const r=n.O_.shift(),i=ju.from(r,e,t);await X_(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await xi(n)}async function dP(n,e){e&&Vn(n).V_&&await async function(r,i){if(function(o){return h_(o)&&o!==P.ABORTED}(i.code)){const s=r.O_.shift();Vn(r).s_(),await X_(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await xi(r)}}(n,e),Z_(n)&&ey(n)}async function _p(n,e){const t=M(n);t.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");const r=$n(t);t.L_.add(3),await Ci(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await po(t)}async function zl(n,e){const t=M(n);e?(t.L_.delete(2),await po(t)):e||(t.L_.add(2),await Ci(t),t.q_.set("Unknown"))}function Di(n){return n.K_||(n.K_=function(t,r,i){const s=M(t);return s.w_(),new XS(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:rP.bind(null,n),Ro:iP.bind(null,n),mo:sP.bind(null,n),d_:oP.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),sh(n)?ih(n):n.q_.set("Unknown")):(await n.K_.stop(),Y_(n))})),n.K_}function Vn(n){return n.U_||(n.U_=function(t,r,i){const s=M(t);return s.w_(),new ZS(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:lP.bind(null,n),mo:dP.bind(null,n),f_:uP.bind(null,n),g_:hP.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await xi(n)):(await n.U_.stop(),n.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new qe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new oh(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ni(n,e){if(Ae("AsyncQueue",`${e}: ${n}`),Bn(n))return new D(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=fs(),this.sortedSet=new se(this.comparator)}static emptySet(e){return new ni(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ni)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ni;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(){this.W_=new se(L.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):B():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class yi{constructor(e,t,r,i,s,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new yi(e,t,ni.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ao(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fP{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class pP{constructor(){this.queries=vp(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=M(t),s=i.queries;i.queries=vp(),s.forEach((o,c)=>{for(const l of c.j_)l.onError(r)})})(this,new D(P.ABORTED,"Firestore shutting down"))}}function vp(){return new qn(n=>Yg(n),ao)}async function ah(n,e){const t=M(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new fP,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Ni(o,`Initialization of query '${Gr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&lh(t)}async function ch(n,e){const t=M(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function mP(n,e){const t=M(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.j_)c.X_(i)&&(r=!0);o.z_=i}}r&&lh(t)}function gP(n,e,t){const r=M(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function lh(n){n.Y_.forEach(e=>{e.next()})}var jl,Ip;(Ip=jl||(jl={})).ea="default",Ip.Cache="cache";class uh{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new yi(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=yi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==jl.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _P{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e){this.serializer=e}Es(e){return Lt(this.serializer,e)}ds(e){return e.metadata.exists?w_(this.serializer,e.document,!1):ae.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return Re(e)}}class yP{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=ty(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=Y.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new wp(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const c=(t.get(o)||H()).add(s);t.set(o,c)}}return t}async complete(){const e=await GS(this.localStore,new wp(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await KS(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function ty(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e){this.key=e}}class ry{constructor(e){this.key=e}}class iy{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=H(),this.mutatedKeys=H(),this.Aa=Zg(e),this.Ra=new ni(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new yp,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,p)=>{const g=i.get(d),I=co(this.query,p)?p:null,S=!!g&&this.mutatedKeys.has(g.key),x=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let C=!1;g&&I?g.data.isEqual(I.data)?S!==x&&(r.track({type:3,doc:I}),C=!0):this.ga(g,I)||(r.track({type:2,doc:I}),C=!0,(l&&this.Aa(I,l)>0||u&&this.Aa(I,u)<0)&&(c=!0)):!g&&I?(r.track({type:0,doc:I}),C=!0):g&&!I&&(r.track({type:1,doc:g}),C=!0,(l||u)&&(c=!0)),C&&(I?(o=o.add(I),s=x?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:c,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(I,S){const x=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B()}};return x(I)-x(S)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(r),i=i!=null&&i;const c=t&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,u=l!==this.Ea;return this.Ea=l,o.length!==0||u?{snapshot:new yi(this.query,e.Ra,s,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new yp,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=H(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new ry(r))}),this.da.forEach(r=>{e.has(r)||t.push(new ny(r))}),t}ba(e){this.Ta=e.Ts,this.da=H();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return yi.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class vP{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class IP{constructor(e){this.key=e,this.va=!1}}class wP{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new qn(c=>Yg(c),ao),this.Ma=new Map,this.xa=new Set,this.Oa=new se(L.comparator),this.Na=new Map,this.La=new Yu,this.Ba={},this.ka=new Map,this.qa=Ir.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function EP(n,e,t=!0){const r=ac(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await sy(r,e,t,!0),i}async function TP(n,e){const t=ac(n);await sy(t,e,!0,!1)}async function sy(n,e,t,r){const i=await mi(n.localStore,it(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await hh(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&oc(n.remoteStore,i),c}async function hh(n,e,t,r,i){n.Ka=(p,g,I)=>async function(x,C,U,z){let F=C.view.ma(U);F.ns&&(F=await Ca(x.localStore,C.query,!1).then(({documents:w})=>C.view.ma(w,F)));const W=z&&z.targetChanges.get(C.targetId),Q=z&&z.targetMismatches.get(C.targetId)!=null,G=C.view.applyChanges(F,x.isPrimaryClient,W,Q);return Wl(x,C.targetId,G.wa),G.snapshot}(n,p,g,I);const s=await Ca(n.localStore,e,!0),o=new iy(e,s.Ts),c=o.ma(s.documents),l=ho.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),u=o.applyChanges(c,n.isPrimaryClient,l);Wl(n,t,u.wa);const d=new vP(e,t,o);return n.Fa.set(e,d),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),u.snapshot}async function bP(n,e,t){const r=M(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!ao(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await gi(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&_i(r.remoteStore,i.targetId),vi(r,i.targetId)}).catch(Un)):(vi(r,i.targetId),await gi(r.localStore,i.targetId,!0))}async function AP(n,e){const t=M(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),_i(t.remoteStore,r.targetId))}async function RP(n,e,t){const r=mh(n);try{const i=await function(o,c){const l=M(o),u=de.now(),d=c.reduce((I,S)=>I.add(S.key),H());let p,g;return l.persistence.runTransaction("Locally write mutations","readwrite",I=>{let S=ut(),x=H();return l.cs.getEntries(I,d).next(C=>{S=C,S.forEach((U,z)=>{z.isValidDocument()||(x=x.add(U))})}).next(()=>l.localDocuments.getOverlayedDocuments(I,S)).next(C=>{p=C;const U=[];for(const z of c){const F=JR(z,p.get(z.key).overlayedDocument);F!=null&&U.push(new ln(z.key,F,$g(F.value.mapValue),he.exists(!0)))}return l.mutationQueue.addMutationBatch(I,u,U,c)}).next(C=>{g=C;const U=C.applyToLocalDocumentSet(p,x);return l.documentOverlayCache.saveOverlays(I,C.batchId,U)})}).then(()=>({batchId:g.batchId,changes:t_(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let u=o.Ba[o.currentUser.toKey()];u||(u=new se(K)),u=u.insert(c,l),o.Ba[o.currentUser.toKey()]=u}(r,i.batchId,t),await un(r,i.changes),await xi(r.remoteStore)}catch(i){const s=Ni(i,"Failed to persist write");t.reject(s)}}async function oy(n,e){const t=M(n);try{const r=await jS(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?q(o.va):i.removedDocuments.size>0&&(q(o.va),o.va=!1))}),await un(t,r,e)}catch(r){await Un(r)}}function Ep(n,e,t){const r=M(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((s,o)=>{const c=o.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=M(o);l.onlineState=c;let u=!1;l.queries.forEach((d,p)=>{for(const g of p.j_)g.Z_(c)&&(u=!0)}),u&&lh(l)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function SP(n,e,t){const r=M(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new se(L.comparator);o=o.insert(s,ae.newNoDocument(s,j.min()));const c=H().add(s),l=new uo(j.min(),new Map,new se(K),o,c);await oy(r,l),r.Oa=r.Oa.remove(s),r.Na.delete(e),ph(r)}else await gi(r.localStore,e,!1).then(()=>vi(r,e,t)).catch(Un)}async function PP(n,e){const t=M(n),r=e.batch.batchId;try{const i=await zS(t.localStore,e);fh(t,r,null),dh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await un(t,i)}catch(i){await Un(i)}}async function kP(n,e,t){const r=M(n);try{const i=await function(o,c){const l=M(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return l.mutationQueue.lookupMutationBatch(u,c).next(p=>(q(p!==null),d=p.keys(),l.mutationQueue.removeMutationBatch(u,p))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,d,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>l.localDocuments.getDocuments(u,d))})}(r.localStore,e);fh(r,e,t),dh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await un(r,i)}catch(i){await Un(i)}}async function CP(n,e){const t=M(n);$n(t.remoteStore)||N("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const c=M(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",l=>c.mutationQueue.getHighestUnacknowledgedBatchId(l))}(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=Ni(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function dh(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function fh(n,e,t){const r=M(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function vi(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||ay(n,r)})}function ay(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(_i(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),ph(n))}function Wl(n,e,t){for(const r of t)r instanceof ny?(n.La.addReference(r.key,e),xP(n,r)):r instanceof ry?(N("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||ay(n,r.key)):B()}function xP(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(N("SyncEngine","New document in limbo: "+t),n.xa.add(r),ph(n))}function ph(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new L(Y.fromString(e)),r=n.qa.next();n.Na.set(r,new IP(t)),n.Oa=n.Oa.insert(t,r),oc(n.remoteStore,new Ht(it(Si(t.path)),r,"TargetPurposeLimboResolution",ct.oe))}}async function un(n,e,t){const r=M(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((c,l)=>{o.push(r.Ka(l,e,t).then(u=>{var d;if((u||t)&&r.isPrimaryClient){const p=u?!u.fromCache:(d=t==null?void 0:t.targetChanges.get(l.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(u){i.push(u);const p=eh.Wi(l.targetId,u);s.push(p)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(l,u){const d=M(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>R.forEach(u,g=>R.forEach(g.$i,I=>d.persistence.referenceDelegate.addReference(p,g.targetId,I)).next(()=>R.forEach(g.Ui,I=>d.persistence.referenceDelegate.removeReference(p,g.targetId,I)))))}catch(p){if(!Bn(p))throw p;N("LocalStore","Failed to update sequence numbers: "+p)}for(const p of u){const g=p.targetId;if(!p.fromCache){const I=d.os.get(g),S=I.snapshotVersion,x=I.withLastLimboFreeSnapshotVersion(S);d.os=d.os.insert(g,x)}}}(r.localStore,s))}async function DP(n,e){const t=M(n);if(!t.currentUser.isEqual(e)){N("SyncEngine","User change. New user:",e.toKey());const r=await q_(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(c=>{c.forEach(l=>{l.reject(new D(P.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await un(t,r.hs)}}function NP(n,e){const t=M(n),r=t.Na.get(e);if(r&&r.va)return H().add(r.key);{let i=H();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const c=t.Fa.get(o);i=i.unionWith(c.view.Va)}return i}}async function VP(n,e){const t=M(n),r=await Ca(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&Wl(t,e.targetId,i.wa),i}async function OP(n,e){const t=M(n);return W_(t.localStore,e).then(r=>un(t,r))}async function LP(n,e,t,r){const i=M(n),s=await function(c,l){const u=M(c),d=M(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",p=>d.Mn(p,l).next(g=>g?u.localDocuments.getDocuments(p,g):R.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await xi(i.remoteStore):t==="acknowledged"||t==="rejected"?(fh(i,e,r||null),dh(i,e),function(c,l){M(M(c).mutationQueue).On(l)}(i.localStore,e)):B(),await un(i,s)):N("SyncEngine","Cannot apply mutation batch with id: "+e)}async function MP(n,e){const t=M(n);if(ac(t),mh(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await Tp(t,r.toArray());t.Qa=!0,await zl(t.remoteStore,!0);for(const s of i)oc(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(vi(t,o),gi(t.localStore,o,!0))),_i(t.remoteStore,o)}),await i,await Tp(t,r),function(o){const c=M(o);c.Na.forEach((l,u)=>{_i(c.remoteStore,u)}),c.La.pr(),c.Na=new Map,c.Oa=new se(L.comparator)}(t),t.Qa=!1,await zl(t.remoteStore,!1)}}async function Tp(n,e,t){const r=M(n),i=[],s=[];for(const o of e){let c;const l=r.Ma.get(o);if(l&&l.length!==0){c=await mi(r.localStore,it(l[0]));for(const u of l){const d=r.Fa.get(u),p=await VP(r,d);p.snapshot&&s.push(p.snapshot)}}else{const u=await j_(r.localStore,o);c=await mi(r.localStore,u),await hh(r,cy(u),o,!1,c.resumeToken)}i.push(c)}return r.Ca.d_(s),i}function cy(n){return Jg(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function FP(n){return function(t){return M(M(t).persistence).Qi()}(M(n).localStore)}async function UP(n,e,t,r){const i=M(n);if(i.Qa)return void N("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await W_(i.localStore,Xg(s[0])),c=uo.createSynthesizedRemoteEventForCurrentChange(e,t==="current",we.EMPTY_BYTE_STRING);await un(i,o,c);break}case"rejected":await gi(i.localStore,e,!0),vi(i,e,r);break;default:B()}}async function BP(n,e,t){const r=ac(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){N("SyncEngine","Adding an already active target "+i);continue}const s=await j_(r.localStore,i),o=await mi(r.localStore,s);await hh(r,cy(s),o.targetId,!1,o.resumeToken),oc(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await gi(r.localStore,i,!1).then(()=>{_i(r.remoteStore,i),vi(r,i)}).catch(Un)}}function ac(n){const e=M(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=oy.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=NP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=SP.bind(null,e),e.Ca.d_=mP.bind(null,e.eventManager),e.Ca.$a=gP.bind(null,e.eventManager),e}function mh(n){const e=M(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=PP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kP.bind(null,e),e}function qP(n,e,t){const r=M(n);(async function(s,o,c){try{const l=await o.getMetadata();if(await function(I,S){const x=M(I),C=Re(S.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",U=>x.Gr.getBundleMetadata(U,S.id)).then(U=>!!U&&U.createTime.compareTo(C)>=0)}(s.localStore,l))return await o.close(),c._completeWith(function(I){return{taskState:"Success",documentsLoaded:I.totalDocuments,bytesLoaded:I.totalBytes,totalDocuments:I.totalDocuments,totalBytes:I.totalBytes}}(l)),Promise.resolve(new Set);c._updateProgress(ty(l));const u=new yP(l,s.localStore,o.serializer);let d=await o.Ua();for(;d;){const g=await u.la(d);g&&c._updateProgress(g),d=await o.Ua()}const p=await u.complete();return await un(s,p.Ia,void 0),await function(I,S){const x=M(I);return x.persistence.runTransaction("Save bundle","readwrite",C=>x.Gr.saveBundleMetadata(C,S))}(s.localStore,l),c._completeWith(p.progress),Promise.resolve(p.Pa)}catch(l){return Ut("SyncEngine",`Loading bundle failed with ${l}`),c._failWith(l),Promise.resolve(new Set)}})(r,e,t).then(i=>{r.sharedClientState.notifyBundleLoaded(i)})}class Gs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=fo(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return B_(this.persistence,new U_,e.initialUser,this.serializer)}Ga(e){return new F_(sc.Zr,this.serializer)}Wa(e){return new K_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Gs.provider={build:()=>new Gs};class ly extends Gs{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await mh(this.Ja.syncEngine),await xi(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return B_(this.persistence,new U_,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new AS(r,e.asyncQueue,t)}Ha(e,t){const r=new oR(t,this.persistence);return new sR(e.asyncQueue,r)}Ga(e){const t=Zu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?at.withCacheSize(this.cacheSizeBytes):at.DEFAULT;return new Xu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,H_(),da(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new K_}}class $P extends ly{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof ll&&(this.sharedClientState.syncEngine={no:LP.bind(null,t),ro:UP.bind(null,t),io:BP.bind(null,t),Qi:FP.bind(null,t),eo:OP.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async r=>{await MP(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Wa(e){const t=H_();if(!ll.D(t))throw new D(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Zu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new ll(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Ks{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ep(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=DP.bind(null,this.syncEngine),await zl(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new pP}()}createDatastore(e){const t=fo(e.databaseInfo.databaseId),r=function(s){return new YS(s)}(e.databaseInfo);return function(s,o,c,l){return new eP(s,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new nP(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Ep(this.syncEngine,t,0),function(){return gp.D()?new gp:new HS}())}createSyncEngine(e,t){return function(i,s,o,c,l,u,d){const p=new wP(i,s,o,c,l,u);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=M(i);N("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Ci(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ks.provider={build:()=>new Ks};function bp(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Ae("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zP{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new qe,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))},r=>this.metadata.reject(r))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new _P(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jP{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=M(i),c={documents:s.map(p=>js(o.serializer,p))},l=await o.Lo("BatchGetDocuments",o.serializer.databaseId,Y.emptyPath(),c,s.length),u=new Map;l.forEach(p=>{const g=sS(o.serializer,p);u.set(g.key.toString(),g)});const d=[];return s.forEach(p=>{const g=u.get(p.toString());q(!!g),d.push(g)}),d}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new ki(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const i=L.fromPath(r);this.mutations.push(new $u(i,this.precondition(i)))}),await async function(r,i){const s=M(r),o={writes:i.map(c=>Ws(s.serializer,c))};await s.Mo("Commit",s.serializer.databaseId,Y.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw B();t=j.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(j.min())?he.exists(!1):he.updateTime(t):he.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(j.min()))throw new D(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return he.updateTime(t)}return he.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WP{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new nh(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new jP(this.datastore),t=this.cu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.lu(i)}))}).catch(r=>{this.lu(r)})})}cu(e){try{const t=this.updateFunction(e);return!so(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!h_(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GP{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Ve.UNAUTHENTICATED,this.clientId=Rg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{N("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(N("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new qe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ni(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function hl(n,e){n.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await q_(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ap(n,e){n.asyncQueue.verifyOperationInProgress();const t=await gh(n);N("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>_p(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>_p(e.remoteStore,i)),n._onlineComponents=e}async function gh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await hl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Ut("Error using user provided cache. Falling back to memory cache: "+t),await hl(n,new Gs)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await hl(n,new Gs);return n._offlineComponents}async function lc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await Ap(n,n._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await Ap(n,new Ks))),n._onlineComponents}function uy(n){return gh(n).then(e=>e.persistence)}function _h(n){return gh(n).then(e=>e.localStore)}function hy(n){return lc(n).then(e=>e.remoteStore)}function yh(n){return lc(n).then(e=>e.syncEngine)}function KP(n){return lc(n).then(e=>e.datastore)}async function Ii(n){const e=await lc(n),t=e.eventManager;return t.onListen=EP.bind(null,e.syncEngine),t.onUnlisten=bP.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=TP.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=AP.bind(null,e.syncEngine),t}function HP(n){return n.asyncQueue.enqueue(async()=>{const e=await uy(n),t=await hy(n);return e.setNetworkEnabled(!0),function(i){const s=M(i);return s.L_.delete(0),po(s)}(t)})}function QP(n){return n.asyncQueue.enqueue(async()=>{const e=await uy(n),t=await hy(n);return e.setNetworkEnabled(!1),async function(i){const s=M(i);s.L_.add(0),await Ci(s),s.q_.set("Offline")}(t)})}function JP(n,e){const t=new qe;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await function(u,d){const p=M(u);return p.persistence.runTransaction("read document","readonly",g=>p.localDocuments.getDocument(g,d))}(i,s);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new D(P.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const l=Ni(c,`Failed to get document '${s} from cache`);o.reject(l)}}(await _h(n),e,t)),t.promise}function dy(n,e,t={}){const r=new qe;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const d=new cc({next:g=>{d.Za(),o.enqueueAndForget(()=>ch(s,p));const I=g.docs.has(c);!I&&g.fromCache?u.reject(new D(P.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&g.fromCache&&l&&l.source==="server"?u.reject(new D(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),p=new uh(Si(c.path),d,{includeMetadataChanges:!0,_a:!0});return ah(s,p)}(await Ii(n),n.asyncQueue,e,t,r)),r.promise}function YP(n,e){const t=new qe;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await Ca(i,s,!0),l=new iy(s,c.Ts),u=l.ma(c.documents),d=l.applyChanges(u,!1);o.resolve(d.snapshot)}catch(c){const l=Ni(c,`Failed to execute query '${s} against cache`);o.reject(l)}}(await _h(n),e,t)),t.promise}function fy(n,e,t={}){const r=new qe;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const d=new cc({next:g=>{d.Za(),o.enqueueAndForget(()=>ch(s,p)),g.fromCache&&l.source==="server"?u.reject(new D(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(g)},error:g=>u.reject(g)}),p=new uh(c,d,{includeMetadataChanges:!0,_a:!0});return ah(s,p)}(await Ii(n),n.asyncQueue,e,t,r)),r.promise}function XP(n,e){const t=new cc(e);return n.asyncQueue.enqueueAndForget(async()=>function(i,s){M(i).Y_.add(s),s.next()}(await Ii(n),t)),()=>{t.Za(),n.asyncQueue.enqueueAndForget(async()=>function(i,s){M(i).Y_.delete(s)}(await Ii(n),t))}}function ZP(n,e,t,r){const i=function(o,c){let l;return l=typeof o=="string"?f_().encode(o):o,function(d,p){return new zP(d,p)}(function(d,p){if(d instanceof Uint8Array)return bp(d,p);if(d instanceof ArrayBuffer)return bp(new Uint8Array(d),p);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(l),c)}(t,fo(e));n.asyncQueue.enqueueAndForget(async()=>{qP(await yh(n),i,r)})}function ek(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){const s=M(r);return s.persistence.runTransaction("Get named query","readonly",o=>s.Gr.getNamedQuery(o,i))}(await _h(n),e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function py(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n,e,t){if(!t)throw new D(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function my(n,e,t,r){if(e===!0&&r===!0)throw new D(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Sp(n){if(!L.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Pp(n){if(L.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function uc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B()}function ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=uc(n);throw new D(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function gy(n,e){if(e<=0)throw new D(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new D(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}my("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=py((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class mo{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new kp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new kp(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new HA;switch(r.type){case"firstParty":return new XA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Rp.get(t);r&&(N("ComponentProvider","Removing Datastore"),Rp.delete(t),r.terminate())}(this),Promise.resolve()}}function tk(n,e,t,r={}){var i;const s=(n=ee(n,mo))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Ut("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=Ve.MOCK_USER;else{c=nm(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new D(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new Ve(u)}n._authCredentials=new QA(new Ag(c,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let st=class _y{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new _y(this.firestore,e,this._query)}},pe=class yy{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new yy(this.firestore,e,this._key)}},Rn=class vy extends st{constructor(e,t,r){super(e,t,Si(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new pe(this.firestore,null,new L(e))}withConverter(e){return new vy(this.firestore,e,this._path)}};function _t(n,e,...t){if(n=$(n),vh("collection","path",e),n instanceof mo){const r=Y.fromString(e,...t);return Pp(r),new Rn(n,null,r)}{if(!(n instanceof pe||n instanceof Rn))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Pp(r),new Rn(n.firestore,null,r)}}function nk(n,e){if(n=ee(n,mo),vh("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new st(n,null,function(r){return new cn(Y.emptyPath(),r)}(e))}function fe(n,e,...t){if(n=$(n),arguments.length===1&&(e=Rg.newId()),vh("doc","path",e),n instanceof mo){const r=Y.fromString(e,...t);return Sp(r),new pe(n,null,new L(r))}{if(!(n instanceof pe||n instanceof Rn))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Sp(r),new pe(n.firestore,n instanceof Rn?n.converter:null,new L(r))}}function Iy(n,e){return n=$(n),e=$(e),(n instanceof pe||n instanceof Rn)&&(e instanceof pe||e instanceof Rn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function wy(n,e){return n=$(n),e=$(e),n instanceof st&&e instanceof st&&n.firestore===e.firestore&&ao(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new nh(this,"async_queue_retry"),this.Vu=()=>{const r=da();r&&N("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=da();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=da();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new qe;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Bn(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Ae("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=oh.createAndSchedule(this,e,t,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Gl(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class rk{constructor(){this._progressObserver={},this._taskCompletionResolver=new qe,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ik=-1;let Ee=class extends mo{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Cp,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cp(e),this._firestoreClient=void 0,await e}}};function ze(n){if(n._terminated)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ey(n),n._firestoreClient}function Ey(n){var e,t,r;const i=n._freezeSettings(),s=function(c,l,u,d){return new PR(c,l,u,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,py(d.experimentalLongPollingOptions),d.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new GP(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}function sk(n,e){Ut("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return Ty(n,Ks.provider,{build:r=>new ly(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function ok(n){Ut("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();Ty(n,Ks.provider,{build:t=>new $P(t,e.cacheSizeBytes)})}function Ty(n,e,t){if((n=ee(n,Ee))._firestoreClient||n._terminated)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new D(P.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Ey(n)}function ak(n){if(n._initialized&&!n._terminated)throw new D(P.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new qe;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Ot.D())return Promise.resolve();const i=r+"main";await Ot.delete(i)}(Zu(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function ck(n){return function(t){const r=new qe;return t.asyncQueue.enqueueAndForget(async()=>CP(await yh(t),r)),r.promise}(ze(n=ee(n,Ee)))}function lk(n){return HP(ze(n=ee(n,Ee)))}function uk(n){return QP(ze(n=ee(n,Ee)))}function hk(n,e){const t=ze(n=ee(n,Ee)),r=new rk;return ZP(t,n._databaseId,e,r),r}function dk(n,e){return ek(ze(n=ee(n,Ee)),e).then(t=>t?new st(n,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new qt(we.fromBase64String(e))}catch(t){throw new D(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new qt(we.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let On=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ue(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sr=class{constructor(e){this._methodName=e}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fk=/^__.*__$/;class pk{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new ln(e,this.data,this.fieldMask,t,this.fieldTransforms):new Pi(e,this.data,t,this.fieldTransforms)}}class by{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new ln(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ay(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B()}}class dc{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new dc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Va(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Ay(this.Cu)&&fk.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class mk{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||fo(e)}Qu(e,t,r,i=!1){return new dc({Cu:e,methodName:t,qu:r,path:ue.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Pr(n){const e=n._freezeSettings(),t=fo(n._databaseId);return new mk(n._databaseId,!!e.ignoreUndefinedProperties,t)}function fc(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);Sh("Data must be an object, but it was:",o,r);const c=Py(r,o);let l,u;if(s.merge)l=new lt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const p of s.mergeFields){const g=Kl(e,p,t);if(!o.contains(g))throw new D(P.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Cy(d,g)||d.push(g)}l=new lt(d),u=o.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,u=o.fieldTransforms;return new pk(new Be(c),l,u)}class go extends Sr{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof go}}function Ry(n,e,t){return new dc({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class wh extends Sr{_toFieldTransform(e){return new lo(e.path,new di)}isEqual(e){return e instanceof wh}}class Eh extends Sr{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Ry(this,e,!0),r=this.Ku.map(s=>kr(s,t)),i=new gr(r);return new lo(e.path,i)}isEqual(e){return e instanceof Eh&&ks(this.Ku,e.Ku)}}class Th extends Sr{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Ry(this,e,!0),r=this.Ku.map(s=>kr(s,t)),i=new _r(r);return new lo(e.path,i)}isEqual(e){return e instanceof Th&&ks(this.Ku,e.Ku)}}class bh extends Sr{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new fi(e.serializer,i_(e.serializer,this.$u));return new lo(e.path,t)}isEqual(e){return e instanceof bh&&this.$u===e.$u}}function Ah(n,e,t,r){const i=n.Qu(1,e,t);Sh("Data must be an object, but it was:",i,r);const s=[],o=Be.empty();Rr(r,(l,u)=>{const d=Ph(e,l,t);u=$(u);const p=i.Nu(d);if(u instanceof go)s.push(d);else{const g=kr(u,p);g!=null&&(s.push(d),o.set(d,g))}});const c=new lt(s);return new by(o,c,i.fieldTransforms)}function Rh(n,e,t,r,i,s){const o=n.Qu(1,e,t),c=[Kl(e,r,t)],l=[i];if(s.length%2!=0)throw new D(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<s.length;g+=2)c.push(Kl(e,s[g])),l.push(s[g+1]);const u=[],d=Be.empty();for(let g=c.length-1;g>=0;--g)if(!Cy(u,c[g])){const I=c[g];let S=l[g];S=$(S);const x=o.Nu(I);if(S instanceof go)u.push(I);else{const C=kr(S,x);C!=null&&(u.push(I),d.set(I,C))}}const p=new lt(u);return new by(d,p,o.fieldTransforms)}function Sy(n,e,t,r=!1){return kr(t,n.Qu(r?4:3,e))}function kr(n,e){if(ky(n=$(n)))return Sh("Unsupported field value:",e,n),Py(n,e);if(n instanceof Sr)return function(r,i){if(!Ay(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let l=kr(c,i.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=$(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return i_(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=de.fromDate(r);return{timestampValue:pi(i.serializer,s)}}if(r instanceof de){const s=new de(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:pi(i.serializer,s)}}if(r instanceof hc)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof qt)return{bytesValue:g_(i.serializer,r._byteString)};if(r instanceof pe){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ku(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Ih)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.Bu("VectorValues must only contain numeric values.");return qu(c.serializer,l)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${uc(r)}`)}(n,e)}function Py(n,e){const t={};return Fg(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Rr(n,(r,i)=>{const s=kr(i,e.Mu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function ky(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof de||n instanceof hc||n instanceof qt||n instanceof pe||n instanceof Sr||n instanceof Ih)}function Sh(n,e,t){if(!ky(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=uc(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Kl(n,e,t){if((e=$(e))instanceof On)return e._internalPath;if(typeof e=="string")return Ph(n,e);throw Va("Field path arguments must be of type string or ",n,!1,void 0,t)}const gk=new RegExp("[~\\*/\\[\\]]");function Ph(n,e,t){if(e.search(gk)>=0)throw Va(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new On(...e.split("."))._internalPath}catch{throw Va(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Va(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new D(P.INVALID_ARGUMENT,c+n+l)}function Cy(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new pe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new _k(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(pc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class _k extends Hs{data(){return super.data()}}function pc(n,e){return typeof e=="string"?Ph(n,e):e instanceof On?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class kh{}class _o extends kh{}function Oe(n,e,...t){let r=[];e instanceof kh&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Ch).length,c=s.filter(l=>l instanceof mc).length;if(o>1||o>0&&c>0)throw new D(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class mc extends _o{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new mc(e,t,r)}_apply(e){const t=this._parse(e);return Vy(e._query,t),new st(e.firestore,e.converter,Vl(e._query,t))}_parse(e){const t=Pr(e.firestore);return function(s,o,c,l,u,d,p){let g;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new D(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Dp(p,d);const I=[];for(const S of p)I.push(xp(l,s,S));g={arrayValue:{values:I}}}else g=xp(l,s,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Dp(p,d),g=Sy(c,o,p,d==="in"||d==="not-in");return X.create(u,d,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Dy(n,e,t){const r=e,i=pc("where",n);return mc._create(i,r,t)}class Ch extends kh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ch(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)Vy(o,l),o=Vl(o,l)}(e._query,t),new st(e.firestore,e.converter,Vl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class xh extends _o{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new xh(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new zs(s,o)}(e._query,this._field,this._direction);return new st(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new cn(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function Cr(n,e="asc"){const t=e,r=pc("orderBy",n);return xh._create(r,t)}class gc extends _o{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new gc(e,t,r)}_apply(e){return new st(e.firestore,e.converter,Ra(e._query,this._limit,this._limitType))}}function yk(n){return gy("limit",n),gc._create("limit",n,"F")}function vk(n){return gy("limitToLast",n),gc._create("limitToLast",n,"L")}class _c extends _o{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new _c(e,t,r)}_apply(e){const t=Ny(e,this.type,this._docOrFields,this._inclusive);return new st(e.firestore,e.converter,function(i,s){return new cn(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function Ik(...n){return _c._create("startAt",n,!0)}function wk(...n){return _c._create("startAfter",n,!1)}class yc extends _o{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new yc(e,t,r)}_apply(e){const t=Ny(e,this.type,this._docOrFields,this._inclusive);return new st(e.firestore,e.converter,function(i,s){return new cn(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function Ek(...n){return yc._create("endBefore",n,!1)}function Tk(...n){return yc._create("endAt",n,!0)}function Ny(n,e,t,r){if(t[0]=$(t[0]),t[0]instanceof Hs)return function(s,o,c,l,u){if(!l)throw new D(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const p of ti(s))if(p.field.isKeyField())d.push(pr(o,l.key));else{const g=l.data.field(p.field);if(Za(g))throw new D(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const I=p.field.canonicalString();throw new D(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${I}' (used as the orderBy) does not exist.`)}d.push(g)}return new Nn(d,u)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Pr(n.firestore);return function(o,c,l,u,d,p){const g=o.explicitOrderBy;if(d.length>g.length)throw new D(P.INVALID_ARGUMENT,`Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const I=[];for(let S=0;S<d.length;S++){const x=d[S];if(g[S].field.isKeyField()){if(typeof x!="string")throw new D(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof x}`);if(!Uu(o)&&x.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${x}' contains a slash.`);const C=o.path.child(Y.fromString(x));if(!L.isDocumentKey(C))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${C}' is not because it contains an odd number of segments.`);const U=new L(C);I.push(pr(c,U))}else{const C=Sy(l,u,x);I.push(C)}}return new Nn(I,p)}(n._query,n.firestore._databaseId,i,e,t,r)}}function xp(n,e,t){if(typeof(t=$(t))=="string"){if(t==="")throw new D(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Uu(e)&&t.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!L.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return pr(n,new L(r))}if(t instanceof pe)return pr(n,t._key);throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${uc(t)}.`)}function Dp(n,e){if(!Array.isArray(n)||n.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Vy(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Dh{convertValue(e,t="none"){switch(fr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Cn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Rr(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>le(o.doubleValue));return new Ih(s)}convertGeoPoint(e){return new hc(le(e.latitude),le(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Mu(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Bs(e));default:return null}}convertTimestamp(e){const t=nn(e);return new de(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);q(S_(r));const i=new xn(r.get(1),r.get(3)),s=new L(r.popFirst(5));return i.isEqual(t)||Ae(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class bk extends Dh{constructor(e){super(),this.firestore=e}convertBytes(e){return new qt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new pe(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}let rn=class extends Hs{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(pc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},bs=class extends rn{data(e={}){return super.data(e)}},Ln=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new rr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new bs(this._firestore,this._userDataWriter,r.key,r,new rr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new bs(i._firestore,i._userDataWriter,c.doc.key,c.doc,new rr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new bs(i._firestore,i._userDataWriter,c.doc.key,c.doc,new rr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,d=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:Ak(c.type),doc:l,oldIndex:u,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function Ak(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B()}}function Oy(n,e){return n instanceof rn&&e instanceof rn?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof Ln&&e instanceof Ln&&n._firestore===e._firestore&&wy(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(n){n=ee(n,pe);const e=ee(n.firestore,Ee);return dy(ze(e),n._key).then(t=>Nh(e,n,t))}class Dr extends Dh{constructor(e){super(),this.firestore=e}convertBytes(e){return new qt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new pe(this.firestore,null,t)}}function Rk(n){n=ee(n,pe);const e=ee(n.firestore,Ee),t=ze(e),r=new Dr(e);return JP(t,n._key).then(i=>new rn(e,r,n._key,i,new rr(i!==null&&i.hasLocalMutations,!0),n.converter))}function Sk(n){n=ee(n,pe);const e=ee(n.firestore,Ee);return dy(ze(e),n._key,{source:"server"}).then(t=>Nh(e,n,t))}function Nr(n){n=ee(n,st);const e=ee(n.firestore,Ee),t=ze(e),r=new Dr(e);return xy(n._query),fy(t,n._query).then(i=>new Ln(e,r,n,i))}function Pk(n){n=ee(n,st);const e=ee(n.firestore,Ee),t=ze(e),r=new Dr(e);return YP(t,n._query).then(i=>new Ln(e,r,n,i))}function kk(n){n=ee(n,st);const e=ee(n.firestore,Ee),t=ze(e),r=new Dr(e);return fy(t,n._query,{source:"server"}).then(i=>new Ln(e,r,n,i))}function Np(n,e,t){n=ee(n,pe);const r=ee(n.firestore,Ee),i=vc(n.converter,e,t);return Oi(r,[fc(Pr(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,he.none())])}function wr(n,e,t,...r){n=ee(n,pe);const i=ee(n.firestore,Ee),s=Pr(i);let o;return o=typeof(e=$(e))=="string"||e instanceof On?Rh(s,"updateDoc",n._key,e,t,r):Ah(s,"updateDoc",n._key,e),Oi(i,[o.toMutation(n._key,he.exists(!0))])}function Ic(n){return Oi(ee(n.firestore,Ee),[new ki(n._key,he.none())])}function yo(n,e){const t=ee(n.firestore,Ee),r=fe(n),i=vc(n.converter,e);return Oi(t,[fc(Pr(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,he.exists(!1))]).then(()=>r)}function Vi(n,...e){var t,r,i;n=$(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Gl(e[o])||(s=e[o],o++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Gl(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let l,u,d;if(n instanceof pe)u=ee(n.firestore,Ee),d=Si(n._key.path),l={next:p=>{e[o]&&e[o](Nh(u,n,p))},error:e[o+1],complete:e[o+2]};else{const p=ee(n,st);u=ee(p.firestore,Ee),d=p._query;const g=new Dr(u);l={next:I=>{e[o]&&e[o](new Ln(u,g,p,I))},error:e[o+1],complete:e[o+2]},xy(n._query)}return function(g,I,S,x){const C=new cc(x),U=new uh(I,C,S);return g.asyncQueue.enqueueAndForget(async()=>ah(await Ii(g),U)),()=>{C.Za(),g.asyncQueue.enqueueAndForget(async()=>ch(await Ii(g),U))}}(ze(u),d,c,l)}function Ck(n,e){return XP(ze(n=ee(n,Ee)),Gl(e)?e:{next:e})}function Oi(n,e){return function(r,i){const s=new qe;return r.asyncQueue.enqueueAndForget(async()=>RP(await yh(r),i,s)),s.promise}(ze(n),e)}function Nh(n,e,t){const r=t.docs.get(e._key),i=new Dr(n);return new rn(n,i,e._key,r,new rr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xk={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ly=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Pr(e)}set(e,t,r){this._verifyNotCommitted();const i=In(e,this._firestore),s=vc(i.converter,t,r),o=fc(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,he.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=In(e,this._firestore);let o;return o=typeof(t=$(t))=="string"||t instanceof On?Rh(this._dataReader,"WriteBatch.update",s._key,t,r,i):Ah(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,he.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=In(e,this._firestore);return this._mutations=this._mutations.concat(new ki(t._key,he.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function In(n,e){if((n=$(n)).firestore!==e)throw new D(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dk=class extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=Pr(t)}get(t){const r=In(t,this._firestore),i=new bk(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return B();const o=s[0];if(o.isFoundDocument())return new Hs(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new Hs(this._firestore,i,r._key,null,r.converter);throw B()})}set(t,r,i){const s=In(t,this._firestore),o=vc(s.converter,r,i),c=fc(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,c),this}update(t,r,i,...s){const o=In(t,this._firestore);let c;return c=typeof(r=$(r))=="string"||r instanceof On?Rh(this._dataReader,"Transaction.update",o._key,r,i,s):Ah(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,c),this}delete(t){const r=In(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=In(e,this._firestore),r=new Dr(this._firestore);return super.get(e).then(i=>new rn(this._firestore,r,t._key,i._document,new rr(!1,!1),t.converter))}};function Nk(n,e,t){n=ee(n,Ee);const r=Object.assign(Object.assign({},xk),t);return function(s){if(s.maxAttempts<1)throw new D(P.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,o,c){const l=new qe;return s.asyncQueue.enqueueAndForget(async()=>{const u=await KP(s);new WP(s.asyncQueue,u,c,o,l).au()}),l.promise}(ze(n),i=>e(new Dk(n,i)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vk(){return new go("deleteField")}function Mn(){return new wh("serverTimestamp")}function Ok(...n){return new Eh("arrayUnion",n)}function Lk(...n){return new Th("arrayRemove",n)}function Mk(n){return new bh("increment",n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(n){return ze(n=ee(n,Ee)),new Ly(n,e=>Oi(n,e))}(function(e,t=!0){(function(i){Ri=i})(sn),en(new Et("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new Ee(new JA(r.getProvider("auth-internal")),new eR(r.getProvider("app-check-internal")),function(u,d){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new D(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xn(u.options.projectId,d)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),pt(Tf,"4.7.3",e),pt(Tf,"4.7.3","esm2017")})();const Fk="@firebase/firestore-compat",Uk="0.3.38";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(n,e){if(e===void 0)return{merge:!1};if(e.mergeFields!==void 0&&e.merge!==void 0)throw new D("invalid-argument",`Invalid options passed to function ${n}(): You cannot specify both "merge" and "mergeFields".`);return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(){if(typeof Uint8Array>"u")throw new D("unimplemented","Uint8Arrays are not available in this environment.")}function Op(){if(!RR())throw new D("unimplemented","Blobs are unavailable in Firestore in this environment.")}let My=class Hl{constructor(e){this._delegate=e}static fromBase64String(e){return Op(),new Hl(qt.fromBase64String(e))}static fromUint8Array(e){return Vp(),new Hl(qt.fromUint8Array(e))}toBase64(){return Op(),this._delegate.toBase64()}toUint8Array(){return Vp(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(n){return Bk(n,["next","error","complete"])}function Bk(n,e){if(typeof n!="object"||n===null)return!1;const t=n;for(const r of e)if(r in t&&typeof t[r]=="function")return!0;return!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qk{enableIndexedDbPersistence(e,t){return sk(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return ok(e._delegate)}clearIndexedDbPersistence(e){return ak(e._delegate)}}class Fy{constructor(e,t,r){this._delegate=t,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof xn||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const t=this._delegate._getSettings();!e.merge&&t.host!==e.host&&Ut("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e=Object.assign(Object.assign({},t),e),delete e.merge),this._delegate._setSettings(e)}useEmulator(e,t,r={}){tk(this._delegate,e,t,r)}enableNetwork(){return lk(this._delegate)}disableNetwork(){return uk(this._delegate)}enablePersistence(e){let t=!1,r=!1;return e&&(t=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,my("synchronizeTabs",t,"experimentalForceOwningTab",r)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return ck(this._delegate)}onSnapshotsInSync(e){return Ck(this._delegate,e)}get app(){if(!this._appCompat)throw new D("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new wi(this,_t(this._delegate,e))}catch(t){throw tt(t,"collection()","Firestore.collection()")}}doc(e){try{return new vt(this,fe(this._delegate,e))}catch(t){throw tt(t,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new et(this,nk(this._delegate,e))}catch(t){throw tt(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return Nk(this._delegate,t=>e(new Uy(this,t)))}batch(){return ze(this._delegate),new By(new Ly(this._delegate,e=>Oi(this._delegate,e)))}loadBundle(e){return hk(this._delegate,e)}namedQuery(e){return dk(this._delegate,e).then(t=>t?new et(this,t):null)}}class wc extends Dh{constructor(e){super(),this.firestore=e}convertBytes(e){return new My(new qt(e))}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return vt.forKey(t,this.firestore,null)}}function $k(n){GA(n)}class Uy{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new wc(e)}get(e){const t=ir(e);return this._delegate.get(t).then(r=>new Qs(this._firestore,new rn(this._firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,t.converter)))}set(e,t,r){const i=ir(e);return r?(Oh("Transaction.set",r),this._delegate.set(i,t,r)):this._delegate.set(i,t),this}update(e,t,r,...i){const s=ir(e);return arguments.length===2?this._delegate.update(s,t):this._delegate.update(s,t,r,...i),this}delete(e){const t=ir(e);return this._delegate.delete(t),this}}class By{constructor(e){this._delegate=e}set(e,t,r){const i=ir(e);return r?(Oh("WriteBatch.set",r),this._delegate.set(i,t,r)):this._delegate.set(i,t),this}update(e,t,r,...i){const s=ir(e);return arguments.length===2?this._delegate.update(s,t):this._delegate.update(s,t,r,...i),this}delete(e){const t=ir(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class Er{constructor(e,t,r){this._firestore=e,this._userDataWriter=t,this._delegate=r}fromFirestore(e,t){const r=new bs(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new Js(this._firestore,r),t??{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){const r=Er.INSTANCES;let i=r.get(e);i||(i=new WeakMap,r.set(e,i));let s=i.get(t);return s||(s=new Er(e,new wc(e),t),i.set(t,s)),s}}Er.INSTANCES=new WeakMap;class vt{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new wc(e)}static forPath(e,t,r){if(e.length%2!==0)throw new D("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new vt(t,new pe(t._delegate,r,new L(e)))}static forKey(e,t,r){return new vt(t,new pe(t._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new wi(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new wi(this.firestore,_t(this._delegate,e))}catch(t){throw tt(t,"collection()","DocumentReference.collection()")}}isEqual(e){return e=$(e),e instanceof pe?Iy(this._delegate,e):!1}set(e,t){t=Oh("DocumentReference.set",t);try{return t?Np(this._delegate,e,t):Np(this._delegate,e)}catch(r){throw tt(r,"setDoc()","DocumentReference.set()")}}update(e,t,...r){try{return arguments.length===1?wr(this._delegate,e):wr(this._delegate,e,t,...r)}catch(i){throw tt(i,"updateDoc()","DocumentReference.update()")}}delete(){return Ic(this._delegate)}onSnapshot(...e){const t=qy(e),r=$y(e,i=>new Qs(this.firestore,new rn(this.firestore._delegate,this._userDataWriter,i._key,i._document,i.metadata,this._delegate.converter)));return Vi(this._delegate,t,r)}get(e){let t;return(e==null?void 0:e.source)==="cache"?t=Rk(this._delegate):(e==null?void 0:e.source)==="server"?t=Sk(this._delegate):t=xr(this._delegate),t.then(r=>new Qs(this.firestore,new rn(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)))}withConverter(e){return new vt(this.firestore,e?this._delegate.withConverter(Er.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function tt(n,e,t){return n.message=n.message.replace(e,t),n}function qy(n){for(const e of n)if(typeof e=="object"&&!Ql(e))return e;return{}}function $y(n,e){var t,r;let i;return Ql(n[0])?i=n[0]:Ql(n[1])?i=n[1]:typeof n[0]=="function"?i={next:n[0],error:n[1],complete:n[2]}:i={next:n[1],error:n[2],complete:n[3]},{next:s=>{i.next&&i.next(e(s))},error:(t=i.error)===null||t===void 0?void 0:t.bind(i),complete:(r=i.complete)===null||r===void 0?void 0:r.bind(i)}}class Qs{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new vt(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return Oy(this._delegate,e._delegate)}}class Js extends Qs{data(e){const t=this._delegate.data(e);return this._delegate._converter||KA(t!==void 0),t}}class et{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new wc(e)}where(e,t,r){try{return new et(this.firestore,Oe(this._delegate,Dy(e,t,r)))}catch(i){throw tt(i,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new et(this.firestore,Oe(this._delegate,Cr(e,t)))}catch(r){throw tt(r,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new et(this.firestore,Oe(this._delegate,yk(e)))}catch(t){throw tt(t,"limit()","Query.limit()")}}limitToLast(e){try{return new et(this.firestore,Oe(this._delegate,vk(e)))}catch(t){throw tt(t,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new et(this.firestore,Oe(this._delegate,Ik(...e)))}catch(t){throw tt(t,"startAt()","Query.startAt()")}}startAfter(...e){try{return new et(this.firestore,Oe(this._delegate,wk(...e)))}catch(t){throw tt(t,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new et(this.firestore,Oe(this._delegate,Ek(...e)))}catch(t){throw tt(t,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new et(this.firestore,Oe(this._delegate,Tk(...e)))}catch(t){throw tt(t,"endAt()","Query.endAt()")}}isEqual(e){return wy(this._delegate,e._delegate)}get(e){let t;return(e==null?void 0:e.source)==="cache"?t=Pk(this._delegate):(e==null?void 0:e.source)==="server"?t=kk(this._delegate):t=Nr(this._delegate),t.then(r=>new Jl(this.firestore,new Ln(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)))}onSnapshot(...e){const t=qy(e),r=$y(e,i=>new Jl(this.firestore,new Ln(this.firestore._delegate,this._userDataWriter,this._delegate,i._snapshot)));return Vi(this._delegate,t,r)}withConverter(e){return new et(this.firestore,e?this._delegate.withConverter(Er.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class zk{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new Js(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class Jl{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new et(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new Js(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(t=>new zk(this._firestore,t))}forEach(e,t){this._delegate.forEach(r=>{e.call(t,new Js(this._firestore,r))})}isEqual(e){return Oy(this._delegate,e._delegate)}}class wi extends et{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new vt(this.firestore,e):null}doc(e){try{return e===void 0?new vt(this.firestore,fe(this._delegate)):new vt(this.firestore,fe(this._delegate,e))}catch(t){throw tt(t,"doc()","CollectionReference.doc()")}}add(e){return yo(this._delegate,e).then(t=>new vt(this.firestore,t))}isEqual(e){return Iy(this._delegate,e._delegate)}withConverter(e){return new wi(this.firestore,e?this._delegate.withConverter(Er.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function ir(n){return ee(n,pe)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(...e){this._delegate=new On(...e)}static documentId(){return new Lh(ue.keyField().canonicalString())}isEqual(e){return e=$(e),e instanceof On?this._delegate._internalPath.isEqual(e._internalPath):!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this._delegate=e}static serverTimestamp(){const e=Mn();return e._methodName="FieldValue.serverTimestamp",new tr(e)}static delete(){const e=Vk();return e._methodName="FieldValue.delete",new tr(e)}static arrayUnion(...e){const t=Ok(...e);return t._methodName="FieldValue.arrayUnion",new tr(t)}static arrayRemove(...e){const t=Lk(...e);return t._methodName="FieldValue.arrayRemove",new tr(t)}static increment(e){const t=Mk(e);return t._methodName="FieldValue.increment",new tr(t)}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jk={Firestore:Fy,GeoPoint:hc,Timestamp:de,Blob:My,Transaction:Uy,WriteBatch:By,DocumentReference:vt,DocumentSnapshot:Qs,Query:et,QueryDocumentSnapshot:Js,QuerySnapshot:Jl,CollectionReference:wi,FieldPath:Lh,FieldValue:tr,setLogLevel:$k,CACHE_SIZE_UNLIMITED:ik};function Wk(n,e){n.INTERNAL.registerComponent(new Et("firestore-compat",t=>{const r=t.getProvider("app-compat").getImmediate(),i=t.getProvider("firestore").getImmediate();return e(r,i)},"PUBLIC").setServiceProps(Object.assign({},jk)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gk(n){Wk(n,(e,t)=>new Fy(e,t,new qk)),n.registerVersion(Fk,Uk)}Gk(mt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy="firebasestorage.googleapis.com",jy="storageBucket",Kk=2*60*1e3,Hk=10*60*1e3,Qk=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge extends Je{constructor(e,t,r=0){super(dl(e),`Firebase Storage: ${t} (${dl(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ge.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return dl(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ce;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ce||(ce={}));function dl(n){return"storage/"+n}function Mh(){const n="An unknown error occurred, please check the error payload for server response.";return new ge(ce.UNKNOWN,n)}function Jk(n){return new ge(ce.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Yk(n){return new ge(ce.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Xk(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ge(ce.UNAUTHENTICATED,n)}function Zk(){return new ge(ce.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function e0(n){return new ge(ce.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Wy(){return new ge(ce.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Gy(){return new ge(ce.CANCELED,"User canceled the upload/download.")}function t0(n){return new ge(ce.INVALID_URL,"Invalid URL '"+n+"'.")}function n0(n){return new ge(ce.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function r0(){return new ge(ce.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+jy+"' property when initializing the app?")}function Ky(){return new ge(ce.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function i0(){return new ge(ce.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function s0(){return new ge(ce.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function o0(n){return new ge(ce.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ri(n){return new ge(ce.INVALID_ARGUMENT,n)}function Hy(){return new ge(ce.APP_DELETED,"The Firebase app was deleted.")}function Qy(n){return new ge(ce.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function As(n,e){return new ge(ce.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function cs(n){throw new ge(ce.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Qe.makeFromUrl(e,t)}catch{return new Qe(e,"")}if(r.path==="")return r;throw n0(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(W){W.path.charAt(W.path.length-1)==="/"&&(W.path_=W.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function u(W){W.path_=decodeURIComponent(W.path)}const d="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",I=new RegExp(`^https?://${p}/${d}/b/${i}/o${g}`,"i"),S={bucket:1,path:3},x=t===zy?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",U=new RegExp(`^https?://${x}/${i}/${C}`,"i"),F=[{regex:c,indices:l,postModify:s},{regex:I,indices:S,postModify:u},{regex:U,indices:{bucket:1,path:2},postModify:u}];for(let W=0;W<F.length;W++){const Q=F[W],G=Q.regex.exec(e);if(G){const w=G[Q.indices.bucket];let _=G[Q.indices.path];_||(_=""),r=new Qe(w,_),Q.postModify(r);break}}if(r==null)throw t0(e);return r}}class a0{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c0(n,e,t){let r=1,i=null,s=null,o=!1,c=0;function l(){return c===2}let u=!1;function d(...C){u||(u=!0,e.apply(null,C))}function p(C){i=setTimeout(()=>{i=null,n(I,l())},C)}function g(){s&&clearTimeout(s)}function I(C,...U){if(u){g();return}if(C){g(),d.call(null,C,...U);return}if(l()||o){g(),d.call(null,C,...U);return}r<64&&(r*=2);let F;c===1?(c=2,F=0):F=(r+Math.random())*1e3,p(F)}let S=!1;function x(C){S||(S=!0,g(),!u&&(i!==null?(C||(c=2),clearTimeout(i),p(0)):C||(c=1)))}return p(0),s=setTimeout(()=>{o=!0,x(!0)},t),x}function l0(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u0(n){return n!==void 0}function h0(n){return typeof n=="function"}function d0(n){return typeof n=="object"&&!Array.isArray(n)}function Ec(n){return typeof n=="string"||n instanceof String}function Lp(n){return Fh()&&n instanceof Blob}function Fh(){return typeof Blob<"u"}function Yl(n,e,t,r){if(r<e)throw ri(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw ri(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Jy(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var cr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(cr||(cr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yy(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f0{constructor(e,t,r,i,s,o,c,l,u,d,p,g=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=l,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((I,S)=>{this.resolve_=I,this.reject_=S,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Ko(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=c=>{const l=c.loaded,u=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const c=s.getErrorCode()===cr.NO_ERROR,l=s.getStatus();if(!c||Yy(l,this.additionalRetryCodes_)&&this.retry){const d=s.getErrorCode()===cr.ABORT;r(!1,new Ko(!1,null,d));return}const u=this.successCodes_.indexOf(l)!==-1;r(!0,new Ko(u,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(c,c.getResponse());u0(l)?s(l):s()}catch(l){o(l)}else if(c!==null){const l=Mh();l.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,l)):o(l)}else if(i.canceled){const l=this.appDelete_?Hy():Gy();o(l)}else{const l=Wy();o(l)}};this.canceled_?t(!1,new Ko(!1,null,!0)):this.backoffId_=c0(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&l0(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ko{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function p0(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function m0(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function g0(n,e){e&&(n["X-Firebase-GMPID"]=e)}function _0(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function y0(n,e,t,r,i,s,o=!0){const c=Jy(n.urlParams),l=n.url+c,u=Object.assign({},n.headers);return g0(u,e),p0(u,t),m0(u,s),_0(u,r),new f0(l,n.method,u,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v0(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function I0(...n){const e=v0();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Fh())return new Blob(n);throw new ge(ce.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function w0(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E0(n){if(typeof atob>"u")throw o0("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class fl{constructor(e,t){this.data=e,this.contentType=t||null}}function Xy(n,e){switch(n){case It.RAW:return new fl(Zy(e));case It.BASE64:case It.BASE64URL:return new fl(ev(n,e));case It.DATA_URL:return new fl(b0(e),A0(e))}throw Mh()}function Zy(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function T0(n){let e;try{e=decodeURIComponent(n)}catch{throw As(It.DATA_URL,"Malformed data URL.")}return Zy(e)}function ev(n,e){switch(n){case It.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw As(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case It.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw As(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=E0(e)}catch(i){throw i.message.includes("polyfill")?i:As(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class tv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw As(It.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=R0(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function b0(n){const e=new tv(n);return e.base64?ev(It.BASE64,e.rest):T0(e.rest)}function A0(n){return new tv(n).contentType}function R0(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t){let r=0,i="";Lp(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Lp(this.data_)){const r=this.data_,i=w0(r,e,t);return i===null?null:new Wt(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Wt(r,!0)}}static getBlob(...e){if(Fh()){const t=e.map(r=>r instanceof Wt?r.data_:r);return new Wt(I0.apply(null,t))}else{const t=e.map(o=>Ec(o)?Xy(It.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)i[s++]=o[c]}),new Wt(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(n){let e;try{e=JSON.parse(n)}catch{return null}return d0(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S0(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function P0(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function nv(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k0(n,e){return e}class Ze{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||k0}}let Ho=null;function C0(n){return!Ec(n)||n.length<2?n:nv(n)}function Tc(){if(Ho)return Ho;const n=[];n.push(new Ze("bucket")),n.push(new Ze("generation")),n.push(new Ze("metageneration")),n.push(new Ze("name","fullPath",!0));function e(s,o){return C0(o)}const t=new Ze("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new Ze("size");return i.xform=r,n.push(i),n.push(new Ze("timeCreated")),n.push(new Ze("updated")),n.push(new Ze("md5Hash",null,!0)),n.push(new Ze("cacheControl",null,!0)),n.push(new Ze("contentDisposition",null,!0)),n.push(new Ze("contentEncoding",null,!0)),n.push(new Ze("contentLanguage",null,!0)),n.push(new Ze("contentType",null,!0)),n.push(new Ze("metadata","customMetadata",!0)),Ho=n,Ho}function x0(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new Qe(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function D0(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return x0(r,n),r}function rv(n,e,t){const r=Uh(e);return r===null?null:D0(n,r,t)}function N0(n,e,t,r){const i=Uh(e);if(i===null||!Ec(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const d=n.bucket,p=n.fullPath,g="/b/"+o(d)+"/o/"+o(p),I=zn(g,t,r),S=Jy({alt:"media",token:u});return I+S})[0]}function Bh(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp="prefixes",Fp="items";function V0(n,e,t){const r={prefixes:[],items:[],nextPageToken:t.nextPageToken};if(t[Mp])for(const i of t[Mp]){const s=i.replace(/\/$/,""),o=n._makeStorageReference(new Qe(e,s));r.prefixes.push(o)}if(t[Fp])for(const i of t[Fp]){const s=n._makeStorageReference(new Qe(e,i.name));r.items.push(s)}return r}function O0(n,e,t){const r=Uh(t);return r===null?null:V0(n,e,r)}class hn{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(n){if(!n)throw Mh()}function bc(n,e){function t(r,i){const s=rv(n,i,e);return Mt(s!==null),s}return t}function L0(n,e){function t(r,i){const s=O0(n,e,i);return Mt(s!==null),s}return t}function M0(n,e){function t(r,i){const s=rv(n,i,e);return Mt(s!==null),N0(s,i,n.host,n._protocol)}return t}function Li(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=Zk():i=Xk():t.getStatus()===402?i=Yk(n.bucket):t.getStatus()===403?i=e0(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function Ac(n){const e=Li(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=Jk(n.path)),s.serverResponse=i.serverResponse,s}return t}function iv(n,e,t){const r=e.fullServerUrl(),i=zn(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,c=new hn(i,s,bc(n,t),o);return c.errorHandler=Ac(e),c}function F0(n,e,t,r,i){const s={};e.isRoot?s.prefix="":s.prefix=e.path+"/",t.length>0&&(s.delimiter=t),r&&(s.pageToken=r),i&&(s.maxResults=i);const o=e.bucketOnlyServerUrl(),c=zn(o,n.host,n._protocol),l="GET",u=n.maxOperationRetryTime,d=new hn(c,l,L0(n,e.bucket),u);return d.urlParams=s,d.errorHandler=Li(e),d}function U0(n,e,t){const r=e.fullServerUrl(),i=zn(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,c=new hn(i,s,M0(n,t),o);return c.errorHandler=Ac(e),c}function B0(n,e,t,r){const i=e.fullServerUrl(),s=zn(i,n.host,n._protocol),o="PATCH",c=Bh(t,r),l={"Content-Type":"application/json; charset=utf-8"},u=n.maxOperationRetryTime,d=new hn(s,o,bc(n,r),u);return d.headers=l,d.body=c,d.errorHandler=Ac(e),d}function q0(n,e){const t=e.fullServerUrl(),r=zn(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function o(l,u){}const c=new hn(r,i,o,s);return c.successCodes=[200,204],c.errorHandler=Ac(e),c}function $0(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function sv(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=$0(null,e)),r}function z0(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let F="";for(let W=0;W<2;W++)F=F+Math.random().toString().slice(2);return F}const l=c();o["Content-Type"]="multipart/related; boundary="+l;const u=sv(e,r,i),d=Bh(u,t),p="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+l+`\r
Content-Type: `+u.contentType+`\r
\r
`,g=`\r
--`+l+"--",I=Wt.getBlob(p,r,g);if(I===null)throw Ky();const S={name:u.fullPath},x=zn(s,n.host,n._protocol),C="POST",U=n.maxUploadRetryTime,z=new hn(x,C,bc(n,t),U);return z.urlParams=S,z.headers=o,z.body=I.uploadData(),z.errorHandler=Li(e),z}class Oa{constructor(e,t,r,i){this.current=e,this.total=t,this.finalized=!!r,this.metadata=i||null}}function qh(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{Mt(!1)}return Mt(!!t&&(e||["active"]).indexOf(t)!==-1),t}function j0(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o=sv(e,r,i),c={name:o.fullPath},l=zn(s,n.host,n._protocol),u="POST",d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},p=Bh(o,t),g=n.maxUploadRetryTime;function I(x){qh(x);let C;try{C=x.getResponseHeader("X-Goog-Upload-URL")}catch{Mt(!1)}return Mt(Ec(C)),C}const S=new hn(l,u,I,g);return S.urlParams=c,S.headers=d,S.body=p,S.errorHandler=Li(e),S}function W0(n,e,t,r){const i={"X-Goog-Upload-Command":"query"};function s(u){const d=qh(u,["active","final"]);let p=null;try{p=u.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Mt(!1)}p||Mt(!1);const g=Number(p);return Mt(!isNaN(g)),new Oa(g,r.size(),d==="final")}const o="POST",c=n.maxUploadRetryTime,l=new hn(t,o,s,c);return l.headers=i,l.errorHandler=Li(e),l}const Up=256*1024;function G0(n,e,t,r,i,s,o,c){const l=new Oa(0,0);if(o?(l.current=o.current,l.total=o.total):(l.current=0,l.total=r.size()),r.size()!==l.total)throw i0();const u=l.total-l.current;let d=u;i>0&&(d=Math.min(d,i));const p=l.current,g=p+d;let I="";d===0?I="finalize":u===d?I="upload, finalize":I="upload";const S={"X-Goog-Upload-Command":I,"X-Goog-Upload-Offset":`${l.current}`},x=r.slice(p,g);if(x===null)throw Ky();function C(W,Q){const G=qh(W,["active","final"]),w=l.current+d,_=r.size();let v;return G==="final"?v=bc(e,s)(W,Q):v=null,new Oa(w,_,G==="final",v)}const U="POST",z=e.maxUploadRetryTime,F=new hn(t,U,C,z);return F.headers=S,F.body=x.uploadData(),F.progressCallback=c||null,F.errorHandler=Li(n),F}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K0={STATE_CHANGED:"state_changed"},nt={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function pl(n){switch(n){case"running":case"pausing":case"canceling":return nt.RUNNING;case"paused":return nt.PAUSED;case"success":return nt.SUCCESS;case"canceled":return nt.CANCELED;case"error":return nt.ERROR;default:return nt.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H0{constructor(e,t,r){if(h0(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const s=e;this.next=s.next,this.error=s.error,this.complete=s.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class Q0{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=cr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=cr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=cr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw cs("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw cs("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw cs("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw cs("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw cs("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class J0 extends Q0{initXhr(){this.xhr_.responseType="text"}}function xt(){return new J0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=Tc(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=i=>{if(this._request=void 0,this._chunkMultiplier=1,i._codeEquals(ce.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const s=this.isExponentialBackoffExpired();if(Yy(i.status,[]))if(s)i=Wy();else{this.sleepTime=Math.max(this.sleepTime*2,Qk),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=i,this._transition("error")}},this._metadataErrorHandler=i=>{this._request=void 0,i._codeEquals(ce.CANCELED)?this.completeTransitions_():(this._error=i,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((i,s)=>{this._resolve=i,this._reject=s,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=j0(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,xt,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._uploadUrl=s,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const i=W0(this._ref.storage,this._ref._location,e,this._blob),s=this._ref.storage._makeRequest(i,xt,t,r);this._request=s,s.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Up*this._chunkMultiplier,t=new Oa(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((i,s)=>{let o;try{o=G0(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(l){this._error=l,this._transition("error");return}const c=this._ref.storage._makeRequest(o,xt,i,s,!1);this._request=c,c.getPromise().then(l=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(l.current),l.finalized?(this._metadata=l.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Up*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=iv(this._ref.storage,this._ref._location,this._mappings),i=this._ref.storage._makeRequest(r,xt,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=z0(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,xt,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Gy(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=pl(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,i){const s=new H0(t||void 0,r||void 0,i||void 0);return this._addObserver(s),()=>{this._removeObserver(s)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(pl(this._state)){case nt.SUCCESS:jr(this._resolve.bind(null,this.snapshot))();break;case nt.CANCELED:case nt.ERROR:const t=this._reject;jr(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(pl(this._state)){case nt.RUNNING:case nt.PAUSED:e.next&&jr(e.next.bind(e,this.snapshot))();break;case nt.SUCCESS:e.complete&&jr(e.complete.bind(e))();break;case nt.CANCELED:case nt.ERROR:e.error&&jr(e.error.bind(e,this._error))();break;default:e.error&&jr(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,t){this._service=e,t instanceof Qe?this._location=t:this._location=Qe.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Tr(e,t)}get root(){const e=new Qe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return nv(this._location.path)}get storage(){return this._service}get parent(){const e=S0(this._location.path);if(e===null)return null;const t=new Qe(this._location.bucket,e);return new Tr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Qy(e)}}function Y0(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new ov(n,new Wt(e),t)}function X0(n){const e={prefixes:[],items:[]};return av(n,e).then(()=>e)}async function av(n,e,t){const i=await cv(n,{pageToken:t});e.prefixes.push(...i.prefixes),e.items.push(...i.items),i.nextPageToken!=null&&await av(n,e,i.nextPageToken)}function cv(n,e){e!=null&&typeof e.maxResults=="number"&&Yl("options.maxResults",1,1e3,e.maxResults);const t=e||{},r=F0(n.storage,n._location,"/",t.pageToken,t.maxResults);return n.storage.makeRequestWithTokens(r,xt)}function Z0(n){n._throwIfRoot("getMetadata");const e=iv(n.storage,n._location,Tc());return n.storage.makeRequestWithTokens(e,xt)}function eC(n,e){n._throwIfRoot("updateMetadata");const t=B0(n.storage,n._location,e,Tc());return n.storage.makeRequestWithTokens(t,xt)}function tC(n){n._throwIfRoot("getDownloadURL");const e=U0(n.storage,n._location,Tc());return n.storage.makeRequestWithTokens(e,xt).then(t=>{if(t===null)throw s0();return t})}function nC(n){n._throwIfRoot("deleteObject");const e=q0(n.storage,n._location);return n.storage.makeRequestWithTokens(e,xt)}function lv(n,e){const t=P0(n._location.path,e),r=new Qe(n._location.bucket,t);return new Tr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rC(n){return/^[A-Za-z]+:\/\//.test(n)}function iC(n,e){return new Tr(n,e)}function uv(n,e){if(n instanceof $h){const t=n;if(t._bucket==null)throw r0();const r=new Tr(t,t._bucket);return e!=null?uv(r,e):r}else return e!==void 0?lv(n,e):n}function sC(n,e){if(e&&rC(e)){if(n instanceof $h)return iC(n,e);throw ri("To use ref(service, url), the first argument must be a Storage instance.")}else return uv(n,e)}function Bp(n,e){const t=e==null?void 0:e[jy];return t==null?null:Qe.makeFromBucketSpec(t,n)}function oC(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:nm(i,n.app.options.projectId))}class $h{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=zy,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Kk,this._maxUploadRetryTime=Hk,this._requests=new Set,i!=null?this._bucket=Qe.makeFromBucketSpec(i,this._host):this._bucket=Bp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Qe.makeFromBucketSpec(this._url,e):this._bucket=Bp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Yl("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Yl("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Tr(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new a0(Hy());{const o=y0(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const qp="@firebase/storage",$p="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aC="storage";function cC(n,e,t){return n=$(n),Y0(n,e,t)}function lC(n){return n=$(n),Z0(n)}function uC(n,e){return n=$(n),eC(n,e)}function hC(n,e){return n=$(n),cv(n,e)}function dC(n){return n=$(n),X0(n)}function fC(n){return n=$(n),tC(n)}function pC(n){return n=$(n),nC(n)}function zp(n,e){return n=$(n),sC(n,e)}function mC(n,e){return lv(n,e)}function gC(n,e,t,r={}){oC(n,e,t,r)}function _C(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new $h(t,r,i,e,sn)}function yC(){en(new Et(aC,_C,"PUBLIC").setMultipleInstances(!0)),pt(qp,$p,""),pt(qp,$p,"esm2017")}yC();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,t,r){this._delegate=e,this.task=t,this.ref=r}get bytesTransferred(){return this._delegate.bytesTransferred}get metadata(){return this._delegate.metadata}get state(){return this._delegate.state}get totalBytes(){return this._delegate.totalBytes}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}get snapshot(){return new Qo(this._delegate.snapshot,this,this._ref)}then(e,t){return this._delegate.then(r=>{if(e)return e(new Qo(r,this,this._ref))},t)}on(e,t,r,i){let s;return t&&(typeof t=="function"?s=o=>t(new Qo(o,this,this._ref)):s={next:t.next?o=>t.next(new Qo(o,this,this._ref)):void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,s,r||void 0,i||void 0)}}class Wp{constructor(e,t){this._delegate=e,this._service=t}get prefixes(){return this._delegate.prefixes.map(e=>new Xt(e,this._service))}get items(){return this._delegate.items.map(e=>new Xt(e,this._service))}get nextPageToken(){return this._delegate.nextPageToken||null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t){this._delegate=e,this.storage=t}get name(){return this._delegate.name}get bucket(){return this._delegate.bucket}get fullPath(){return this._delegate.fullPath}toString(){return this._delegate.toString()}child(e){const t=mC(this._delegate,e);return new Xt(t,this.storage)}get root(){return new Xt(this._delegate.root,this.storage)}get parent(){const e=this._delegate.parent;return e==null?null:new Xt(e,this.storage)}put(e,t){return this._throwIfRoot("put"),new jp(cC(this._delegate,e,t),this)}putString(e,t=It.RAW,r){this._throwIfRoot("putString");const i=Xy(t,e),s=Object.assign({},r);return s.contentType==null&&i.contentType!=null&&(s.contentType=i.contentType),new jp(new ov(this._delegate,new Wt(i.data,!0),s),this)}listAll(){return dC(this._delegate).then(e=>new Wp(e,this.storage))}list(e){return hC(this._delegate,e||void 0).then(t=>new Wp(t,this.storage))}getMetadata(){return lC(this._delegate)}updateMetadata(e){return uC(this._delegate,e)}getDownloadURL(){return fC(this._delegate)}delete(){return this._throwIfRoot("delete"),pC(this._delegate)}_throwIfRoot(e){if(this._delegate._location.path==="")throw Qy(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(e,t){this.app=e,this._delegate=t}get maxOperationRetryTime(){return this._delegate.maxOperationRetryTime}get maxUploadRetryTime(){return this._delegate.maxUploadRetryTime}ref(e){if(Gp(e))throw ri("ref() expected a child path but got a URL, use refFromURL instead.");return new Xt(zp(this._delegate,e),this)}refFromURL(e){if(!Gp(e))throw ri("refFromURL() expected a full URL but got a child path, use ref() instead.");try{Qe.makeFromUrl(e,this._delegate.host)}catch{throw ri("refFromUrl() expected a valid full URL but got an invalid one.")}return new Xt(zp(this._delegate,e),this)}setMaxUploadRetryTime(e){this._delegate.maxUploadRetryTime=e}setMaxOperationRetryTime(e){this._delegate.maxOperationRetryTime=e}useEmulator(e,t,r={}){gC(this._delegate,e,t,r)}}function Gp(n){return/^[A-Za-z]+:\/\//.test(n)}const vC="@firebase/storage-compat",IC="0.3.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wC="storage-compat";function EC(n,{instanceIdentifier:e}){const t=n.getProvider("app-compat").getImmediate(),r=n.getProvider("storage").getImmediate({identifier:e});return new hv(t,r)}function TC(n){const e={TaskState:nt,TaskEvent:K0,StringFormat:It,Storage:hv,Reference:Xt};n.INTERNAL.registerComponent(new Et(wC,EC,"PUBLIC").setServiceProps(e).setMultipleInstances(!0)),n.registerVersion(vC,IC)}TC(mt);const bC={apiKey:"AIzaSyDaXyH96jd-k3r1MRaDiN9KWo2oN2lpaW4",authDomain:"editor-app-29ca6.firebaseapp.com",projectId:"editor-app-29ca6",storageBucket:"editor-app-29ca6.firebasestorage.app",messagingSenderId:"666399306180",appId:"1:666399306180:web:619b5765655311d4a03491"};mt.apps.length||mt.initializeApp(bC);mt.app();const AC=mt.firestore(),dv=mt.auth();mt.storage();dv.setPersistence(mt.auth.Auth.Persistence.LOCAL);console.log("[Firebase] Initialized via npm compat");function Se(){return AC}function vo(){return dv}function RC(){console.log("[Firebase] Explicit initialization called (already initialized at module level).")}const Qt={selectedWorkId:localStorage.getItem("plotter_selectedWorkId"),currentTab:localStorage.getItem("plotter_currentTab")||"top",lastActiveTab:localStorage.getItem("plotter_lastActiveTab")||"plot",currentUser:null,isAuthReady:!1,listeners:[]};function Jt(n){Object.assign(Qt,n),n.currentTab&&(localStorage.setItem("plotter_currentTab",n.currentTab),n.currentTab!=="top"&&(Qt.lastActiveTab=n.currentTab,localStorage.setItem("plotter_lastActiveTab",n.currentTab))),n.hasOwnProperty("selectedWorkId")&&(Qt.selectedWorkId?localStorage.setItem("plotter_selectedWorkId",Qt.selectedWorkId):localStorage.removeItem("plotter_selectedWorkId")),console.log("[State] 更新:",n),SC()}function xe(){return{...Qt}}function Mi(n){return Qt.listeners.push(n),n(xe()),()=>{Qt.listeners=Qt.listeners.filter(e=>e!==n)}}function SC(){const n=xe();Qt.listeners.forEach(e=>e(n))}function PC(){const n=vo(),e=document.getElementById("google-login-btn");e&&e.addEventListener("click",kC);const t=document.querySelector(".main-header button");t&&t.addEventListener("click",CC),ET(n,r=>{r?(console.log("[Auth] ログイン完了:",r.displayName),Jt({currentUser:r,isAuthReady:!0})):(console.log("[Auth] ログアウト状態"),Jt({currentUser:null,isAuthReady:!0}))})}async function kC(){const n=vo(),e=new Rt;try{await ig(n,e)}catch(t){console.error("[Auth] ログインエラー:",t)}}async function CC(){const n=vo();try{await TT(n)}catch(e){console.error("[Auth] ログアウトエラー:",e)}}function xC(){Mi(n=>{DC(n),NC(n)}),VC(),document.addEventListener("click",n=>{n.target.classList.contains("back-to-top")&&Jt({currentTab:"top",selectedWorkId:null})})}function DC(n){const e=document.getElementById("login-screen"),t=document.getElementById("main-app");if(!n.isAuthReady){e&&(e.style.display="none"),t&&(t.style.display="none");return}n.currentUser?(e&&(e.style.display="none"),t&&(t.style.display="block")):(e&&(e.style.display="flex"),t&&(t.style.display="none"))}function NC(n){const e=n.currentTab||"top";["top","work-info","plot","characters","memo"].forEach(o=>{const c=document.getElementById(`tab-${o}`);c&&c.classList.toggle("active",e===o)}),document.querySelectorAll(".tab-nav .tab-btn").forEach(o=>{const c=o.getAttribute("data-tab");o.classList.toggle("active",e===c)});const i=document.querySelector(".tab-nav"),s=document.getElementById("common-back-to-top");i&&(e==="top"?(i.classList.add("hidden"),s&&(s.style.display="none")):(i.classList.remove("hidden"),s&&(s.style.display="block")))}function VC(){document.querySelectorAll(".tab-nav .tab-btn").forEach(e=>{const t=e.getAttribute("data-tab");e.addEventListener("click",()=>{Jt({currentTab:t})})})}function Le(n){return n?n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e]):""}function Kp(n,e=!1){if(!n)return"---";const t=n.toDate?n.toDate():new Date(n),r=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");if(!e)return`${r}/${i}/${s}`;const o=String(t.getHours()).padStart(2,"0"),c=String(t.getMinutes()).padStart(2,"0");return`${r}/${i}/${s} ${o}:${c}`}function Io(n){const e=typeof n=="string"?document.querySelector(n):n;if(e)for(;e.firstChild;)e.removeChild(e.firstChild)}function OC(n,e=300,t=300,r=.7){return new Promise((i,s)=>{const o=new FileReader;o.readAsDataURL(n),o.onload=c=>{const l=new Image;l.src=c.target.result,l.onload=()=>{const u=document.createElement("canvas");let d=l.width,p=l.height;d>p?d>e&&(p*=e/d,d=e):p>t&&(d*=t/p,p=t),u.width=d,u.height=p,u.getContext("2d").drawImage(l,0,0,d,p),i(u.toDataURL("image/jpeg",r))},l.onerror=s},o.onerror=s})}function bt(n){n&&(n.style.height="auto",n.style.height=n.scrollHeight+"px")}let lr=null,fa="normal",yt=[];function LC(){window.plotter_openPlotEditor=Xl,window.plotter_openPlotView=MC,window.plotter_deletePlot=BC,window.plotter_movePlot=qC;const n=document.getElementById("plot-save-btn");n&&n.addEventListener("click",UC);const e=document.getElementById("plot-edit-back");e&&e.addEventListener("click",Zl);const t=document.getElementById("plot-type-normal");t&&t.addEventListener("click",()=>La("normal"));const r=document.getElementById("plot-type-timeline");r&&r.addEventListener("click",()=>La("timeline"));const i=document.getElementById("plot-timeline-add-btn");i&&i.addEventListener("click",()=>FC());const s=document.getElementById("plot-content");s&&s.addEventListener("input",l=>bt(l.target));const o=document.getElementById("plot-view-back");o&&o.addEventListener("click",Zl);const c=document.getElementById("plot-view-edit-btn");c&&c.addEventListener("click",()=>Xl(lr))}async function MC(n){const e=xe();if(!e.selectedWorkId)return;lr=n,lr=n;const t=Se(),r=fe(t,"works",e.selectedWorkId,"plots",n),i=await xr(r);if(!i.exists())return;const s=i.data();document.getElementById("plot-list-view").style.display="none",document.getElementById("plot-edit-view").style.display="none",document.getElementById("plot-view-view").style.display="block",document.getElementById("plot-view-title").textContent=s.title||"無題";const o=document.getElementById("plot-view-basic-content-area"),c=document.getElementById("plot-view-basic-content"),l=document.getElementById("plot-view-timeline-content"),u=document.getElementById("plot-view-timeline-list");s.type==="timeline"?(o&&(o.style.display="none"),l.style.display="block",u.innerHTML=(s.timelineItems||[]).map(d=>`
            <div class="collapsible-container">
                <div class="collapsible-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    <div style="color:var(--clr-save); font-size:0.9rem; font-weight:bold;">${d.date||"日時未設定"}</div>
                </div>
                <div class="collapsible-content">
                    <div style="color:#ddd; white-space:pre-wrap; font-size:1.05rem;">${d.content||""}</div>
                </div>
            </div>
        `).join("")):(o&&(o.style.display="block"),l.style.display="none",c.textContent=s.content||"")}async function Xl(n=null){const e=xe();if(!e.selectedWorkId)return;lr=n,yt=[],document.getElementById("plot-list-view").style.display="none",document.getElementById("plot-view-view").style.display="none",document.getElementById("plot-edit-view").style.display="block";const t=document.getElementById("plot-type-selector");t&&(t.style.display=n?"none":"flex");const r=document.getElementById("plot-title"),i=document.getElementById("plot-content");if(n){const s=Se(),o=fe(s,"works",e.selectedWorkId,"plots",n),c=await xr(o);if(c.exists()){const l=c.data();r.value=l.title||"",i.value=l.content||"",yt=l.timelineItems||[],La(l.type||"normal"),setTimeout(()=>bt(i),0)}}else r.value="",i.value="",La("normal"),bt(i)}function La(n){fa=n,document.getElementById("plot-type-normal").classList.toggle("active",n==="normal"),document.getElementById("plot-type-timeline").classList.toggle("active",n==="timeline");const e=document.getElementById("plot-basic-content"),t=document.getElementById("plot-timeline-view");n==="timeline"?(e.style.display="none",t.style.display="block",Ma()):(e.style.display="block",t.style.display="none")}function FC(){yt.push({date:"",content:""}),Ma()}function Ma(){const n=document.getElementById("plot-timeline-list");n&&(n.innerHTML="",yt.forEach((e,t)=>{const r=document.createElement("div");r.className="collapsible-container",r.innerHTML=`
            <div class="collapsible-header" onclick="this.parentElement.classList.toggle('collapsed')">
                <div style="color:var(--clr-save); font-size:0.9rem; font-weight:bold;">${e.date||"（新規エントリー）"}</div>
            </div>
            <div class="collapsible-content">
                <div style="display:flex; gap:10px; margin-bottom:10px; alignItems:flex-start;">
                    <input type="text" class="tl-date" placeholder="日時" value="${e.date}"
                        style="width:80px; padding:6px; background:#0a0a0a; border:1px solid #333; color:var(--clr-save); font-size:0.85rem; align-self: center; text-align: center;">
                    <textarea class="tl-content" placeholder="内容"
                        style="flex: 1; height:40px; padding:8px; background:#111; border:1px solid #444; color:#fff; font-size:0.95rem; resize:none; overflow-y:hidden;">${e.content}</textarea>
                    <div style="display:flex; gap:4px; align-items: center;">
                        <button class="btn-sort tl-up" style="${t===0?"opacity:0.3; cursor:default;":""}">▲</button>
                        <button class="btn-icon tl-del" style="background:var(--clr-delete); color:#fff; width:24px; height:24px; border-radius:4px; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; font-weight:bold; font-size:1.1rem; padding: 0;">×</button>
                    </div>
                </div>
            </div>
        `;const i=r.querySelector(".tl-date"),s=r.querySelector(".tl-content");i.addEventListener("input",o=>{yt[t].date=o.target.value,r.querySelector(".collapsible-header div").textContent=o.target.value||"（空の日時）"}),s.addEventListener("input",o=>{yt[t].content=o.target.value,bt(o.target)}),setTimeout(()=>bt(s),0),r.querySelector(".tl-up").addEventListener("click",()=>{if(t>0){const o=yt[t];yt[t]=yt[t-1],yt[t-1]=o,Ma()}}),r.querySelector(".tl-del").addEventListener("click",()=>{confirm("本当に削除しますか？")&&(yt.splice(t,1),Ma())}),n.appendChild(r)}))}async function UC(){const n=xe(),e=document.getElementById("plot-title").value.trim(),t=document.getElementById("plot-content").value;if(e)try{const r=window.firebase,i={title:e,content:fa==="timeline"?"":t,type:fa,timelineItems:fa==="timeline"?yt:[],updatedAt:r.firestore.FieldValue.serverTimestamp()},s=Se(),o=_t(s,"works",n.selectedWorkId,"plots");let c=lr;if(lr){const l=fe(s,"works",n.selectedWorkId,"plots",lr);await wr(l,i)}else{const l=Oe(o),u=await Nr(l);i.order=u.size,i.createdAt=Mn(),c=(await yo(o,i)).id}Zl()}catch(r){console.error("[PlotEditor] 保存エラー:",r)}}function Zl(){document.getElementById("plot-list-view").style.display="block",document.getElementById("plot-edit-view").style.display="none",document.getElementById("plot-view-view").style.display="none"}async function BC(n){if(!confirm("本当に削除しますか？"))return;const e=xe(),t=Se();try{const r=fe(t,"works",e.selectedWorkId,"plots",n);await Ic(r)}catch(r){console.error("[PlotEditor] 削除エラー:",r)}}async function qC(n,e){const t=xe(),r=Se(),i=_t(r,"works",t.selectedWorkId,"plots");try{const s=Oe(i,Cr("order","asc")),o=await Nr(s),c=[];o.forEach(S=>c.push({id:S.id,...S.data()}));const l=c.findIndex(S=>S.id===n);if(l===-1)return;const u=l+e;if(u<0||u>=c.length)return;const d=c[u],p=Vh(r),g=fe(r,"works",t.selectedWorkId,"plots",n),I=fe(r,"works",t.selectedWorkId,"plots",d.id);p.update(g,{order:u}),p.update(I,{order:l}),await p.commit()}catch(s){console.error("[PlotEditor] 並び替えエラー:",s)}}let Jo=null;function $C(){const n=document.getElementById("plot-new-btn");n&&n.addEventListener("click",()=>Xl()),Mi(e=>{e.currentTab==="plot"&&zC(e)})}function zC(n){const e=document.getElementById("plot-list-container");if(!e)return;if(Jo&&(Jo(),Jo=null),!n.selectedWorkId){e.innerHTML='<div style="text-align:center; padding:40px; color:#666;">作品を選択してください</div>';return}const t=Se(),r=_t(t,"works",n.selectedWorkId,"plots"),i=Oe(r,Cr("order","asc"));Jo=Vi(i,s=>{jC(s,e)},s=>{console.error("[PlotList] プロット監視エラー:",s)})}function jC(n,e){if(Io(e),n.empty){e.innerHTML='<div style="text-align:center; padding:40px; color:#666;">プロットがありません</div>';return}n.forEach(t=>{const r={id:t.id,...t.data()},i=WC(r);e.appendChild(i)})}function WC(n){const e=document.createElement("div");e.className="collapsible-container collapsed card-retro",e.style.padding="0",e.style.marginBottom="15px";const t=()=>n.type==="timeline"?(n.timelineItems||[]).slice(0,3).map(i=>`
                <div style="font-size:0.85rem; border-left:2px solid var(--clr-save); padding-left:8px; margin-bottom:4px; color:#999;">
                    <span style="color:var(--clr-save); opacity:0.7;">${i.date||"-"}</span>: ${Le(i.content||"")}
                </div>
            `).join("")+((n.timelineItems||[]).length>3?'<div style="color:#666; font-size:0.8rem; margin-top:4px;">...他多数</div>':""):`<div class="line-clamp-5" style="color:#ddd; white-space:pre-wrap; font-size:0.95rem;">${Le(n.content||"")||"内容なし"}</div>`;e.innerHTML=`
        <div class="collapsible-header" style="padding: 12px; display:flex; justify-content:space-between; align-items:center; background: #1a1a1a; border-radius: 8px 8px 0 0; min-height:50px;">
            <div class="header-click-area" style="flex:1; cursor:pointer; display:flex; align-items:center; gap:8px; min-width:0;">
                <h3 style="font-size:1.1rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1; margin:0;">${Le(n.title||"無題")}</h3>
                <span class="tag" style="color:var(--clr-save); border-color:var(--clr-save); font-size:0.7rem; flex-shrink:0;">${n.type==="timeline"?"TL":"基本"}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; margin-left:12px;">
                <button class="btn-retro btn-delete" style="background:var(--clr-delete); font-size:0.75rem; padding:4px 8px; border-radius:4px;">削除</button>
                <button class="btn-retro btn-edit blue" style="font-size:0.75rem; padding:4px 8px; border-radius:4px;">編集</button>
                <button class="btn-sort btn-up" style="padding:4px 8px;">▲</button>
                <span class="toggle-icon gold-bold" style="width:1.2rem; font-size:1.2rem; display:flex; justify-content:center; cursor:pointer; color:var(--clr-save);">＋</span>
            </div>
        </div>
        <div class="collapsible-content summary-mode" style="padding: 12px; background: #0a0a0a; border-radius: 0 0 8px 8px; cursor:pointer; border-top:1px solid #222;">
            ${t()}
        </div>
    `;const r=()=>{const i=e.classList.toggle("collapsed"),s=e.querySelector(".collapsible-content"),o=e.querySelector(".toggle-icon");o.textContent=i?"＋":"－",i?(s.classList.add("summary-mode"),s.innerHTML=t()):(s.classList.remove("summary-mode"),n.type==="timeline"?GC(n,s):s.innerHTML=`<div style="color:#eee; white-space:pre-wrap; font-size:1.05rem; line-height:1.6;">${Le(n.content||"")}</div>`)};return e.querySelector(".collapsible-header").addEventListener("click",r),e.querySelector(".collapsible-content").addEventListener("click",i=>{e.classList.contains("collapsed")&&r()}),e.querySelector(".btn-edit").addEventListener("click",i=>{i.stopPropagation(),window.plotter_openPlotEditor&&window.plotter_openPlotEditor(n.id)}),e.querySelector(".btn-up").addEventListener("click",i=>{i.stopPropagation(),window.plotter_movePlot&&window.plotter_movePlot(n.id,-1)}),e.querySelector(".btn-delete").addEventListener("click",i=>{i.stopPropagation(),window.plotter_deletePlot&&window.plotter_deletePlot(n.id)}),e}function GC(n,e){e.innerHTML=(n.timelineItems||[]).map(t=>`
        <div style="margin-bottom:12px; border-bottom:1px solid #222; padding-bottom:8px;">
            <div style="color:var(--clr-save); font-size:0.85rem; font-weight:bold; margin-bottom:4px;">${t.date||"-"}</div>
            <div style="color:#eee; white-space:pre-wrap; font-size:1rem;">${Le(t.content||"")}</div>
        </div>
    `).join("")||"内容なし"}function KC(n){return new Promise((e,t)=>{const r=new FileReader;r.onload=i=>{const s=new Image;s.onload=()=>{HC(s,e,t)},s.src=i.target.result},r.readAsDataURL(n)})}function HC(n,e,t){const r=document.createElement("div");r.style.cssText=`
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); z-index: 9999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        touch-action: none; font-family: sans-serif;
    `;const i=document.createElement("div");i.textContent="枠に合わせて調整してください",i.style.cssText="color: #fff; margin-bottom: 20px; font-weight: bold;",r.appendChild(i);const s=document.createElement("div");s.style.cssText=`
        position: relative; width: 300px; height: 300px;
        overflow: hidden; border: 2px solid var(--clr-save); background: #000;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `,r.appendChild(s);const o=document.createElement("canvas");o.width=300,o.height=300;const c=o.getContext("2d");s.appendChild(o);let l=n.width,u=n.height;const d=Math.max(300/l,300/u);let p=1,g=(300-l*d)/2,I=(300-u*d)/2;const S=()=>{const T=d*p;c.clearRect(0,0,300,300);const y=0,_e=300-l*T,$t=0,Vr=300-u*T;g=Math.min(y,Math.max(_e,g)),I=Math.min($t,Math.max(Vr,I)),c.drawImage(n,g,I,l*T,u*T)};S();const x=document.createElement("div");x.style.cssText="margin-top: 20px; width: 250px; display: flex; align-items: center; gap: 10px;";const C=document.createElement("span");C.textContent="拡大",C.style.color="#fff",C.style.fontSize="0.8rem";const U=document.createElement("input");U.type="range",U.min="1.0",U.max="3.0",U.step="0.01",U.value="1.0",U.style.flex="1",U.oninput=T=>{const y=p;p=parseFloat(T.target.value);const _e=d*p/(d*y);g=150-(150-g)*_e,I=150-(150-I)*_e,S()},x.appendChild(C),x.appendChild(U),r.appendChild(x);let z=!1,F,W;const Q=T=>{z=!0;const y=T.touches?T.touches[0].pageX:T.pageX,_e=T.touches?T.touches[0].pageY:T.pageY;F=y,W=_e},G=T=>{if(!z)return;const y=T.touches?T.touches[0].pageX:T.pageX,_e=T.touches?T.touches[0].pageY:T.pageY;g+=y-F,I+=_e-W,F=y,W=_e,S()},w=()=>{z=!1};s.addEventListener("mousedown",Q),window.addEventListener("mousemove",G),window.addEventListener("mouseup",w),s.addEventListener("touchstart",Q),window.addEventListener("touchmove",G),window.addEventListener("touchend",w),s.addEventListener("wheel",T=>{T.preventDefault();const y=T.deltaY>0?-.1:.1,_e=Math.min(3,Math.max(1,p+y));if(_e!==p){const $t=p;p=_e,U.value=p;const Vr=d*p/(d*$t);g=150-(150-g)*Vr,I=150-(150-I)*Vr,S()}},{passive:!1});const _=document.createElement("div");_.style.cssText="margin-top: 30px; display: flex; gap: 20px;";const v=document.createElement("button");v.textContent="キャンセル",v.className="btn-retro back",v.onclick=()=>{b(),t()};const E=document.createElement("button");E.textContent="決定",E.className="btn-retro save",E.onclick=()=>{const T=o.toDataURL("image/jpeg",.8);b(),e(T)},_.appendChild(v),_.appendChild(E),r.appendChild(_),document.body.appendChild(r);const b=()=>{window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",w),window.removeEventListener("touchmove",G),window.removeEventListener("touchend",w),document.body.removeChild(r)}}let wn=null,Rs=null,ii=null;function QC(){console.log("[CharEditor] 初期化開始..."),window.plotter_openCharEditor=eu,window.plotter_openCharView=zh,window.plotter_deleteChar=pv,window.plotter_moveChar=tu;const n=document.getElementById("char-save-btn");n?(console.log("[CharEditor] 保存ボタンを検出。イベントを登録します。"),n.addEventListener("click",ZC)):console.warn("[CharEditor] 保存ボタン (char-save-btn) が見つかりません。");const e=document.getElementById("char-edit-back");e&&e.addEventListener("click",Hp);const t=document.getElementById("char-icon-input");t&&t.addEventListener("change",XC);const r=document.getElementById("char-icon-change-btn");r&&t&&r.addEventListener("click",()=>t.click());const i=document.getElementById("char-item-add-btn");i&&i.addEventListener("click",()=>fv()),["char-looks","char-skill","char-history"].forEach(c=>{const l=document.getElementById(c);l&&l.addEventListener("input",u=>bt(u.target))});const s=document.getElementById("char-view-back");s&&s.addEventListener("click",Hp);const o=document.getElementById("char-view-edit-btn");o&&o.addEventListener("click",()=>eu(wn))}async function zh(n){const e=xe();if(!e.selectedWorkId)return;wn=n,document.getElementById("char-list-view").style.display="none",document.getElementById("char-view-view").style.display="block",document.getElementById("char-edit-view").style.display="none";const t=Se(),r=fe(t,"works",e.selectedWorkId,"characters",n),i=await xr(r);if(!i.exists())return;const s=i.data();ii=s.iconUrl;const o=document.getElementById("char-view-icon");o.innerHTML=s.iconUrl?`<img src="${s.iconUrl}" style="width:100%; height:100%; object-fit:cover;">`:'<span style="color:#444;">No Image</span>';const c=s.lastName||s.name||"名称未定",l=s.firstName||"",u=s.lastNameRuby||s.ruby||"",d=s.firstNameRuby||"";document.getElementById("char-view-last-name").textContent=c,document.getElementById("char-view-first-name").textContent=l,document.getElementById("char-view-last-ruby").textContent=u,document.getElementById("char-view-first-ruby").textContent=d,document.getElementById("char-view-alias").textContent=s.alias||"",document.getElementById("char-view-birth").textContent=s.birth||"",document.getElementById("char-view-age").textContent=s.age||"",document.getElementById("char-view-role").textContent=s.role||"",document.getElementById("char-view-height").textContent=s.height||"";const p=document.getElementById("char-view-memos"),g=[{label:"見た目・性格",value:s.looks},{label:"特技",value:s.skill},{label:"生い立ち",value:s.history}];s.customItems&&Array.isArray(s.customItems)&&s.customItems.forEach(I=>{(I.label||I.value)&&g.push({label:I.label||"(無題)",value:I.value||""})}),p.innerHTML=g.filter(I=>I.label&&I.value!==void 0&&I.value!==null&&I.value!=="").map(I=>`
            <div class="collapsible-container">
                <div class="collapsible-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    <div class="gold-bold" style="font-size:0.8rem; margin-bottom:0;">${Le(I.label)}</div>
                </div>
                <div class="collapsible-content">
                    <div style="color:#fff; white-space:pre-wrap; line-height:1.6; font-size:0.95rem;">${Le(I.value)}</div>
                </div>
            </div>
        `).join("")}async function eu(n=null){const e=xe();if(e.selectedWorkId)if(wn=n,Rs=null,document.getElementById("char-list-view").style.display="none",document.getElementById("char-view-view").style.display="none",document.getElementById("char-edit-view").style.display="block",JC(),n){const t=Se(),r=fe(t,"works",e.selectedWorkId,"characters",n),i=await xr(r);if(i.exists()){const s=i.data();ii=s.iconUrl,YC(s),setTimeout(()=>{["char-looks","char-skill","char-history"].forEach(o=>{const c=document.getElementById(o);c&&bt(c)})},0)}else ii=null}else ii=null}function JC(){["char-last-name","char-first-name","char-last-ruby","char-first-ruby","char-alias","char-age","char-birth","char-role","char-height","char-looks","char-skill","char-history"].forEach(e=>{const t=document.getElementById(e);t&&(t.value="")}),document.getElementById("char-custom-items").innerHTML="",document.getElementById("char-icon-preview").innerHTML='<span style="color:#444;">No Image</span>',document.getElementById("char-icon-input").value=""}function YC(n){document.getElementById("char-last-name").value=n.lastName||n.name||"",document.getElementById("char-first-name").value=n.firstName||"",document.getElementById("char-last-ruby").value=n.lastNameRuby||n.ruby||"",document.getElementById("char-first-ruby").value=n.firstNameRuby||"",document.getElementById("char-alias").value=n.alias||"",document.getElementById("char-age").value=n.age||"",document.getElementById("char-birth").value=n.birth||"",document.getElementById("char-role").value=n.role||"",document.getElementById("char-height").value=n.height||"",document.getElementById("char-looks").value=n.looks||"",document.getElementById("char-skill").value=n.skill||"",document.getElementById("char-history").value=n.history||"",n.iconUrl&&(document.getElementById("char-icon-preview").innerHTML=`<img src="${n.iconUrl}" style="width:100%; height:100%; object-fit:cover;">`),(n.customItems||[]).forEach(e=>fv(e.label,e.value))}async function XC(n){const e=n.target.files[0];if(e)try{const t=await KC(e);Rs=null,ii=t,document.getElementById("char-icon-preview").innerHTML=`<img src="${t}" style="width:100%; height:100%; object-fit:cover;">`}catch{}}function fv(n="",e=""){const t=document.getElementById("char-custom-items"),r=document.createElement("div");r.className="collapsible-container",r.innerHTML=`
        <div class="collapsible-header" onclick="this.parentElement.classList.toggle('collapsed')">
            <input type="text" class="custom-label" value="${n}" placeholder="項目名" 
                style="flex:1; font-size:0.9rem; color:#fff; background:transparent; border:none; padding:4px 0; font-weight:bold;"
                onclick="event.stopPropagation()">
            <div style="display:flex; gap:8px; align-items:center;">
                <button class="btn-delete-item" style="background:var(--clr-delete); color:#fff; padding:2px 8px; border-radius:4px; border:none; cursor:pointer; font-size:0.75rem; font-weight:bold;">削除</button>
                <button class="btn-up-item btn-sort" style="padding:2px 6px;">▲</button>
            </div>
        </div>
        <div class="collapsible-content">
            <textarea class="custom-value auto-resize" style="width:100%; height:60px; padding:8px; background:#111; border:1px solid #444; color:#fff; resize:none;">${e}</textarea>
        </div>
    `;const i=r.querySelector(".custom-value");i.addEventListener("input",s=>bt(s.target)),setTimeout(()=>bt(i),0),r.querySelector(".btn-delete-item").addEventListener("click",s=>{s.stopPropagation(),confirm("本当に削除しますか？")&&r.remove()}),r.querySelector(".btn-up-item").addEventListener("click",s=>{s.stopPropagation();const o=r.previousElementSibling;o&&t.insertBefore(r,o)}),t.appendChild(r)}async function ZC(){console.log("[CharEditor] 保存開始...");const n=xe();if(!n.selectedWorkId){console.warn("[CharEditor] 作品IDがありません");return}try{let e=ii;if(Rs){console.log("[CharEditor] 画像変換開始:",Rs.name);try{e=await OC(Rs,300,300,.7),console.log("[CharEditor] 画像変換完了 (Base64形式)")}catch(u){console.error("[CharEditor] 画像変換失敗:",u)}}const t=[],r=document.getElementById("char-custom-items");if(r){const u=r.querySelectorAll(".collapsible-container");console.log(`[CharEditor] カスタム項目を ${u.length} 件検出しました`),u.forEach(d=>{const p=d.querySelector(".custom-label"),g=d.querySelector(".custom-value");if(p&&g){const I=p.value.trim(),S=g.value.trim();(I||S)&&t.push({label:I,value:S})}})}const i=u=>{const d=document.getElementById(u);return d?d.value:""};if(!(window.firebase||firebase))throw new Error("Firebase SDK not found");const o={lastName:i("char-last-name").trim()||"(名字未入力)",firstName:i("char-first-name").trim(),lastNameRuby:i("char-last-ruby").trim(),firstNameRuby:i("char-first-ruby").trim(),alias:i("char-alias"),age:i("char-age"),birth:i("char-birth"),role:i("char-role"),height:i("char-height"),looks:i("char-looks"),skill:i("char-skill"),history:i("char-history"),iconUrl:e,customItems:t,updatedAt:Mn()};console.log("[CharEditor] 保存データ詳細:",JSON.parse(JSON.stringify(o)));const c=Se(),l=_t(c,"works",n.selectedWorkId,"characters");if(wn){const u=fe(c,"works",n.selectedWorkId,"characters",wn);await wr(u,o)}else{const u=Oe(l),d=await Nr(u);o.order=d.size,o.createdAt=Mn(),wn=(await yo(l,o)).id}console.log("[CharEditor] 保存成功:",wn),zh(wn)}catch(e){console.error("[CharEditor] 保存エラー:",e)}}function Hp(){document.getElementById("char-list-view").style.display="block",document.getElementById("char-view-view").style.display="none",document.getElementById("char-edit-view").style.display="none"}async function pv(n){if(!confirm("本当に削除しますか？"))return;const e=xe(),t=Se();try{const r=fe(t,"works",e.selectedWorkId,"characters",n);await Ic(r)}catch(r){console.error("[CharEditor] 削除エラー:",r)}}async function tu(n,e){const t=xe(),r=Se(),i=_t(r,"works",t.selectedWorkId,"characters");try{const s=Oe(i,Cr("order","asc")),o=await Nr(s),c=[];o.forEach(S=>c.push({id:S.id,...S.data()}));const l=c.findIndex(S=>S.id===n);if(l===-1)return;const u=l+e;if(u<0||u>=c.length)return;const d=c[u],p=Vh(r),g=fe(r,"works",t.selectedWorkId,"characters",n),I=fe(r,"works",t.selectedWorkId,"characters",d.id);p.update(g,{order:u}),p.update(I,{order:l}),await p.commit()}catch(s){console.error("[CharEditor] 並び替えエラー:",s)}}let Yo=null;function ex(){const n=document.getElementById("char-new-btn");n&&n.addEventListener("click",()=>eu()),Mi(e=>{e.currentTab==="characters"&&tx(e)})}function tx(n){const e=document.getElementById("char-list-container");if(!e)return;if(Yo&&(Yo(),Yo=null),!n.selectedWorkId){e.innerHTML='<div style="text-align:center; padding:40px; color:#666;">作品を選択してください</div>';return}const t=Se(),r=_t(t,"works",n.selectedWorkId,"characters"),i=Oe(r,Cr("order","asc"));Yo=Vi(i,s=>{nx(s,e)},s=>{console.error("[CharList] 登場人物監視エラー:",s)})}function nx(n,e){if(Io(e),n.empty){e.innerHTML='<div style="text-align:center; padding:40px; color:#666;">キャラクターが登録されていません</div>';return}n.forEach(t=>{const r={id:t.id,...t.data()},i=rx(r);e.appendChild(i)})}function rx(n){const e=document.createElement("div");e.className="card-retro",e.style.display="flex",e.style.alignItems="center",e.style.gap="12px",e.style.padding="8px 12px";const t=n.lastName||n.name||"名称未定",r=n.firstName||"",i=n.lastNameRuby||n.ruby||"",s=n.firstNameRuby||"",o=(t+" "+r).trim(),c=(i+" "+s).trim();return e.innerHTML=`
        <div class="char-icon-thumb" style="width:50px; height:50px; background:#111; border:1px solid #555; overflow:hidden; display:flex; align-items:center; justify-content:center; border-radius:4px;">
            ${n.iconUrl?`<img src="${n.iconUrl}" style="width:100%; height:100%; object-fit:cover;">`:'<span style="font-size:0.6rem; color:#444;">No thumb</span>'}
        </div>
        <div class="char-click-area" style="flex:1; cursor:pointer;">
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.7);">${Le(c)}</div>
            <h3 style="font-size:1.1rem; color:#fff;">${Le(o)}</h3>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn-retro btn-delete" style="background:var(--clr-delete); font-size:0.75rem; padding:4px 8px; border-radius:4px;">削除</button>
            <button class="btn-sort btn-up" style="padding:4px 8px;">▲</button>
            <button class="btn-sort btn-down" style="padding:4px 8px;">▼</button>
        </div>
    `,e.querySelector(".char-click-area").addEventListener("click",()=>{zh(n.id)}),e.querySelector(".btn-up").addEventListener("click",()=>{tu(n.id,-1)}),e.querySelector(".btn-down").addEventListener("click",()=>{tu(n.id,1)}),e.querySelector(".btn-delete").addEventListener("click",()=>{pv(n.id)}),e}let nu=null;function ix(){window.plotter_openMemoEditor=Qp,window.plotter_deleteMemo=ox,window.plotter_moveMemo=ax;const n=document.getElementById("memo-new-btn");n&&n.addEventListener("click",()=>Qp(null));const e=document.querySelector("#memo-edit-view .btn-retro.save");e&&e.addEventListener("click",sx);const t=document.querySelector("#memo-edit-view .btn-retro.back");t&&t.addEventListener("click",mv);const r=document.getElementById("memo-content");r&&r.addEventListener("input",i=>bt(i.target))}async function Qp(n=null){nu=n,document.getElementById("memo-list-view").style.display="none",document.getElementById("memo-edit-view").style.display="block";const e=document.getElementById("memo-title"),t=document.getElementById("memo-tags"),r=document.getElementById("memo-content");if(n){const i=xe(),s=Se(),o=fe(s,"works",i.selectedWorkId,"memos",n),c=await xr(o);if(c.exists()){const l=c.data();e.value=l.title||"",t.value=(l.tags||[]).join(", "),r.value=l.content||"",setTimeout(()=>bt(r),0)}}else e.value="",t.value="",r.value="",bt(r)}function mv(){document.getElementById("memo-list-view").style.display="block",document.getElementById("memo-edit-view").style.display="none"}async function sx(){const n=xe();if(!n.currentUser||!n.selectedWorkId)return;const e=document.getElementById("memo-title").value.trim(),t=document.getElementById("memo-tags").value.split(",").map(c=>c.trim()).filter(c=>c),r=document.getElementById("memo-content").value;if(!e)return;const i={uid:n.currentUser.uid,title:e||"無題",tags:t,content:r,updatedAt:Mn()},s=Se(),o=_t(s,"works",n.selectedWorkId,"memos");try{if(nu){const c=fe(s,"works",n.selectedWorkId,"memos",nu);await wr(c,i)}else{const c=Oe(o),l=await Nr(c);i.order=l.size,i.createdAt=Mn(),await yo(o,i)}mv()}catch(c){console.error("[MemoEditor] 保存エラー:",c)}}async function ox(n){if(!confirm("本当に削除しますか？"))return;const e=xe(),t=Se();try{const r=fe(t,"works",e.selectedWorkId,"memos",n);await Ic(r)}catch(r){console.error("[MemoEditor] 削除エラー:",r)}}async function ax(n,e){const t=xe(),r=Se(),i=_t(r,"works",t.selectedWorkId,"memos");try{const s=Oe(i,Cr("order","asc")),o=await Nr(s),c=[];o.forEach(S=>c.push({id:S.id,...S.data()}));const l=c.findIndex(S=>S.id===n);if(l===-1)return;const u=l+e;if(u<0||u>=c.length)return;const d=c[u],p=Vh(r),g=fe(r,"works",t.selectedWorkId,"memos",n),I=fe(r,"works",t.selectedWorkId,"memos",d.id);p.update(g,{order:u}),p.update(I,{order:l}),await p.commit()}catch(s){console.error("[MemoEditor] 並び替えエラー:",s)}}let Xo=null,Ys=null,Fa=[];function cx(){window.plotter_filterByTag=ru,Mi(n=>{n.currentTab==="memo"&&lx(n)})}function lx(n){const e=document.getElementById("memo-list-container");if(!e)return;if(Xo&&(Xo(),Xo=null),!n.selectedWorkId){e.innerHTML='<div style="text-align:center; padding:40px; color:#666;">作品を選択してください</div>';return}const t=Se(),r=_t(t,"works",n.selectedWorkId,"memos"),i=Oe(r,Cr("order","asc"));Xo=Vi(i,s=>{Fa=[],s.forEach(o=>Fa.push({id:o.id,...o.data()})),gv(),_v()},s=>{console.error("[MemoList] メモ監視エラー:",s)})}function gv(){const n=document.getElementById("memo-filter-bar");if(!n)return;const e=new Set;Fa.forEach(r=>(r.tags||[]).forEach(i=>e.add(i))),Io(n);const t=document.createElement("button");t.className="tag",t.style.marginRight="8px",t.style.cursor="pointer",Ys===null&&(t.style.background="#444"),t.textContent="すべて",t.addEventListener("click",()=>ru(null)),n.appendChild(t),e.forEach(r=>{const i=document.createElement("button");i.className="tag",i.style.marginRight="8px",i.style.cursor="pointer",Ys===r&&(i.style.background="#444"),i.textContent=r,i.addEventListener("click",()=>ru(r)),n.appendChild(i)})}function ru(n){Ys=n,gv(),_v()}function _v(){const n=document.getElementById("memo-list-container");if(!n)return;Io(n);let e=Fa;if(Ys&&(e=e.filter(t=>t.tags&&t.tags.includes(Ys))),e.length===0){n.innerHTML='<div style="text-align:center; padding:40px; color:#666;">メモがありません</div>';return}e.forEach(t=>{const r=ux(t);n.appendChild(r)})}function ux(n){const e=document.createElement("div");e.className="collapsible-container collapsed card-retro",e.style.padding="0",e.style.marginBottom="15px";const t=()=>`
            <div class="line-clamp-5" style="color:#ddd; white-space:pre-wrap; font-size:0.95rem; margin-bottom:8px;">${Le(n.content||"")||"内容なし"}</div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${(n.tags||[]).map(i=>`<span class="tag" style="color:#888; border-color:#444; font-size:0.7rem;">${Le(i)}</span>`).join("")}
            </div>
        `;e.innerHTML=`
        <div class="collapsible-header" style="padding: 12px; display:flex; justify-content:space-between; align-items:center; background: #1a1a1a; border-radius: 8px 8px 0 0; min-height:50px;">
            <div class="header-click-area" style="flex:1; cursor:pointer; display:flex; align-items:center; gap:8px; min-width:0;">
                <h3 style="font-size:1.1rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1; margin:0;">${Le(n.title||"無題")}</h3>
            </div>
            <div style="display:flex; align-items:center; gap:8px; margin-left:12px;">
                <button class="btn-retro btn-delete" style="background:var(--clr-delete); font-size:0.75rem; padding:4px 8px; border-radius:4px;">削除</button>
                <button class="btn-retro btn-edit blue" style="font-size:0.75rem; padding:4px 8px; border-radius:4px;">編集</button>
                <button class="btn-sort btn-up" style="padding:4px 8px;">▲</button>
                <span class="toggle-icon gold-bold" style="width:1.2rem; font-size:1.2rem; display:flex; justify-content:center; cursor:pointer; color:var(--clr-save);">＋</span>
            </div>
        </div>
        <div class="collapsible-content summary-mode" style="padding: 12px; background: #0a0a0a; border-radius: 0 0 8px 8px; cursor:pointer; border-top:1px solid #222;">
            ${t()}
        </div>
    `;const r=()=>{const i=e.classList.toggle("collapsed"),s=e.querySelector(".collapsible-content"),o=e.querySelector(".toggle-icon");o.textContent=i?"＋":"－",i?(s.classList.add("summary-mode"),s.innerHTML=t()):(s.classList.remove("summary-mode"),s.innerHTML=`
                <div style="color:#eee; white-space:pre-wrap; font-size:1.05rem; line-height:1.6; margin-bottom:12px;">${Le(n.content||"")}</div>
                <div style="display:flex; gap:6px; flex-wrap:wrap; padding-top:10px; border-top:1px solid #222;">
                    ${(n.tags||[]).map(c=>`<span class="tag" style="background:#333; color:#fff; font-size:0.75rem;">${Le(c)}</span>`).join("")}
                </div>
            `)};return e.querySelector(".collapsible-header").addEventListener("click",r),e.querySelector(".collapsible-content").addEventListener("click",i=>{e.classList.contains("collapsed")&&r()}),e.querySelector(".btn-edit").addEventListener("click",i=>{i.stopPropagation(),window.plotter_openMemoEditor&&window.plotter_openMemoEditor(n.id)}),e.querySelector(".btn-up").addEventListener("click",i=>{i.stopPropagation(),window.plotter_moveMemo&&window.plotter_moveMemo(n.id,-1)}),e.querySelector(".btn-delete").addEventListener("click",i=>{i.stopPropagation(),window.plotter_deleteMemo&&window.plotter_deleteMemo(n.id)}),e}let Ss=null,iu=null;function hx(){const n=document.getElementById("work-new-back");n&&n.addEventListener("click",()=>{document.getElementById("work-new-view").style.display="none",document.getElementById("work-list-view").style.display="block"});const e=document.getElementById("work-view-edit-btn");e&&e.addEventListener("click",()=>{document.getElementById("work-view-view").style.display="none",document.getElementById("work-edit-view").style.display="block"});const t=document.getElementById("work-edit-back");t&&t.addEventListener("click",()=>{document.getElementById("work-view-view").style.display="block",document.getElementById("work-edit-view").style.display="none"}),Mi(r=>{r.currentTab==="work-info"&&r.selectedWorkId?iu!==r.selectedWorkId&&yv(r.selectedWorkId):r.currentTab==="top"&&(iu=null)})}function dx(){const n=document.getElementById("work-list-view"),e=document.getElementById("work-new-view"),t=document.getElementById("work-form-container-new");if(!n||!e||!t)return;Ss=null,t.innerHTML=vv("new");const r=t.querySelector("#new-save-btn");r&&r.addEventListener("click",()=>Iv(!0));const i=t.querySelector("#new-f-catchphrase");i&&i.addEventListener("input",s=>Ua(s.target,t.querySelector("#new-f-catch-count"))),n.style.display="none",e.style.display="block",px(t,"new"),Ua(i,t.querySelector("#new-f-catch-count"))}async function yv(n){const e=document.getElementById("work-view-container"),t=document.getElementById("work-form-container-info");if(!e||!t)return;Ss=n,iu=n,document.getElementById("work-view-view").style.display="block",document.getElementById("work-edit-view").style.display="none",t.innerHTML=vv("info");const r=t.querySelector("#info-save-btn");r&&r.addEventListener("click",()=>Iv(!1));const i=t.querySelector("#info-f-catchphrase");i&&i.addEventListener("input",c=>Ua(c.target,t.querySelector("#info-f-catch-count")));const s=vo();if(!s.currentUser){let c=0;for(;!s.currentUser&&c<10;)await new Promise(l=>setTimeout(l,500)),c++}if(!s.currentUser){e.innerHTML='<div style="text-align:center; padding:40px; color:var(--clr-delete);">認証エラーが発生しました。</div>';return}const o=Se();try{const c=fe(o,"works",n),l=await xr(c);if(l.exists()){const u=l.data();fx(e,u),mx(t,"info",u)}else e.innerHTML='<div style="text-align:center; padding:40px; color:#666;">作品が見つかりませんでした。</div>'}catch(c){console.error("[WorkEditor] 読み込み失敗:",c),e.innerHTML='<div style="text-align:center; padding:40px; color:var(--clr-delete);">データの読み込みに失敗しました。</div>'}}function fx(n,e){const t={sexual:"性描写",violent:"暴力",cruel:"残酷"},r=(e.rating||[]).map(c=>t[c]||c).join("/"),s={"in-progress":"制作中",completed:"完了",suspended:"中断"}[e.status]||"未設定",o={none:"なし",assist:"補助",partial:"一部",main:"本文"};n.innerHTML=`
        <div class="card-retro">
            <h3 style="color:#fff; font-size:1.6rem; margin-bottom:10px;">${Le(e.title||"無題")}</h3>
            
            <div class="work-meta-compact">
                <div class="work-meta-group">
                    <span class="meta-item"><span class="gold-bold" style="display:inline;">状態：</span>${s}</span>
                    <span class="meta-item"><span class="gold-bold" style="display:inline;">種別：</span>${e.type==="derivative"?"二次創作":"オリジナル"}</span>
                </div>
                <div class="work-meta-group">
                    <span class="meta-item"><span class="gold-bold" style="display:inline;">長さ：</span>${e.length==="short"?"短編":"長編"}</span>
                    <span class="meta-item"><span class="gold-bold" style="display:inline;">AI利用：</span>${o[e.ai]||"なし"}</span>
                </div>
                ${r?'<div class="work-meta-group"><span class="meta-item"><span class="gold-bold" style="display:inline;">レーティング：</span>'+r+"</span></div>":""}
            </div>

            <label class="gold-bold" style="font-size:0.8rem; opacity:0.7; margin-bottom:2px;">キャッチコピー</label>
            <div style="color:#fff; margin-bottom:15px; font-size:1.1rem;">${Le(e.catchphrase||"（未設定）")}</div>
            
            <label class="gold-bold" style="font-size:0.8rem; opacity:0.7; margin-bottom:2px;">あらすじ</label>
            <div style="color:#fff; white-space:pre-wrap; line-height:1.7; font-size:1.1rem; margin-bottom:20px;">${Le(e.description||"あらすじ未入力")}</div>
        </div>
    `}function vv(n){return`
        <div class="card-retro">
            <div class="form-group mb-20">
                <label class="gold-bold">作品タイトル</label>
                <input type="text" id="${n}-f-title" placeholder="タイトルを入力..." style="width:100%; padding:10px; background:#111; border:1px solid #444; color:#fff; font-size:1.2rem;">
            </div>

            <div class="form-group mb-20">
                <div style="display:flex; justify-content:space-between;">
                    <label class="gold-bold">キャッチコピー（残35字）</label>
                    <span id="${n}-f-catch-count" style="font-size:0.75rem; color:#888;">残35字</span>
                </div>
                <input type="text" id="${n}-f-catchphrase" maxlength="35" placeholder="読者を惹きつける一言..." style="width:100%; padding:8px; background:#111; border:1px solid #444; color:#fff;">
            </div>

            <div class="form-group mb-20">
                <label class="gold-bold">あらすじ・概要</label>
                <textarea id="${n}-f-description" placeholder="ストーリーの概要を入力..." style="width:100%; height:120px; padding:8px; background:#111; border:1px solid #444; color:#fff; resize:none;"></textarea>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label class="gold-bold">作品の長さ</label>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="${n}-length" value="long" checked> 長編</label>
                        <label><input type="radio" name="${n}-length" value="short"> 短編</label>
                    </div>
                </div>
                <div>
                    <label class="gold-bold">作品種別</label>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="${n}-type" value="original" checked> オリジナル</label>
                        <label><input type="radio" name="${n}-type" value="derivative"> 二次創作</label>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label class="gold-bold">執筆ステータス</label>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="${n}-status" value="in-progress" checked> 制作中</label>
                        <label><input type="radio" name="${n}-status" value="completed"> 完了</label>
                        <label><input type="radio" name="${n}-status" value="suspended"> 中断</label>
                    </div>
                </div>
                <div>
                    <label class="gold-bold">レーティング</label>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                        <label><input type="checkbox" name="${n}-rating" value="sexual"> 性描写</label>
                        <label><input type="checkbox" name="${n}-rating" value="violent"> 暴力</label>
                        <label><input type="checkbox" name="${n}-rating" value="cruel"> 残酷</label>
                    </div>
                </div>
            </div>

            <div class="form-group" style="margin-bottom:30px;">
                <label class="gold-bold">AI利用状況</label>
                <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                    <label><input type="radio" name="${n}-ai" value="none" checked> なし</label>
                    <label><input type="radio" name="${n}-ai" value="assist"> 補助</label>
                    <label><input type="radio" name="${n}-ai" value="partial"> 一部</label>
                    <label><input type="radio" name="${n}-ai" value="main"> 本文</label>
                </div>
            </div>

            <div style="text-align:center; padding:20px 0; border-top:1px solid #333;">
                <button id="${n}-save-btn" class="btn-retro save" style="padding:10px 60px; font-size:1.1rem;">保存</button>
            </div>
        </div>
    `}function px(n,e){n.querySelector(`#${e}-f-title`).value="",n.querySelector(`#${e}-f-catchphrase`).value="",n.querySelector(`#${e}-f-description`).value="",bn(n,e,"length","long"),bn(n,e,"type","original"),bn(n,e,"status","in-progress"),bn(n,e,"ai","none"),n.querySelectorAll(`input[name="${e}-rating"]`).forEach(r=>r.checked=!1)}function mx(n,e,t){n.querySelector(`#${e}-f-title`).value=t.title||"",n.querySelector(`#${e}-f-catchphrase`).value=t.catchphrase||"",n.querySelector(`#${e}-f-description`).value=t.description||"",bn(n,e,"length",t.length||"long"),bn(n,e,"type",t.type||"original"),bn(n,e,"status",t.status||"in-progress"),bn(n,e,"ai",t.ai||"none");const r=t.rating||[];n.querySelectorAll(`input[name="${e}-rating"]`).forEach(c=>{c.checked=r.includes(c.value)});const s=n.querySelector(`#${e}-f-catchphrase`),o=n.querySelector(`#${e}-f-catch-count`);Ua(s,o)}async function Iv(n){const e=n?"new":"info",t=n?"work-form-container-new":"work-form-container-info",r=document.getElementById(t);if(!r)return;const i=r.querySelector(`#${e}-f-title`).value.trim();if(!i)return;const s=vo();if(!s.currentUser)return;const o={title:i,catchphrase:r.querySelector(`#${e}-f-catchphrase`).value.trim(),description:r.querySelector(`#${e}-f-description`).value.trim(),length:Zo(r,e,"length"),type:Zo(r,e,"type"),status:Zo(r,e,"status"),ai:Zo(r,e,"ai"),rating:Array.from(r.querySelectorAll(`input[name="${e}-rating"]:checked`)).map(l=>l.value),rating:Array.from(r.querySelectorAll(`input[name="${e}-rating"]:checked`)).map(l=>l.value),updatedAt:Mn()},c=Se();try{if(!n&&Ss){const l=fe(c,"works",Ss);await wr(l,o),yv(Ss)}else{o.uid=s.currentUser.uid,o.createdAt=Mn(),o.pinned=!1;const l=_t(c,"works"),u=await yo(l,o);document.getElementById("work-new-view").style.display="none",document.getElementById("work-list-view").style.display="block",Jt({selectedWorkId:u.id,currentTab:"plot"})}}catch(l){console.error("[WorkEditor] 保存失敗:",l)}}function Ua(n,e){if(n&&e){const t=35-n.value.length;e.textContent=`残${t}字`,t<=0?e.classList.add("text-error"):e.classList.remove("text-error")}}function Zo(n,e,t){const r=n.querySelector(`input[name="${e}-${t}"]:checked`);return r?r.value:null}function bn(n,e,t,r){const i=n.querySelector(`input[name="${e}-${t}"][value="${r}"]`);i&&(i.checked=!0)}let ea=null,pa=[];function gx(){hx(),Mi(r=>{r.currentTab==="top"&&Jp(r)});const n=document.getElementById("new-work-btn");n&&n.addEventListener("click",()=>{dx()});const e=document.getElementById("work-sort-order");e&&e.addEventListener("change",()=>{wv(pa,document.getElementById("work-grid-container"))});const t=xe();t.currentTab==="top"&&Jp(t)}function Jp(n){const e=document.getElementById("work-grid-container");if(!e||(ea&&(ea(),ea=null),!n.currentUser))return;const t=Se(),r=_t(t,"works"),i=Oe(r,Dy("uid","==",n.currentUser.uid));ea=Vi(i,s=>{pa=[],s.forEach(o=>{pa.push({id:o.id,...o.data()})}),wv(pa,e)},s=>{console.error("[Dashboard] 作品一覧監視エラー:",s)})}function wv(n,e){var o;if(Io(e),!n||n.length===0){e.innerHTML='<div style="text-align:center; padding:60px; color:#444; font-size:0.9rem;">作品がありません</div>';return}const t=((o=document.getElementById("work-sort-order"))==null?void 0:o.value)||"updatedAt_desc",[r,i]=t.split("_");[...n].sort((c,l)=>{var p,g;if(c.pinned&&!l.pinned)return-1;if(!c.pinned&&l.pinned)return 1;const u=((p=c[r])==null?void 0:p.seconds)||0,d=((g=l[r])==null?void 0:g.seconds)||0;return i==="desc"?d-u:u-d}).forEach(c=>{const l=_x(c);e.appendChild(l)})}function _x(n){const e=document.createElement("div");e.className="work-card";const t=`
        <span class="work-tag ${n.length==="short"?"tag-short":"tag-long"}">${n.length==="short"?"短編":"長編"}</span>
    `;return e.innerHTML=`
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <h3 style="margin:0;">${Le(n.title||"無題")}</h3>
            <button class="star-btn ${n.pinned?"active":""}" title="お気に入り">${n.pinned?"★":"☆"}</button>
        </div>
        <div style="margin:5px 0;">${t}</div>
        <div class="work-meta" style="display:flex; justify-content:space-between; align-items:flex-end; gap:2px; font-size:0.85rem; margin-top:auto; color:#666;">
            <div style="display:flex; flex-direction:column; gap:4px;">
                <span>作成日: ${Kp(n.createdAt)}</span>
                <span>更新日: ${Kp(n.updatedAt,!0)}</span>
            </div>
            <button class="btn-retro blue edit-btn" style="font-size:0.8rem; padding:4px 12px;">編集</button>
        </div>
    `,e.addEventListener("click",s=>{if(s.target.closest("button"))return;Jt({selectedWorkId:n.id});const o=xe(),c=n.lastTab||o.lastActiveTab||"plot";Jt({currentTab:c})}),e.querySelector(".edit-btn").addEventListener("click",s=>{s.stopPropagation(),Jt({selectedWorkId:n.id});const o=xe(),c=n.lastTab||o.lastActiveTab||"plot";Jt({currentTab:c})}),e.querySelector(".star-btn").addEventListener("click",s=>{s.stopPropagation(),yx(n.id,n.pinned)}),e}async function yx(n,e){const t=Se();try{const r=fe(t,"works",n);await wr(r,{pinned:!e})}catch(r){console.error("[Dashboard] ピン留め更新エラー:",r)}}document.addEventListener("DOMContentLoaded",async()=>{console.log("[Main] アプリケーションの初期化を開始します...");try{RC(),xC(),PC(),$C(),LC(),ex(),QC(),cx(),ix(),gx(),console.log("[Main] 初期化プロセスが完了しました。")}catch(n){console.error("[Main] 初期化中にエラーが発生しました:",n)}});
