import { Navbar } from "../components/Navbar";
import bghead from "../assets/images/bg-header.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import icon1 from "../assets/images/sejarah.png";
import icon2 from "../assets/images/visimisi.png";
import icon3 from "../assets/images/organisasi.png";
import { Footer } from "../components/Footer";

export const Tentang = () => {
  const [about, setAbout] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/about")
      .then((response) => {
        setAbout(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data layanan:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-32 md:h-60 relative">
        <h2 className="mx-10 md:mx-40 text-3xl md:text-5xl text-white absolute top-1/2 -translate-y-1/2">
          Tentang BLU BPPP
        </h2>
        <img src={bghead} className="w-full h-32 md:h-60 object-cover"></img>
      </div>
      <div className="mx-10 md:mx-40 my-20">
        {about.map((data, index) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10" key={index}>
            <div className="FOTO">
              <img src={`${apiUrl}/${data.image}`}></img>
            </div>

            <div className="text-center m-auto">
              <h2 className="text-3xl font-bold uppercase pb-8">
                Tentang Kami
              </h2>
              {/* Convert string dari data Ckeditor */}
              <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className="text-base"
              />
              <div className="grid grid-cols-1 gap-5 my-10">
                <Link to="/VisiMisi" className="mx-auto">
                  <div className="flex m-auto">
                    <div className="bg-white rounded-full w-24 h-24 shadow-lg">
                      <img
                        src={icon2}
                        alt="visi misi"
                        className="w-24 h-24 p-5 m-auto"
                      ></img>
                    </div>
                    <div className="my-auto px-5">
                      <p className="font-bold min-w-40 text-xl">Visi & misi</p>
                    </div>
                  </div>
                </Link>
                <Link to="/Sejarah" className="mx-auto">
                  <div className="flex m-auto">
                    <div className="bg-white rounded-full w-24 h-24 shadow-lg">
                      <img
                        src={icon1}
                        alt="sejarah"
                        className="w-24 h-24 p-5 m-auto"
                      ></img>
                    </div>
                    <div className="my-auto px-5">
                      <p className="font-bold min-w-40 text-xl">Sejarah</p>
                    </div>
                  </div>
                </Link>
                <Link to="/Organisasi" className="mx-auto">
                  <div className="flex m-auto">
                    <div className="bg-white rounded-full w-24 h-24 shadow-lg">
                      <img
                        src={icon3}
                        alt="organisasi"
                        className="w-24 h-24 p-5 m-auto"
                      ></img>
                    </div>
                    <div className="my-auto px-5">
                      <p className="font-bold min-w-40 text-xl">Organisasi</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
