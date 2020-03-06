const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  user_id: { type: String, required: true }
});

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
