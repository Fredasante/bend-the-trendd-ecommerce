import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeItemFromCart } from "@/redux/features/cart-slice";
import Image from "next/image";

interface SingleItemProps {
  item: {
    _id: string;
    name: string;
    discountPrice?: number;
    price: number;
    quantity: number;
    mainImageUrl?: string;
  };
}

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item._id));
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      {/* Product Image & Name */}
      <div className="min-w-[400px] flex items-center gap-5">
        <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-20">
          {item.mainImageUrl ? (
            <Image
              src={item.mainImageUrl}
              alt={item.name}
              width={80}
              height={80}
              className="object-cover rounded-[5px]"
            />
          ) : (
            <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-200 rounded">
              No Image
            </div>
          )}
        </div>

        <div>
          <h3 className="text-dark ease-out duration-200 hover:text-blue">
            {item.name}
          </h3>
        </div>
      </div>

      {/* Price */}
      <div className="min-w-[180px]">
        <p className="text-dark">${item.discountPrice ?? item.price}</p>
      </div>

      {/* Quantity */}
      <div className="min-w-[275px] flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-11.5 border border-gray-4 rounded-md">
          {item.quantity}
        </span>
      </div>

      {/* Total Price */}
      <div className="min-w-[200px]">
        <p className="text-dark">
          ${(item.discountPrice ?? item.price) * item.quantity}
        </p>
      </div>

      {/* Remove Button */}
      <div className="min-w-[50px] flex justify-end">
        <button
          onClick={handleRemoveFromCart}
          aria-label="Remove item from cart"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
