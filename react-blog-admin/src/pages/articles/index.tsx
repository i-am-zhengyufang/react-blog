import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProDescriptions } from '@ant-design/pro-components';
import { history } from 'umi';
import {
  Button,
  Space,
  Tag,
  Popconfirm,
  Select,
  Drawer,
  notification,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import request from 'umi-request';
import { useAccess } from 'umi';
import { getList as getArticleList, delList } from 'services/article';
import { PageContainer } from '@ant-design/pro-layout';
import MdRender from 'components/MdRender';
import { requestCate, requestTag } from '@/utils';

interface T {
  category?: number;
  tag?: number[];
}

const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];
interface SelectProps {
  label: string;
  value: string;
}

export default function Articles() {
  const actionRef = useRef<ActionType>();
  const [categoryList, setcategoryList] = useState<SelectProps[]>();
  const [tagsList, settagsList] = useState<SelectProps[]>();
  const { canAdmin } = useAccess();

  useEffect(() => {
    requestCate().then((v) => {
      setcategoryList(v);
    });
    requestTag().then((v) => {
      settagsList(v);
    });
  }, []);

  const [currentRecord, setcurrentRecord] = useState<Article.ColumnProps>();
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const fetchData = async (
    params: T & {
      pageSize: number;
      current: number;
    },
  ) => {
    let { total, result: data } = await getArticleList({
      pageNo: params.current,
      pageSize: params.pageSize,
      category_id: params.category,
      tags_id: params.tag,
    });

    data = data.map((item: Article.ArticleProps) => {
      const tags =
        item.tags &&
        item.tags.map((tag) => {
          const name = tag;
          const color = colors[Math.floor(Math.random() * colors.length)];
          return { name, color };
        });
      return { ...item, tags };
    });
    return {
      total,
      data,
      success: true,
    };
  };

  const Showmessage = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
  ) => {
    api[type]({
      message,
      duration: 2,
    });
  };
  const onLoad = (res: ResponseInfo) => {
    if (res.status == 200) {
      actionRef?.current?.reload();
      Showmessage('success', res.msg);
    } else Showmessage('error', res.msg || '????????????');
  };

  const delArticle = async (id: number) => {
    if (canAdmin) {
      const res = await delList(id);
      onLoad(res);
    } else Showmessage('error', '?????????????????????');
  };

  const columns: ProColumns<Article.ColumnProps>[] = [
    {
      title: '??????',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '???????????????????????????',
      hideInSearch: true,
    },
    {
      title: '??????',
      dataIndex: 'category',
      valueType: 'select',
      ellipsis: true,
      fieldProps: {
        options: categoryList,
      },
    },
    {
      title: '??????',
      dataIndex: 'tag',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: tagsList,
      },
      render: (_, record) => {
        return (
          <>
            {record.tags &&
              record.tags.map(({ name, color }) => (
                <Tag color={color} key={name}>
                  {name}
                </Tag>
              ))}
          </>
        );
      },
    },
    {
      title: '????????????',
      dataIndex: 'time',
      valueType: 'dateTime', //??????????????????????????????????????????????????? ????????????????????????????????????????????????
      sorter: (a, b) => {
        return a.time > b.time ? 1 : -1;
      },
      hideInSearch: true,
    },
    {
      title: '??????',
      dataIndex: 'content',
      hideInTable: true,
      hideInSearch: true,
      render: (text, record, _action) => {
        return (
          <div style={{ background: '#f6f8fa', padding: '10px' }}>
            <MdRender content={currentRecord?.content} />
          </div>
        );
      },
    },
    {
      title: '??????',
      valueType: 'option',
      hideInDescriptions: true,
      // ?????????key ???????????????
      render: (text, record, _, action) => {
        // record??????????????????
        return [
          <a
            key="link"
            onClick={() => {
              setOpen(true);
              setcurrentRecord(record);
            }}
          >
            ??????
          </a>,
          <a key="edit" onClick={() => history.push(`/post?id=${record.id}`)}>
            ??????
          </a>,
          <Popconfirm
            key="del"
            title="???????????????????????????"
            onConfirm={() => delArticle(record.id)}
            okText="??????"
            cancelText="??????"
          >
            <a>??????</a>
          </Popconfirm>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={fetchData}
        search={{
          defaultCollapsed: false,
        }}
        options={false}
        // ?????????false????????????????????????
        pagination={{
          pageSizeOptions: [2, 4, 6],
          defaultPageSize: 4,
          showSizeChanger: true,
        }}
        rowKey="id"
        headerTitle="????????????"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push('/post')}
          >
            ?????????
          </Button>,
        ]}
      />
      {contextHolder}

      <Drawer
        width={800}
        onClose={() => setOpen(false)}
        open={open}
        closable={false}
      >
        <ProDescriptions
          column={1}
          columns={columns}
          dataSource={currentRecord}
        ></ProDescriptions>
      </Drawer>
    </PageContainer>
  );
}
