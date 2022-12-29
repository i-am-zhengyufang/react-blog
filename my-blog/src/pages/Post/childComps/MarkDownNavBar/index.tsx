import MarkdownNavbar from "markdown-navbar";
// The default style of markdown-navbar should be imported additionally
import "markdown-navbar/dist/navbar.css";
import s from "./index.module.styl";
import Icon from "components/Icon";
interface IProps {
  content: string;
}

const MarkDownNavBar: React.FC<IProps> = ({ content }) => {
  return (
    <div className={s.asideDirectory}>
      <Icon icon="directory" className={s.icon} />
      <span>目录</span>
      <MarkdownNavbar
        className={s.postNavBar}
        source={content?.replace(/\\n/g, "\n")}
        ordered={false}
        updateHashAuto={false}
      />
    </div>
  );
};

export default MarkDownNavBar;
