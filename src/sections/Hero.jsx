import { useBalance, useAccount } from "wagmi";
import Button from "../components/Button";
import StakingModal from "../components/StakingModal";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col items-center mx-5 w-full drop-shadow-2xl">
        <div className="flex flex-row-reverse my-4">
          <StakingModal />
        </div>
      </section>
    </>
  );
};

export default Hero;
