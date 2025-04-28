import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Invoice Manager</h1>
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:underline">Create Invoice</Link>
          <Link to="/invoices" className="text-white hover:underline">View Invoices</Link>
        </div>
      </div>
    </nav>
  );
}
