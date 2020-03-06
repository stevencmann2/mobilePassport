const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetBreakdownSchema = new Schema({
  description: { type: String },
  amountDesired: { type: Number, required: true },
  savings: { type: Number }
});

const BudgetBreakdown = mongoose.model("BudgetBreakdown", budgetBreakdownSchema);

module.exports = BudgetBreakdown;
