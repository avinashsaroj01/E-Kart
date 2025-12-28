import React, { useState, useEffect } from "react";
import {
  fetchAllOrdersAsync,
  fetchOrdersByPaginationAsync,
  selectTotalOrders,
  selectTotalItems,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice } from "../../../app/constants";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectTotalOrders);
  const totalItems = useSelector(selectTotalItems);
  const [editableById, setEditableById] = useState(-1);
  useEffect(() => {
    console.log("total orders......" + orders);
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  const handleView = () => {};

  const handleEdit = (order) => {
    setEditableById(order.id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableById(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-200 text-purple-600";
      case "Dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "Delivered":
        return "bg-green-200 text-green-600";
      case "Cancelled":
        return "bg-red-200 text-red-600";

      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order #id</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className=" border-b border-gray-200 hover:bg-gray-100">
                    <td className=" py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">{order.id}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                          </div>
                          <span>
                            {item.title}- # {item.id} - ${" "}
                            {discountedPrice(item)}{" "}
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-6 text-center">
                      $ {order.totalAmount}
                    </td>
                    <td className="  py-3 px-6 text-start">
                      <div>{order.selectedAddress.name}</div>
                      <div>{order.selectedAddress.email}</div>
                      <div>{order.selectedAddress.phone}</div>
                      <div>{order.selectedAddress.street}</div>
                      <div>{order.selectedAddress.city}</div>
                      <div>{order.selectedAddress.state}</div>
                      <div>{order.selectedAddress.pinCode}</div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id !== editableById ? (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      ) : (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="Pending">Pending</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex gap-3 item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon
                            className="scale-150"
                            onClick={(e) => handleView(order)}
                          />
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon
                            className="scale-150"
                            onClick={(e) => handleEdit(order)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
