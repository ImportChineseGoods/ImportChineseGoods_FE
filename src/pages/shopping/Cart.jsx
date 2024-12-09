import React, { useEffect, useState } from 'react';
import ProductShop from './components/productShop';
import { getProductsApi } from '../../api/productApi';
import { Breadcrumb, Divider, notification } from 'antd';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [shopList, setShopList] = useState([]);
  useEffect(() => {
    getProductsApi()
      .then((res) => {
        if (res.status === 200) {
          setShopList(res.shops);
        } else {
          notification.error({
            message: 'Lấy thông tin thất bại',
            description: res?.RM ?? "error"
          });
        }
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Lấy thông tin thất bại',
          description: err?.RM ?? "error"
        });
      });
  }, []);
  return (
    <div >
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: 'Giỏ hàng',
          },
        ]}
      />
      <Divider></Divider>

      <div className='shopList'>
        {shopList.map((shop) => (
          <ProductShop data={shop} key={shop.shop} />
        ))}
      </div>
    </div>
  );
};
export default Cart;