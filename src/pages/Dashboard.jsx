import React, { useEffect, useState } from "react";
import NavBar from "../sections/NavBar";

// wagmi imports
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { stakeData } from "../context/context";
import { holesky } from "wagmi/chains";

// Icons
import {
  MdAccountBalanceWallet,
  MdOutlineLocalFireDepartment,
} from "react-icons/md";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ethers, formatEther, formatUnits } from "ethers";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

const Dashboard = () => {
  // Hooks
  const { isConnected, address } = useAccount();
  const [reward, setReward] = useState(0);
  const [staked, setStaked] = useState(0);
  const { writeContractAsync } = useWriteContract();

  const totalStaked = useReadContract({
    abi: stakeData.abi,
    functionName: "balanceOf",
    args: [address],
    address: stakeData.ca,
    chainId: holesky.id,
  });

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

  // Claim reward Handler
  const claimReward = async () => {
    try {
      const data = await writeContractAsync({
        abi: stakeData.abi,
        address: stakeData.ca,
        functionName: "claimRewards",
        chainId: holesky.id,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <section>
        <NavBar></NavBar>
        <div className="container px-6 py-10 mx-auto justify-center md:px-3 md:py-5">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-3xl font-yara text-center md:text-xl">
            Dashboard
          </h1>

          <p className="font-yara text-md mt-4 text-gray-500 xl:mt-6 text-center md:text-sm">
            Explore your dashboards: stake, unstake and claim rewards for all
            your staking
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            {/* ==========Metric Card=================> */}
            <div className="flex flex-col p-8 space-y-3 rounded-2xl drop-shadow bg-gradient-to-r from-semi-dark justify border border-r-bright">
              <div className=" flex text-blue-500 dark:text-blue-4 justify-center">
                <MdAccountBalanceWallet size={70} color="#f35600" />
              </div>
              <div className="flex flex-row justify-between text-2xl border border-spacing-1 p-3 rounded drop-shadow-2xl border-dark">
                {" "}
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-#154e54">
                  Staked
                </h1>
                <p className="text-gray-500 dark:text-gray-300 font-yara text-dark">
                  {staked}
                </p>
              </div>
              <Link
                className="flex border justify-center rounded-2xl bg-dark drop-shadow-xl font-yara text-2xl inline-flex p-2 
                text-white capitalize  bg-blue-100 rounded-full  no-underline
                hover:bg-bright"
                to="/Unstake"
              >
                Unstake
              </Link>
            </div>

            <div className="flex flex-col p-8 space-y-3 rounded-2xl drop-shadow bg-gradient-to-r from-semi-dark border border-r-bright">
              <div className=" flex text-blue-500 dark:text-blue-4 justify-center">
                <MdOutlineLocalFireDepartment size={70} color="#f35600" />
              </div>
              <div className="flex flex-row justify-between text-2xl border border-spacing-1 p-3 rounded drop-shadow-2xl border-dark">
                {" "}
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-#154e54">
                  Rewards
                </h1>
                <p className="text-gray-500 dark:text-gray-300 font-yara text-dark">
                  {reward}
                </p>
              </div>
              <Link
                className="flex border justify-center rounded-2xl bg-dark drop-shadow-xl font-yara text-2xl inline-flex p-2 
                text-white capitalize  bg-blue-100 rounded-full  no-underline
                hover:bg-bright"
                // to="/Unstake"
                onClick={claimReward}
              >
                Claim Rewards
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Dashboard;
