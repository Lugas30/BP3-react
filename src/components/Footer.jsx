import axios from "axios";
import { useState, useEffect } from "react";
import BP3CARD from "../assets/images/bp3-card.png";
import flogo from "../assets/images/footer.png";

export const Footer = () => {
  const [footer, setFooter] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/footer")
      .then((response) => {
        setFooter(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data footer:", error);
      });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-base-100">
      <div className="block md:flex justify-between mx-10 md:mx-20 py-10">
        <img
          src={BP3CARD}
          className="h-20 my-5 md:my-auto "
          alt="logo bp3 card"
        />
        <img src={flogo} className="h-20 my-5 md:my-auto" alt="" />
        <div className="flex">
          <div className="border-2 rounded-full border-tosca h-30 mx-4"></div>
          <div className="w-96">
            <h2 className="text-xl mb-2">Email</h2>
            <div className="mb-5 text-sm">Kontak@Bppp.id</div>
            <h2 className="text-xl mb-2">Alamat Kantor</h2>
            <div className="text-sm">
              Gedung Hamka Jl. Gardu No.1, RT.10/RW.2, Srengseng Sawah, Kec.
              Jagakarsa, Kota Jakarta Selatan
            </div>
          </div>
        </div>
      </div>
      <div className="bg-tosca px-10 md:px-20 py-5 block md:flex justify-between">
        <div className="block md:flex space-x-0 md:space-x-5">
          {footer.map((data, index) => (
            <div key={index} className="flex items-center">
              <img
                src={`${apiUrl}/${data.image}`}
                alt={data.name}
                className="w-10"
              ></img>
              <p className="text-white text-sm">{data.name}</p>
            </div>
          ))}
        </div>
        <div className="block md:flex my-auto">
          <p className="text-white text-xs my-5 md:my-0">
            © Hak cipta BPPP Kemendikbudristek {currentYear}
          </p>
        </div>
      </div>
    </div>
  );
};
