import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Produk from "./pages/Produk";
import Artikel from "./pages/Artikel";
import Event from "./pages/Event";
import Galeri from "./pages/Galeri";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Partners from "./pages/Partners";

export default function App() {
  return (
    <Routes>
      {/* CLIENT */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artikel" element={<Artikel />} />
              <Route path="/event" element={<Event />} />
            </Routes>
          </Layout>
        }
      />

      {/* ADMIN (NO HEADER CLIENT) */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<Produk />} />
      <Route path="/admin/gallery" element={<Galeri />} />
      <Route path="/admin/partners" element={<Partners />} />
    </Routes>
  );
}
