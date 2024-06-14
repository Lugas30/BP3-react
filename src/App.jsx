import "./assets/global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layanan } from "./pages/Layanan";
// import { LayananDetail } from "./pages/LayananDetail";
import { Organisasi } from "./pages/Organisasi";
import { Sejarah } from "./pages/Sejarah";
import { VisiMisi } from "./pages/VisiMisi";
import { NotFound } from "./pages/NotFound";
import axios from "axios";
import { Tentang } from "./pages/Tentang";
import { Berita } from "./pages/Berita";
import { BeritaDetail } from "./pages/BeritaDetail";
import { Bantuan } from "./pages/Bantuan";
import { BantuanDetail } from "./pages/BantuanDetail";
import ScrollToTop from "./ScrollToTop";

function App() {
  axios.defaults.baseURL = "https://bp3.queensland.id/api/";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = false;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />
        {/* <Route path="/Layanan/:slug" element={<LayananDetail />} /> */}
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/organisasi" element={<Organisasi />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/visiMisi" element={<VisiMisi />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:slug" element={<BeritaDetail />} />
        <Route path="/bantuan" element={<Bantuan />} />
        <Route path="/bantuan/:slug" element={<BantuanDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
