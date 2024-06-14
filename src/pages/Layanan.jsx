import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import bghead from "../assets/images/bg-header.png";

export const Layanan = () => {
  const [layanan, setLayanan] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/layanan")
      .then((response) => {
        setLayanan(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data slider:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-32 md:h-60 relative">
        <h2 className="mx-10 md:mx-40 text-3xl md:text-5xl text-white absolute top-1/2 -translate-y-1/2">
          Daftar Layanan
        </h2>
        <img src={bghead} className="w-full h-32 md:h-60 object-cover"></img>
      </div>
      <div className="mx-10 md:mx-40 my-20">
        {/* <div className="pb-10">
          <p className="pb-10 italic text-center">
            Silahkan klik untuk masuk ke website resmi layanan terkait!
          </p>
          <hr></hr>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {layanan
            .sort((a, b) => b.id - a.id)
            .map((data, index) => (
              <div className="item" key={index}>
                <Link
                  to={data.link}
                  className="card md:card-side bg-base-100 shadow-xl card-bg"
                  target="_blank"
                >
                  <figure className="w-1/3 md:w-1/5 ml-10 md:ml-5 my-0 md:my-5 mt-5 md:mt-0">
                    <img
                      src={`${apiUrl}/${data.image}`}
                      alt={data.name}
                      className=""
                    />
                  </figure>
                  <div className="card-body w-full md:w-4/5 my-auto">
                    <h2 className="uppercase">{data.name}</h2>
                    <p
                      dangerouslySetInnerHTML={{ __html: data.deskripsi }}
                      className="text-sm"
                    />
                    <p className="block pt-5 pb-3 italic text-orange-400 text-xs">
                      Klik untuk kunjungi situs resmi
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
