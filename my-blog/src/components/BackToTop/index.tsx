import Icon from "../Icon";
import { FloatButton } from "antd";

const style: React.CSSProperties = {
  width: 18,
};

const BackToTop: React.FC = () => {
  return (
    <FloatButton.BackTop
      visibilityHeight={450}
      duration={600}
      style={{ right: "2%" }}
      icon={<Icon icon="backtop" style={style} />}
    ></FloatButton.BackTop>
  );
};

export default BackToTop;
