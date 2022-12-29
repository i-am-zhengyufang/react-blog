import {
  ActionType,
  PageContainer,
  ProColumns,
  EditableProTable,
} from '@ant-design/pro-components';
import { SmileOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Popconfirm, Input, notification } from 'antd';
import { getList, insert, update, del } from 'services/say';
import dayjs from 'dayjs';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import type { InputRef } from 'antd';
import { useAccess } from 'umi';
import { tip } from '@/utils';
import type {
  ActionRenderConfig,
  NewLineConfig,
  RecordKey,
} from '@ant-design/pro-utils/es/useEditableArray';

export default function say() {
  const [showemoji, setshowemoji] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const ref = useRef<ActionType>();
  const { canAdmin } = useAccess();

  //感谢老哥给的方案😁😁 https://github.com/ant-design/pro-components/issues/4175
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
      config.cancelEditable(recordKey); //加个定时器是因为比如从a->b 立即解除编辑就会load，从b->a->b的很乱的效果这样好点
    }, 500);
  };

  const InputWithEmoji: React.FC<{
    value?: string;
    onChange?: (value: string) => void;
  }> = ({ value = '', onChange }) => {
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef?.current?.focus();
      }
    }, [inputRef.current]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e.target.value);
    };

    const onEmojiSelect = (emoji: any) => {
      const newInput = value + emoji.native;
      onChange && onChange(newInput);
    };

    return (
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          suffix={
            <SmileOutlined
              onClick={(e) => {
                e.stopPropagation();
                setshowemoji(!showemoji);
              }}
            />
          }
          allowClear
          onClick={() => {
            setshowemoji(false);
          }}
          onChange={handleInputChange}
        ></Input>

        {showemoji && (
          <div className="absolute z-10">
            {/* 脱离标准流同时不被遮住 */}
            <Picker
              onBlur={() => setshowemoji(false)}
              data={data}
              categories={['people', 'foods']}
              onEmojiSelect={onEmojiSelect}
              locale="zh"
              emojiSize={14}
              previewPosition="none"
            />
          </div>
        )}
      </div>
    );
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
      renderFormItem: () => {
        return <InputWithEmoji />;
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
        recordCreatorProps={{
          position: 'top',
          record: () => ({
            id: Math.random() * 1000000,
          }),
        }}
        request={async () => {
          const data = await getList();
          return {
            data,
            total: data.length,
            success: true,
          };
        }}
        onDataSourceChange={(e) => {
          console.log(e);
        }}
        rowKey="id"
        headerTitle="说说管理"
        columns={columns}
        // request={}一开始用的request而不是value 会导致游客也可以本地编辑
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
