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
            <label className="flex flex-row items-center">
              <div>
                <input
                  className="w-80 h-16 bg-dark -mr-2 rounded-xl bg-opacity-30 p-4 font-bold text-xl placeholder:text-dark z-0 text-white"
                  type="text"
                  placeholder="0.0"
                  name="amount"
                />
              </div>
              <div className="flex border w-12 -ml-14 z-10 px-1 bg-dark bg-opacity-50">
                MAX
              </div>
            </label>

            <p className="text-xs mt-1">Your Balance:2934830928</p>
            <div className="flex flex-row justify-between mt-14 font-bold text-bright">
              <p>Staking APR</p>
              <p>10%</p>
            </div>
            <div
              className="flex justify-center border border-bright 
                            border-opacity-30 my-10 p-3 bg-dark bg-opacity-40 text-white font-black text-xl 
                            rounded-full drop-shadow-2xl bg-opacity-60 hover:bg-bright"
            >
              <input type="submit" value="Stake" />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default StakingModal;
