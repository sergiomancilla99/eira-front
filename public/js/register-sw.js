if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('firebase-messaging-sw.js').then((message) => {
            console.log("Service Worker esta listo");
        });
    })
} else {
    console.log('SW no es soportado');
}

if(!navigator.onLine) {
    console.log("estoy sin conexion");
}