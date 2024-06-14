import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Faucet } from "../components/Faucet";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const NavBar = () => {
  const account = useAccount();

  return (
    <>
      <section className="pt-10 pb-3 px-20 w-full drop-shadow-xl border border-bright border-opacity-50">
        <div className="flex flex-row justify-between items-end">
          {/* Logo */}
          <div className="mx-5">
            <Link to="/">
              <p className="text-5xl font-logo font-extrabold text-semi-dark">
                <span className="text-bright  ">OS</span>
                take
              </p>
            </Link>
          </div>
          {account.isConnected ? (
            <Link
              to="/dashboard"
              className="border px-4 py-2 rounded-lg bg-semi-dark text-black opacity-55"
            >
              Dashboard
            </Link>
          ) : null}

          <Faucet />

          {/* connect Wallet button */}
          <div>
            <ConnectButton showBalance={false} chainStatus={"name"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default NavBar;
