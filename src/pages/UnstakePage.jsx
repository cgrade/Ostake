import React from "react";
import NavBar from "../sections/NavBar";

// Wagmi Imports
import { useRef, useState, useEffect } from "react";
import { tokenData, stakeData } from "../context/context";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther, parseUnits, formatEther, formatUnits } from "ethers";
import { holesky } from "wagmi/chains";
import { Footer } from "../components/Footer";

const UnstakePage = () => {
  const { isConnected, address } = useAccount();
  const { data } = useBalance({ address: address, token: tokenData.ca });
  const { writeContractAsync } = useWriteContract();

  // hooks
  const amountRef = useRef(null);
  const [reward, setReward] = useState(0);
  const [staked, setStaked] = useState(0);

  // Reading contract for Balance Staked
  const totalStaked = useReadContract({
    abi: stakeData.abi,
    functionName: "balanceOf",
    args: [address],
    address: stakeData.ca,
    chainId: holesky.id,
  });

  // Reading contract for Rewards Earned
  const rewardsAccumulated = useReadContract({
    abi: stakeData.abi,
    functionName: "rewards",
    args: [address],
    address: stakeData.ca,
    chainId: holesky.id,
  });
  useEffect(() => {
    // Check if totalStaked and rewardsAccumulated have data
    if (totalStaked.data && rewardsAccumulated.data) {
      try {
        const amountStaked = parseFloat(
          formatEther(totalStaked.data) // Use ethers.utils.formatEther
        ).toFixed(2);

        const rewardsEarned = parseFloat(
          formatEther(rewardsAccumulated.data) // Use ethers.utils.formatEther
        ).toFixed(2);

        setReward(rewardsEarned);
        setStaked(amountStaked);
      } catch (error) {
        console.error("Error formatting data:", error);
        // Handle potential errors during formatting (optional)
      }
    } else {
      // Set default values or loading state if data is not available
      setReward(0.0);
      setStaked(0.0);
    }
  }, []);

  const unStake = async (amount) => {
    try {
      await writeContractAsync({
        abi: stakeData.abi,
        functionName: "unstake",
        args: [amount],
        address: stakeData.ca,
        chainId: holesky.id,
      });
      alert(`${amount} unstaked Successfully`);
    } catch (err) {
      alert(err);
    }
  };

  // handle unstake button
  const handleUnstake = async (event) => {
    event.preventDefault();
    const unStakeAmount = parseEther(amountRef.current.value);
    unStake(unStakeAmount);
  };

  return (
    <div className="grid grid-cols-1">
      <NavBar></NavBar>
      <div className="flex justify-center mt-10">
        <section className="flex flex-col  w-80 sm:w-96 md:w-96 drop-shadow-xl bg-gradient-to-r from-semi-dark rounded-[15px] items-center border border-bright border-opacity-20">
          <h1 className="flex justify-center mt-4 text-2xl font-yara text-bright">
            Unstake your Tokens
          </h1>
          <div className="py-5">
            <form onSubmit={handleUnstake}>
              <label className="flex flex-row items-center">
                <div>
                  <input
                    ref={amountRef}
                    className="w-60 md:w-80 sm:w-80 h-16 bg-dark -mr-2 rounded-xl bg-opacity-30 p-4  text-sm placeholder:text-dark z-0 text-white"
                    type="text"
                    placeholder="Amount to unstake"
                    name="amount"
                  />
                </div>
                <div className="flex border rounded w-12 -ml-14 z-10 px-1 bg-dark bg-opacity-20">
                  MAX
                </div>
              </label>
              <div className="flex flex-col justify-between mt-3 text-sm">
                <div className="flex flex-row justify-between mt-2 text-dark">
                  <p>Tokens Staked:</p>
                  <p>{staked} OST</p>
                </div>
                <div className="flex flex-row justify-between mt-2  text-dark">
                  <p>Total Rewards:</p>
                  <p>{reward} OST</p>
                </div>
              </div>
              <div
                className="flex justify-center border border-bright 
                            border-opacity-30 my-10 p-3 bg-dark bg-opacity-40 text-white font-black text-xl 
                            rounded-full drop-shadow-2xl bg-opacity-60 hover:bg-bright"
              >
                <input type="submit" value="Unstake" />
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UnstakePage;
