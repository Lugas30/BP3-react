import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";

export const BantuanDetail = () => {
  const [bantuanDetail, setBantuanDetail] = useState([]);
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get(`https://bp3.queensland.id/api/bantuan`) // Use the correct API URL
      .then((response) => {
        const filteredData = response.data.filter(
          (bantuan) => bantuan.category === slug
        );
        setBantuanDetail(filteredData);
        console.log(filteredData);
      })
      .catch((error) => {
        console.error("Error menangkap data bantuan:", error);
      });
  }, [slug]); // Add slug as a dependency

  const formattedSlug = slug.replace(/-/g, " ").toUpperCase();

  return (
    <>
      <Navbar />
      <div className="bg-faq">
        <div className="mx-10 md:mx-40 py-20">
          <h2 className="text-3xl mb-5">{formattedSlug}</h2>
          {bantuanDetail.map((bantuan) => (
            <div
              key={bantuan.id}
              className="collapse collapse-arrow bg-base-100 mb-5"
            >
              <input type="radio" name="my-accordion" className="" />
              <div className="collapse-title text-xl font-medium">
                <div className="m-5">{bantuan.subtitle}</div>
              </div>
              <div className="collapse-content">
                <p
                  dangerouslySetInnerHTML={{ __html: bantuan.desc }}
                  className="mx-5 mb-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};
