import mongoose from 'mongoose';
import { destinationSchema } from './destination';
const PriceSchema = new mongoose.Schema({
  price: Number,
  vehicleType: String,
  persons: Number,
  destinations: [
    destinationSchema,
  ],
});

export default mongoose.model('Price', PriceSchema);
