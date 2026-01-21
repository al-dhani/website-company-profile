import { useEffect, useState } from "react";

export default function Produk() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const gambarProduk = {
  "Mie Suit": "/images/miesuit.png",
  "Mie Hompimpa": "/images/miehompimpa.png",
  "Mie Gacoan": "/images/miegacoan.png",
};

  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then((res) => res.json())
      .then((data) => {
        setProduk(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data produk");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading produk...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Judul */}
      <h1 className="text-3xl font-bold text-[#EC008C] mb-6">
        Produk Kami
      </h1>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produk.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Gambar */}
            <img
  src={gambarProduk[item.nama_menu] || "/images/miesuit.png"}
  alt={item.nama_menu}
  className="w-full h-48 object-cover"
/>
            {/* Konten */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.nama_menu}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {item.deskripsi || "Tidak ada deskripsi"}
              </p>

              <p className="text-[#00B4D8] font-bold mt-3">
                Rp {item.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
