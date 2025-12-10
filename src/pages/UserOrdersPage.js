import React from "react";
import UserOrders from "../features/user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <div className="">
      <h2 className="text-2xl  text-center mt-5 font-semibold leading-7 text-gray-900">
        My Orders
      </h2>{" "}
      <UserOrders></UserOrders>
    </div>
  );
};

export default UserOrdersPage;