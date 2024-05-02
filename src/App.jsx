import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ConnectButton } from "./components/ConnectButton";
import "tailwindcss/tailwind.css";

// Wallet connector Imports
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// INTERNAL IMPORTS
import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import { Footer } from "./components/Footer";

// get project ID:
const projectId = process.env.PROJECT_ID;

// SET CHAINS:
const testNet = {
  chainId: 1,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.API}`,
};

// Create Metadata Object:
const metadata = {
  name: "Ostake DeFi Staking",
  description:
    "Ostake is a Defi Staking Protocol where users can stake their token for a period of time and earns rewards",
  url: "#",
  icons: ["#"],
};

// <<--------====== Creating Ethers Config=====----->>
const ethersConfig = defaultConfig({
  metadata,

  enableEIP6963: true, // true by default
  enableInjected: true, //
});

function App() {
  return (
    <section grid grid-col>
      <header>
        <NavBar />
      </header>
      <section className="w-full">
        <Hero />
      </section>
      <Footer />
    </section>
  );
}

export default App;
