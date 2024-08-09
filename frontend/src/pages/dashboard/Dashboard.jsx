import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../context/api/userApi";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data } = useGetProfileQuery();
  console.log(data);

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
          items={[
            {
              key: "1",
              icon: (
                <NavLink to={"adminBlog"}>
                  <UserOutlined />
                </NavLink>
              ),
              label: "Manage Blogs",
            },
            {
              key: "2",
              icon: (
                <NavLink to={"createBlog"}>
                  <VideoCameraOutlined />
                </NavLink>
              ),
              label: "Creatte Blogs",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
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
