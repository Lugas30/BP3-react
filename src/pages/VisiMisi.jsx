import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import vimi from "../assets/images/vimi.png";

export const VisiMisi = () => {
  const [visimisi, setVisimisi] = useState([]);

  useEffect(() => {
    axios
      .get("/visimisi")
      .then((response) => {
        setVisimisi(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data visimisi:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-slate-200">
        {visimisi.map((data, index) => (
          <div key={index}>
            <div className="block md:flex justify-around text-center py-20 mx-10 md:mx-40">
              {/* Convert string dari data Ckeditor */}
              <div
                className="text-start"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
              <img src={vimi} alt="visimisi" width={500} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
