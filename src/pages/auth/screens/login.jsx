import { Button, Form, Input, notification } from 'antd';
import React, { useContext } from 'react';
import { loginCustomerApi } from '@api/customerApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@generals/contexts/authcontext'; // Import AuthContext

const LoginScreen = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext); // Lấy setAuth từ context

  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginCustomerApi(email, password);

    if (res?.status === 200) {
      // Lưu access_token và thông tin người dùng vào localStorage
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res?.user)); // Lưu thông tin user

      notification.success({
        message: 'Đăng nhập thành công',
        description: ''
      });

      // Cập nhật context
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email,
          name: res?.user?.name,
          id: res?.user?.id,
          avatar: res?.user?.avatar,
        }
      });

      // Điều hướng về trang home
      navigate('/');
    } else {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: res?.RM ?? "error"
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='center-div'>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Hãy nhập email của bạn',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Hãy nhập mật khẩu',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;
