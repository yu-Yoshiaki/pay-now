/* eslint-disable react/jsx-handler-names */
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useCanPurchase } from "src/hooks/useCanPurchase";
import { useHasPurchased } from "src/hooks/useHasPurchased";

import { PurchasedWindow } from "./PurchasedWindow";

type Props = {
  id: string;
  name: string;
  images: string[];
  time: number;
  onClick: (id: string, image: string) => void;
};

export const MaterialsList = (props: Props) => {
  const router = useRouter();
  const { isAvail } = useCanPurchase();
  const { hasPurchased, setHasPurchased } = useHasPurchased(props.time);

  const handleClick = () => {
    props.onClick(props.id, props.images[0]);
    setHasPurchased(true);
  };

  return (
    <div className="relative p-4 mx-5 bg-white rounded-md border shadow-xl md:inline-block md:w-[318px]">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg truncate">{props.name}</h3>
        <p className="py-1 px-2 text-sm text-center bg-gray-300 rounded-3xl">Demo</p>
      </div>

      <Image src={props.images[0]} alt={props.name} width={280} height={300} />
      <p className="p-2 text-lg">1-click checkout の購入体験</p>

      {isAvail ? (
        <button onClick={handleClick} className="p-3 w-full h-12 text-white bg-green-500 rounded-md">
          Buy Now
        </button>
      ) : (
        <button
          onClick={() => {
            return router.push("/shop/login");
          }}
          className="p-3 w-full h-12 text-white bg-blue-500 rounded-md"
        >
          LOGIN
        </button>
      )}

      {hasPurchased && (
        <div className="absolute -right-3 bottom-36">
          <PurchasedWindow time={props.time} />
        </div>
      )}
    </div>
  );
};