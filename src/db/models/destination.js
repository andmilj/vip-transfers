import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  city: String,
  country: String,
  countryShort: String,
  type: Array,
  primary: Boolean,
});

destinationSchema.pre('save', function(next) {
  this.primary = false;

  if (/split/i.test(this.city)) {
    this.primary = true;
  }

  next();
});

export default mongoose.model('Destination', destinationSchema);
