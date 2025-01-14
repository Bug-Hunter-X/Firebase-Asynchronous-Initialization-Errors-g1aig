import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Firebase initialization

function MyComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Correct: wait until Firebase is ready
    db.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val() === true) {
        db.ref('myData').once('value').then(snapshot => {
          setData(snapshot.val());
          setIsLoading(false);
        });
      }
    });
    return () => db.ref('.info/connected').off();
  }, []);

  return (
    <div>
      {isLoading ? 'Loading...' : JSON.stringify(data)}
    </div>
  );
}

export default MyComponent;
