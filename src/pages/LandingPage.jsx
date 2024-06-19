import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import NavBar from "../sections/NavBar";
import LandingImage from "../assets/bbb.jpg"; // Import your image

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mt-8">
              <h1 className="text-4xl font-bold mb-8 text-bright">
                Welcome <span className="text-semi-dark">to </span> Ostake
              </h1>
              <p className="text-xl fill-semi-dark mb-10 text-dark text-justify">
                Ostake is a user-friendly staking protocol that empowers you to
                earn rewards by simply holding OST tokens. Stake your OST and
                unlock the potential for passive income. <br />
                <br /> Ostake gives you 1% Rewards per hour.
                <br />
                Simply connect your wallet and start staking today and start
                earning $OST Tokens every second.
              </p>
              <Link
                to="app"
                className="border bg-dark text-white text-xl font-bold px-12 py-5 rounded-full hover:bg-semi-dark hover:text-dark transition duration-300 ease-in-out"
              >
                Get Started
              </Link>
            </div>
            <div className="w-full md:w-1/2 px-4 mt-5">
              <img
                src={LandingImage}
                alt="Landing"
                className="w-full h-auto rounded-3xl drop-shadow-2xl"
              />{" "}
              {/* Add your image here */}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 font-yara text-bright">
            Why Ostake?
          </h2>
          <div className="text-m font-serif">
            <ul className="mt-2">
              {/* List Items------------------->>>> */}

              {/* Dummy */}
              <li className="flex sm:flex-row my-5 lg:flex-row p-2 border rounded-xl w-full  h-40 bg-semi-dark  drop-shadow-2xl ">
                <span className=" flex flex-col  items-center w-52 rounded-lg mr-4  bg-white p-1 text-dark font-bold ">
                  <div>
                    <img
                      src="public/lock.jpg"
                      alt=""
                      className=" w-full h-28"
                    />
                  </div>
                  Secure
                </span>{" "}
                <div className="grid grid-cols-1 content-center w-full text-dark sm:font-bold ">
                  Ostake utilizes a secure platform to safeguard your assets.
                </div>
              </li>
              {/* Next items */}
              <li className="flex sm:flex-row  my-5 lg:flex-row p-2 border rounded-xl w-full  h-40 bg-dark drop-shadow-2xl ">
                <span className=" flex flex-col  items-center w-52 border rounded-lg mr-4  bg-white p-1 text-dark font-bold">
                  <div>
                    <img
                      width={"300"}
                      src="public/reward.jpg"
                      alt=""
                      className=" w-full h-28"
                    />
                  </div>
                  Rewards
                </span>{" "}
                <div className="grid grid-cols-1 content-center w-full text-white sm:font-bold ">
                  Earn rewards automatically while your tokens are staked.
                </div>
              </li>
              <li className="flex sm:flex-row lg:flex-row p-2 border rounded-xl w-full  h-40 bg-semi-dark drop-shadow-2xl ">
                <span className=" flex flex-col  items-center w-52 rounded-lg mr-4  bg-white p-1 text-dark sm:font-bold">
                  <div>
                    <img
                      width={"300"}
                      src="public/transparent.jpg"
                      alt=""
                      className=" w-full h-28"
                    />
                  </div>
                  Transparent
                </span>{" "}
                <div className="grid grid-cols-1 content-center w-full text-dark sm:font-bold ">
                  Stay informed about your rewards and staking activity.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
