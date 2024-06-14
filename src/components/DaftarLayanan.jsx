import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DaftarLayanan = () => {
  const [DaftarLayanan, setDaftarLayanan] = useState([]);

  useEffect(() => {
    axios
      .get(`/layanan`)
      .then((response) => {
        setDaftarLayanan(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data layanan:", error);
      });
  }, []);

  return (
    <>
      {DaftarLayanan.map((data, index) => (
        <ul key={index}>
          <Link to={`/Layanan/${data.slug}`}>
            <li className="btn bg-tosca w-full my-1 text-white hover:bg-green-950">
              {data.name}
            </li>
          </Link>
        </ul>
      ))}
    </>
  );
};
