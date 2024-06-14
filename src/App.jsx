import { useState } from "react";
import "tailwindcss/tailwind.css";

// INTERNAL IMPORTS
import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import { Footer } from "./components/Footer";
import { Faucet } from "./components/Faucet";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: "#a3c3ae",
        accentColorForeground: "#f35600",
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
  );
}

export default App;
