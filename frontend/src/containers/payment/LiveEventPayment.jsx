import React, { useState } from 'react';
import { Table, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './liveEventPayment.css';

const { Search } = Input;

const columns = [
  {
    title: 'User Name',
    dataIndex: 'name',
    responsive: ['xs', 'sm', 'md', 'lg'],
  },
  {
    title: 'Mobile Number',
    dataIndex: 'number',
    responsive: ['xs', 'sm', 'md', 'lg'],
    sorter: {
      compare: (a, b) => a.number - b.number,
      multiple: 3,
    },
  },
  {
    title: 'Paid Amounts',
    dataIndex: 'amount',
    responsive: ['xs', 'sm', 'md', 'lg'],
    sorter: {
      compare: (a, b) => a.amount - b.amount,
      multiple: 2,
    },
  },
  {
    title: 'Event Name',
    dataIndex: 'event',
    responsive: ['xs', 'sm', 'md', 'lg'],
    sorter: {
      compare: (a, b) => a.event - b.event,
      multiple: 1,
    },
  },
  {
    title: 'Date & Time',
    dataIndex: 'date',
    responsive: ['xs', 'sm', 'md', 'lg'],
    sorter: {
      compare: (a, b) => a.date - b.date,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    number: '0778735281',
    amount: 'LKR200.00',
    event: 'Live Drama',
    date: '2024-07-12',
  },
  {
    key: '2',
    name: 'Jim Green',
    number: '0778735281',
    amount: 'LKR200.00',
    event: 'Sarigama Sajjaya',
    date: '2024-07-12',
  },
  {
    key: '3',
    name: 'Joe Black',
    number: '0778735281',
    amount: 'LKR200.00',
    event: 'Robin Hood',
    date: '2024-07-12',
  },
  {
    key: '4',
    name: 'Jim Red',
    number: '0778735281',
    amount: 'LKR200.00',
    event: 'LPL Live Stream',
    date: '2024-07-12',
  },
];

const LiveEventPayment = () => {
  const [searchText, setSearchText] = useState('');

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = searchText
    ? data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.number.includes(searchText) ||
        item.amount.includes(searchText) ||
        item.event.toLowerCase().includes(searchText.toLowerCase()) ||
        item.date.includes(searchText)
      )
    : data;

  return (
    <div className='live-event-payment-container'>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={20} lg={16}>
          <Search
            placeholder="Search..."
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={onSearch}
            style={{ marginBottom: 16 }}
          />
          <Table 
            columns={columns} 
            dataSource={filteredData} 
            onChange={onChange} 
            scroll={{ x: 800 }} 
          />
        </Col>
      </Row>
    </div>
  );
};

export default LiveEventPayment;
