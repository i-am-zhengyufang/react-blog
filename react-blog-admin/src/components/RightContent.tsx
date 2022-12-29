import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { history } from 'umi';
import { useModel } from 'umi';
const items: MenuProps['items'] = [
  {
    label: (
      <span
        onClick={() => {
          localStorage.removeItem('token');
          history.push('/login');
        }}
      >
        <LogoutOutlined /> 退出登录
      </span>
    ),
    key: '0',
  },
];

export default function RightContent({
  initialState,
}: {
  initialState: InitialStateType;
}) {
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <img src={initialState.avatar} className="w-6 rounded" alt="" />
          <span>{initialState.name}</span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
