import Head from "next/head";
import { useState } from "react";
import { ethers } from "ethers";
import TxList from "./../components/TxList";

const createTransaction = async ({ setError, setTxs, ether, addr }) => {
  console.log(ether, addr);

  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.sendAsync("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Home() {
  const [error, setError] = useState();
  const [ether, setEther] = useState();
  const [txs, setTxs] = useState([]);

  const addr = "0xC0cc6807941Df9381Ac22F0272AAE10E01423d5e";

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setError();
    await createTransaction({
      setError,
      setTxs,
      ether,
      addr,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>send-eth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">ETH2me</h1>

        <p className="mt-3 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Clone this repo
        </p>

        <form onSubmit={handleSubmitPayment} className="m-4">
          <div className="flex flex-wrap  flex-col items-center justify-around max-w-4xl mt-6 sm:w-full ">
            <input
              type="text"
              className="border-solid border-4 border-light-blue-500 max-w-md my-3"
              placeholder="Amount in ETH"
              onChange={(e) => setEther(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-8 bg-red-300 rounded-full text-xl font-semibold"
            >
              Pay
            </button>
          </div>
        </form>
      </main>
      <TxList txs={txs} />

      {/* <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer> */}
    </div>
  );
}
