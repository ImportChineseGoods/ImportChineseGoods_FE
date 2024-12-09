import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography, InputNumber, Space, Table, Input, Image, notification, Flex, Divider } from 'antd';
import { deleteProductApi, updateProductApi } from '../../../api/productApi';
import AlertDelete from '../../../generals/components/components/alertDelete';
import { AuthContext } from '../../../generals/contexts/authcontext';
import { use } from 'react';
import { PauseOutlined } from '@ant-design/icons';
import { createOrderApi } from '../../../api/orderApi';
const { Link } = Typography;

const ProductShop = ({ data }) => {
  const { applicableRate } = useContext(AuthContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [commodityMoney, setCommodityMoney] = useState(0);
  const [purchaseFee, setPurchaseFee] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [note, setNote] = useState('');
  const [products, setProducts] = useState(
    data.products.map((product) => ({ ...product, key: product.id }))
  );

  const handleQuantityChange = (value, record) => {
    const updatedProducts = products.map((item) =>
      item.key === record.key ? { ...item, quantity: value } : item
    );
    setProducts(updatedProducts);
  };

  const handleNoteChange = (value, record) => {
    const updatedProducts = products.map((item) =>
      item.key === record.key ? { ...item, note: value.target.value } : item
    );
    setProducts(updatedProducts);
  };

  const handleSave = async (record) => {
    const productToUpdate = products.find((item) => item.key === record.key);
    const response = await updateProductApi(productToUpdate);
    if (response.status === 200) {
      notification.success({
        message: 'Lưu thành công',
        description: response?.RM || '',
      })
    } else {
      notification.error({
        message: 'Lưu thất bại',
        description: response?.RM || '',
      })
    }
  };

  const handleDelete = async (record) => {
    const productToDelete = products.find((item) => item.key === record.key);

    const response = await deleteProductApi(productToDelete);
    if (response.status === 200) {
      notification.success({
        message: 'Xóa thành công',
        description: response?.RM || '',
      });
      const newProducts = products.filter((item) => item.key !== record.key);
      setProducts(newProducts);
    } else {
      notification.error({
        message: 'Xóa thất bại',
        description: response?.RM || '',
      });
    }
  };

  const handleOrder = async () => {
    if (selectedRows.length === 0) {
      notification.error({
        message: 'Không có sản phẩm nào được chọn',
        description: 'Vui lòng chọn sản phẩm trước khi đặt hàng',   
      });
      return;
    }
    const data = {
      warehouse_id: 1,
      note: note,
      products: selectedRows,
    }
    const response = await createOrderApi(data);
    if (response.status === 200) {
      notification.success({
        message: 'Đặt hàng thành công',
        description: response?.RM || '',
      });
    } else {
      notification.error({
        message: 'Đặt hàng thất bại',
        description: response?.RM || '',
      });
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="productBox">
          <div>
            <Image width={80} height={80} src={record.image_url} />
          </div>
          <div>
            <Link href={record.link}>{record.name}</Link>
            <p>Thuộc tính: {record.description}</p>
            <Input
              placeholder="Ghi chú"
              defaultValue={record.note}
              onChange={(value) => handleNoteChange(value, record)}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          defaultValue={record.quantity}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: (price) => {
        const numericPrice = parseFloat(price) || 0;
        return (
          <div>
            <p>{numericPrice.toLocaleString('en-US')} ¥</p>
            <p>({(numericPrice * applicableRate).toLocaleString('vi-VN')} VNĐ)</p>
          </div>
        );
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'money',
      render: (_, record) => {
        const price = parseFloat(record.price) || 0;
        const total = price * record.quantity;
        return <div>
          <p>{total.toLocaleString('en-US')} ¥</p>
          <p>({(total * applicableRate).toLocaleString('vi-VN')} VNĐ)</p>
        </div>
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" style={{ display: 'flex', flexDirection: 'column' }} >
          <Button color="primary" variant="filled" onClick={() => handleSave(record)}>
            Lưu
          </Button>
          <Button color="danger" variant="filled" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const total = selectedRows.reduce((acc, curr) => {
      const price = parseFloat(curr.price) || 0;
      const total = price * curr.quantity;
      return acc + total;
    }, 0);
    const commodity = total * applicableRate;
    const purchase = Math.round(Math.max(commodity * 0.03, 10000));
    const totalMoney = commodity + purchase;
    setCommodityMoney(commodity);
    setPurchaseFee(purchase);
    setTotalMoney(totalMoney);
  }, [selectedRows]);


  return (
    <div>
      <Flex justify='space-around' align='center' className='shopOrder'>
        <Flex vertical gap="small">
        <Flex gap="middle" align='center'>
          <p>Đã chọn: {selectedRowKeys.length || 0}</p>
          <PauseOutlined />
          <p>Tiền hàng: {commodityMoney.toLocaleString('vi-VN')} VNĐ</p>
          <PauseOutlined />
          <p>Phí mua hàng: {purchaseFee.toLocaleString('vi-VN')} VNĐ</p>
          <PauseOutlined />
          <p>Tổng tiền tạm tính: {totalMoney.toLocaleString('vi-VN')} VNĐ</p>
        </Flex>
        <Input
              placeholder="Ghi chú"
              onChange={(value) => setNote(value.target.value)}
            />
        </Flex>
        
        <Button type="primary" size='large' onClick={handleOrder}>Đặt hàng</Button>
      </Flex>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        dataSource={products}
        bordered
        pagination={false}
        title={() => `${data.shop}`}
      />
      <Divider />
    </div>
  );
};

export default ProductShop;
