import { API_URL } from "../../api/config";
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      if (response.ok) {
        const token = await response.text(); // 🔑 FIX
        resolve({ data: token });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/check`, {
        credentials: "include",
      });

      if (!response.ok) {
        reject("Unauthorized");
        return;
      }

      const data = await response.json(); // ✅ only when OK
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
  });
}

//sendResetPasswordOtp
export const sendResetPasswordOtp = async ({ email }) => {
  try {
    const response = await fetch(`${API_URL}/auth/send-reset-password-otp`, {
      method: "POST",
      credentials: "include", // 🔑 THIS sends cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
//ResetPassword
export const ResetPassword = async ({ email, otp, newPassword }) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      credentials: "include", // 🔑 THIS sends cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
