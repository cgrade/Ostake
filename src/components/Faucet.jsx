import { useWriteContract } from "wagmi";
import { tokenData } from "../context/context";
import { holesky } from "wagmi/chains";
import { toast } from "react-toastify";

export function Faucet() {
  const { writeContractAsync } = useWriteContract();

  const faucet = async () => {
    try {
      const data = await writeContractAsync({
        abi: tokenData.abi,
        address: tokenData.ca,
        functionName: "faucet",
        chainId: holesky.id,
      });
      toast.success("Claimed 20 OST tokens, come back again in 1hr");
    } catch (err) {
      toast.error(`Wait 1 hr before claiming again`);
    }
  };

  return (
    <>
      <button
        onClick={faucet}
        // className="border px-4 py-2 rounded-lg bg-semi-dark text-black opacity-55"
      >
        Faucet
      </button>
    </>
  );
}
