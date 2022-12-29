import logoSrc from '/public/blog.svg';
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import Footer from 'components/Footer';
import RightContent from 'components/RightContent';
import Error from '@/pages/error';

import { ConfigProvider } from 'antd';
import { getInfo } from './services/login';
import { tip } from '@/utils';

ConfigProvider.config({
  theme: { primaryColor: '#10B981' },
});

const getCurrentInfo = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const result = await getInfo();
    return result;
  }
  return {};
};

export function getInitialState() {
  return getCurrentInfo();
}

export const layout = ({
  initialState,
}: {
  initialState: {
    settings?: LayoutSettings;
    name: string;
    avatar: string;
    role: string;
  };
}) => {
  return {
    logo: logoSrc,
    //不能用 rightContentRender=>(initialState)自带的参数 因为log出来是一堆layout的settings
    rightContentRender: () => <RightContent initialState={initialState} />,
    footerRender: () => <Footer />,
    unAccessible: <Error title="403" desc={tip} />,
  };
};
