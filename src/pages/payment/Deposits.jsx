import { Breadcrumb, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Deposits() {
  return (
    <div>
            <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: 'Nạp tiền',
          },
        ]}
        />
      <Divider></Divider>
      Deposits
      </div>
  )
}

export default Deposits