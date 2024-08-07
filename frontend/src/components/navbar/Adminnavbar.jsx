import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  VideoCameraOutlined,
  CalendarOutlined,
  NotificationOutlined,
  MailOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  SettingOutlined,
  ForwardOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import logo from '../../assest/logo.png';
import './AdminNavBar.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [role, setRole] = useState('');
  const [full_Name, setFullName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    const storedFullName = sessionStorage.getItem('fullName'); // Retrieve fullName from sessionStorage
    setRole(userRole);
    setFullName(storedFullName);
  }, []); // Empty dependency array means this effect runs once when the component mounts

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

  const handleSignOut = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)} {...swipeHandlers}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="sub1" icon={<DashboardOutlined />} title="Dashboard">
          <Link to="/Admin">Dashboard</Link>
        </Menu.Item>

        {(role === 'admin' || role === 'editor') && (
          <SubMenu key="sub3" icon={<VideoCameraOutlined />} title="Movie Management">
            <Menu.Item key="10"><Link to="/MovieProfile">Movie Profile</Link></Menu.Item>
            <Menu.Item key="11"><Link to="/ViewMovie">View/Update/Delete Movies</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/AddMovie">Add New Movie</Link></Menu.Item>
          </SubMenu>
        )}

        {(role === 'admin' || role === 'editor') && (
          <SubMenu key="sub5" icon={<CalendarOutlined />} title="Live Events Management">
            <Menu.Item key="50"><Link to="/LiveEventProfile">Live Event Profile</Link></Menu.Item>
            <Menu.Item key="14"><Link to="/AdminAddLiveEvents">Add Event</Link></Menu.Item>
            <Menu.Item key="22"><Link to="/AdminStreamLiveEvents">Stream Management</Link></Menu.Item>
          </SubMenu>
        )}

        {(role === 'admin' || role === 'contect_owner') && (
          <SubMenu key="sub8" icon={<NotificationOutlined />} title="News Management">
            <Menu.Item key="24">
              <Link to="/AdminAddNews">Add News</Link>
            </Menu.Item>
            <Menu.Item key="27">
              <Link to="/AdminEditNews">Edit/Delete News</Link>
            </Menu.Item>
          </SubMenu>
        )}

        {(role === 'admin' || role === 'contect_owner') && (
          <SubMenu key="sub9" icon={<ForwardOutlined />} title="Upcoming Movie Management">
            <Menu.Item key="25">
              <Link to="/AdminAddUpcomingMovie">Add Up-Comming Movies</Link>
            </Menu.Item>
            <Menu.Item key="26">
              <Link to="/AdminEditUpcomingMovie">Edit/Delete Up-Comming Movies</Link>
            </Menu.Item>
          </SubMenu>
        )}

        {(role === 'admin' || role === 'editor') && (
          <SubMenu key="sub11" icon={<MailOutlined />} title="User Messages">
            <Menu.Item key="31">
              <Link to="/AdminContactUs">View Messages</Link>
            </Menu.Item>
          </SubMenu>
        )}

        {role === 'admin' && (
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
        )}

        {role === 'admin' && (
          <SubMenu key="sub16" icon={<SettingOutlined />} title="Setting Section">
            <Menu.Item key="42">
              <Link to="/EditorAccount">Editor Account</Link>
            </Menu.Item>
            <SubMenu key="sub17" title="Password Reset">
              <Menu.Item key="43">
                <Link to="/PasswordManagement">Use Email</Link>
              </Menu.Item>
              <Menu.Item key="44">
                <Link to="/PhoneNumber">Use Phone Number</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
        )}
      </Menu>
      <div className="user-info" style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#fff' }}>Hello, {full_Name}</p> {/* Display fullName */}
        <Button type="primary" onClick={handleSignOut}>Sign Out</Button>
      </div>
    </Sider>
  );
};

export default AdminNavBar;
