import './index.less';
export default function ErrorPage({
  title = '404',
  desc = '您访问的页面丢失啦',
}) {
  return (
    <div className="error">
      <div className="text-danger text-9xl">{title}</div>
      <div className="mt-5">{desc}</div>
    </div>
  );
}
