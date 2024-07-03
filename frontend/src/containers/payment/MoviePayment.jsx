import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const columns = [
  {
    title: 'User Name',
    dataIndex: 'name',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'number',
    sorter: {
      compare: (a, b) => a.number - b.number,
      multiple: 3,
    },
  },
  {
    title: 'Paid Amounts',
    dataIndex: 'amount',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
      multiple: 2,
    },
  },
  {
    title: 'Event Name',
    dataIndex: 'event',
    sorter: {
      compare: (a, b) => a.event - b.event,
      multiple: 1,
    },
  },
  {
    title: 'Date & Time',
    dataIndex: 'date',
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
    event: 'LPL LIve Stream',
    date: '2024-07-12',
  },
];

const MoviePayment = () => {
  const [searchText, setSearchText] = useState('');

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = searchText ? data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.number.includes(searchText) ||
    item.amount.includes(searchText) ||
    item.event.toLowerCase().includes(searchText.toLowerCase()) ||
    item.date.includes(searchText)
  ) : data;

  return (
    <div>
      <Search
        placeholder="Search..."
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredData} onChange={onChange} />
    </div>
  );
};

export default MoviePayment;
