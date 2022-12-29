import { PageContainer } from '@ant-design/pro-layout';
import type { ColumnsType } from 'antd/es/table';
import { Table, Button, Popconfirm, notification } from 'antd';
import dayjs from 'dayjs';

import { memo, useEffect, useReducer, useState } from 'react';
import { getAll, delComment, delReply, delMultiple } from 'services/comment';
import { ProCard } from '@ant-design/pro-components';
import { useAccess } from 'umi';
import { tip } from '@/utils';

export default function Comment() {
  //见：https://juejin.cn/post/7042319659881742343 避免data和load重复渲染
  const [request, setRequest] = useReducer(
    (prevState: RequestProps, newState: RequestProps): RequestProps => ({
      ...prevState,
      ...newState,
    }),
    { loading: false, data: [] },
  );
  const [selectedRows, setselectedRows] = useState<Comment.CommentTable[]>([]);
  const [disabled, setdisabled] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { canAdmin } = useAccess();

  const fetchData = async () => {
    setRequest({ loading: true });
    const data = await getAll();
    setRequest({ data, loading: false });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onConfirm = async (record: Comment.CommentTable) => {
    if (canAdmin) {
      if (record.title) await delComment(record.id);
      else await delReply(record.id);
      fetchData();
    } else api.error({ message: tip, duration: 2 });
  };

  const onMultipleConfirm = async () => {
    if (canAdmin) {
      await delMultiple(selectedRows);
      fetchData();
    } else api.error({ message: tip, duration: 2 });
  };
  //  ColumnsType<Comment.CommentTable>[]
  const columns = [
    {
      title: '评论帖子',
      dataIndex: 'title',
      width: 180,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '名字',
      dataIndex: 'nickname',
      ellipsis: true,
      width: 180,
      align: 'center',
      className: 'text-primary',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
      width: 180,
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 70,
      render: (src: string) => {
        return <img src={src} style={{ width: '100%' }} />;
      },
    },
    {
      title: '评论时间',
      dataIndex: 'time',
      width: 180,
      align: 'center',
      render: (time: string) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
      },
      sorter: (a: Comment.CommentTable, b: Comment.CommentTable) => {
        return a.time > b.time ? 1 : -1;
      },
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      width: 250,
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'to_user_name',
      align: 'center',
      width: 180,
      render: (text: string) => {
        return text && text !== '' ? (
          <span>
            回复给<span className="text-primary">「{text}」</span>
          </span>
        ) : (
          '评论'
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      render: (record: Comment.CommentTable) => {
        return (
          <Popconfirm
            title="确定要删除该评论吗"
            onConfirm={() => onConfirm(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        );
      },
      align: 'center',
    },
  ];

  return (
    <PageContainer>
      {contextHolder}

      <ProCard title="评论管理" headerBordered>
        <Button
          type="primary"
          disabled={disabled}
          className="mb-6"
          onClick={onMultipleConfirm}
        >
          批量删除
        </Button>
        <Table
          loading={request.loading}
          rowKey="id"
          scroll={{ x: 1000 }}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, Rows, info: { type: string }) => {
              const isdisabled: boolean = selectedRowKeys.length === 0;
              setdisabled(isdisabled);
              setselectedRows(Rows);
            },
          }}
          pagination={{ defaultPageSize: 8 }}
          expandable={{ childrenColumnName: 'replys' }}
          columns={columns}
          dataSource={request.data}
        />
      </ProCard>
    </PageContainer>
  );
}
