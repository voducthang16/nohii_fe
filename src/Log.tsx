import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from "./constants/API";
import { Table } from 'antd';
import { useConvertTime } from '@utils/use-convert-time';
function Log() {
    const [data, setData] = useState([]);

    const getLogs = async () => {
        const res = await axios.get(`${API}/logs`);
        setData(res.data);
    }

    useEffect(() => {
        getLogs();
    }, [])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, v) => ( <p>{v?.title}</p> )
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (_, v) => ( <p>{v?.content}</p> )
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            // eslint-disable-next-line react-hooks/rules-of-hooks
            render: (_, v) => ( <p>{useConvertTime(v?.createdAt)}</p> )
        }
    ]

    return (<div className="bg-background-base h-screen">
        <div className="container max-w-6xl mx-auto">
            <Table 
                dataSource={data}
                columns={columns}
                rowKey={'_id'}
            />
        </div>
    </div>);
}

export default Log;