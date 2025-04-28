import { InvoiceItem } from "../types";

interface Props {
  items: InvoiceItem[];
  onRemove: (index: number) => void;
}

export default function InvoiceGrid({ items, onRemove }: Props) {
  console.log('items: ', items);
  if (items.length === 0) return null; // Hide table if no items

  return (
    <div className="bg-white mt-10 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-purple-700 mb-4">Invoice Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Rate</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Disc%</th>
              <th className="px-4 py-3 text-left">Net Amt</th>
              <th className="px-4 py-3 text-left">Total Amt</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-purple-50 transition-all">
                <td className="border-b px-4 py-3">{item.product.Product_Name}</td>
                <td className="border-b px-4 py-3">{item.product.Rate}</td>
                <td className="border-b px-4 py-3">{item.product.Unit}</td>
                <td className="border-b px-4 py-3">{item.qty}</td>
                <td className="border-b px-4 py-3">{item.discPercentage}%</td>
                <td className="border-b px-4 py-3">{item.netAmount.toFixed(2)}</td>
                <td className="border-b px-4 py-3">{item.totalAmount.toFixed(2)}</td>
                <td className="border-b px-4 py-3 text-center">
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full text-sm transition-all"
                    onClick={() => onRemove(idx)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
