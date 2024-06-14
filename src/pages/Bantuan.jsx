import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import bghead from "../assets/images/bg-header.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Bantuan = () => {
  const [bantuan, setBantuan] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/category")
      .then((response) => {
        setBantuan(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data bantuan:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-faq">
        <div className="h-20 md:h-32 relative">
          <h2 className="mx-10 md:mx-40 py-20 text-3xl md:text-5xl text-center">
            Bantuan Informasi
          </h2>
        </div>
        <div className="mx-10 md:mx-40 py-20">
          {/* <div className="pb-10">
          <p className="pb-10 italic text-center">
            Silahkan klik untuk masuk ke website resmi layanan terkait!
          </p>
          <hr></hr>
        </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bantuan
              .sort((a, b) => b.id - a.id)
              .map((data, index) => (
                <div className="item" key={index}>
                  <Link
                    to={`/bantuan/${data.slug}`}
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
                      {/* <p>{data.title}</p> */}
                      <p
                        dangerouslySetInnerHTML={{ __html: data.desc }}
                        className="text-sm"
                      />
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
