import axiosInstance from "./api";

export const getSpaceSearchListing = async (fromCity, toCity, userId,token,page = 1,pageSize = 10) => {
  try {
    const response = await axiosInstance.post(`/spaces/search/${userId}`, {
      from_city: fromCity,
      to_city: toCity,
    },{
      params: {
        page: page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    },);

    return response.data;
  } catch (error) {
    console.error("Error fetching search spaces:", error);
    throw error;
  }
};
export const getSpaceAllListings = async (userId,token, page = 1, pageSize = 10) => {
  try {
    const response = await axiosInstance.get(`/spaces/searchall/${userId}`, {
      params: {
        page: page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching space listings:", error);
    throw error;
  }
};

export const getUserSpaces = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/user/spaces/${userId}`, {
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
      throw new Error("Something went wrong while fetching user spaces");
    }
  }
};

export const getSpaceById = async (spaceId,token) => {
  try {
    const response = await axiosInstance.get(`/space/${spaceId}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching space by ID:", error);
    throw error;
  }
};