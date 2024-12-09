import { Breadcrumb, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Complaints() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: 'Khiếu nại',
          },
        ]}
        />
      <Divider></Divider>
      Complaints
    </div>
  )
}

export default Complaints