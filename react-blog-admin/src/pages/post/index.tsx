import { history, useLocation } from 'umi';
import type { Location } from 'umi';
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Col, message, Row, Space, Form, Button, Upload } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { getDetail, insert, update } from 'services/article';
import { requestCate, requestTag } from '@/utils';
import MdEditor from 'components/MdEditor';
import dayjs from 'dayjs';

export default function Post() {
  const location: Location = useLocation(); //https://github.com/umijs/umi/issues/5278
  const id = location?.query?.id;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <PageContainer>
      {contextHolder}
      <ProForm
        submitter={{
          // 配置按钮文本
          render: (props, doms) => {
            return (
              <Row justify="end">
                <Col>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
        onFinish={async (values) => {
          let { title, content, category_id, tags_id, time } = values;
          console.log(values);
          let res;
          if (id) {
            time = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
            res = await update({
              id,
              title,
              content,
              category_id,
              tags_id,
              time,
            });
          } else {
            res = await insert({
              title,
              content,
              category_id,
              tags_id,
              time,
            });
          }
          messageApi.success({
            content: res.msg, //一开始跟notify那个写的message 然后报错object不能作为react child
            duration: 2,
          });
        }}
        params={{}}
        request={async () => {
          if (id) {
            const data = await getDetail(id);
            return data;
          }
          return {};
        }}
      >
        <ProFormText
          name="title"
          label="标题"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '该项必填哦' }]}
        />
        <ProFormSelect
          label="分类"
          name="category_id"
          request={requestCate}
          rules={[{ required: true, message: '该项必填哦' }]}
        />
        <ProFormSelect
          label="标签"
          name="tags_id"
          mode="multiple"
          request={requestTag}
          rules={[{ required: true, message: '该项必填哦' }]}
        />
        <ProFormDateTimePicker
          label="创建日期"
          name="time"
          rules={[{ required: true, message: '该项必填哦' }]}
        />
        <Form.Item name="content" wrapperCol={{ span: 24 }}>
          <MdEditor />
        </Form.Item>
      </ProForm>
    </PageContainer>
  );
}
