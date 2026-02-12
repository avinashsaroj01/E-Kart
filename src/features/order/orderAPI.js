import { API_URL } from "../../api/config";
export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        credentials: "include", // 🔑 REQUIRED
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
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

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders/` + order.id, {
        method: "PATCH",
        credentials: "include", // 🔑 REQUIRED
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
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

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders?` + queryString, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      const totalOrders = response.headers.get("X-Total-Count");

      resolve({ data: { orders: data, totalOrders: +totalOrders } });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchOrdersByPagination(sort, pagination) {
  let queryString = "";

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders?` + queryString, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      const totalItems = response.headers.get("X-Total-Count");

      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (err) {
      reject(err);
    }
  });
}
