if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
  self.registration.showNotification();
}

self.addEventListener('push', function (event) {
  const payload = event.data.json();

  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
