import { MouseEventHandler } from "react";
import classNames from "classnames";
import { Skeleton } from "antd";

import s from "./index.module.styl";

interface IProps {
  loading?: boolean;
  rows?: number;
  isStatic?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

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
