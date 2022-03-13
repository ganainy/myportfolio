'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "e5daa8e31e9a4f59ae13eaf82bcc0904",
"assets/assets/fonts/Agustina.ttf": "dc2e22aeb9024b30a058c690a7f9f7ba",
"assets/assets/images/ajiad.png": "8dab88fd670b0e82b9d08112d85d1328",
"assets/assets/images/android.png": "e22997feaac464c25d13e2d50e0eb394",
"assets/assets/images/api.png": "c01aa560d4f0f26bf1c1be77d137ddb4",
"assets/assets/images/arabic.png": "802dc098a4363bedebcb664e4fab8bf6",
"assets/assets/images/database.png": "b30878551e6aa2dfc373c1aa1e56ed42",
"assets/assets/images/english.png": "5cfcc9df8717e646f0b42476ebcebfbd",
"assets/assets/images/firebase.png": "0e4792f1b38576bce30728eec593a301",
"assets/assets/images/flutter.png": "646231c7b3e14f0959ac43175dfcf994",
"assets/assets/images/foody.png": "246e4b0e225f03d30a50418ce6196761",
"assets/assets/images/four.png": "9924c7cb3611d9d8d906a4acf0472adb",
"assets/assets/images/german.png": "d1479dbca0726e908413db6d1f201936",
"assets/assets/images/gymmasters.png": "a52763bf13a56cd1977258067da8ba08",
"assets/assets/images/java.png": "0414fcd53fdb6903fb57134fdd8a9af2",
"assets/assets/images/kotlin.png": "dc9cac39b59efefc086138586ffff958",
"assets/assets/images/mail.png": "44eea3048c3be6c5c3517e41dcd99213",
"assets/assets/images/mansoura.png": "6799df4d8de495f07893d39a78087290",
"assets/assets/images/maps.png": "0ef4abc601d7774fdf12e88c2d5dba07",
"assets/assets/images/narayana.png": "20d126aba0233c917af7ae88a01c2ec7",
"assets/assets/images/one.jpg": "b7a88837eade5b3ee43d70bc5e02a8e6",
"assets/assets/images/ourchat.png": "1c9d5f9a1064bf6fcf2da69fe27ffdc4",
"assets/assets/images/reminderly.png": "e0df52d5a49d5a1c9bb1aaeb4301b5fb",
"assets/assets/images/resume.png": "fc5e8cd38e3e2eb5d8ea3700a2b54cda",
"assets/assets/images/school.png": "88178f1132cdc68c834aa369773867ce",
"assets/assets/images/shoply.png": "042e453353c3434f87805e3b6f045be7",
"assets/assets/images/three.png": "60f36898a2b193b0a468c6f19368aa7f",
"assets/assets/images/two.png": "c9326110016f566fbc06a2d5042f5968",
"assets/assets/images/world.png": "352a38afdfac32cbd20ff7e5564d68d0",
"assets/FontManifest.json": "71d21cf70608a928b8abded3599319ed",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "80de43999f2c68c7aad3a34b7d5a612c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "00bb2b684be61e89d1bc7d75dee30b58",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "4b6a9b7c20913279a3ad3dd9c96e155b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dffd9504fcb1894620fa41c700172994",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c4edc88b3a71e43c6cef2c182784e557",
"/": "bbdd1686c555a660af4fca31d04c6134",
"main.dart.js": "4cf504d051f807f9195e3841a4b6a6fe",
"manifest.json": "85bcccf09e8ff367fa18acffd9d79879",
"public/index.html": "bbdd1686c555a660af4fca31d04c6134",
"version.json": "9e83bde3b85d1cda120c7cad9a602e95"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
