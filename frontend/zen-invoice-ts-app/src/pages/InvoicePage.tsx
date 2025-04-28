import { useState, useEffect } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceGrid from "../components/InvoiceGrid";
import { saveInvoice, getProducts, addDefaultProducts } from "../services/api";
import { InvoiceItem } from "../types";

export default function InvoicePage() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [productsExist, setProductsExist] = useState(true);
  console.log('productsExist: ', productsExist);

  useEffect(() => {
    checkProducts();
  }, []);

  const checkProducts = async () => {
    const response = await getProducts();
    console.log('response: ', response);
    setProductsExist(response.data.length > 0);
  };

  const handleAdd = (item: InvoiceItem) => {
    setItems([...items, item]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    await saveInvoice({ items });
    alert('Invoice Saved Successfully!');
    setItems([]);
  };

  const handleAddDefaultProducts = async () => {
    try {
      await addDefaultProducts();
      alert("Default products added successfully!");
      await checkProducts(); // Refresh product status
    } catch (error: any) {
      alert(error.response?.data?.message || "Error adding default products.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">🧾 Invoice Management</h1>

      {/* Show Add Default Products button if no products */}
      {!productsExist && (
        <div className="mb-6 text-center">
          <button
            onClick={handleAddDefaultProducts}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg"
          >
            ➕ Add Default Products
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Invoice Form */}
        <div className="md:w-1/2">
          <InvoiceForm onAdd={handleAdd} />
        </div>

        {/* Right: Invoice Items Grid */}
        <div className="md:w-1/2">
          <InvoiceGrid items={items} onRemove={handleRemove} />
          
          {items.length > 0 && (
            <button 
              onClick={handleSubmit}
              className="mt-6 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg"
            >
              Save Invoice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
