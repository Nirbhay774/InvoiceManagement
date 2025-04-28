import mongoose from "mongoose";

const productMasterSchema = new mongoose.Schema({
  Product_Name: String,
  Rate: Number,
  Unit: String
});

export default mongoose.model("ProductMaster", productMasterSchema);
