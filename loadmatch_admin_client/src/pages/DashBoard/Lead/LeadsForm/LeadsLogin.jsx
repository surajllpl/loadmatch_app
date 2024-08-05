import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";

function LeadsLogin() {
  return (
    <div className="w-full mt-10  flex justify-center items-center flex-col ">
      <div className="w-full h-[30px] bg-gray-300 mb-5 text-white flex justify-center items-center font-bold ">
        Step 2: Convert Lead to User
      </div>
      <Form
        className="w-[600px] border font-thin shadow-md p-5 rounded-md flex flex-col "
        layout="vertical"
      >
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            { required: true, message: "Please input the contact number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className=" shadow-md active:scale-95 self-end">
          <Button type="primary" htmlType="submit">
            Send OTPLESS Approval
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LeadsLogin;
