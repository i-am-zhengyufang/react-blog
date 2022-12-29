import {
  ActionType,
  PageContainer,
  ProColumns,
  EditableProTable,
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Popconfirm, Button, notification } from 'antd';
import { getList, insert, update, del } from 'services/timeline';
import dayjs from 'dayjs';
import { useAccess } from 'umi';
import { tip } from '@/utils';
import React from 'react';
import type {
  ActionRenderConfig,
  NewLineConfig,
  RecordKey,
} from '@ant-design/pro-utils/es/useEditableArray';

// 就是cv说说界面的 快乐！！！

export default function timeline() {
  const ref = useRef<ActionType>();
  const [api, contextHolder] = notification.useNotification();
  const { canAdmin } = useAccess();

  const onSave = async (
    config: ActionRenderConfig<any, NewLineConfig<any>>,
    recordKey: RecordKey,
    editRow: any,
    originRow: any,
    newLine: NewLineConfig<any>,
  ) => {
    if (canAdmin) {
      let { id, content, time } = editRow;
      if (originRow.content) {
        // 奶奶的修改时time没能格式化 这个数据mysql接受不了，明明自己给我返回的就
        // 是这个数，结果收的时候不要了
        time = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
        await update({ id, content, time });
      } else {
        await insert({ content, time });
      }
      ref?.current?.reload();
    } else {
      api.error({ message: tip, duration: 2 });
    }
    // 保存时解除编辑模式
    setTimeout(() => {
      config.cancelEditable(recordKey);
    }, 500);
  };

  const onConfirm = async (id: number) => {
    if (canAdmin) {
      await del(id);
      ref?.current?.reload();
    } else api.error({ message: tip, duration: 2 });
  };
  const columns: ProColumns<SayOrTimeLine.Params>[] = [
    {
      title: '内容',
      dataIndex: 'content',
      formItemProps: () => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            { max: 150, message: '最多不超过150字' },
          ],
        };
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
      valueType: 'dateTime',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除该说说吗"
          onConfirm={() => onConfirm(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      {contextHolder}
      <EditableProTable<SayOrTimeLine.Params>
        actionRef={ref}
        recordCreatorProps={false}
        controlled
        rowKey="id"
        headerTitle="建站日志"
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              ref.current?.addEditRecord?.(
                {
                  id: (Math.random() * 1000000).toFixed(0),
                },
                { position: 'top' },
              );
            }}
          >
            新建
          </Button>,
        ]}
        request={async () => {
          const data = await getList();
          return {
            data,
            total: data.length,
            success: true,
          };
        }}
        pagination={{
          pageSize: 8,
        }}
        editable={{
          type: 'multiple',
          actionRender: (row, config, defaultDom) => {
            return [
              React.cloneElement(defaultDom.save as React.ReactElement, {
                onSave: onSave.bind(null, config),
              }),
              defaultDom.cancel,
            ];
          },
        }}
      />
    </PageContainer>
  );
}
