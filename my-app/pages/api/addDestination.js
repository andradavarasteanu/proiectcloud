import { getCollection } from '@/utils/functions';
import { sendOk, sendBadRequest } from '@/utils/apiMethods';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, cities, attractions } = req.body;

    if (!name) {
      return sendBadRequest(res, 'Country name is required');
    }

    const countriesCollection = await getCollection('countries');
    const existingCountry = await countriesCollection.findOne({ name });
    
    if (existingCountry) {
      const updateData = {};
      
      if (cities && cities.length > 0) {
        updateData.$addToSet = { cities: { $each: cities } };
      }
      
      if (attractions && attractions.length > 0) {
        updateData.$addToSet = { attractions: { $each: attractions } };
      }
      
      await countriesCollection.updateOne(
        { _id: existingCountry._id },
        updateData
      );
    } else {
      await countriesCollection.insertOne({
        name,
        cities: cities || [],
        attractions: attractions || [],
        createdAt: new Date()
      });
    }

    return sendOk(res, { success: true });
  } catch (error) {
    console.error('Add destination error:', error);
    return sendBadRequest(res, 'Error adding destination');
  }
}