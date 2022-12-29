import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default function Footer() {
  return (
    <DefaultFooter
      copyright="2022-2022 by 圆筒冰激凌"
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/i-am-zhengyufang?tab=repositories',
          blankTarget: true,
        },
      ]}
    />
  );
}
