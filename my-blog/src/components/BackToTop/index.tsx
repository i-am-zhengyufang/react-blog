import Icon from "../Icon";
import { FloatButton } from "antd";

const style: React.CSSProperties = {
  width: 18,
  // 我浏览器查看过了他给的icon就是18px 你可以试试搞了30就会发现歪了
};

const BackToTop: React.FC = () => {
  return (
    <FloatButton.BackTop
      visibilityHeight={450}
      // 设为600是因为headernav的scroll防抖为500ms 保证要大于
      duration={600}
      style={{ right: "2%" }}
      icon={<Icon icon="backtop" style={style} />}
    ></FloatButton.BackTop>
  );
};

export default BackToTop;
