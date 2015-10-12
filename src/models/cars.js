import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('Car', CarSchema);
