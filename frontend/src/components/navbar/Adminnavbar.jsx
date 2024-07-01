import React, { useState } from 'react';
import { Layout, Menu, Modal, Button, Form, Input, DatePicker } from 'antd';
import {
  DashboardOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  NotificationOutlined,
  MailOutlined,
} from '@ant-design/icons';
import logo from '../../assest/logo.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [formData, setFormData] = useState({});

  const showModal = (title) => {
    setModalTitle(title);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('Form data:', formData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderFormItems = () => {
    switch (modalTitle) {
      case 'Add New Movie':
      case 'Edit Movie Details':
        return (
          <>
            <Form.Item label="Title">
              <Input name="title" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Description">
              <Input name="description" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Release Date">
              <DatePicker name="releaseDate" onChange={(date, dateString) => handleInputChange({ target: { name: 'releaseDate', value: dateString } })} />
            </Form.Item>
          </>
        );
      case 'Add New Event':
      case 'Edit Event Details':
        return (
          <>
            <Form.Item label="Event Name">
              <Input name="eventName" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker name="date" onChange={(date, dateString) => handleInputChange({ target: { name: 'date', value: dateString } })} />
            </Form.Item>
            <Form.Item label="Location">
              <Input name="location" onChange={handleInputChange} />
            </Form.Item>
          </>
        );
      case 'Add New Article':
      case 'Edit Article':
        return (
          <>
            <Form.Item label="Title">
              <Input name="title" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Content">
              <Input.TextArea name="content" onChange={handleInputChange} />
            </Form.Item>
          </>
        );
      case 'Add New Category':
      case 'Edit Category':
        return (
          <>
            <Form.Item label="Category Name">
              <Input name="categoryName" onChange={handleInputChange} />
            </Form.Item>
          </>
        );
      case 'Add New FAQ':
      case 'Edit FAQ':
        return (
          <>
            <Form.Item label="Question">
              <Input name="question" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Answer">
              <Input.TextArea name="answer" onChange={handleInputChange} />
            </Form.Item>
          </>
        );
        case 'Delete Event':
        case 'Delete Category':
          return(
            <>
              <Form.Item label="">
                <Input name="" onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="">
                <Input name="" onChange={handleInputChange} />
              </Form.Item>
            </>
          );
        default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo">
          <img src={logo} alt="logo" />
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
            <SubMenu key="sub4" title="Movies List">
              <Menu.Item key="10">View Movies</Menu.Item>
              <Menu.Item key="11" onClick={() => showModal('Add New Movie')}>Add New Movie</Menu.Item>
              <Menu.Item key="12" onClick={() => showModal('Edit Movie Details')}>Edit Movie Details</Menu.Item>
              <Menu.Item key="13">Delete Movie</Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub5" icon={<CalendarOutlined />} title="Live Events Management">
            <SubMenu key="sub6" title="Events List">
              <Menu.Item key="14">View Event</Menu.Item>
              <Menu.Item key="15">Search/Filter Events</Menu.Item>
              <Menu.Item key="16" onClick={() => showModal('Add New Event')}>Add New Event</Menu.Item>
              <Menu.Item key="17" onClick={() => showModal('Edit Event Details')}>Edit Event Details</Menu.Item>
              <Menu.Item key="18" onClick={() => showModal('Delete Event')}>Delete Event</Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" title="Categories">
              <Menu.Item key="19">View All Categories</Menu.Item>
              <Menu.Item key="20" onClick={() => showModal('Add New Category')}>Add New Category</Menu.Item>
              <Menu.Item key="21" onClick={() => showModal('Edit Category')}>Edit Category</Menu.Item>
              <Menu.Item key="22" onClick={() => showModal('Delete Category')}>Delete Category</Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub8" icon={<NotificationOutlined />} title="News Management">
            <SubMenu key="sub9" title="Movie News List">
              <Menu.Item key="23">View All Articles</Menu.Item>
              <Menu.Item key="24">Search/Filter Articles</Menu.Item>
              <Menu.Item key="25" onClick={() => showModal('Add New Article')}>Add New Article</Menu.Item>
              <Menu.Item key="26" onClick={() => showModal('Edit Article')}>Edit Article</Menu.Item>
              <Menu.Item key="27">Delete Article</Menu.Item>
            </SubMenu>
            <SubMenu key="sub10" title="Categories">
              <Menu.Item key="28">View All Categories</Menu.Item>
              <Menu.Item key="29" onClick={() => showModal('Add New Category')}>Add New Category</Menu.Item>
              <Menu.Item key="30" onClick={() => showModal('Edit Category')}>Edit Category</Menu.Item>
              <Menu.Item key="31">Delete Category</Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub11" icon={<MailOutlined />} title="Contact Us">
            <SubMenu key="sub12" title="Messages">
              <Menu.Item key="32">View All Messages</Menu.Item>
              <Menu.Item key="33">Search/Filter Messages</Menu.Item>
              <Menu.Item key="34">Respond to Message</Menu.Item>
              <Menu.Item key="35">Delete Message</Menu.Item>
            </SubMenu>
            <SubMenu key="sub13" title="FAQs">
              <Menu.Item key="36">View All FAQs</Menu.Item>
              <Menu.Item key="37" onClick={() => showModal('Add New FAQ')}>Add New FAQ</Menu.Item>
              <Menu.Item key="38" onClick={() => showModal('Edit FAQ')}>Edit FAQ</Menu.Item>
              <Menu.Item key="39">Delete FAQ</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          Content goes here
        </div>
      </Layout>

      <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          {renderFormItems()}
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminNavBar;
