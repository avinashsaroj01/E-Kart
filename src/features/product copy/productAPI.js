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

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        credentials: "include", // 🔑 REQUIRED
        body: JSON.stringify(product),
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

export function updateProduct(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/products/` + update.id, {
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
