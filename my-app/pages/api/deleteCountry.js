import { getCollection } from '@/utils/functions';
import { sendOk, sendBadRequest, sendMethodNotAllowed, sendNotFound } from '@/utils/apiMethods';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return sendMethodNotAllowed(res);
  }

  try {
    const { id } = req.body;
    
    if (!id) {
      return sendBadRequest(res, 'Missing country ID');
    }

    const countriesCollection = await getCollection('countries');
  
    const { ObjectId } = require('mongodb');
    const objectId = new ObjectId(id);
    
    const result = await countriesCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return sendOk(res, { success: true });
    } else {
      return sendNotFound(res, 'Country not found');
    }
  } catch (error) {
    console.error('Delete error:', error);
    return sendBadRequest(res, 'Error deleting country');
  }
}