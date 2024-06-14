import axios from "axios";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const BeritaDetail = () => {
  const [berita, setBerita] = useState([]);
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get(`/berita/${slug}`)
      .then((response) => {
        setBerita(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data Berita:", error);
      });
  }, []);

  // Format tanggal
  const formatTanggal = (tanggal) => {
    const dateObj = new Date(tanggal);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="my-10 md:my-20 mx-10 md:mx-40">
        <h2 className="text-4xl text-center pb-5">{berita.title}</h2>
        <p className="text-center pb-10">{formatTanggal(berita.created_at)}</p>
        <div className="flex items-center justify-center col-span-2 bg-white">
          <img
            src={`${apiUrl}/${berita.image}`}
            alt={berita.title}
            className="w-full t-20"
          ></img>
        </div>
        <div className="py-10">
          <div dangerouslySetInnerHTML={{ __html: berita.isi }}></div>
        </div>
      </div>
    </>
  );
};
