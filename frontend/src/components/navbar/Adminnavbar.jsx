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
        <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard">
          <SubMenu key="sub2" title="Overview">
            <Menu.Item key="1">View Ongoing Movies</Menu.Item>
            <Menu.Item key="2">Total Live Events</Menu.Item>
            <Menu.Item key="3">Total News Articles</Menu.Item>
            <Menu.Item key="4">Total Users</Menu.Item>
            <Menu.Item key="5">Recent Activity</Menu.Item>
            <Menu.Item key="6">User Engagement</Menu.Item>
            <Menu.Item key="7">Movie Views</Menu.Item>
            <Menu.Item key="8">Event Participation</Menu.Item>
            <Menu.Item key="9">News Readership</Menu.Item>
          </SubMenu>
        </SubMenu>

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
          {/* <SubMenu key="sub7" title="Categories">
            <Menu.Item key="18">View All Categories</Menu.Item>
            <Menu.Item key="19">Add New Category</Menu.Item>
            <Menu.Item key="20">Edit Category</Menu.Item>
            <Menu.Item key="21">Delete Category</Menu.Item>
          </SubMenu> */}
        </SubMenu>

        <SubMenu key="sub8" icon={<NotificationOutlined />} title="News Management">
        <Menu.Item key="24">
          <Link to="/AdminAddNews">Add News</Link>
        </Menu.Item>
      </SubMenu>
        
        <SubMenu key="sub11" icon={<MailOutlined />} title="User Messages">
        <Menu.Item key="31">
          <Link to="/AdminContactUs">View Messages</Link>
        </Menu.Item>
      </SubMenu>

        <SubMenu key="sub14" icon={<AppstoreOutlined />} title="Additional Section">
          <SubMenu key="sub15" title="Users Management">
            <Menu.Item key="39">View All Users</Menu.Item>
            <Menu.Item key="40">Search/Filter Users</Menu.Item>
            <Menu.Item key="41">Add New User</Menu.Item>
            <Menu.Item key="42">Edit User Details</Menu.Item>
            <Menu.Item key="43">Delete User</Menu.Item>
            <Menu.Item key="44">Assign Roles & Permissions</Menu.Item>
          </SubMenu>
          <SubMenu key="sub16" title="Settings">
            <SubMenu key="sub17" title="General Settings">
              <Menu.Item key="45">Payment Settings</Menu.Item>
              <Menu.Item key="46">Email Settings</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub18" title="Analytics & Reports">
            <Menu.Item key="47">View Reports (Sales, User Activity, etc.)</Menu.Item>
            <Menu.Item key="48">Download Reports</Menu.Item>
          </SubMenu>
          <SubMenu key="sub19" title="Content Management">
            <SubMenu key="sub20" title="Banners & Advertisements">
              <Menu.Item key="49">View All Banners</Menu.Item>
              <Menu.Item key="50">Add New Banner</Menu.Item>
              <Menu.Item key="51">Edit Banner</Menu.Item>
              <Menu.Item key="52">Delete Banner</Menu.Item>
            </SubMenu>
            <SubMenu key="sub21" title="Pages">
              <Menu.Item key="53">View All Pages</Menu.Item>
              <Menu.Item key="54">Add New Page</Menu.Item>
              <Menu.Item key="55">Edit Page</Menu.Item>
              <Menu.Item key="56">Delete Page</Menu.Item>
            </SubMenu>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default AdminNavBar;
