import NextLink from "next/link";
export default function TxList({ txs }) {
  //Add a test network or the mainnet
  const network = "https://rinkeby.etherscan.io/tx/";
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div
          key={item}
          className="truncate  mt-10  hover:bg-green-200 border border-green-600 rounded-xl"
        >
          <NextLink href={`${network}${item.hash}`}>
            <div className=" flex flex-col items-center mb-2 px-6 py-2   cursor-pointer truncate">
              <label className="text-green-600 font-bold cursor-pointer truncate">
                See your transaction
              </label>
              <p className="truncate text-green-600 font-medium cursor-pointer  ">
                {item.hash}
              </p>
            </div>
          </NextLink>
        </div>
      ))}
    </>
  );
}
