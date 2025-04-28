import mongoose from "mongoose";

const invoiceDetailSchema = new mongoose.Schema({
  Invoice_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvoiceMaster"
  },
  Product_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductMaster"
  },
  Rate: Number,
  Unit: String,
  Qty: Number,
  Disc_Percentage: Number,
  NetAmount: Number,
  TotalAmount: Number
});

export default mongoose.model("InvoiceDetail", invoiceDetailSchema);
