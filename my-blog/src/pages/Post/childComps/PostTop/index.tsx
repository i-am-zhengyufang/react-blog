import s from "./index.module.styl";
import classnames from "classnames";
import { formatDate } from "@/utils/common";

interface IProps {
  title: string;
  category?: string;
  tags?: string[];
  className?: string;
  time?: number;
}

const PostTop: React.FC<IProps> = ({
  title,
  category,
  tags,
  className,
  time,
}) => {
  return (
    <div className={classnames(s.postTop, className)}>
      <h3 className={s.postTitle}>{title}</h3>
      <div className={s.postMeta}>
        <div className={s.time}>时间:{formatDate(time)}</div>
        <div className={s.category}>分类:{category}</div>
        <div className={s.tags}>
          标签:
          {tags?.map((item, index) => (
            <span className={s.tag} key={index}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostTop;
