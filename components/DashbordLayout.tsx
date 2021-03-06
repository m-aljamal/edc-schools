import React, { useState } from "react";

import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from "antd";
import styled from "styled-components";
import { PoweroffOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
const { Header, Content, Sider } = Layout;

const DashStyle = styled.div`
  .logo {
    img {
      width: 100%;
      height: 100%;
    }
    height: auto;
    margin: 16px;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  .sider,
  .menu {
    background-color: var(--slide);
  }
  .ant-layout-sider-trigger {
    background-color: #1890ff;
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background: #23364a;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userinfo {
    display: flex;
    align-items: center;
  }
  .schoolname {
    color: var(--blue);
    font-weight: bold;
  }
  .user {
    margin-right: 5px;
  }
`;
const DashbordLayout = ({ pageContent, menuData, currentUser, userSchool }) => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item>الصفحة الشخصية</Menu.Item>
      <Menu.Item icon={<PoweroffOutlined />}>تسجيل الخروج</Menu.Item>
    </Menu>
  );

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <DashStyle>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="sider"
        >
          <div className="logo">
            <img
              src={
                "https://res.cloudinary.com/dqoung1wz/image/upload/v1613318355/websiteImage/footer-logo_ku2xch.png"
              }
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${router.query.key}`]}
            defaultOpenKeys={[`sub${router.query.sub}`]}
            className="menu"
          >
            {menuData}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            <div className="head">
              <p className="schoolname">{userSchool?.name}</p>
              <div className="userinfo">
                <p className="user">{currentUser?.name}</p>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Avatar
                    style={{
                      backgroundColor: "var(--blue)",
                      cursor: "pointer",
                    }}
                  >
                    {currentUser?.name[0]}
                  </Avatar>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: "50vh" }}
            >
              {pageContent}
            </div>
          </Content>
        </Layout>
      </Layout>
    </DashStyle>
  );
};

export default DashbordLayout;
