import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { createLead } from "../../../../services/leadServices";

const { Option } = Select;

const LeadsGen = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const agentDetail = JSON.parse(localStorage.getItem("agentDetail"));
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(agentDetail, token, `before call lead created form`);

      const leadData = {
        ...values,
        profile_status: "first_lead",
        created_by: agentDetail.agent_id,
      };

      const response = await createLead(leadData, token);
      console.log(response, `responseGenerateLead`);

      if (response.data.success) {
        console.log(response, `after call lead created form`);
        message.success("Lead created successfully!");
      } else {
        message.error("Error Creating Lead!");
      }
      form.resetFields();
    } catch (error) {
      console.error("Error creating lead:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <div className="w-full h-[30px] bg-gray-300 mb-5 text-white flex justify-center items-center font-bold ">
        Step 1: Create a Lead
      </div>
      <Form
        className="w-[600px] border font-thin shadow-md p-5 rounded-md flex flex-col "
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h1 className="text-center font-thin text-xl uppercase mx-2 mb-5 ">
          Lead Generation Form
        </h1>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            { required: true, message: "Please input the contact number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Reference Group"
          name="reference_group"
          rules={[
            { required: true, message: "Please input the reference group!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item className=" shadow-md active:scale-95 self-end">
          <Button type="primary" htmlType="submit">
            Create Lead
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LeadsGen;
