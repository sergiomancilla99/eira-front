importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js");

// self.addEventListener('notificationclick', function (event) {
//   // console.log('CLICK NOTIF ', event.notification.data.FCM_MSG);

// // const swListener = new BroadcastChannel('swListener');
// // swListener.postMessage(payload.data);

//   // event.waitUntil(clients.openWindow("https://eira.ar/login"));
//   // aca me quede, al aprecer llega, entonces lo que debo hacer es
//   // cuando haga click, llevarlo a la vista de tratamiento cofnirmacion, con los datos que necesite para la confirmacion
// });

const firebaseConfig = {
  apiKey: "AIzaSyCn7SYotNnowVuuLq8_DA8l4ce05EjD-NA",
  authDomain: "eira-f2c6a.firebaseapp.com",
  projectId: "eira-f2c6a",
  storageBucket: "eira-f2c6a.appspot.com",
  messagingSenderId: "188992673984",
  appId: "1:188992673984:web:dbd611dbc84afdacbef525"
};

// eslint-disable-next-line no-undef
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
// self.addEventListener('notificationclick', function(event) {
//   console.log("acaaa",event)
//   // event.notification.close(); // Cierra la notificación

//   // const urlToOpen = event.notification.data.click_action || 'https://www.google.com'; // Obtén la URL de redireccionamiento desde los datos adicionales o utiliza una URL predeterminada
//   // event.waitUntil(
//   //   clients.matchAll({ type: 'window' }).then(windowClients => {
//   //     // Verifica si la PWA ya está abierta en una ventana
//   //     for (const client of windowClients) {
//   //       if (client.url === urlToOpen && 'focus' in client) {
//   //         return client.focus(); // Si está abierta, enfoca la ventana existente
//   //       }
//   //     }
//   //     // Si no está abierta, abre una nueva ventana con la URL deseada
//   //     return clients.openWindow(urlToOpen);
//   //   })
//   // );
// });

//  self.addEventListener('push', function (event) {
//         console.log("event del push", event)
//         // const notificationTitle = payload.notification.title;
//         // const notificationOptions = {
//         //   body: "DESDE SERVICE WORKER",
//         //   icon: "/manifest/images/icon-72x72.png"
//         // }
//         // event.waitUntil(
//         //   self.registration.showNotification(notificationTitle, notificationOptions)
//         // );
//       });
// self.addEventListener('notificationclick', event => {
//   console.log("hola");
//   event.notification.close(); // Close the notification when clicked.
//   console.log("hola");
//   console.log("aca1",event);
//   console.log("aca2",event.notification.data.click_action)
//   // Open the link associated with the notification.
//   event.waitUntil(
//     clients.openWindow(event.notification.data.click_action)
//   );
// });
// messaging.onBackgroundMessage(payload => {   
//   console.log('[firebase-messaging-sw.js] Received background message ', payload); 
//   console.log('asc', payload.notification.click_action)
//   window.location = payload.fcmOptions.link;
//   // self.addEventListener('push', function (event) {
//   //       console.log("event del push", event)
//   //       // const notificationTitle = payload.notification.title;
//   //       // const notificationOptions = {
//   //       //   body: "DESDE SERVICE WORKER",
//   //       //   icon: "/manifest/images/icon-72x72.png"
//   //       // }
//   //       // event.waitUntil(
//   //       //   self.registration.showNotification(notificationTitle, notificationOptions)
//   //       // );
//   //     });
//   });  

