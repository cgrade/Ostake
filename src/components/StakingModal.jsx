import { useRef, useState } from "react";
import { tokenData, stakeData } from "../context/context";

import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { formatEther, parseEther } from "ethers";
import { holesky } from "wagmi/chains";

const StakingModal = () => {
  const { isConnected, address } = useAccount();
  const { data } = useBalance({ address: address, token: tokenData.ca });
  const { writeContractAsync } = useWriteContract();

  const amountRef = useRef(null);
  const allow = useReadContract({
    abi: tokenData.abi,
    functionName: "allowance",
    args: [address, stakeData.ca],
    address: tokenData.ca,
    chainId: holesky.id,
  });

  const stake = async (amount) => {
    try {
      await writeContractAsync({
        abi: stakeData.abi,
        functionName: "stake",
        args: [amount],
        address: stakeData.ca,
        chainId: holesky.id,
      });
      alert("Staked Successfully");
    } catch (err) {
      alert(err);
    }
  };

  const handlApproveAndStake = async (event) => {
    event.preventDefault();
    const stakeAmount = parseEther(amountRef.current.value);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await writeContractAsync({
      abi: tokenData.abi,
      functionName: "approve",
      args: [stakeData.ca, stakeAmount], // Contract address and amount
      address: tokenData.ca,
      chainId: holesky.id,
    });
    console.log("stakeAmount: ", stakeAmount);
    console.log("current allowance: ", allow.data);

    // wait for allowance to be updated
    if (stakeAmount > allow.data) {
      await delay(10000);
    }

    // check if the allowance is sufficient
    await allow.refetch();
    stake(stakeAmount);
  };
  return (
    <>
      <section className="flex flex-col w-96 drop-shadow-xl bg-gradient-to-r from-semi-dark rounded-[15px] items-center border border-bright border-opacity-20">
        <div className="py-5 font-yara text-bright font-extrabold text-2xl ">
          STAKE YOUR OST
        </div>
        <div className="py-5">
          <form onSubmit={handlApproveAndStake}>
            <label className="flex flex-row items-center">
              <div>
                <input
                  ref={amountRef}
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

            <p className="text-xs mt-1">
              Your Balance:{data ? formatEther(data.value.toString()) : null}
            </p>
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
