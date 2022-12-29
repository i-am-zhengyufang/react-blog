import React from "react";
import s from "./index.module.styl";
import classnames from "classnames";
interface IProps {
  state: boolean;
  toggle: Function;
  setLeft: Function;
  setRight: Function;
  className?: string;
}
const Switch: React.FC<IProps> = ({
  state = false,
  toggle,
  setLeft,
  setRight,
  className,
}) => {
  return (
    <div className={classnames(s.switch, className)}>
      <div
        className={classnames(s.site, { [s.activeOn]: !state })}
        onClick={() => setLeft()}
      >
        关于本站
      </div>
      <div className={s.switchBtn} onClick={() => toggle()}>
        <div
          className={classnames(s.switchHandle, { [s.handleRight]: state })}
        ></div>
      </div>
      <div
        className={classnames(s.me, { [s.activeOn]: state })}
        onClick={() => setRight()}
      >
        关于我
      </div>
    </div>
  );
};

export default Switch;
