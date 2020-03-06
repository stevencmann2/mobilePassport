const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripName: { type: String, required: true },
  totalbudget: { type: Number, required: true },
  destination: { type: String, required: true },
  departing: { type: String, default: true },
  returning: { type: String, required: true },
  user_id: { type: String, required: true }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
