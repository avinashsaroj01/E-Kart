import { API_URL } from "../../api/config";
export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/products/` + id, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      console.log("try block running......")
      const response = await fetch(`${API_URL}/products?` + queryString, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      console.log(response.headers);
      const totalItems = response.headers.get("X-Total-Count");

      resolve({
        data: { products: data, totalItems: + totalItems },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/brands`, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}
