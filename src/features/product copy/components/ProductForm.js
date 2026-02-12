import React, { useEffect, useState } from "react";
//  import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
//  import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "../../common/Modal";
import { useAlert } from "react-alert";
import {
  selectCategories,
  selectBrands,
  createProductAsync,
  fetchProductByIdAsync,
  selectProductById,
  updateProductAsync,
  clearSelectedProduct,
} from "../productSlice";

import { useForm } from "react-hook-form";
import { loginUserAsync } from "../../auth/authSlice";
function ProductForm() {
  const params = useParams();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      console.log("Clearing selection......");
      dispatch(clearSelectedProduct());
    }
    console.log("products........" + JSON.stringify(selectedProduct));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("price", selectedProduct.price);
      setValue("stock", selectedProduct.stock);
      setValue("discountedPercentage", selectedProduct.discountedPercentage);
    }
  }, [dispatch, params.id, selectedProduct]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
        <div className="lg:col-span-5">
          <form
            className="bg-white px-5 py-12 mt-12 w-full"
            noValidate
            onSubmit={handleSubmit((data) => {
              const product = { ...data };
              product.images = [
                product.image1,
                product.image2,
                product.image3,
                product.thumbnail,
              ];
              product.rating = 0;
              delete product["image1"];
              delete product["image2"];
              delete product["image3"];
              console.log(product);

              if (params.id) {
                product.id = params.id;
                dispatch(updateProductAsync(product));
                reset();
              } else {
                dispatch(createProductAsync(product));
                reset();
              }
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Add New Product
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("title", {
                          required: "title is required",
                        })}
                        id="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors?.title && (
                        <p className="text-red-500">{errors?.name?.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        id="description"
                        {...register("description", {
                          required: "description is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Brand
                    </label>
                    <div className="mt-2">
                      <select
                        {...register("brand", {
                          required: "brand is required",
                        })}
                      >
                        <option value="">----Choose Brand-----</option>
                        {brands.map((brand) => (
                          <option value={brand.value}>{brand.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        {...register("category", {
                          required: "category is required",
                        })}
                      >
                        <option value="">----Choose Category-----</option>
                        {categories.map((category) => (
                          <option value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        id="price"
                        {...register("price", {
                          required: "price is required",
                          min: 0,
                          max: 100000,
                        })}
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Discount Percentage
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register("discountPercentage", {
                          required: "discountPercentage is required",
                          min: 0,
                        })}
                        id="stock"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.stock && (
                        <p className="text-red-500">{errors.discountPercentage.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Stock
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("stock", {
                          required: "stock is required",
                          min: 0,
                        })}
                        id="stock"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.stock && (
                        <p className="text-red-500">{errors.stock.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="thumbnail"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thumbnail
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("thumbnail", {
                          // required: "thumbnail is required",
                        })}
                        id="thumbnail"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.thumbnail && (
                        <p className="text-red-500">
                          {errors.thumbnail.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="image1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image1
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("image1", {
                          // required: "image1 is required",
                        })}
                        id="image1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.image1 && (
                        <p className="text-red-500">{errors.image1.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="image2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image2
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("image2", {
                          // required: "image2 is required",
                        })}
                        id="image2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.image2 && (
                        <p className="text-red-500">{errors.image2.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="image3"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image3
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("image3", {
                          // required: "image3 is required",
                        })}
                        id="image3"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.image3 && (
                        <p className="text-red-500">{errors.image3.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={(e) => reset()}
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                {selectedProduct && params.id && (
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
