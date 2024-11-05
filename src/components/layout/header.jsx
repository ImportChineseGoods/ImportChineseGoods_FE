import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const items = [
        {
            label: <Link to="/">Homepage</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/inf">Giới thiệu</Link>,
            key: 'inf',
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/price-list">Bảng giá</Link>,
            key: 'price',
            icon: <MailOutlined />,
        },
        {
            label: 'Submenu',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to='/login'>Đăng nhập</Link>,
                    key: 'login',
                },
                {
                    label: <Link to='/'>Đăng xuất</Link>,
                    key: 'logout',
                },
            ],
        },
    ];

    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;