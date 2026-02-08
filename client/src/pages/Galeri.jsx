import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

// React Icons
import { FaRegImage, FaPlus, FaEdit, FaClipboardCheck, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Galeri = () => {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [fileGambar, setFileGambar] = useState(null); // menyimpan file gambar
  const [preview, setPreview] = useState(null);       // untuk preview gambar sebelum submit

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    file_gambar: "",
  });

  /* =====================
     FETCH GALERI
  ===================== */
  const fetchGaleri = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/galeri");
      const data = await res.json();
      setGaleri(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  /* =====================
     DELETE GALERI
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus galeri ini?")) return;

    await fetch(`http://localhost:5000/api/galeri/${id}`, {
      method: "DELETE",
    });
    fetchGaleri();
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/galeri/${editId}`
      : "http://localhost:5000/api/galeri";
    const method = isEdit ? "PUT" : "POST";

    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("deskripsi", form.deskripsi);
    formData.append("file_gambar", form.file_gambar);
    if (fileGambar) {
      formData.append("file_gambar", fileGambar); // upload file
    }

    await fetch(url, {
      method,
      body: formData, // pakai FormData
    });

    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setFileGambar(null);
    setPreview(null);
    setForm({ judul: "", deskripsi: "", file_gambar: "" });

    fetchGaleri();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#EC008C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading galeri...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#EC008C] to-[#00BCD4] rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  <FaRegImage className="text-white" size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Manajemen Galeri</h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">
                Kelola semua foto dan galeri Anda
              </p>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setForm({ judul: "", deskripsi: "", file_gambar: "" });
                setShowModal(true);
              }}
              className="bg-white text-[#EC008C] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              <span>Tambah Galeri</span>
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Galeri</p>
              <p className="text-3xl font-bold">{galeri.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Foto Aktif</p>
              <p className="text-3xl font-bold">{galeri.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Foto Terbaru</p>
              <p className="text-3xl font-bold">{galeri.length > 0 ? 1 : 0}</p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Table */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardCheck className="text-2xl" />
              Daftar Galeri
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Gambar</th>
                  <th className="p-4 text-left font-bold text-gray-700">Judul</th>
                  <th className="p-4 text-left font-bold text-gray-700">Deskripsi</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {galeri.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-gray-400">
                      Belum ada galeri. Klik tombol "Tambah Galeri" untuk menambahkan foto baru
                    </td>
                  </tr>
                ) : (
                  galeri.map((item, index) => (
                    <tr key={item.id} className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-[#EC008C]/5 hover:to-[#00BCD4]/5 transition-all duration-300">
                      <td className="p-4">
                        <div className="relative group">
                          <img
                            src={`http://localhost:5000/images/galeri/${item.file_gambar}`}
                            alt={item.judul}
                            className="w-32 h-24 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow"
                            onError={(e) => { e.target.src = "/images/no-image.png"; }}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-800 group-hover:text-[#EC008C] transition-colors">
                          {item.judul}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-600 line-clamp-2">{item.deskripsi || "-"}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setEditId(item.id);
                              setForm({
                                judul: item.judul,
                                deskripsi: item.deskripsi,
                                file_gambar: item.file_gambar,
                              });

                              setFileGambar(null); // reset file baru
                              setPreview(
                                item.file_gambar
                                  ? `http://localhost:5000/images/galeri/${item.file_gambar}`
                                  : null
                              );
                              setShowModal(true);
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1"
                          >
                            <FaEdit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1"
                          >
                            <FaRegImage className="w-4 h-4" /> Hapus
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
            <div className="bg-gradient-to-r from-[#EC008C] to-[#00BCD4] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {isEdit ? <FaEdit size={20} /> : <FaPlus size={20} />}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isEdit ? "Edit Galeri" : "Tambah Galeri Baru"}
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

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Galeri *</label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  placeholder="Masukkan judul galeri..."
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Gambar *</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFileGambar(file); // simpan file
                    setPreview(URL.createObjectURL(file)); // buat preview langsung
                    setForm({ ...form, file_gambar: file.name }); // opsional, simpan nama file
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none resize-none"
                  placeholder="Tulis deskripsi gambar di sini..."
                  rows="4"
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                />
              </div>

              {preview && (
                <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-2">Preview Gambar:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl"
                    onError={(e) => { e.target.src = "/images/no-image.png"; }}
                  />
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setFileGambar(null);
                  setPreview(null);
                }}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#EC008C] to-[#00BCD4] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <FaCheck /> <span>{isEdit ? "Simpan Perubahan" : "Tambah Galeri"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Galeri;
