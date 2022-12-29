import s from "./index.module.styl";
import classnames from "classnames";
interface IProps {
  title?: string;
  desc?: string;
  className?: string;
}

const PageTitle: React.FC<IProps> = ({ title, desc, className }) => {
  return (
    <div className={classnames(s.box, className)}>
      <div className={s.title}>{title}</div>
      {desc && <div className={s.desc}>{desc}</div>}
    </div>
  );
};

export default PageTitle;
