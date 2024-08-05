import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { updateLead } from "../../../../services/leadServices";

function WhatsappForm() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const agentDetail = JSON.parse(localStorage.getItem("agentDetail"));
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(agentDetail, token, `before sending Whatsapp message!`);

      const { contact, messageText } = values;
      const baseUrl = "https://loadmatch.in/";

      const encodedMessage =
        encodeURIComponent(`Hello Welcome ${messageText} to Loadmatch Lite App!
We have got information that you are planning to Travel
from here to there and you have respective load/space.
please visit our web application and fill necessary requirements on ${baseUrl} `);

      const whatsappUrl = `https://wa.me/${contact}?text=${encodedMessage}`;

      const leadData = {
        contact: contact,
        agentDetail: agentDetail,
        messageText: messageText,
        profile_status: "first_message",
      };
      const response = await updateLead(leadData, token);

      if (response.data.success) {
        console.log(response, `after sending Whatsapp message!`);
        message.success("Whatsapp Send!,Lead Updated successfully!");
        window.open(whatsappUrl, "_blank");
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
    <div className="w-full mt-10  flex justify-center items-center flex-col ">
      <div className="w-full h-[30px] bg-gray-300 mb-5 text-white flex justify-center items-center font-bold ">
        Step 2: Send WhatsApp Message
      </div>
      <Form
        className="w-[600px] border font-thin shadow-md p-5 rounded-md flex flex-col "
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
        <Form.Item
          label="Message"
          name="messageText"
          rules={[{ required: true, message: "Please input the message!" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item className=" shadow-md active:scale-95 self-end">
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default WhatsappForm;
