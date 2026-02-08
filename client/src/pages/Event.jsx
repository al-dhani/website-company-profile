import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaClipboardCheck, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const EventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    lokasi: "",
    gambar: "",
    deskripsi: "",
    link: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/event");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus event ini?")) return;
    await fetch(`http://localhost:5000/api/event/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/event/${editId}`
      : "http://localhost:5000/api/event";

    const method = isEdit ? "PUT" : "POST";

    const data = new FormData();
    data.append("judul", form.judul);
    data.append("tanggal", form.tanggal);
    data.append("lokasi", form.lokasi);
    data.append("deskripsi", form.deskripsi);
    data.append("link", form.link);

    if (gambarFile) {
      data.append("gambar", gambarFile);
    }

    await fetch(url, {
      method,
      body: data,
    });

    setShowModal(false);
    setIsEdit(false);
    setPreview(null);
    setGambarFile(null);
    setForm({
      judul: "",
      tanggal: "",
      lokasi: "",
      gambar: "",
      deskripsi: "",
      link: "",
    });

    fetchEvents();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#EC008C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading event...</p>
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
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaCalendarAlt size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Manajemen Event</h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">
                Kelola semua acara dan kegiatan Anda
              </p>
            </div>
            <button
              onClick={() => { setIsEdit(false); setForm({ judul: "", tanggal: "", lokasi: "", gambar: "", deskripsi: "", link: "" }); setShowModal(true); }}
              className="bg-white text-[#EC008C] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform" />
              <span>Tambah Event</span>
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Event</p>
              <p className="text-3xl font-bold">{events.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Event Aktif</p>
              <p className="text-3xl font-bold">{events.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Event Terbaru</p>
              <p className="text-3xl font-bold">{events.length > 0 ? 1 : 0}</p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardCheck className="text-2xl" />
              Daftar Event
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Gambar</th>
                  <th className="p-4 text-left font-bold text-gray-700">Judul Event</th>
                  <th className="p-4 text-left font-bold text-gray-700">Tanggal</th>
                  <th className="p-4 text-left font-bold text-gray-700">Lokasi</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-400">
                      <div className="text-gray-400">
                        <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-semibold">Belum ada event</p>
                        <p className="text-sm">Klik tombol "Tambah Event" untuk membuat event baru</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  events.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-[#EC008C]/5 hover:to-[#00BCD4]/5 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="w-28 h-20 rounded-xl overflow-hidden bg-gray-100 shadow">
                          <img
                            src={`http://localhost:5000/images/event/${item.gambar}`} // ambil dari server langsung
                            alt={item.judul}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-800 mb-1 group-hover:text-[#EC008C] transition-colors">
                          {item.judul}
                        </p>
                        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                          {new Date(item.tanggal).toLocaleDateString("id-ID")}
                        </p>
                      </td>
                      <td className="p-4">{item.lokasi}</td>
                      <td className="p-4 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setEditId(item.id);
                            setForm({
                              judul: item.judul || "",
                              tanggal: item.tanggal
                                ? item.tanggal.split("T")[0] // 🔥 FIX DATE
                                : "",
                              lokasi: item.lokasi || "",
                              gambar: item.gambar || "",
                              deskripsi: item.deskripsi || "",
                              link: item.link || "", // 🔥 INI PENTING
                            });

                            // 🔥 PREVIEW DARI SERVER
                            setPreview(
                              item.gambar
                                ? `http://localhost:5000/images/event/${item.gambar}`
                                : null
                            );

                            setGambarFile(null);
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
            <div className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] p-6 rounded-t-3xl flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  {isEdit ? <FaEdit size={20} /> : <FaPlus size={20} />}
                </div>
                <h2 className="text-2xl font-bold">{isEdit ? "Edit Event" : "Tambah Event Baru"}</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg">
                <IoClose size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Judul *
              </label>
              <input placeholder="Judul" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} className="w-full p-3 border rounded-xl" />
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tanggal *
              </label>
              <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })} className="w-full p-3 border rounded-xl" />
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Lokasi *
              </label>
              <input placeholder="Lokasi" value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} className="w-full p-3 border rounded-xl" />
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Gambar *
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border rounded-xl"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setGambarFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    Preview Gambar
                  </p>
                  <img
                    src={preview}
                    className="w-full h-64 object-cover rounded-xl shadow"
                  />
                </div>
              )}
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} className="w-full p-3 border rounded-xl" rows={4} />
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Link *
              </label>
              <input
                type="text"
                placeholder="Masukkan link, contoh: https://example.com"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div className="p-6 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="bg-gray-200 px-6 py-3 rounded-xl font-bold">Batal</button>
              <button onClick={handleSubmit} className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2">
                <FaCheck />
                {isEdit ? "Simpan" : "Tambah"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EventAdmin;