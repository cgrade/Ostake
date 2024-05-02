import Button from "../components/Button";
import StakingModal from "../components/StakingModal";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col items-center mx-5 w-full drop-shadow-2xl">
        <div className="flex flex-row space-x-24 mt-10">
          <Button />

          <Button />
        </div>
        <div className="w-[26rem] my-4">
          <StakingModal />
        </div>
      </section>
    </>
  );
};

export default Hero;
