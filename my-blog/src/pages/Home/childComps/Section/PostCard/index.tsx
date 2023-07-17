import { MouseEventHandler } from "react";
import Card from "components/Card";
import s from "./index.module.styl";
import classNames from "classnames";
import { formatDate } from "@/utils/common";

interface IProps {
  title?: string;
  content?: string;
  time?: string;
  tags?: string[];
  category?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const PostCard: React.FC<IProps> = ({
  title,
  content,
  time,
  tags,
  category,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className={s.postCard}>
      <div className={s.title}>
        <span>{title}</span>
      </div>
      <div className={s.info}>
        {/* 这里必须写s.icon,写icon样式没效果，因为我只引入了一个s对象 */}
        <svg className={classNames(s.icon, "icon")} aria-hidden="true">
          <use xlinkHref="#icon-date"></use>
        </svg>
        <span className={s.time}>发表于{formatDate(time!)}</span>
        <span className={s.separator}>|</span>
        <svg className={classNames(s.icon, "icon")} aria-hidden="true">
          <use xlinkHref="#icon-folder"></use>
        </svg>
        <span>{category}</span>
        <span className={s.separator}>|</span>
        <svg className={classNames(s.icon, "icon")} aria-hidden="true">
          <use xlinkHref="#icon-card-tag"></use>
        </svg>
        {/* 非空断言，否则ts报错:tags可能未定义 */}
        {tags &&
          tags.map((item) => (
            <span className={s.tag} key={item}>
              {item}
            </span>
          ))}
      </div>
      <div className={s.content}>
        {content?.replace(/\\n/g, " ").replace(/[#|**|`|>]/g, "")}
      </div>
    </Card>
  );
};

export default PostCard;
