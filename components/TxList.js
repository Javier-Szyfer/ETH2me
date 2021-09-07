import NextLink from "next/link";
export default function TxList({ txs }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div key={item} className=" mt-10 truncate ">
          <NextLink href={`https://rinkeby.etherscan.io/tx/${item.hash}`}>
            <div className=" flex flex-1 flex-col items-center mb-2 px-6 py-2 border border-green-600 rounded-xl cursor-pointer truncate overflow-ellipsis overflow-hidden">
              <label className="text-green-600 font-medium cursor-pointer  truncate">
                See your transaction
              </label>
              <p className="text-green-600 font-medium cursor-pointer truncate overflow-ellipsis overflow-hidden">
                {item.hash}
              </p>
            </div>
          </NextLink>
        </div>
      ))}
    </>
  );
}
