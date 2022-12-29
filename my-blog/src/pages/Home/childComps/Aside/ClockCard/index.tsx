import s from "./index.module.styl";
import Card from "components/Card";
import Icon from "components/Icon";
import { getTime } from "@/utils/common";

const ClockCard: React.FC = () => {
  const { hours, minutes, seconds } = getTime();
  return (
    <Card className={s.clockCard}>
      <div className={s.headerInfo}>
        <Icon icon="clock" className={s.icon} />
        <span className={s.text}>时间</span>
      </div>
      <div className={s.clock}>
        <div className={`${s.line} ${s.line1}`}></div>
        <div className={`${s.line} ${s.line2}`}></div>
        <div className={`${s.line} ${s.line3}`}></div>
        <div className={`${s.line} ${s.line4}`}></div>
        <div className={`${s.line} ${s.line5}`}></div>
        <div className={`${s.line} ${s.line6}`}></div>
        <div className={s.shade}></div>
        <div
          className={s.hour}
          style={{ transform: `translate(-50%, -100%) rotate(${hours}deg)` }}
        ></div>
        <div
          className={s.minutes}
          style={{ transform: `translate(-50%, -100%) rotate(${minutes}deg)` }}
        ></div>
        <div
          className={s.seconds}
          style={{ transform: `translate(-50%, -100%) rotate(${seconds}deg)` }}
        ></div>
        <div className={s.circle}></div>
      </div>
    </Card>
  );
};

export default ClockCard;
