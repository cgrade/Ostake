import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  return (
    <>
      <section className="pt-10 pb-3 px-20 w-full drop-shadow-xl border border-bright border-opacity-50">
        <div className="flex flex-row justify-between items-end">
          {/* Logo */}
          <div className="mx-5">
            <p className="text-5xl font-logo font-extrabold text-semi-dark">
              <span className="text-bright  ">OS</span>
              take
            </p>
          </div>

          {/* Menu */}

          <a className="text-dark text-[20px]" href="#">
            Dashboard
          </a>

          <a className="text-dark text-[20px]" href="#">
            Staking
          </a>

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
