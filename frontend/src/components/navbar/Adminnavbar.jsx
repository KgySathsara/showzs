import React, { useState } from 'react';
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
import { useSwipeable } from 'react-swipeable';
import logo from '../../assest/logo.png';
import './AdminNavBar.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleSwipe = (eventData) => {
    if (eventData.dir === 'Right') {
      setCollapsed(false);
    } else if (eventData.dir === 'Left') {
      setCollapsed(true);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe({ dir: 'Left' }),
    onSwipedRight: () => handleSwipe({ dir: 'Right' }),
  });

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)} {...swipeHandlers}>
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
          <Menu.Item key="14">
            <Link to="/AdminAddLiveEvents">Add Event</Link>
          </Menu.Item>
          <Menu.Item key="22">
            <Link to="/AdminStreamLiveEvents">Stream Management</Link>
          </Menu.Item>
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
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default AdminNavBar;
