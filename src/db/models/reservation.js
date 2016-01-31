import mongoose from 'mongoose';
import destinationSchema from './destination';
import priceSchema from './price';

const ReservationSchema = new mongoose.Schema({
  passengerDetails: {
    name: String,
    email: String,
    country: String,
    city: String,
  },
  persons: Number,
  date: Date,
  returnDate: Date,
  from: destinationSchema,
  to: destinationSchema,
  addressDetailsDeparture: {
    pickUpAddress: String,
    dropOffAddress: String,
    arrivalFlightNumber: String,
    departureFlightNumber: String,
  },
  addressDetailsReturn: {
    pickUpAddress: String,
    dropOffAddress: String,
    arrivalFlightNumber: String,
    departureFlightNumber: String,
  },
  price: priceSchema,
  extrasDeparture: [{ name: String, price: Number }],
  extrasReturn: [{ name: String, price: Number }],
  totalPrice: Number,
});

export default mongoose.model('Price', ReservationSchema);
