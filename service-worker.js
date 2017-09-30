"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/recipe-app/index.html","d4cb56f68952a1fae61c2d37ea228e6d"],["/recipe-app/static/css/main.62ee9f6c.css","87015453a7cc3e99805b0ed9b36cd007"],["/recipe-app/static/js/main.46af6529.js","bea3ea74e5d71ee1604127fdf8e85d1b"],["/recipe-app/static/media/Basket.14737b10.png","14737b1061c2142563d5844349d907eb"],["/recipe-app/static/media/Carrot.77f6646f.png","77f6646f9afa72067878ad6b6f282cdf"],["/recipe-app/static/media/Corn.27dcac21.png","27dcac21d909093bfed87fd0f034c962"],["/recipe-app/static/media/Eggs.c5a702fe.png","c5a702fe21e6a3573f0da919d3602237"],["/recipe-app/static/media/Garlic.a8f26a4d.png","a8f26a4de5d3ffedc143cbef402de120"],["/recipe-app/static/media/Pan.68d3b371.png","68d3b37155b11d92831c66fdf1025b47"],["/recipe-app/static/media/Pie.1cbd2506.png","1cbd250644119dcf84c082dd31cd59f6"],["/recipe-app/static/media/Pizza.2d6160fc.png","2d6160fcb54a724e0dc39f48a2b6db6f"],["/recipe-app/static/media/Sushi.0b13324b.png","0b13324b9ad09f5ca1d326b9158c6480"],["/recipe-app/static/media/Taco.073614ce.png","073614ceccab758c2e4e524822659313"],["/recipe-app/static/media/Turkey.25939201.png","2593920177541ef26591652cc92e8341"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/recipe-app/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});