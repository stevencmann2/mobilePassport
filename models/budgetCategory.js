const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetCategorySchema = new Schema({
  categoryType: { type: String, required: true }
});

const BudgetCategory = mongoose.model("BudgetCategory", budgetCategorySchema);

module.exports = BudgetCategory;
