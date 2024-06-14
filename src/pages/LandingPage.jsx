import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import NavBar from "../sections/NavBar";
import LandingImage from "../assets/hero.png"; // Import your image

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
              <h1 className="text-4xl font-bold mb-8 text-bright">
                Welcome <span className="text-semi-dark">to </span> Ostake
              </h1>
              <p className="text-xl mb-10 text-dark text-justify">
                Ostake is a user-friendly staking protocol that empowers you to
                earn rewards by simply holding OST tokens. Stake your OST and
                unlock the potential for passive income.
              </p>
              <Link
                to="app"
                className="border bg-semi-dark text-bright font-bold px-8 py-3 rounded hover:bg-dark"
              >
                Get Started
              </Link>
            </div>
            <div className="w-full md:w-1/2 px-4 mt-5">
              <img src={LandingImage} alt="Landing" className="w-full h-auto" />{" "}
              {/* Add your image here */}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-semi-dark bg-opacity-25">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 font-yara text-bright">
            Why Ostake?
          </h2>
          <p className="text-lg text-left mb-8 p-2">
            <ul>
              <li>
                Effortless Staking: Stake your OST tokens with just a few
                clicks.
              </li>
              <li>
                Passive Rewards: Earn rewards automatically while your tokens
                are staked.{" "}
              </li>
              <li>
                Secure Staking: Ostake utilizes a secure platform to safeguard
                your assets.
              </li>
              <li>
                Transparent System: Stay informed about your rewards and staking
                activity.
              </li>
            </ul>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
