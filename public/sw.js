if (!self.define) {
    let e, i = {};
    const c = (c, n) => (c = new URL(c + ".js", n).href, i[c] || new Promise((i => {
        if ("document" in self) {
            const e = document.createElement("script");
            e.src = c, e.onload = i, document.head.appendChild(e)
        } else e = c, importScripts(c), i()
    })).then((() => {
        let e = i[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e
    })));
    self.define = (n, s) => {
        const o = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (i[o]) return;
        let a = {};
        const r = e => c(e, o),
            f = {
                module: {
                    uri: o
                },
                exports: a,
                require: r
            };
        i[o] = Promise.all(n.map((e => f[e] || r(e)))).then((e => (s(...e), a)))
    }
}
define(["./workbox-926a8ce9"], (function (e) {
    "use strict";
    self.addEventListener("message", (e => {
        e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting()
    })), e.precacheAndRoute([{
        url: "manifest/images/icons/icon-128x128.png",
        revision: "c09cfc890a57ca45976d1232c9aa4a23"
    }, {
        url: "manifest/images/icons/icon-144x144.png",
        revision: "3dc0bf2ec6ac65da78963faec9d8d1e6"
    }, {
        url: "manifest/images/icons/icon-152x152.png",
        revision: "fe7eaed8028292a970dc93c435629fb2"
    }, {
        url: "manifest/images/icons/icon-192x192.png",
        revision: "e6802e539b2e0f9554acd019b2a16216"
    }, {
        url: "manifest/images/icons/icon-384x384.png",
        revision: "63aafe4c155df9d74f2cfbbf45da64c4"
    }, {
        url: "manifest/images/icons/icon-512x512.png",
        revision: "0488e66935a4de8f0bd33bd70d238aab"
    }, {
        url: "manifest/images/icons/icon-72x72.png",
        revision: "0205180c8240eb1374655154835fac1e"
    }, {
        url: "manifest/images/icons/icon-96x96.png",
        revision: "ed8c3932dc9e975ebe8a55e048a8a1c4"
    }, {
        url: "manifest/manifest.json",
        revision: "dc892d8af7ebb085e6f04b8b7c2e64e2"
    }, {
        url: "package-lock.json",
        revision: "acbe68fada6d9b5b0843d304c9fb7ebc"
    }, {
        url: "package.json",
        revision: "6c7e1287b3e1d9e6171dd8b0dbf87c7d"
    }, {
        url: "public/favicon.ico",
        revision: "c92b85a5b907c70211f4ec25e29a8c4a"
    }, {
        url: "public/index.html",
        revision: "ef8a02db437c74f2ecb0d88becc4b9d4"
    }, {
        url: "public/logo192.png",
        revision: "33dbdd0177549353eeeb785d02c294af"
    }, {
        url: "public/logo512.png",
        revision: "917515db74ea8d1aee6a246cfbcc0b45"
    }, {
        url: "public/manifest.json",
        revision: "d9d975cebe2ec20b6c652e1e4c12ccf0"
    }, {
        url: "public/robots.txt",
        revision: "fa1ded1ed7c11438a9b0385b1e112850"
    }, {
        url: "src/App.js",
        revision: "709ef08ff3396e8134864ffbaf63cf3f"
    }, {
        url: "src/index.js",
        revision: "dc6d91576ec7d7891960e29f1fe871ce"
    }], {
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/]
    })
}));
//# sourceMappingURL=sw.js.map
