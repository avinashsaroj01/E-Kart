import { API_URL } from "../../api/config";
export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        credentials: "include", // 🔑 REQUIRED
        body: JSON.stringify(item),
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

export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      console.log("cartItems:", data);
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart/` + update.id, {
        method: "PATCH",
        credentials: "include", // 🔑 REQUIRED
        body: JSON.stringify(update),
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

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart/` + itemId, {
        method: "DELETE",
        credentials: "include", // 🔑 REQUIRED
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      resolve({ data: { id: itemId } });
    } catch (err) {
      reject(err);
    }
  });
}

export function resetCart() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserId();
      const items = response.data;

      for (let item of items) {
        await deleteItemFromCart(item.id);
      }

      resolve({ status: "success" });
    } catch (err) {
      reject(err);
    }
  });
}
