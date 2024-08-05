import axiosInstance from "./api"; // Import your existing Axios instance

export const createEnquiry = async (enquiryData) => {
  try {
    console.log(enquiryData);
    const response = await axiosInstance.post("/enquiries/create", enquiryData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to create enquiry";
  }
};

export const getAllEnquiries = async (token) => {
  try {
    // console.log(token)
    const response = await axiosInstance.get("/enquiries", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch enquiries";
  }
};

export const getEnquiriesByUserId = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/enquiries/user/${userId}`, {
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
      throw new Error("Something went wrong while fetching user Enquiries");
    }
  }
};
export const modifyEnquiryStatus = async (enquiryId, token) => {
  try {
    const response = await axiosInstance.put(
      `/enquiries/${enquiryId}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong while Modifying Enquiry");
    }
  }
};
