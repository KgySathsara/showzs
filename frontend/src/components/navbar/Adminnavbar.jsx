import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  VideoCameraOutlined,
  CalendarOutlined,
  NotificationOutlined,
  MailOutlined,
} from '@ant-design/icons';
import logo from '../../assest/logo.png';
import './AdminNavBar.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavBar = () => {
  return (
    <Sider collapsible>
      <div className="logo">
        <img src={logo} alt='logo'/>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Movie Management">
          <SubMenu key="sub2" title="Movies List">
            <Menu.Item key="1">View Movies</Menu.Item>
            <Menu.Item key="2">Search/Filter Movies</Menu.Item>
            <Menu.Item key="3">Add New Movie</Menu.Item>
            <Menu.Item key="4">Edit Movie Details</Menu.Item>
            <Menu.Item key="5">Delete Movie</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title="Categories">
            <Menu.Item key="6">View All Categories</Menu.Item>
            <Menu.Item key="7">Add New Category</Menu.Item>
            <Menu.Item key="8">Edit Category</Menu.Item>
            <Menu.Item key="9">Delete Category</Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub4" icon={<CalendarOutlined />} title="Live Events Management">
          <SubMenu key="sub5" title="Events List">
            <Menu.Item key="10">View Event</Menu.Item>
            <Menu.Item key="11">Search/Filter Events</Menu.Item>
            <Menu.Item key="12">Add New Event</Menu.Item>
            <Menu.Item key="13">Edit Event Details</Menu.Item>
            <Menu.Item key="14">Delete Event</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" title="Categories">
            <Menu.Item key="15">View All Categories</Menu.Item>
            <Menu.Item key="16">Add New Category</Menu.Item>
            <Menu.Item key="17">Edit Category</Menu.Item>
            <Menu.Item key="18">Delete Category</Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub7" icon={<NotificationOutlined />} title="News Management">
          <SubMenu key="sub8" title="Movie News List">
            <Menu.Item key="19">View All Articles</Menu.Item>
            <Menu.Item key="20">Search/Filter Articles</Menu.Item>
            <Menu.Item key="21">Add New Article</Menu.Item>
            <Menu.Item key="22">Edit Article</Menu.Item>
            <Menu.Item key="23">Delete Article</Menu.Item>
          </SubMenu>
          <SubMenu key="sub9" title="Categories">
            <Menu.Item key="24">View All Categories</Menu.Item>
            <Menu.Item key="25">Add New Category</Menu.Item>
            <Menu.Item key="26">Edit Category</Menu.Item>
            <Menu.Item key="27">Delete Category</Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub10" icon={<MailOutlined />} title="Contact Us">
          <SubMenu key="sub11" title="Messages">
            <Menu.Item key="28">View All Messages</Menu.Item>
            <Menu.Item key="29">Search/Filter Messages</Menu.Item>
            <Menu.Item key="30">Respond to Message</Menu.Item>
            <Menu.Item key="31">Delete Message</Menu.Item>
          </SubMenu>
          <SubMenu key="sub12" title="FAQs">
            <Menu.Item key="32">View All FAQs</Menu.Item>
            <Menu.Item key="33">Add New FAQ</Menu.Item>
            <Menu.Item key="34">Edit FAQ</Menu.Item>
            <Menu.Item key="35">Delete FAQ</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default AdminNavBar;
