import Button from "./Button";

const StakingModal = () => {
  return (
    <>
      <section className="flex flex-col drop-shadow-xl bg-gradient-to-r from-semi-dark rounded-[15px] items-center border border-bright border-opacity-20">
        <div className="py-5 font-yara text-bright font-extrabold text-2xl ">
          STAKE YOUR OST
        </div>
        <div className="py-5">
          <form>
            <label>
              <input
                type="text"
                className="w-80 h-16 bg-dark rounded-xl bg-opacity-20"
              />
            </label>
          </form>
        </div>
        <div className="py-5">Iput form</div>
        <div className="">staking apy</div>
        <dir>
          <Button />
        </dir>
      </section>
    </>
  );
};

export default StakingModal;
