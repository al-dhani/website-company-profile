import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

// React Icons
import { FaUtensils, FaPlus, FaEdit, FaTrashAlt, FaClipboardCheck, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProdukAdmin = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nama_produk: "",
    tipe: "",
    harga: "",
    image: "",
  });

  const TIPE_PRODUK = ["noodle", "beverage", "dimsum"];

  /* ===================== FETCH PRODUK ===================== */
  const fetchProduk = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/produk");
      const data = await res.json();
      setProduk(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  /* ===================== DELETE PRODUK ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;

    try {
      await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: "DELETE",
      });
      fetchProduk();
    } catch (err) {
      console.error(err);
    }
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async () => {
  try {
    const url = isEdit
      ? `http://localhost:5000/api/produk/${editId}`
      : "http://localhost:5000/api/produk";
    const method = isEdit ? "PUT" : "POST";

    const formData = new FormData();
    formData.append("nama_produk", form.nama_produk);
    formData.append("tipe", form.tipe);
    formData.append("harga", form.harga);
    if (imageFile) formData.append("image", imageFile);

    await fetch(url, { method, body: formData });

    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setImageFile(null);
    setPreview(null);
    setForm({ nama_produk: "", tipe: "", harga: "", image: "" });
    fetchProduk();
  } catch (err) {
    console.error(err);
  }
};

  /* ===================== HELPERS ===================== */
  const getTipeBadgeColor = (tipe) => {
    switch (tipe) {
      case "noodle":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "beverage":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "dimsum":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  const getTipeIcon = (tipe) => {
    switch (tipe) {
      case "noodle":
        return <FaUtensils />;
      case "beverage":
        return <FaUtensils />; // bisa diganti icon minuman lain kalau mau
      case "dimsum":
        return <FaUtensils />; // icon dimsum sama utensils
      default:
        return <FaUtensils />;
    }
  };

  const countByType = (type) => produk.filter((p) => p.tipe === type).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#EC008C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading produk...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  <FaUtensils className="text-white" size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Manajemen Produk</h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">Kelola semua menu dan produk Anda</p>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setForm({ nama_produk: "", tipe: "", harga: "", image: "" });
                setShowModal(true);
              }}
              className="bg-white text-[#EC008C] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              <span>Tambah Produk</span>
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Produk</p>
              <p className="text-3xl font-bold">{produk.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1 flex items-center gap-1">
                <FaUtensils /> Noodle
              </p>
              <p className="text-3xl font-bold">{countByType("noodle")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1 flex items-center gap-1">
                <FaUtensils /> Beverage
              </p>
              <p className="text-3xl font-bold">{countByType("beverage")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1 flex items-center gap-1">
                <FaUtensils /> Dimsum
              </p>
              <p className="text-3xl font-bold">{countByType("dimsum")}</p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardCheck className="text-2xl" /> Daftar Produk
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Gambar</th>
                  <th className="p-4 text-left font-bold text-gray-700">Nama Produk</th>
                  <th className="p-4 text-left font-bold text-gray-700">Tipe</th>
                  <th className="p-4 text-left font-bold text-gray-700">Harga</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produk.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-400">
                      Belum ada produk
                    </td>
                  </tr>
                ) : (
                  produk.map((item, index) => (
                    <tr key={item.id} className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-[#EC008C]/5 hover:to-[#00BCD4]/5 transition-all duration-300">
                      <td className="p-4">
                        <img
                          src={`http://localhost:5000/images/produk/${item.image}`}
                            alt={item.nama_produk}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                        />
                      </td>
                      <td className="p-4 font-bold text-gray-800">{item.nama_produk}</td>
                      <td className="p-4">
                        <span className={`${getTipeBadgeColor(item.tipe)} text-white px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 shadow-md`}>
                          {getTipeIcon(item.tipe)}
                          <span className="capitalize">{item.tipe}</span>
                        </span>
                      </td>
                      <td className="p-4">Rp {Number(item.harga).toLocaleString("id-ID")}</td>
                      <td className="p-4 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setEditId(item.id);
                            setForm(item);
                            setPreview(item.image ? `http://localhost:5000/images/produk/${item.image}` : null);
                            setShowModal(true);
                          }}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-1 shadow-md hover:shadow-lg hover:scale-105"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-1 shadow-md hover:shadow-lg hover:scale-105"
                        >
                          <FaTrashAlt /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl transform animate-slideUp">
            <div className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {isEdit ? <FaEdit /> : <FaPlus />}
                  </div>
                  <h2 className="text-2xl font-bold">{isEdit ? "Edit Produk" : "Tambah Produk Baru"}</h2>
                </div>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all">
                  <IoClose />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Produk *</label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 outline-none transition-all"
                  placeholder="Masukkan nama produk..."
                  value={form.nama_produk}
                  onChange={(e) => setForm({ ...form, nama_produk: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipe Produk *</label>
                  <select
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                    value={form.tipe}
                    onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                  >
                    <option value="">-- Pilih Tipe --</option>
                    {TIPE_PRODUK.map((tipe) => (
                      <option key={tipe} value={tipe}>{tipe.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Harga *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
                    <input
                      type="number"
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all outline-none"
                      placeholder="50000"
                      value={form.harga}
                      onChange={(e) => setForm({ ...form, harga: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Produk</label>
  <input
    type="file"
    accept="image/*"
    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 outline-none transition-all"
    onChange={(e) => {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }}
  />
              </div>

              {preview && (
    <div className="mt-4">
      <p className="text-sm font-bold text-gray-700 mb-2">Preview Gambar:</p>
      <div className="w-full h-48 rounded-xl overflow-hidden shadow border border-gray-200 flex items-center justify-center bg-gray-50">
        <img src={preview} alt="Preview Produk" className="w-full h-full object-cover" />
      </div>
    </div>
  )}

              {form.harga && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Preview Harga:</p>
                  <p className="text-2xl font-bold text-green-700">
                    Rp {Number(form.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all">Batal</button>
              <button onClick={handleSubmit} className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <FaCheck /> {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProdukAdmin;
