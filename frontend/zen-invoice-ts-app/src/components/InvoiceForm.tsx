import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProducts } from "../services/api";

interface Product {
  Product_ID: number;
  Product_Name: string;
  Rate: number;
  Unit: string;
}

interface InvoiceItem {
  customerName: string;
  product: Product;
  qty: number;
  discPercentage: number;
  netAmount: number;
  totalAmount: number;
}

interface Props {
  onAdd: (item: InvoiceItem) => void;
}

export default function InvoiceForm({ onAdd }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm();
  const selectedProductId = watch("productId");
  const qty = watch("qty") || 0;
  const discPercentage = watch("discPercentage") || 0;
  const rate = watch("rate") || 0;

  const [products, setProducts] = useState<Product[]>([]);
  const [netAmount, setNetAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const selectedProduct = products.find(p => p._id === selectedProductId);
    if (selectedProduct) {
      setValue("rate", selectedProduct.Rate);
      setValue("unit", selectedProduct.Unit);
    }
  }, [selectedProductId, setValue, products]);

  useEffect(() => {
    const calcNetAmount = (rate: number, disc: number) => rate - (rate * disc / 100);
    const calcTotalAmount = (net: number, qty: number) => net * qty;

    const calculatedNet = calcNetAmount(rate, discPercentage);
    const calculatedTotal = calcTotalAmount(calculatedNet, qty);

    setNetAmount(calculatedNet);
    setTotalAmount(calculatedTotal);
  }, [rate, discPercentage, qty]);

  const onSubmit = (data: any) => {
    const product = products.find(p => p._id === selectedProductId);
    if (!product) return;

    onAdd({
      customerName: data.customerName,  // <-- Here!
      product,
      qty: Number(data.qty),
      discPercentage: Number(data.discPercentage),
      netAmount,
      totalAmount
    });
  };
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 shadow-xl rounded-2xl p-10 space-y-8 w-full max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-6">Create New Invoice</h2>

      {/* Customer Name */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block text-purple-600 font-semibold mb-2">Customer Name<span className="text-red-500">*</span></label>
        <input 
          {...register("customerName")} 
          placeholder="Enter customer name" 
          className="input input-bordered border-purple-400 focus:ring focus:ring-purple-300 w-full"
          required 
        />
      </div>

      {/* Product Selection */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block text-blue-600 font-semibold mb-2">Product<span className="text-red-500">*</span></label>
        <select 
          {...register("productId")} 
          className="select select-bordered border-blue-400 focus:ring focus:ring-blue-300 w-full"
          required
        >
          <option value="">-- Select Product --</option>
          {products.map((product) => (
  <option key={product._id} value={product._id}>
    {product.Product_Name}
  </option>
))}

        </select>
      </div>

      {/* Product Details: Rate & Unit */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-indigo-600 font-semibold mb-2">Rate</label>
          <input 
            {...register("rate")} 
            className="input input-bordered border-indigo-300 bg-gray-100 text-gray-700 w-full" 
            disabled 
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-indigo-600 font-semibold mb-2">Unit</label>
          <input 
            {...register("unit")} 
            className="input input-bordered border-indigo-300 bg-gray-100 text-gray-700 w-full" 
            disabled 
          />
        </div>
      </div>

      {/* Quantity and Discount */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-green-600 font-semibold mb-2">Quantity<span className="text-red-500">*</span></label>
          <input 
            type="number" 
            {...register("qty")} 
            placeholder="Enter quantity" 
            className="input input-bordered border-green-400 focus:ring focus:ring-green-300 w-full" 
            required 
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-green-600 font-semibold mb-2">Discount (%)</label>
          <input 
            type="number" 
            {...register("discPercentage")} 
            placeholder="Enter discount %" 
            className="input input-bordered border-green-400 focus:ring focus:ring-green-300 w-full" 
          />
        </div>
      </div>

      {/* Net and Total Amount */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-pink-600 font-semibold mb-2">Net Amount</label>
          <input 
            value={netAmount.toFixed(2)} 
            className="input input-bordered border-pink-400 bg-gray-100 text-gray-700 w-full" 
            disabled 
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-pink-600 font-semibold mb-2">Total Amount</label>
          <input 
            value={totalAmount.toFixed(2)} 
            className="input input-bordered border-pink-400 bg-gray-100 text-gray-700 w-full" 
            disabled 
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button 
          type="submit" 
          className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-pink-500 hover:to-blue-500 transition-all duration-300 shadow-md"
        >
           Add to Invoice
        </button>
      </div>
    </form>
  );
}
