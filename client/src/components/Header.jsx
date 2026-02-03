import { Link } from "react-router-dom";
import logo from "../assets/LogoMieGacoan.png";

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-gradient-to-r from-white via-pink-50 to-cyan-50 shadow-lg sticky top-0 z-50 border-b-4 border-[#EC008C]">
      <div className="px-4 py-4 flex items-center justify-between max-w-full">
        
        {/* Kiri - Menu Hamburger (di ujung banget) */}
        <button
          onClick={onMenuClick}
          className="text-3xl text-[#00A8CC] hover:text-[#EC008C] transition-colors duration-300 hover:scale-110 transform mr-4"
          aria-label="Open Menu"
        >
          ☰
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <img src={logo} alt="Mie Gacoan" className="h-12 hover:scale-110 transition-transform duration-300" />
          <div className="border-l-2 border-[#00A8CC] pl-3">
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#EC008C] to-[#00A8CC] bg-clip-text text-transparent">
              PT Pesta Pora Abadi
            </h1>
            <p className="text-xs text-gray-500">Mie Gacoan Indonesia</p>
          </div>
        </div>

        {/* Tengah - Navigation dengan efek hover keren */}
        <nav className="hidden lg:flex gap-8 font-semibold text-gray-700 mx-auto">
          <a 
            href="#home" 
            className="relative px-3 py-2 hover:text-[#EC008C] transition-all duration-300 group"
          >
            <span className="relative z-10">Home</span>
            {/* Underline animation */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EC008C] to-[#00A8CC] group-hover:w-full transition-all duration-300"></span>
            {/* Background glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-pink-100 to-cyan-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></span>
            {/* Decorative dots */}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EC008C] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
          </a>
          
          <a 
            href="#about" 
            className="relative px-3 py-2 hover:text-[#00A8CC] transition-all duration-300 group"
          >
            <span className="relative z-10">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A8CC] to-[#EC008C] group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-pink-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00A8CC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
          </a>
          
          <a 
            href="#visimisi" 
            className="relative px-3 py-2 hover:text-[#EC008C] transition-all duration-300 group"
          >
            <span className="relative z-10">Visi & Misi</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EC008C] to-[#00A8CC] group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-100 to-cyan-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EC008C] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
          </a>
          
          <a 
            href="#profile" 
            className="relative px-3 py-2 hover:text-[#00A8CC] transition-all duration-300 group"
          >
            <span className="relative z-10">Profile</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A8CC] to-[#EC008C] group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-pink-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00A8CC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
          </a>
          
          <a 
            href="#gallery" 
            className="relative px-3 py-2 hover:text-[#EC008C] transition-all duration-300 group"
          >
            <span className="relative z-10">Gallery</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EC008C] to-[#00A8CC] group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-100 to-cyan-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EC008C] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
          </a>
          
          <a 
            href="#contact" 
            className="relative px-3 py-2 hover:text-[#00A8CC] transition-all duration-300 group"
          >
            <span className="relative z-10">Kontak</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A8CC] to-[#EC008C] group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-pink-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00A8CC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
          </a>
        </nav>

        {/* Kanan - Login Button */}
        <Link
          to="/login"
          className="bg-gradient-to-r from-[#EC008C] to-pink-600 text-white
          px-6 py-2.5 rounded-xl font-semibold shadow-md
          hover:shadow-xl hover:scale-105 transform transition-all duration-300
          border-2 border-transparent hover:border-[#00A8CC]
          relative overflow-hidden group"
        >
          <span className="relative z-10">Login</span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#00A8CC] to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Link>
      </div>
    </header>
  );
}