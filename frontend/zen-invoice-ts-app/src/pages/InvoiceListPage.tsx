// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Invoice {
//   _id: string;
//   Invoice_No: number;
//   Invoice_Date: string;
//   CustomerName: string;
//   TotalAmount: number;
// }

// export default function InvoiceListPage() {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);

//   useEffect(() => {
//     async function fetchInvoices() {
//       const response = await axios.get("http://localhost:5000/api/invoices");
//       setInvoices(response.data);
//     }
//     fetchInvoices();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6 text-purple-700">🧾 All Invoices</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
//             <tr>
//               <th className="px-4 py-2">Invoice No</th>
//               <th className="px-4 py-2">Customer Name</th>
//               <th className="px-4 py-2">Invoice Date</th>
//               <th className="px-4 py-2">Total Amount</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-800">
//   {invoices.map((inv) => (
//     <tr key={inv._id} className="hover:bg-purple-100">
//       <td className="border px-4 py-2">{inv.Invoice_No}</td>
//       <td className="border px-4 py-2">{inv.CustomerName}</td>
//       <td className="border px-4 py-2">{new Date(inv.Invoice_Date).toLocaleDateString()}</td>
//       <td className="border px-4 py-2">₹ {inv.TotalAmount.toFixed(2)}</td>
//     </tr>
//   ))}
// </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";

interface Invoice {
  _id: string;
  Invoice_No: number;
  Invoice_Date: string;
  CustomerName: string;
  TotalAmount: number;
}

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchInvoices() {
      const response = await axios.get("http://localhost:5000/api/invoices");
      setInvoices(response.data);
    }
    fetchInvoices();
  }, []);

  const downloadInvoice = (invoice: Invoice) => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Invoice #${invoice.Invoice_No}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 30px;
                background: #f3f4f6;
              }
              .invoice-box {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                width: 600px;
                margin: auto;
              }
              h1 {
                color: #6b46c1;
              }
              .details {
                margin-top: 20px;
                font-size: 16px;
                line-height: 1.6;
              }
              .total {
                margin-top: 30px;
                font-weight: bold;
                font-size: 20px;
                color: #2d3748;
              }
              .footer {
                margin-top: 40px;
                font-size: 12px;
                color: #a0aec0;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="invoice-box">
              <h1>🧾 Invoice</h1>
              <div class="details">
                <p><strong>Invoice No:</strong> ${invoice.Invoice_No}</p>
                <p><strong>Customer Name:</strong> ${invoice.CustomerName}</p>
                <p><strong>Invoice Date:</strong> ${new Date(invoice.Invoice_Date).toLocaleDateString()}</p>
              </div>
              <div class="total">
                Total Amount: ₹ ${invoice.TotalAmount.toFixed(2)}
              </div>
              <div class="footer">
                Thank you !<br/>
                Powered by Nirbhay 🚀
              </div>
            </div>
            <script>
              window.print();
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">🧾 All Invoices</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
            <tr>
              <th className="px-4 py-2">Invoice No</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Invoice Date</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Actions</th> {/* New Column */}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {invoices.map((inv) => (
              <tr key={inv._id} className="hover:bg-purple-100">
                <td className="border px-4 py-2">{inv.Invoice_No}</td>
                <td className="border px-4 py-2">{inv.CustomerName}</td>
                <td className="border px-4 py-2">{new Date(inv.Invoice_Date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">₹ {inv.TotalAmount.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => downloadInvoice(inv)}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Download
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
