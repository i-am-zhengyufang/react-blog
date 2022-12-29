import classnames from "classnames";
import s from "./index.module.styl";

interface IProps {
  icon: string;
  className?: string;
  click?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
}

const Icon: React.FC<IProps> = ({ icon, className, click, style }) => {
  return (
    <svg
      className={classnames(className, s.iconFont)}
      aria-hidden="true"
      onClick={click}
      style={style}
    >
      <use xlinkHref={`#icon-${icon}`}></use>
    </svg>
  );
};

export default Icon;
