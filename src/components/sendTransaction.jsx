import { useBalance, useAccount, useWriteContract } from "wagmi";
import { abi } from "../contracts/Ostake.json";
import { holesky } from "wagmi/chains";

export function SendTransaction() {
  const { address } = useAccount();
  const bal = useBalance({
    address: "0x6D23E53ba11a026FF1CFF1bE81185325052020aa",
  });

  const { writeContractAsync } = useWriteContract();

  const faucet = async () => {
    const data = await writeContractAsync({
      abi: abi,
      address: "0x2cECa4BF0e4D43Ab267F92022f24d4551386BaE1",
      functionName: "faucet",
      chainId: holesky.id,
    });
  };

  return (
    <>
      <button
        onClick={faucet}
        className="border bg-semi-dark py-2 px-5 rounded-md"
      >
        claim faucet
      </button>
      <p>Address: {address}</p>
      {/* <p>Balance: {bal.data.value.toString()}</p> */}
    </>
  );
}
