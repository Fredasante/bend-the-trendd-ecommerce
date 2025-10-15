import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { removeItemFromCart } from "@/redux/features/cart-slice";
import { Trash2 } from "lucide-react";

type SingleItemProps = {
  item: {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    mainImageUrl?: string;
  };
};

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item._id));
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="w-full flex items-center gap-6">
        {/* Product Image */}
        <div className="flex items-center justify-center rounded-[10px] bg-gray-3 max-w-[90px] w-full h-22.5">
          {item.mainImageUrl ? (
            <Image
              src={item.mainImageUrl}
              alt={item.name}
              width={100}
              height={100}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-dark mb-1 ease-out duration-200 hover:text-blue">
            {item.name}
          </h3>
          <p className="text-custom-sm">
            Price: ₵{item.discountPrice ?? item.price}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemoveFromCart}
        aria-label="Remove product from cart"
        className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SingleItem;
