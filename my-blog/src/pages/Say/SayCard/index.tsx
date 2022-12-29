import s from "./index.module.styl";
import { formatDate } from "@/utils/common";
import Icon from "components/Icon";
interface IProps {
  content: string;
  time: string;
}

const SayCard: React.FC<IProps> = ({ content, time }) => {
  return (
    <div className={s.sayCard}>
      <img className={s.avatar} src="/assets/imgs/avatar.jpg" alt="" />
      <div className={s.rightContent}>
        <p className={s.content}>{content}</p>
        <div className={s.date}>
          <Icon icon="date" className={s.icon} />
          {formatDate(time)}
        </div>
      </div>
    </div>
  );
};

export default SayCard;
