import { Breadcrumb, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Transactions() {
  return (
    <div>
            <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: 'Rút tiền',
          },
        ]}
        />
      <Divider></Divider>
      Transactions
      </div>
  )
}

export default Transactions