import axiosInstancePanel from "./axiosInstance";

export const signUp = async (values) => {
  try {
    const response = await axiosInstancePanel.post("/admin/signup", {
      name: values.name,
      contact: values.contact,
      password: values.password,
      role: values.role,
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(err, `Something went wrong!`);
    console.log(err.message);
  }
};

export const login = async (values) => {
  try {
    const response = await axiosInstancePanel.post("/admin/login", {
      contact: values.contact,
      password: values.password,
    });
    console.log(response);

    return response;
  } catch (err) {
    console.error(err, `Something went wrong!`);
    console.log(err);
  }
};
