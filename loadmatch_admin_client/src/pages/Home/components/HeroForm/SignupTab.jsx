import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../services/authServices";
import { useAuth } from "../../../../context/AuthProvider/AuthProvider";
const { Option } = Select;

const SignupTab = () => {
  const [form] = Form.useForm();
  const { setToken, setAgentDetail, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await signUp(values);
      console.log(response, "signUp Tab Res");
      if (response.data.success) {
        setToken(response.data.token);
        setAgentDetail(response.data.data);
        setIsLoggedIn(true);
        message.success("Signup successful");

        switch (response.data.data.role) {
          case "manager":
            navigate("/dashboard");
            break;
          case "ops":
            navigate("/dashboard/ops");
            break;
          case "leads":
            navigate("/dashboard/leads");
            break;
          case "admin":
            navigate("/dashboard");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        message.error("Signup failed. Please check your details.");
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      message.error("Signup failed. Please try again later.");
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="flex flex-col justify-between h-[27rem]"
    >
      {/* Input fields for name, contact, password, and role */}
      <div className="inputArea space-y-2">
        <div className="formInput">
          <label htmlFor="name" className="block font-semibold pb-1">
            Name:
          </label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              name="name"
              placeholder="Enter your name"
              className="shadow-md rounded-md h-12"
            />
          </Form.Item>
        </div>
        <div className="formInput">
          <label htmlFor="contact" className="block font-semibold pb-1">
            Contact:
          </label>
          <Form.Item
            name="contact"
            rules={[
              { required: true, message: "Please enter your contact" },
              // Add more specific validation rules if needed (e.g., regex for phone number)
            ]}
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
            rules={[
              { required: true, message: "Please enter your password" },
              // Add more specific validation rules if needed (e.g., min length)
            ]}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password"
              className="shadow-md rounded-md h-12"
            />
          </Form.Item>
        </div>
        <div className="formInput">
          <label htmlFor="role" className="block font-semibold pb-1">
            Role:
          </label>
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              name="role"
              placeholder="Select a role"
              className="shadow-md rounded-md h-12"
            >
              <Option value="manager">Manager</Option>
              <Option value="ops">Ops Team</Option>
              <Option value="leads">Lead Team</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      {/* Action area with login link and signup button */}
      <div className="actionArea text-center">
        <p className="my-2 text-blue-600 text-sm cursor-pointer">
          Already have an account? <a href="/login">Log In</a>
        </p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white px-4 rounded-lg transition-all"
          >
            Sign Up
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SignupTab;
