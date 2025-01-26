// Check if the service worker is supported
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("Service Worker registered", reg);

      // Request Push Notification Permission
      requestPushNotificationPermission(reg);
    })
    .catch((err) => console.log("Service Worker not registered", err));
}

// Request location access
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Location accessed successfully!");
      console.log(`Latitude: ${position.coords.latitude}`);
      console.log(`Longitude: ${position.coords.longitude}`);
    },
    (err) => {
      console.error("Error accessing location", err);
    },
    { enableHighAccuracy: true }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}

