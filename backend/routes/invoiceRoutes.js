import express from "express";
import InvoiceMaster from "../models/InvoiceMaster.js";
import InvoiceDetail from "../models/InvoiceDetail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    // Step 1: Group items by customer name
    const customerGroups = {};
    for (const item of items) {
      if (!customerGroups[item.customerName]) {
        customerGroups[item.customerName] = [];
      }
      customerGroups[item.customerName].push(item);
    }

    const allInvoices = [];

    // Step 2: For each customer, create InvoiceMaster + InvoiceDetail
    for (const customerName in customerGroups) {
      const customerItems = customerGroups[customerName];

      const lastInvoice = await InvoiceMaster.findOne().sort({ Invoice_No: -1 });
      const invoiceNo = lastInvoice ? lastInvoice.Invoice_No + 1 : 1;

      const totalAmount = customerItems.reduce((acc, item) => acc + item.totalAmount, 0);

      const invoiceMaster = await InvoiceMaster.create({
        Invoice_No: invoiceNo,
        CustomerName: customerName,
        TotalAmount: totalAmount
      });

      const details = customerItems.map(item => ({
        Invoice_Id: invoiceMaster._id,
        Product_Id: item.product._id,  // corrected Product_ID
        Rate: item.product.Rate,
        Unit: item.product.Unit,
        Qty: item.qty,
        Disc_Percentage: item.discPercentage,
        NetAmount: item.netAmount,
        TotalAmount: item.totalAmount
      }));

      await InvoiceDetail.insertMany(details);

      allInvoices.push(invoiceMaster);
    }

    res.status(201).json({ message: "All Invoices Created Successfully", invoices: allInvoices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/", async (req, res) => {
  const invoices = await InvoiceMaster.find().sort({ Invoice_Date: -1 });
  res.json(invoices);
});


export default router;
