import { useState, useEffect } from 'react';
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaTiktok,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaComments,
} from "react-icons/fa";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telp, setTelp] = useState("");
  const [pesan, setPesan] = useState("");

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error("Gagal ambil data produk:", err);
      });
  }, []);

  const handlePayment = async (product) => {
    try {
      // 1. Request token ke backend
      const res = await axios.post("http://localhost:5000/api/checkout", {
        orderId: `INV-${Date.now()}`, // ID unik
        grossAmount: product.harga, // total bayar
        customer: {
          firstName: "Alif",
          lastName: "Ramadhani",
          email: "alif@example.com",
          phone: "081234567890",
        },
      });

      const token = res.data.token;

      // 2. Panggil Snap popup
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log("success:", result);
          alert("Pembayaran berhasil!");
        },
        onPending: function (result) {
          console.log("pending:", result);
          alert("Pembayaran pending!");
        },
        onError: function (result) {
          console.log("error:", result);
          alert("Terjadi kesalahan pembayaran!");
        },
        onClose: function () {
          console.log("popup closed");
          alert("Anda menutup popup tanpa membayar");
        },
      });
    } catch (err) {
      console.error(err);
      alert("Gagal membuat transaksi!");
    }
  };

  const displayedProducts = showAll
    ? products
    : products.slice(0, 4);

  const [galeri, setGaleri] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/galeri")
      .then(res => res.json())
      .then(data => setGaleri(data))
      .catch(err => console.error("Gagal ambil galeri:", err));
  }, []);

  const [partners, setPartners] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/partners")
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error("Gagal ambil partners:", err));
  }, []);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/artikel")
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("Gagal ambil artikel:", err));
  }, []);


  const menuFavorites = [
    {
      name: "Mie Gacoan",
      description: "Mie pedas favorit dengan level sesuai selera.",
      image: "/images/miegacoan.png",
    },
    {
      name: "Udang Rambutan",
      description: "Camilan renyah dengan isian udang pilihan.",
      image: "/images/udangrambutan.png",
    },
    {
      name: "Udang Keju",
      description: "Perpaduan udang gurih dan keju lumer.",
      image: "/images/udangkeju.png",
    },
    {
      name: "Es Gobak Sodor",
      description: "Minuman segar favorit pendamping makanan.",
      image: "/images/esgobaksodor.png",
    },
  ];

  const JUMLAH_GALERI_AWAL = 5;
  const [showAllGallery, setShowAllGallery] = useState(false);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/event")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Gagal ambil event:", err));
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - MODERN & BOLD */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/gacoan-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Gradient yang Lebih Dinamis */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#EC008C]/30 to-transparent"></div>

        {/* Animated Floating Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#EC008C]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-[#00B4D8]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">

            {/* Badge Premium */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/30 animate-fade-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC008C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EC008C]"></span>
              </span>
              <span className="text-white font-semibold text-sm tracking-wide">PT PESTA PORA ABADI</span>
            </div>

            {/* Main Heading - Super Bold */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8 text-white animate-slide-up">
              MiCan
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-[#EC008C] via-[#FF1493] to-[#00B4D8] bg-clip-text text-transparent animate-gradient">
                  Mie Pedas No.1 di Indonesia
                </span>
                {/* Underline Animation */}
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 400 12" fill="none">
                  <path d="M2 10C80 2 160 2 240 8C320 2 360 6 398 10" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EC008C" />
                      <stop offset="100%" stopColor="#00B4D8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle dengan Icon */}
            <div className="flex items-start gap-4 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex-shrink-0 w-12 h-12 bg-[#EC008C] rounded-xl flex items-center justify-center shadow-lg shadow-[#EC008C]/50">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-xl md:text-2xl text-white/95 font-light leading-relaxed">
                  Sensasi mie pedas <span className="font-bold text-[#EC008C]">favorit anak muda</span> dengan harga bersahabat.
                </p>
                <p className="text-lg text-white/80 mt-2">
                  Hadir di <span className="font-bold text-[#00B4D8]">500+ outlet</span> seluruh Indonesia
                </p>
              </div>
            </div>

            {/* CTA Buttons - More Creative */}
            <div className="flex flex-wrap gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => {
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group relative bg-gradient-to-r from-[#EC008C] to-[#C4007A] text-white px-10 py-5 rounded-2xl font-bold text-lg
          shadow-2xl shadow-[#EC008C]/50 hover:shadow-[#EC008C]/70 hover:scale-105 transition-all duration-300
          overflow-hidden"
              >
                {/* Button Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
            translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>

                <span className="relative flex items-center gap-3">
                  Lihat Menu
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group relative bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white px-10 py-5 rounded-2xl font-bold text-lg
          hover:bg-white hover:text-[#EC008C] hover:border-white transition-all duration-300 hover:scale-105
          shadow-xl"
              >
                <span className="flex items-center gap-3">
                  Tentang Kami
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes gradient {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes draw-line {
      from {
        stroke-dasharray: 0 1000;
      }
      to {
        stroke-dasharray: 1000 0;
      }
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out forwards;
    }

    .animate-fade-in {
      animation: fade-in 0.8s ease-out forwards;
    }

    .animate-gradient {
      background-size: 200% auto;
      animation: gradient 3s ease infinite;
    }

    .animate-draw-line {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw-line 2s ease-out forwards;
      animation-delay: 0.5s;
    }
  `}</style>
      </section>



      {/* ABOUT SECTION - MODERN LAYOUT */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC008C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B4D8]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Tentang Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Kisah <span className="text-[#EC008C]">Mie Gacoan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perjalanan dari satu outlet kecil di Malang hingga menjadi brand mie pedas favorit Indonesia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Story */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Tentang Kami</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong className="text-[#EC008C]">Mie Gacoan</strong> merupakan brand kuliner di bawah naungan
                  <strong> PT Pesta Pora Abadi</strong> yang didirikan pada tahun 2016 di Malang, Jawa Timur.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami menghadirkan konsep mie pedas modern dengan harga terjangkau yang menyasar generasi muda Indonesia,
                  dengan menu yang bervariasi dan suasana yang kekinian.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Berawal dari satu outlet kecil, kini Mie Gacoan telah berkembang menjadi salah satu brand kuliner
                  terbesar di Indonesia dengan lebih dari <strong className="text-[#00B4D8]">500+ outlet</strong> yang
                  tersebar di berbagai kota.
                </p>
              </div>

              {/* Achievement Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#EC008C] to-[#C4007A] text-white p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black mb-1">500+</div>
                  <div className="text-xs font-medium opacity-90">Outlets</div>
                </div>
                <div className="bg-gradient-to-br from-[#00B4D8] to-[#0096B8] text-white p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black mb-1">50+</div>
                  <div className="text-xs font-medium opacity-90">Kota</div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black mb-1">10K+</div>
                  <div className="text-xs font-medium opacity-90">Karyawan</div>
                </div>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="bg-gradient-to-br from-[#EC008C] to-[#00B4D8] rounded-3xl p-10 text-white shadow-2xl">
              <h4 className="text-3xl font-black mb-8 flex items-center gap-3">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                Sejarah Singkat
              </h4>
              <div className="space-y-6">
                {[
                  { year: "2016", text: "Pembukaan outlet pertama di Malang" },
                  { year: "2018", text: "Ekspansi ke kota-kota besar Jawa Timur" },
                  { year: "2020", text: "Mencapai 100+ outlet se-Indonesia" },
                  { year: "2024", text: "Meraih 500+ outlet dan terus berkembang" }
                ].map((milestone, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center 
                      font-black text-lg border-2 border-white/30 group-hover:bg-white group-hover:text-[#EC008C] transition-all duration-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-black text-xl mb-1">{milestone.year}</div>
                      <div className="text-white/90 text-sm leading-relaxed">{milestone.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI - MODERN DESIGN */}
      <section id="visimisi" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#EC008C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00B4D8]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white px-8 py-3 rounded-full font-bold mb-4 shadow-lg">
              Visi & Misi
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Visi & <span className="bg-gradient-to-r from-[#EC008C] to-[#00B4D8] bg-clip-text text-transparent">Misi Kami</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Komitmen kami untuk memberikan yang terbaik bagi pelanggan
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Visi Card */}
            <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Gradient Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#EC008C]/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>

              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#EC008C] to-[#C4007A]"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#EC008C] to-[#C4007A] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>

                {/* Badge */}
                <div className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-4 py-2 rounded-full text-sm font-bold mb-4">
                  VISI
                </div>

                {/* Title */}
                <h3 className="text-3xl font-black bg-gradient-to-r from-[#EC008C] to-[#C4007A] bg-clip-text text-transparent mb-6">
                  Visi Kami
                </h3>

                {/* Content Box */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Menjadi brand mie pedas <span className="font-bold text-[#EC008C]">nomor satu</span> pilihan masyarakat Indonesia yang dikenal dengan kualitas terbaik, harga terjangkau, dan pelayanan yang memuaskan di setiap outlet kami.
                  </p>
                </div>

                {/* Decorative Quote Icon */}
                <div className="absolute bottom-8 right-8 opacity-5">
                  <svg className="w-32 h-32 text-[#EC008C]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Misi Card */}
            <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Gradient Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00B4D8]/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>

              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00B4D8] to-[#0096B8]"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#00B4D8] to-[#0096B8] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/* Badge */}
                <div className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] px-4 py-2 rounded-full text-sm font-bold mb-4">
                  MISI
                </div>

                {/* Title */}
                <h3 className="text-3xl font-black bg-gradient-to-r from-[#00B4D8] to-[#0096B8] bg-clip-text text-transparent mb-6">
                  Misi Kami
                </h3>

                {/* Mission List */}
                <div className="space-y-4">
                  {[
                    {
                      text: "Menyajikan produk mie berkualitas tinggi dengan harga yang terjangkau",
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      text: "Menciptakan lapangan kerja dan memberdayakan generasi muda Indonesia",
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    },
                    {
                      text: "Mengembangkan inovasi menu yang sesuai dengan selera pasar",
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )
                    },
                    {
                      text: "Memberikan pengalaman dining yang menyenangkan dan berkesan",
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-[#00B4D8]/30 transition-all duration-300">
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#00B4D8] to-[#0096B8] text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                        {idx + 1}
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-[#00B4D8]/10 text-[#00B4D8] rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>

                      {/* Text */}
                      <p className="text-gray-700 leading-relaxed pt-2 flex-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN - MODERN CARDS */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-[#EC008C] to-[#C4007A] text-white px-8 py-3 rounded-full font-bold mb-4 shadow-lg">
              Keunggulan Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Kenapa <span className="bg-gradient-to-r from-[#EC008C] to-[#8B2C7E] bg-clip-text text-transparent">Mie Gacoan</span>?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pengalaman kuliner terbaik dengan standar kualitas tinggi untuk kepuasan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Harga Terjangkau",
                desc: "Mulai dari Rp 5.000 dengan porsi yang memuaskan",
                gradient: "from-[#EC008C] to-[#C4007A]"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Pelayanan Cepat",
                desc: "Pesanan siap dalam 5-10 menit tanpa mengurangi kualitas",
                gradient: "from-[#00B4D8] to-[#0096B8]"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: "Kualitas Terjamin",
                desc: "Bahan baku pilihan dan proses masak yang higienis",
                gradient: "from-[#8B2C7E] to-[#6B1F5E]"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Outlet Nyaman",
                desc: "Suasana modern, bersih dan instagramable untuk pengalaman makan terbaik",
                gradient: "from-[#FF6B6B] to-[#D54D4D]"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden">
                {/* Gradient Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}></div>

                {/* Decorative Background Circle */}
                <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full opacity-10`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container with Gradient */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    {item.icon}
                  </div>

                  {/* Text Content */}
                  <h4 className="font-black text-xl mb-3 text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Decorative Line */}
                <div className={`absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r ${item.gradient} opacity-30`}></div>
              </div>
            ))}
          </div>

          {/* Work Process Section */}
          <div className="bg-white rounded-3xl p-12 max-w-7xl mx-auto shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-black bg-gradient-to-r from-[#EC008C] to-[#8B2C7E] bg-clip-text text-transparent mb-3">
                Standard Work Process
              </h3>
              <p className="text-gray-600">Proses kerja terstandar untuk hasil terbaik</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connection Lines - Hidden on mobile */}
              <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-[#EC008C] via-[#8B2C7E] to-[#00B4D8] opacity-20"></div>

              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  ),
                  title: "Project Planning",
                  desc: "Perencanaan menu & strategi outlet yang matang",
                  gradient: "from-[#EC008C] to-[#C4007A]",
                  number: "01"
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  title: "Research Analysis",
                  desc: "Riset bahan baku dan pengembangan resep terbaik",
                  gradient: "from-[#8B2C7E] to-[#6B1F5E]",
                  number: "02"
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  title: "Creative Design",
                  desc: "Desain outlet dan branding yang menarik perhatian",
                  gradient: "from-[#00B4D8] to-[#0096B8]",
                  number: "03"
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Approved System",
                  desc: "Quality control dan sistem pelayanan yang prima",
                  gradient: "from-[#10B981] to-[#059669]",
                  number: "04"
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center group relative">
                  {/* Number Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {item.number}
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative`}>
                    <div className="text-white">
                      {item.icon}
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>

                  <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-[#EC008C] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed px-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU FAVORIT - MODERN CARDS */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Menu <span className="text-[#EC008C]">Favorit</span> Pelanggan
            </h2>
            <p className="text-xl text-gray-300">
              Menu andalan yang paling sering dipesan pelanggan kami
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              { num: "300+", label: "Outlet di Indonesia" },
              { num: "50+", label: "Kota Tersedia" },
              { num: "2016", label: "Tahun Berdiri" },
              { num: "10M+", label: "Pelanggan Puas" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl font-black text-[#00B4D8] mb-2">{stat.num}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Menu Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {menuFavorites.map((menu, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-5 
      border border-white/20 hover:bg-white/20 hover:-translate-y-2 
      transition-all duration-300 cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-white">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover 
          group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <h4 className="font-black text-xl mb-2">{menu.name}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {menu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK - GRID CARDS */}
      <section id="products" className="py-24 bg-gradient-to-br from-[#FDEAF3] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Products
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Produk <span className="text-[#EC008C]">Kami</span>
            </h2>
            <p className="text-xl text-gray-600">
              Berbagai pilihan menu favorit dengan harga terjangkau
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

            {displayedProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                  transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={`http://localhost:5000/images/produk/${product.image}`}
                    alt={product.nama_produk}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#00B4D8] text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                      {product.tipe}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-black text-xl mb-3 text-gray-900">{product.nama_produk}</h3>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[#EC008C] font-black text-2xl">
                        {formatRupiah(product.harga)}
                      </span>

                    </div>

                    <button
                      onClick={() => handlePayment(product)}
                      className="bg-gradient-to-r from-[#EC008C] to-[#C4007A] text-white px-6 py-3 
                      rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {products.length > 4 && (
            <div className="text-center mt-12">
              {!showAll ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-[#EC008C] text-white px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-[#C4007A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Lihat Semua Produk →
                </button>
              ) : (
                <button
                  onClick={() => setShowAll(false)}
                  className="bg-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-gray-300 transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Tampilkan Lebih Sedikit ↑
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-[#00B4D8] to-[#0096B8] text-white relative overflow-hidden">
        {/* Background blur */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EC008C] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl md:text-6xl font-black mb-6">
              Rasakan Sensasi Pedas Favoritmu
            </h3>

            <p className="text-xl mb-10 text-white/90">
              Mie Gacoan siap menemani momen makanmu bersama teman dan keluarga
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {/* BUTTON LOKASI */}
              <a
                href="https://www.antaranews.com/berita/4195941/lokasi-mie-gacoan-di-berbagai-daerah-ini-daftar-dan-jam-operasinya"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-[#00B4D8] px-10 py-4 rounded-full font-black text-lg 
                hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 
                flex items-center gap-3"
              >
                <FaMapMarkerAlt className="text-xl group-hover:scale-110 transition-transform" />
                Lihat Lokasi Outlet
              </a>

              {/* BUTTON MENU */}
              <a
                href="#products"
                className="group border-2 border-white px-10 py-4 rounded-full font-black text-lg 
                hover:bg-white hover:text-[#00B4D8] transition-all duration-300 hover:scale-105 
                flex items-center gap-3"
              >
                <GiNoodles className="text-xl group-hover:rotate-12 transition-transform" />
                Lihat Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY - MASONRY LAYOUT dengan variasi ukuran */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Galeri Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Outlet <span className="text-[#EC008C]">Mie Gacoan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dokumentasi suasana outlet, menu favorit, dan momen kebersamaan pelanggan
              di berbagai cabang Mie Gacoan
            </p>
          </div>

          {/* Masonry Grid dengan ukuran bervariasi */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {(showAllGallery ? galeri : galeri.slice(0, JUMLAH_GALERI_AWAL)).map((item, idx) => {
              // Variasi ukuran: buat beberapa item lebih besar
              const isLarge = idx % 7 === 0; // Setiap item ke-7 jadi besar
              const isTall = idx % 5 === 0; // Setiap item ke-5 jadi tinggi (portrait)
              const isWide = idx % 6 === 0; // Setiap item ke-6 jadi lebar

              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
                    transition-all duration-300 cursor-pointer
                    ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                    ${isTall ? 'row-span-2' : ''}
                    ${isWide && !isLarge ? 'md:col-span-2' : ''}
                  `}
                >
                  <img
                    src={`http://localhost:5000/images/galeri/${item.file_gambar}`}
                    alt={item.judul}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500
                      ${isLarge ? 'h-full min-h-[500px]' : isTall ? 'h-full min-h-[400px]' : 'h-64'}
                    `}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full 
                    group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-black text-lg mb-1">{item.judul}</h4>
                    {item.deskripsi && (
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full 
                    flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {galeri.length > JUMLAH_GALERI_AWAL && (
            <div className="text-center mt-12">
              {!showAllGallery ? (
                <button
                  onClick={() => setShowAllGallery(true)}
                  className="bg-[#EC008C] text-white px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-[#C4007A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Lihat Lebih Banyak Foto →
                </button>
              ) : (
                <button
                  onClick={() => setShowAllGallery(false)}
                  className="bg-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-gray-300 transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Tampilkan Lebih Sedikit ↑
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* PARTNERS */}
      <section
        id="partners"
        className="relative py-32 overflow-hidden bg-[#0A0A0A]"
      >
        {/* ===== GRADIENT BACKGROUND ===== */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#EC008C]/40 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-[140px]" />
        </div>

        {/* ===== GRID PATTERN ===== */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative container mx-auto px-6 max-w-7xl">
          {/* ===== HEADER ===== */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-14 bg-gradient-to-r from-[#EC008C] to-transparent" />
              <span className="text-white/60 text-sm tracking-widest uppercase">
                Mican
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-white leading-none">
              Our <br />
              <span className="bg-gradient-to-r from-[#EC008C] via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Partners
              </span>
            </h2>
          </div>

          {/* ===== BENTO GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {partners.map((partner, idx) => {
              const isBig = idx === 0;

              return (
                <div
                  key={partner.id}
                  className={`
              group relative overflow-hidden rounded-3xl
              ${isBig ? "md:col-span-2 md:row-span-2" : ""}
            `}
                >
                  {/* CARD */}
                  <div
                    className="
                relative h-full bg-white/5 backdrop-blur-md
                border border-white/15 rounded-3xl
                p-8 flex flex-col items-center justify-center
                transition-all duration-500
                hover:bg-white/10 hover:border-white/30
              "
                  >
                    {/* GLOW */}
                    <div
                      className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br from-[#EC008C]/25 to-purple-500/25
                  opacity-0 group-hover:opacity-100
                  blur-xl transition-opacity duration-500
                "
                    />

                    {/* LOGO */}
                    <div
                      className={`
                  relative z-10 flex items-center justify-center w-full flex-1
                  ${isBig ? "py-6" : ""}
                `}
                    >
                      <img
                        src={`http://localhost:5000/images/partners/${partner.logo}`}
                        alt={partner.nama}
                        className={`
                    object-contain transition-all duration-500
                    opacity-70 group-hover:opacity-100 group-hover:scale-110
                    ${isBig
                            ? "max-h-52 md:max-h-60 lg:max-h-64"
                            : "max-h-32"}
                  `}
                      />
                    </div>

                    {/* NAME */}
                    <p
                      className="
                  relative z-10 mt-4 text-white/80 font-semibold text-center
                  group-hover:text-white transition-colors
                "
                    >
                      {partner.nama}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENT - PORTRAIT CARDS */}
      <section id="event" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] px-6 py-2 rounded-full font-semibold mb-4">
              Event & Kegiatan
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Ikuti <span className="text-[#00B4D8]">Event</span> Kami
            </h2>
            <p className="text-xl text-gray-600">
              Berbagai kegiatan menarik dari Mie Gacoan untuk pelanggan setia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {events.map(event => (
              <div
                key={event.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                  transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image - Portrait */}
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  {event.gambar ? (
                    <img
                      src={`http://localhost:5000/images/event/${event.gambar}`}
                      alt={event.judul}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-8xl">
                      🎉
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
                      <div className="text-2xl font-black text-[#EC008C]">
                        {new Date(event.tanggal).getDate()}
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">
                        {new Date(event.tanggal).toLocaleDateString("id-ID", { month: "short" })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-black text-xl mb-3 text-gray-900 line-clamp-2 
                    group-hover:text-[#EC008C] transition-colors">
                    {event.judul}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <span>📍</span>
                    <span className="line-clamp-1">{event.lokasi}</span>
                  </div>

                  {event.deskripsi && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {event.deskripsi}
                    </p>
                  )}

                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white 
      py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Lihat Detail
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-3 rounded-full font-bold cursor-not-allowed"
                    >
                      Lihat Detail
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIKEL */}
      <section id="artikel" className="py-24 bg-gradient-to-br from-[#FDEAF3] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
                MiCan
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                News & <span className="text-[#EC008C]">Articles</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setShowAll(!showAll);
                document
                  .getElementById("artikel")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#00B4D8] text-white px-8 py-3 rounded-full font-bold 
  hover:bg-[#0096B8] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {showAll ? "← Balik" : "View All →"}
            </button>


          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {(showAll ? articles : articles.slice(0, 3)).map(article => (
              <div
                key={article.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
      transition-all duration-300 hover:-translate-y-2"
              >
                {/* THUMBNAIL */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={`http://localhost:5000/images/artikel/${article.thumbnail}`}
                    alt={article.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#00B4D8] text-white px-4 py-1 rounded-full text-xs font-bold">
                      {article.penulis}
                    </span>
                    <span className="text-sm text-gray-500">
                      📅 {article.created_at.slice(0, 10)}
                    </span>
                  </div>

                  <h3 className="font-black text-xl mb-4 line-clamp-2 text-gray-900 
        group-hover:text-[#EC008C] transition-colors">
                    {article.judul}
                  </h3>

                  <a
                    href={article.slug}
                    target="_blank"
                    className="text-[#EC008C] font-bold hover:gap-2 flex items-center gap-1 transition-all"
                  >
                    Baca Selengkapnya
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section
        id="contact"
        className="relative py-32 overflow-hidden bg-[#0A0A0A] text-white"
      >
        {/* ===== GRADIENT BACKGROUND ===== */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#EC008C]/40 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-[140px]" />
        </div>

        {/* ===== GRID PATTERN ===== */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Hubungi <span className="text-[#EC008C]">Kami</span>
            </h2>
            <p className="text-xl text-gray-300">
              Kami siap membantu Anda dengan informasi produk, franchise, atau kerjasama
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Alamat",
                  content: [
                    "Jalan Terusan Sufat 3K No. 141 Kel. Sawojajar",
                    "Kec. Kedungkadang Malang 65139",
                  ],
                  color: "from-[#EC008C] to-[#C4007A]",
                },
                {
                  icon: <FaEnvelope />,
                  title: "Email",
                  content: ["alif.ramadhani2007@gmail.com"],
                  color: "from-[#00B4D8] to-[#0096B8]",
                },
                {
                  icon: <FaPhoneAlt />,
                  title: "Telepon",
                  content: ["+62 812-3456-7890", "+62 341-567890"],
                  color: "from-[#8B2C7E] to-[#6B1F5E]",
                },
                {
                  icon: <FaComments />,
                  title: "Social Media",
                  content: [
                    "Instagram: @mie.gacoan",
                    "TikTok: @miegacoanofficial",
                    "Twitter: @mie_gacoan",
                  ],
                  color: "from-[#FF6B6B] to-[#D54D4D]",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl 
              flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-2">{item.title}</h4>
                    {item.content.map((line, i) => (
                      <p key={i} className="text-gray-300">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-black mb-6">Kirim Pesan</h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();

                  emailjs
                    .send(
                      "service_0rrmmus",
                      "template_o1ukrvf",
                      {
                        from_name: nama,
                        from_email: email,
                        message: pesan,
                      },
                      "8E8MfU1BGE2NrKGcH"
                    )
                    .then(
                      () => {
                        alert("Pesan berhasil dikirim");
                        setNama("");
                        setEmail("");
                        setTelp("");
                        setPesan("");
                      },
                      () => {
                        alert("Gagal mengirim pesan");
                      }
                    );
                }}
              >
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent transition-all"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent transition-all"
                  required
                />

                <textarea
                  placeholder="Pesan Anda"
                  rows="5"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent 
            transition-all resize-none"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white 
            py-4 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 
            transition-all duration-300"
                >
                  Kirim Pesan →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GiNoodles className="text-5xl text-[#EC008C]" />
                <span className="text-3xl font-black text-white">Mie Gacoan</span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Brand kuliner mie pedas terpercaya sejak 2016 dengan 500+ outlet di seluruh Indonesia.
              </p>

              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/miegacoan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
              hover:bg-[#EC008C] transition-all duration-300"
                >
                  <FaFacebookF className="text-white text-sm" />
                </a>

                <a
                  href="https://www.instagram.com/mie.gacoan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
              hover:bg-[#EC008C] transition-all duration-300"
                >
                  <FaInstagram className="text-white text-sm" />
                </a>

                <a
                  href="https://twitter.com/miegacoan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
              hover:bg-[#EC008C] transition-all duration-300"
                >
                  <FaTwitter className="text-white text-sm" />
                </a>

                <a
                  href="https://www.tiktok.com/@miegacoanofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
              hover:bg-[#EC008C] transition-all duration-300"
                >
                  <FaTiktok className="text-white text-sm" />
                </a>
              </div>
            </div>


            {/* Quick Links */}
            <div>
              <h4 className="font-black text-white text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About', 'Products', 'Gallery', 'Contact'].map((link, idx) => (
                  <li key={idx}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`}
                      className="hover:text-[#EC008C] transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[#EC008C] group-hover:w-4 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-white text-lg mb-6">Layanan</h4>
              <ul className="space-y-3">
                {['Franchise', 'Karir', 'Partnership', 'Investor'].map((service, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-[#EC008C] transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[#EC008C] group-hover:w-4 transition-all duration-300"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-black text-white text-lg mb-6">Newsletter</h4>
              <p className="text-sm mb-4 text-gray-400">
                Dapatkan update terbaru dari kami
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-[#EC008C] transition-all"
                />
                <button className="bg-gradient-to-r from-[#EC008C] to-[#00B4D8] px-6 py-3 rounded-xl 
                  font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 MiCan - PT Pesta Pora Abadi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#EC008C] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#EC008C] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}