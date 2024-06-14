import Logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-100 px-6 md:px-20">
      <div className="flex-1">
        <Link to="/">
          <img src={Logo} className="w-32" alt="Logo BPPP" />
        </Link>
      </div>

      <div className="flex-none">
        <div className="hidden md:flex space-x-10">
          <Link to="/" className="my-auto">
            Beranda
          </Link>
          <Link to="/Layanan" className="my-auto">
            Layanan
          </Link>
          <Link to="/Tentang" className="my-auto">
            Tentang
          </Link>
          <Link to="/Berita" className="my-auto">
            Berita
          </Link>
        </div>
        <button className="ml-8 btn-orange rounded-full px-8 py-3 hover:bg-orange-500">
          <Link to="/Bantuan">Bantuan</Link>
        </button>
        <button
          className="btn btn-ghost bg-slate-100 btn-circle md:hidden ml-3"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white z-50 md:hidden">
          <ul className="menu menu-vertical p-4 w-full">
            <li className="mb-2">
              <Link to="/" onClick={toggleMenu}>
                Beranda
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/Layanan" onClick={toggleMenu}>
                Layanan
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/Tentang" onClick={toggleMenu}>
                Tentang
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/Berita" onClick={toggleMenu}>
                Berita
              </Link>
            </li>
            <hr></hr>
          </ul>
        </div>
      )}
    </div>
  );
};
