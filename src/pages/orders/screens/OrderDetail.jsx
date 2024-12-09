import { Breadcrumb, Divider, Flex, notification, Timeline } from 'antd';
import React, { useEffect, useState } from 'react'

import { use } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { getOrderByIdApi } from '../../../api/orderApi';
import statusTagMapping from '../../../generals/components/components/tag';
import formatDate from '../../../generals/helpers/formatDate';

function OrderDetail() {
  const { order_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const response = await getOrderByIdApi(order_id);
      if (response.status === 200) {
        setOrder(response.order);

        setHistories(order.histories.map((history) => {
          const StatusTag = statusTagMapping[history.status];
          return {
            label: `${formatDate(history.create_at)} ${history?.employee ? `by ${history.employee}` : ''}`,
            children: <StatusTag />
          }
        }))

      } else {
        notification.error({
          message: 'Lỗi khi lấy dữ liệu',
          description: response?.RM || 'Vui lòng thử lại.',
        });
      }
      setLoading(false);
    };
    fetchOrder();
  }, [])

  console.log(histories);

  const res = {
    "status": 200,
    "RC": "0045",
    "RM": "Lấy dữ liệu thành công",
    "order": {
      "id": "DH0001",
      "applicable_rate": "3690",
      "original_rate": "3590",
      "status": "waiting_deposit",
      "commodity_money": "9.00",
      "customer_id": "A0001",
      "china_shipping_fee": "0.00",
      "purchase_fee": "10000",
      "shipping_fee": "0",
      "incurred_fee": "0",
      "number_of_product": 2,
      "weight": "0.00",
      "weight_fee": "27000",
      "original_weight_fee": "22000",
      "counting_fee": "0",
      "purchase_discount": "0.00",
      "shipping_discount": "0.00",
      "packing_fee": "0.00",
      "total_amount": "43210",
      "amount_paid": null,
      "outstanding_amount": "43210",
      "actual_payment_amount": null,
      "negotiable_money": null,
      "contract_code": null,
      "note": "This is a test order.",
      "warehouse_id": 1,
      "delivery_id": null,
      "create_at": "2024-12-07T15:32:31.000Z",
      "update_at": "2024-12-07T15:32:31.000Z",
      "products": [
        {
          "id": 39,
          "name": "sp 7",
          "description": "4",
          "link": "http://localhost:5173/cart",
          "note": "yhg",
          "quantity": 1,
          "price": "4.50",
          "image_url": "https://res.cloudinary.com/dyqpebht7/image/upload/v1733585435/phqkyzeogojq4x2wleya.png",
          "shop": "shop 2",
          "customer_id": "A0001",
          "order_id": "DH0001",
          "create_at": "2024-12-07T15:30:35.000Z",
          "update_at": "2024-12-07T15:32:31.000Z"
        },
        {
          "id": 40,
          "name": "sp 6",
          "description": "4",
          "link": "http://localhost:5173/cart",
          "note": "yhg",
          "quantity": 1,
          "price": "4.50",
          "image_url": null,
          "shop": "shop 2",
          "customer_id": "A0001",
          "order_id": "DH0001",
          "create_at": "2024-12-07T15:30:45.000Z",
          "update_at": "2024-12-07T15:32:31.000Z"
        }
      ],
      "bol": null,
      "histories": [
        {
          "id": 6,
          "order_id": "DH0001",
          "consignment_id": null,
          "delivery_id": null,
          "employee_id": null,
          "complaint_id": null,
          "anonymous_id": null,
          "status": "waiting_deposit",
          "create_at": "2024-12-07T15:32:31.000Z",
          "update_at": "2024-12-07T15:32:31.000Z"
        }
      ]
    }
  }
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: <Link to="/orders">Đơn đặt hàng</Link>,
          },
          {
            title: order_id
          }
        ]}
      />
      <Divider />
      <Flex gap='20px'>
        <Flex className='orderInfoBox'>
          <h2>Thông tin đơn hàng</h2>
        </Flex>
        <Flex style={{ width: '500px' }}>
          <Timeline
            mode='right'
            items={histories}
            style={{ width: '100%', padding: '20px 0' }}
          />
        </Flex>


      </Flex>
    </div>
  )
}

export default OrderDetail