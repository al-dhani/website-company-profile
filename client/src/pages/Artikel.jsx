import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

// Import React Icons
import { FaRegNewspaper, FaPlus, FaEdit, FaClipboardCheck, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Artikel = () => {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState(null); // 🔥 WAJIB ADA

  const [form, setForm] = useState({
    judul: "",
    slug: "",
    isi: "",
    thumbnail: "",
    penulis: "",
  });

  /* =====================
     FETCH ARTIKEL
  ===================== */
  const fetchArtikel = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/artikel");
      const data = await res.json();
      setArtikels(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  /* =====================
     DELETE ARTIKEL
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus artikel ini?")) return;

    await fetch(`http://localhost:5000/api/artikel/${id}`, {
      method: "DELETE",
    });

    fetchArtikel();
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/artikel/${editId}`
      : "http://localhost:5000/api/artikel";

    const method = isEdit ? "PUT" : "POST";

    const data = new FormData();
    data.append("judul", form.judul);
    data.append("slug", form.slug);
    data.append("isi", form.isi);
    data.append("penulis", form.penulis);

    if (thumbnailFile) {
      data.append("thumbnail", thumbnailFile);
    }

    await fetch(url, {
      method,
      body: data,
    });

    setShowModal(false);
    setIsEdit(false);
    setPreview(null);
    setThumbnailFile(null);
    setForm({
      judul: "",
      slug: "",
      isi: "",
      thumbnail: "",
      penulis: "",
    });

    fetchArtikel();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#EC008C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading artikel...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-[#EC008C] to-[#00BCD4] rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  <FaRegNewspaper className="text-white" size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Manajemen Artikel
                </h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">
                Kelola semua artikel dan konten blog Anda
              </p>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setForm({
                  judul: "",
                  slug: "",
                  isi: "",
                  thumbnail: "",
                  penulis: "",
                });
                setShowModal(true);
              }}
              className="bg-white text-[#EC008C] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              <span>Tambah Artikel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Artikel</p>
              <p className="text-3xl font-bold">{artikels.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Artikel Aktif</p>
              <p className="text-3xl font-bold">{artikels.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Artikel Terbaru</p>
              <p className="text-3xl font-bold">
                {artikels.length > 0 ? 1 : 0}
              </p>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardCheck className="text-2xl" />
              Daftar Artikel
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Thumbnail</th>
                  <th className="p-4 text-left font-bold text-gray-700">Judul</th>
                  <th className="p-4 text-left font-bold text-gray-700">Penulis</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {artikels.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <div className="text-gray-400">
                        <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-semibold">Belum ada artikel</p>
                        <p className="text-sm">Klik tombol "Tambah Artikel" untuk membuat artikel baru</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  artikels.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-[#EC008C]/5 hover:to-[#00BCD4]/5 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="w-28 h-20 rounded-xl overflow-hidden bg-gray-100 shadow">
                          <img
                            src={`http://localhost:5000/images/artikel/${item.thumbnail}`}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/no-image.png"; // optional fallback
                            }}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-800 mb-1 group-hover:text-[#EC008C] transition-colors">
                          {item.judul}
                        </p>
                        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                          {item.slug}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#EC008C] to-[#00BCD4] rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {item.penulis ? item.penulis[0].toUpperCase() : "?"}
                          </div>
                          <span className="text-gray-700 font-medium">{item.penulis || "-"}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setEditId(item.id);
                              setForm(item);

                              // INI KUNCI PREVIEW EDIT
                              setPreview(
                                item.thumbnail
                                  ? `http://localhost:5000/images/artikel/${item.thumbnail}`
                                  : null
                              );

                              setThumbnailFile(null);
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
                            <FaRegNewspaper className="w-4 h-4" />
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
            <div className="bg-gradient-to-r from-[#EC008C] to-[#00BCD4] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {isEdit ? <FaEdit size={20} /> : <FaPlus size={20} />}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isEdit ? "Edit Artikel" : "Tambah Artikel Baru"}
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
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Judul */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Judul Artikel *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  placeholder="Masukkan judul artikel..."
                  value={form.judul}
                  onChange={(e) =>
                    setForm({ ...form, judul: e.target.value })
                  }
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all outline-none"
                  placeholder="contoh-artikel-slug"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: e.target.value })
                  }
                />
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Gambar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setThumbnailFile(file);       // simpen file buat submit
                      setPreview(URL.createObjectURL(file)); // preview aja
                    }}
                  />

                  {preview && (
                    <div className="mt-4">
                      <p className="text-sm font-bold text-gray-700 mb-2">Preview Gambar</p>
                      <img
                        src={preview}
                        className="w-full h-64 object-cover rounded-xl shadow"
                        alt="Preview Gambar"
                      />
                    </div>
                  )}
                </div>

                {/* Penulis */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Penulis
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all outline-none"
                    placeholder="Nama penulis"
                    value={form.penulis}
                    onChange={(e) =>
                      setForm({ ...form, penulis: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Isi Artikel */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Isi Artikel *
                </label>
                <textarea
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none resize-none"
                  placeholder="Tulis konten artikel Anda di sini..."
                  rows="6"
                  value={form.isi}
                  onChange={(e) =>
                    setForm({ ...form, isi: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#EC008C] to-[#00BCD4] text-white px-6 py-3 rounded-xl font-bold hover:from-[#ff1a9e] hover:to-[#00d4e8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <FaCheck />
                  <span>{isEdit ? "Simpan Perubahan" : "Tambah Artikel"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Artikel;
