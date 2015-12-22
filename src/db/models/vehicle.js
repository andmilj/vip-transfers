import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  type: String,
  persons: Number,
  pictureName: String,
});

export default mongoose.model('Vehicle', vehicleSchema);
