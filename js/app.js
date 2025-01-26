// Check if Service Worker is supported
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("Service Worker registered", reg);

      // Request push notification permission
      requestPushNotificationPermission(reg);
    })
    .catch((err) => console.log("Service Worker not registered", err));
}

// Function to request push notification permission
function requestPushNotificationPermission(reg) {
  if ("Notification" in window && "PushManager" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // Subscribe user to push notifications
        subscribeUserToPushNotifications(reg);
      } else {
        console.log("Notification permission denied.");
      }
    });
  } else {
    console.error("Push Notifications are not supported by this browser.");
  }
}

// Function to subscribe user to push notifications
function subscribeUserToPushNotifications(reg) {
  reg.pushManager
    .subscribe({
      userVisibleOnly: true, // Notifications will be visible to the user
      applicationServerKey: urlBase64ToUint8Array("YOUR_PUBLIC_SERVER_KEY"),
    })
    .then((subscription) => {
      console.log("User is subscribed to push notifications", subscription);
      // Send the subscription to your server for further handling
    })
    .catch((err) => {
      console.error("Failed to subscribe user to push notifications", err);
    });
}

// Function to convert the public server key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
