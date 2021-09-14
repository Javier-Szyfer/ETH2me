import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import { ethers } from "ethers";
import { GrGithub } from "react-icons/gr";
import TxList from "./../components/TxList";

const createTransaction = async ({
  setError,
  setLoading,
  setEther,
  setTxs,
  ether,
  addr,
}) => {
  console.log(ether, addr);

  try {
    if (!window.ethereum) {
      setLoading(false);
      throw new Error("No crypto wallet found. Please install it.");
    }
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    setTxs([tx]);
    setLoading(false);
    setEther("");
    console.log("success");
  } catch (err) {
    setLoading(false);
    setError(err.message);
  }
};

export default function Home({ data }) {
  //State
  const [ether, setEther] = useState("0.01");
  const [txs, setTxs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //fetching from https://www.coingecko.com/
  const currentETHPriceInUSD = data.market_data.current_price.usd;
  //enter the address in which you want to receive ETH
  const addr = "0xC0cc6807941Df9381Ac22F0272AAE10E01423d5e";
  //helper function
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setError("");
    if (!ether || ether == "0") {
      setError("Please enter an amount");
      return;
    }
    setLoading(true);
    await createTransaction({
      setError,
      setLoading,
      setEther,
      setTxs,
      ether,
      addr,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Head>
        <title>ETH2me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="p-4 bg-green-100 flex w-full xs:flex-col justify-between items-center">
        <div className="px-4 py-1 border border-green-600  rounded-lg">
          <p className="text-green-600 font-bold text-sm ">
            ETH &rarr; {formatter.format(currentETHPriceInUSD)}
          </p>
        </div>

        <NextLink href="https://github.com/Javier-Szyfer/ETH2me">
          <div className="px-4 py-1 flex items-center">
            <p className="text-green-600 font-medium text-sm mr-2 cursor-pointer hidden sm:block">
              Find the code{" "}
            </p>
            <GrGithub className="w-6 h-6 fill-current text-green-600 cursor-pointer" />
          </div>
        </NextLink>
      </nav>

      <main className="flex flex-col flex-1 items-center justify-center w-full bg-green-100 h-full ">
        <div className="max-w-xs mx-auto  border border-green-600 rounded-xl shadow-2xl overflow-hidden flex flex-col  justify-center text-center px-6 py-8 ">
          <form onSubmit={handleSubmitPayment}>
            <div className="flex flex-wrap flex-col justify-around  mt-2 ">
              <p className="block text-green-600 text-lg font-medium text-left tracking-tight max-w-screen-xs  ">
                If you like my work, <br /> please consider sending me a tip
              </p>
              <div className="flex flex-row flex-initial  max-w-xs  mt-4 mb-4 items-center justify-center">
                <input
                  type="number"
                  step="any"
                  value={ether}
                  className=" text-right text-2xl font-bold mr-2 appearance-none border border-green-600 bg-green-100 rounded-xl w-full py-2 px-3 text-green-600 leading-tight focus:outline-none foucs:appearance-none 
                active:appearance-none hover:appearance-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                  onChange={(e) => {
                    setError(""), setEther(e.target.value);
                  }}
                />
                <div className="text-green-600 text-4xl font-medium tracking-tight">
                  ETH
                </div>
              </div>
              <div className="flex flex-row flex-initial  max-w-xs   mb-4 items-center justify-center">
                <p className="text-sm text-green-600 font-medium mr-2 ">
                  {ether && "USD"}
                </p>
                <p className="text-sm text-green-600 font-medium ">
                  {ether ? formatter.format(ether * currentETHPriceInUSD) : ""}
                </p>
              </div>
              <button
                type="submit"
                disabled={loading ? true : false}
                className={`${
                  loading && "cursor-not-allowed disabled:opacity-50"
                }
                py-2 px-6  bg-green-600 text-green-100
                 rounded-xl text-md font-bold hover:bg-green-700 active:bg-green-700 hover:text-white`}
              >
                Transfer
              </button>
            </div>
          </form>
        </div>
        {error && (
          <p className="text-red-400 text-sm font-medium mt-4">{error}</p>
        )}
        {loading && (
          <>
            <p className="text-green-600 font-semibold text-sm mt-8">
              Processing Payment...
            </p>
            <div className="flex items-center justify-center space-x-2 animate-bounce mt-4">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </>
        )}
        <TxList txs={txs} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/ethereum");
  const data = await res.json();

  return { props: { data } };
}
