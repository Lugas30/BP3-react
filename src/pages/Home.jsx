import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import icon1 from "../assets/images/sejarah.png";
import icon2 from "../assets/images/visimisi.png";
import icon3 from "../assets/images/organisasi.png";
import pengaduan from "../assets/images/pengaduan.png";
import { Footer } from "../components/Footer";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [layanan, setLayanan] = useState([]);
  const [about, setAbout] = useState([]);
  const [berita, setBerita] = useState([]);
  const apiUrl = import.meta.env.VITE_IMG_STORAGE;

  useEffect(() => {
    axios
      .get("/slider")
      .then((response) => {
        setImageUrls(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data slider:", error);
      });

    axios
      .get("/layanan")
      .then((response) => {
        setLayanan(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data layanan:", error);
      });

    axios
      .get("/about")
      .then((response) => {
        setAbout(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data layanan:", error);
      });

    axios
      .get("/berita")
      .then((response) => {
        setBerita(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error("Error menangkap data layanan:", error);
      });
  }, []);

  const arrows = {
    prevArrow: (
      <button className="px-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className="px-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    ),
  };

  const [pengaduanInput, setpengaduanInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleInput = (e) => {
    e.persist();
    setpengaduanInput({ ...pengaduanInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Setelah 3 detik, hilangkan pesan validasi
    const timeoutId = setTimeout(() => {
      setFormErrors("");
    }, 2000);

    // Cleanup timeout jika komponen unmount sebelum waktu habis
    return () => clearTimeout(timeoutId);
  }, [formErrors]);

  // Validate the form
  const validateForm = () => {
    let errors = {};

    if (!pengaduanInput.name.trim()) {
      errors.name = "Name is required";
    }

    if (!pengaduanInput.email.trim()) {
      errors.email = "Email is required";
    }

    if (!pengaduanInput.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const data = {
        name: pengaduanInput.name,
        email: pengaduanInput.email,
        message: pengaduanInput.message,
      };
      console.log(data);

      // if (res.data.status === 200) {
      //   toast.success(res.data.message, "Success");
      //   navigate("/");
      // } else if (res.data.status === 422) {
      //   setpengaduanInput({
      //     ...pengaduanInput,
      //     error_list: res.data.validation_errors,
      //   });
      // }

      //post to api
      //     axios.post(`/pengaduan`, data).then((response) => {
      //       console.log(response.status);
      //       if (response.status === 200) {
      //         toast.success(response.message, "Success")
      //         setpengaduanInput({
      //           name: '',
      //           email: '',
      //           message: '',
      //           error_list: [],
      //       });
      //         // navigate("/");
      //       } else {
      //         setpengaduanInput({
      //           ...pengaduanInput,
      //           error_list: response.data.validation_errors,
      //         });
      //       }
      //     });
      //   }
      // };

      //post to api
      axios
        .post(`/pengaduan`, data)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            toast.success("Pesan terkirim dengan sukses");
            setpengaduanInput({
              name: "",
              email: "",
              message: "",
              error_list: [],
            });
          } else {
            setpengaduanInput({
              ...pengaduanInput,
              error_list: response.data.validation_errors,
            });
          }
        })
        .catch((error) => {
          console.error("Error sending pengaduan:", error);
          toast.error("Gagal mengirim pesan");
        });
    }
  };

  const notify = () => toast.success("Success");

  return (
    <>
      <Navbar />
      {/* <Slide
        {...arrows}
        autoplay={false}
        onChange={function noRefCheck() {}}
        onStartChange={function noRefCheck() {}}
      >
        <div className="slide-effect">
          {imageUrls.map((data, index) => (
            <div
              style={{
                backgroundImage: `url(${apiUrl}${data.image})`,
              }}
              key={index}
            >
              <span className="text-4xl font-bold text-white w-1/2">
                {data.name}
              </span>
            </div>
          ))}
        </div>
      </Slide> */}

      <OwlCarousel
        className="owl-theme"
        items="1"
        loop="true"
        autoplay="true"
        autoplayTimeout={10000}
        lazyLoad="true"
      >
        {imageUrls.map((data, index) => (
          <div className="item" key={index}>
            <img
              src={`${apiUrl}/${data.image}`}
              alt={data.name}
              className="w-full"
            />
          </div>
        ))}
      </OwlCarousel>

      <div className="mx-10 md:mx-40 my-20">
        <h2 className="text-center text-3xl font-bold uppercase pb-4">
          Layanan Pengujian
        </h2>
        <p className="text-center text-base pb-5">
          Berbagai layanan pengujian pendidikan tersedia disini
        </p>

        <OwlCarousel
          className="owl-theme"
          margin={20}
          items="5"
          lazyLoad="true"
          responsiveClass="true"
          responsive={{
            0: {
              items: 1,
              autoplay: true,
            },
            600: {
              items: 3,
              autoplay: true,
            },
            1000: {
              items: 5,
            },
          }}
        >
          {layanan.map((data, index) => (
            <div className="item py-5" key={index}>
              <Link
                to={data.link}
                className="card card-bg w-full bg-base-100 shadow-lg"
                target="_blank"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={`${apiUrl}/${data.image}`}
                    alt={data.name}
                    className=""
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="uppercase">{data.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </OwlCarousel>
        <div className="text-center my-5">
          <Link
            className="btn-orange px-8 py-3 hover:bg-orange-500 uppercase rounded-full text-base font-bold tracking-wide"
            to="/Layanan"
          >
            Daftar Layanan
          </Link>
        </div>
      </div>

      <div className="bg-tosca">
        {about.map((data, index) => (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10 md:mx-40 py-20"
            key={index}
          >
            <div className="FOTO">
              <img src={`${apiUrl}/${data.image}`}></img>
            </div>

            <div className="text-white text-center m-auto">
              <h2 className="text-3xl font-bold uppercase pb-8">
                Tentang Kami
              </h2>
              {/* Convert string dari data Ckeditor */}
              <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className="text-base"
              />
              <div className="grid grid-cols-1 gap-10 my-10">
                <Link to="/VisiMisi" className="m-auto">
                  <div className="flex m-auto">
                    <div className="bg-white rounded-full w-24 h-24">
                      <img
                        src={icon2}
                        alt="visi misi"
                        className="w-24 h-24 p-5 m-auto"
                      ></img>
                    </div>
                    <div className="my-auto min-w-40 px-5">
                      <p className="font-bold text-xl">Visi & misi</p>
                    </div>
                  </div>
                </Link>
                <Link to="/Sejarah" className="m-auto">
                  <div className="flex m-auto">
                    <div className="bg-white rounded-full w-24 h-24">
                      <img
                        src={icon1}
                        alt="sejarah"
                        className="w-24 h-24 p-5 m-auto"
                      ></img>
                    </div>
                    <div className="my-auto min-w-40 px-5">
                      <p className="font-bold text-xl">Sejarah</p>
                    </div>
                  </div>
                </Link>
                <Link to="/Organisasi" className="m-auto">
                  <div className="flex m-auto">
                    <div className="bg-white rounded-full w-24 h-24">
                      <img
                        src={icon3}
                        alt="organisasi"
                        className="w-24 h-24 p-5 m-auto"
                      ></img>
                    </div>
                    <div className="my-auto min-w-40 px-5">
                      <p className="font-bold text-xl">Organisasi</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Berita */}
      <div className="text-center">
        <div className="px-10 md:px-40 py-20">
          <h2 className="text-3xl font-bold uppercase pb-8">Berita</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-5">
            {berita
              .sort((a, b) => b.id - a.id)
              .slice(0, 3)
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
                  <div className="item relative" key={index}>
                    <Link
                      to={`/berita/${data.slug}`}
                      className="w-96 shadow-xl"
                    >
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
          <div className="text-center my-5">
            <Link
              className="btn-orange px-8 py-3 hover:bg-orange-500 uppercase rounded-full text-base font-bold tracking-wide"
              to="/Berita"
            >
              Daftar Berita
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>

      {/* Pengaduan */}
      <div className="px-5 md:px-10 pt-10 pb-10 md:pb-0">
        <h2 className="text-3xl font-bold uppercase pb-10 text-center mt-5">
          Pengaduan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mx-10">
          <div className="">
            <div className="text-3xl font-bold text-right">
              Apabila anda <span className="text-tosca">menemukan</span> sesuatu{" "}
              <br /> yang tidak{" "}
              <span className="text-tosca">mengikuti SOP</span> kami <br /> maka
              segera adukan!
            </div>
            <div className="font-bold mt-7 text-end">
              dilayanan pengaduan kami
            </div>

            <img src={pengaduan} alt="Pengaduan" className="mx-auto w-3/4" />
          </div>
          <div className="mx-0 md:mx-20">
            <div className="card w-auto bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h2 className="text-2xl font-bold uppercase pb-10 text-tosca">
                  Form Pengaduan Layanan
                </h2>
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    className="input input-bordered w-full mt-3"
                    onChange={handleInput}
                    value={pengaduanInput.name}
                  />
                  {formErrors.name && (
                    <p className="text-start text-red-500 text-xs font-semibold">
                      {formErrors.name}
                    </p>
                  )}

                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mt-3"
                    onChange={handleInput}
                    value={pengaduanInput.email}
                  />
                  {formErrors.email && (
                    <p className="text-start text-red-500 text-xs font-semibold">
                      {formErrors.email}
                    </p>
                  )}

                  <textarea
                    name="message"
                    className="textarea textarea-bordered w-full mt-3"
                    placeholder="Message"
                    onChange={handleInput}
                    value={pengaduanInput.message}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-start text-red-500 text-xs font-semibold">
                      {formErrors.message}
                    </p>
                  )}
                  <div className="mt-3 text-end">
                    <button
                      onClick={submit}
                      className="btn w-28 bg-yellow-300 hover:bg-yellow-200"
                    >
                      kirim
                    </button>
                  </div>
                </form>
                {/* <button onClick={notify}>click</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
    </>
  );
};
