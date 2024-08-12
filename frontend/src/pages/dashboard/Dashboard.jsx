import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../../context/api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data } = useGetProfileQuery();
  const handleLogout = () => {
    dispatch(logout());
  };
  const menuItems = [
    {
      key: "adminBlog",
      icon: (
        <NavLink to={"adminBlog"}>
          <UserOutlined />
        </NavLink>
      ),
      label: "Manage Blogs",
    },
    {
      key: "createBlog",
      icon: (
        <NavLink to={"createBlog"}>
          <VideoCameraOutlined />
        </NavLink>
      ),
      label: "Create Blogs",
    },
    ...(data?.payload?.role === "owner"
      ? [
          {
            key: "manageUsers",
            icon: (
              <NavLink to={"manageUsers"}>
                <VideoCameraOutlined />
              </NavLink>
            ),
            label: "Manage Users",
          },
          {
            key: "createUsers",
            icon: (
              <NavLink to={"createUsers"}>
                <VideoCameraOutlined />
              </NavLink>
            ),
            label: "Create Users",
          },
        ]
      : []),
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="fixed top-0 left-0 h-screen z-50 py-3"
      >
        <div className="demo-logo-vertical" />
        <h3 className="p-4 text-xl text-white">
          {data?.payload?.fname} {data?.payload?.lname}
        </h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={pathname.split("/").slice(-1)[0]}
          items={menuItems}
        />
      </Sider>
      <Layout className={`ml-${collapsed ? "20" : "200"} transition-all`}>
        <Header
          className="sticky top-0 z-40 bg-white shadow-md"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl w-16 h-16"
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="relative overflow-auto"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
