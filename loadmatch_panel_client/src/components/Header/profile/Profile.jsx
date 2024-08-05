import React, { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0); // Add key state

  const handleOpenChange = (open) => {
    setOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("authToken");
    setOpen(false); // Close the dropdown before navigating
    navigate("/"); // Navigate to home page after logout
    setKey(prevKey => prevKey + 1); // Increment key to force remount
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      key={key} // Add key to force re-mount
      overlay={menu}
      onOpenChange={handleOpenChange}
      open={open}
      trigger={['click']}
    >
      <Button shape="circle" icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default Profile;
