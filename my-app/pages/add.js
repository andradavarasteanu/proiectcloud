import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../pages/AddDestination.module.css';
import Head from 'next/head';

export default function AddDestination() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    cities: '',
    attractions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const citiesArray = formData.cities
        .split(',')
        .map(city => city.trim())
        .filter(city => city.length > 0);
      
      const attractionsArray = formData.attractions
        .split(',')
        .map(attraction => attraction.trim())
        .filter(attraction => attraction.length > 0);

      const response = await fetch('/api/addDestination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          cities: citiesArray,
          attractions: attractionsArray
        }),
      });

  const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add destination');
      }

      router.push('/');
    } catch (error) {
      setError(error.message);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
    <div className={styles.container}>
      <Head>
        <title>Add destination</title>
      </Head>

      <h1 className={styles.title}>Add a new destination</h1>
      
      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Country Name</label>
          <input
             type="text"
            id="name"
            name="name"
             value={formData.name}
            onChange={handleChange}
             required
            placeholder="Enter country name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cities">Cities / Regions </label>
          <input
            type="text"
             id="cities"
            name="cities"
             value={formData.cities}
            onChange={handleChange}
            placeholder="e.g. Paris, Lyon, Marseille"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="attractions">Attractions</label>
          <input
             type="text"
             id="attractions"
            name="attractions"
            value={formData.attractions}
            onChange={handleChange}
            placeholder="e.g. Eiffel Tower, Louvre Museum"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
           disabled={isSubmitting}
        >
        {isSubmitting ? 'Adding...' : 'Add Destination'}
        </button>
      </form>
    </div>
  );
}