import './index.less';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { login, vistor } from 'services/login';
import { history } from 'umi';
import { useModel } from 'umi';
import { throttle } from '@/utils';

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const { refresh } = useModel('@@initialState');

  const loginTo = (token: string) => {
    localStorage.setItem('token', token);
    refresh();
    history.push('/home');
  };
  const onClick = async () => {
    const response = await vistor();
    loginTo(response.token);
  };

  const onFinish = throttle(
    async ({ email, password }: User) => {
      const response = await login({ email, password });
      if (response.code == 200) {
        loginTo(response.token);
      } else messageApi.error(response.msg);
    },
    1000,
    true,
  );

  return (
    <LoginFormPage
      isKeyPressSubmit
      className="h-full"
      backgroundImageUrl="/back.webp"
      logo="/logo.jpg"
      title="后台管理系统"
      subTitle="游客请直接访问哦"
      onFinish={onFinish}
    >
      {contextHolder}
      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined />,
        }}
        placeholder="请输入邮箱"
        rules={[
          {
            required: true,
            message: '请输入邮箱!',
          },
          { max: 50, message: '不超过50个字' },
          { type: 'email', message: '请输入合法的邮箱' },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder="请输入密码"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
          { max: 20, message: '不超过20个字' },
        ]}
      />
      <div className="visitor-btn" onClick={onClick}>
        我是游客
      </div>
    </LoginFormPage>
  );
}
