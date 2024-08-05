import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider/AuthProvider";
import { login } from "../../../../services/authServices";

const LoginTab = () => {
  const [form] = Form.useForm();
  const { setToken, setAgentDetail, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      console.log(response, `loginTab Res`);
      if (response.data.success) {
        setToken(response.data.token);
        setAgentDetail(response.data.agentDetail);
        setIsLoggedIn(true);
        message.success("Login successful");

        switch (response.data.agentDetail.role) {
          case "manager":
            console.log("manager Logged in");
            navigate("/dashboard/manager");
            break;
          case "ops":
            console.log("ops manager Logged in");

            navigate("/dashboard/ops");
            break;
          case "leads":
            console.log("leads manager Logged in");
            navigate("/dashboard/leads");
            break;
          case "admin":
            console.log("admin Logged in");
            navigate("/dashboard");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        message.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="flex flex-col justify-between h-[27rem]"
    >
      <div className="inputArea space-y-2">
        <div className="formInput">
          <label htmlFor="contact" className="block font-semibold pb-1">
            Contact:
          </label>
          <Form.Item
            name="contact"
            rules={[{ required: true, message: "Please enter your contact" }]}
          >
            <Input
              name="contact"
              placeholder="Enter your contact"
              className="shadow-md rounded-md h-12"
            />
          </Form.Item>
        </div>
        <div className="formInput">
          <label htmlFor="password" className="block font-semibold pb-1">
            Password:
          </label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password"
              className="shadow-md rounded-md h-12"
            />
          </Form.Item>
        </div>
      </div>

      <div className="actionArea text-center">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white px-4 rounded-lg transition-all"
          >
            Log in
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginTab;
