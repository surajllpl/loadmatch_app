import axiosInstance from "./api";

export const getLoadSearchListings = async (
  fromCity,
  toCity,
  userId,
  token,
  page = 1,
  pageSize = 10
  
) => {
  try {
    const response = await axiosInstance.post(
      `/loads/search/${userId}`,
       
      {
        from_city: fromCity,
        to_city: toCity,
      },
      {
        params: {
          page: page,
          pageSize: pageSize,
        },
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      },
      
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search listings:", error);
    throw error;
  }
};

export const getLoadAllListings = async (page = 1, pageSize = 10, userId,token) => {
  try {
    const response = await axiosInstance.get(`/loads/searchall/${userId}`, 
       {
      params: {
        page: page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all listings:", error);
    throw error;
  }
};

export const getUserLoads = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/user/loads/${userId}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong while fetching user loads");
    }
  }
};

export const getLoadById = async (loadId,token) => {
  try {
    const response = await axiosInstance.get(`/load/${loadId}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching load by ID:", error);
    throw error;
  }
};