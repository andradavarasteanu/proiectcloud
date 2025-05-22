
import { useState } from 'react';
import { getCollection } from '@/utils/functions';
import styles from '../pages/Home.module.css';
import Head from 'next/head';

export default function Home({ countries: initialCountries }) {
  const [countries, setCountries] = useState(initialCountries);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (countryId) => {
    setIsDeleting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/deleteCountry', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: countryId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        //actualizare
        setCountries(countries.filter(country => country._id !== countryId));
      } else {
        setError(data.error || 'Cannot delete country');
        console.error('Cannot delete country', data.error);
      }
    } catch (error) {
      setError('Error deleting country');
      console.error('Error deleting country:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Travel Journal</title>
        <meta name="description" content="Your travel destinations journal" />
      </Head>

      <h1 className={styles.title}>Places you've visited </h1>
      
      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>
            ×
          </button>
        </div>
      )}
        
      {countries.length === 0 ? ( //nu exista inca
        <div className={styles.emptyState}>
          <p></p>
          <a href="/add" className={styles.addButton}>Add your first destination</a>
        </div>
      ) : (
        <div className={styles.postcardsContainer}>
          {countries.map((country) => (
            <div key={country._id} className={styles.postcard}>
              <div className={styles.postcardContent}>
                <h2>{country.name}</h2>
                
                {country.cities?.length > 0 && (
                  <div className={styles.section}>
                    <h3>Cities / Regions: </h3>
                    <ul>
                      {country.cities.map((city, index) => (
                        <li key={index}>{city}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {country.attractions?.length > 0 && (
                  <div className={styles.section}>
                    <h3>Attractions:</h3>
                    <ul>
                      {country.attractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button 
                  onClick={() => handleDelete(country._id)}
                  className={styles.deleteButton}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const countriesCollection = await getCollection('countries');
    const countries = await countriesCollection.find().toArray();

    return {
      props: {
        countries: JSON.parse(JSON.stringify(countries)),
      },
    };
  } catch (error) {
    console.error('Error fetching:', error);
    return {
      props: {
        countries: [],
      },
    };
  }
}



