# AIA Contacts

AIA Contacts is a contact management web application built with HTML, CSS, and JavaScript. It allows users to manage personal and professional contacts, keeping them organized, and offers offline functionality, push notifications, and integration with native device features. The app also supports being installed on mobile devices via a manifest file, enabling it to be added to the device's home screen.

## Features

- **Installable Web App**: The app can be installed on devices with a manifest file defining metadata such as the app's name, icons, theme color, and start URL.
- **Native Device Features**: The app uses geolocation and push notifications to enhance the user experience.
- **Offline Functionality**: The app works offline by using Service Workers and the Cache API to store resources and provide a seamless experience when there’s no internet connection.
- **Multiple Views**: The application contains at least three different views with a consistent and intuitive user experience.
- **Responsive Design**: The app is designed to work on a variety of screen sizes, ensuring a seamless experience on mobile, tablet, and desktop devices.
- **Performance Optimized**: The app loads quickly and runs smoothly. Performance is optimized using caching strategies and efficient code practices.

## Technologies Used

- **HTML**: Used for the structure of the app.
- **CSS**: Used for styling and responsive design.
- **JavaScript**: Used for implementing the functionality of the app, including native device features.
- **Service Workers & Cache API**: To enable offline functionality.
- **Push Notifications**: For sending real-time notifications to the user.
- **Geolocation API**: To use location-based features.

## Features Implemented

1. **Installable Web App**: The app includes a `manifest.json` file with metadata such as the name, theme color, icons, and `start_url`. This allows users to add the app to their home screen.
   
2. **Native Device Features**:
    - **Geolocation**: The app uses the device’s geolocation to show location-based information or services.
    - **Push Notifications**: Users will receive notifications directly on their device, even when the app is not open, keeping them informed about important events.
   
3. **Offline Functionality**: The app uses Service Workers to cache assets and resources. When offline, the app informs the user about the lack of connection and offers offline features such as accessing previously loaded contacts.

4. **Views**:
    - **Home View**: Displays a list of contacts with basic details. Users can click to view more information about a contact.
    - **Contact Detail View**: Shows detailed information about a specific contact and allows the user to edit or delete the contact.
    - **Add Contact View**: Allows users to add a new contact with name, phone number, email, etc.

## Installation

To run the AIA Contacts app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aia-contacts.git

