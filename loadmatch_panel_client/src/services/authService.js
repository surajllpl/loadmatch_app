import axiosInstance from "./api";

export const signIn = async (token) => {
  try {
    const response = await axiosInstance.post(`/verify-user`, {
      token,
    });

    if (response.status === 201) {
      const data = response.data;
      console.log("user service", data);

      localStorage.setItem("authToken", data.authToken);
      localStorage.setItem("userDetails", JSON.stringify(data.user));
      return data;
    } else {
      throw new Error("Failed to sign up");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_DOCKER_API_URL}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.auth);
      localStorage.setItem("userDetails", JSON.stringify(data.user));
      return data;
    } else {
      throw new Error("Failed to sign up");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const logIn = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_DOCKER_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.auth);
      localStorage.setItem("userDetails", JSON.stringify(data.user));
      return data;
    } else {
      throw new Error("Failed to log in");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logOut = () => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_DOCKER_API_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      console.error("Failed to fetch user data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export const getAuthTokenFromCookie = () => {
  try {
    const name = "authToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching authToken from cookies:", error);
    return null;
  }
};
