import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  city: String,
  country: String,
  countryShort: String,
  type: Array,
});

export default mongoose.model('Destination', destinationSchema);
