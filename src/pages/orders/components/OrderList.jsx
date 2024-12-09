import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Typography, Image, Space, Flex } from 'antd';
import statusTagMapping from '@components/components/tag';
import { useNavigate } from 'react-router-dom';
const { Text, Link } = Typography;

const OrdersList = ({ data, total, loading, page, pageSize, onPageChange }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(
    data.map((order, index) => ({ ...order, key: index + 1 }))
  );
  useEffect(() => {
    setOrders(
      data.map((order, index) => ({ ...order, key: index + 1 }))
    );
  }, [data]);

  const handleCancel = async (record) => {
    // const orderToDelete = orders.find((item) => item.key === record.key);

    // const response = await deleteOrderApi(orderToDelete);
    // if (response.status === 200) {
    //   notification.success({
    //     message: 'Xóa thành công',
    //     description: response?.RM || '',
    //   });
    //   const newOrders = orders.filter((item) => item.key !== record.key);
    //   setOrders(newOrders);
    // } else {
    //   notification.error({
    //     message: 'Xóa thất bại',
    //     description: response?.RM || '',
    //   });
    // }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
      render: (text, record) => {
        page = page || 1;
        pageSize = pageSize || 1000;
        return (page - 1) * pageSize + record.key;
      },
      width: '4%'
    },

    {
      title: 'Ảnh',
      dataIndex: 'products',
      render: (products) => {
        return <Image width={80} height={80} src={products[0].image_url} />
      },
      width: '100px'
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
    },
    {
      title: 'Mã vận đơn',
      dataIndex: 'bol',
      render: (bol) => bol?.bol_code,
    },
    {
      title: 'Thông tin tài chính',
      render: (_, record) => {
        const amount_paid = record.amount_paid === null ? 0 : parseInt(record?.amount_paid).toLocaleString('vi-VN');
        return (
          <Flex justify='space-between'>
            <Flex vertical>
              <p>Tổng đơn:</p>
              <Text type="success">Đã thanh toán:</Text>
              <Text type="danger">Còn nợ:</Text>
            </Flex>
            <Flex vertical justify='flex-end' style={{textAlign: 'end'}}>
              <Text>{record.total_amount.toLocaleString('vi-VN')} VNĐ</Text>
              <Text type="success">{amount_paid} VNĐ</Text>
              <Text type="danger">{parseInt(record.outstanding_amount).toLocaleString('vi-VN') || record.total_amount - amount_paid} VNĐ</Text>
            </Flex>
          </Flex>
        );
      }
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      // width: '30%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => {
        const StatusTag = statusTagMapping[status];
        return StatusTag ? <StatusTag /> : null;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => {
        const visibleStatus = ['waiting_deposit', 'deposited']
        const visible = visibleStatus.includes(record.status);
        return (
          <Space size="middle">
            <Button color="primary" variant="filled" onClick={() => navigate(`/orders/${record.id}`)}>
              Xem
            </Button>

            {visible && (
              <Button color="danger" variant="filled" onClick={() => handleCancel(record)}>
                Hủy
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      bordered
      pagination={{
        current: page,
        pageSize: pageSize || 1000,
        total: total,
        onChange: (newPage, newPageSize) => onPageChange(newPage, newPageSize),
      }}
      loading={loading}
    />
  );
};

export default OrdersList;
