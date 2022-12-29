import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { history } from 'umi';
import MdRender from 'components/MdRender';
import { getList } from 'services/about';
import { useEffect, useReducer, useState } from 'react';

export default function about() {
  const [isMe, setisMe] = useState(0);
  const [request, setRequest] = useReducer(
    (prevState: RequestProps, newState: RequestProps): RequestProps => ({
      ...prevState,
      ...newState,
    }),
    { loading: false, data: [] },
  );
  useEffect(() => {
    (async () => {
      setRequest({ loading: true });
      const data = await getList();
      setRequest({ data, loading: false });
    })();
  }, []);

  const items = [
    {
      label: '关于本站',
      key: '1',
      children: <MdRender content={request.data[0]?.content} />,
    },
    {
      label: '关于我',
      key: '2',
      children: <MdRender content={request.data[1]?.content} />,
    },
  ];

  return (
    <PageContainer>
      <ProCard
        loading={request.loading}
        title="关于"
        extra={
          <Button
            type="dashed"
            shape="round"
            onClick={() => history.push(`/aboutedit?isMe=${isMe}`)}
          >
            修改
          </Button>
        }
        tabs={{
          type: 'card',
          onChange: (key: string) => {
            if (key === '1') setisMe(0);
            else setisMe(1);
          },
          items,
        }}
        bordered
      >
        {/* 官网给的栗子是ProCard.TabPane但是控制台弹出警告已经过时了 用items代替 */}
      </ProCard>
    </PageContainer>
  );
}
