import React from 'react';
import { Form, Input, Button } from 'antd';
import './LiveViewEvent.css';

export default function LiveViewEvent() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='live-view-event-container'>
      <div className='live-view-event'>
        <h2>Enter The Code Here !</h2>
        <Form
          name="codeForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="form-container"
        >
          <Form.Item
            name="code"
            rules={[{ required: true, message: 'Please input your code!' }]}
          >
            <Input placeholder='Paste the code here' className="code-input" />
          </Form.Item>
          <div className="button-group">
            <Button type="default" htmlType="button" className="cancel-button">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="ok-button">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
