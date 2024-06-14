import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

export const Sejarah = () => {

  const [sejarah, setSejarah] = useState([]);

  useEffect(() => {
    axios
      .get("/sejarah")
      .then((response) => {
        setSejarah(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data sejarah:", error);
      });
  })

  return (
    <>
      <Navbar />
      <div className="bg-tosca">
      {sejarah.map((data, index) => (
          <div key={index}>
            <div className="text-white text-center p-10">
              <h2 className="text-2xl font-bold">
                SEJARAH
              </h2>
              {/* Convert string dari data Ckeditor */}
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
