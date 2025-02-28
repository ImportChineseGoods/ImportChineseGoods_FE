import React, { useEffect, useState } from 'react';
import { Typography, Table, Image } from 'antd';
import { formatUnit } from '@helpers/formatUnit';
const { Link } = Typography;

const Products = ({ data, applicable_rate }) => {
    const [products, setProducts] = useState(data.map((product) => ({ ...product, key: product.id })));

    useEffect(() => {
        setProducts(data.map((product) => ({ ...product, key: product.id })));
    }, [data]);

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
                        <Link href={record.link} target="_blank">{record.name}</Link>
                        <p>Thuộc tính: {record.description}</p>
                        <p>Ghi chú: {record.note}</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (price) => {
                const numericPrice = parseFloat(price) || 0;
                return (
                    <div>
                        <p>{formatUnit.moneyTQ(numericPrice)}</p>
                        <p>({formatUnit.moneyVN(numericPrice * applicable_rate)})</p>
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
                    <p>{formatUnit.moneyTQ(total)}</p>
                    <p>({formatUnit.moneyVN((total * applicable_rate))})</p>
                </div>
            },
        },
    ];

    return (
            <Table
                columns={columns}
                dataSource={products}
                bordered
                pagination={false}
            />
    );
};

export default Products;
