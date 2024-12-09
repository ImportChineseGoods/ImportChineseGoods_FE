import { Breadcrumb, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Withdraws() {
  return (
    <div>
            <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: 'Lịch sử giao dịch',
          },
        ]}
        />
      <Divider></Divider>
      Withdraws
      </div>
  )
}

export default Withdraws