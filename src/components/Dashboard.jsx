import React from "react";

export const Dashboard = () => {
  return (
    <>
      <section className=" w-96 drop-shadow-xl mt-10 bg-gradient-to-r from-semi-dark rounded-[15px] items-center border border-bright border-opacity-20">
        <h1 className="flex justify-center mt-4 text-2xl font-yara text-bright">
          Dashboard
        </h1>
        <div className="flex flex-col  m-10">
          <div className="flex flex-row justify-between py-5">
            <div className="">Amount Staked:</div>
            <p>200</p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="">Rewards:</div>
            <p>0.222</p>
          </div>

          <div
            className="flex justify-center border border-bright 
                            border-opacity-30 my-10 p-3 bg-dark bg-opacity-40 text-white font-black text-xl 
                            rounded-full drop-shadow-2xl bg-opacity-60 hover:bg-bright"
          >
            Unstake
          </div>
        </div>
      </section>
    </>
  );
};
