import s from "./index.module.styl";
import { icpNo, icpSite, copyRight } from "@/utils/constant";
import { useRunTime } from "@/utils/hooks";
const Footer: React.FC = () => {
  return (
    <footer className={s.footer}>
      <div className={s.copyRight}>{copyRight}</div>
      <div className={s.icpNo}>
        <a href={icpSite} rel="noreferrer" target="_blank">
          {icpNo}
        </a>
      </div>
      <div className={s.runTime}>
        本站已经勉勉强强存活了
        <span className={s.runTimeNum}>{useRunTime()}</span>天
      </div>
    </footer>
  );
};

export default Footer;
