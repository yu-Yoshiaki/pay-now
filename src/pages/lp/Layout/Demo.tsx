/* eslint-disable jsx-a11y/alt-text */
import type { CustomNextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";

type Props = {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export const Demo: CustomNextPage<Props> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [hasPurchased, setPurchased] = useState(false);

  const handleOnCheckout = useCallback(() => {
    setOpen(true);
    setPurchased(true);
  }, []);

  const handleOnBackPage = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOnCancel = useCallback(() => {
    setOpen(false);
    setPurchased(false);
  }, []);

  const Purchasedwindow = () => {
    return (
      <div className="p-3 w-60 text-white bg-green-700 rounded-md">
        <div className="flex items-center">
          <Image src="/check.png" width={30} height={30} />
          <p className="font-bold">購入済み！</p>
        </div>
        <p className="text-xs text-left whitespace-normal">
          <strong className="text-sm">4:36</strong> 決済完了まで商品の追加、編集、キャンセルが可能です。
        </p>
        <CancelButton />
      </div>
    );
  };

  const ConfirmCeckout = () => {
    return (
      <div className="fixed top-0 left-0 z-10 p-4 space-y-4 w-full h-full bg-green-50 md:absolute">
        <button onClick={handleOnBackPage}>✖︎</button>
        <div className="mx-auto space-y-4 w-full">
          <h3 className="py-5 px-2 rounded-md ring-1 ring-gray-300">
            <p className="pb-4 text-xl font-bold">ご購入ありがとうございます。</p>
            <p className="overflow-hidden text-xs text-left">
              <strong>チケット購入履歴(※)</strong> の方で、チケットのご確認ができます。
              ご利用の際は、上記(※)から該当のチケットをお見せください。
            </p>
          </h3>

          <div className="flex p-4 space-x-2 text-white bg-green-700 rounded-md">
            <p className="text-xl font-bold">5:00</p>
            <p className="overflow-hidden text-xs text-left">決済確定までの時間です。</p>
          </div>

          <CancelButton />
        </div>
      </div>
    );
  };

  const CancelButton = () => {
    return (
      <button className="text-blue-400" onClick={handleOnCancel}>
        Cancel
      </button>
    );
  };

  return (
    <div className="inline-block relative p-4 w-[318px] bg-white rounded-md shadow-xl">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg">{props.item.name}</h3>
        <p className="py-1 px-2 text-sm text-center bg-gray-300 rounded-3xl">Demo</p>
      </div>

      <Image src={props.item.image} alt={"腕時計"} width={280} height={300} />
      <div className="p-2">
        <p className="text-lg">1-click checkout の購入体験</p>
        <p className="text-sm text-red-500">※実際には決済されません</p>
      </div>
      {!hasPurchased ? (
        <button className="p-3 w-full h-12 text-white bg-green-500 rounded-md" onClick={handleOnCheckout}>
          Pay Now / {props.item.price}JPY
        </button>
      ) : (
        <div className="p-3 w-full h-12 text-center text-white bg-black rounded-md">追加購入</div>
      )}
      {hasPurchased && (
        <div className="absolute -right-3 bottom-36">
          <Purchasedwindow />
        </div>
      )}
      {isOpen && <ConfirmCeckout />}
    </div>
  );
};