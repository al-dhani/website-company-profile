import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72
        bg-gradient-to-br from-[#EC008C] via-pink-600 to-[#00A8CC]
        shadow-2xl z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">

          {/* ===== Header ===== */}
          <div className="flex items-center justify-between px-6 py-6 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center">
                <img
                  src="/LogoMieGacoan.png"
                  alt="Mie Gacoan"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-white text-lg block">
                  Mie Gacoan
                </span>
                <span className="text-white/80 text-xs">
                  PT Pesta Pora Abadi
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white text-2xl hover:bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:rotate-90 duration-300"
            >
              ✕
            </button>
          </div>

          {/* ===== Menu ===== */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2 text-white font-medium">

              {/* Home */}
              <li>
                <Link
                  onClick={onClose}
                  to="/"
                  className="flex items-center gap-4 px-5 py-3.5 rounded-xl
                  hover:bg-white/20 transition-all duration-300 group
                  border-2 border-transparent hover:border-white/30"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4H10v4a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"
                      />
                    </svg>

                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Home
                  </span>
                </Link>
              </li>

              {/* Partner Kami */}
              <li>
                <a
                  href="#partners"
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-xl
                  hover:bg-white/20 transition-all duration-300 group
                  border-2 border-transparent hover:border-white/30"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1M12 12a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>

                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Partner Kami
                  </span>
                </a>
              </li>

              {/* Artikel */}
              <li>
                <a
                  href="#artikel"
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-xl
                  hover:bg-white/20 transition-all duration-300 group
                  border-2 border-transparent hover:border-white/30"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2zM7 11h10M7 15h6"
                    />
                  </svg>

                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Artikel
                  </span>
                </a>
              </li>

              {/* Event */}
              <li>
                <a
                  href="#event"
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-xl
                  hover:bg-white/20 transition-all duration-300 group
                  border-2 border-transparent hover:border-white/30"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                    />
                  </svg>

                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Event
                  </span>
                </a>
              </li>

            </ul>
          </nav>

          {/* ===== Footer ===== */}
          <div className="px-6 py-5 bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <span>© 2025 GaComp</span>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
