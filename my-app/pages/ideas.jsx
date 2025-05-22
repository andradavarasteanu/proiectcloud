import { useState } from 'react';
import styles from './Ideas.module.css';

export default function Ideas() {
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const destinations = [
    "Bali, Indonesia",
    "Santorini, Greece",
    "Maldives",
    "Kyoto, Japan",
    "Paris, France",
    "New York, USA",
    "Reykjavik, Iceland",
    "Cape Town, South Africa",
    "Sydney, Australia",
    "Rio de Janeiro, Brasil",
    "Portofino, Italy",
    "Valetta, Malta"
  ];

  const generateDestination = () => {
    setIsLoading(true);
    setDestination(null);
    
    setTimeout(() => {
      const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
      setDestination(randomDestination);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <h1>Where should you go to in your next holiday?</h1>
      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.spinner}></div>
        ) : destination ? (
          <div className={styles.destination}>
              <h2>Your next trip:</h2>
            <p className={styles.destinationName}>{destination}</p>
          </div>
        ) : (
          <p className={styles.instruction}>Press the button </p>
        )}
      </div>
      <button  onClick={generateDestination}
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Loading.....' : 'Generate'}
      </button>
    </div>
  );
}