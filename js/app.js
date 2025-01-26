// Check if Service Worker is supported and register it
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

// Function to handle geolocation access
function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        // Handle geolocation data here (e.g., show map, use in app, etc.)
      },
      (error) => {
        console.error("Error occurred: ", error);
        // Handle errors related to geolocation (permission denied, unavailable, etc.)
        if (error.code === error.PERMISSION_DENIED) {
          alert("Permission to access location was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert("Location information is unavailable.");
        } else if (error.code === error.TIMEOUT) {
          alert("The request to get user location timed out.");
        }
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Optionally, call geolocation function after document load or user action
document.addEventListener('DOMContentLoaded', () => {
  getGeolocation(); // Call geolocation function when page loads or based on user action
});
