import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicePage from "./pages/InvoicePage";
import Navbar from "./components/Navbar";
import InvoiceListPage from "./pages/InvoiceListPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/invoices" element={<InvoiceListPage   />} />
      </Routes>
    </Router>
  );
}

export default App;
