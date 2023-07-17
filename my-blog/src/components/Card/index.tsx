import { MouseEventHandler } from "react";
import classNames from "classnames";
import { Divider, Skeleton } from "antd";

import s from "./index.module.styl";

interface IProps {
  loading?: boolean;
  rows?: number;
  isStatic?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}
// vue和react不不一样，不能直接给组件加类名<Card className="xx"/>，要想加就必须把className传递给子组件

const Card: React.FC<IProps> = ({
  children,
  loading,
  rows = 3,
  isStatic = false,
  className,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        s.card,
        {
          [s.center]: loading,
        },
        { [s.active]: !isStatic },
        className
      )}
      onClick={onClick}
    >
      {loading ? <Skeleton paragraph={{ rows }} /> : children}
    </div>
  );
};

export default Card;
