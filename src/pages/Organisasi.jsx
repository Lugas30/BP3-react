import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

export const Organisasi = () => {
  const [organisasi, setOrganisasi] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/organisasi")
      .then((response) => {
        setOrganisasi(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data organisasi:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      {organisasi.map((data, index) => (
        <div className="bg-tosca" key={index}>
          <img
            src={`${apiUrl}${data.img_desktop}`}
            alt="organisasi"
            className="p-20 img-desktop mx-auto"
          />
          <img
            src={`${apiUrl}${data.img_mobile}`}
            alt="organisasi"
            className="p-10 img-mobile"
          />
        </div>
      ))}
    </>
  );
};
