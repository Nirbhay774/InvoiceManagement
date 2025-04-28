import express from "express";
import ProductMaster from "../models/ProductMaster.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductMaster.find();
  res.json(products);
});

router.post("/default", async (req, res) => {
  try {
    const count = await ProductMaster.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "Products already exist" });
    }

    const defaultProducts = [
      { Product_Name: "Apple", Rate: 1.5, Unit: "Kg" },
      { Product_Name: "Banana", Rate: 1.2, Unit: "Dozen" },
      { Product_Name: "Orange", Rate: 2.0, Unit: "Kg" },
      { Product_Name: "Milk", Rate: 0.99, Unit: "Litre" }
    ];

    await ProductMaster.insertMany(defaultProducts);

    res.status(201).json({ message: "Default products added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
