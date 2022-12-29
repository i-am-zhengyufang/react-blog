import { Redirect, history } from 'umi';

export default (props: any) => {
  const token = localStorage.getItem('token');
  // 如果没有登录，重定向到 login
  if (!token && history.location.pathname !== '/login') {
    return <Redirect to="/login" />;
    // 如果登录了 不能在回到login了
  } else if (token && history.location.pathname === '/login') {
    return <Redirect to="/home" />;
  } else return props.children;
};
