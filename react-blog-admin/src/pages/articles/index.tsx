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
    } else Showmessage('error', res.msg || '删除失败');
  };

  const delArticle = async (id: number) => {
    if (canAdmin) {
      const res = await delList(id);
      onLoad(res);
    } else Showmessage('error', '游客没有权限哦');
  };

  const columns: ProColumns<Article.ColumnProps>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '分类',
      dataIndex: 'category',
      valueType: 'select',
      ellipsis: true,
      fieldProps: {
        options: categoryList,
      },
    },
    {
      title: '标签',
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
      title: '创建时间',
      dataIndex: 'time',
      valueType: 'dateTime', //好东西，加了这个直接帮我转为标准的 嘿嘿都不用自个写函数或者下载插件
      sorter: (a, b) => {
        return a.time > b.time ? 1 : -1;
      },
      hideInSearch: true,
    },
    {
      title: '内容',
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
      title: '操作',
      valueType: 'option',
      hideInDescriptions: true,
      // 记得加key 要不然报错
      render: (text, record, _, action) => {
        // record是该列的数据
        return [
          <a
            key="link"
            onClick={() => {
              setOpen(true);
              setcurrentRecord(record);
            }}
          >
            查看
          </a>,
          <a key="edit" onClick={() => history.push(`/post?id=${record.id}`)}>
            编辑
          </a>,
          <Popconfirm
            key="del"
            title="确定要删除该文章吗"
            onConfirm={() => delArticle(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
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
        // 这两个false去掉上边和上右侧
        pagination={{
          pageSizeOptions: [2, 4, 6],
          defaultPageSize: 4,
          showSizeChanger: true,
        }}
        rowKey="id"
        headerTitle="文章管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push('/post')}
          >
            新文章
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
