import React, { useState, useEffect } from 'react';

const Notify = () => {
  const [requestedPermission, setRequestedPermission] = useState(false);

  useEffect(() => {
    if (!requestedPermission) {
      // Request permission only when the user clicks a button
      const button = document.getElementById('requestPermissionButton');
      button.addEventListener('click', () => {
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              // Set up interval to show notifications
              const intervalId = setInterval(() => {
                new Notification("Notification Title", {
                  body: "Notification Body"
                });
              }, 1000);

              // Clean up interval on component unmount
              return () => clearInterval(intervalId);
            }
          });
        }
        setRequestedPermission(true);
      });
    }
  }, [requestedPermission]);

  return (
    <div>
      <h1>Socket.io Push Notifications in React</h1>
      <button id="requestPermissionButton">Request Notification Permission</button>
    </div>
  );
};

export default Notify;