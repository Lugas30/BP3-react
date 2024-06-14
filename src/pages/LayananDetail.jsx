import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DaftarLayanan } from "../components/DaftarLayanan";

export const LayananDetail = () => {
  const [Layanan, setLayanan] = useState([]);
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get(`/layanan/${slug}`)
      .then((response) => {
        setLayanan(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data layanan:", error);
      });

  }, []);

  return (
    <div className="bg-tosca">
      <Navbar />
      <div className="p-20">
        <div className="grid grid-rows-3 grid-flow-col gap-10">
          <div className="flex items-center justify-center col-span-2 card bg-white">
            <img
              src={`${apiUrl}/${Layanan.image}`}
              alt={Layanan.name}
              className="w-60 t-20"
            ></img>
          </div>
          <div className="row-span-2 col-span-2 card bg-white p-10">
            <div dangerouslySetInnerHTML={{ __html: Layanan.deskripsi }}></div>
          </div>
          <div className="row-span-3 card bg-white w-96 p-10">
            <div className="text-2xl mb-3">Daftar Layanan</div>
            <DaftarLayanan />
          </div>
        </div>
      </div>
    </div>
  );
};
