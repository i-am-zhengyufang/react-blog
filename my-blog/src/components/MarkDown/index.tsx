import ReactMarkdown from "react-markdown";
import s from "./index.module.styl";
import classnames from "classnames";
import gfm from "remark-gfm";
interface IProps {
  content: string;
  className?: string;
}

const MarkDown: React.FC<IProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      className={classnames(s.marked, className)}
      children={content.replace(/\\n/g, "\n")}
    />
  );
};

export default MarkDown;
