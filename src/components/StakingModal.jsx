import { useRef, useState } from "react";
import { tokenData, stakeData } from "../context/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// wagmi imports
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";

// ethers imports
import { formatEther, parseEther } from "ethers";
import { holesky } from "wagmi/chains";

const StakingModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, address } = useAccount();
  const { data } = useBalance({ address: address, token: tokenData.ca });
  const { writeContractAsync } = useWriteContract();
  const [amount, setAmount] = useState("");

  const amountRef = useRef(null);
  const allow = useReadContract({
    abi: tokenData.abi,
    functionName: "allowance",
    args: [address, stakeData.ca],
    address: tokenData.ca,
    chainId: holesky.id,
  });

  const stake = async (amount) => {
    setIsLoading(true);
    try {
      await writeContractAsync({
        abi: stakeData.abi,
        functionName: "stake",
        args: [amount],
        address: stakeData.ca,
        chainId: holesky.id,
      });
      toast.success(`${formatEther(amount)} $OST Staked Successfully`);
    } catch (err) {
      toast.error("Try Again: Allowance not updated");
    }
    setIsLoading(false);
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
      await delay(13000);
    } else {
      stake(stakeAmount);
    }

    // check if the allowance is sufficient
    await allow.refetch();
    stake(stakeAmount);
  };

  const handleAmountChange = (e) => {
    const newValue = e.target.value;
    // Regular expression to allow only numeric input (including decimal points)
    if (/^\d*\.?\d*$/.test(newValue)) {
      setAmount(newValue);
    }
  };

  return (
    <>
      <section className="flex flex-col w-80 sm:w-96 md:w-96  drop-shadow-xl bg-gradient-to-r from-semi-dark rounded-[15px] items-center border border-bright border-opacity-20">
        <div className="py-5 font-yara text-bright font-extrabold text-2xl ">
          STAKE YOUR OST
        </div>
        <div className="py-5">
          <form onSubmit={handlApproveAndStake}>
            <label className="flex flex-row items-center">
              <div>
                <input
                  ref={amountRef}
                  className="w-60 md:w-80 sm:w-80 h-16 bg-dark mr-2 rounded-xl bg-opacity-30 p-4 font-bold text-xl placeholder:text-dark z-0 text-white"
                  type="text"
                  placeholder="0.0"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <div className="flex w-11 rounded-md -ml-14 z-10 px-1 bg-dark bg-opacity-50">
                MAX
              </div>
            </label>

            <p className="text-xs mt-1">
              Your Balance:
              {data ? parseFloat(formatEther(data.value)).toFixed(3) : null}
            </p>
            <div className="flex flex-row justify-between mt-14 font-bold text-bright">
              <p>Staking APR</p>
              <p>10% per hr</p>
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
