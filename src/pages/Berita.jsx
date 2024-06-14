import axios from "axios";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import bghead from "../assets/images/bg-header.png";
import { Footer } from "../components/Footer";

export const Berita = () => {
  const [berita, setBerita] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/berita")
      .then((response) => {
        setBerita(response.data.data);
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
          Berita
        </h2>
        <img src={bghead} className="w-full h-32 md:h-60 object-cover"></img>
      </div>
      <div className="mx-10 md:mx-40 my-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {berita
            .sort((a, b) => b.id - a.id)
            .map((data, index) => {
              // Mengubah format tanggal
              const formattedDate = new Date(
                data.created_at
              ).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <div className="item relative mb-5" key={index}>
                  <Link to={`/berita/${data.slug}`} className="w-96 shadow-xl">
                    <img
                      src={`${apiUrl}/${data.image}`}
                      alt={data.title}
                      className="relative"
                    ></img>
                    <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-3 w-full">
                      <h2 className="text-base font-bold text-left">
                        {data.title}
                      </h2>
                      <p className="text-left text-xs">{formattedDate}</p>
                      {/* <p dangerouslySetInnerHTML={{ __html: data.isi }} className="line-clamp-1 mb-5 text-left text-sm"></p> */}
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};
