import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";

const OrderSuccessPage = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetOrder());
  }, [dispatch, user]);
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}

      <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-400">
            Order Successfully placed
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            You can check your order in My Accound > My Orders{" "}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccessPage;
