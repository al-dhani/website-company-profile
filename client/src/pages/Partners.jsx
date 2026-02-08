import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

// Import React Icons
import { FaPlus, FaEdit, FaTrash, FaCheck, FaUsers, FaClipboardList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(null); // 🔥 preview baru

  const [form, setForm] = useState({
    nama: "",
    logo: "",
  });

  const fetchPartners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/partners/${editId}`
      : "http://localhost:5000/api/partners";

    const method = isEdit ? "PUT" : "POST";

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("logo", form.logo);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    await fetch(url, {
      method,
      body: formData,
    });

    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setLogoFile(null);
    setPreview(null); // 🔥 reset preview
    setForm({ nama: "", logo: "" });

    fetchPartners();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus partner ini?")) return;

    await fetch(`http://localhost:5000/api/partners/${id}`, {
      method: "DELETE",
    });

    fetchPartners();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#00BCD4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading partners...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-[#00BCD4] to-[#EC008C] rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  <FaUsers className="text-white" size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Manajemen Partners
                </h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">
                Kelola logo dan data partner bisnis Anda
              </p>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setForm({ nama: "", logo: "" });
                setPreview(null); // 🔥 reset preview
                setShowModal(true);
              }}
              className="bg-white text-[#00BCD4] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              <span>Tambah Partner</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Partner</p>
              <p className="text-3xl font-bold">{partners.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Partner Aktif</p>
              <p className="text-3xl font-bold">{partners.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Partner Terbaru</p>
              <p className="text-3xl font-bold">{partners.length > 0 ? 1 : 0}</p>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardList className="text-2xl" />
              Daftar Partners
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Logo</th>
                  <th className="p-4 text-left font-bold text-gray-700">Nama Partner</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-12 text-center">
                      <div className="text-gray-400">
                        <FaUsers className="w-20 h-20 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-semibold">Belum ada partner</p>
                        <p className="text-sm">Klik tombol "Tambah Partner" untuk menambahkan partner baru</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  partners.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-[#00BCD4]/5 hover:to-[#EC008C]/5 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="relative group">
                          <div className="w-32 h-24 bg-gray-50 rounded-xl shadow-md group-hover:shadow-xl transition-shadow flex items-center justify-center p-4 border border-gray-100">
                            <img
                              src={`http://localhost:5000/images/partners/${item.logo}`} // ambil dari server langsung
                              alt={item.nama}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00BCD4]/0 to-[#EC008C]/0 group-hover:from-[#00BCD4]/10 group-hover:to-[#EC008C]/10 rounded-xl transition-all"></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4] to-[#EC008C] rounded-full flex items-center justify-center text-white text-lg font-bold">
                            {item.nama ? item.nama[0].toUpperCase() : "?"}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 group-hover:text-[#00BCD4] transition-colors">
                              {item.nama}
                            </p>
                            <p className="text-xs text-gray-500">Partner Bisnis</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setEditId(item.id);
                              setForm(item);
                              setLogoFile(null);

                              // 🔥 Tambahkan preview dari server
                              setPreview(
                                item.logo
                                  ? `http://localhost:5000/images/partners/${item.logo}`
                                  : null
                              );

                              setShowModal(true);
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1"
                          >
                            <FaEdit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1"
                          >
                            <FaTrash className="w-4 h-4" />
                            <span>Hapus</span>
                          </button>
                        </div>
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
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#00BCD4] to-[#EC008C] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {isEdit ? <FaEdit size={20} /> : <FaPlus size={20} />}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isEdit ? "Edit Partner" : "Tambah Partner Baru"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Nama Partner */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nama Partner *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all outline-none"
                  placeholder="Masukkan nama partner..."
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
              </div>

              {/* Upload Logo */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Logo *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setLogoFile(file);
                    setPreview(URL.createObjectURL(file)); // 🔥 preview langsung saat pilih file
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Tips: Gunakan format PNG, JPG, atau SVG untuk hasil terbaik
                </p>
              </div>

              {/* Preview Logo */}
              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">Preview Logo:</p>
                  <div className="w-full h-64 rounded-xl overflow-hidden shadow border border-gray-200 flex items-center justify-center bg-gray-50">
                    <img
                      src={preview} // 🔥 preview file atau dari server
                      alt="Preview Logo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPreview(null); // reset preview saat batal
                  setLogoFile(null);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#00BCD4] to-[#EC008C] text-white px-6 py-3 rounded-xl font-bold hover:from-[#00d4e8] hover:to-[#ff1a9e] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <FaCheck />
                <span>{isEdit ? "Simpan Perubahan" : "Tambah Partner"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Partners;
