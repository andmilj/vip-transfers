import mongoose from 'mongoose';

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
  from: {
    city: String,
    type: String,
  },
  to: {
    city: String,
    type: String,
  },
  addressDetailsOneWay: {
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
  price: {
    price: String,
    vehicleType: String,
  },
  extrasDeparture: [{ name: String, price: Number }],
  extrasReturn: [{ name: String, price: Number }],
  totalPrice: Number,
});

export default mongoose.model('Price', ReservationSchema);
