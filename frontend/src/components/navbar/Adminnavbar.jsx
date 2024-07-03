import React from 'react';
import { Layout, Menu } from 'antd';
import {
  VideoCameraOutlined,
  CalendarOutlined,
  NotificationOutlined,
  MailOutlined,
  AppstoreOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assest/logo.png';
import './AdminNavBar.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavBar = () => {
  return (
    <Sider collapsible>
      <div className="logo">
        <img src={logo} alt='logo' />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

        <Menu.Item key="sub1" icon={<DashboardOutlined />} title="Dashboard">
          <Link to="/Admin">Dashboard</Link>
        </Menu.Item>


        <SubMenu key="sub3" icon={<VideoCameraOutlined />} title="Movie Management">
          <Menu.Item key="10"><Link to="/MovieProfile">Movie Profile</Link></Menu.Item>
          <Menu.Item key="11"><Link to="/ViewMovie">View/Update/Delete Movies</Link></Menu.Item>
          <Menu.Item key="12"><Link to="/AddMovie">Add New Movie</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub5" icon={<CalendarOutlined />} title="Live Events Management">
          <SubMenu key="sub6" title="Events List">
            <Menu.Item key="14">
              <Link to="/AdminAddLiveEvents">Add Event</Link>
            </Menu.Item>
            <Menu.Item key="15">
              <Link to="/AdminViewLiveEvents"> View Event</Link>
            </Menu.Item>
            <Menu.Item key="16">Edit Event Details</Menu.Item>
            <Menu.Item key="17">Delete Event</Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub8" icon={<NotificationOutlined />} title="News Management">
          <Menu.Item key="24">
            <Link to="/AdminAddNews">Add News</Link>
          </Menu.Item>
          <Menu.Item key="25">
            <Link to="/AdminAddUpcomingMovie">Add Up-Comming Movies</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub11" icon={<MailOutlined />} title="User Messages">
          <Menu.Item key="31">
            <Link to="/AdminContactUs">View Messages</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub14" icon={<AppstoreOutlined />} title="Additional Section">

            <Menu.Item key="39">
            <Link to="/UsersManagement">Users Management</Link>
            </Menu.Item>
              <SubMenu key="sub15" title="Payment Details">
                <Menu.Item key="40">
                  <Link to="/LiveEventPay">Live Events Payment</Link>
                </Menu.Item>
                <Menu.Item key="41">
                  <Link to="/MoviePay">Movie Payment</Link>
                </Menu.Item>
              </SubMenu>
//             <Menu.Item key="39">
//             <Link to="/UsersManagement">Users Management</Link>
//             </Menu.Item>
//             <Menu.Item key="45">Payment Details</Menu.Item>

        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default AdminNavBar;
