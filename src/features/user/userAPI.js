import { API_URL } from "../../api/config";
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders/own/`, {
        credentials: "include", // 🔑 REQUIRED
      });

      if (!response.ok) {
        const err = await response.text();
        return reject(err);
      }

      const data = await response.json();
      console.log(data);
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/users/own`, {
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

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/users/` + update.id, {
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
