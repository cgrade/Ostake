import { useState } from "react";
import "tailwindcss/tailwind.css";
import { ToastContainer } from "react-toastify";

// INTERNAL IMPORTS
import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import { Footer } from "./components/Footer";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

function App() {
  return (
    <>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#a3c3ae",
          accentColorForeground: "black",
          borderRadius: "large",
        })}
      >
        <section grid grid-col>
          <header>
            <NavBar />
          </header>
          <section className="w-full flex justify-between">
            <Hero />
          </section>
          <Footer />
        </section>
      </RainbowKitProvider>
    </>
  );
}

export default App;
