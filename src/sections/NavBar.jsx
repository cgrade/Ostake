import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Faucet } from "../components/Faucet";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const NavBar = () => {
  const { isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="pt-5 pb-2 px-5 sm:pt-10 sm:pb-3 sm:px-20 w-full drop-shadow-xl border border-bright border-opacity-50">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between gap-4 items-center">
            {/* Logo */}
            <div className="mx-2 sm:mx-5 mr-40 sm:mr-0">
              <Link to="/app">
                <p className="text-3xl sm:text-5xl font-logo font-extrabold text-semi-dark">
                  <span className="text-bright">OS</span>take
                </p>
              </Link>
            </div>

            {/* Always show Connect Wallet button on mobile when not connected */}
            {!isConnected && (
              <div className="sm:hidden">
                <ConnectButton chainStatus={"icon"} label={"connect"} />
              </div>
            )}

            {/* Hamburger menu for when the wallet is connected */}
            {isConnected && (
              <div className="sm:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Dropdown menu content */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col sm:flex sm:flex-row w-full sm:w-auto gap-3`}
          >
            <div className="border px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-semi-dark text-black opacity-55 mt-2 sm:mt-0 w-full sm:w-auto text-center">
              <Faucet />
            </div>
            {isConnected ? (
              <>
                <Link
                  to="/dashboard"
                  className="border px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-semi-dark text-black opacity-55 mt-2 sm:mt-0 w-full sm:w-auto text-center"
                >
                  Dashboard
                </Link>
                <ConnectButton chainStatus={"icon"} label={"connect"} />
              </>
            ) : (
              // This ensures ConnectButton is also shown outside the hamburger menu on larger screens when not connected
              <div className="hidden sm:block">
                <ConnectButton chainStatus={"icon"} label={"connect"} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NavBar;
