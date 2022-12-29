import MdEditor from '@/components/MdEditor';
import { useEffect, useReducer, useState } from 'react';
import { getList, update } from 'services/about';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { history } from 'umi';

export default function aboutedit() {
  const location: Location = useLocation();
  const isMe = location?.query?.isMe;
  const [request, setRequest] = useReducer(
    (prevState: RequestProps, newState: RequestProps): RequestProps => ({
      ...prevState,
      ...newState,
    }),
    { loading: false, data: [] },
  );
  let content = '';

  const onChange = (v: string) => {
    content = v;
  };

  const handleUpdate = async () => {
    setRequest({ loading: true });
    if (isMe === '0') await update({ id: request.data[0].id, content });
    else await update({ id: request.data[1].id, content });
    setRequest({ loading: false });
    history.push('/about');
  };

  useEffect(() => {
    setRequest({ loading: true });
    (async () => {
      const data = await getList();
      setRequest({ data, loading: false });
    })();
  }, []);

  return (
    <PageContainer
      loading={
        request.loading
          ? {
              spinning: true,
              tip: '拼命加载中...',
            }
          : false
      }
      title={isMe === '0' ? '关于本站' : '关于我'}
      extra={[
        <Button key="1" onClick={() => history.push('/about')}>
          返回
        </Button>,
      ]}
      footer={[
        <Button key="2" type="primary" onClick={handleUpdate}>
          保存
        </Button>,
      ]}
    >
      <MdEditor
        value={
          isMe === '0' ? request.data[0]?.content : request.data[1]?.content
        }
        onChange={onChange}
      />
    </PageContainer>
  );
}
