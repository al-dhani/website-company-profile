import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// React Icons
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-80"
        style={{
          backgroundImage: "url('/images/gacoan-hero.jpg')",
        }}
      ></div>


      {/* OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>

      {/* LOGIN CARD */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className="w-[420px] backdrop-blur-xl bg-white/20 border border-white/30 
             rounded-3xl shadow-2xl p-10 animate-fade-in relative
             transition-all duration-500
             group hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(236,0,140,0.6)]
             hover:bg-white/30 hover:border-white/60"
        >

          {/* HOME LINK */}
          <div className="absolute top-6 left-8 text-white text-sm font-medium">
            <Link to="/" className="hover:opacity-80 transition">
              ← HOME
            </Link>
          </div>

          {/* LOGO MIE GACOAN */}
          <div className="flex justify-center mb-10 mt-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="/LogoMieGacoan.png"
                alt="Mie Gacoan"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>


          <form onSubmit={handleLogin} className="space-y-6">
            {/* USERNAME */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/40 
                         text-white placeholder-white/70 py-3 
                         focus:outline-none focus:border-white transition"
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/40 
                           text-white placeholder-white/70 py-3 
                           focus:outline-none focus:border-white transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-white/70 hover:text-white transition"
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2 text-white text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full mt-8 py-3 rounded-full text-white font-semibold
                         bg-gradient-to-r from-[#EC008C] to-[#00B4D8]
                         hover:scale-[1.03] transition-all duration-300"
            >
              Login
            </button>


          </form>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
