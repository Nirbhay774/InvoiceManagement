import mongoose from "mongoose";

const invoiceMasterSchema = new mongoose.Schema({
  Invoice_No: Number,
  Invoice_Date: {
    type: Date,
    default: Date.now
  },
  CustomerName: String,
  TotalAmount: Number
});

export default mongoose.model("InvoiceMaster", invoiceMasterSchema);
